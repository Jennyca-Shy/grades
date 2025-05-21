<script setup>
/*
weekday in shortform (Mon, Tue, Wed, ...)
startTime in hh:mm
duration in minutes
*/
const props = defineProps({
  weekday: String,
  startTime: String,
  duration: Number,
  title: String,
  pause: {
    type: Boolean,
    default: false,
  },
  room: {
    type: Number,
    default: 140,
  },
});

const weekDayStart = {
  Sun: 2,
  Mon: 3,
  Tue: 4,
  Wed: 5,
  Thu: 6,
  Fri: 7,
  Sat: 8,
};

const [hour, minute] = props.startTime.split(':').map(Number);
const gridRowStart = 2 + (hour - 7) * 12 + Math.floor(minute / 5);
const gridRowSpan = Math.ceil(props.duration / 5);
const gridColStart = weekDayStart[props.weekday];

const rowStart = gridRowStart;
const colStart = gridColStart;
const rowEnd = gridRowSpan + gridRowStart;

const endHour = hour + Math.floor((minute + props.duration) / 60);
let endMinute = (minute + props.duration) % 60;
if (endMinute == 0) {
  endMinute = '00';
}
const endTime = props.startTime + '-' + endHour + ':' + endMinute;
</script>

<template>
  <div
    class="p-px"
    :style="`grid-row-start: ${rowStart}; grid-row-end: ${rowEnd}; grid-column-start:${colStart};`"
  >
    <div v-if="!pause" class="bg-blue-300 rounded size-full text-left px-1 text-sm">
      <time class="text-xs font-normal leading-none text-gray-700">{{ endTime }}</time>
      <div class="flex justify-between items-center">
        <h3 class="">{{ title }}</h3>
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
