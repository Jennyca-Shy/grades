<script setup>
import { useToast } from 'vue-toastification';

/*
weekday in longform
startTime in hh:mm
*/
const props = defineProps({
  id: String,
  weekday: String,
  startTime: String,
  endTime: String,
  subjectName: String,
  subjectColor: String,
  pause: {
    type: Boolean,
    default: false,
  },
  room: {
    type: String,
    default: '140',
  },
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

const [hourEnd, minuteEnd] = props.endTime.split(':').map(Number);
const [hour, minute] = props.startTime.split(':').map(Number);
const duration = (hourEnd - hour) * 60 + (minuteEnd - minute);

const gridRowStart = 2 + (hour - 7) * 12 + Math.floor(minute / 5);
const gridRowSpan = Math.ceil(duration / 5);
const gridColStart = weekDayStart[props.weekday];

const rowStart = gridRowStart;
const colStart = gridColStart;
const rowEnd = gridRowSpan + gridRowStart;

console.log('Subject name: ', props.subjectName);
console.log('ID: ', props.id);

const emit = defineEmits(['deleted']);

const toast = useToast();
async function deleteEvent() {
  const response = await fetch(`http://localhost:3000/schedule/single/${props.id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.error('Something went wrong');
  } else {
    toast.success('Deleted');
    emit('deleted');
  }
}
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
          >{{ props.startTime }} - {{ props.endTime }}</time
        >

        <div class="text-red-700 font-bold cursor-pointer" v-if="del" @click="deleteEvent">x</div>
      </div>
      <div class="flex justify-between items-center">
        <h3 class="font-semibold">
          {{ props.subjectName.slice(0, 3).toUpperCase() }}
        </h3>
        <p class="text-xs text-gray-700">{{ room }}</p>
      </div>
    </div>

    <div
      v-else
      class="bg-gray-300 text-gray-700 rounded-md size-full text-xs flex items-center justify-center"
    >
      {{ duration }}min
    </div>
  </div>
</template>
