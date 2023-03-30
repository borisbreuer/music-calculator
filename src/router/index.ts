// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "nav.home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/euclidean-rhythm-calculator",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "nav.euclidean_calculator",
        component: () =>
          import(/* webpackChunkName: "euclidean" */ "@/views/Eucledian.vue"),
      },
    ],
  },
  {
    path: "/bpm-calculator",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "nav.bpm_calculator",
        component: () =>
          import(/* webpackChunkName: "bpm" */ "@/views/Bpm.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
