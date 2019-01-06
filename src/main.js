import Vue from "vue";
import App from "./App.vue";
import 'lodash';
import iView from "iview";
import "iview/dist/styles/iview.css";
import "./assets/css/index.scss";

Vue.config.productionTip = false;
Vue.use(iView);
new Vue({
  render: h => h(App)
}).$mount("#app");
