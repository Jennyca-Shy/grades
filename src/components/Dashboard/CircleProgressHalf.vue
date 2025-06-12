<template>
  <section>
    <div class="w-full flex justify-center mt-2 mb-3">
      <h1>
        Overall Grade
        <hr class="bg-newBlue" />
      </h1>
    </div>
    <div class="relative size-40 m-auto">
      <svg class="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <!-- Background Circle (Gauge) -->
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          class="stroke-current text-newBlue/45"
          stroke-width="1"
          stroke-dasharray="75 100"
          stroke-linecap="round"
        ></circle>

        <!-- Gauge Progress -->
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          class="stroke-current text-newBlue"
          stroke-width="2"
          stroke-dasharray="56.25 100"
          stroke-linecap="round"
        ></circle>
      </svg>

      <!-- Value Text -->
      <div
        class="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <span class="text-4xl font-bold text-newBlue">700</span>
        <span class="text-newBlue block">out of 900</span>
      </div>
    </div>
  </section>
</template>
