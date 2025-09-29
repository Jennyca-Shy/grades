<script setup>
import { ref } from 'vue';

const activeMode = ref('pomodoro');

let interval;
let running = false;
let timeLeft = 25 * 60;

function clock() {
  if (running) {
    running = false;
    document.getElementById('button').innerHTML = 'Start';
    clearInterval(interval);
  } else {
    running = true;
    startClock();
  }
}

function startClock() {
  if (interval) {
    clearInterval(interval);
  }
  document.getElementById('button').innerHTML = 'Stop';
  if (timeLeft == 0) {
    if (activeMode.value === 'pomodoro') {
      timeLeft = 25 * 60;
    } else if (activeMode.value === 'short') {
      timeLeft = 5 * 60;
    } else {
      timeLeft = 15 * 60;
    }
  }
  interval = setInterval(function () {
    timeLeft -= 1;

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    document.getElementById('clock').innerHTML = minutes + ':' + seconds;

    if (timeLeft < 0) {
      clearInterval(interval);
    }
  }, 1000);
}

function changeText() {
  if (interval) {
    running = false;
    document.getElementById('button').innerHTML = 'Start';
    clearInterval(interval);
  }
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  document.getElementById('clock').innerHTML = minutes + ':' + seconds;
}
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
          @click="
            activeMode = 'pomodoro';
            timeLeft = 25 * 60;
            changeText();
          "
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
          @click="
            activeMode = 'short';
            timeLeft = 5 * 60;
            changeText();
          "
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
          @click="
            activeMode = 'long';
            timeLeft = 15 * 60;
            changeText();
          "
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
    <div class="w-full flex justify-center items-center flex-col">
      <div class="text-6xl mt-6 orbitron" id="clock">25:00</div>
      <button
        class="mt-6 text-2xl border-2 px-3 py-2 rounded-md border-newBlue hover:bg-newBlue hover:text-white"
        @click="clock()"
        id="button"
      >
        Start
      </button>
    </div>
  </div>
</template>
