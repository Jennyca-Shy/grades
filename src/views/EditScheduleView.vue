<script setup>
import { RouterLink } from 'vue-router';
import WeeklyScheduleEdit from '@/components/Schedule/WeeklyScheduleEdit.vue';
import MonthlyScheduleEdit from '@/components/Schedule/MonthlyScheduleEdit.vue';

const props = defineProps({
  calendar: String,
});
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2">
    <div class="bg-white rounded-md p-4 h-[calc(100vh-24px-16px)] flex flex-col">
      <div class="flex justify-between">
        <h1>
          Edit Schedule
          <hr class="bg-newBlue" />
        </h1>
        <RouterLink to="/schedule"><button class="modal">Save</button></RouterLink>
      </div>
      <!-- Header with Date and Buttons -->
      <div class="mt-3 flex justify-between items-center mb-2">
        <div class=""></div>
        <div class="inline-flex rounded-lg shadow-2xs">
          <button
            v-for="view in ['week', 'month']"
            :key="view"
            type="button"
            :class="[
              'border py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium border-gray-200 text-gray-800 shadow-2xs disabled:opacity-50 disabled:pointer-events-none',
              calendar == view ? 'bg-gray-200/60' : 'bg-white hover:bg-gray-50',
            ]"
          >
            <RouterLink :to="view">{{ view.charAt(0).toUpperCase() + view.slice(1) }}</RouterLink>
          </button>
        </div>
      </div>
      <WeeklyScheduleEdit v-if="props.calendar === 'week'" />
      <MonthlyScheduleEdit v-if="props.calendar === 'month'" />
    </div>
  </section>
</template>
