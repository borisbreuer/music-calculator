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

function canvasDraw() {
  ctx.value.clearRect(0, 0, 500, 500);
  const steps = sequence.value.length
  const PI = Math.PI;
  const TWO_PI = PI * 2;
  const sin = (s) => Math.sin(s);
  const cos = (c) => Math.cos(c);
  let x, y;
  sequence.value.forEach((step, i)=>{
    ctx.value.beginPath()
    x = 126 * cos((TWO_PI * i / steps) - TWO_PI/4) + 150
    y = 126 * sin((TWO_PI * i / steps) - TWO_PI/4) + 150
    ctx.value.arc(x, y, 12, 0, TWO_PI);

    if(step) {
      ctx.value.fillStyle = vColors.amber;
      ctx.value.fill();
      ctx.value.lineWidth = 2;
      ctx.value.strokeStyle = vColors.deeporange;
      ctx.value.stroke();
    } else {
      ctx.value.strokeStyle = vColors.deeporange;
      ctx.value.stroke();
    }
  })
}

onMounted(() => {
  ctx.value = canvasEl.value.getContext('2d');
  calculateSequence()
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
            type="text"
            size="2"
            maxlength="3"
            autofocus
            tabindex="0"
            hide-details
            class="mt-2"
            @input="calculateSequence"
            @focus="($event) => $event.target.select()"
            prepend-icon="mdi-chevron-left"
            @click:prepend="() => { steps--; calculateSequence() }"
            @keydown.down="() => { steps--; calculateSequence() }"
            append-icon="mdi-chevron-right"
            @click:append="() => { steps++; calculateSequence() }"
            @keydown.up="() => { steps++; calculateSequence() }"
          />
        </v-col>

        <v-col cols="auto">
          <v-text-field
            v-model="notes"
            density="compact"
            color="deeporange"
            label="Triggers"
            type="text"
            size="2"
            maxlength="3"
            hide-details
            class="mt-2"
            @input="calculateSequence"
            @focus="($event) => $event.target.select()"
            prepend-icon="mdi-chevron-left"
            @click:prepend="() => { notes--; calculateSequence() }"
            @keydown.down="() => { notes--; calculateSequence() }"
            append-icon="mdi-chevron-right"
            @click:append="() => { notes++; calculateSequence() }"
            @keydown.up="() => { notes++; calculateSequence() }"
          />
        </v-col>

        <v-col cols="auto">
          <v-text-field
            v-model="rotate"
            density="compact"
            color="deeporange"
            label="Shift"
            type="text"
            size="2"
            maxlength="3"
            hide-details
            class="mt-2"
            @input="calculateSequence"
            @focus="($event) => $event.target.select()"
            prepend-icon="mdi-chevron-left"
            @click:prepend="() => { rotate--; calculateSequence() }"
            @keydown.down="() => { rotate--; calculateSequence() }"
            append-icon="mdi-chevron-right"
            @click:append="() => { rotate++; calculateSequence() }"
            @keydown.up="() => { rotate++; calculateSequence() }"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <canvas ref="canvasEl" width="300" height="300"></canvas>
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

.grid {
  display: inline-grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}

.step {
  width: 2rem;
  height: 2.5rem;
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
