<script setup lang="ts">
import { ref } from 'vue';

const major = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb/<wbr>F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']
const minor = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'Ebm/<wbr>D#m', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm']

const clicked = ref();
const left = ref()
const right = ref()
const index = ref()
const mm = ref([...major.map((item, i) => (
  {
    major: item,
    minor: minor[i]
  }
))])

function handler(event: MouseEvent) {
  const el: HTMLDivElement = event.target as HTMLDivElement;
  if(el.dataset.index) {
    index.value = parseInt(el.dataset.index)
    left.value = (index.value > 0) ? index.value - 1 : index.value - 1  + mm.value.length
    right.value = (index.value < mm.value.length - 1) ? index.value + 1 : index.value + 1  - mm.value.length
    clicked.value =  [mm.value[left.value], mm.value[index.value], mm.value[right.value]]
  }
}
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <svg xmlns="http://www.w3.org/2000/svg"
        width="400"
        height="400"
        viewBox="0 0 100 100"
      >
        <circle cx="15" cy="50" r="10" fill="white">Text</circle>
      </svg>
    </v-responsive>
  </v-container>
</template>

<style>
svg {
  border: 1px solid rgb(var(--v-theme-deeporange));
}
</style>