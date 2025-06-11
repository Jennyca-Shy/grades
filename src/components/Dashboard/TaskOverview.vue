<script setup>
import { ref, onMounted } from 'vue';
import Task from '../Task.vue';
import AddHomeworkModal from '../Modal/AddHomeworkModal.vue';
import AddExamsModal from '../Modal/AddExamsModal.vue';
import { useToast } from 'vue-toastification';

const homeworkOpen = ref(false);
const examsOpen = ref(false);
const allHomework = ref();
let numOfHomework = ref();

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
  numOfHomework.value = filtered.length;

  console.log('All homework: ');
  console.log(allHomework);
}

const toast = useToast();
function finishedHomework() {
  toast.success('Wohooo, finished homework!');
}

onMounted(() => {
  getHomework();
});
</script>

<template>
  <div class="grid grid-cols-5 grid-rows-2 flex-grow h-[300px]">
    <div class="col-span-3 row-span-2 bg-white rounded-md m-2 p-2">
      <div class="flex justify-between items-center">
        <h1 class="ml-1">
          Homework
          <hr />
        </h1>
        <button @click="homeworkOpen = true" class="modal mr-1">Add</button>
        <AddHomeworkModal v-if="homeworkOpen" @close="homeworkOpen = false" @added="getHomework" />
      </div>
      <div class="ml-2 mt-2">
        <div class="flex items-center mt-2">
          <p>Today</p>
          <div class="text-sm ml-1.5 text-gray-600">({{ numOfHomework }})</div>
        </div>
        <div class="pr-2 h-[220px] overflowy-scrolly space-y-2">
          <Task
            v-for="homework in allHomework"
            :subject="homework.subject.name"
            :color="homework.subject.color"
            :task="homework.title"
            :date="homework.dueDate"
            :id="homework._id"
            :exam="false"
            @finished="
              () => {
                getHomework();
                finishedHomework();
              }
            "
          />
        </div>
      </div>
    </div>
    <div class="col-span-2 row-span-2 bg-white rounded-md m-2 p-2">
      <div class="flex justify-between items-center">
        <h1 class="ml-1">
          Upcoming Exams
          <hr />
        </h1>
        <button @click="examsOpen = true" class="modal mr-1">Add</button>
      </div>
      <AddExamsModal v-if="examsOpen" @close="examsOpen = false" />
      <div class="ml-2 mt-3 pr-2 h-[220px] overflowy-scrolly">
        <Task
          subject="Mathe"
          color="blue-500"
          task="Erste Ableitung"
          date="30.10.2025"
          :exam="true"
        />
      </div>
    </div>
  </div>
</template>
