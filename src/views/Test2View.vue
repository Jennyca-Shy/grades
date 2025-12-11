<script setup>
import { ref, computed, onMounted } from 'vue';
import Appointment from '@/components/Schedule/Appointment.vue';

let todayDate = ref(new Date());
let todayDay = computed(() => new Date().getDate());
console.log('Today day: ', todayDay.value);

//This month
let thisMonthFirstDate = computed(
  () => new Date(todayDate.value.getFullYear(), todayDate.value.getMonth(), 1),
);
let thisMonthLastDate = computed(
  () => new Date(todayDate.value.getFullYear(), todayDate.value.getMonth() + 1, 0),
);

//Last month
let lastMonthDays = computed(() => thisMonthFirstDate.value.getDay());
let lastMonthStartingDay = computed(
  () =>
    new Date(todayDate.value.getFullYear(), todayDate.value.getMonth(), 0).getDate() -
    lastMonthDays.value +
    1,
);
let lastMonthList = ref([]);
function getLastMonthDays() {
  //List with the days of the last month
  lastMonthList.value = [];
  for (let i = 0; i < lastMonthDays.value; i++) {
    lastMonthList.value.push(i + lastMonthStartingDay.value);
  }
  console.log('Last month days: ', lastMonthList.value);
  getLastHolidays();
}

//Next month
let nextMonthDays = computed(() => 6 - thisMonthLastDate.value.getDay());

//Calendar function (get next/last month)
//Called from the parent
let differenceMonth = 0;
function nextMonth() {
  todayDate.value = new Date(todayDate.value.getFullYear(), todayDate.value.getMonth() + 1, 4);
  differenceMonth++;
  getLastMonthDays();
  getThisHolidays();
  getNextHolidays();
}
function lastMonth() {
  todayDate.value = new Date(todayDate.value.getFullYear(), todayDate.value.getMonth() - 1, 4);
  differenceMonth--;
  getLastMonthDays();
  getThisHolidays();
  getNextHolidays();
}

//Holiday
//get holidays
// let allHolidays = ref([]);
// async function getHolidays() {
//   let response = await fetch('http://localhost:3000/holiday');
//   let data = await response.json();

//   allHolidays.value = data;
// }

//get holiday on this day for calendar appointments
//month 0-indexed
// function getTodaysHoliday(date, day) {
//   return allHolidays.value.filter((hol) => {
//     let holStart = new Date(hol.startDate);
//     let holEnd = new Date(hol.endDate);
//     let search = new Date(date.getFullYear(), date.getMonth(), day);
//     return holStart <= search && holEnd >= search;
//   });
// }

//get holidays for the last month
let lastMonthHolidays = ref([]);
function getLastHolidays() {
  let curr;
  lastMonthHolidays.value = [];
  for (let i = 0; i < lastMonthDays.value; i++) {
    curr = new Date(
      todayDate.value.getFullYear(),
      todayDate.value.getMonth() - 1,
      lastMonthStartingDay.value + i,
    );
    console.log('Curr date: ', curr);
    let holidayToday = allHolidays.value
      .filter((hol) => {
        let startDate = new Date(hol.startDate);
        let endDate = new Date(hol.endDate);
        return startDate <= curr && endDate >= curr;
      })
      .map((hol) => {
        let startDate = new Date(hol.startDate).toDateString();
        let endDate = new Date(hol.endDate).toDateString();
        let type = 'middle';
        curr = curr.toDateString();
        if (curr === startDate && curr === endDate) {
          type = 'single';
        } else if (curr === startDate) {
          type = 'start';
        } else if (curr === endDate) {
          type = 'end';
        }
        return {
          text: hol.name[0].text,
          type: type,
        };
      });
    lastMonthHolidays.value.push(holidayToday);
  }
  console.log('Last month holidays: ', lastMonthHolidays.value);
}

//get holidays for this month
let thisMonthHolidays = ref([]);
function getThisHolidays() {
  let curr;
  thisMonthHolidays.value = [];
  for (let i = 0; i < thisMonthLastDate.value.getDate(); i++) {
    curr = new Date(todayDate.value.getFullYear(), todayDate.value.getMonth(), 1 + i);
    let holidayToday = allHolidays.value
      .filter((hol) => {
        let startDate = new Date(hol.startDate);
        let endDate = new Date(hol.endDate);
        return startDate <= curr && endDate >= curr;
      })
      .map((hol) => {
        let startDate = new Date(hol.startDate).toDateString();
        let endDate = new Date(hol.endDate).toDateString();
        let type = 'middle';
        curr = curr.toDateString();
        if (curr === startDate && curr === endDate) {
          type = 'single';
        } else if (curr === startDate) {
          type = 'start';
        } else if (curr === endDate) {
          type = 'end';
        }
        return {
          text: hol.name[0].text,
          type: type,
        };
      });
    thisMonthHolidays.value.push(holidayToday);
  }
  console.log('this month holidays: ', thisMonthHolidays.value);
}

//get holidays for next month
let nextMonthHolidays = ref([]);
function getNextHolidays() {
  let curr;
  nextMonthHolidays.value = [];
  for (let i = 0; i < nextMonthDays.value; i++) {
    curr = new Date(todayDate.value.getFullYear(), todayDate.value.getMonth() + 1, 1 + i);
    let holidayToday = allHolidays.value
      .filter((hol) => {
        let startDate = new Date(hol.startDate);
        let endDate = new Date(hol.endDate);
        return startDate <= curr && endDate >= curr;
      })
      .map((hol) => {
        let startDate = new Date(hol.startDate).toDateString();
        let endDate = new Date(hol.endDate).toDateString();
        let type = 'middle';
        curr = curr.toDateString();
        if (curr === startDate && curr === endDate) {
          type = 'single';
        } else if (curr === startDate) {
          type = 'start';
        } else if (curr === endDate) {
          type = 'end';
        }
        return {
          text: hol.name[0].text,
          type: type,
        };
      });
    nextMonthHolidays.value.push(holidayToday);
  }
  console.log('next month holidays: ', nextMonthHolidays.value);
}

onMounted(async () => {
  getLastMonthDays();
  getHolidays();
  getThisHolidays();
  getNextHolidays();
});

//Accessible from its parent
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
      <div
        v-for="(day, index) in lastMonthList"
        :key="index"
        class="flex justify-center flex-col text-gray-400"
      >
        {{ day }}
        <Appointment
          v-for="hol in lastMonthHolidays[index]"
          :title="hol.text"
          color="#4d6c9e"
          :module="hol.type"
        />
      </div>
      <div v-for="day in thisMonthLastDate.getDate()" class="flex justify-center flex-col">
        <div class="w-full flex justify-center">
          <div
            :class="
              day === todayDay && differenceMonth === 0
                ? 'text-newWhite bg-newBlue rounded-md h-fit w-fit px-2'
                : ''
            "
          >
            {{ day }}
          </div>
        </div>
        <Appointment
          v-for="hol in thisMonthHolidays[day - 1]"
          :title="hol.text"
          color="#4d6c9e"
          :module="hol.type"
        />
      </div>
      <div v-for="day in nextMonthDays" class="text-gray-400 flex justify-center flex-col">
        {{ day }}
        <Appointment
          v-for="hol in nextMonthHolidays[day - 1]"
          :title="hol.text"
          color="#4d6c9e"
          :module="hol.type"
        />
      </div>
    </div>
  </div>
</template>
