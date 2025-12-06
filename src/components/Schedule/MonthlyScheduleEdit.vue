<script setup>
import Appointment from './Appointment.vue';
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import MonthlySchedule from './MonthlySchedule.vue';
import { useSubjectStore } from '@/stores/subjectStore';
import { storeToRefs } from 'pinia';

const subjectStore = useSubjectStore();

//Subject dropdown
//selectedSubject -> Subject object
const { subject } = storeToRefs(subjectStore);
// async function getSubjects() {
//   const response = await fetch('http://localhost:3000/subject');
//   const data = await response.json();

//   subjects.value = data;
// }

const selectedSubject = ref('');
let selectedSubjectName = ref('');
const dropdownVisibleSubject = ref(false);

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
}

function toggleDropdownVisibleSubject() {
  dropdownVisibleSubject.value = !dropdownVisibleSubject.value;
  selectedSubject.value = '';
  selectedSubjectName.value = '';
}

//Select variables
const startDate = ref();
const endDate = ref();

//Fetch schedule
const appointment = ref([]);
async function getAppointment() {
  const response = await fetch('http://localhost:3000/appointment');
  const data = await response.json();

  appointment.value = data;
  console.log('Appintments: ', appointment.value);
}

const toast = useToast();

onMounted(() => {
  // getSubjects();
  getAppointment();
});
</script>

<template>
  <div class="grid grid-cols-4 h-full flex-1 overflowy-scrolly">
    <div class="col-span-3">
      <MonthlySchedule></MonthlySchedule>
    </div>
    <div class="col-span-1 p-2">
      <div class="mx-2 text-lg font-semibold">Add Appointment</div>
      <form @submit.prevent="addSchedule" class="mt-3 mx-2 text-sm flex flex-col w-full">
        <div class="">Title</div>
        <div class=""><input type="text" placeholder="Enter title" /></div>
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

        <div for="hours">Start date:</div>
        <div class="flex gap-1">
          <input type="date" id="startDate" name="startDate" v-model="startDate" />
        </div>

        <div for="hours">End date:</div>
        <div class="flex gap-1">
          <input type="date" id="endDate" name="endDate" v-model="endDate" />
        </div>

        <div class="flex justify-between">
          <button class="ml-auto px-1 border-2 rounded-md border-newBlue" type="submit">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>
