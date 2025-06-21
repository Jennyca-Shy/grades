<script setup>
import { ref } from 'vue';
import WeeklyScheduleEdit from '@/components/Schedule/WeeklyScheduleEdit.vue';

const activeView = ref('week');
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2">
    <div class="bg-white rounded-md p-4 h-[calc(100vh-24px-16px)] flex flex-col">
      <div class="flex justify-between mb-3">
        <ol class="flex">
          <li class="flex items-center mr-2">
            <RouterLink class="mr-2" to="/schedule">Schedule</RouterLink>
            <span class="pi pi-angle-right"></span>
          </li>
          <li class="flex items-center">
            <h1>
              Edit weekly schedule
              <hr class="bg-newBlue" />
            </h1>
          </li>
        </ol>
      </div>
      <WeeklyScheduleEdit v-if="activeView === 'week'" />
    </div>
  </section>
</template>
