<template>
  <v-app-bar :elevation="2" color="orange">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="() => drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    {{ $t("home.title") }} - {{ $t(currentRoute.meta.i18n as string) }}
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
        <v-list-item v-for="(item, i) in navItems" :to="item.path" :key="item.i18n + i">
          {{ $t(item.i18n) }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import routes from '@/router/routes'
import { useI18n }  from 'vue-i18n';
import { useRoute } from 'vue-router';

const i18n = useI18n();
const router = useRoute()

const currentRoute = ref(router)

const drawer = ref(false)

const navArray = routes.map((n) => ( 
  {
    path: n.path,
    i18n: n.children[0].meta.i18n
  }
));

const navItems = ref(navArray)

const languages = [...i18n.availableLocales.map( l => ({
  value: l,
  title: l.toUpperCase()
}))]

</script>
