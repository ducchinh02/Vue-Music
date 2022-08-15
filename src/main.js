import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/css/base.css";
import "@/assets/sass/style.scss";
import { registerGlobalComponent } from "@/utils/import";

const app = createApp(App);
app.use(router);
registerGlobalComponent(app);
app.mount("#app");
