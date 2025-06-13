<script setup>
import { ref, onMounted } from 'vue';
import EditSubjectModal from '@/components/Modal/EditSubjectModal.vue';
import AddHomeworkModal from '@/components/Modal/AddHomeworkModal.vue';
import Task from '@/components/Task.vue';
import Grade from '@/components/Subject/Grade.vue';
import { useRoute, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';

const editOpen = ref(false);
const addHomeworkOpen = ref(false);

//Get homework and subject via api
const route = useRoute();
const id = route.params.id;
let subject = ref();
let data;
async function getSubject() {
  const response = await fetch(`http://localhost:3000/subject/id/${id}`);
  data = await response.json();

  subject.value = data;
  console.log(subject.value);
  console.log('Got subject');
}

let dueHomework = ref([]);
let overdueHomework = ref([]);
let finishedHomework = ref([]);
async function getHomework() {
  const response = await fetch('http://localhost:3000/homework');
  let data = await response.json();

  dueHomework.value = data.filter((hw) => {
    return hw.subject && hw.subject._id === id && hw.status === 'due';
  });

  overdueHomework.value = data.filter((hw) => {
    return hw.subject && hw.subject._id === id && hw.status === 'overdue';
  });

  finishedHomework.value = data.filter((hw) => {
    return hw.subject && hw.subject._id === id && hw.status === 'finished';
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

let activeNavHw = ref('due');

let toast = useToast();
function updateView(title) {
  getHomework();
  console.log('Finished func getHomework in SubjectView.vue');

  if (title === 'finished') toast.info('Updated Homework!');
  else toast.success('Wohooo, finished homework!');

  console.log('Finished func updateView in SubjectView.vue');
}
function addedHomeworkToast() {
  toast.success('Added homework... more work to do');
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
        <ol class="flex">
          <li class="flex items-center mr-2">
            <RouterLink class="mr-2" to="/subjects">Subjects</RouterLink>
            <span class="pi pi-angle-right"></span>
          </li>
          <li class="flex items-center">
            <h1>
              {{ subject?.name || 'Loading...' }}
              <hr :style="`background-color: ${subject?.color};`" />
            </h1>
          </li>
        </ol>

        <div class="flex space-x-8 justify-between items-center">
          <div class="">Room: {{ subject?.room }}</div>
          <div class="">Teacher: {{ subject?.teacher }}</div>
          <button
            @click="editOpen = true"
            class="mr-1 px-1 border-2 rounded-md"
            :style="`border-color: ${subject?.color}`"
          >
            Edit
          </button>
        </div>
        <EditSubjectModal
          v-if="editOpen"
          @close="
            () => {
              editOpen = false;
              getSubject();
              getHomework();
            }
          "
          :subject="data"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 mt-3 gap-2 flex-1 overflowy-scrolly">
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <h1>
          Grades
          <hr :style="`background-color: ${subject?.color};`" />
        </h1>
        <div class="mt-2 pb-2 space-y-2 flex-1">
          <Grade subject="Mathe" title="Erste Ableitung" date="30.05.2025" grade="14/15" />
          <Grade subject="Mathe" title="Zweite Ableitung" date="30.05.2025" />
        </div>
      </div>
      <div class="bg-white rounded-md p-2 flex flex-col">
        <div class="mb-2 flex justify-between">
          <h1>
            Homework
            <hr :style="`background-color: ${subject?.color};`" />
          </h1>
          <div class="flex">
            <button
              class="px-1 border-2 rounded-md mr-4"
              :style="`border-color: ${subject?.color}`"
              @click="addHomeworkOpen = true"
            >
              Add
            </button>
            <AddHomeworkModal
              v-if="addHomeworkOpen"
              @close="addHomeworkOpen = false"
              @added="
                () => {
                  addedHomeworkToast();
                  getHomework();
                }
              "
              :color="subject?.color"
              :subject="subject"
            />
            <!-- Homework navbar -->
            <nav
              class="flex gap-x-2 border-b justify-end"
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
                >Overdue ({{ overdueHomework.length }})</a
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
                >Due ({{ dueHomework.length }})</a
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
                >Finished ({{ finishedHomework.length }})</a
              >
            </nav>
          </div>
        </div>
        <!-- Homework tasks -->
        <div v-if="activeNavHw === 'overdue'" class="space-y-2 overflowy-scrolly">
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
        <div v-if="activeNavHw === 'due'" class="space-y-2 overflowy-scrolly">
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

        <div v-if="activeNavHw === 'finished'" class="space-y-2 overflowy-scrolly">
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
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <div class="mb-2 flex justify-between">
          <h1>
            Exams:
            <hr :style="`background-color: ${subject?.color};`" />
          </h1>
          <div class="flex">
            <button
              class="px-1 border-2 rounded-md mr-4"
              :style="`border-color: ${subject?.color}`"
              @click="addHomeworkOpen = true"
            >
              Add
            </button>
            <!-- Exams navbar -->
            <nav
              class="flex gap-x-2 border-b justify-end"
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
                >Upcoming ({{ overdueHomework.length }})</a
              >
              <a
                @click="activeNavHwHw = 'due'"
                :class="[
                  'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
                  activeNavHw === 'due' ? 'bg-white' : 'bg-gray-100',
                ]"
                :style="`border-bottom-color: ${activeNavHw === 'due' ? '#FFFFFF' : `${subject?.color}`};
                border-left-color: ${subject?.color};
                border-right-color: ${subject?.color};
                border-top-color: ${subject?.color};`"
                >Due ({{ dueHomework.length }})</a
              >
            </nav>
          </div>
        </div>

        <!-- Exams -->
        <div class="space-y-2 overflowy-scrolly">
          <div class="">Pheew, no overdue homework...yet</div>
        </div>
      </div>
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <h1>
          Notes:
          <hr :style="`background-color: ${subject?.color};`" />
        </h1>
        <div class="mt-2">
          {{ subject?.notes || 'No notes yet...' }}
        </div>
      </div>
    </div>
  </section>
</template>
