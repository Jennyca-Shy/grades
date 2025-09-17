<script setup>
import { ref } from 'vue';

const activeMode = ref('pomodoro');
</script>

<template>
  <div class="p-2 h-full">
    <div class="w-min mx-auto">
      <h1>Pomodoro Timer</h1>
      <hr class="bg-newBlue" />
    </div>
    <div class="mt-2">
      <nav
        class="flex gap-x-2 border-b justify-end w-max mx-auto"
        :style="`border-color: #44a1a0;`"
      >
        <a
          @click="activeMode = 'pomodoro'"
          :class="[
            'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
            activeMode === 'pomodoro' ? 'bg-white' : 'bg-gray-100',
          ]"
          :style="`border-bottom-color: ${activeMode === 'pomodoro' ? '#FFFFFF' : `#44a1a0`};
                border-left-color: #44a1a0;
                border-right-color: #44a1a0;
                border-top-color: #44a1a0;`"
          >Pomodoro</a
        >
        <a
          @click="activeMode = 'short'"
          :class="[
            'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
            activeMode === 'short' ? 'bg-white' : 'bg-gray-100',
          ]"
          :style="`border-bottom-color: ${activeMode === 'short' ? '#FFFFFF' : `#44a1a0`};
                border-left-color: #44a1a0;
                border-right-color: #44a1a0;
                border-top-color: #44a1a0;`"
          >Short break</a
        >
        <a
          @click="activeMode = 'long'"
          :class="[
            'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
            activeMode === 'long' ? 'bg-white' : 'bg-gray-100',
          ]"
          :style="`border-bottom-color: ${activeMode === 'long' ? '#FFFFFF' : `#44a1a0`};
                border-left-color: #44a1a0;
                border-right-color: #44a1a0;
                border-top-color: #44a1a0;`"
          >Long break</a
        >
      </nav>
    </div>
  </div>
</template>
