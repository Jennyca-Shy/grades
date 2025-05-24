<script setup>
import ScheduleEvent from './ScheduleEvent.vue';
</script>
<template>
  <div
    class="border-2 p-2 rounded-md grid grid-cols-[50px_repeat(7,1fr)] grid-rows-[26px_repeat(108,5px)] h-full text-center flex-1 overflowy-scrolly"
  >
    <!-- Left column with time -->
    <div class="col-start-1 row-start-1 border-b-2">Time</div>
    <div v-for="i in 9" :class="[`col-start-1 row-start-[${(i - 1) * 12 + 2}] row-span-12`]">
      {{ i + 6 }}:00
    </div>

    <!-- Right colums with weekdays -->
    <div
      v-for="(value, index) in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
      :class="`col-start-[${index + 2}] row-start-1 row-span-1 col-span-1 border-b-2`"
    >
      {{ value }}
    </div>

    <!-- Schedule: every 5min is one row, Mon has col-start-2, 7:00 has row-start-2 -->
    <ScheduleEvent weekday="Mon" startTime="7:45" title="Ethik" :duration="45" />
    <ScheduleEvent weekday="Mon" startTime="8:30" title="Geographie" :duration="45" />
    <ScheduleEvent weekday="Mon" startTime="9:15" title="Chemie" :duration="45" />
    <ScheduleEvent weekday="Mon" startTime="10:00" title="Pause" :duration="25" :pause="true" />
    <ScheduleEvent weekday="Mon" startTime="10:25" title="Deutsch" :duration="90" />
    <ScheduleEvent weekday="Mon" startTime="11:55" title="Pause" :duration="5" :pause="true" />
    <ScheduleEvent weekday="Mon" startTime="12:00" title="Mathe" :duration="45" />
    <ScheduleEvent weekday="Mon" startTime="13:30" title="Sport" :duration="90" />

    <ScheduleEvent weekday="Tue" startTime="8:30" title="Latein" :duration="45" />
    <ScheduleEvent weekday="Tue" startTime="9:15" title="Pyhsik" :duration="45" />
    <ScheduleEvent weekday="Tue" startTime="10:00" title="Pause" :duration="25" :pause="true" />
    <ScheduleEvent weekday="Tue" startTime="10:25" title="WR" :duration="45" />
    <ScheduleEvent weekday="Tue" startTime="11:10" title="Mathe" :duration="45" />
    <ScheduleEvent weekday="Tue" startTime="11:55" title="Pause" :duration="5" :pause="true" />
    <ScheduleEvent weekday="Tue" startTime="12:00" title="Deutsch" :duration="45" />
    <ScheduleEvent weekday="Tue" startTime="12:45" title="Englisch" :duration="45" />

    <ScheduleEvent weekday="Wed" startTime="7:45" title="Info" :duration="90" />
    <ScheduleEvent weekday="Wed" startTime="9:15" title="WR" :duration="45" />
    <ScheduleEvent weekday="Wed" startTime="10:00" title="Pause" :duration="25" :pause="true" />
    <ScheduleEvent weekday="Wed" startTime="10:25" title="PuG" :duration="45" />
    <ScheduleEvent weekday="Wed" startTime="11:10" title="Geo" :duration="45" />
    <ScheduleEvent weekday="Wed" startTime="11:55" title="Pause" :duration="5" :pause="true" />
    <ScheduleEvent weekday="Wed" startTime="12:00" title="Physik" :duration="45" />
    <ScheduleEvent weekday="Wed" startTime="12:45" title="Ethik" :duration="45" />

    <ScheduleEvent weekday="Thu" startTime="7:45" title="Englisch" :duration="45" />
    <ScheduleEvent weekday="Thu" startTime="8:30" title="Kunst" :duration="90" />
    <ScheduleEvent weekday="Thu" startTime="10:00" title="Pause" :duration="25" :pause="true" />
    <ScheduleEvent weekday="Thu" startTime="10:25" title="Latein" :duration="45" />
    <ScheduleEvent weekday="Thu" startTime="11:10" title="Physik" :duration="45" />
    <ScheduleEvent weekday="Thu" startTime="11:55" title="Pause" :duration="5" :pause="true" />
    <ScheduleEvent weekday="Thu" startTime="12:00" title="P-Seminar" :duration="90" />

    <ScheduleEvent weekday="Fri" startTime="7:45" title="Mathe" :duration="45" />
    <ScheduleEvent weekday="Fri" startTime="8:30" title="Chemie" :duration="45" />
    <ScheduleEvent weekday="Fri" startTime="9:15" title="Englisch" :duration="45" />
    <ScheduleEvent weekday="Fri" startTime="10:00" title="Pause" :duration="25" :pause="true" />
    <ScheduleEvent weekday="Fri" startTime="10:25" title="Geschichte" :duration="45" />
    <ScheduleEvent weekday="Fri" startTime="11:10" title="PuG" :duration="45" />
    <ScheduleEvent weekday="Fri" startTime="11:55" title="Pause" :duration="5" :pause="true" />
    <ScheduleEvent weekday="Fri" startTime="12:00" title="Latein" :duration="45" />

    <!-- <div class="row-start-[11] col-start-5 row-end-[29] bg-blue-300 rounded text-xs">hello</div> -->
  </div>
</template>
