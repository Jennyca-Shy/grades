<script setup>
import Modal from './Modal.vue';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { useSubjectStore } from '@/stores/subjectStore';
import { useScheduleStore } from '@/stores/scheduleStore';
import { useGradeStore } from '@/stores/gradeStore';
import { useHomeworkStore } from '@/stores/homeworkStore';

const subjectStore = useSubjectStore();
const scheduleStore = useScheduleStore();
const gradeStore = useGradeStore();
const homeworkStore = useHomeworkStore();

const props = defineProps({
  subject: Object,
});

console.log('SUBJECTTTT: ', props.subject);
const subject = ref(props.subject);
const color = ref(props.subject.color);
const name = ref(props.subject.name);
const teacherNew = ref('');
const nameNew = ref('');
const colorNew = ref(color);
const roomNew = ref('');
const type = ref(props.subject.type);
const isAbitur = ref(subject.abitur);

const emit = defineEmits(['close']);
function closeModal() {
  emit('close');
}

async function updateSubject() {
  if (colorNew.value != color) {
    subject.value.color = colorNew.value;
  }
  if (teacherNew.value != '') {
    subject.value.teacher = teacherNew.value;
  }
  if (roomNew.value != '') {
    subject.value.room = roomNew.value;
  }
  if (nameNew.value != '') {
    subject.value.name = nameNew.value;
  }
  subject.value.type = type.value;
  subject.value.abitur = isAbitur.value;

  subjectStore.editSubject(subject.value);

  closeModal();
  toast.success('Successfully updated the subject!');
}

function confirmDelete() {
  if (confirm('Do you really want to delete this subject? This action CAN NOT be reversed!')) {
    deleteSubject();
  }
}

const toast = useToast();
const router = useRouter();
async function deleteSubject() {
  /*
  to-do: do this after all Stores in SubjectStore, with Methods in the other two stores
  */

  /*const responseSubject = await fetch(`http://localhost:3000/subject/${subject._id}`, {
    method: 'DELETE',
  });
  const responseHomework = await fetch(`http://localhost:3000/homework/many/${subject._id}`, {
    method: 'DELETE',
  });
  const responseSchedule = await fetch(`http://localhost:3000/schedule/many/${subject._id}`, {
    method: 'DELETE',
  });*/

  const res = await subjectStore.deleteSubject(subject.value._id);
  //console.log('DELETING SUBJECT: ', res);
  if (res === 'ok') {
    /*
      temporarily here til all stores are finished
    */
    await subjectStore.fetchSubject();
    await scheduleStore.fetchSchedule();
    await gradeStore.fetchGrade();
    await homeworkStore.fetchHomework();

    router.push('/subjects');
    toast.success('Successfully deleted the subject');
  } else {
    toast.warning('Something went wrong');
  }
}

onMounted(async () => {
  console.log(props.subject);
  console.log(JSON.stringify(props.subject));
  await subjectStore.init();
  await scheduleStore.init();
  await homeworkStore.init();
  await gradeStore.init();
});
</script>

<template>
  <Modal @close="closeModal" :color="color">
    <template #title
      ><div class="mx-3">
        Edit subject: {{ name }}
        <hr :style="`background-color: ${color}`" /></div
    ></template>
    <template #body>
      <div class="mt-4 mx-2 text-sm flex flex-col w-[330px]">
        <input v-model="nameNew" id="homework" type="text" placeholder="Change title" />
        <input
          v-model="teacherNew"
          id="teacher"
          type="text"
          placeholder="Change teacher name"
          required
        />
        <input v-model="roomNew" id="room" type="text" placeholder="Change room number" required />
        <div class="relative w-full">
          <select name="type" id="type" v-model="type" :style="`outline-color: ${color}`">
            <option value="LK">erhöhtes Anforderungsniveau (LK)</option>
            <option value="GK">grundlegendes Anforderungsniveau (GK)</option>
            <option value="seminar">Seminar</option>
            <option value="sonstiges">Sonstiges</option>
          </select>
          <div class="absolute inset-y-0 right-2 flex items-center mb-3">
            <div class="pi pi-angle-down"></div>
          </div>
        </div>
        <div class="flex w-max">
          <label for="abitur" class="">Abiturfach:</label>
          <input
            v-model="isAbitur"
            type="checkbox"
            class="m-1 ml-3"
            :style="`accent-color: ${color};`"
          />
        </div>
        <div class="flex items-center">
          <label for="color" class="block">Farbe:</label>
          <input
            type="color"
            class="h-9 w-14 block bg-white border border-gray-200 cursor-pointer m-0 p-1"
            v-model="colorNew"
            title="color"
            id="color"
            required
          />
        </div>
      </div>
      <div class="flex justify-between mx-2">
        <button
          @click="confirmDelete"
          class="px-1 border-2 rounded-md border-red-600 hover:text-white hover:bg-red-600"
        >
          Delete
        </button>
        <button
          class="ml-auto px-1 border-2 rounded-md"
          :style="`border-color: ${color}`"
          @click="
            () => {
              updateSubject();
            }
          "
        >
          Edit
        </button>
      </div>
    </template>
  </Modal>
</template>
