import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/css/base.css";
import "@/assets/sass/style.scss";
import { registerGlobalComponent } from "@/utils/import";

const app = createApp(App);
app.use(router);
app.use(store);
registerGlobalComponent(app);
app.mount("#app");
