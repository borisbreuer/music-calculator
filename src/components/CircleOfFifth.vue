<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto" class="pa-11 d-flex align-center justify-center">
          <div class="circle">
            <div v-for="(item, i) in major" :key="i + '_ma'" class="major">{{ item }}</div>
          </div>
          <div class="circle no-border">
            <div v-for="(item, i) in minor" :key="i + '_mi'" class="minor">{{ item }}</div>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const major = ref([
  'C', 'G', 'D', 'A', 'E', 'B', 'Gb/F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'  
])
const minor = ref([
  'a', 'e', 'b', 'f#', 'c#', 'g#', 'eb/d#', 'bb', 'f', 'c', 'g', 'd'  
])
</script>

<style lang="scss">

.circle {
  --size-outer: 70vw;
  position: absolute;
  border: 1px solid rgb(var(--v-theme-deeporange));
  border-radius: 50%;
  height: var(--size-outer);
  aspect-ratio: 1;

  &.no-border {
    border: 1px solid transparent;
  }
  
  .major {
    --size: 60px;
    --radius: calc(var(--size-outer) / 2);
    --center: calc(var(--size-outer) / 2);
    --offset: calc( var(--size) / 2 );
    top: var(--center);
    left: var(--center);
    width: var(--size);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgb(var(--v-theme-deeporange));
    color: rgb(var(--v-theme-on-deeporange));
    aspect-ratio: 1;
    transform: 
      translate(
        calc(cos(var(--angle)) * var(--radius) - var(--offset)),
        calc(sin(var(--angle)) * var(--radius) - var(--offset))
      )
  }
  
  @for $i from 1 through 12 {

    .major:nth-of-type(#{$i}) {
      --item: calc( 360deg / 12 );
      --start: calc(var(--item) * 4);
      --angle: #{$i} * var(--item) - var(--start);
    }

  }

  .minor {
    --size: 50px;
    --radius: calc(var(--size-outer) * 0.4);
    --center: calc(var(--size-outer) / 2);
    --offset: calc( var(--size) / 2 );
    top: var(--center);
    left: var(--center);
    width: var(--size);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgb(var(--v-theme-orange));
    color: rgb(var(--v-theme-on-orange));
    aspect-ratio: 1;
    transform: 
      translate(
        calc(cos(var(--angle)) * var(--radius) - var(--offset)),
        calc(sin(var(--angle)) * var(--radius) - var(--offset))
      )
  }
  
  @for $i from 1 through 12 {

    .minor:nth-of-type(#{$i}) {
      --item: calc( 360deg / 12 );
      --start: calc(var(--item) * 4);
      --angle: #{$i} * var(--item) - var(--start);
    }

  }
  
}

</style>