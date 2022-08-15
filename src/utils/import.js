import { defineAsyncComponent } from "vue";

export function registerGlobalComponent(app) {
  app.component(
    "song-layout",
    defineAsyncComponent(() => import("@/layouts/SongLayout.vue"))
  );

  app.component(
    "dashboard-layout",
    defineAsyncComponent(() => import("@/layouts/DashboardLayout.vue"))
  );

  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layouts/DefaultLayout.vue"))
  );
}
