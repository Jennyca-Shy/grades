<script setup>
import { ref } from 'vue';

const open = ref(true); // sidebar starts open
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <div
      :class="[
        'bg-gray-800 text-white h-screen transition-all duration-300 overflow-hidden',
        open ? 'w-56' : 'w-14',
      ]"
    >
      <!-- Hamburger Button inside sidebar -->
      <button
        @click="open = !open"
        class="p-3 focus:outline-none hover:bg-gray-700 w-full flex justify-start"
      >
        <!-- Hamburger Icon -->
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <!-- Menu Items -->
      <div v-if="open" class="mt-4 flex flex-col gap-2 px-3">
        <a class="p-2 hover:bg-gray-700 rounded">Dashboard</a>
        <a class="p-2 hover:bg-gray-700 rounded">Subjects</a>
        <a class="p-2 hover:bg-gray-700 rounded">Grades</a>
        <a class="p-2 hover:bg-gray-700 rounded">Settings</a>
      </div>
    </div>
  </div>
</template>
