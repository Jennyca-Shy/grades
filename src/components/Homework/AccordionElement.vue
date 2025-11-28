<script setup>
import { useToast } from 'vue-toastification';
import Homework from '../Homework.vue';

const props = defineProps({
  title: String,
  input: Array,
  active: String,
});

const emit = defineEmits(['select', 'updated']);
function select() {
  if (props.active == props.title) {
    emit('select', 'none');
  } else {
    emit('select', props.title);
  }

  console.log(props.input);
}

const toast = useToast();
function finishedHomework() {
  if (props.title != 'Finished') toast.success('Wohooo, finished homework!');
  else toast.info('Changed homework to due');
  // emit('updated');
}

function errorMessage() {
  toast.error('Ups, something went wrong');
}
</script>

<template>
  <button
    @click="select"
    :class="[
      `hover:bg-newBlue hover:text-white flex justify-between items-center rounded-md mt-2 p-2 cursor-pointer`,
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
  <div class="grid grid-flow-row md:grid-cols-2 gap-2 mt-1 md:mr-1" v-if="active == title">
    <Homework
      v-for="elem in props.input"
      :homework="elem"
      @finished="finishedHomework"
      @error="errorMessage"
    />
  </div>
</template>
