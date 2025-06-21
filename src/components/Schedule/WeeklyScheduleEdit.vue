<script setup>
import ScheduleEvent from './ScheduleEvent.vue';
import { ref, onMounted, computed } from 'vue';

//Subject dropdown
//selectedSubject -> Subject object
let subjects = ref([]);
async function getSubjects() {
  const response = await fetch('http://localhost:3000/subject');
  const data = await response.json();

  subjects.value = data;
  console.log('Subjects: ', subjects);
}

onMounted(() => {
  getSubjects();
});

const selectedSubject = ref('');
let selectedSubjectName = ref('');
const dropdownVisibleSubject = ref(false);

const filteredSubjects = computed(() =>
  subjects.value.filter((subject) =>
    subject.name.toLowerCase().includes(selectedSubjectName.value.toLowerCase()),
  ),
);

//Select subject
function selectSubject(subject) {
  dropdownVisibleSubject.value = false;
  selectedSubject.value = subject;
  // console.log(selectedSubject.value);
  selectedSubjectName.value = subject.name;
}

function toggleDropdownVisibleSubject() {
  dropdownVisibleSubject.value = !dropdownVisibleSubject.value;
  selectedSubject.value = '';
}

//Dropdown days
const selectedDay = ref('Monday');
const dropdownVisibleDay = ref(false);
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function toggleDropdownVisibleDay() {
  dropdownVisibleDay.value = !dropdownVisibleDay.value;
  selectedSubject.value = '';
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
</script>
<template>
  <div class="grid grid-cols-4 h-full flex-1 overflowy-scrolly">
    <div
      class="col-span-3 border-2 p-2 rounded-md grid grid-cols-[50px_repeat(7,1fr)] grid-rows-[26px_repeat(108,5px)] h-full text-center flex-1 overflowy-scrolly"
    >
      <!-- Left column with time -->
      <div class="col-start-1 row-start-1 border-b-2">Time</div>
      <div v-for="i in 9" :class="[`col-start-1 row-start-[${(i - 1) * 12 + 2}] row-span-12`]">
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
      <ScheduleEvent weekday="Mon" startTime="7:45" title="Ethik" :duration="45" />
      <ScheduleEvent weekday="Mon" startTime="8:30" title="Geographie" :duration="45" />
      <ScheduleEvent weekday="Mon" startTime="9:15" title="Chemie" :duration="45" />
      <ScheduleEvent weekday="Mon" startTime="10:00" title="Pause" :duration="25" :pause="true" />
      <ScheduleEvent weekday="Mon" startTime="10:25" title="Deutsch" :duration="90" />
      <ScheduleEvent weekday="Mon" startTime="11:55" title="Pause" :duration="5" :pause="true" />
      <ScheduleEvent weekday="Mon" startTime="12:00" title="Mathe" :duration="45" />
      <ScheduleEvent weekday="Mon" startTime="13:30" title="Sport" :duration="90" />

      <ScheduleEvent weekday="Tue" startTime="8:30" title="Latein" :duration="45" />
      <ScheduleEvent weekday="Tue" startTime="9:15" title="Pyhsik" :duration="45" />
      <ScheduleEvent weekday="Tue" startTime="10:00" title="Pause" :duration="25" :pause="true" />
      <ScheduleEvent weekday="Tue" startTime="10:25" title="WR" :duration="45" />
      <ScheduleEvent weekday="Tue" startTime="11:10" title="Mathe" :duration="45" />
      <ScheduleEvent weekday="Tue" startTime="11:55" title="Pause" :duration="5" :pause="true" />
      <ScheduleEvent weekday="Tue" startTime="12:00" title="Deutsch" :duration="45" />
      <ScheduleEvent weekday="Tue" startTime="12:45" title="Englisch" :duration="45" />

      <ScheduleEvent weekday="Wed" startTime="7:45" title="Info" :duration="90" />
      <ScheduleEvent weekday="Wed" startTime="9:15" title="WR" :duration="45" />
      <ScheduleEvent weekday="Wed" startTime="10:00" title="Pause" :duration="25" :pause="true" />
      <ScheduleEvent weekday="Wed" startTime="10:25" title="PuG" :duration="45" />
      <ScheduleEvent weekday="Wed" startTime="11:10" title="Geo" :duration="45" />
      <ScheduleEvent weekday="Wed" startTime="11:55" title="Pause" :duration="5" :pause="true" />
      <ScheduleEvent weekday="Wed" startTime="12:00" title="Physik" :duration="45" />
      <ScheduleEvent weekday="Wed" startTime="12:45" title="Ethik" :duration="45" />

      <ScheduleEvent weekday="Thu" startTime="7:45" title="Englisch" :duration="45" />
      <ScheduleEvent weekday="Thu" startTime="8:30" title="Kunst" :duration="90" />
      <ScheduleEvent weekday="Thu" startTime="10:00" title="Pause" :duration="25" :pause="true" />
      <ScheduleEvent weekday="Thu" startTime="10:25" title="Latein" :duration="45" />
      <ScheduleEvent weekday="Thu" startTime="11:10" title="Physik" :duration="45" />
      <ScheduleEvent weekday="Thu" startTime="11:55" title="Pause" :duration="5" :pause="true" />
      <ScheduleEvent weekday="Thu" startTime="12:00" title="P-Seminar" :duration="90" />

      <ScheduleEvent weekday="Fri" startTime="7:45" title="Mathe" :duration="45" />
      <ScheduleEvent weekday="Fri" startTime="8:30" title="Chemie" :duration="45" />
      <ScheduleEvent weekday="Fri" startTime="9:15" title="Englisch" :duration="45" />
      <ScheduleEvent weekday="Fri" startTime="10:00" title="Pause" :duration="25" :pause="true" />
      <ScheduleEvent weekday="Fri" startTime="10:25" title="Geschichte" :duration="45" />
      <ScheduleEvent weekday="Fri" startTime="11:10" title="PuG" :duration="45" />
      <ScheduleEvent weekday="Fri" startTime="11:55" title="Pause" :duration="5" :pause="true" />
      <ScheduleEvent weekday="Fri" startTime="12:00" title="Latein" :duration="45" />

      <!-- <div class="row-start-[11] col-start-5 row-end-[29] bg-blue-300 rounded text-xs">hello</div> -->
    </div>
    <div class="col-span-1 p-2">
      <div class="mx-2 text-lg font-semibold">Add Schedule</div>
      <form @submit.prevent="editExam" class="mt-4 mx-2 text-sm flex flex-col w-full">
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
          <select name="startHours" id="startHours">
            <option v-for="hour in hours" :value="hour">{{ hour }}</option>
          </select>
          <select name="startMinutes" id="startMinutes">
            <option v-for="minute in minutes" :value="minute">{{ minute }}</option>
          </select>
        </div>

        <div for="hours">End time:</div>
        <div class="flex gap-1">
          <select name="endHours" id="endHours">
            <option v-for="hour in hours" :value="hour">{{ hour }}</option>
          </select>
          <select name="endMinutes" id="endMinutes">
            <option v-for="minute in minutes" :value="minute">{{ minute }}</option>
          </select>
        </div>

        <div class="flex justify-between">
          <button class="ml-auto px-1 border-2 rounded-md border-newBlue" type="submit">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>
