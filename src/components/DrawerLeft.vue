<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png" />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{getUsername}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="nav in navs" :key="nav.title" :to="nav.route">
        <v-list-tile-content>
          <v-list-tile-action>{{ nav.title }}</v-list-tile-action>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { cAuth } from "../utils/auth";
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    closeDrawer: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    username: "",
    navs: [
      {
        title: "Intent",
        route: "/intent"
      },
      {
        title: "Attribute",
        route: "/entity"
      }
    ]
  }),
  watch: {
    drawer: function(oldProp, newProp) {
      if (newProp) {
        this.closeDrawer(false);
      }
    }
  },
  updated() {
    const auth = cAuth();
    if (auth) {
      this.username = auth;
    }
  },
  computed: {
    getUsername() {
      return this.username;
    }
  }
};
</script>

<style>
</style>
