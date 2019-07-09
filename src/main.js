import Vue from "vue";
import './plugins/vuetify'
import Notifications from 'vue-notification'
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(Notifications)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
