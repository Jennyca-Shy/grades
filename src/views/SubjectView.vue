<script setup>
import { ref, onMounted } from 'vue';
import EditSubjectModal from '@/components/Modal/EditSubjectModal.vue';
import HomeworkSection from '@/components/Subject/HomeworkSection.vue';
import GradeSection from '@/components/Subject/GradeSection.vue';
import NoteSection from '@/components/Subject/NoteSection.vue';
import ExamSection from '@/components/Subject/ExamSection.vue';
import { useRoute, RouterLink } from 'vue-router';

const editSubjectOpen = ref(false);

//Get homework and subject via api
const route = useRoute();
const id = route.params.id;
let subject = ref();
let data;
async function getSubject() {
  const response = await fetch(`http://localhost:3000/subject/id/${id}`);
  data = await response.json();

  subject.value = data;
  console.log(subject.value);
  console.log('Got subject');
}

onMounted(() => {
  getSubject();
  //getExams();
});
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2 flex flex-col">
    <!-- Header with subject, room and teacher -->
    <div class="p-2 bg-white rounded-md">
      <div class="flex justify-between">
        <ol class="flex">
          <li class="flex items-center mr-2">
            <RouterLink class="mr-2" to="/subjects">Subjects</RouterLink>
            <span class="pi pi-angle-right"></span>
          </li>
          <li class="flex items-center">
            <h1>
              {{ subject?.name || 'Loading...' }}
              <hr :style="`background-color: ${subject?.color};`" />
            </h1>
          </li>
        </ol>

        <div class="flex space-x-8 justify-between items-center">
          <div class="">Room: {{ subject?.room }}</div>
          <div class="">Teacher: {{ subject?.teacher }}</div>
          <button
            @click="editSubjectOpen = true"
            class="mr-1 px-1 border-2 rounded-md"
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
              getSubject();
            }
          "
          :subject="data"
        />
      </div>
    </div>
    <!-- Main part -->
    <div class="grid grid-cols-2 grid-rows-2 mt-3 gap-2 flex-1 overflowy-scrolly">
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
