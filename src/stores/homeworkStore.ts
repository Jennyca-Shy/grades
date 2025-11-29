import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Homework } from './types';
import type { Subject } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export const useHomeworkStore = defineStore('homework', () => {
  //state
  const homework = ref<Homework[]>([]);

  //getter
  async function fetchHomework() {
    const response = await fetch(`${API_URL}/homework`);
    if (!response.ok) {
      throw new Error(`Failed to fetch homework: ${response.status}`);
    }

    homework.value = await response.json();
  }

  async function init() {
    if (!homework.value.length) {
      await fetchHomework();
    }
  }

  const overdueHomework = computed(() => {
    const today = new Date().toISOString().split('T')[0];

    return homework.value
      .filter((hw) => {
        const dueDate = new Date(hw.dueDate).toISOString().split('T')[0];
        return hw.status != 'finished' && dueDate < today;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  });

  const dueHomework = computed(() => {
    const today = new Date().toISOString().split('T')[0];

    return homework.value
      .filter((hw) => {
        const dueDate = new Date(hw.dueDate).toISOString().split('T')[0];
        return hw.status != 'finished' && dueDate >= today;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  });

  const finishedHomework = computed(() => {
    return homework.value
      .filter((hw) => {
        return hw.status === 'finished';
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  });

  const todayHomework = computed(() => {
    const today = new Date().toISOString().split('T')[0];

    return homework.value.filter((hw) => {
      const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
      return hw.status != 'finished' && dueTo === today;
    });
  });

  const tomorrowHomework = computed(() => {
    let tomorrow = computed(() => {
      let temp = new Date();
      temp.setDate(temp.getDate() + 1);
      return temp.toISOString().split('T')[0];
    });

    return homework.value.filter((hw) => {
      const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
      return hw.status != 'finished' && dueTo === tomorrow.value;
    });
  });

  const thisWeekHomework = computed(() => {
    let tomorrow = computed(() => {
      let temp = new Date();
      temp.setDate(temp.getDate() + 1);
      return temp.toISOString().split('T')[0];
    });
    let thisWeek = computed(() => {
      let temp = new Date();
      temp.setDate(temp.getDate() + 7);
      return temp.toISOString().split('T')[0];
    });

    return homework.value
      .filter((hw) => {
        const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
        return dueTo > tomorrow.value && dueTo <= thisWeek.value && hw.status != 'finished';
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  });

  const laterHomework = computed(() => {
    let thisWeek = computed(() => {
      let temp = new Date();
      temp.setDate(temp.getDate() + 7);
      return temp.toISOString().split('T')[0];
    });

    return homework.value
      .filter((hw) => {
        const dueTo = new Date(hw.dueDate).toISOString().split('T')[0];
        return dueTo > thisWeek.value && hw.status != 'finished';
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  });

  function getHomeworkBySubject(subId: string) {
    return {
      overdueHomework: computed(() => {
        const today = new Date().toISOString().split('T')[0];
        return homework.value
          .filter((hw) => {
            const dueDate = new Date(hw.dueDate).toISOString().split('T')[0];
            return subId === hw.subject._id && hw.status != 'finished' && dueDate < today;
          })
          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      }),
      dueHomework: computed(() => {
        const today = new Date().toISOString().split('T')[0];

        return homework.value
          .filter((hw) => {
            const dueDate = new Date(hw.dueDate).toISOString().split('T')[0];
            return subId === hw.subject._id && hw.status != 'finished' && dueDate >= today;
          })
          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      }),
      finishedHomework: computed(() => {
        return homework.value
          .filter((hw) => {
            return subId === hw.subject._id && hw.status === 'finished';
          })
          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      }),
    };
  }

  //setter
  async function toggleHomeworkStatus(id: string) {
    try {
      const hw = homework.value.find((h) => h._id === id);
      if (!hw) throw new Error('Homework not found');

      //local
      const newStatus = hw.status === 'finished' ? 'due' : 'finished';
      hw.status = newStatus;

      //db
      const response = await fetch(`${API_URL}/homework/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
      if (!response.ok) throw new Error('Failed to update homework');
    } catch (error) {
      console.error(error);
    }
  }

  async function addHomework(hwTitle: string, sub: Subject, hwNotes: string, hwDueDate: string) {
    try {
      //db
      const response = await fetch(`${API_URL}/homework`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title: hwTitle,
          subject: sub._id,
          notes: hwNotes,
          dueDate: hwDueDate,
          status: 'due',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fehler beim Hinzufügen der Hausaufgabe:', errorText);
        return;
      }

      //local
      /*
        to-do: populate the subject so you dont have to reload the site to see the subject
      */
      const newHw = await response.json();
      homework.value.push(newHw);
    } catch (error) {
      console.error(error);
    }
  }

  async function editHomework(hw: Homework) {
    try {
      //db
      const findHw = homework.value.find((h) => h._id === hw._id);
      if (!findHw) throw new Error('Homework not found');

      const response = await fetch(`${API_URL}/homework/${hw._id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(hw),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fehler beim Ändern der Hausaufgabe:', errorText);
        return;
      }

      //local
      const updatedHw = await response.json();
      const index = homework.value.findIndex((h) => h._id === hw._id);
      if (index != -1) homework.value[index] = updatedHw;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteHomework(id: string) {
    try {
      //db
      const response = await fetch(`${API_URL}/homework/single/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fehler beim Löschen der Hausaufgabe:', errorText);
        return;
      }

      //local
      homework.value = homework.value.filter((h) => h._id != id);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    //getter
    fetchHomework,
    init,

    //state
    homework,
    dueHomework,
    overdueHomework,
    finishedHomework,
    todayHomework,
    tomorrowHomework,
    thisWeekHomework,
    laterHomework,
    getHomeworkBySubject,

    //setter
    toggleHomeworkStatus,
    addHomework,
    editHomework,
    deleteHomework,
  };
});
