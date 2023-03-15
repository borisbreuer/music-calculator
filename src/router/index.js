// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/euclidean/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Euclidean Calculator",
        component: () =>
          import(/* webpackChunkName: "euclidean" */ "@/views/Eucledian.vue"),
      },
    ],
  },
  {
    path: "/bpm/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "BPM Calculator",
        component: () =>
          import(/* webpackChunkName: "euclidean" */ "@/views/Bpm.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
