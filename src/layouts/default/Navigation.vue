<template>
  <v-app-bar :elevation="2" color="orange">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="() => drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <template v-slot:append>
      <v-select 
        v-model="$i18n.locale"
        :items="languages"
        item-value="value"
        item-title="title"
        density="compact"
        variant="outlined"
        class="mt-4"
      ></v-select>
    </template>
  </v-app-bar>
  <v-navigation-drawer
      v-model="drawer"
      location="left"
      temporary
    >
      <v-list>
        <v-list-item v-for="(item, i) in navItems" :to="item.path" :key="item.children[0].name + i">
          {{$t(item.children[0].name)}}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useI18n }  from 'vue-i18n';

const i18n = useI18n();
const router = useRouter();

const drawer = ref(false)
const navItems = ref(router.options.routes)

const languages = [...i18n.availableLocales.map( l => ({
  value: l,
  title: l.toUpperCase()
}))]

</script>
