import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    meta: {
      layout: "dashboard",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(
        /*webpackChunkName : "pageNotFound" */ "../views/PageNotFound.vue"
      ),
  },
  {
    path: "/album/:name",
    name: "Album",
    component: () =>
      import(/*webpackChunkName : "album" */ "../views/Album.vue"),
    meta: {
      layout: "song",
    },
  },
  {
    path: "/playsong/:name",
    name: "PlaySong",
    component: () =>
      import(/*webpackChunkName : "playsong" */ "../views/MusicPlayer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
