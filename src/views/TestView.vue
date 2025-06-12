<script setup>
import { ref, onMounted } from 'vue';
import EditSubjectModal from '@/components/Modal/EditSubjectModal.vue';
import AddHomeworkModal from '@/components/Modal/AddHomeworkModal.vue';
import Task from '@/components/Task.vue';
import Grade from '@/components/Subject/Grade.vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const editOpen = ref(false);
const addHomeworkOpen = ref(false);

//Get homework and subject via api
const route = useRoute();
const id = route.params.id;
let subject = ref();
let color = ref();
async function getSubject() {
  const response = await fetch(`http://localhost:3000/subject/id/${id}`);
  const data = await response.json();

  subject.value = data;
  color.value = data.color;
  console.log(subject.value);
}

let dueHomework = ref([]);
let overdueHomework = ref([]);
let finishedHomework = ref([]);
async function getHomework() {
  const response = await fetch('http://localhost:3000/homework');
  let data = await response.json();

  dueHomework.value = data.filter((hw) => {
    return hw.subject._id === id && hw.status === 'due';
  });

  overdueHomework.value = data.filter((hw) => {
    return hw.subject._id === id && hw.status === 'overdue';
  });

  finishedHomework.value = data.filter((hw) => {
    return hw.subject._id === id && hw.status === 'finished';
  });
}

// async function getOverdueHomework() {
//   const response = await fetch('http://localhost:3000/homework');
//   let data = await response.json();

//   data = data.filter((hw) => {
//     return hw.subject._id === id && hw.status === 'overdue';
//   });

//   overdueHomework.value = data;
// }

// async function getFinishedHomework() {
//   const response = await fetch('http://localhost:3000/homework');
//   let data = await response.json();

//   data = data.filter((hw) => {
//     return hw.subject._id === id && hw.status === 'finished';
//   });

//   finishedHomework.value = data;
// }

//Navbar for homework

let activeNav = ref('due');

let toast = useToast();
function updateView(title) {
  getHomework();
  console.log('Finished func getHomework in SubjectView.vue');

  if (title === 'finished') toast.info('Updated Homework!');
  else toast.success('Wohooo, finished homework!');

  console.log('Finished func updateView in SubjectView.vue');
}

onMounted(() => {
  getSubject();
  getHomework();
});
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2 flex flex-col">
    <div class="p-4 bg-white rounded-md">
      <div class="flex justify-between">
        <h1>
          {{ subject?.name || 'Loading...' }}
          <hr :style="`background-color: ${color};`" />
        </h1>
        <button
          @click="editOpen = true"
          class="mr-1 px-1 border-2 rounded-md"
          :style="`border-color: ${color}`"
        >
          Edit
        </button>
        <EditSubjectModal v-if="editOpen" @close="editOpen = false" :color="color" />
      </div>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 mt-3 gap-2 flex-1 overflowy-scrolly">
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <h1>
          Grades
          <hr :style="`background-color: ${color};`" />
        </h1>
        <div class="mt-2 pb-2 space-y-2 flex-1">
          <Grade subject="Mathe" title="Erste Ableitung" date="30.05.2025" grade="14/15" />
          <Grade subject="Mathe" title="Zweite Ableitung" date="30.05.2025" />
        </div>
      </div>
      <div class="bg-white rounded-md p-2">
        <div class="flex justify-between">
          <h1>
            Homework
            <hr :style="`background-color: ${color};`" />
          </h1>
          <button>Add</button>
          <AddHomeworkModal v-if="addHomeworkOpen" @close="addHomeworkOpen = false" />
        </div>

        <div class="bg-blue-200 flex flex-row mt-2 mb-2 overflowy-scrolly h-[calc(100%-16px-28px)]">
          <div class="mb-2 border-r-2 border-gray-500 bg-red-200 my-auto">
            <nav
              class="flex gap-x-2 border-b flex-col sticky top-0 z-10"
              :style="`border-color: ${color};`"
            >
              <a
                @click="activeNav = 'overdue'"
                :class="[
                  'border px-2 py-2 rounded-l-lg -mb-px hover:cursor-pointer',
                  activeNav === 'overdue' ? 'bg-white' : 'bg-gray-100',
                ]"
                :style="`border-right-color: ${activeNav === 'overdue' ? '#FFFFFF' : `${color}`};
                border-left-color: ${color};
                border-bottom-color: ${color};
                border-top-color: ${color};`"
                >Overdue ({{ overdueHomework.length }})</a
              >
              <a
                @click="activeNav = 'due'"
                :class="[
                  'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
                  activeNav === 'due' ? 'bg-white' : 'bg-gray-100',
                ]"
                :style="`border-bottom-color: ${activeNav === 'due' ? '#FFFFFF' : `${color}`};
                border-left-color: ${color};
                border-right-color: ${color};
                border-top-color: ${color};`"
                >Due ({{ dueHomework.length }})</a
              >
              <a
                @click="activeNav = 'finished'"
                :class="[
                  'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
                  activeNav === 'finished' ? 'bg-white' : 'bg-gray-100',
                ]"
                :style="`border-bottom-color: ${activeNav === 'finished' ? '#FFFFFF' : `${color}`};
                border-left-color: ${color};
                border-right-color: ${color};
                border-top-color: ${color};`"
                >Finished ({{ finishedHomework.length }})</a
              >
            </nav>
          </div>
          <div class="overflowy-scrolly flex-1">
            <div v-if="activeNav === 'overdue'" class="space-y-2 bg-yellow-200 w-full">
              <Task
                v-if="overdueHomework.length > 0"
                v-for="hw in overdueHomework"
                :subject="hw.subject.name"
                :task="hw.title"
                :date="hw.dueDate"
                :color="hw.subject.color"
                :exam="false"
                :id="hw._id"
                @finished="updateView"
              />
              <div v-else class="">Pheew, no overdue homework...yet</div>
            </div>
            <div v-if="activeNav === 'due'" class="space-y-2 bg-yellow-200 w-full">
              <Task
                v-if="dueHomework.length > 0"
                v-for="hw in dueHomework"
                :subject="hw.subject.name"
                :task="hw.title"
                :date="hw.dueDate"
                :color="hw.subject.color"
                :exam="false"
                :id="hw._id"
                @finished="updateView"
              />
              <div v-else class="">Wohoo, nothing to do...yet</div>
            </div>
          </div>

          <div
            v-if="activeNav === 'finished'"
            class="space-y-2 overflowy-scrolly bg-yellow-200 w-full"
          >
            <Task
              v-if="finishedHomework.length > 0"
              v-for="hw in finishedHomework"
              :subject="hw.subject.name"
              :task="hw.title"
              :date="hw.dueDate"
              :color="hw.subject.color"
              :exam="false"
              :id="hw._id"
              @finished="updateView('finished')"
            />
            <div v-else class="">Hmm, no finished homework?</div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <h1>
          Upcoming Exams:
          <hr :style="`background-color: ${color};`" />
        </h1>
        <div class="mt-2 space-y-2">
          <Task subject="Mathe" task="Erste Ableitung" date="31.05.2025" />
          <Task subject="Mathe" task="Zweite Ableitung" date="1.06.2025" />
        </div>
      </div>
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <h1>
          Notes:
          <hr :style="`background-color: ${color};`" />
        </h1>
        <div class="mt-2">
          {{ subject?.notes || 'No notes yet...' }}
        </div>
      </div>
    </div>
  </section>
</template>
