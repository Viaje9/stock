import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import createChart from "./plugins/lightweight-charts";
import axios from "./plugins/axios";
import "./assets/tailwind.css";

Vue.config.productionTip = false;
Vue.use(createChart);
Vue.use(axios);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
