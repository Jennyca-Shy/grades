<script setup>
import { ref } from 'vue';
import EditExamModal from './Modal/EditExamModal.vue';

const props = defineProps({
  exam: Object,
});

console.log('GRADE: ', props.exam);

const editExamOpen = ref(false);

const color = props.exam.subject.color;
const notesOpen = ref(false);

//Calculate remaining days till date
function calculateDays() {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const today = new Date();
  // console.log('Todayyy: ', today);
  const dateExam = new Date(props.exam.date);
  // console.log('Date exam...: ', dateExam);

  //diffTime is the difference in ms
  const diffTime = dateExam - today;
  const diffDays = Math.ceil(diffTime / MS_PER_DAY);

  // console.log('Diff time', diffTime);
  // console.log('Diff days', diffDays);

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

const emit = defineEmits(['finished', 'error', 'added']);
console.log('exam: ', props.exam);
</script>

<template>
  <div class="bg-gray-100 p-2 rounded-md border-l-[3px]" :style="`border-color: ${color}`">
    <div class="flex items-center">
      <div class="flex-1 mr-0" @click="notesOpen ? (notesOpen = false) : (notesOpen = true)">
        <div class="flex justify-between">
          <div class="text-xs flex">
            {{ exam?.subject.name }}
            <div class="">, {{ calculateDays() }}</div>
          </div>
          <div class="text-xs">{{ props.exam.type }}</div>
        </div>
        <div class="flex justify-between">
          <div class="">{{ props.exam.title }}</div>
          <div class="">{{ props.exam.result || 'tba' }}</div>
        </div>
      </div>
    </div>
    <div v-if="notesOpen" class="mt-2">
      <hr class="bg-gray-300 mt-0 h-[2px]" :style="`background-color: ${color}`" />
      <div class="mt-2">Notes:</div>
      <div class="">{{ props.exam.notes || 'No notes yet...' }}</div>
      <div class="flex ml-auto">
        <button
          class="px-1 border-2 rounded-md ml-auto"
          :style="`border-color: ${color}`"
          @click="editExamOpen = true"
        >
          Edit
        </button>
        <EditExamModal
          v-if="editExamOpen"
          @close="
            () => {
              editExamOpen = false;
            }
          "
          :exam="props.exam"
          @added="
            () => {
              emit('added');
            }
          "
        />
      </div>
    </div>
  </div>
</template>
