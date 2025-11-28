<script setup>
import AddHomeworkModal from '@/components/Modal/AddHomeworkModal.vue';
import Homework from '../Homework.vue';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useHomeworkStore } from '@/stores/homeworkStore';

const props = defineProps({
  subject: Object,
});

const homeworkStore = useHomeworkStore();

const addHomeworkOpen = ref(false);
let activeNavHw = ref('due');
let id = props.subject._id;

console.log('Subjectttt: ', props.subject);

const { overdueHomework, dueHomework, finishedHomework } = homeworkStore.getHomeworkBySubject(
  props.subject._id,
);
let today = new Date().setHours(0, 0, 0, 0);
/*async function getHomework() {
  const response = await fetch('http://localhost:3000/homework');
  let data = await response.json();

  dueHomework.value = data.filter((hw) => {
    return (
      hw.subject &&
      hw.subject._id === id &&
      hw.status != 'finished' &&
      new Date(hw.dueDate) >= today
    );
  });

  overdueHomework.value = data.filter((hw) => {
    return (
      hw.subject && hw.subject._id === id && hw.status != 'finished' && new Date(hw.dueDate) < today
    );
  });

  finishedHomework.value = data.filter((hw) => {
    return hw.subject && hw.subject._id === id && hw.status === 'finished';
  });
}*/

// function getHomework() {
//   dueHomework.value = homeworkStore.dueHomework;
//   overdueHomework.value = homeworkStore.overdueHomework;
//   finishedHomework.value = finishedHomework.dueHomework;
// }

let toast = useToast();
function addedHomeworkToast() {
  toast.success('Added homework... more work to do');
}

function updateView(title) {
  //getHomework();
  console.log('Finished func getHomework in SubjectView.vue');

  if (title === 'finished') toast.info('Updated Homework!');
  else toast.success('Wohooo, finished homework!');

  console.log('Finished func updateView in SubjectView.vue');
}

onMounted(() => {
  //getHomework();
  homeworkStore.init();
});
</script>
<template>
  <div class="bg-white rounded-md p-2 flex flex-col overflowy-scrolly h-[250px] md:h-auto">
    <div class="mb-2 flex flex-col md:flex-row justify-between">
      <div class="flex justify-between">
        <h1>
          Homework
          <hr :style="`background-color: ${subject?.color};`" />
        </h1>
        <button
          class="px-1 border-2 rounded-md ml-4 md:hidden"
          :style="`border-color: ${subject?.color}`"
          @click="addHomeworkOpen = true"
        >
          Add
        </button>
      </div>
      <div class="flex">
        <AddHomeworkModal
          v-if="addHomeworkOpen"
          @close="addHomeworkOpen = false"
          @added="
            () => {
              addedHomeworkToast();
              // getHomework();
            }
          "
          :color="subject?.color"
          :subject="subject"
        />
        <!-- Homework navbar -->
        <nav
          class="flex gap-x-2 border-b justify-end mt-2 md:mt-0"
          :style="`border-color: ${subject?.color};`"
        >
          <a
            @click="activeNavHw = 'overdue'"
            :class="[
              'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
              activeNavHw === 'overdue' ? 'bg-white' : 'bg-gray-100',
            ]"
            :style="`border-bottom-color: ${activeNavHw === 'overdue' ? '#FFFFFF' : `${subject?.color}`};
                border-left-color: ${subject?.color};
                border-right-color: ${subject?.color};
                border-top-color: ${subject?.color};`"
            >Overdue
            <p class="hidden xl:inline">({{ overdueHomework.length }})</p></a
          >
          <a
            @click="activeNavHw = 'due'"
            :class="[
              'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
              activeNavHw === 'due' ? 'bg-white' : 'bg-gray-100',
            ]"
            :style="`border-bottom-color: ${activeNavHw === 'due' ? '#FFFFFF' : `${subject?.color}`};
                border-left-color: ${subject?.color};
                border-right-color: ${subject?.color};
                border-top-color: ${subject?.color};`"
            >Due
            <p class="hidden xl:inline">({{ dueHomework.length }})</p></a
          >
          <a
            @click="activeNavHw = 'finished'"
            :class="[
              'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
              activeNavHw === 'finished' ? 'bg-white' : 'bg-gray-100',
            ]"
            :style="`border-bottom-color: ${activeNavHw === 'finished' ? '#FFFFFF' : `${subject?.color}`};
                border-left-color: ${subject?.color};
                border-right-color: ${subject?.color};
                border-top-color: ${subject?.color};`"
            >Finished
            <p class="hidden xl:inline">({{ finishedHomework.length }})</p></a
          >
        </nav>

        <button
          class="px-1 border-2 rounded-md ml-1 xl:ml-4 hidden md:block"
          :style="`border-color: ${subject?.color}`"
          @click="addHomeworkOpen = true"
        >
          Add
        </button>
      </div>
    </div>
    <!-- Homework tasks -->
    <div v-if="activeNavHw === 'overdue'" class="space-y-2 overflowy-scrolly">
      <Homework
        v-if="overdueHomework.length > 0"
        v-for="hw in overdueHomework"
        :homework="hw"
        @finished="updateView"
      />
      <div v-else class="">Pheew, no overdue homework...yet</div>
    </div>
    <div v-if="activeNavHw === 'due'" class="space-y-2 overflowy-scrolly">
      <Homework
        v-if="dueHomework.length > 0"
        v-for="hw in dueHomework"
        :homework="hw"
        @finished="updateView"
      />
      <div v-else class="">Wohoo, nothing to do...yet</div>
    </div>
    <div v-if="activeNavHw === 'finished'" class="space-y-2 overflowy-scrolly">
      <Homework
        v-if="finishedHomework.length > 0"
        v-for="hw in finishedHomework"
        :homework="hw"
        @finished="updateView('finished')"
      />
      <div v-else class="">Hmm, no finished homework?</div>
    </div>
  </div>
</template>
