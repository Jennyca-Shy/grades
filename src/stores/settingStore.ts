import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingStore = defineStore('setting', () => {
  const defaultColor = ref('#44a1a0');

  function setColor(color: string) {
    defaultColor.value = color;
  }

  return {
    defaultColor,
    setColor,
  };
});
