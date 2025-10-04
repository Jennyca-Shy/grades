import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingStore = defineStore('setting', () => {
  const defaultColor = ref('#44a1a0');
  const country = ref('DE');
  const subdivision = ref('DE-BY');

  function setColor(color: string) {
    defaultColor.value = color;
  }

  function setCountry(c: string) {
    country.value = c;
  }

  function setSubdivision(s: string) {
    subdivision.value = s;
  }

  return {
    defaultColor,
    country,
    subdivision,
    setColor,
    setCountry,
    setSubdivision,
  };
});
