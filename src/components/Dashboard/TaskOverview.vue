<script setup>
import { ref, computed, onMounted } from 'vue';
import Homework from '../Homework.vue';
import Exam from '../Exam.vue';
import AddHomeworkModal from '../Modal/AddHomeworkModal.vue';
import AddExamsModal from '../Modal/AddExamsModal.vue';
import { useToast } from 'vue-toastification';
import { useSettingStore } from '@/stores/settingStore';
import { useHomeworkStore } from '@/stores/homeworkStore';
import { useGradeStore } from '@/stores/gradeStore';

const homeworkOpen = ref(false);
const examsOpen = ref(false);
// let overdueHomework = ref([]);
// let dueHomework = ref([]);
let activeNavHw = ref('due');

const setting = useSettingStore();
const homeworkStore = useHomeworkStore();
const gradeStore = useGradeStore();

const allGrades = computed(() => gradeStore.upcomingGrades);

const toast = useToast();
function finishedHomework() {
  toast.success('Juhu, Hausaufgabe erledigt');
}
function addedHomework() {
  toast.success('Hausaufgabe hinzugefügt. Noch mehr zu tun...');
}
function addedExam() {
  toast.success('Prüfung hinzugefügt. Geh lernen!');
}

onMounted(async () => {
  await gradeStore.init();
  await homeworkStore.init();
});
</script>

<template>
  <div class="md:grid md:grid-cols-5 md:grid-rows-2 flex-grow flex flex-col">
    <div class="col-span-3 row-span-2 bg-white rounded-md m-2 p-2">
      <div class="flex flex-col justify-between md:flex-row md:items-center">
        <div class="flex justify-between">
          <h1 class="ml-1">
            Hausaufgaben
            <hr class="bg-newBlue" />
          </h1>
          <button @click="homeworkOpen = true" class="modal ml-4 md:hidden">Neu</button>
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
              >Überfällig
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
              >Fällig
              <p class="hidden xl:inline">({{ homeworkStore.dueHomework.length }})</p></a
            >
          </nav>
          <button @click="homeworkOpen = true" class="modal ml-1 xl:ml-4 hidden md:block">
            Neu
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
            <div v-else class="">Juhu, noch nichts zu tun...</div>
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
            <div v-else class="">Juhu, noch nichts zu tun...</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-2 row-span-2 bg-white rounded-md m-2 p-2">
      <div class="flex justify-between items-center">
        <h1 class="ml-1">
          Prüfungen
          <hr class="bg-newBlue" />
        </h1>
        <button @click="examsOpen = true" class="modal mr-1">Neu</button>
      </div>
      <AddExamsModal v-if="examsOpen" @close="examsOpen = false" />
      <div class="mt-2">
        <div class="mr-1 ml-1 md:h-[240px] overflowy-scrolly space-y-2">
          <Exam v-if="allGrades.length > 0" v-for="grade in allGrades" :exam="grade" :key="grade" />
          <div v-else class="">Juhu, noch nichts zu tun...</div>
        </div>
      </div>
    </div>
  </div>
</template>
