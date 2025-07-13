<script setup>
import { ref, onMounted } from 'vue';
import Homework from '../Homework.vue';
import Exam from '../Exam.vue';
import AddHomeworkModal from '../Modal/AddHomeworkModal.vue';
import AddExamsModal from '../Modal/AddExamsModal.vue';
import { useToast } from 'vue-toastification';

const homeworkOpen = ref(false);
const examsOpen = ref(false);
let allHomework = ref([]);

async function getHomework() {
  const today = new Date().toISOString().split('T')[0];
  const response = await fetch(`http://localhost:3000/homework`);
  let data = await response.json();

  let filtered = data.filter((hw) => {
    const dueDate = new Date(hw.dueDate).toISOString().split('T')[0];
    return dueDate === today && hw.status === 'due';
  });

  filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  allHomework.value = filtered;

  console.log('All homework: ');
  console.log(allHomework);
}

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
  getHomework();
  getExams();
});
</script>

<template>
  <div class="grid grid-cols-5 grid-rows-2 flex-grow h-[300px]">
    <div class="col-span-3 row-span-2 bg-white rounded-md m-2 p-2">
      <AddHomeworkModal
        v-if="homeworkOpen"
        @close="homeworkOpen = false"
        @added="
          () => {
            getHomework();
            addedHomework();
          }
        "
      />
      <div class="flex justify-between items-center">
        <h1 class="ml-1">
          Todays Homework
          <hr class="bg-newBlue" />
        </h1>
        <button @click="homeworkOpen = true" class="modal mr-1">Add</button>
      </div>
      <div class="mt-2">
        <div class="mr-1 ml-1 h-[220px] overflowy-scrolly space-y-2">
          <Homework
            v-if="allHomework.length > 0"
            v-for="homework in allHomework"
            :homework="homework"
            @finished="
              () => {
                getHomework();
                finishedHomework();
              }
            "
          />
          <div v-else class="">Wohoo, nothing to do...yet</div>
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
        <div class="mr-1 ml-1 h-[220px] overflowy-scrolly space-y-2">
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
