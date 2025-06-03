<script setup>
import Subjects from '@/components/Subjects/Subject.vue';
import AddLkModal from '@/components/Modal/AddLkModal.vue';
import AddGkModal from '@/components/Modal/AddGkModal.vue';
import { ref } from 'vue';

const lkOpen = ref(false);
const gkOpen = ref(false);
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
        <AddLkModal v-if="lkOpen" @close="lkOpen = false" />
      </div>
      <div class="grid grid-cols-3 mt-3 gap-2">
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
      </div>

      <div class="flex justify-between mt-4">
        <h1>
          Grundfächer
          <hr />
        </h1>
        <button @click="gkOpen = true" class="modal">Add</button>
        <AddLkModal v-if="gkOpen" @close="gkOpen = false" />
      </div>
      <div class="grid grid-cols-3 mt-3 gap-2">
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subjects subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
      </div>
    </div>
  </section>
</template>
