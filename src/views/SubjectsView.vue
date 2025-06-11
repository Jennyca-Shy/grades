<script setup>
import Subjects from '@/components/Subjects/Subject.vue';
import AddLkModal from '@/components/Modal/AddLkModal.vue';
import AddGkModal from '@/components/Modal/AddGkModal.vue';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const lkOpen = ref(false);
const gkOpen = ref(false);
const lkSubjects = ref();
const gkSubjects = ref();

async function getLK() {
  const response = await fetch('http://localhost:3000/subject/type/LK');
  const data = await response.json();
  lkSubjects.value = data;
  console.log(data);
}

async function getGK() {
  const response = await fetch('http://localhost:3000/subject/type/GK');
  const data = await response.json();
  gkSubjects.value = data;
  console.log(data);
}

let toast = useToast();
function toastSuccess() {
  toast.success('Successfully added new subject');
}

function addedLK() {
  toastSuccess();
  getLK();
}

function addedGK() {
  toastSuccess();
  getGK();
}

onMounted(() => {
  getLK();
  getGK();
});
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2">
    <div class="bg-white rounded-md p-4 h-[calc(100vh-24px-16px)] overflowy-scrolly">
      <div class="flex justify-between">
        <h1>
          Leistungsfächer
          <hr />
        </h1>
        <button @click="lkOpen = true" class="modal">Add</button>
        <AddLkModal v-if="lkOpen" @close="lkOpen = false" @added="addedLK" />
      </div>
      <div class="grid grid-cols-3 mt-3 gap-2">
        <Subjects
          v-for="subject in lkSubjects"
          :subject="subject.name"
          :teacher="subject.teacher"
          average="14.3P"
          :color="subject.color"
          :id="subject._id"
        />
      </div>

      <div class="flex justify-between mt-4">
        <h1>
          Grundfächer
          <hr />
        </h1>
        <button @click="gkOpen = true" class="modal">Add</button>
        <AddGkModal v-if="gkOpen" @close="gkOpen = false" @added="addedGK" />
      </div>
      <div class="grid grid-cols-3 mt-3 gap-2">
        <Subjects
          v-for="subject in gkSubjects"
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
