<script setup>
import Subject from '@/components/Subject/Subject.vue';
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2">
    <div class="bg-white rounded-md p-4 h-[calc(100vh-24px-16px)] overflowy-scrolly">
      <h1>
        Leistungsfächer
        <hr />
      </h1>
      <div class="grid grid-cols-3 mt-3 gap-2">
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
      </div>

      <h1 class="mt-4">
        Grundfächer
        <hr />
      </h1>
      <div class="grid grid-cols-3 mt-3 gap-2">
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
        <Subject subject="Mathe" teacher="Mr. Maths" average="14.3P" color="#bfd8ff" />
      </div>
    </div>
  </section>
</template>
