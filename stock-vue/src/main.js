import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import createChart from "./plugins/lightweight-charts";
import "./assets/tailwind.css";

Vue.config.productionTip = false;
Vue.use(createChart);



new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
