<script setup lang="ts">
import GradesOverview from '@/components/GradesOverview.vue'
import SmallCalendar from '@/components/SmallCalendar.vue'
import TaskOverview from '@/components/TaskOverview.vue'
</script>

<template>
  <section class="w-4/5 m-3">
    <div class="grid grid-flow-col grid-cols-8 gap-2">
      <div class="col-span-6 h-full flex flex-col">
        <GradesOverview />
        <TaskOverview />
      </div>
      <div class="col-span-2">
        <SmallCalendar />
      </div>
    </div>
  </section>
</template>
