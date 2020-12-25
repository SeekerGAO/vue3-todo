import { App, Plugin } from "vue";

declare global {
  interface Window {
    __VUE_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}

// https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg/related
const devtools: Plugin = {
  install(app: App) {
    if (
      process.env.NODE_ENV === "development" &&
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__
    ) {
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
    }
  },
};

export { devtools };
