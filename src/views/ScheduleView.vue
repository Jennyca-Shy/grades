<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import WeeklySchedule from '@/components/Schedule/WeeklySchedule.vue';
import MonthlySchedule from '@/components/Schedule/MonthlySchedule.vue';

const activeView = ref('week');
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2">
    <div class="bg-white rounded-md p-4 h-[calc(100vh-24px-16px)] flex flex-col">
      <div class="flex justify-between">
        <h1>
          Schedule
          <hr class="bg-newBlue" />
        </h1>
        <RouterLink to="schedule/edit"><button class="modal">Edit</button></RouterLink>
      </div>
      <!-- Header with Date and Buttons -->
      <div class="mt-3 flex justify-between items-center mb-2">
        <div class="flex justify-between items-center">
          <a href=""><span class="pi pi-angle-left"></span></a>
          <h2 class="font-semibold text-newBlue py-3 px-4">May 2025</h2>
          <a href=""><span class="pi pi-angle-right"></span></a>
        </div>
        <div class="inline-flex rounded-lg shadow-2xs">
          <button
            v-for="view in ['week', 'month']"
            :key="view"
            @click="activeView = view"
            type="button"
            :class="[
              'border py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium border-gray-200 text-gray-800 shadow-2xs disabled:opacity-50 disabled:pointer-events-none',
              activeView == view ? 'bg-gray-200/60' : 'bg-white hover:bg-gray-50',
            ]"
          >
            {{ view.charAt(0).toUpperCase() + view.slice(1) }}
          </button>
        </div>
      </div>
      <WeeklySchedule v-if="activeView === 'week'" />
      <MonthlySchedule v-if="activeView === 'month'" />
    </div>
  </section>
</template>
