<script setup>
import { ref, onMounted } from 'vue';
import { nextTick } from 'vue';
import EditSubjectModal from '@/components/Modal/EditSubjectModal.vue';
import AddHomeworkModal from '@/components/Modal/AddHomeworkModal.vue';
import AddExamsModal from '@/components/Modal/AddExamsModal.vue';
import Exam from '@/components/Exam.vue';
import Homework from '@/components/Homework.vue';
import { useRoute, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';

const editSubjectOpen = ref(false);
const addExamsOpen = ref(false);
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
let today = new Date().setHours(0, 0, 0, 0);
async function getHomework() {
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
}

let upcomingExams = ref([]);
let pastExams = ref([]);
async function getExams() {
  const response = await fetch('http://localhost:3000/grade');
  const data = await response.json();
  upcomingExams.value = data.filter((exam) => {
    return exam.subject._id === id && new Date(exam.date) >= today && exam.result === null;
  });

  pastExams.value = data.filter((exam) => {
    return (
      (exam.subject._id === id && new Date(exam.date) < today) ||
      (exam.subject._id === id && exam.result != null)
    );
  });

  console.log('upcoming: ', upcomingExams);
  console.log('past: ', pastExams);
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
let activeNavExam = ref('upcoming');

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
function addedExamToast() {
  toast.success('Added exam. Now go and learn for that!');
}
function editedHomework() {
  getHomework();
  toast.success('Edited homework!');
}

//Notes
let editableNotes = ref(false);
const newNotes = ref('');

async function changeEditable() {
  editableNotes.value = !editableNotes.value;
  if (editableNotes.value) {
    newNotes.value = subject.value?.notes || '';
    console.log('New notes: ', newNotes);
    nextTick(() => {
      document.getElementById('notesEdit')?.focus();
    });
  } else {
    const response = await fetch(`http://localhost:3000/subject/${subject.value._id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        notes: newNotes.value,
      }),
    });
    if (response.ok) {
      getSubject();
    } else {
      const data = await response.json();
      console.log(data.message);
      alert('Something went wrong!!!');
    }
  }
}

onMounted(() => {
  getSubject();
  getHomework();
  getExams();
});
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2 flex flex-col">
    <!-- Header with subject, room and teacher -->
    <div class="p-2 bg-white rounded-md">
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
            @click="editSubjectOpen = true"
            class="mr-1 px-1 border-2 rounded-md"
            :style="`border-color: ${subject?.color}`"
          >
            Edit
          </button>
        </div>
        <EditSubjectModal
          v-if="editSubjectOpen"
          @close="
            () => {
              editSubjectOpen = false;
              getSubject();
              getHomework();
            }
          "
          :subject="data"
        />
      </div>
    </div>
    <!-- Main part -->
    <div class="grid grid-cols-2 grid-rows-2 mt-3 gap-2 flex-1 overflowy-scrolly">
      <!-- Top left: Homework -->
      <div class="bg-white rounded-md p-2 flex flex-col">
        <div class="mb-2 flex justify-between">
          <h1>
            Homework
            <hr :style="`background-color: ${subject?.color};`" />
          </h1>
          <div class="flex">
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

            <button
              class="px-1 border-2 rounded-md ml-4"
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
            @updated="editedHomework()"
          />
          <div v-else class="">Pheew, no overdue homework...yet</div>
        </div>
        <div v-if="activeNavHw === 'due'" class="space-y-2 overflowy-scrolly">
          <Homework
            v-if="dueHomework.length > 0"
            v-for="hw in dueHomework"
            :homework="hw"
            @finished="updateView"
            @updated="editedHomework()"
          />
          <div v-else class="">Wohoo, nothing to do...yet</div>
        </div>
        <div v-if="activeNavHw === 'finished'" class="space-y-2 overflowy-scrolly">
          <Homework
            v-if="finishedHomework.length > 0"
            v-for="hw in finishedHomework"
            :homework="hw"
            @finished="updateView('finished')"
            @updated="editedHomework()"
          />
          <div v-else class="">Hmm, no finished homework?</div>
        </div>
      </div>
      <!-- Tope right: Exams -->
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <div class="mb-2 flex justify-between">
          <h1>
            Exams:
            <hr :style="`background-color: ${subject?.color};`" />
          </h1>
          <div class="flex">
            <AddExamsModal
              v-if="addExamsOpen"
              @close="addExamsOpen = false"
              @added="
                () => {
                  addedExamToast();
                  getExams();
                }
              "
              :color="subject?.color"
              :subject="subject"
            />
            <!-- Exams navbar -->
            <nav
              class="flex gap-x-2 border-b justify-end"
              :style="`border-color: ${subject?.color};`"
            >
              <a
                @click="activeNavExam = 'upcoming'"
                :class="[
                  'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
                  activeNavHw === 'overdue' ? 'bg-white' : 'bg-gray-100',
                ]"
                :style="`border-bottom-color: ${activeNavExam === 'upcoming' ? '#FFFFFF' : `${subject?.color}`};
                border-left-color: ${subject?.color};
                border-right-color: ${subject?.color};
                border-top-color: ${subject?.color};`"
                >Upcoming ({{ upcomingExams.length }})</a
              >
              <a
                @click="activeNavExam = 'past'"
                :class="[
                  'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
                  activeNavExam === 'due' ? 'bg-white' : 'bg-gray-100',
                ]"
                :style="`border-bottom-color: ${activeNavExam === 'past' ? '#FFFFFF' : `${subject?.color}`};
                border-left-color: ${subject?.color};
                border-right-color: ${subject?.color};
                border-top-color: ${subject?.color};`"
                >Past ({{ pastExams.length }})</a
              >
            </nav>

            <button
              class="px-1 border-2 rounded-md ml-4"
              :style="`border-color: ${subject?.color}`"
              @click="addExamsOpen = true"
            >
              Add
            </button>
          </div>
        </div>

        <!-- Exams -->
        <div v-if="activeNavExam === 'upcoming'" class="space-y-2 overflowy-scrolly">
          <Exam
            v-if="upcomingExams.length > 0"
            v-for="exam in upcomingExams"
            :exam="exam"
            @finished="updateView"
            @added="getExams"
          />
          <div v-else class="">Pheew, no upcoming exam...yet</div>
        </div>
        <div v-if="activeNavExam === 'past'" class="space-y-2 overflowy-scrolly">
          <Exam
            v-if="pastExams.length > 0"
            v-for="exam in pastExams"
            :exam="exam"
            @finished="updateView"
            @added="getExams"
          />
          <div v-else class="">Wohoo, no Exams...yet</div>
        </div>
      </div>
      <!-- Bottom left: Placeholder -->
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <h1>
          Exams
          <hr :style="`background-color: ${subject?.color};`" />
        </h1>
        <div class="mt-2 pb-2 space-y-2 flex-1">Exams?</div>
      </div>
      <!-- Bottom right: Notes -->
      <div class="bg-white rounded-md p-2 overflowy-scrolly flex flex-col">
        <div class="flex justify-between">
          <h1>
            Notes:
            <hr :style="`background-color: ${subject?.color};`" />
          </h1>

          <button
            class="px-1 border-2 rounded-md ml-4"
            :style="`border-color: ${subject?.color}`"
            @click="changeEditable()"
          >
            {{ editableNotes ? 'Save' : 'Edit' }}
          </button>
        </div>

        <div id="notes" class="whitespace-pre-wrap h-full">
          <p v-if="!editableNotes" class="mt-2 h-full">{{ subject?.notes || 'No notes yet...' }}</p>
          <textarea
            v-else
            name="notesEdit"
            id="notesEdit"
            class="bg-gray-100 h-full"
            v-model="newNotes"
          >
            {{ newNotes }}
            </textarea
          >
        </div>
      </div>
    </div>
  </section>
</template>
