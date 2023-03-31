<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const vColors = theme.global.current.value.colors

const canvasEl = ref(null)
const ctx = ref()
const animationFrame = ref()

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrame.value);
})

function init() {
  ctx.value = canvasEl.value.getContext('2d');
  animationFrame.value = window.requestAnimationFrame(animate)
}

let t = ref(0);
let x = ref(20);
let y = ref(20);

function animate() {
  const WIDTH =  parseInt(canvasEl.value.width);
  const HEIGHT = parseInt(canvasEl.value.height);
  
  const HALF_W = WIDTH/2; 
  const HALF_H = HEIGHT/2;
  const PI = Math.PI; 
  const TWO_PI = PI * 2;
  const HALF_PI = PI/2;

  const r = 20
  const radius = HALF_W - r;

  const sin = (s) => Math.sin(s);
  const cos = (c) => Math.cos(c);

  ctx.value.clearRect(0, 0, WIDTH, HEIGHT);

  ctx.value.beginPath()

  x.value = radius * cos((t.value) - HALF_PI) + HALF_W
  y.value = radius * sin((t.value) - HALF_PI) + HALF_H

  ctx.value.arc(x.value, y.value, r, 0, TWO_PI);
  ctx.value.fillStyle = vColors.deeporange;
  ctx.value.fill();

  t.value += 0.02;
  animationFrame.value = window.requestAnimationFrame(animate)
}

</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <div>
            <v-btn @click="() => t = 0">reset</v-btn>
          </div>
          <canvas ref="canvasEl" width="400" height="400" class="ma-3"></canvas>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
