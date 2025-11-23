<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="m-3 p-2 flex flex-col">
    <div class="bg-white rounded-md p-4 overflowy-scrolly h-full">
      <h1>
        Some small projects
        <hr class="bg-newBlue" />
      </h1>
      <div class="grid md:grid-cols-4 mt-3 gap-2">
        <div class="bg-slate-400 p-2 rounded-md">Codeforces</div>
        <RouterLink to="other/pomodoro">
          <div class="bg-slate-400 p-2 rounded-md">Pomodoro Timer</div>
        </RouterLink>

        <RouterLink to="other/test">
          <div class="bg-slate-400 p-2 rounded-md">Test</div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
