<script setup>
import Task from './Task.vue';
</script>

<template>
  <div class="grid grid-cols-5 grid-rows-2 flex-grow h-[300px]">
    <div class="col-span-3 row-span-2 bg-white rounded-md m-2 p-2">
      <h1 class="ml-1">
        Homework
        <hr />
      </h1>
      <div class="ml-2 mt-2">
        <div class="flex items-center mt-2">
          <p>Today</p>
          <div class="text-sm ml-1.5 text-gray-600">(4)</div>
        </div>
        <div
          class="pr-2 overflow-y-auto h-[220px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full"
        >
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
      <div
        class="ml-2 mt-3 pr-2 overflow-y-auto h-[220px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <Task subject="Mathe" color="blue-500" task="Erste Ableitung" date="20.05.2025" />
      </div>
    </div>
  </div>
</template>
