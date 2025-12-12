<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
const props = defineProps({
  schedule: Object,
});

//console.log('Props schedule: ', props.schedule);

const color = ref(props.schedule.subject.color);
//console.log('timeline object color: ', color.value);
const startTime = ref(props.schedule.startTime);
const endTime = ref(props.schedule.endTime);
const room = ref(props.schedule.subject.room);
const subjectName = ref(props.schedule.subject.name);
const subjectId = ref(props.schedule.subject._id);
const displaySubject = props.schedule.subject.type != 'other' ? true : false;
let duration = ref();
if (!displaySubject) {
  console.log(color.value);
  duration.value = toMinutes(endTime.value) - toMinutes(startTime.value);
}

function toMinutes(time) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}
</script>

<template>
  <RouterLink v-if="displaySubject" :to="`/subjects/${subjectId}`">
    <li :class="`mb-2 ml-3 p-2 rounded-md`" :style="`background-color: ${color}`">
      <div
        class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"
      ></div>
      <div class="">
        <time class="mb-1 text-sm font-normal leading-none text-gray-500"
          >{{ startTime }} - {{ endTime }}</time
        >
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">{{ subjectName }}</h3>
          <p class="text-gray-500 text-sm">{{ room }}</p>
        </div>
      </div>
    </li>
  </RouterLink>
  <RouterLink v-else :to="`/schedule`">
    <li :class="`mb-2 ml-3 p-2 rounded-md`" :style="`background-color: ${color}`">
      <div
        class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"
      ></div>
      <div class="">
        <h3 class="text-gray-900">{{ duration }}min Pause</h3>
      </div>
    </li>
  </RouterLink>
</template>
