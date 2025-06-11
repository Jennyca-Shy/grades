<script setup>
import { ref, onMounted } from 'vue';
import EditSubjectModal from '@/components/Modal/EditSubjectModal.vue';
import Task from '@/components/Task.vue';
import Grade from '@/components/Subject/Grade.vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const editOpen = ref(false);

//Get homework and subject via api
const route = useRoute();
const id = route.params.id;
let subject = ref();
async function getSubject() {
  const response = await fetch(`http://localhost:3000/subject/id/${id}`);
  const data = await response.json();

  subject.value = data;
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
          <hr />
        </h1>
        <button @click="editOpen = true" class="modal mr-1">Edit</button>
        <EditSubjectModal v-if="editOpen" @close="editOpen = false" />
      </div>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 mt-3 gap-2 flex-1 overflowy-scrolly">
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <h1>
          Grades
          <hr />
        </h1>
        <div class="mt-2 pb-2 space-y-2 flex-1">
          <Grade subject="Mathe" title="Erste Ableitung" date="30.05.2025" grade="14/15" />
          <Grade subject="Mathe" title="Zweite Ableitung" date="30.05.2025" />
        </div>
      </div>
      <div class="bg-white rounded-md p-2 flex flex-col overflowy-scrolly">
        <div class="mb-2 flex justify-between">
          <h1>
            Homework
            <hr />
          </h1>
          <nav class="flex gap-x-2 border-b border-newBlue justify-end">
            <a
              @click="activeNav = 'overdue'"
              :class="[
                'border border-newBlue px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
                activeNav === 'overdue' ? 'border-b-white' : 'bg-gray-100',
              ]"
              >Overdue ({{ overdueHomework.length }})</a
            >
            <a
              @click="activeNav = 'due'"
              :class="[
                'border border-newBlue px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
                activeNav === 'due' ? 'border-b-white' : 'bg-gray-100',
              ]"
              >Due ({{ dueHomework.length }})</a
            >
            <a
              @click="activeNav = 'finished'"
              :class="[
                'border border-newBlue px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
                activeNav === 'finished' ? 'border-b-white' : 'bg-gray-100',
              ]"
              >Finished ({{ finishedHomework.length }})</a
            >
          </nav>
        </div>
        <div v-if="activeNav === 'overdue'" class="space-y-2">
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
        <div v-if="activeNav === 'due'" class="space-y-2">
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

        <div v-if="activeNav === 'finished'" class="space-y-2">
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
        <h1>
          Upcoming Exams:
          <hr />
        </h1>
        <div class="mt-2 space-y-2">
          <Task subject="Mathe" task="Erste Ableitung" date="31.05.2025" />
          <Task subject="Mathe" task="Zweite Ableitung" date="1.06.2025" />
        </div>
      </div>
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <h1>
          Notes:
          <hr />
        </h1>
        <div class="mt-2">
          {{ subject?.notes || 'No notes yet...' }}
        </div>
      </div>
    </div>
  </section>
</template>
