<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { nextTick } from 'vue';

const props = defineProps({
  propSubject: Object,
});

let subject = ref(props.propSubject);
let editableNotes = ref(false);
const newNotes = ref('');
let id = ref(subject.value._id);

let toast = useToast();
async function changeEditable() {
  editableNotes.value = !editableNotes.value;
  if (editableNotes.value) {
    newNotes.value = subject.value.notes || '';
    console.log('New notes: ', newNotes.value);
    nextTick(() => {
      document.getElementById('notesEdit')?.focus();
    });
  } else {
    const response = await fetch(`http://localhost:3000/subject/${id.value}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        notes: newNotes.value,
      }),
    });
    if (response.ok) {
      getSubject();
      toast.success('Edited your notes!');
    } else {
      const data = await response.json();
      console.log(data.message);
      alert('Something went wrong!!!');
    }
  }
}

async function getSubject() {
  const response = await fetch(`http://localhost:3000/subject/id/${id.value}`);
  const data = await response.json();

  subject.value = data;
  console.log(subject.value);
  console.log('Got subject');
}
</script>

<template>
  <div class="bg-white rounded-md p-2 overflowy-scrolly flex flex-col">
    <div class="flex justify-between">
      <h1>
        Notes:
        <hr :style="`background-color: ${subject?.color};`" />
      </h1>

      <button
        class="px-1 border-2 rounded-md ml-4"
        :style="`border-color: ${subject?.color}`"
        @click="changeEditable()"
      >
        {{ editableNotes ? 'Save' : 'Edit' }}
      </button>
    </div>

    <div id="notes" class="whitespace-pre-wrap h-full">
      <p v-if="!editableNotes" class="mt-2 h-full">{{ subject?.notes || 'No notes yet...' }}</p>
      <textarea
        v-else
        name="notesEdit"
        id="notesEdit"
        class="bg-gray-100 h-full"
        v-model="newNotes"
      >
            {{ newNotes }}
            </textarea
      >
    </div>
  </div>
</template>
