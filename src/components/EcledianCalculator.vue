<script setup>
import { ref, reactive, onMounted  } from 'vue'

const steps = ref(16);
const notes = ref(3);
const rotate = ref(0);
const sequence = ref([])

let ctx;

function calculateSequence() {
  sequence.value = euclideanRythmCalculator()
  canvasDraw()
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
  const canv = document.querySelector('#canvas');
  const ctxS = canv.getContext('2d');
  ctx = reactive(ctxS);
  calculateSequence()
})

function canvasDraw() {
  ctx.clearRect(0, 0, 400, 400);
  const steps = sequence.value.length
  const PI = Math.PI;
  const TWO_PI = PI * 2;
  const sin = (s) => Math.sin(s);
  const cos = (c) => Math.cos(c);
  let x, y;
  sequence.value.forEach((step, i)=>{
    ctx.beginPath()
    x = 100 * cos((TWO_PI * i / steps) - TWO_PI/4) + 150
    y = 100 * sin((TWO_PI * i / steps) - TWO_PI/4) + 150
    ctx.arc(x, y, 8, 0, TWO_PI);

    if(step) {
      ctx.fillStyle = "orange";
      ctx.fill();
      ctx.strokeStyle = "orange";
      ctx.stroke();
    } else {
      ctx.strokeStyle = "rgb(200, 200, 200)";
      ctx.stroke();
    }
  })
}
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex text-center fill-height pt-4">
      <v-row class="d-flex align-center justify-center pb-0">
        <v-col cols="auto" class="pa-0 ma-0">
          <v-text-field
            v-model="steps"
            density="compact"
            label="Steps"
            type="text"
            size="5"
            maxlength="5"
            @input="calculateSequence"
            prepend-icon="mdi-chevron-left"
            @click:prepend="steps--; calculateSequence()"
            append-icon="mdi-chevron-right"
            @click:append="steps++; calculateSequence()"
          />
        </v-col>

        <v-col cols="auto" class="pa-0 ma-0">
          <v-text-field
            v-model="notes"
            density="compact"
            label="Notes"
            type="text"
            size="5"
            maxlength="5"
            @input="calculateSequence"
            prepend-icon="mdi-chevron-left"
            @click:prepend="notes--; calculateSequence()"
            append-icon="mdi-chevron-right"
            @click:append="notes++; calculateSequence()"
          />
        </v-col>

        <v-col cols="auto" class="pa-0 ma-0">
          <v-text-field
            v-model="rotate"
            density="compact"
            label="Rotate"
            type="text"
            size="5"
            maxlength="5"
            @input="calculateSequence"
            prepend-icon="mdi-chevron-left"
            @click:prepend="rotate--; calculateSequence()"
            append-icon="mdi-chevron-right"
            @click:append="rotate++; calculateSequence()"
          />
        </v-col>
      </v-row>

      <v-row class="ma-0 pa-0">
        <v-col class="ma-0 pa-0">
          <canvas id="canvas" width="300" height="300"></canvas>
        </v-col>
      </v-row>

      <v-row class="ma-0 pa-0">
        <v-col class="ma-0 pa-0">
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
