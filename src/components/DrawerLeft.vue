<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg" />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>John Leider</v-list-tile-title>
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
    navs: [
      {
        title: "Intent",
        route: "/intent"
      },
      {
        title: "Entity",
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
  }
};
</script>

<style>
</style>
