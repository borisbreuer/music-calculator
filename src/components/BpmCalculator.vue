<script setup>
import { ref, reactive, computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const vColors = theme.global.current.value.colors

const bpm = ref(60);

// BPM/Tempo	1/4	1/8	1/8T	1/16	1/32	1/64	1/128
// 60 BPM	1000 ms	500 ms	333 ms	250 ms	125 ms	63 ms	31 ms

const quaterNoteInMs = computed(() => {
  return (60000 / bpm.value)
})

function numberFormat(n) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})
}

function calculateMs(fraction) {
  return quaterNoteInMs.value * fraction;
}

const trippletFraction = ref(0.66666667);
const dottedFraction = ref(1.5);

const notes = reactive([
  { fraction: 4, value: '1/1' },
  { fraction: 2, value: '1/2' },
  { fraction: 1, value: '1/4' },
  { fraction: 0.5, value: '1/8' },
  { fraction: 0.25, value: '1/16' },
  { fraction: 0.125, value: '1/32' },
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
            type="text"
            size="5"
            maxlength="5"
            @input="calculateSequence"
            prepend-icon="mdi-chevron-left"
            @click:prepend="bpm--; calculateSequence()"
            append-icon="mdi-chevron-right"
            @click:append="bpm++; calculateSequence()"
          />
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center pb-0">
        <v-col cols="auto" class="pa-0 ma-0">
          <v-table >
            <thead>
              <tr>
                <th class="text-left">Note Value</th>
                <th class="text-left">Time (ms)</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(note, i) in notes" :key="i">
                <tr>
                  <td>{{ note.value }} d</td>
                  <td>{{ numberFormat(calculateMs(note.fraction * dottedFraction)) }} ms</td>
                </tr>
                <tr>
                  <td>{{ note.value }}</td>
                  <td>{{ numberFormat(calculateMs(note.fraction)) }} ms</td>
                </tr>
                <tr>
                  <td>{{ note.value }} t</td>
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
body {
  user-select: none;
}
.step {
  display: inline-block;
  width: 2rem;
  height: 2.5rem;
  border: 2px solid darkgray;
  border-radius: 2px;
  background-color: transparent;
  &.filled {
    background-color: rgb(var(--v-theme-amber));
    color: rgb(var(--v-theme-on-amber));
  }
  &.down-beat {
    border-color: rgb(var(--v-theme-deeporange));
  }
}
</style>
