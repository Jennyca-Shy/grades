<script setup>
import CircleProgressHalf from './CircleProgressHalf.vue';
import VerticalProgressBar from './VerticalProgressBar.vue';
</script>

<template>
  <div class="bg-white rounded-md m-2 p-2 flex items-center justify-center">
    <CircleProgressHalf />
    <div class="self-stretch bg-gray-200 w-[3px] rounded-md mx-6"></div>
    <div class="self-stretch mt-2 mb-3">
      <h1 class="mb-3">
        Overview
        <hr class="bg-newBlue" />
      </h1>
      <div class="flex flex-row gap-12">
        <!-- vertical progress bars -->
        <div class="flex gap-3">
          <VerticalProgressBar :progress="25" :lost="25" subject="Mat" />
          <VerticalProgressBar :progress="50" :lost="20" subject="Deu" />
          <VerticalProgressBar :progress="45" :lost="20" subject="Phy" />
          <VerticalProgressBar :progress="56" :lost="14" subject="WR" />
          <VerticalProgressBar :progress="10" :lost="25" subject="Inf" />
        </div>
        <div class="flex gap-3">
          <VerticalProgressBar :progress="25" :lost="25" subject="Eth" />
          <VerticalProgressBar :progress="50" :lost="20" subject="PuG" />
          <VerticalProgressBar :progress="45" :lost="20" subject="Spo" />
          <VerticalProgressBar :progress="56" :lost="14" subject="Eng" />
          <VerticalProgressBar :progress="30" :lost="50" subject="Kun" />
          <VerticalProgressBar :progress="34" :lost="10" subject="W-S" />
        </div>
      </div>
    </div>
  </div>
</template>
