<script setup>
import { RouterLink, useRoute } from 'vue-router';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class="w-1/5 h-screen p-3 text-gray-600 bg-white">
    <!-- Logo -->
    <div class="h-12 font-bold flex items-center mb-2 text-newBlue">
      <a href="/" class="flex justify-center w-full text-3xl">Logo</a>
    </div>
    <hr class="my-2 bg-newBlue" />
    <div class="text-base font-semibold flex flex-col">
      <RouterLink
        to="/"
        :class="[
          isActiveLink('/') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex items-center gap-3 p-2 mb-1 mt-3 rounded-md',
        ]"
      >
        <span class="pi pi-home text-xl"></span>Dashboard</RouterLink
      >
      <RouterLink
        to="/schedule"
        :class="[
          isActiveLink('/schedule') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex items-center gap-3 p-2 mb-1 rounded-md',
        ]"
        ><span class="pi pi-calendar text-xl"></span>Schedule</RouterLink
      >
      <RouterLink
        to="/homework"
        :class="[
          isActiveLink('/homework') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex items-center gap-3 p-2 mb-1 rounded-md',
        ]"
        ><span class="pi pi-pen-to-square text-xl"></span>Homework</RouterLink
      >
      <RouterLink
        to="/subjects"
        :class="[
          isActiveLink('/subjects') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex items-center gap-3 p-2 mb-1 rounded-md',
        ]"
        ><span class="pi pi-book text-xl"></span>Subjects</RouterLink
      >
      <!-- <RouterLink
        to="/grades"
        :class="[
          isActiveLink('/grades') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex items-center gap-3 p-2 mb-1 rounded-md',
        ]"
        ><span class="pi pi-chart-pie text-xl"></span>Grades (Abitur)</RouterLink
      > -->
      <!-- <RouterLink
        to="/calculator"
        :class="[
          isActiveLink('/calculator') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex items-center gap-3 p-2 mb-1 rounded-md',
        ]"
        ><span class="pi pi-calculator text-xl"></span>Tum-Calculator</RouterLink
      > -->
    </div>
  </nav>
</template>
