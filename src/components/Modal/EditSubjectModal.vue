<script setup>
import Modal from './Modal.vue';

const emit = defineEmits(['close']);
function closeModal() {
  emit('close');
}
</script>

<template>
  <Modal @close="closeModal">
    <template #title
      ><div class="mx-3">
        Edit subject: Mathe
        <hr /></div
    ></template>
    <template #body>
      <div class="mt-4 mx-2 text-sm flex flex-col w-[330px]">
        <input id="homework" type="text" placeholder="Enter title" />
      </div>
      <div class="flex mr-2">
        <button class="modal ml-auto" @click="closeModal()">Edit</button>
      </div>
    </template>
  </Modal>
</template>
