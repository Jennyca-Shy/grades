<script setup>
import ScheduleEvent from './ScheduleEvent.vue';
import { onMounted, ref } from 'vue';

//Fetch schedule
const schedule = ref([]);
async function getSchedule() {
  const response = await fetch('http://localhost:3000/schedule');
  const data = await response.json();

  schedule.value = data;
  console.log('schedule: ', schedule.value);
}

onMounted(() => {
  getSchedule();
});
</script>
<template>
  <div
    class="border-2 p-2 rounded-md grid grid-cols-[50px_repeat(7,1fr)] grid-rows-[26px_repeat(108,5px)] h-full text-center flex-1 overflowy-scrolly"
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
    <ScheduleEvent
      v-for="sched in schedule"
      :schedule="sched"
      :delete="true"
      @deleted="getSchedule"
    />
    <!-- <div class="row-start-[11] col-start-5 row-end-[29] bg-blue-300 rounded text-xs">hello</div> -->
  </div>
</template>
