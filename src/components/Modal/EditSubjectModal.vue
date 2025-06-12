<script setup>
import Modal from './Modal.vue';
import { onMounted, ref } from 'vue';

const props = defineProps(['subject']);
const subject = props.subject;
const color = props.subject.color;
const name = props.subject.name;
const teacherNew = ref('');
const nameNew = ref('');
const colorNew = ref(color);
const roomNew = ref('');

const emit = defineEmits(['close']);
function closeModal() {
  emit('close');
}

async function updateSubject() {
  if (colorNew.value != color) {
    subject.color = colorNew.value;
  }
  if (teacherNew.value != '') {
    subject.teacher = teacherNew.value;
  }
  if (roomNew.value != '') {
    subject.room = roomNew.value;
  }
  if (nameNew.value != '') {
    subject.name = nameNew.value;
  }
  await fetch(`http://localhost:3000/subject/${subject._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subject),
  });
  console.log(subject);

  closeModal();
}

onMounted(() => {
  console.log(props.subject);
  console.log(JSON.stringify(props.subject));
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
      <div class="flex mr-2">
        <button
          class="ml-auto px-1 border-2 rounded-md hover:text-white"
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
