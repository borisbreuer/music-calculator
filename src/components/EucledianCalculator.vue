<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const vColors = theme.global.current.value.colors

const steps = ref(16);
const notes = ref(3);
const rotate = ref(0);
const sequence = ref([])

const canvasEl = ref();
const ctx = ref();

function inputHandler(value = null, dir) {
  if(value !== null) {
    if(dir === 'up') value++
    if(dir === 'down') value--
  }
  calculateSequence();
  canvasDraw()
}

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

function canvasDraw() {
  const WIDTH = parseInt(canvasEl.value.width);
  const HEIGHT = parseInt(canvasEl.value.height);
  const HALF_W = WIDTH/2;
  const HALF_H = HEIGHT/2;
  const PI = Math.PI;
  const TWO_PI = PI * 2;
  const HALF_PI = PI/2;

  const lineWidth = 2;
  const radiusSteps = 12;
  const radiusSequenceX = HALF_W - (radiusSteps + lineWidth);
  const radiusSequenceY = HALF_H - (radiusSteps + lineWidth);

  const steps = sequence.value.length
  const sin = (s) => Math.sin(s);
  const cos = (c) => Math.cos(c);
  let x, y;

  ctx.value.clearRect(0, 0, WIDTH, HEIGHT);
  
  ctx.value.fillStyle = vColors.deeporange;
  
  ctx.value.beginPath()
  ctx.value.moveTo(HALF_W, 35)
  ctx.value.lineTo(HALF_W + 7, 40)
  ctx.value.lineTo(HALF_W - 7, 40)
  ctx.value.closePath();
  ctx.value.fill();

  ctx.value.strokeStyle = vColors.deeporange;
  ctx.value.fillStyle = vColors.amber;
  ctx.value.lineWidth = 2;

  sequence.value.forEach((step, i)=>{
    ctx.value.beginPath()
    x = radiusSequenceX * cos((TWO_PI * i / steps) - HALF_PI) + HALF_W
    y = radiusSequenceY * sin((TWO_PI * i / steps) - HALF_PI) + HALF_H
    ctx.value.arc(x, y, radiusSteps, 0, TWO_PI);
    if(step) {
      ctx.value.fill();
      ctx.value.stroke();
    } else {
      ctx.value.strokeStyle = vColors.deeporange;
      ctx.value.stroke();
    }
    ctx.value.closePath();
  })
}

onMounted(() => {
  ctx.value = canvasEl.value.getContext('2d');
  calculateSequence();
  canvasDraw();
})
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex text-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-text-field
            v-model="steps"
            density="compact"
            color="deeporange"
            label="Steps"
            type="number"
            inputmode="numeric"
            max="99"
            size="2"
            maxlength="3"
            autofocus
            tabindex="0"
            hide-details
            class="mt-2"
            @input="inputHandler"
            prepend-icon="mdi-chevron-left"
            @click:prepend="() => { steps--; inputHandler() }"
            append-icon="mdi-chevron-right"
            @click:append="() => { steps++; inputHandler() }"
          />
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-text-field
            v-model="notes"
            density="compact"
            color="deeporange"
            label="Triggers"
            type="number"
            inputmode="numeric"
            max="99"
            size="2"
            maxlength="3"
            hide-details
            class="mt-2"
            @input="inputHandler"
            prepend-icon="mdi-chevron-left"
            @click:prepend="() => { notes--; inputHandler() }"
            append-icon="mdi-chevron-right"
            @click:append="() => { notes++; inputHandler() }"
          />
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">    
        <v-col cols="auto">
          <v-text-field
            v-model="rotate"
            density="compact"
            color="deeporange"
            label="Shift"
            type="number"
            inputmode="numeric"
            max="99"
            size="2"
            maxlength="3"
            hide-details
            class="mt-2"
            @input="inputHandler"
            prepend-icon="mdi-chevron-left"
            @click:prepend="() => { rotate--; inputHandler() }"
            append-icon="mdi-chevron-right"
            @click:append="() => { rotate++; inputHandler() }"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <canvas ref="canvasEl" width="240" height="240"></canvas>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="grid">
            <div 
              v-for="(step, i) in sequence"
              :key="i"
              :class="{
                'filled': step,
                'down-beat': i % 4 === 0,
              }"
              class="step"
              v-text="i + 1"
            ></div>
          </div>
        </v-col>
      </v-row>
      
    </v-responsive>
  </v-container>
</template>

<style lang="scss">
body {
  user-select: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.grid {
  display: inline-grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}

.step {
  font-size: .9rem;
  width: 1.5rem;
  height: 2rem;
  border: 2px solid rgb(var(--v-theme-deeporange));
  border-radius: 2px;
  background-color: transparent;
  &.filled {
    background-color: rgb(var(--v-theme-amber));
    color: rgb(var(--v-theme-on-amber));
  }
  &.down-beat {
    position: relative;
    border-color: rgb(var(--v-theme-deeporange));
    &::after{
      content: '';
      position: absolute;
      bottom: -8px;
      left: -2px;
      width: calc(100% + 4px);
      border-top: 2px solid rgb(var(--v-theme-orange));
    }
  }
}
</style>
