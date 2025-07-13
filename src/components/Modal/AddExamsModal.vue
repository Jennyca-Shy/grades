<script setup>
import { ref, computed, onMounted } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
  subject: {
    type: Object,
    default: '',
  },
  color: {
    type: String,
    default: '#44a1a0',
  },
});

const currentSubject = ref(props.subject);
const color = props.color;
console.log(currentSubject);
const emit = defineEmits(['close', 'added']);
function closeModal() {
  emit('close');
}

//Get subjects
let subjects = ref([]);
async function getSubjects() {
  const response = await fetch('http://localhost:3000/subject');
  const data = await response.json();

  subjects.value = data;
  console.log('Subjects: ', subjects);
}

onMounted(() => {
  getSubjects();
});

//Subject dropdown
const selectedSubject = ref(currentSubject?.value || '');
let selectedSubjectName = ref(currentSubject?.value.name || '');
const dropdownVisible = ref(false);

const filteredSubjects = computed(() =>
  subjects.value.filter((subject) =>
    subject.name.toLowerCase().includes(selectedSubjectName.value.toLowerCase()),
  ),
);

function selectSubject(subject) {
  dropdownVisible.value = false;
  selectedSubject.value = subject;
  // console.log(selectedSubject.value);
  selectedSubjectName.value = subject.name;
}

function toggleDropdownVisible() {
  dropdownVisible.value = !dropdownVisible.value;
  selectedSubject.value = '';
  selectedSubjectName.value = '';
}

//Create new homework
const title = ref('');
const dueDate = ref('');
const result = ref('');
const notes = ref('');
async function addExam() {
  const response = await fetch('http://localhost:3000/grade', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: title.value,
      subject: selectedSubject.value._id,
      date: dueDate.value,
      result: result.value,
      notes: notes.value,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Fehler beim Hinzufügen der Schulaufgabe:', errorText);
  } else {
    emit('added');
    closeModal();
  }
}
</script>

<template>
  <Modal @close="closeModal" :color="color">
    <template #title>
      <div class="mx-3">
        Exam hinzufügen
        <hr :style="`background-color: ${color}`" />
      </div>
    </template>
    <template #body>
      <form @submit.prevent="addExam" class="mt-4 mx-2 text-sm flex flex-col w-[330px]">
        <input
          id="homework"
          v-model="title"
          type="text"
          placeholder="Enter title"
          :style="`outline-color: ${color}`"
          required
        />
        <div class="relative mb-2">
          <div class="flex items-center justify-center relative">
            <div class="pi pi-search absolute right-3 top-1/4"></div>
            <input
              class="p-2 mb-1 focus:bg-white w-full pr-8"
              :style="`outline-color: ${color}`"
              required
              type="text"
              placeholder="Subject"
              v-model="selectedSubjectName"
              @focus="toggleDropdownVisible()"
            />
          </div>
          <div
            class="absolute z-10 w-full bg-slate-200 rounded-b-md max-h-40 overflowy-scrolly"
            v-if="filteredSubjects.length && dropdownVisible"
          >
            <div
              v-for="subject in filteredSubjects"
              :key="subject.id"
              class="text-black p-2 cursor-pointer hover:text-newBlue"
              @click="selectSubject(subject)"
            >
              {{ subject.name }}
            </div>
          </div>
        </div>

        <input
          :style="`outline-color: ${color}`"
          id="until"
          v-model="dueDate"
          type="date"
          placeholder="Finished by"
          required
        />
        <input
          :style="`outline-color: ${color}`"
          name="result"
          v-model="result"
          id="result"
          placeholder="Add your result"
        />

        <textarea
          :style="`outline-color: ${color}`"
          name="notes"
          v-model="notes"
          id="notes"
          placeholder="Add your notes"
        ></textarea>

        <div class="flex justify-end">
          <button
            class="ml-auto px-1 border-2 rounded-md"
            :style="`border-color: ${color}`"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>
