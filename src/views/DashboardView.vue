<script setup lang="ts">
import GradesOverview from '@/components/Dashboard/GradesOverview.vue';
import SmallCalendar from '@/components/Dashboard/SmallCalendar.vue';
import TaskOverview from '@/components/Dashboard/TaskOverview.vue';
</script>

<template>
  <section class="m-3 overflowy-scrolly">
    <div class="lg:grid lg:grid-flow-col lg:grid-cols-8 gap-1 flex flex-col">
      <div class="col-span-6 h-full flex flex-col">
        <GradesOverview />
        <TaskOverview />
      </div>
      <div class="lg:col-span-2">
        <SmallCalendar />
      </div>
    </div>
  </section>
</template>
