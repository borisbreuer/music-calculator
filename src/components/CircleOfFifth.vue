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
  <v-container class="fill-height pb-0">
    <v-responsive class="d-flex text-center fill-height pb-10">
   
    
    <v-row  class="fill-height" >
      <v-col cols="12" class="pa-5 d-flex align-center justify-center  fill-height">
        <div class="circle">
          <div 
            v-for="(item, i) in major"
            :key="i + '_ma'"
            :data-index="i"
            class="major"
            :class="{ 'glow': (left === i || index === i || right === i) }"
            v-html="item"
            @click="handler"
          ></div>
        </div>
        <div class="circle no-border">
          <div
            v-for="(item, i) in minor"
            :key="i + '_mi'"
            :data-index="i"
            class="minor"
            :class="{ 'glow': (left === i || index === i || right === i) }"
            v-html="item"
            @click="handler"
          ></div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" >
        <span>{{ clicked }}</span>
      </v-col>
    </v-row>
    </v-responsive>
  </v-container>
</template>

<style lang="scss">

.circle {
  $size-outer: 70;
  --size-outer-w: #{$size-outer}vw;
  --size-outer-h: #{$size-outer}vh;
  aspect-ratio: 1;
  position: absolute;
  border: 1px solid rgb(var(--v-theme-deeporange));
  border-radius: 50%;
  margin: 3vw
}

@media screen and (orientation: portrait) {
  .circle {
    --responsive-size: var(--size-outer-w);
    width: var(--responsive-size);
    &.no-border {
      --responsive-size: calc(var(--size-outer-w) - 11vw);
      width: var(--responsive-size);
    }
    .major{
      --size: 11vw;
      --radius: calc(var(--responsive-size) / 2);
      --center: calc(var(--responsive-size) / 2);
    }
    .minor {
      --size: 10vw;
      --radius: calc(var(--responsive-size) * 0.4);
      --center: calc(var(--responsive-size) / 2);
    }
  }
}

@media screen and (orientation: landscape) {
  .circle {
    --responsive-size: var(--size-outer-h);
    width: var(--responsive-size);
    &.no-border {
      --responsive-size: calc(var(--size-outer-h) - 11vh);
      width: var(--responsive-size);
    }
    .major{
      --size: 11vh;
      --radius: calc(var(--responsive-size) / 2);
      --center: calc(var(--responsive-size) / 2);
    }
    .minor {
      --size: 10vh;
      --radius: calc(var(--responsive-size) * 0.4);
      --center: calc(var(--responsive-size) / 2);
    }
  }
}

.circle {
  --time: 50ms;

  &.no-border {
    border: 1px solid transparent;
  }

  .major {
    --offset: calc( var(--size) / 2 );
    top: var(--center);
    left: var(--center);
    width: var(--size);
    position: absolute;
    cursor: pointer;
    font-size: 1rem;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
    background-color: rgb(var(--v-theme-deeporange));
    color: rgb(var(--v-theme-on-deeporange));
    aspect-ratio: 1;
    // transition: width ease-in-out var(--time),  height ease-in-out var(--time);
    transform: 
      translate(
        calc(cos(var(--angle)) * var(--radius) - var(--offset)),
        calc(sin(var(--angle)) * var(--radius) - var(--offset))
      );
    &.glow {
      border: 2px solid white;
    }
  }
  
  @for $i from 1 through 12 {
    .major:nth-of-type(#{$i}) {
      --item: calc( 360deg / 12 );
      --start: calc(var(--item) * 4);
      --angle: #{$i} * var(--item) - var(--start);
    }
  }

  .minor {
    --offset: calc( var(--size) / 2 );
    font-size: 0.9rem;
    line-height: 100%;
    top: var(--center);
    left: var(--center);
    width: var(--size);
    position: absolute;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
    background-color: rgb(var(--v-theme-orange));
    color: rgb(var(--v-theme-on-orange));
    aspect-ratio: 1;
    // transition: width ease-in-out var(--time),  height ease-in-out var(--time);
    transform: 
      translate(
        calc(cos(var(--angle)) * var(--radius) - var(--offset)),
        calc(sin(var(--angle)) * var(--radius) - var(--offset))
      );
    &.glow {
      border: 2px solid white;
    }
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