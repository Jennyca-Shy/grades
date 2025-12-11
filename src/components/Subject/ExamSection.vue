<script setup>
import { ref, onMounted } from 'vue';
import AddExamsModal from '../Modal/AddExamsModal.vue';
import Exam from '../Exam.vue';
import { useGradeStore } from '@/stores/gradeStore';

const props = defineProps({
  propSubject: Object,
});

const gradeStore = useGradeStore();

let subject = ref(props.propSubject);
let id = ref(subject.value._id);
console.log('ID: ', id.value);

const addExamsOpen = ref(false);
let activeNavExam = ref('upcoming');

//Exams in navbar
const upEx = gradeStore.getUpcomingGradesBySubject(props.propSubject._id);
console.log('UPEXXXX:', upEx.upcomingExams.value);
const { pastExams } = gradeStore.getPastGradesBySubject(props.propSubject._id);

onMounted(() => {
  //getExams();
  gradeStore.init();
});
</script>
<template>
  <div class="bg-white rounded-md p-2 flex flex-col overflowy-scrolly h-[250px] md:h-auto">
    <div class="mb-2 flex flex-col md:flex-row justify-between">
      <div class="flex justify-between">
        <h1>
          Exams
          <hr :style="`background-color: ${subject?.color};`" />
        </h1>
        <button
          class="px-1 border-2 rounded-md ml-4 md:hidden"
          :style="`border-color: ${subject?.color}`"
          @click="addExamsOpen = true"
        >
          Add
        </button>
      </div>
      <div class="flex">
        <AddExamsModal
          v-if="addExamsOpen"
          @close="addExamsOpen = false"
          :color="subject?.color"
          :subject="subject"
        />
        <!-- Exams navbar -->
        <nav
          class="mt-2 md:mt-0 flex gap-x-2 border-b justify-end"
          :style="`border-color: ${subject?.color};`"
        >
          <a
            @click="activeNavExam = 'upcoming'"
            :class="[
              'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
              activeNavExam === 'upcoming' ? 'bg-white' : 'bg-gray-100',
            ]"
            :style="`border-bottom-color: ${activeNavExam === 'upcoming' ? '#FFFFFF' : `${subject?.color}`};
                border-left-color: ${subject?.color};
                border-right-color: ${subject?.color};
                border-top-color: ${subject?.color};`"
            >Upcoming
            <p class="hidden xl:inline">({{ upEx.upcomingExams.length }})</p></a
          >
          <a
            @click="activeNavExam = 'past'"
            :class="[
              'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
              activeNavExam === 'past' ? 'bg-white' : 'bg-gray-100',
            ]"
            :style="`border-bottom-color: ${activeNavExam === 'past' ? '#FFFFFF' : `${subject?.color}`};
                border-left-color: ${subject?.color};
                border-right-color: ${subject?.color};
                border-top-color: ${subject?.color};`"
            >Past
            <p class="hidden xl:inline">({{ pastExams.length }})</p></a
          >
        </nav>

        <button
          class="px-1 border-2 rounded-md ml-1 xl:ml-4 hidden md:block"
          :style="`border-color: ${subject?.color}`"
          @click="addExamsOpen = true"
        >
          Add
        </button>
      </div>
    </div>

    <!-- Exams -->
    <div v-if="activeNavExam === 'upcoming'" class="space-y-2 overflowy-scrolly">
      <Exam v-if="upEx.upcomingExams.length > 0" v-for="exam in upEx.upcomingExams" :exam="exam" />
      <div v-else class="">Pheew, no upcoming exam...yet</div>
    </div>
    <div v-if="activeNavExam === 'past'" class="space-y-2 overflowy-scrolly">
      <Exam v-if="pastExams.length > 0" v-for="exam in pastExams" :exam="exam" />
      <div v-else class="">Wohoo, no Exams...yet</div>
    </div>
  </div>
</template>
