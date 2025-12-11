<script setup>
import Modal from './Modal.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useSubjectStore } from '@/stores/subjectStore';

const props = defineProps({
  subjectType: String,
  subjectLong: String,
});

const emit = defineEmits(['close', 'added']);
function closeModal() {
  emit('close');
}

const subjectStore = useSubjectStore();

//Add a new subject
const toast = useToast();

const subject = ref('');
const teacher = ref('');
const room = ref('');
const color = ref('#2563eb');
const type = ref(props.subjectType);

async function addSubject() {
  if (subject.value && teacher.value && room.value) {
    const response = await subjectStore.addSubject(
      subject.value,
      teacher.value,
      room.value,
      color.value,
      type.value,
    );

    //console.log(data);
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
        {{ subjectLong }} hinzufügen
        <hr class="bg-newBlue" />
      </div>
    </template>
    <template #body>
      <form @submit.prevent="addSubject" class="mt-4 mx-2 text-sm flex flex-col w-[330px]">
        <input
          v-model="subject"
          id="subject"
          type="text"
          :placeholder="`Enter ${subjectType}`"
          required
        />
        <input
          v-model="teacher"
          id="teacher"
          type="text"
          placeholder="Enter teacher name"
          required
        />
        <input v-model="room" id="room" type="text" placeholder="Enter room number" required />

        <div v-if="subjectType == 'sonstiges'" class="relative w-full">
          <select name="type" id="type" v-model="type" :style="`outline-color: ${color}`">
            <option value="seminar">Seminar</option>
            <option value="sonstiges">Sonstiges</option>
          </select>
          <div class="absolute inset-y-0 right-2 flex items-center mb-3">
            <div class="pi pi-angle-down"></div>
          </div>
        </div>

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
