<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
  <v-navigation-drawer
      v-model="drawer"
      location="left"
      temporary
    >
      <v-list>
        <v-list-item v-for="(item, i) in navItems" :to="item.path" :key="item.children[0].name + i">
          {{item.children[0].name}}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const drawer = ref(false)
const navItems = ref(router.options.routes)

</script>
