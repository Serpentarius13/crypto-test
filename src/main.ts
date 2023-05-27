import { createApp } from "vue";

import "@/app/styles/main.scss";

import App from "./app/App.vue";

import Toast, { POSITION, PluginOptions } from "vue-toastification";

import { createPinia } from "pinia";
import { PiniaLogger } from "pinia-logger";

import VueClickAway from "vue3-click-away";

const app = createApp(App);

const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 2000,
};

app.use(VueClickAway);

app.use(Toast, options);

const pinia = createPinia();

pinia.use(
  PiniaLogger({
    expanded: true,
    disabled: import.meta.env.PROD,
  })
);

app.use(pinia);

app.mount("#app");
