<script setup>
import { ref, onMounted, computed } from 'vue';
import AccordionElement from '@/components/Homework/AccordionElement.vue';
import AddHomeworkModal from '@/components/Modal/AddHomeworkModal.vue';
import { useToast } from 'vue-toastification';
import { useHomeworkStore } from '@/stores/homeworkStore';

const homeworkStore = useHomeworkStore();

let activeAccordion = ref('Today');
const homeworkOpen = ref(false);

const allHomework = ref([]);
const today = new Date().toISOString().split('T')[0];
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow = tomorrow.toISOString().split('T')[0];
let thisWeek = new Date();
thisWeek.setDate(thisWeek.getDate() + 7);
thisWeek = thisWeek.toISOString().split('T')[0];
const splitDueOverdue = new Date().setHours(0, 0, 0, 0);

/*let overdueHomework = computed(() => {
  return allHomework.value
    .filter((hw) => {
      return hw.status != 'finished' && new Date(hw.dueDate) < splitDueOverdue;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
});
let todayHomework = computed(() => {
  return allHomework.value.filter((hw) => {
    const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
    return hw.status != 'finished' && dueTo === today;
  });
});
let tomorrowHomework = computed(() => {
  return allHomework.value.filter((hw) => {
    const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
    return hw.status != 'finished' && dueTo === tomorrow;
  });
});
let thisWeekHomework = computed(() => {
  return allHomework.value
    .filter((hw) => {
      const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
      return dueTo > tomorrow && dueTo <= thisWeek && hw.status != 'finished';
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
});
let laterHomework = computed(() => {
  return allHomework.value
    .filter((hw) => {
      const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
      return dueTo > thisWeek && hw.status != 'finished';
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
});
let finishedHomework = computed(() => {
  return allHomework.value
    .filter((hw) => {
      return hw.status === 'finished';
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
});*/

/*async function getData() {
  //Today and tomorrow and this week

  //Fetch all homework
  const response = await fetch('http://localhost:3000/homework');
  const data = await response.json();

  if (!response.ok) {
    console.error(response);
    return;
  }

  allHomework.value = data;
}*/

const toast = useToast();
function addedHomeworkToast() {
  toast.success('Added homework... more work to do');
}

// function updateEverything() {
//   // updateToOverdue();
//   getData();
// }

onMounted(() => {
  // updateEverything();
  homeworkStore.fetchHomework();
});
</script>

<template>
  <section class="md:m-3 md:p-2 m-2 p-1">
    <div class="bg-white rounded-md p-4 h-full">
      <div class="h-full overflowy-scrolly">
        <div class="mb-2 flex justify-between">
          <h1>
            Hausaufgaben
            <hr class="bg-newBlue" />
          </h1>
          <button @click="homeworkOpen = true" class="modal">Add</button>
          <AddHomeworkModal
            v-if="homeworkOpen"
            @close="homeworkOpen = false"
            @added="
              () => {
                // updateEverything();
                addedHomeworkToast();
              }
            "
          />
        </div>

        <div class="flex flex-col pb-2">
          <AccordionElement
            title="Overdue!!!"
            :active="activeAccordion"
            :input="homeworkStore.overdueHomework"
            @select="activeAccordion = $event"
          />
          <AccordionElement
            title="Today"
            :active="activeAccordion"
            :input="homeworkStore.todayHomework"
            @select="activeAccordion = $event"
          />
          <AccordionElement
            title="Tomorrow"
            :active="activeAccordion"
            :input="homeworkStore.tomorrowHomework"
            @select="activeAccordion = $event"
          />
          <AccordionElement
            title="This Week"
            :active="activeAccordion"
            :input="homeworkStore.thisWeekHomework"
            @select="activeAccordion = $event"
          />
          <AccordionElement
            title="Later"
            :active="activeAccordion"
            :input="homeworkStore.laterHomework"
            @select="activeAccordion = $event"
          />
          <AccordionElement
            title="Finished"
            :active="activeAccordion"
            :input="homeworkStore.finishedHomework"
            @select="activeAccordion = $event"
          />
        </div>
      </div>
    </div>
  </section>
</template>
