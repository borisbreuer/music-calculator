<script setup lang="ts">
import { start } from 'repl';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const vColors = theme.global.current.value.colors

const canvasEl = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const animationFrame = ref<number | null>(null)
const isRunning = ref<boolean>(false)

function startStopHandler() {
  isRunning.value ? stop() : start();
}

function start() {
  if(canvasEl.value && !isRunning.value){
    ctx.value = canvasEl.value.getContext('2d');
    animationFrame.value = window.requestAnimationFrame(animate);
    isRunning.value = true;
  }
}

function stop() {
  if(!animationFrame.value || !isRunning.value) return
  window.cancelAnimationFrame(animationFrame.value);
  isRunning.value = false;
}

let t = ref(0);
let x = ref(20);
let y = ref(20);

function animate() {
  if(!ctx.value) return

  const WIDTH = ctx.value.canvas.width;
  const HEIGHT = ctx.value.canvas.height;
  
  const HALF_W = WIDTH/2; 
  const HALF_H = HEIGHT/2;
  const PI = Math.PI;
  const TAU = PI * 2;
  const HALF_PI = PI/2;

  const r = 20
  const radius = HALF_W - r;

  const sin = (s: number) => Math.sin(s);
  const cos = (c: number) => Math.cos(c);

  ctx.value.clearRect(0, 0, WIDTH, HEIGHT);

  ctx.value.beginPath()

  x.value = radius * cos((t.value) - HALF_PI) + HALF_W
  y.value = radius * sin((t.value) - HALF_PI) + HALF_H

  ctx.value.arc(x.value, y.value, r, 0, TAU);
  ctx.value.fillStyle = vColors.deeporange;
  ctx.value.fill();

  t.value += 0.015;
  animationFrame.value = window.requestAnimationFrame(animate)
}

onMounted(() => {
  start()
})

onBeforeUnmount(() => {
  stop()
})

</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <div>
            <v-btn :disabled="!isRunning" @click="() => t = 0">reset</v-btn>
            <v-btn @click="startStopHandler">{{ !isRunning ? 'start' : 'stop' }}</v-btn>
          </div>
          <canvas ref="canvasEl" width="400" height="400" class="ma-3"></canvas>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
