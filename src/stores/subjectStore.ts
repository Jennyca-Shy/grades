import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Subject } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export const useSubjectStore = defineStore('subject', () => {
  //state
  const subject = ref<Subject[]>([]);
  const lk = computed(() => {
    return subject.value.filter((sub) => {
      return sub.type == 'LK';
    });
  });
  const gk = computed(() => {
    return subject.value.filter((sub) => {
      return sub.type == 'GK';
    });
  });

  const sonstiges = computed(() => {
    return subject.value.filter((sub) => {
      return sub.type === 'sonstiges' || sub.type === 'seminar';
    });
  });

  function getSubjectById(id: string) {
    return subject.value.find((sub) => sub._id === id);
  }

  //getter
  async function fetchSubject() {
    const response = await fetch(`${API_URL}/subject`);
    if (!response.ok) {
      throw new Error(`Failed to fetch subject: ${response.status}`);
    }
    subject.value = await response.json();
  }

  async function init() {
    if (!subject.value.length) {
      await fetchSubject();
    }
  }
  //setter
  async function addSubject(
    name: string,
    teacher: string,
    room: string,
    color: string,
    type: string,
  ) {
    try {
      const response = await fetch(`${API_URL}/subject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          teacher: teacher,
          room: room,
          color: color,
          type: type,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add subject');
      }

      const newSub = await response.json();
      if (newSub.message === 'duplicate') {
        return 'duplicate';
      }

      subject.value.push(newSub);
      return 'ok';
    } catch (error) {
      console.error(error);
    }
  }

  async function editSubject(sub: Subject) {
    const findSub = subject.value.find((s) => s._id === sub._id);
    if (!findSub) {
      console.log('FIND SUB', findSub);
      console.log('Sub', sub);
      throw new Error("Couldn't find subject!");
    }

    const response = await fetch(`${API_URL}/subject/${sub._id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(sub),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fehler beim Ändern des Fachs:', errorText);
      return;
    }

    const updatedSub = await response.json();
    const index = subject.value.findIndex((s) => s._id === sub._id);
    if (index != -1) subject.value[index] = updatedSub;
  }

  async function deleteSubject(subId: string) {
    try {
      const response = await fetch(`${API_URL}/subject/${subId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        return 'error';
      }

      subject.value = subject.value.filter((sub) => sub._id != subId);
      return 'ok';
    } catch (error) {
      throw new Error("Couldn't delete subject!");
    }
  }

  return {
    //state
    subject,

    //getter
    lk,
    gk,
    sonstiges,
    fetchSubject,
    init,
    getSubjectById,

    //setter
    addSubject,
    editSubject,
    deleteSubject,
  };
});
