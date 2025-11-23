<script setup>
import Navbar from './components/Navbar/Navbar.vue';
</script>

<template>
  <div class="bg-blue-100 flex h-screen">
    <Navbar class="" />
    <RouterView class="flex-1" />
  </div>
</template>
