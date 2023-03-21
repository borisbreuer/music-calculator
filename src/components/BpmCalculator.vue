<script setup>
import { ref, reactive, computed } from 'vue'
import i18n from '@/i18n';
const locale = computed(() => i18n.global.locale.value)

const bpm = ref(60);

const quaterNoteInMs = computed(() => {
  let bpmTemp = bpm.value;
  bpmTemp = parseFloat(bpmTemp.toString().replace(',', '.'));
  if(bpmTemp === 0 || bpmTemp === null || bpmTemp === undefined || isNaN(bpmTemp)) return 0
  return (60000 / bpmTemp)
})

function numberFormat(n) {
  return n.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2})
}

function calculateMs(fraction) {
  return quaterNoteInMs.value * fraction;
}

const trippletFraction = ref(0.6666666666666667);
const dottedFraction = ref(1.5);

const numerator = 4;
const denominators = [1, 2, 4, 8, 16, 32, 64, 128];

const notesObjArr = denominators.map((d) => {
  return ({ fraction: (numerator / d), value: `1/${d}`})
})

const notes = reactive(notesObjArr)
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height pt-4">
      <v-row class="d-flex align-center justify-center pb-0">
        <v-col cols="auto" class="pa-0 ma-0">
          <v-text-field
            v-model="bpm"
            data-testid="bpm"
            density="compact"
            color="deeporange"
            label="BPM"
            type="number"
            size="5"
            maxlength="5"
            class="mt-2"
            prepend-icon="mdi-chevron-left"
            @focus="() => bpm = ''"
            @click:prepend="() => bpm--"
            append-icon="mdi-chevron-right"
            @click:append="() => bpm++"
          />
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center pb-0">
        <v-col cols="10" class="pa-0 ma-0">
          <v-table>
            <thead>
              <tr>
                <th width="16,5%" class="text-left">Devision</th>
                <th width="16,5%" class="text-left">Time (ms)</th>
                <th width="16,5%" class="text-left">Devision dotted</th>
                <th width="16,5%" class="text-left">Time (ms)</th>
                <th width="16,5%" class="text-left">Devision tripplet</th>
                <th width="16,5%" class="text-left">Time (ms)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(note, i) in notes" :key="i">
                <td>{{ note.value }}</td>
                <td :data-testid="`msn-${i}`">{{ numberFormat(calculateMs(note.fraction)) }} ms</td>
                <td class="left-line">{{ note.value }} .</td>
                <td :data-testid="`msd-${i}`">{{ numberFormat(calculateMs(note.fraction * dottedFraction)) }} ms</td>
                <td class="left-line">{{ note.value }} T</td>
                <td :data-testid="`mst-${i}`">{{ numberFormat(calculateMs(note.fraction * trippletFraction)) }} ms</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<style lang="scss">
.left-line {
  border-left: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
</style>
