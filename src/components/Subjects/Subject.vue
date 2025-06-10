<script setup>
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({
  subject: String,
  average: String,
  teacher: String,
  color: String,
});

const subjectLink = props.subject.replace(/\s+/g, '');
</script>

<template>
  <RouterLink :to="`${route.path}/${subjectLink}`">
    <div class="p-2 rounded-md cursor-pointer" :style="`background-color: ${color}`">
      <h2 class="text-lg">{{ subject }}</h2>
      <div class="flex justify-between items-center">
        <div class="">Ø {{ average }}</div>
        <div class="text-sm">{{ teacher }}</div>
      </div>
    </div>
  </RouterLink>
</template>
