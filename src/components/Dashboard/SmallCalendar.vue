<script setup>
import { ref, computed, onMounted } from 'vue';
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

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//Calendar logic
let today = ref(new Date());
let todayDate = ref(today.value.getDate());
let firstDay = computed(() => new Date(today.value.getFullYear(), today.value.getMonth(), 1));
let lastDay = computed(() => new Date(today.value.getFullYear(), today.value.getMonth() + 1, 0));
let lastMonthDays = computed(() => firstDay.value.getDay());
let lastMonthStartingDay = computed(
  () =>
    new Date(today.value.getFullYear(), today.value.getMonth(), 0).getDate() -
    lastMonthDays.value +
    1,
);
let nextMonthDays = computed(() => 6 - lastDay.value.getDay());
let differenceMonth = 0;

function nextMonth() {
  today.value = new Date(today.value.getFullYear(), today.value.getMonth() + 1, 4);
  //todayDate.value = -1;
  differenceMonth++;
  getLastMonthDays();
}
function lastMonth() {
  today.value = new Date(today.value.getFullYear(), today.value.getMonth() - 1, 4);
  //todayDate.value = -1;
  differenceMonth--;
  getLastMonthDays();
}

let lastMonthList = ref([]);
function getLastMonthDays() {
  lastMonthList.value = [];
  for (let i = 0; i < lastMonthDays.value; i++) {
    lastMonthList.value.push(i + lastMonthStartingDay.value);
  }
}

//Display todays schedule
let displayedDate = ref(new Date());
let displayedDay = ref(displayedDate.value.getDay());
console.log('Displayed Day: ', displayedDay.value);
let schedule = ref([]);
let displayedSchedule = computed(() => {
  return schedule.value.filter((sched) => sched.weekday == DAYS[displayedDay.value]);
});

console.log('displayed schedule: ', displayedSchedule.value);

async function getSchedule() {
  const response = await fetch('http://localhost:3000/schedule');
  if (!response.ok) {
    console.log('ERROR');
    return;
  }
  const data = await response.json();

  schedule.value = data;
}

onMounted(() => {
  getLastMonthDays();
  getSchedule();
});
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
          <div v-for="day in lastMonthList" class="text-gray-400">{{ day }}</div>
          <div
            v-for="day in lastDay.getDate()"
            :class="
              day === todayDate && differenceMonth === 0
                ? 'text-newWhite bg-newBlue rounded-md'
                : ''
            "
          >
            {{ day }}
          </div>
          <div v-for="nextMonth in nextMonthDays" class="text-gray-400">{{ nextMonth }}</div>
        </div>
      </div>
    </section>
    <!-- Overview of the day -->
    <section class="mt-2 ml-2 flex-grow pl-1 overflowy-scrolly">
      <ol v-if="displayedSchedule.length > 0" class="relative border-s border-gray-200 mr-2">
        <!-- <TimelineObject duration="8:30-9:15" subject="Latin" room="140" color="bg-yellow-100" />
        <TimelineObject duration="9:15-10:00" subject="Physics" room="026" color="bg-purple-100" />
        <TimelineObject duration="25min" color="bg-gray-200" />
        <TimelineObject duration="10:25:11:10" subject="WR" room="140" color="bg-emerald-100" />
        <TimelineObject duration="11:10-11:55" subject="Maths" room="140" color="bg-blue-100" />
        <TimelineObject duration="5min" color="bg-gray-200" />
        <TimelineObject duration="12:00-12:45" subject="German" room="140" color="bg-red-100" />
        <TimelineObject duration="12:45-13:30" subject="English" room="140" color="bg-green-100" /> -->
        <TimelineObject v-for="sched in displayedSchedule" :schedule="sched" />
      </ol>
      <div v-else class="">Nothing to do today 🎉</div>
    </section>
  </div>
</template>
