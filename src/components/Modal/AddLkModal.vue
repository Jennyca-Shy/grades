<script setup>
import Modal from './Modal.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useSubjectStore } from '@/stores/subjectStore';

const emit = defineEmits(['close', 'added']);
function closeModal() {
  emit('close');
}

const subjectStore = useSubjectStore();

//Add a new subject
const toast = useToast();

const lk = ref('');
const teacher = ref('');
const room = ref('');
const color = ref('#2563eb');
async function addLK() {
  if (lk.value && teacher.value && room.value) {
    // const response = await fetch('http://localhost:3000/subject', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: lk.value,
    //     teacher: teacher.value,
    //     room: room.value,
    //     color: color.value,
    //     type: 'LK',
    //   }),
    // });

    const response = subjectStore.addSubject(
      lk.value,
      teacher.value,
      room.value,
      color.value,
      'LK',
    );

    console.log(data);
    if (response == 'ok') {
      emit('added');
      closeModal();
    } else if (response === 'duplicate') {
      toast.warning('Subject already exists!');
    } else {
      toast.error('Something went wrong!');
    }
  }
}
</script>

<template>
  <Modal @close="closeModal">
    <template #title>
      <div class="mx-3">
        Leistungsfach hinzufügen
        <hr class="bg-newBlue" />
      </div>
    </template>
    <template #body>
      <form @submit.prevent="addLK" class="mt-4 mx-2 text-sm flex flex-col w-[330px]">
        <input v-model="lk" id="lk" type="text" placeholder="Enter LK" required />
        <input
          v-model="teacher"
          id="teacher"
          type="text"
          placeholder="Enter teacher name"
          required
        />
        <input v-model="room" id="room" type="text" placeholder="Enter room number" required />

        <div class="flex items-center">
          <label for="color" class="block">Farbe:</label>
          <input
            type="color"
            class="h-9 w-14 block bg-white border border-gray-200 cursor-pointer m-0 p-1"
            v-model="color"
            title="color"
            id="color"
            required
          />
        </div>
        <div class="flex ml-auto">
          <button class="modal ml-auto" type="submit">Add</button>
        </div>
      </form>
    </template>
  </Modal>
</template>
