// vite.config.js
const { resolve } = require("path");

export default {
  cors: true,
  emitManifest: true,
  alias: {
    vue: "vue/dist/vue.esm-bundler.js",
    "/@/": resolve(__dirname, "./src"),
  },
};
