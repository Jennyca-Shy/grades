<script setup>
import { ref } from 'vue';
import Task from './Task.vue';
import AddHomeworkModal from './AddHomeworkModal.vue';

const isModalOpen = ref(false);
</script>

<template>
  <div class="grid grid-cols-5 grid-rows-2 flex-grow h-[300px]">
    <div class="col-span-3 row-span-2 bg-white rounded-md m-2 p-2">
      <div class="flex justify-between items-center">
        <h1 class="ml-1">
          Homework
          <hr />
        </h1>
        <button @click="isModalOpen = true" class="mr-1">Add</button>
        <AddHomeworkModal v-if="isModalOpen" @close="isModalOpen = false" />
      </div>
      <div class="ml-2 mt-2">
        <div class="flex items-center mt-2">
          <p>Today</p>
          <div class="text-sm ml-1.5 text-gray-600">(4)</div>
        </div>
        <div class="pr-2 h-[220px] overflowy-scrolly">
          <Task
            subject="Latein"
            color="yellow-500"
            task="S.92 Übersetzen + S.145 Vokabeln bis advocare"
          />
          <Task subject="Deutsch" color="red-500" task="S.120 im Buch lesen" />
          <Task subject="Geographie" color="slate-500" task="Tsunami lernen" />
          <Task subject="Mathe" color="blue-500" task="S.45/2a)" />
        </div>
      </div>
    </div>
    <div class="col-span-2 row-span-2 bg-white rounded-md m-2 p-2">
      <h1 class="ml-1">
        Upcoming Exams
        <hr />
      </h1>
      <div class="ml-2 mt-3 pr-2 h-[220px] overflowy-scrolly">
        <Task subject="Mathe" color="blue-500" task="Erste Ableitung" date="30.10.2025" />
      </div>
    </div>
  </div>
</template>
