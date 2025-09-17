<script setup>
import Hourglass from '@/components/Pomodoro/Hourglass.vue';
import ToDoList from '@/components/Pomodoro/ToDoList.vue';
import Timer from '@/components/Pomodoro/Timer.vue';
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2 flex flex-col">
    <div class="rounded-md h-[calc(100vh-24px-16px)] flex flex-col">
      <div class="p-2 bg-white rounded-md">
        <ol class="flex">
          <li class="flex items-center mr-2">
            <RouterLink class="mr-2" to="/other">Other</RouterLink>
            <span class="pi pi-angle-right"></span>
          </li>
          <li class="flex items-center">
            <h1>
              Pomodoro Timer
              <hr class="bg-newBlue" />
            </h1>
          </li>
        </ol>
      </div>
      <div class="flex flex-row mt-3 gap-2 overflowy-scrolly h-full">
        <div class="w-2/3 rounded-md bg-white flex-1"><ToDoList /></div>
        <div class="w-1/3 rounded-md bg-white"><Timer /></div>
      </div>
    </div>
  </section>
</template>
