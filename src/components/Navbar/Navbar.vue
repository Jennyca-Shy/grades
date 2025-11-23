<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

const hamOpen = ref(false);
</script>

<template>
  <nav
    :class="[
      'h-screen p-3 text-gray-600 bg-white md:static md:z-0 z-50',
      hamOpen ? 'w-[150px]' : 'w-[50px] lg:w-[18vw] xl:w-[15vw] overflow-hidden',
    ]"
  >
    <!-- Logo -->
    <div class="hidden lg:block">
      <div class="h-12 font-bold items-center mb-2 text-newBlue flex">
        <a href="/" class="flex justify-center w-full text-3xl">Logo</a>
      </div>
      <hr class="my-2 bg-newBlue" />
    </div>
    <div
      class="gap-1 flex flex-col lg:hidden justify-center items-start"
      @click="hamOpen = !hamOpen"
    >
      <!-- Hamburger -->
      <span class="block h-1 w-6 bg-black rounded"></span>
      <span class="block h-1 w-6 bg-black rounded"></span>
      <span class="block h-1 w-6 bg-black rounded"></span>
    </div>
    <div
      :class="[
        'text-base font-semibold flex flex-col',
        hamOpen ? 'items-start' : 'items-center lg:items-start',
      ]"
    >
      <RouterLink
        to="/"
        :class="[
          isActiveLink('/') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex lg:justify-normal gap-3 p-2 mb-1 mt-3 rounded-md h-8 lg:h-auto w-full',
          hamOpen ? 'items-start justify-start' : 'items-center justify-center ',
        ]"
        @click="hamOpen = false"
      >
        <span class="pi pi-home text-xl"></span>
        <p :class="[hamOpen ? 'block' : 'hidden lg:block']">Dashboard</p></RouterLink
      >
      <RouterLink
        to="/schedule"
        :class="[
          isActiveLink('/schedule') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex lg:justify-normal gap-3 p-2 mb-1 rounded-md h-8 lg:h-auto w-full',
          hamOpen ? 'items-start justify-start' : 'items-center justify-center ',
        ]"
        @click="hamOpen = false"
        ><span class="pi pi-calendar text-xl"></span>
        <p :class="[hamOpen ? 'block' : 'hidden lg:block']">Schedule</p></RouterLink
      >
      <RouterLink
        to="/homework"
        :class="[
          isActiveLink('/homework') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex lg:justify-normal gap-3 p-2 mb-1 rounded-md h-8 lg:h-auto w-full',
          hamOpen ? 'items-start justify-start' : 'items-center justify-center ',
        ]"
        @click="hamOpen = false"
        ><span class="pi pi-pen-to-square text-xl"></span>
        <p :class="[hamOpen ? 'block' : 'hidden lg:block']">Homework</p></RouterLink
      >
      <RouterLink
        to="/subjects"
        :class="[
          isActiveLink('/subjects') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex lg:justify-normal gap-3 p-2 mb-1 rounded-md h-8 lg:h-auto w-full',
          hamOpen ? 'items-start justify-start' : 'items-center justify-center ',
        ]"
        @click="hamOpen = false"
        ><span class="pi pi-book text-xl"></span>
        <p :class="[hamOpen ? 'block' : 'hidden lg:block']">Subjects</p></RouterLink
      >
      <RouterLink
        to="/abitur"
        :class="[
          isActiveLink('/abitur') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex lg:justify-normal gap-3 p-2 mb-1 rounded-md h-8 lg:h-auto w-full',
          hamOpen ? 'items-start justify-start' : 'items-center justify-center ',
        ]"
        @click="hamOpen = false"
        ><span class="pi pi-chart-bar text-xl"></span>
        <p :class="[hamOpen ? 'block' : 'hidden lg:block']">Abitur</p></RouterLink
      >
      <RouterLink
        to="/other"
        :class="[
          isActiveLink('/other') ? 'bg-gray-100 text-newBlue' : 'hover:bg-gray-100',
          'flex lg:justify-normal gap-3 p-2 mb-1 rounded-md h-8 lg:h-auto w-full',
          hamOpen ? 'items-start justify-start' : 'items-center justify-center ',
        ]"
        @click="hamOpen = false"
        ><span class="pi pi-gift text-xl"></span>
        <p :class="[hamOpen ? 'block' : 'hidden lg:block']">Other</p></RouterLink
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
