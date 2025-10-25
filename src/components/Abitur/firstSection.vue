<script setup></script>

<template>
  <div class="mt-3">
    <h2 class="font-semibold">I. Einzelergebnisse in der Qualifikationsphase</h2>
  </div>
  <div class="mt-1">
    <table class="mt-2 w-full text-start">
      <thead>
        <tr class="border-b-2 border-gray-300">
          <th class="text-center uppercase text-gray-500 font-normal">Fach</th>
          <th class="text-center uppercase text-gray-500 font-normal">Eingebrachte HJL</th>
          <th class="text-center uppercase text-gray-500 font-normal">
            Halbjahresleistungen <br />
            <div class="grid grid-rows-1 grid-cols-4 gap-3">
              <div class="col-span-1 text-center">12/1</div>
              <div class="col-span-1 text-center">12/2</div>
              <div class="col-span-1 text-center">13/1</div>
              <div class="col-span-1 text-center">13/2</div>
            </div>
          </th>
          <th class="text-center uppercase text-gray-500 font-normal">Note</th>
        </tr>
      </thead>
      <!-- Sprachlich-künstlerisch-literarisches Aufgabenfeld -->
      <tbody>
        <tr class="text-center">
          <td class="pt-1">Deutsch</td>
          <td class="pt-1">4</td>
          <td class="pt-1">
            <div class="grid grid-rows-1 grid-cols-4">
              <div class="col-span-1 border-r-2 text-center">15</div>
              <div class="col-span-1 border-r-2 text-center">15</div>
              <div class="col-span-1 border-r-2 text-center">14</div>
              <div class="col-span-1 text-center">15</div>
            </div>
          </td>
          <td class="pt-1">sehr gut</td>
        </tr>
        <tr class="text-center">
          <td class="pt-1">Latein</td>
          <td class="pt-1">4</td>
          <td class="pt-1">
            <div class="grid grid-rows-1 grid-cols-4">
              <div class="col-span-1 border-r-2 text-center">14</div>
              <div class="col-span-1 border-r-2 text-center">13</div>
              <div class="col-span-1 border-r-2 text-center">15</div>
              <div class="col-span-1 text-center">14</div>
            </div>
          </td>
          <td class="pt-1">sehr gut</td>
        </tr>
        <tr class="text-center">
          <td class="pt-1">Italienisch</td>
          <td class="pt-1">4</td>
          <td class="pt-1">
            <div class="grid grid-rows-1 grid-cols-4">
              <div class="col-span-1 border-r-2 text-center">13</div>
              <div class="col-span-1 border-r-2 text-center">15</div>
              <div class="col-span-1 border-r-2 text-center">14</div>
              <div class="col-span-1 text-center">13</div>
            </div>
          </td>
          <td class="pt-1">sehr gut</td>
        </tr>
        <tr class="text-center border-b-2">
          <td class="pt-1">Kunst</td>
          <td class="pt-1">3</td>
          <td class="pt-1">
            <div class="grid grid-rows-1 grid-cols-4">
              <div class="col-span-1 border-r-2 text-center">13</div>
              <div class="col-span-1 border-r-2 text-center">13</div>
              <div class="col-span-1 border-r-2 text-center">(10)</div>
              <div class="col-span-1 text-center">14</div>
            </div>
          </td>
          <td class="pt-1">sehr gut</td>
        </tr>
        <!-- Gesellschaftswissenschaftliches Aufgabenfeld -->
        <tr class="text-center">
          <td class="pt-1">Geographie</td>
          <td class="pt-1">3</td>
          <td class="pt-1">
            <div class="grid grid-rows-1 grid-cols-4">
              <div class="col-span-1 border-r-2 text-center">(11)</div>
              <div class="col-span-1 border-r-2 text-center">12</div>
              <div class="col-span-1 border-r-2 text-center">12</div>
              <div class="col-span-1 text-center">14</div>
            </div>
          </td>
          <td class="pt-1">gut</td>
        </tr>
        <tr class="text-center">
          <td class="pt-1">Ethik</td>
          <td class="pt-1">4</td>
          <td class="pt-1">
            <div class="grid grid-rows-1 grid-cols-4">
              <div class="col-span-1 border-r-2 text-center">13</div>
              <div class="col-span-1 border-r-2 text-center">14</div>
              <div class="col-span-1 border-r-2 text-center">14</div>
              <div class="col-span-1 text-center">13</div>
            </div>
          </td>
          <td class="pt-1">sehr gut</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-3">
    <h2 class="font-semibold">II. Abitur</h2>
  </div>
  <div class="mt-1">
    <table class="mt-2 w-full text-start">
      <thead>
        <tr class="border-b-2 border-gray-300">
          <th class="text-center uppercase text-gray-500 font-normal">Fach</th>
          <th class="text-center uppercase text-gray-500 font-normal">
            Prüfungsleistung <br />
            <div class="grid grid-rows-1 grid-cols-2 gap-3">
              <div class="col-span-1 text-center">schriftlich</div>
              <div class="col-span-1 text-center">mündlich</div>
            </div>
          </th>
          <th class="text-center uppercase text-gray-500 font-normal">Note</th>
        </tr>
      </thead>
      <!-- Sprachlich-künstlerisch-literarisches Aufgabenfeld -->
      <tbody>
        <tr class="text-center">
          <td class="pt-1">Deutsch</td>
          <td class="pt-1">
            <div class="grid grid-rows-1 grid-cols-2 gap-3">
              <div class="col-span-1 text-center">--</div>
              <div class="col-span-1 text-center">58</div>
            </div>
          </td>
          <td class="pt-1">15</td>
        </tr>
        <tr class="text-center">
          <td class="pt-1">Mathe</td>
          <td class="pt-1">
            <div class="grid grid-rows-1 grid-cols-2 gap-3">
              <div class="col-span-1 text-center">55</div>
              <div class="col-span-1 text-center">--</div>
            </div>
          </td>
          <td class="pt-1">14</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-3">
    <h2 class="font-semibold">III. Berechnung der Gesamtqualifikation und der Durchschnittsnote</h2>
  </div>
  <div class="mt-1">
    <div class="grid grid-rows-4">
      <div class="row-span-1 grid grid-cols-4">
        <div class="col-span-2 flex items-center">
          Punktesumme aus 40 einzubringenden Halbjahresleistungen:
        </div>
        <div class="col-span-1 flex justify-center items-center">558</div>
        <div class="col-span-1 flex justify-center items-center">
          mindestens 200, höchstens 600 Punkte
        </div>
      </div>
      <div class="row-span-1 grid grid-cols-4">
        <div class="col-span-2 flex items-center">
          Punktesumme aus den Abiturprüfungen mit vierfacher Wertung:
        </div>
        <div class="col-span-1 flex justify-center items-center">280</div>
        <div class="col-span-1 flex justify-center items-center">
          mindestens 100, höchstens 300 Punkte
        </div>
      </div>
      <div class="row-span-1 grid grid-cols-4">
        <div class="col-span-2 flex items-center">Gesamtpunktzahl:</div>
        <div class="col-span-1 flex justify-center items-center">838</div>
        <div class="col-span-1 flex justify-center items-center">
          mindestens 300, höchstens 900 Punkte
        </div>
      </div>
      <div class="row-span-1 grid grid-cols-4">
        <div class="col-span-2 flex items-center">Durchschnittsnote:</div>
        <div class="col-span-1 flex justify-center items-center">1,0</div>
      </div>
    </div>
  </div>
</template>
