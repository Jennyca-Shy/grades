<script setup>
import { ref, computed } from 'vue';
import TimelineObject from './TimelineObject.vue';

//listsss
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

//Get first day of month
let today = ref(new Date());
let todayDate = ref(today.value.getDate());
let firstDay = computed(() => new Date(today.value.getFullYear(), today.value.getMonth(), 1));
let lastDay = computed(() => new Date(today.value.getFullYear(), today.value.getMonth() + 1, 0));
let lastMonthDays = computed(() => firstDay.value.getDay());
let nextMonthDays = computed(() => 6 - lastDay.value.getDay());

function nextMonth() {
  today.value = new Date(today.value.getFullYear(), today.value.getMonth() + 1, 4);
  todayDate.value = -1;
}
function lastMonth() {
  today.value = new Date(today.value.getFullYear(), today.value.getMonth() - 1, 4);
  if (today.value.getMonth() === new Date().getMonth()) {
    today.value = new Date();
    todayDate.value = today.value.getDate();
    console.log('Welcome back!');
  } else {
    todayDate.value = -1;
  }
}

// console.log('First day: ', firstDay);
// console.log('Last Day: ', lastDay);
// console.log('First Day weekday: ', firstDay.getDate());
// console.log('lastDay.getDay(): ', lastDay.getDate());
</script>

<template>
  <div class="bg-white rounded-md m-2 p-2 h-[calc(100vh-40px)] flex flex-col">
    <div class="flex justify-center mt-2 mb-3">
      <h1>
        Schedule
        <hr class="bg-newBlue" />
      </h1>
    </div>

    <!-- Small monthly Calendar -->
    <section class="">
      <!-- Title -->
      <div class="flex justify-between items-center mb-1">
        <span @click="lastMonth" class="pi pi-angle-left cursor-pointer"></span>
        <h2 class="font-semibold text-newBlue">
          {{ MONTH[today.getMonth()] }} {{ today.getFullYear() }}
        </h2>
        <span @click="nextMonth" class="pi pi-angle-right cursor-pointer"></span>
      </div>

      <div class="grid grid-cols-7 p-2 text-center">
        <div class="text-xs">Sun</div>
        <div class="text-xs">Mon</div>
        <div class="text-xs">Tue</div>
        <div class="text-xs">Wed</div>
        <div class="text-xs">Thu</div>
        <div class="text-xs">Fri</div>
        <div class="text-xs">Sat</div>
        <div class="col-span-7 grid grid-cols-7 mt-1">
          <div v-for="lastMonth in lastMonthDays" class="text-gray-400">28</div>
          <div
            v-for="day in lastDay.getDate()"
            :class="day === todayDate ? 'text-newWhite bg-newBlue rounded-md' : ''"
          >
            {{ day }}
          </div>
          <div v-for="nextMonth in nextMonthDays" class="text-gray-400">{{ nextMonth }}</div>
        </div>
      </div>
    </section>
    <!-- Overview of the day -->
    <section class="mt-2 ml-2 flex-grow pl-1 overflowy-scrolly">
      <ol class="relative border-s border-gray-200 mr-2">
        <TimelineObject duration="8:30-9:15" subject="Latin" room="140" color="bg-yellow-100" />
        <TimelineObject duration="9:15-10:00" subject="Physics" room="026" color="bg-purple-100" />
        <TimelineObject duration="25min" color="bg-gray-200" />
        <TimelineObject duration="10:25:11:10" subject="WR" room="140" color="bg-emerald-100" />
        <TimelineObject duration="11:10-11:55" subject="Maths" room="140" color="bg-blue-100" />
        <TimelineObject duration="5min" color="bg-gray-200" />
        <TimelineObject duration="12:00-12:45" subject="German" room="140" color="bg-red-100" />
        <TimelineObject duration="12:45-13:30" subject="English" room="140" color="bg-green-100" />
      </ol>
    </section>
  </div>
</template>
