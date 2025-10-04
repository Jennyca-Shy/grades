<script setup>
import { Holiday } from 'open-holiday-js';
import { onMounted, ref } from 'vue';
import { useSettingStore } from '@/stores/settingStore';

const holiday = new Holiday();
const schoolHolidays = ref([]);
const setting = useSettingStore();
console.log('Country: ', setting.country);

onMounted(async () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), 0, 1);
  const lastDay = new Date(today.getFullYear(), 11, 31);
  schoolHolidays.value = await holiday.getSchoolHolidays(
    setting.country,
    firstDay,
    lastDay,
    setting.subdivision,
  );
  console.log('School holidays:', schoolHolidays.value);
});
</script>

<template>
  <section class="w-4/5 m-3 h-[calc(100vh-24px)] p-2 flex flex-col"></section>
</template>
