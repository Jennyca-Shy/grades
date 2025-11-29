<script setup>
import { ref, onMounted } from 'vue';
import EditHomeworkModal from './Modal/EditHomeworkModal.vue';
import { useHomeworkStore } from '@/stores/homeworkStore';

const props = defineProps({
  homework: Object,
});

const editHomeworkOpen = ref(false);

const homeworkStore = useHomeworkStore();

const color = props.homework.subject.color;
const notesOpen = ref(false);

//Calculate remaining days till dueDate
function calculateDays() {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const today = new Date();
  // console.log('Todayyy: ', today);
  const dateExam = new Date(props.homework.dueDate);
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

const emit = defineEmits(['finished', 'error', 'updated']);
async function finishHW() {
  homeworkStore.toggleHomeworkStatus(props.homework._id);
  emit('finished');
}
console.log('Homework: ', props.homework);
</script>

<template>
  <div class="bg-gray-100 p-2 rounded-md border-l-[3px]" :style="`border-color: ${color}`">
    <div class="flex items-center">
      <div class="flex-1" @click="notesOpen ? (notesOpen = false) : (notesOpen = true)">
        <div class="text-xs flex">
          {{ homework?.subject.name }}
          <div class="">, {{ calculateDays() }}</div>
        </div>
        <div class="">{{ props.homework.title }}</div>
      </div>
      <div
        class="cursor-pointer border-[3px] rounded-full size-6 ml-auto mr-2"
        :style="`border-color: ${color}`"
        @click="finishHW"
      ></div>
    </div>
    <div v-if="notesOpen" class="mt-2">
      <hr class="bg-gray-300 mt-0 h-[2px]" :style="`background-color: ${color}`" />
      <div class="mt-2">Notes:</div>
      <div class="">{{ props.homework.notes || 'No notes yet...' }}</div>
      <div class="flex ml-auto">
        <button
          class="px-1 border-2 rounded-md ml-auto"
          :style="`border-color: ${color}`"
          @click="editHomeworkOpen = true"
        >
          Edit
        </button>
        <EditHomeworkModal
          v-if="editHomeworkOpen"
          @close="
            () => {
              editHomeworkOpen = false;
            }
          "
          :homework="props.homework"
        />
      </div>
    </div>
  </div>
</template>
