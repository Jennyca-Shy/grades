<script setup lang="ts">
import FirstSection from '@/components/Abitur/firstSection.vue';
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2">
    <div class="bg-white rounded-md p-4 h-[calc(100vh-24px-16px)] overflowy-scrolly">
      <div class="flex justify-between">
        <h1>
          Abitur
          <hr class="bg-newBlue" />
        </h1>
      </div>
      <firstSection></firstSection>
    </div>
  </section>
</template>
