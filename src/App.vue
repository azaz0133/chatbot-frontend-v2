<template>
  <v-app>
    <drawer-left :drawer="isOpenDrawerLeft" :closeDrawer="closeLeftDrawer" />
    <v-toolbar app color="cyan darken-1">
      <v-toolbar-side-icon @click="isOpenDrawerLeft = !isOpenDrawerLeft"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Dialogflow</span>
        <span class="font-weight-light">CHAT BOT</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >-->
      <!-- <span class="mr-2">Latest Release</span>
      </v-btn>-->
    </v-toolbar>
      <drawer-right></drawer-right>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import DrawerLeft from "./components/DrawerLeft";
import DrawerRight from "./components/DrawerRight";

export default {
  name: "App",
  components: {
    DrawerLeft,DrawerRight
  },
  data() {
    return {
      isOpenDrawerLeft: false,
    };
  },
  methods: {
    closeLeftDrawer(isClose) {
      if (isClose == false) {
        this.isOpenDrawerLeft = isClose;
      }
    }
  }
};
</script>

<style>
.center_div {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 400px;
  height: 400px;
}
​ .lds-hourglass {
  display: inline-block;
  position: relative;
  width: 400px;
  height: 400px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 6px;
  box-sizing: border-box;
  border: 26px solid #cef;
  border-color: #cef transparent #cef transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
