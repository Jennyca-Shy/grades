<script setup>
import { ref } from 'vue';
import AccordionElement from '@/components/Homework/AccordionElement.vue';
import AddHomeworkModal from '@/components/Modal/AddHomeworkModal.vue';

let activeAccordion = ref('Today');
const homeworkOpen = ref(false);
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2">
    <div class="bg-white rounded-md p-4 h-[calc(100vh-24px-16px)]">
      <div class="h-full overflowy-scrolly">
        <div class="mb-2 flex justify-between">
          <h1>
            Hausaufgaben
            <hr />
          </h1>
          <button @click="homeworkOpen = true" class="modal mr-1">Add</button>
          <AddHomeworkModal v-if="homeworkOpen" @close="homeworkOpen = false" />
        </div>

        <div class="flex flex-col pb-2">
          <AccordionElement
            title="Today"
            :active="activeAccordion"
            :input="[
              ['Latin', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin2', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin3', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
            ]"
            @select="activeAccordion = $event"
          />
          <AccordionElement
            title="Tomorrow"
            :active="activeAccordion"
            :input="[
              ['Latin', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin2', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
            ]"
            @select="activeAccordion = $event"
          />
          <AccordionElement
            title="This Week"
            :active="activeAccordion"
            :input="[
              ['Latin', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin2', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin3', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin3', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
            ]"
            @select="activeAccordion = $event"
          />
          <AccordionElement
            title="Later"
            :active="activeAccordion"
            :input="[
              ['Latin23', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin223', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin323', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin323', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin323', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin323', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin323', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin323', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin323', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Latin323', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
              ['Lat', 'S.92 Übersetzen + S.145 Vokabeln bis advocare', 'blue-500'],
            ]"
            @select="activeAccordion = $event"
          />
        </div>
      </div>
    </div>
  </section>
</template>
