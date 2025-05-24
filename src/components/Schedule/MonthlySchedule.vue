<script setup>
import Appointment from './Appointment.vue';
</script>

<template>
  <div
    class="grid grid-rows-[min-content_1fr] grid-cols-7 p-2 text-center h-full border-2 rounded-md"
  >
    <div class="h-min border-b-2">Sun</div>
    <div class="h-min border-b-2">Mon</div>
    <div class="h-min border-b-2">Tue</div>
    <div class="h-min border-b-2">Wed</div>
    <div class="h-min border-b-2">Thu</div>
    <div class="h-min border-b-2">Fri</div>
    <div class="h-min border-b-2">Sat</div>

    <div
      class="col-span-7 grid grid-cols-[repeat(7,calc(100%/7))] grid-rows-[repeat(5,calc(100%/5))] pt-3 h-full"
    >
      <div class="text-gray-400">28</div>
      <div class="text-gray-400">29</div>
      <div class="text-gray-400">30</div>
      <div class="">1</div>
      <div class="">2</div>
      <div class="">3</div>
      <div class="">4</div>
      <div class="">5</div>
      <div class="">6<Appointment title="ap2" color="#db7d76" module="start" /></div>
      <div class="">7<Appointment title="ap2" color="#db7d76" module="middle" /></div>
      <div class="">8<Appointment title="ap2" color="#db7d76" module="end" /></div>
      <div class="">9</div>
      <div class="">10</div>
      <div class="">
        11
        <Appointment title="ap1" color="#db7d76" module="start" />
      </div>
      <div class="">
        12
        <Appointment title="ap1" color="#db7d76" module="middle" />
      </div>
      <div class="">
        13
        <Appointment title="ap1" color="#db7d76" module="end" />
      </div>
      <div class="">
        14
        <Appointment title="Test" color="#db7d76" module="single" />
        <Appointment title="Test" color="#c46fe3" module="single" />
      </div>
      <div class="">
        15
        <Appointment title="Test" color="#e36f9a" module="single" />
      </div>
      <div class="">16 <Appointment title="Test" color="#db7d76" module="start" /></div>
      <div class="">
        <div
          class="bg-newBlue text-white size-6 rounded-full flex justify-center items-center mx-auto"
        >
          17
        </div>
        <Appointment title="Test" color="#db7d76" module="end" />
      </div>
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
</template>
