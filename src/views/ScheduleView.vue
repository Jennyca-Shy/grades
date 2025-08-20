<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import WeeklySchedule from '@/components/Schedule/WeeklySchedule.vue';
import MonthlySchedule from '@/components/Schedule/MonthlySchedule.vue';

const activeView = ref('week');
const monthlyScheduleRef = ref();

function scheduleNextMonth() {
  monthlyScheduleRef.value.nextMonth();
  displayedDate.value = new Date(
    displayedDate.value.getFullYear(),
    displayedDate.value.getMonth() + 1,
    4,
  );
}

function scheduleLastMonth() {
  monthlyScheduleRef.value.lastMonth();
  displayedDate.value = new Date(
    displayedDate.value.getFullYear(),
    displayedDate.value.getMonth() - 1,
    4,
  );
}

const MONTH = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

let today = ref(new Date());
let displayedDate = ref(new Date());
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2">
    <div class="bg-white rounded-md p-4 h-[calc(100vh-24px-16px)] flex flex-col">
      <div class="flex justify-between">
        <h1>
          Schedule
          <hr class="bg-newBlue" />
        </h1>
        <RouterLink v-if="activeView === 'week'" to="schedule/edit/week"
          ><button class="modal">Edit</button></RouterLink
        >
        <RouterLink v-if="activeView === 'month'" to="schedule/edit/month"
          ><button class="modal">Edit</button></RouterLink
        >
      </div>
      <!-- Header with Date and Buttons -->
      <div class="mt-3 flex justify-between items-center mb-2">
        <!-- Month and Year -->
        <div class="">
          <div class="flex justify-between items-center" v-if="activeView === 'month'">
            <span @click="scheduleLastMonth" class="pi pi-angle-left cursor-pointer"></span>
            <h2 class="font-semibold text-newBlue py-3 px-4">
              {{ MONTH[displayedDate.getMonth()] }} {{ displayedDate.getFullYear() }}
            </h2>
            <span @click="scheduleNextMonth" class="pi pi-angle-right cursor-pointer"></span>
          </div>
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
      <MonthlySchedule v-if="activeView === 'month'" ref="monthlyScheduleRef" />
    </div>
  </section>
</template>
