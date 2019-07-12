import Vue from "vue";
import Router from "vue-router";
import Intent from "./views/Intent/screen.vue";
import Entity from "./views/Entity/screen.vue";
import Welcome from "./views/welcome/screen.vue";
import Train from "./views/TrainingPhrase/screen.vue";

Vue.use(Router);

function auth(to, from, next) {
  const token = window.sessionStorage.getItem("auth");
  if (token) {
    next();
  }
  next(false);
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome,
      // redirect: function(to) {
      //   const token = window.sessionStorage.getItem("auth");
      //   if (token) {
      //     return "/intent";
      //   }
      // }
    },
    {
      path: "/intent",
      name: "intent",
      component: Intent,
      beforeEnter: auth
    },
    {
      path: "/entity",
      name: "entity",
      component: Entity,
      beforeEnter: auth
    },
    {
      path: "/train",
      name: "train",
      component: Train,
      beforeEnter: auth
    }
  ]
});
