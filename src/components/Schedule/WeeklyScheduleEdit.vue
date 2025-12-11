<script setup>
import ScheduleEvent from './ScheduleEvent.vue';
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useSubjectStore } from '@/stores/subjectStore';
import { storeToRefs } from 'pinia';
import { useScheduleStore } from '@/stores/scheduleStore';

const subjectStore = useSubjectStore();
const scheduleStore = useScheduleStore();

//Subject dropdown
//selectedSubject -> Subject object
const { subject } = storeToRefs(subjectStore);

const selectedSubject = ref('');
let selectedSubjectName = ref('');
const dropdownVisibleSubject = ref(false);
const room = ref('');

const filteredSubjects = computed(() =>
  subject.value.filter((sub) =>
    sub.name.toLowerCase().includes(selectedSubjectName.value.toLowerCase()),
  ),
);

//Select subject
function selectSubject(sub) {
  dropdownVisibleSubject.value = false;
  selectedSubject.value = sub;
  // console.log(selectedSubject.value);
  selectedSubjectName.value = sub.name;
  room.value = sub.room;
}

function toggleDropdownVisibleSubject() {
  dropdownVisibleSubject.value = !dropdownVisibleSubject.value;
  selectedSubject.value = '';
  selectedSubjectName.value = '';
}

//Dropdown days
const selectedDay = ref('Monday');
const dropdownVisibleDay = ref(false);
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function toggleDropdownVisibleDay() {
  dropdownVisibleDay.value = !dropdownVisibleDay.value;
  selectedDay.value = '';
}

function selectDay(day) {
  dropdownVisibleDay.value = false;
  selectedDay.value = day;
}

//Select time
let hours = [];
let minutes = [];

for (let i = 7; i < 17; i++) {
  hours.push(i);
}

for (let i = 0; i < 60; i += 5) {
  minutes.push(i);
}
minutes[0] = '00';
minutes[1] = '05';

//Select variables
const hourStart = ref('7');
const minuteStart = ref('00');
const hourEnd = ref('7');
const minuteEnd = ref('00');

//Fetch schedule
const schedule = scheduleStore.schedule;
// async function getSchedule() {
//   const response = await fetch('http://localhost:3000/schedule');
//   const data = await response.json();

//   schedule.value = data;
//   console.log('schedule: ', schedule.value);
// }

const toast = useToast();

//Add schedule
function toMinutes(time) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

function overlapping(aStart, aEnd, bStart, bEnd) {
  return Math.max(aStart, bStart) > Math.min(aEnd, bEnd);
  //return (bStart <= aEnd && bStart >= aStart) || (bEnd <= aEnd && bEnd >= aStart);
}
function allowed(newStart, newEnd, day) {
  const newStartMin = toMinutes(newStart);
  const newEndMin = toMinutes(newEnd);
  for (const sched in schedule.value) {
    if (sched.weekday === day) {
      const existingStart = toMinutes(sched.startTime);
      const existingEnd = toMinutes(sched.endTime);

      if (overlapping(newStartMin, newEndMin, existingStart, existingEnd)) {
        console.log('HMMMM: ', newStartMin, newEndMin, existingStart, existingEnd);
        return false;
      }
    }
  }
  return true;
}
async function addSchedule() {
  console.log('hourStart: ', hourStart.value);
  const selectStartTime = hourStart.value + ':' + minuteStart.value;
  const selectEndTime = hourEnd.value + ':' + minuteEnd.value;
  if (!allowed(selectStartTime, selectEndTime, selectedDay)) {
    toast.error("Schedules can't overlap!");
    return 0;
  }
  if (toMinutes(selectStartTime) > toMinutes(selectEndTime)) {
    toast.error('The end time should be after the start time!');
    return 0;
  }

  const res = scheduleStore.addSchedule(
    selectedDay.value,
    selectedSubject.value,
    selectStartTime,
    selectEndTime,
    room.value,
  );

  if (res === 'ok') {
    toast.success('Added to schedule!');
  } else {
    toast.error('Ups, something went wrong');
  }

  /*const response = await fetch('http://localhost:3000/schedule', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      weekday: selectedDay.value,
      subject: selectedSubject.value,
      startTime: selectStartTime,
      endTime: selectEndTime,
      room: room.value,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Fehler beim Hinzufügen: ', errorText);
  } else {
    // getSchedule();
    toast.success('Added to schedule!');
  }*/
}

onMounted(async () => {
  // getSubjects();
  // getSchedule();
  await subjectStore.init();
  await scheduleStore.init();
});
</script>

<template>
  <div class="grid grid-cols-4 h-full flex-1 overflowy-scrolly">
    <div
      class="col-span-3 border-2 p-2 rounded-md grid grid-cols-[50px_repeat(7,1fr)] grid-rows-[26px_repeat(120,5px)] h-full text-center flex-1 overflowy-scrolly"
    >
      <!-- Left column with time -->
      <div class="col-start-1 row-start-1 border-b-2">Time</div>
      <div v-for="i in 10" :class="[`col-start-1 row-start-[${(i - 1) * 12 + 2}] row-span-12`]">
        {{ i + 6 }}:00
      </div>

      <!-- Right colums with weekdays -->
      <div
        v-for="(value, index) in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
        :class="`col-start-[${index + 2}] row-start-1 row-span-1 col-span-1 border-b-2`"
      >
        {{ value }}
      </div>

      <!-- Schedule: every 5min is one row, Mon has col-start-2, 7:00 has row-start-2 -->
      <ScheduleEvent v-for="sched in schedule" :schedule="sched" :del="true" />

      <!-- <div class="row-start-[11] col-start-5 row-end-[29] bg-blue-300 rounded text-xs">hello</div> -->
    </div>
    <div class="col-span-1 p-2">
      <div class="mx-2 text-lg font-semibold">Add Schedule</div>
      <form @submit.prevent="addSchedule" class="mt-4 mx-2 text-sm flex flex-col w-full">
        <div class="relative mb-2">
          <div class="flex items-center justify-center relative">
            <div class="pi pi-search absolute right-3 top-1/4"></div>
            <input
              class="p-2 mb-1 focus:bg-white pr-8 w-full outline-newBlue"
              required
              type="text"
              placeholder="Subject"
              v-model="selectedSubjectName"
              @focus="toggleDropdownVisibleSubject()"
            />
          </div>
          <div
            class="absolute z-10 w-full bg-slate-200 rounded-b-md max-h-40 overflowy-scrolly"
            v-if="filteredSubjects.length && dropdownVisibleSubject"
          >
            <div
              v-for="subject in filteredSubjects"
              :key="subject"
              class="text-black p-2 cursor-pointer hover:text-newBlue"
              @click="selectSubject(subject)"
            >
              {{ subject.name }}
            </div>
          </div>
        </div>

        <input
          id="room"
          v-model="room"
          type="text"
          placeholder="Enter room"
          :style="`outline-color: ${color}`"
          required
        />

        <div class="relative mb-2">
          <div class="flex items-center justify-center relative">
            <div class="pi pi-search absolute right-3 top-1/4"></div>
            <input
              class="p-2 mb-1 focus:bg-white pr-8 w-full outline-newBlue"
              required
              type="text"
              placeholder="Day"
              v-model="selectedDay"
              @focus="toggleDropdownVisibleDay()"
            />
          </div>
          <div
            class="absolute z-10 w-full bg-slate-200 rounded-b-md max-h-40 overflowy-scrolly"
            v-if="dropdownVisibleDay"
          >
            <div
              v-for="day in days"
              :key="day"
              class="text-black p-2 cursor-pointer hover:text-newBlue"
              @click="selectDay(day)"
            >
              {{ day }}
            </div>
          </div>
        </div>
        <div for="hours">Start time:</div>
        <div class="flex gap-1">
          <select name="startHours" id="startHours" v-model="hourStart">
            <option v-for="hour in hours" :value="hour" :key="hour">{{ hour }}</option>
          </select>
          <select name="startMinutes" id="startMinutes" v-model="minuteStart">
            <option v-for="minute in minutes" :value="minute" :key="minute">
              {{ minute }}
            </option>
          </select>
        </div>

        <div for="hours">End time:</div>
        <div class="flex gap-1">
          <select name="endHours" id="endHours" v-model="hourEnd">
            <option v-for="hour in hours" :value="hour" :key="hour">{{ hour }}</option>
          </select>
          <select name="endMinutes" id="endMinutes" v-model="minuteEnd">
            <option v-for="minute in minutes" :value="minute" :key="minute">
              {{ minute }}
            </option>
          </select>
        </div>

        <div class="flex justify-between">
          <button class="ml-auto px-1 border-2 rounded-md border-newBlue" type="submit">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>
