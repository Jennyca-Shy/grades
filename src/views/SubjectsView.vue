<script setup>
import Subjects from '@/components/Subjects/Subject.vue';
import AddLkModal from '@/components/Modal/AddLkModal.vue';
import AddGkModal from '@/components/Modal/AddGkModal.vue';
import AddSubjectModal from '@/components/Modal/AddSubjectModal.vue';
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useSubjectStore } from '@/stores/subjectStore';
import { storeToRefs } from 'pinia';

const subjectStore = useSubjectStore();

const lkOpen = ref(false);
const gkOpen = ref(false);
const sonstigesOpen = ref(false);
const { lk, gk, sonstiges } = storeToRefs(subjectStore);
// async function getLK() {
//   const response = await fetch('http://localhost:3000/subject/type/LK');
//   const data = await response.json();
//   lkSubjects.value = data;
//   console.log(data);
// }

// async function getGK() {
//   const response = await fetch('http://localhost:3000/subject/type/GK');
//   const data = await response.json();
//   gkSubjects.value = data;
//   console.log(data);
// }

// async function getSonstiges() {
//   let response = await fetch('http://localhost:3000/subject/type/sonstiges');
//   let data = await response.json();
//   sonstiges.value = data;

//   response = await fetch('http://localhost:3000/subject/type/seminar');
//   data = await response.json();
//   sonstiges.value = sonstiges.value.concat(data);
//   console.log(data);
// }

let toast = useToast();
function toastSuccess() {
  toast.success('Successfully added new subject');
}

// function addedLK() {
//   toastSuccess();
//   // getLK();
// }

// function addedGK() {
//   toastSuccess();
//   // getGK();
// }

// function addedSonstiges() {
//   toastSuccess();
//   // getSonstiges();
// }

onMounted(async () => {
  // getLK();
  // getGK();
  // getSonstiges();
  await subjectStore.init();
});
</script>

<template>
  <section class="md:m-3 md:p-2 m-2 p-1">
    <div class="bg-white rounded-md p-4 h-full overflowy-scrolly">
      <div class="flex justify-between">
        <h1>
          Leistungsfächer
          <hr class="bg-newBlue" />
        </h1>
        <button @click="lkOpen = true" class="modal">Add</button>
        <AddSubjectModal
          v-if="lkOpen"
          @close="lkOpen = false"
          @added="toastSuccess"
          subjectType="LK"
          subjectLong="Leistungsfach"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 mt-3 gap-2">
        <Subjects
          v-for="subject in lk"
          :subject="subject.name"
          :teacher="subject.teacher"
          :color="subject.color"
          :id="subject._id"
        />
      </div>

      <div class="flex justify-between mt-4">
        <h1>
          Grundfächer
          <hr class="bg-newBlue" />
        </h1>
        <button @click="gkOpen = true" class="modal">Add</button>
        <AddSubjectModal
          v-if="gkOpen"
          @close="gkOpen = false"
          @added="toastSuccess"
          subjectType="GK"
          subjectLong="Grundkurs"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 mt-3 gap-2">
        <Subjects
          v-for="subject in gk"
          :subject="subject.name"
          :teacher="subject.teacher"
          average="14.3P"
          :color="subject.color"
          :id="subject._id"
        />
      </div>

      <div class="flex justify-between mt-4">
        <h1>
          Sonstiges
          <hr class="bg-newBlue" />
        </h1>
        <button @click="sonstigesOpen = true" class="modal">Add</button>
        <AddSubjectModal
          v-if="sonstigesOpen"
          @close="sonstigesOpen = false"
          @added="toastSuccess"
          subjectType="sonstiges"
          subjectLong="Sonstiges"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 mt-3 gap-2">
        <Subjects
          v-for="subject in sonstiges"
          :subject="subject.name"
          :teacher="subject.teacher"
          average="14.3P"
          :color="subject.color"
          :id="subject._id"
        />
      </div>
    </div>
  </section>
</template>
