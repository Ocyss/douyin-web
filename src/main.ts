import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "@/styles/element/index.scss";
// import "@/styles/md-editor/index.scss";

const app = createApp(App);

app.use(router).mount("#app");
