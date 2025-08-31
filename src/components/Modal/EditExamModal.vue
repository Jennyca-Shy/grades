<script setup>
import { ref, computed, onMounted } from 'vue';
import Modal from './Modal.vue';
import { useToast } from 'vue-toastification';

const props = defineProps({
  exam: Object,
});

const currExam = props.exam;
console.log('currExam: ', currExam);
const color = props.exam.subject.color;
const formattedDate = ref(new Date(currExam.date).toISOString().split('T')[0]);
const result = ref(props.exam.result);

console.log(formattedDate);

const emit = defineEmits(['close', 'added', 'deleted']);
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
//selectedSubject -> Subject object
const selectedSubject = ref(currExam?.subject || '');
let selectedSubjectName = ref(currExam?.subject.name || '');
const dropdownVisible = ref(false);

const filteredSubjects = computed(() =>
  subjects.value.filter((subject) =>
    subject.name.toLowerCase().includes(selectedSubjectName.value.toLowerCase()),
  ),
);

//Select
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

//Type of Exam
const type = ref('Schulaufgabe');

//Edit the exam
async function editExam() {
  currExam.date = formattedDate.value;
  currExam.subject = selectedSubject.value._id;
  currExam.result = result.value;
  currExam.type = type.value;

  console.log('Curr Exam: ', currExam);
  const response = await fetch(`http://localhost:3000/grade/${currExam._id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(currExam),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Fehler beim Hinzufügen der Exam:', errorText);
  } else {
    emit('added');
    closeModal();
    toast.info('Edited exam!');
  }
}

function confirmDelete() {
  if (confirm('Do you really want to delete this exam? This action CAN NOT be reversed!')) {
    deleteSubject();
  }
}

const toast = useToast();
async function deleteSubject() {
  const response = await fetch(`http://localhost:3000/grade/single/${props.exam._id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    toast.success('Successfully deleted the exam');
    emit('added');
  } else {
    toast.warning('Something went wrong');
  }
}
</script>

<template>
  <Modal @close="closeModal" :color="color">
    <template #title>
      <div class="mx-3">
        Edit Exam
        <hr :style="`background-color: ${color}`" />
      </div>
    </template>
    <template #body>
      <form @submit.prevent="editExam" class="mt-4 mx-2 text-sm flex flex-col w-[330px]">
        <input
          id="exam"
          v-model="currExam.title"
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
              :key="exam.subject"
              class="text-black p-2 cursor-pointer hover:text-newBlue"
              @click="selectSubject(subject)"
            >
              {{ subject.name }}
            </div>
          </div>
        </div>

        <div class="relative w-full">
          <select name="type" id="type" v-model="type" :style="`outline-color: ${color}`">
            <option value="Schulaufgabe">Schulaufgabe</option>
            <option value="Kurzarbeit">Kurzarbeit</option>
            <option value="Stegreifaufgabe">Stegreifaufgabe</option>
            <option value="Abfrage">Abfrage</option>
          </select>
          <div class="absolute inset-y-0 right-2 flex items-center mb-3">
            <div class="pi pi-angle-down"></div>
          </div>
        </div>

        <input
          :style="`outline-color: ${color}`"
          id="until"
          v-model="formattedDate"
          type="date"
          placeholder="Finished by"
          required
        />
        <div class="flex items-center justify-center">
          <input
            :style="`outline-color: ${color}`"
            id="result"
            v-model="result"
            type="text"
            placeholder="Result"
            class="rounded-l-md rounded-r-none"
          />
          <div class="bg-gray-100 whitespace-nowrap mb-3 p-2 rounded-r-md">out of 15 Points</div>
        </div>
        <textarea
          :style="`outline-color: ${color}`"
          name="notes"
          v-model="exam.notes"
          id="notes"
          placeholder="Add your notes"
        ></textarea>

        <div class="flex justify-between">
          <button
            type="button"
            @click="confirmDelete"
            class="px-1 border-2 rounded-md border-red-600 hover:text-white hover:bg-red-600"
          >
            Delete
          </button>
          <button
            class="ml-auto px-1 border-2 rounded-md"
            :style="`border-color: ${color}`"
            type="submit"
          >
            Edit
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>
