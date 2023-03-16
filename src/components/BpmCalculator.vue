<script setup>
import { ref, reactive, computed } from 'vue'

const bpm = ref(60);

const quaterNoteInMs = computed(() => {
  let bpmTemp = bpm.value;
  bpmTemp = parseFloat(bpmTemp.toString().replace(',', '.'));
  if(bpmTemp === 0 || bpmTemp === null || bpmTemp === undefined || isNaN(bpmTemp)) return 0
  return (60000 / bpmTemp)
})

function numberFormat(n) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})
}

function calculateMs(fraction) {
  if(isNaN(quaterNoteInMs.value)) return null
  return quaterNoteInMs.value * fraction;
}

const trippletFraction = ref(0.66666667);
const dottedFraction = ref(1.5);

const notes = reactive([
  { fraction: 4/1, value: '1/1' },
  { fraction: 4/2, value: '1/2' },
  { fraction: 4/4, value: '1/4' },
  { fraction: 4/8, value: '1/8' },
  { fraction: 4/16, value: '1/16' },
  { fraction: 4/32, value: '1/32' },
  { fraction: 4/64, value: '1/64' },
  { fraction: 4/128, value: '1/128' },
])

</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height pt-4">
      <v-row class="d-flex align-center justify-center pb-0">
        <v-col cols="auto" class="pa-0 ma-0">
          <v-text-field
            v-model="bpm"
            density="compact"
            color="deeporange"
            label="BPM"
            type="number"
            size="5"
            maxlength="5"
            prepend-icon="mdi-chevron-left"
            @click:prepend="bpm--; calculateSequence()"
            append-icon="mdi-chevron-right"
            @click:append="bpm++; calculateSequence()"
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
              <template v-for="(note, i) in notes" :key="i">
                <tr>
                  <td>{{ note.value }}</td>
                  <td>{{ numberFormat(calculateMs(note.fraction)) }} ms</td>
                  <td class="left-line">{{ note.value }} .</td>
                  <td>{{ numberFormat(calculateMs(note.fraction * dottedFraction)) }} ms</td>
                  <td class="left-line">{{ note.value }} T</td>
                  <td>{{ numberFormat(calculateMs(note.fraction * trippletFraction)) }} ms</td>
                </tr>
              </template>
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
