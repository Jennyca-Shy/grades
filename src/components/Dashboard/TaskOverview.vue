<script setup>
import { ref, onMounted } from 'vue';
import Homework from '../Homework.vue';
import Exam from '../Exam.vue';
import AddHomeworkModal from '../Modal/AddHomeworkModal.vue';
import AddExamsModal from '../Modal/AddExamsModal.vue';
import { useToast } from 'vue-toastification';
import { useSettingStore } from '@/stores/settingStore';
import { useHomeworkStore } from '@/stores/homeworkStore';

const homeworkOpen = ref(false);
const examsOpen = ref(false);
// let overdueHomework = ref([]);
// let dueHomework = ref([]);
let activeNavHw = ref('due');

const setting = useSettingStore();
const homeworkStore = useHomeworkStore();

/*async function getHomework() {
  const today = new Date().toISOString().split('T')[0];
  const response = await fetch(`http://localhost:3000/homework`);
  let data = await response.json();

  overdueHomework.value = data
    .filter((hw) => {
      const dueDate = new Date(hw.dueDate).toISOString().split('T')[0];
      return hw.status != 'finished' && dueDate < today;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  dueHomework.value = data
    .filter((hw) => {
      const dueDate = new Date(hw.dueDate).toISOString().split('T')[0];
      return hw.status != 'finished' && dueDate >= today;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}*/

let allExam = ref([]);
async function getExams() {
  const today = new Date().toISOString().split('T')[0];
  const response = await fetch(`http://localhost:3000/grade`);
  let data = await response.json();

  let filtered = data.filter((exam) => {
    return exam.result === null && exam.date >= today;
  });

  filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  allExam.value = filtered;

  console.log('All exams: ');
  console.log(allExam);
}

const toast = useToast();
function finishedHomework() {
  toast.success('Wohooo, finished homework!');
}
function addedHomework() {
  toast.success('Added homework... more work to do');
}
function addedExam() {
  toast.success('Added exam. Now go and learn for that!');
}
/*function editExam() {
  toast.info('Edited Exam');
}*/

onMounted(() => {
  //getHomework();
  getExams();
  homeworkStore.fetchHomework();
});
</script>

<template>
  <div class="md:grid md:grid-cols-5 md:grid-rows-2 flex-grow flex flex-col">
    <div class="col-span-3 row-span-2 bg-white rounded-md m-2 p-2">
      <div class="flex flex-col justify-between md:flex-row md:items-center">
        <div class="flex justify-between">
          <h1 class="ml-1">
            Homework
            <hr class="bg-newBlue" />
          </h1>
          <button @click="homeworkOpen = true" class="modal ml-4 md:hidden">Add</button>
        </div>
        <div class="flex">
          <AddHomeworkModal
            v-if="homeworkOpen"
            @close="homeworkOpen = false"
            @added="
              () => {
                addedHomework();
              }
            "
          />
          <nav
            class="flex gap-x-2 border-b justify-end mt-2 md:mt-0"
            :style="`border-color: ${setting.defaultColor};`"
          >
            <a
              @click="activeNavHw = 'overdue'"
              :class="[
                'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
                activeNavHw === 'overdue' ? 'bg-white' : 'bg-gray-100',
              ]"
              :style="`border-bottom-color: ${activeNavHw === 'overdue' ? '#FFFFFF' : `${setting.defaultColor}`};
                border-left-color: ${setting.defaultColor};
                border-right-color: ${setting.defaultColor};
                border-top-color: ${setting.defaultColor};`"
              >Overdue
              <p class="hidden xl:inline">({{ homeworkStore.overdueHomework.length }})</p></a
            >
            <a
              @click="activeNavHw = 'due'"
              :class="[
                'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
                activeNavHw === 'due' ? 'bg-white' : 'bg-gray-100',
              ]"
              :style="`border-bottom-color: ${activeNavHw === 'due' ? '#FFFFFF' : `${setting.defaultColor}`};
                border-left-color: ${setting.defaultColor};
                border-right-color: ${setting.defaultColor};
                border-top-color: ${setting.defaultColor};`"
              >Due
              <p class="hidden xl:inline">({{ homeworkStore.dueHomework.length }})</p></a
            >
          </nav>
          <button @click="homeworkOpen = true" class="modal ml-1 xl:ml-4 hidden md:block">
            Add
          </button>
        </div>
      </div>
      <div class="mt-2">
        <div class="mr-1 ml-1 md:h-[240px] overflowy-scrolly space-y-2">
          <div v-if="activeNavHw == 'overdue'" class="flex flex-col gap-2">
            <Homework
              v-if="homeworkStore.overdueHomework.length > 0"
              v-for="homework in homeworkStore.overdueHomework"
              :homework="homework"
              @finished="
                () => {
                  finishedHomework();
                }
              "
            />
            <div v-else class="">Wohoo, nothing to do...yet</div>
          </div>

          <div v-if="activeNavHw == 'due'" class="flex flex-col gap-2">
            <Homework
              v-if="homeworkStore.dueHomework.length > 0"
              v-for="homework in homeworkStore.dueHomework"
              :homework="homework"
              @finished="
                () => {
                  finishedHomework();
                }
              "
            />
            <div v-else class="">Wohoo, nothing to do...yet</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-2 row-span-2 bg-white rounded-md m-2 p-2">
      <div class="flex justify-between items-center">
        <h1 class="ml-1">
          Upcoming Exams
          <hr class="bg-newBlue" />
        </h1>
        <button @click="examsOpen = true" class="modal mr-1">Add</button>
      </div>
      <AddExamsModal
        v-if="examsOpen"
        @close="examsOpen = false"
        @added="
          () => {
            getExams();
            addedExam();
          }
        "
      />
      <div class="mt-2">
        <div class="mr-1 ml-1 md:h-[240px] overflowy-scrolly space-y-2">
          <Exam
            v-if="allExam.length > 0"
            v-for="exam in allExam"
            :exam="exam"
            :key="exam"
            @added="getExams()"
          />
          <div v-else class="">Wohoo, nothing to do...yet</div>
        </div>
      </div>
    </div>
  </div>
</template>
