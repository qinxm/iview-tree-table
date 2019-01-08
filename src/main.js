import Vue from "vue";
import App from "./App.vue";
import 'lodash';
import iView from "iview";
import "iview/dist/styles/iview.css";
import "./assets/css/index.scss";
import router from './router'

Vue.config.productionTip = false;
Vue.use(iView);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
