import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "undraw-ui/dist/style.css";
import "@/styles/element/index.scss";

import UndrawUi from "undraw-ui";

const app = createApp(App);

app.use(router);
app.use(UndrawUi);
app.mount("#app");
