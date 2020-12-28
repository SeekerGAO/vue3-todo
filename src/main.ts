import { createApp } from "vue";
import router from "./router/index";
import store from "./store/index";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { devtools } from "./devtools";
import App from "./App.vue";
import "./index.css";

const app = createApp(App);

app.use(devtools);
app.use(router);
app.use(store);
app.use(ElementPlus);

app.directive("focus", {
  mounted(el, binding, vnode) {
    el.focus();
  },
  beforeUpdate(el, binding, vnode) {
    if (binding.value) {
      el.focus();
    }
  },
});

app.mount("#app");
