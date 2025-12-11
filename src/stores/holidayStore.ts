import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Holiday } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export const useHolidayStore = defineStore('holiday', () => {
  //state
  const holiday = ref<Holiday[]>([]);

  //getter
  async function fetchHoliday() {
    try {
      const response = await fetch(`${API_URL}/holiday`);
      if (!response.ok) {
        console.log('Failed to fetch holiday!');
        return;
      }
      holiday.value = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function init() {
    if (!holiday.value.length) {
      await fetchHoliday();
    }
  }

  return {
    holiday,

    fetchHoliday,
    init,
  };
});
