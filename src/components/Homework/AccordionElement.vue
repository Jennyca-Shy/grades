<script setup>
import Task from '../Task.vue';

const props = defineProps({
  title: String,
  input: Array,
  active: String,
});

const emit = defineEmits(['select']);
function select() {
  if (props.active == props.title) {
    emit('select', 'none');
  } else {
    emit('select', props.title);
  }
}

console.log(props.input);
</script>

<template>
  <button
    @click="select"
    :class="[
      `hover:bg-newBlue hover:text-white mr-1 flex justify-between items-center rounded-md mt-2 p-2 cursor-pointer`,
      title === active ? 'bg-newBlue text-white' : 'bg-gray-100',
    ]"
  >
    <div class="flex items-center">
      <p>{{ title }}</p>
      <div class="text-sm ml-1.5 text-gray-600">({{ input.length }})</div>
    </div>
    <div v-if="active == title" class="pi pi-plus mr-1"></div>
    <div v-else class="pi pi-minus mr-1"></div>
  </button>
  <div class="grid grid-flow-row grid-cols-2 gap-2 mt-1 mr-1" v-if="active == title">
    <Task v-for="elem in input" :subject="elem[0]" :task="elem[1]" :color="elem[2]" />
  </div>
</template>
