<script setup>
import { ref, computed, onMounted } from 'vue';
import Modal from './Modal.vue';
import { useHomeworkStore } from '@/stores/homeworkStore';
import { useSubjectStore } from '@/stores/subjectStore';
import { storeToRefs } from 'pinia';

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

const homeworkStore = useHomeworkStore();
const subjectStore = useSubjectStore();

const currentSubject = ref(props.subject);
const color = props.color;
console.log(currentSubject);
const emit = defineEmits(['close', 'added']);
function closeModal() {
  emit('close');
}

//Get subjects
const { subject } = storeToRefs(subjectStore);

onMounted(() => {
  subjectStore.init();
});

//Subject dropdown
const selectedSubject = ref(currentSubject?.value || '');
let selectedSubjectName = ref(currentSubject?.value.name || '');
const dropdownVisible = ref(false);

const filteredSubjects = computed(() =>
  subject.value.filter((sub) =>
    sub.name.toLowerCase().includes(selectedSubjectName.value.toLowerCase()),
  ),
);

function selectSubject(sub) {
  dropdownVisible.value = false;
  selectedSubject.value = sub;
  selectedSubjectName.value = sub.name;
}

function toggleDropdownVisible() {
  dropdownVisible.value = !dropdownVisible.value;
  selectedSubjectName.value = '';
}

//Create new homework
const title = ref('');
const dueDate = ref('');
const notes = ref('');

function addHomework() {
  homeworkStore.addHomework(title.value, selectedSubject.value, notes.value, dueDate.value);
  emit('added');
  closeModal();
}
</script>

<template>
  <Modal @close="closeModal" :color="color">
    <template #title>
      <div class="mx-3">
        Hausaufgaben hinzufügen
        <hr :style="`background-color: ${color}`" />
      </div>
    </template>
    <template #body>
      <form @submit.prevent="addHomework" class="mt-4 mx-2 text-sm flex flex-col w-[330px]">
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
