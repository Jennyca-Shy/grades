<script setup></script>

<template>
  <div class="p-2 h-full">
    <div class="flex justify-between">
      <div class="w-max">
        <h1>To-Do-List</h1>
        <hr class="bg-newBlue" />
      </div>
      <button class="modal">Add</button>
    </div>
    <div class="mt-2">
      <table class="mt-2 w-full text-start">
        <tr class="border-b-2 border-gray-300">
          <th class="text-left uppercase text-gray-500 font-normal">Title</th>
          <th class="text-left uppercase text-gray-500 font-normal">Subject</th>
          <th class="text-left uppercase text-gray-500 font-normal">Priority</th>
          <th class="text-left uppercase text-gray-500 font-normal">Status</th>
          <th class="text-left uppercase text-gray-500 font-normal">More</th>
        </tr>
        <tr>
          <td class="pt-2">Do homework</td>
          <td class="pt-2">Physics</td>
          <td class="pt-2">High</td>
          <td class="pt-2">Pending</td>
          <td class="pt-2">More</td>
        </tr>
        <tr>
          <td class="pt-2">Do homework</td>
          <td class="pt-2">Physics</td>
          <td class="pt-2">High</td>
          <td class="pt-2">Pending</td>
          <td class="pt-2">More</td>
        </tr>
      </table>
    </div>
  </div>
</template>
