<script setup>
import { ref, onMounted } from 'vue';
import AccordionElement from '@/components/Homework/AccordionElement.vue';
import AddHomeworkModal from '@/components/Modal/AddHomeworkModal.vue';

let activeAccordion = ref('Today');
const homeworkOpen = ref(false);

let overdueHomework = ref([]);
let todayHomework = ref([]);
let tomorrowHomework = ref([]);
let thisWeekHomework = ref([]);
let laterHomework = ref([]);
let finishedHomework = ref([]);

async function getData() {
  //Today and tomorrow and this week
  const today = new Date().toISOString().split('T')[0];
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = tomorrow.toISOString().split('T')[0];
  let thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() + 7);
  thisWeek = thisWeek.toISOString().split('T')[0];

  //Fetch all homework
  const response = await fetch('http://localhost:3000/homework');
  const data = await response.json();

  if (!response.ok) console.log(response);

  //Get different homework
  overdueHomework.value = data
    .filter((hw) => {
      return hw.status === 'overdue';
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  todayHomework.value = data.filter((hw) => {
    const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
    return hw.status === 'due' && dueTo === today;
  });

  tomorrowHomework.value = data.filter((hw) => {
    const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
    return hw.status === 'due' && dueTo === tomorrow;
  });

  thisWeekHomework.value = data
    .filter((hw) => {
      const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
      return dueTo > tomorrow && dueTo <= thisWeek && hw.status === 'due';
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  laterHomework.value = data
    .filter((hw) => {
      const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
      return dueTo > thisWeek && hw.status === 'due';
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  finishedHomework.value = data
    .filter((hw) => {
      return hw.status === 'finished';
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

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

function updateEverything() {
  // updateToOverdue();
  getData();
}

onMounted(() => {
  updateEverything();
});
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2">
    <div class="bg-white rounded-md p-4 h-[calc(100vh-24px-16px)]">
      <div class="h-full overflowy-scrolly">
        <div class="mb-2 flex justify-between">
          <h1>
            Hausaufgaben
            <hr />
          </h1>
          <button @click="homeworkOpen = true" class="modal mr-1">Add</button>
          <AddHomeworkModal
            v-if="homeworkOpen"
            @close="homeworkOpen = false"
            @added="updateEverything"
          />
        </div>

        <div class="flex flex-col pb-2">
          <AccordionElement
            title="Overdue!!!"
            :active="activeAccordion"
            :input="overdueHomework"
            @select="activeAccordion = $event"
            @update="updateEverything"
          />
          <AccordionElement
            title="Today"
            :active="activeAccordion"
            :input="todayHomework"
            @select="activeAccordion = $event"
            @update="updateEverything"
          />
          <AccordionElement
            title="Tomorrow"
            :active="activeAccordion"
            :input="tomorrowHomework"
            @select="activeAccordion = $event"
            @update="updateEverything"
          />
          <AccordionElement
            title="This Week"
            :active="activeAccordion"
            :input="thisWeekHomework"
            @select="activeAccordion = $event"
            @update="updateEverything"
          />
          <AccordionElement
            title="Later"
            :active="activeAccordion"
            :input="laterHomework"
            @select="activeAccordion = $event"
            @update="updateEverything"
          />
          <AccordionElement
            title="Finished"
            :active="activeAccordion"
            :input="finishedHomework"
            @select="activeAccordion = $event"
            @update="updateEverything"
          />
        </div>
      </div>
    </div>
  </section>
</template>
