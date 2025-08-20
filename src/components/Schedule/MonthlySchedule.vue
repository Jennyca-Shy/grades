<script setup>
import { ref, computed, onMounted } from 'vue';
import Appointment from './Appointment.vue';

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
let lastMonthStartingDay = computed(
  () =>
    new Date(today.value.getFullYear(), today.value.getMonth(), 0).getDate() -
    lastMonthDays.value +
    1,
);
console.log('Last month days: ', lastMonthDays.value);
console.log('Starting day:', lastMonthStartingDay.value);
let nextMonthDays = computed(() => 6 - lastDay.value.getDay());
let differenceMonth = 0;

let lastMonthList = ref([]);
function getLastMonthDays() {
  lastMonthList.value = [];
  for (let i = 0; i < lastMonthDays.value; i++) {
    lastMonthList.value.push(i + lastMonthStartingDay.value);
  }
}

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

const allAppointmentsRaw = ref([]);
async function getAllAppointments() {
  const response = await fetch('http://localhost:3000/appointment');
  const data = await response.json();
  allAppointmentsRaw.value = data;

  console.log(data);

  sortAppointments();
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/*const firstDayDisplayed = computed(
  () =>
    new Date(
      today.value.getFullYear(),
      today.value.getMonth() - 1,
      daysInMonth(today.value.getMonth() - 1, today.value.getFullYear()) - firstDay.value,
    ),
);*/

const firstDayDisplayed = computed(() => {
  const year = today.value.getFullYear();
  const month = today.value.getMonth() - 1;
  const daysInMonthCount = daysInMonth(year, month);
  const days = daysInMonthCount - firstDay.value.getDay() + 1;
  /*console.log('Days in month: ', daysInMonthCount);
  console.log('Days: ', days);
  console.log('firstDay.getDay(): ', firstDay.value.getDay());
  console.log('firstDayy:', firstDay.value);*/
  return new Date(year, month, days);
});
const lastDayDisplayed = computed(
  () => new Date(today.value.getFullYear(), today.value.getMonth() + 1, lastMonthDays.value + 1),
);
console.log('lastDayDisplayed: ', lastDayDisplayed.value);
console.log('firstDayDisplayed: ', firstDayDisplayed.value);

function calcDiffDays(start, end) {
  const diffInMs = Math.abs(start - end);
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
}

function sortAppointments() {
  //get this month's appointment
  const thisMonthAppointments = allAppointmentsRaw.value.filter((app) => {
    const monthStartDate = new Date(app.startDate);
    const monthEndDate = new Date(app.endDate);
    return monthStartDate >= firstDayDisplayed.value || monthEndDate <= lastDayDisplayed.value;
  });

  /*const monthStartDate = new Date(allAppointmentsRaw.value[0].startDate);
  console.log('Start date: ', monthStartDate);
  const monthEndDate = new Date(allAppointmentsRaw.value[0].endDate);
  console.log('End date: ', monthEndDate);*/
  //console.log('this month: ', JSON.stringify(thisMonthAppointments));

  //put them in a list, to display them with appointment component
  const diffInDays = calcDiffDays(firstDayDisplayed.value, lastDayDisplayed.value);
  console.log('diff in days:', diffInDays);
  let appointmentList = Array(diffInDays).fill(0);

  for (let i = 0; i < thisMonthAppointments.length; i++) {
    console.log(thisMonthAppointments[i]);

    const diffApp = calcDiffDays(
      new Date(thisMonthAppointments[i].startDate),
      new Date(thisMonthAppointments[i].endDate),
    );
    /*console.log('diffApp', diffApp);
    console.log('thisMonthAppointments[i].endDate', thisMonthAppointments[i].endDate);*/
    for (let j = 0; j < diffApp; j++) {}
  }
  console.log(appointmentList);
}

onMounted(async () => {
  getLastMonthDays();
  getAllAppointments();
});

defineExpose({
  nextMonth,
  lastMonth,
});
</script>

<template>
  <div
    class="grid grid-rows-[min-content_1fr] grid-cols-7 p-2 text-center h-full border-2 rounded-md overflowy-scrolly"
  >
    <div class="h-min border-b-2">Sun</div>
    <div class="h-min border-b-2">Mon</div>
    <div class="h-min border-b-2">Tue</div>
    <div class="h-min border-b-2">Wed</div>
    <div class="h-min border-b-2">Thu</div>
    <div class="h-min border-b-2">Fri</div>
    <div class="h-min border-b-2">Sat</div>

    <div
      class="col-span-7 grid grid-cols-[repeat(7,calc(100%/7))] min-h-[repeat(5,calc(100%/5))] pt-3 h-full"
    >
      <div v-for="day in lastMonthList" class="text-gray-400">{{ day }}</div>
      <div v-for="day in lastDay.getDate()" class="flex justify-center flex-col">
        <div class="w-full flex justify-center">
          <div
            :class="
              day === todayDate && differenceMonth === 0
                ? 'text-newWhite bg-newBlue rounded-md h-fit w-fit px-2'
                : ''
            "
          >
            {{ day }}
          </div>
        </div>
        <Appointment title="test" color="#4d6c9e" module="single" />
      </div>
      <div v-for="day in nextMonthDays" class="text-gray-400">{{ day }}</div>
    </div>
  </div>
</template>
