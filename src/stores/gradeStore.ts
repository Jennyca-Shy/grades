import { defineStore } from 'pinia';
import type { Grade, Subject } from './types';
import { ref, computed } from 'vue';

const API_URL = import.meta.env.VITE_API_URL;

export const useGradeStore = defineStore('grade', () => {
  //state
  const grade = ref<Grade[]>([]);

  const upcomingGrades = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return grade.value
      .filter((g) => {
        return g.result === null && g.date >= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  //getter
  async function fetchGrade() {
    const response = await fetch(`${API_URL}/grade`);
    if (!response.ok) {
      throw new Error(`Failed to fetch grades:  ${response.status}`);
    }
    grade.value = await response.json();
  }

  async function init() {
    if (!grade.value.length) {
      await fetchGrade();
    }
  }

  function getGradesBySubject(sub: Subject) {
    return computed(() => grade.value.filter((g) => g.subject._id === sub._id));
  }

  function getUpcomingGradesBySubject(subId: string) {
    return {
      upcomingExams: computed(() => {
        const today = new Date();
        return grade.value
          .filter((gr) => {
            return gr.subject._id === subId && new Date(gr.date) >= today && gr.result === null;
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }),
    };
  }

  function getPastGradesBySubject(subId: string) {
    return {
      pastExams: computed(() => {
        const today = new Date();
        return grade.value
          .filter((gr) => {
            return (
              (gr.subject._id === subId && new Date(gr.date) < today) ||
              (gr.subject._id === subId && gr.result != null)
            );
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }),
    };
  }

  function getGradesSortedBySemester(sub: Subject) {
    const gradeOfSubject = grade.value.filter((g) => g.subject._id === sub._id);
    const firstSemester = computed(() =>
      gradeOfSubject.filter((grade) => {
        return grade.semester == '12/1';
      }),
    );
    const secondSemester = computed(() =>
      gradeOfSubject.filter((grade) => {
        return grade.semester == '12/2';
      }),
    );
    const thirdSemester = computed(() =>
      gradeOfSubject.filter((grade) => {
        return grade.semester == '13/1';
      }),
    );
    const fourthSemester = computed(() =>
      gradeOfSubject.filter((grade) => {
        return grade.semester == '13/2';
      }),
    );

    return {
      firstSemester,
      secondSemester,
      thirdSemester,
      fourthSemester,
    };
  }

  function getGradesWithResult(id: string) {
    return computed(() =>
      grade.value.filter((grade) => {
        return grade.subject._id === id && grade.result && grade.type != 'Abitur';
      }),
    );
  }

  //setter

  async function addGrade(
    title: string,
    subject: Subject,
    date: string,
    result: number,
    outOf: number,
    semester: string,
    type: string,
    notes: string,
  ) {
    try {
      const response = await fetch(`${API_URL}/grade`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          subject: subject._id,
          date: date,
          result: result,
          outOf: outOf,
          semester: semester,
          type: type,
          notes: notes,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fehler beim Hinzufügen der Hausaufgabe:', errorText);
        return;
      }

      const newGr = await response.json();
      grade.value.push(newGr);
    } catch (error) {
      throw new Error('Failed to add grade');
    }
  }

  async function editGrade(gr: Grade) {
    try {
      const response = await fetch(`${API_URL}/grade/${gr._id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(gr),
      });

      const newGr = await response.json();
      const index = grade.value.findIndex((g) => g._id === gr._id);
      if (index != -1) grade.value[index] = newGr;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteGrade(id: string) {
    try {
      const response = await fetch(`${API_URL}/grade/single/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.log(response.status, response.statusText);
        return 'error';
      }

      grade.value = grade.value.filter((g) => g._id != id);
      return 'ok';
    } catch (error) {
      console.log('Failed to delete grade: ', error);
      return 'error';
    }
  }

  return {
    //state
    grade,

    upcomingGrades,

    //getter
    fetchGrade,
    init,
    getGradesBySubject,
    getUpcomingGradesBySubject,
    getPastGradesBySubject,
    getGradesSortedBySemester,
    getGradesWithResult,

    //setter
    addGrade,
    editGrade,
    deleteGrade,
  };
});
