<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2 flex flex-col">
    <div class="bg-white rounded-md p-4 h-[calc(100vh-24px-16px)] overflowy-scrolly">
      <h1>
        Some small projects
        <hr class="bg-newBlue" />
      </h1>
      <div class="grid grid-cols-4 mt-3 gap-2">
        <div class="bg-slate-400 p-2 rounded-md">Codeforces</div>
        <RouterLink to="other/pomodoro">
          <div class="bg-slate-400 p-2 rounded-md">Pomodoro Timer</div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
