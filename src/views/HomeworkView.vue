<script setup>
import { ref, onMounted, computed } from 'vue';
import AccordionElement from '@/components/Homework/AccordionElement.vue';
import AddHomeworkModal from '@/components/Modal/AddHomeworkModal.vue';
import { useToast } from 'vue-toastification';
import { useHomeworkStore } from '@/stores/homeworkStore';

const homeworkStore = useHomeworkStore();

let activeAccordion = ref('Today');
const homeworkOpen = ref(false);

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow = tomorrow.toISOString().split('T')[0];
let thisWeek = new Date();
thisWeek.setDate(thisWeek.getDate() + 7);
thisWeek = thisWeek.toISOString().split('T')[0];

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
