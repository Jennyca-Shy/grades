import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Schedule, Subject } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export const useScheduleStore = defineStore('schedule', () => {
  //state
  const schedule = ref<Schedule[]>([]);

  //getter
  async function fetchSchedule() {
    try {
      const response = await fetch(`${API_URL}/schedule`);
      if (!response.ok) {
        console.log('Failed to fetch SChedule!');
        return;
      }
      schedule.value = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function init() {
    if (!schedule.value.length) {
      await fetchSchedule();
    }
  }

  async function deleteSchedule(id: string) {
    try {
      const response = await fetch(`${API_URL}/schedule/single/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        return 'error';
      } else {
        schedule.value.filter((sch) => sch._id != id);
        return 'ok';
      }
    } catch (error) {}
  }

  async function addSchedule(
    weekday: string,
    subject: string,
    startTime: string,
    endTime: string,
    room: string,
  ) {
    try {
      const response = await fetch(`${API_URL}/schedule`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          weekday: weekday,
          subject: subject,
          startTime: startTime,
          endTime: endTime,
          room: room,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Coulnd't add schedule! ", errorText);
        return 'error';
      }

      const newSched = await response.json();
      schedule.value.push(newSched);
      return 'ok';
    } catch (error) {
      throw new Error('Failed to add schedule!');
    }
  }

  return {
    schedule,

    fetchSchedule,
    init,

    deleteSchedule,
    addSchedule,
  };
});
