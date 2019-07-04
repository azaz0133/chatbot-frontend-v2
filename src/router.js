import Vue from "vue";
import Router from "vue-router";
import Intent from "./views/Intent/screen.vue";
import Entity from './views/Entity/screen.vue'
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Intent
    },
    {
      path:"/intent",
      name:"intent",
      component: Intent
    },
    {
      path:"/entity",
      name:"entity",
      component:Entity
    }
  ]
});
