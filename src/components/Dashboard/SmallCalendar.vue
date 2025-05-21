<script setup>
import TimelineObject from './TimelineObject.vue';
</script>

<template>
  <div class="bg-white rounded-md m-2 p-2 h-[calc(100vh-40px)] flex flex-col">
    <div class="flex justify-center mt-2 mb-3">
      <h1>
        Schedule
        <hr />
      </h1>
    </div>

    <!-- Small monthly Calendar -->
    <section class="">
      <!-- Title -->
      <div class="flex justify-between items-center mb-1">
        <a href=""><span class="pi pi-angle-left"></span></a>
        <h2 class="font-semibold text-newBlue">May 2025</h2>
        <a href=""><span class="pi pi-angle-right"></span></a>
      </div>

      <div class="grid grid-cols-7 p-2 text-center">
        <div class="text-xs">Mon</div>
        <div class="text-xs">Tue</div>
        <div class="text-xs">Wed</div>
        <div class="text-xs">Thu</div>
        <div class="text-xs">Fri</div>
        <div class="text-xs">Sat</div>
        <div class="text-xs">Sun</div>
        <div class="col-span-7 grid grid-cols-7 mt-1">
          <div class="text-gray-400">28</div>
          <div class="text-gray-400">29</div>
          <div class="text-gray-400">30</div>
          <div class="">1</div>
          <div class="">2</div>
          <div class="">3</div>
          <div class="">4</div>
          <div class="">5</div>
          <div class="">6</div>
          <div class="">7</div>
          <div class="">8</div>
          <div class="">9</div>
          <div class="">10</div>
          <div class="">11</div>
          <div class="">12</div>
          <div class="">13</div>
          <div class="">14</div>
          <div class="">15</div>
          <div class="">16</div>
          <div class="text-newWhite bg-newBlue rounded-md">17</div>
          <div class="">18</div>
          <div class="">19</div>
          <div class="">20</div>
          <div class="">21</div>
          <div class="">22</div>
          <div class="">23</div>
          <div class="">24</div>
          <div class="">25</div>
          <div class="">26</div>
          <div class="">27</div>
          <div class="">28</div>
          <div class="">29</div>
          <div class="">30</div>
          <div class="">31</div>
          <div class="text-gray-400">1</div>
        </div>
      </div>
    </section>
    <!-- Overview of the day -->
    <section
      class="mt-2 ml-2 overflow-y-auto flex-grow pl-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      <ol class="relative border-s border-gray-200 mr-2">
        <TimelineObject duration="8:30-9:15" subject="Latin" room="140" color="bg-yellow-100" />
        <TimelineObject duration="9:15-10:00" subject="Physics" room="026" color="bg-purple-100" />
        <TimelineObject duration="25min" color="bg-gray-200" />
        <TimelineObject duration="10:25:11:10" subject="WR" room="140" color="bg-emerald-100" />
        <TimelineObject duration="11:10-11:55" subject="Maths" room="140" color="bg-blue-100" />
        <TimelineObject duration="5min" color="bg-gray-200" />
        <TimelineObject duration="12:00-12:45" subject="German" room="140" color="bg-red-100" />
        <TimelineObject duration="12:45-13:30" subject="English" room="140" color="bg-green-100" />
      </ol>
    </section>
  </div>
</template>
