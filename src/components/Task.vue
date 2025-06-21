<script setup>
import { computed, onMounted } from 'vue';
const props = defineProps({
  //   subject: String,
  //   task: String,
  //   date: String,
  //   color: String,
  //   exam: Boolean,
  id: String,
});

const emit = defineEmits(['finished', 'error']);

const borderColorClass = computed(() => props.color);
const textColorClass = computed(() => props.color);

function parseDate() {
  const justDate = props.date.split('T')[0];
  const [year, month, day] = justDate.split('-');
  return new Date(year, month - 1, day);
}

const dateExam = computed(() => parseDate());

function calculateDays() {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const today = new Date();

  //diffTime is the difference in ms
  const diffTime = dateExam.value - today;
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

async function finishHomework() {
  const response = await fetch(`http://localhost:3000/homework/id/${props.id}`, {
    method: 'GET',
  });
  const data = await response.json();
  let change = 'finished';
  if (data.status === 'finished') {
    change = 'due';
  }
  const responsePatch = await fetch(`http://localhost:3000/homework/${props.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: change,
    }),
  });
  // if (responsePatch.ok) emit('finished');
  // else emit('error');
}

async function updateToOverdue() {
  const response = await fetch('http://localhost:3000/homework/update/overdue', {
    method: 'PATCH',
  });

  if (!response.ok) {
    const message = await response.text();
    console.error('Failed to update overdue:', message);
    throw new Error('Update to overdue failed: ' + message);
  }
}

// function finishHW() {
//   finishHomework();
//   console.log('Finished func finishHomework in Task.vue');
//   updateToOverdue();
//   console.log('Finished func updateToOverdue in Task.vue');
// }

async function finishHW() {
  try {
    await finishHomework();
    console.log('Finished func finishHomework in Task.vue');
    await updateToOverdue();
    console.log('Finished func updateToOverdue in Task.vue');
    emit('finished');
  } catch (err) {
    console.error('Failed to finish task:', err);
    emit('error');
  }
}
</script>

<template>
  <div
    class="bg-gray-100 p-2 rounded-md flex items-center border-l-[3px]"
    :style="`border-color: ${borderColorClass}`"
  >
    <div class="">
      <div class="text-xs flex">
        {{ subject }}
        <div v-if="date" class="">, {{ calculateDays() }}</div>
      </div>
      <div class="">{{ task }}</div>
    </div>
    <div
      v-if="exam"
      class="pi pi-ellipsis-v ml-auto cursor-pointer mr-1"
      :style="`text-color: ${textColorClass}`"
    ></div>
    <div
      v-else
      class="cursor-pointer border-[3px] rounded-full size-6 ml-auto mr-2"
      :style="`border-color: ${borderColorClass}`"
      @click="finishHW"
    ></div>
  </div>
</template>
