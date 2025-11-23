<script setup>
import { useToast } from 'vue-toastification';
import { ref } from 'vue';

/*
weekday in longform
startTime in hh:mm
*/
const props = defineProps({
  schedule: Object,
  del: {
    type: Boolean,
    default: false,
  },
});

const weekDayStart = {
  Sunday: 2,
  Monday: 3,
  Tuesday: 4,
  Wednesday: 5,
  Thursday: 6,
  Friday: 7,
  Saturday: 8,
};

// id: String,
//   weekday: String,
//   startTime: String,
//   endTime: String,
//   subjectName: String,
//   subjectColor: String,
//   room: {
//     type: String,
//     default: '140',
//   },

const id = ref(props.schedule._id);
const weekday = ref(props.schedule.weekday);
const startTime = ref(props.schedule.startTime);
const endTime = ref(props.schedule.endTime);
const subjectName = ref(props.schedule.subject.name);
const subjectColor = ref(props.schedule.subject.color);
const room = ref(props.schedule.room ? props.schedule.room : props.schedule.subject.room);

const [hourEnd, minuteEnd] = endTime.value.split(':').map(Number);
const [hour, minute] = startTime.value.split(':').map(Number);
const duration = (hourEnd - hour) * 60 + (minuteEnd - minute);

const gridRowStart = 2 + (hour - 7) * 12 + Math.floor(minute / 5);
const gridRowSpan = Math.ceil(duration / 5);
const gridColStart = weekDayStart[weekday.value];

const rowStart = gridRowStart;
const colStart = gridColStart;
const rowEnd = gridRowSpan + gridRowStart;

console.log('Subject name: ', subjectName.value);
console.log('ID: ', id.value);

const emit = defineEmits(['deleted']);

const toast = useToast();
async function deleteEvent() {
  const response = await fetch(`http://localhost:3000/schedule/single/${id.value}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.error('Something went wrong');
  } else {
    toast.success('Deleted');
    emit('deleted');
  }
}

let pause = false;
if (subjectName.value == 'Break') {
  pause = true;
}
console.log('Pause: ', pause);
</script>

<template>
  <div
    class="p-px"
    :style="`grid-row-start: ${rowStart}; grid-row-end: ${rowEnd}; grid-column-start:${colStart};`"
  >
    <div
      v-if="!pause"
      class="rounded size-full text-left px-1 text-sm"
      :style="`background-color: ${subjectColor}`"
    >
      <div class="flex items-center justify-between">
        <time class="text-xs font-normal text-gray-700 mt-1"
          >{{ startTime }}
          <p class="hidden mid:inline">- {{ endTime }}</p></time
        >

        <div class="text-red-700 font-bold cursor-pointer" v-if="del" @click="deleteEvent">x</div>
      </div>
      <div class="flex justify-between items-start mid:items-center flex-col mid:flex-row">
        <h3 class="font-semibold">
          {{ subjectName ? subjectName.slice(0, 3).toUpperCase() : 'waiting' }}
        </h3>
        <p class="text-xs text-gray-700">{{ room }}</p>
      </div>
    </div>

    <div
      v-else
      class="bg-gray-300 text-gray-700 rounded-md size-full text-xs flex items-center justify-center px-2"
    >
      {{ duration }}min
      <div v-if="del" class="ml-auto">
        <div class="text-red-700 font-bold cursor-pointer" @click="deleteEvent">x</div>
      </div>
    </div>
  </div>
</template>
