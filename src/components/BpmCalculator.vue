<script setup lang="ts">
import { ref, reactive, computed, Ref } from 'vue'

let abSwitch = 0
let popArray: number | null = null
let timeArr: Ref<number[]> = ref([])
const timeA: Ref<number | null> = ref(null)
const timeB: Ref<number | null> = ref(null)
const calculating = ref(false)
const bpm: Ref<string> = ref('120');

function tabTempoHandler() {
  if(abSwitch === 0){
    timeA.value = Date.now();
    abSwitch = 1;
  } else if(abSwitch === 1) {
    timeB.value = Date.now();
    abSwitch = 0;
  }
  if(abSwitch === 0 && timeA.value !== null && timeB.value !== null ) {
    timeArr.value.push((timeB.value - timeA.value))
    if(timeArr.value.length > 4) timeArr.value.shift()
    bpm.value = (60000 / (timeArr.value.reduce((a, c) => (c + a), 0) / timeArr.value.length)).toFixed(2)
    calculating.value = true
  }
  if(timeArr.value.length){
    if(popArray === null){
      const time = timeArr.value[timeArr.value.length - 1] * 4 > 2000 ? 2000 : timeArr.value[timeArr.value.length - 1] * 4
      popArray = window.setInterval(() => {
        timeArr.value.shift()
        if(!timeArr.value.length && popArray != null) {
          clearInterval(popArray)
          abSwitch = 0
          timeArr.value = []
          timeA.value = null;
          timeB.value = null;
          calculating.value = false;
          popArray = null
        }
      }, time)
    }
  } 
}

const quaterNoteInMs = computed((): number => {
  let bpmTemp = parseFloat(bpm.value);
  if(bpmTemp === 0 || bpmTemp === null || bpmTemp === undefined || isNaN(bpmTemp)) return 0
  return (60000 / bpmTemp)
})

function calculateMs(fraction: number): number {
  return (quaterNoteInMs.value * fraction);
}

const trippletFraction = ref(0.6666666666666667);
const dottedFraction = ref(1.5);

const numerator = 4;
const denominators = [1, 2, 4, 8, 16, 32, 64, 128];

const notesObjArr = denominators.map((d) => {
  return (
    { 
      fraction: (numerator / d), 
      value: `1/${d}`
    }
  )
})

const notes = reactive(notesObjArr)
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height pt-4">
      <v-row class="d-flex align-center justify-center pb-0">
        <v-col cols="auto" class="pa-0 ma-0">
          <v-btn
            @click="tabTempoHandler"
            @keydown.ctrl.space="tabTempoHandler"
            :color="calculating ? 'amber' : 'deeporange'"
            class="mb-2"
            data-testid="tabtempo"
          >
            Tab Tempo [Space]
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center pb-0">
        <v-col cols="auto" class="pa-0 ma-0">
          <v-text-field
            v-model="bpm"
            data-testid="bpm"
            density="compact"
            color="deeporange"
            label="BPM"
            type="number"
            inputmode="decimal"
            max="260"
            size="2"
            maxlength="5"
            autofocus
            class="mt-2"
            prepend-icon="mdi-chevron-left"
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
                <td :data-testid="`msn-${i}`">{{ $n(calculateMs(note.fraction), 'decimal') }} ms</td>
                <td class="left-line">{{ note.value }} .</td>
                <td :data-testid="`msd-${i}`">{{ $n(calculateMs(note.fraction * dottedFraction), 'decimal') }} ms</td>
                <td class="left-line">{{ note.value }} T</td>
                <td :data-testid="`mst-${i}`">{{ $n(calculateMs(note.fraction * trippletFraction), 'decimal') }} ms</td>
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
    -moz-appearance: textfield; /* Firefox */
    appearance: textfield;
}
</style>
