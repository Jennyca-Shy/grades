<script setup></script>

<template>
  <nav class="w-1/5 h-screen p-3 text-gray-600 bg-white">
    <!-- Logo -->
    <div class="h-12 font-bold flex items-center mb-2 text-newBlue">
      <a href="/" class="flex justify-center w-full text-3xl">Logo</a>
    </div>
    <hr class="my-2" />
    <div class="text-base font-semibold flex flex-col">
      <a href="/" class="flex items-center gap-3 bg-gray-100 text-newBlue rounded-md p-2 mb-1 mt-3">
        <span class="pi pi-home text-xl"></span>Dashboard</a
      >
      <a href="/" class="flex items-center gap-3 p-2 mb-1"
        ><span class="pi pi-calendar text-xl"></span>Schedule</a
      >
      <a href="/" class="flex items-center gap-3 p-2 mb-1"
        ><span class="pi pi-book text-xl"></span>Subjects</a
      >
      <a href="/" class="flex items-center gap-3 p-2 mb-1"
        ><span class="pi pi-chart-pie text-xl"></span>Grades</a
      >
      <a href="/" class="flex items-center gap-3 p-2 mb-1"
        ><span class="pi pi-calculator text-xl"></span>Tum-Calculator</a
      >
    </div>
  </nav>
</template>
