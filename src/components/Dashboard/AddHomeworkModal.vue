<script setup>
import Modal from '../Modal.vue';
import { ref, computed } from 'vue';

const emit = defineEmits(['close']);
function closeModal() {
  emit('close');
}

const subjects = ref(['German', 'English', 'Latin', 'Maths', 'Biology', 'Physics']);
const searchQuery = ref('');
const dropdownVisible = ref(false);

const filteredSubjects = computed(() =>
  subjects.value.filter((subject) =>
    subject.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);
function selectSubject(subject) {
  dropdownVisible.value = false;
  searchQuery.value = subject;
}
function toggleDropdownVisible() {
  dropdownVisible.value = !dropdownVisible.value;
  searchQuery.value = '';
}
</script>

<template>
  <Modal @close="closeModal">
    <template #title>
      <div class="mx-3">
        Hausaufgaben hinzufügen
        <hr />
      </div>
    </template>
    <template #body>
      <div class="mt-4 mx-2 text-sm flex flex-col">
        <input id="homework" type="text" placeholder="Enter title" />
        <div class="relative focus:outline-newBlue mb-2">
          <input
            class="p-2 mb-1 focus:bg-white w-full"
            type="text"
            placeholder="Search..."
            v-model="searchQuery"
            @click="toggleDropdownVisible()"
          />
          <div
            class="absolute z-10 w-full bg-slate-200 rounded-b-md max-h-40 overflowy-scrolly"
            v-if="filteredSubjects.length && dropdownVisible"
          >
            <div
              v-for="subject in filteredSubjects"
              :key="subject"
              class="text-black p-2 cursor-pointer hover:text-newBlue"
              @click="selectSubject(subject)"
            >
              {{ subject }}
            </div>
          </div>
        </div>

        <input id="until" type="date" placeholder="Finished by" />
        <textarea name="notes" id="notes" placeholder="Add your notes"></textarea>
      </div>
      <div class="flex mr-2">
        <button class="ml-auto">Add</button>
      </div>
    </template>
  </Modal>
</template>
