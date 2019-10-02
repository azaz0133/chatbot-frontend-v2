<template>
  <v-app>
    <notifications group="foo" position="top left" />
    <drawer-left
      :drawer="isOpenDrawerLeft"
      :closeDrawer="closeLeftDrawer"
      v-show="this.$route.name != 'welcome'"
    />
    <v-toolbar app color="cyan darken-1">
      <v-toolbar-side-icon
        @click="isOpenDrawerLeft = !isOpenDrawerLeft"
        v-show="this.$route.name != 'welcome'"
      ></v-toolbar-side-icon>
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
    <div class="chat" v-if="loggedin">
      <beautiful-chat
        :participants="participants"
        :titleImageUrl="titleImageUrl"
        :onMessageWasSent="onMessageWasSent"
        :messageList="messageList"
        :newMessagesCount="newMessagesCount"
        :isOpen="isChatOpen"
        :close="closeChat"
        :open="openChat"
        :showEmoji="showEmoji"
        :showFile="showFile"
        :showTypingIndicator="showTypingIndicator"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :messageStyling="messageStyling"
        @onType="handleOnType"
      />
    </div>
  </v-app>
</template>

<script>
import DrawerLeft from "./components/DrawerLeft";
import DrawerRight from "./components/DrawerRight";
import * as all from "./chat";
import { chatData } from "./chatData";
import uuid from "uuid/v4";
import { cAuth } from "./utils/auth";

export default {
  name: "App",
  components: {
    DrawerLeft,
    DrawerRight
  },
  created() {
    this.uuid = uuid();
    if (cAuth() != false) {
      this.loggedin = true;
    }
    let x = window.setInterval(() => {
      if (cAuth() != false) {
        this.loggedin = true;
        window.clearInterval(x);
      }
    }, 1000);
  },
  data() {
    return {
      isOpenDrawerLeft: false,
      uuid: "",
      loggedin: false,
      ...chatData
      // chat: {
      // participants: [
      //   {
      //     id:"admin",
      //     name:"admin",
      //     imageUrl:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
      //   },
      //    {
      //     id:"bot",
      //     name:"bot",
      //     imageUrl:"https://png.pngtree.com/svg/20170531/bot_906707.png"
      //   }
      // ]
      // }
    };
  },
  methods: {
    closeLeftDrawer(isClose) {
      if (isClose == false) {
        this.isOpenDrawerLeft = isClose;
      }
    },
    ...all
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Source Sans Pro", sans-serif;
  line-height: 1.5;
}

body {
  height: 2000px;
}

.chat {
  /* position: fixed;
  bottom: 10;
  left: 90; */
  z-index: 100;
}

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
  border-color: rgb(189, 99, 15) transparent #cef transparent;
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
