<script setup>
import { ref, computed, onMounted } from 'vue';
import Modal from './Modal.vue';
import { useToast } from 'vue-toastification';
import { useHomeworkStore } from '@/stores/homeworkStore';
import { useSubjectStore } from '@/stores/subjectStore';
import { storeToRefs } from 'pinia';

const props = defineProps({
  homework: Object,
});

const homeworkStore = useHomeworkStore();
const subjectStore = useSubjectStore();

const currHomework = props.homework;
console.log('currHomework: ', currHomework);
const color = props.homework.subject.color;
const formattedDate = ref(new Date(currHomework.dueDate).toISOString().split('T')[0]);

console.log(formattedDate);

const emit = defineEmits(['close', 'updated']);
function closeModal() {
  emit('close');
}

//Get subjects
const { subject } = storeToRefs(subjectStore);
// async function getSubjects() {
//   const response = await fetch('http://localhost:3000/subject');
//   const data = await response.json();

//   subjects.value = data;
//   console.log('Subjects: ', subjects);
// }

onMounted(() => {
  //getSubjects();
});

//Subject dropdown
//selectedSubject -> Subject object
const selectedSubject = ref(currHomework?.subject || '');
let selectedSubjectName = ref(currHomework?.subject.name || '');
const dropdownVisible = ref(false);

const filteredSubjects = computed(() =>
  subject.value.filter((sub) =>
    sub.name.toLowerCase().includes(selectedSubjectName.value.toLowerCase()),
  ),
);

//Select
function selectSubject(subject) {
  dropdownVisible.value = false;
  selectedSubject.value = sub;
  // console.log(selectedSubject.value);
  selectedSubjectName.value = sub.name;
}

function toggleDropdownVisible() {
  dropdownVisible.value = !dropdownVisible.value;
  selectedSubject.value = '';
  selectedSubjectName.value = '';
}

//Edit the homework
async function editHomework() {
  currHomework.dueDate = formattedDate.value;
  currHomework.subject = selectedSubject.value;
  homeworkStore.editHomework(currHomework);
  //emit('updated');
  closeModal();
  toast.info('Edited homework!');
}

//Delete homework
function confirmDelete() {
  if (confirm('Do you really want to delete this homework? This action CAN NOT be reversed!')) {
    deleteHomework();
  }
}

const toast = useToast();
async function deleteHomework() {
  homeworkStore.deleteHomework(props.homework._id);
  toast.success('Successfully deleted the homework');
  //emit('updated');
  emit('close');
}
</script>

<template>
  <Modal @close="closeModal" :color="color">
    <template #title>
      <div class="mx-3">
        Edit homework
        <hr :style="`background-color: ${color}`" />
      </div>
    </template>
    <template #body>
      <form @submit.prevent="editHomework" class="mt-4 mx-2 text-sm flex flex-col w-[330px]">
        <input
          id="homework"
          v-model="currHomework.title"
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
              :key="homework.subject"
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
          v-model="formattedDate"
          type="date"
          placeholder="Finished by"
          required
        />
        <textarea
          :style="`outline-color: ${color}`"
          name="notes"
          v-model="homework.notes"
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
