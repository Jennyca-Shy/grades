<script setup lang="ts">
import { reactive } from 'vue';

const calculateCircle = (radius: number) => {
  const strokeWidth = 35;
  const koordinateSize = radius * 2 + 2 * strokeWidth;
  const center = radius + strokeWidth;
  const perimeter = 2 * Math.PI * radius;

  return {
    radius,
    strokeWidth,
    koordinateSize,
    center,
    perimeter,
  };
};
const circle = reactive(calculateCircle(80));
</script>

<template>
  <div class="w-full aspect-square rounded-md flex justify-center items-center">
    <div class="relative w-max h-max">
      <svg
        :style="{ width: circle.koordinateSize + 'px', height: circle.koordinateSize + 'px' }"
        :view-box="`0 0 ${circle.koordinateSize} ${circle.koordinateSize}`"
      >
        <!-- Background circle -->
        <circle
          class="text-gray-200 stroke-current"
          :stroke-width="circle.strokeWidth"
          :cx="circle.center"
          :cy="circle.center"
          :r="circle.radius"
          fill="transparent"
        ></circle>
        <!-- Progress circle -->
        <!-- <circle
                class="text-indigo-500 progress-ring_circle stroke-current"
                :stroke-width="circle.strokeWidth"
                stroke-linecap="round"
                :cx="circle.center"
                :cy="circle.center"
                :r="circle.radius"
                fill="transparent"
                :stroke-dasharray="circle.perimeter"
                :stroke-dashoffset="`calc(${circle.perimeter} - (${circle.perimeter} * 30) / 100 + 0.1)`"
              ></circle> -->
        <circle
          class="text-red-500 progress-ring_circle stroke-current"
          :stroke-width="circle.strokeWidth"
          stroke-linecap="round"
          :cx="circle.center"
          :cy="circle.center"
          :r="circle.radius"
          fill="transparent"
          stroke-dasharray="100"
          stroke-dashoffset="80"
        ></circle>

        <text
          class="text-2xl"
          :x="circle.center"
          :y="circle.center"
          text-anchor="middle"
          alignment-baseline="middle"
        >
          <tspan class="font-semibold mr-0" dominant-baseline="middle">200</tspan>
          <tspan dominant-baseline="middle">/900</tspan>
        </text>
      </svg>
    </div>
  </div>
</template>
