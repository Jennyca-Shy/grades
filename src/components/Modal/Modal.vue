<script setup>
const emit = defineEmits(['close']);

const props = defineProps({
  color: {
    type: String,
    default: '#44a1a0',
  },
});

function closeModal() {
  emit('close');
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed z-[2] left-0 top-0 size-full overflow-auto bg-slate-50/30 flex justify-center items-center"
      id="myModal"
      @click="closeModal"
    >
      <div
        class="bg-white m-auto py-3 px-2 rounded-md border-2"
        :style="`border-color: ${color}`"
        @click.stop
      >
        <div class="flex items-center justify-between">
          <div v-if="$slots.title" class="title text-lg font-semibold mr-2">
            <slot name="title"></slot>
          </div>
          <span
            @click="closeModal"
            class="pi pi-times cursor-pointer m-2 text-lg text-gray-400 float-right font-bold hover:text-gray-600"
          ></span>
        </div>
        <slot name="body"></slot>
      </div>
    </div>
  </Teleport>
</template>
