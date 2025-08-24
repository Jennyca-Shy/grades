import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSemesterStore = defineStore('semester', () => {
  const currentSemester = ref('12/1');

  function setSemester(newSemester: string) {
    currentSemester.value = newSemester;
  }

  return {
    currentSemester,
    setSemester,
  };
});
