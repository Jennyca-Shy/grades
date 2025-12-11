<script setup>
import { ref, computed, onMounted } from 'vue';
import Modal from './Modal.vue';
import { useSemesterStore } from '@/stores/semesterStore';
import { useToast } from 'vue-toastification';
import { useSubjectStore } from '@/stores/subjectStore';
import { storeToRefs } from 'pinia';
import { useGradeStore } from '@/stores/gradeStore';

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

const subjectStore = useSubjectStore();
const gradeStore = useGradeStore();
const toast = useToast();

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
  selectedSubject.value = '';
  selectedSubjectName.value = '';
}

//Type of Exam
const type = ref('Schulaufgabe');

//Semester store
const semesterStore = useSemesterStore();

//TOAAAAAST
function addedExamToast() {
  toast.success('Added exam. Now go and learn for that!');
}

//Create new exam
const title = ref('');
const dueDate = ref('');
const result = ref('');
const notes = ref('');
const outOf = ref();
async function addExam() {
  //Regular exams have 0-15, Abitur has 0-60 Points
  outOf.value = type.value == 'Abitur' ? 60 : 15;
  const semester = type.value == 'Abitur' ? 'none' : semesterStore.currentSemester;

  gradeStore.addGrade(
    title.value,
    selectedSubject.value,
    dueDate.value,
    result.value,
    outOf.value,
    semester,
    type.value,
    notes.value,
  );
  emit('added');
  closeModal();
  addedExamToast();
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

        <div class="relative w-full">
          <select name="type" id="type" v-model="type" :style="`outline-color: ${color}`">
            <option value="Schulaufgabe">Schulaufgabe</option>
            <option value="Kurzarbeit">Kurzarbeit</option>
            <option value="Stegreifaufgabe">Stegreifaufgabe</option>
            <option value="Abfrage">Abfrage</option>
            <option value="Abitur">Abitur</option>
          </select>
          <div class="absolute inset-y-0 right-2 flex items-center mb-3">
            <div class="pi pi-angle-down"></div>
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
