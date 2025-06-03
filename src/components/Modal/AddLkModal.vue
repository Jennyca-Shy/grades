<script setup>
import Modal from './Modal.vue';

const emit = defineEmits(['close']);
function closeModal() {
  emit('close');
}
</script>

<template>
  <Modal @close="closeModal">
    <template #title>
      <div class="mx-3">
        Leistungsfach hinzufügen
        <hr />
      </div>
    </template>
    <template #body>
      <div class="mt-4 mx-2 text-sm flex flex-col w-[330px]">
        <input id="lk" type="text" placeholder="Enter LK" />
        <input id="teacher" type="text" placeholder="Enter teacher name" />
        <input id="room" type="text" placeholder="Enter room number" />

        <div class="flex items-center">
          <label for="color" class="block">Farbe:</label>
          <input
            type="color"
            class="h-9 w-14 block bg-white border border-gray-200 cursor-pointer m-0 p-1"
            id="color"
            value="#2563eb"
            title="color"
          />
        </div>
      </div>
      <div class="flex mr-2">
        <button class="modal ml-auto" @click="closeModal()">Add</button>
      </div>
    </template>
  </Modal>
</template>
