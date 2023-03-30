export default [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "home",
        meta: {
          i18n: "nav.home"
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/circle-of-fifth",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "circle_of_fifth",
        meta: {
          i18n: "nav.circle_of_fifth"
        },
        component: () =>
          import(/* webpackChunkName: "euclidean" */ "@/views/Circle.vue"),
      },
    ],
  },
  {
    path: "/euclidean-rhythm-calculator",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "euclidean_calculator",
        meta: {
          i18n: "nav.euclidean_calculator"
        },
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
        name: "bpm_calculator",
        meta: {
          i18n: "nav.bpm_calculator"
        },
        component: () =>
          import(/* webpackChunkName: "bpm" */ "@/views/Bpm.vue"),
      },
    ],
  },
]
