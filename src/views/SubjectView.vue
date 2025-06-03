<script setup>
import { ref } from 'vue';
import EditSubjectModal from '@/components/Modal/EditSubjectModal.vue';
import Task from '@/components/Task.vue';
import Grade from '@/components/Subject/Grade.vue';

const editOpen = ref(false);
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2 flex flex-col">
    <div class="p-4 bg-white rounded-md">
      <div class="flex justify-between">
        <h1>
          Mathe
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
        <h1>
          Homework:
          <hr />
        </h1>
        <div class="mt-2 pb-2 space-y-2 flex-1">
          <Task subject="Mathe" task="S.120 im Buch lesen" />
          <Task subject="Mathe" task="S.120 im Buch lesen" />
          <Task subject="Mathe" task="S.120 im Buch lesen" />
          <Task subject="Mathe" task="S.120 im Buch lesen" />
          <Task subject="Mathe" task="S.120 im Buch lesen" />
          <Task subject="Mathe" task="S.120 im Buch lesen" />
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
          <Task subject="Mathe" task="Zweite Ableitung" date="1.06.2025" />
          <Task subject="Mathe" task="Zweite Ableitung" date="1.06.2025" />
          <Task subject="Mathe" task="Zweite Ableitung" date="1.06.2025" />
        </div>
      </div>
      <div class="bg-white rounded-md p-2 overflowy-scrolly">
        <h1>
          Notes:
          <hr />
        </h1>
        <div class="mt-2">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
          diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua.
        </div>
      </div>
    </div>
  </section>
</template>
