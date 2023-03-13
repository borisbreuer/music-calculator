<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex text-center fill-height pt-2">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-text-field
            v-model="steps"
            label="Steps"
            type="text"
            size="10"
            maxlength="10"
            @input="calculateSequence"
            prepend-icon="mdi-chevron-left"
            @click:prepend="steps--; calculateSequence()"
            append-icon="mdi-chevron-right"
            @click:append="steps++; calculateSequence()"
          />
        </v-col>

        <v-col cols="auto">
          <v-text-field
            v-model="notes"
            label="Notes"
            type="text"
            size="10"
            maxlength="10"
            @input="calculateSequence"
            prepend-icon="mdi-chevron-left"
            @click:prepend="notes--; calculateSequence()"
            append-icon="mdi-chevron-right"
            @click:append="notes++; calculateSequence()"
          />
        </v-col>

        <v-col cols="auto">
          <v-text-field
            v-model="rotate"
            label="Rotate"
            type="text"
            size="10"
            maxlength="10"
            @input="calculateSequence"
            prepend-icon="mdi-chevron-left"
            @click:prepend="rotate--; calculateSequence()"
            append-icon="mdi-chevron-right"
            @click:append="rotate++; calculateSequence()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div 
            v-for="(step, i) in sequence"
            :key="i"
            :class="{
              'filled': step,
              'text-black': step,
              'down-beat': i % 4 === 0
            }"
            class="step"
            v-text="i + 1"
          ></div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onMounted  } from 'vue'

const steps = ref(16);
const notes = ref(3);
const rotate = ref(0);
const sequence = ref([])

function calculateSequence() {
  sequence.value = euclideanRythmCalculator()
}

function euclideanRythmCalculator() {
    Array.prototype.rotate = function( n ) {
      this.unshift.apply( this, this.splice( -n, this.length ) );
      return this;
    }

    let sequence = [];
    if(steps.value === notes.value){
      for(let i = 0; i < steps.value; i++) {
        sequence.push(true);
      }
      return sequence
    }

    const stepsArr = []
    for(let i = 0; i < steps.value; i++) {
      stepsArr.push(i);
    }
    const length = [...stepsArr] 

    const mults = length.map(x => x * notes.value)
    const remainder = mults.map(r => Math.abs(r % steps.value))
    remainder.unshift(remainder[remainder.length - 1])

    for(let i = 0; i < remainder.length - 1; i++) {
      sequence.push(remainder[i] > remainder[i + 1])
    }

    return sequence.rotate(rotate.value);
}

onMounted(() => {
  calculateSequence()
})
</script>
<style>
.step {
  display: inline-block;
  margin: .25rem;
  width: 2rem;
  height: 2.5rem;
  border: 4px solid darkgray;
  border-radius: 4px;
  background-color: transparent;
}

.step.filled {
  background-color: orange;
}

.step.down-beat {
  border-color: var('--v-theme-secondary');
}

</style>
