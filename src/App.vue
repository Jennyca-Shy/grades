<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="bg-blue-100 flex h-screen">
    <Navbar />
    <RouterView />
  </div>
</template>
