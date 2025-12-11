<script setup>
import { ref, onMounted, computed } from 'vue';
import EditSubjectModal from '@/components/Modal/EditSubjectModal.vue';
import HomeworkSection from '@/components/Subject/HomeworkSection.vue';
import GradeSection from '@/components/Subject/GradeSection.vue';
import NoteSection from '@/components/Subject/NoteSection.vue';
import ExamSection from '@/components/Subject/ExamSection.vue';
import { useRoute, RouterLink } from 'vue-router';
import { useGradeStore } from '@/stores/gradeStore';
import { useSubjectStore } from '@/stores/subjectStore';

const gradeStore = useGradeStore();
const subjectStore = useSubjectStore();

const editSubjectOpen = ref(false);

//Get homework and subject via api
const route = useRoute();
const id = route.params.id;
let subject = computed(() => subjectStore.getSubjectById(id));
// async function getSubject() {
//   const response = await fetch(`http://localhost:3000/subject/id/${id}`);
//   data = await response.json();

//   subject.value = data;
//   console.log(subject.value);
//   console.log('Got subject');
// }

onMounted(async () => {
  await gradeStore.init();
  await subjectStore.init();
  // getSubject();
  //getExams();
});
</script>

<template>
  <section class="md:m-3 md:p-2 m-2 p-1 flex flex-col">
    <!-- Header with subject, room and teacher -->
    <div class="p-2 bg-white rounded-md">
      <div class="flex flex-col md:flex-row justify-between">
        <ol class="flex">
          <li class="md:flex items-center mr-2 hidden">
            <RouterLink class="mr-2" to="/subjects">Subjects</RouterLink>
            <span class="pi pi-angle-right"></span>
          </li>
          <li class="flex items-center">
            <h1>
              {{ subject?.name || 'Loading...' }}
              <hr :style="`background-color: ${subject?.color};`" />
            </h1>
          </li>
          <button
            @click="editSubjectOpen = true"
            class="ml-auto mr-1 px-1 border-2 rounded-md md:hidden"
            :style="`border-color: ${subject?.color}`"
          >
            Edit
          </button>
        </ol>

        <div class="flex space-x-8 justify-between items-center mt-2 md:mt-0">
          <div class="flex flex-row">
            <p class="hidden md:block mr-1">Room:</p>
            {{ subject?.room }}
          </div>
          <div class="flex flex-row">
            <p class="hidden md:block mr-1">Teacher:</p>
            {{ subject?.teacher }}
          </div>
          <button
            @click="editSubjectOpen = true"
            class="mr-1 px-1 border-2 rounded-md hidden md:block"
            :style="`border-color: ${subject?.color}`"
          >
            Edit
          </button>
        </div>
        <EditSubjectModal
          v-if="editSubjectOpen && subject"
          @close="
            () => {
              editSubjectOpen = false;
            }
          "
          :subject="subject"
        />
      </div>
    </div>
    <!-- Main part -->
    <div class="grid md:grid-cols-2 md:grid-rows-2 mt-3 gap-2 flex-1 overflowy-scrolly">
      <!-- Top left: Homework -->
      <HomeworkSection v-if="subject" :subject="subject" />
      <!-- Top right: Exams -->
      <ExamSection v-if="subject" :propSubject="subject" />
      <!-- Bottom left: Notes -->
      <NoteSection v-if="subject" :propSubject="subject" />
      <!-- Bottom right: Grade Overview -->
      <GradeSection v-if="subject" :propSubject="subject" />
    </div>
  </section>
</template>
