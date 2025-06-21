<script setup>
import { ref } from 'vue';
import EditHomeworkModal from './Modal/EditHomeworkModal.vue';

const props = defineProps({
  homework: Object,
});

const editHomeworkOpen = ref(false);

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

//Called when finished hw
async function finishHomework() {
  //If hw already finished, toggle to "due"
  //else hw status is "finished"
  let change = 'finished';
  if (props.homework.status === 'finished') {
    change = 'due';
  }

  //Change the status
  const responsePatch = await fetch(`http://localhost:3000/homework/${props.homework._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: change,
    }),
  });
  if (!responsePatch.ok) alert('Something went wrong: ', responsePatch);
  // else emit('error');
}

//Update homework status to overdue
// async function updateToOverdue() {
//   const response = await fetch('http://localhost:3000/homework/update/overdue', {
//     method: 'PATCH',
//   });

//   if (!response.ok) {
//     const message = await response.text();
//     console.error('Failed to update overdue:', message);
//     throw new Error('Update to overdue failed: ' + message);
//   }
// }

const emit = defineEmits(['finished', 'error']);
async function finishHW() {
  try {
    await finishHomework();
    console.log('Finished func finishHomework in Task.vue');
    // await updateToOverdue();
    // console.log('Finished func updateToOverdue in Task.vue');
    emit('finished');
  } catch (err) {
    console.error('Failed to finish task:', err);
    emit('error');
  }
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
          @updated="
            () => {
              // updateToOverdue();
              emit('updated');
            }
          "
        />
      </div>
    </div>
  </div>
</template>
