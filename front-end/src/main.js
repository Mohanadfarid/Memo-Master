import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// animate.css
import "animate.css";

// animate on scroll
import "aos/dist/aos.css";

//toaster
import Vue3Toastify from "vue3-toastify";

// vuetify
import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// mdi icons
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(Vue3Toastify, {
  autoClose: 3000,
  theme:'dark'
});

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
