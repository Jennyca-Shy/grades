<script setup>
import { computed } from 'vue';
const props = defineProps({
  subject: String,
  task: String,
  date: String,
  color: String,
});
const borderColorClass = computed(() => `border-${props.color}`);
const textColorClass = computed(() => `text-${props.color}`);

function parseDate() {
  const [day, month, year] = props.date.split('.');
  return new Date(year, month - 1, day);
}

const dateExam = computed(() => parseDate());

function calculateDays() {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const today = new Date();
  console.log(today);

  //diffTime is the difference in ms
  const diffTime = dateExam.value - today;
  console.log(diffTime);
  const diffDays = Math.ceil(diffTime / MS_PER_DAY);

  let output = '';
  if (diffDays > 1) {
    output = 'in ' + diffDays + ' days';
  } else if (diffDays === 1) {
    output = 'in ' + diffDays + ' day';
  } else if (diffDays === 0) {
    output = 'today';
  } else if (diffDays === -1) {
    output = 'yesterday';
  } else {
    output = diffDays * -1 + ' days ago';
  }

  return output;
}
</script>

<template>
  <div :class="`bg-gray-100 p-2 rounded-md flex items-center border-l-[3px] ${borderColorClass}`">
    <div class="">
      <div class="text-xs flex">
        {{ subject }}
        <div v-if="date" class="">, {{ calculateDays() }}</div>
      </div>
      <div class="">{{ task }}</div>
    </div>
    <div
      v-if="date"
      :class="`pi pi-ellipsis-v ml-auto cursor-pointer mr-1 ${textColorClass}`"
    ></div>
    <div
      v-else
      :class="`cursor-pointer border-[3px] ${borderColorClass} rounded-full size-6 ml-auto mr-2`"
    ></div>
  </div>
</template>
