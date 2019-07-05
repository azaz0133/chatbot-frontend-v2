<template>
  <v-navigation-drawer
    mobile-break-point="600"
    v-model="drawer"
    app
    right
    width="350"
    class="blue-grey lighten-5"
  >
    <v-layout row wrap justify-center>
      <v-flex md9 xs9 lg9 class="pt-2">
        <v-text-field v-model="message" class="ml-4" color="blue" box label="Type something..."></v-text-field>
      </v-flex>
      <v-flex md3 xs3 lg3 column class="pt-3">
        <v-btn @click="sendMessageTest" color="primary" style="display: inline-block;">
          <v-icon>search</v-icon>Test
        </v-btn>
      </v-flex>
      <v-flex md12 xs12 lg12>
        <v-card class="ma-3" color="cyan lighten-5">
          <v-divider color="grey"></v-divider>
          <v-card-text>
            <v-expansion-panel expand v-model="expand">
              <v-expansion-panel-content>
                <template v-slot:header>
                  <div class="headline">Detected</div>
                </template>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Intent</v-card-title>
                  <v-card-text>
                    <h4 class="sub-title success--text">{{detect.intent}}</h4>
                  </v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Entity</v-card-title>
                  <v-card-text></v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-divider color="white"></v-divider>
              <v-expansion-panel-content>
                <template v-slot:header>
                  <div class="headline">All In Memories</div>
                </template>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Entity</v-card-title>
                  <v-card-text></v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Entity</v-card-title>
                  <v-card-text></v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
              </v-expansion-panel-content>
              <v-divider color="white"></v-divider>
              <v-expansion-panel-content>
                <template v-slot:header>
                  <div class="headline">Response</div>
                </template>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Response Text</v-card-title>
                  <v-card-text>
                    <v-card-text>
                      <h4 class="sub-title success--text">{{detect.message}}</h4>
                    </v-card-text>
                  </v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Type</v-card-title>
                  <v-card-text></v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Return</v-card-title>
                  <v-card-text></v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-btn v-if="isExpanded" color="red" class="black--text" @click="closeExpandAll">close</v-btn>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import Axios from "axios";
import { API } from "../constant";
export default {
  components: {},
  data: () => ({
    drawer: true,
    expand: [],
    items: 3,
    isExpanded: false,
    message: "",
    detect: {
      intent: "",
      entity: "",
      message: ""
    }
  }),
  methods: {
    expandAll() {
      this.expand = [...Array(this.items).keys()].map(_ => true);
      this.isExpanded = true;
    },
    closeExpandAll() {
      this.expand = [...Array(this.items).keys()].map(_ => false);
      this.isExpanded = false;
    },
    sendMessageTest() {
      if (this.message != "")
        Axios.get(API + "/proxy/message_test/" + this.message).then(
          ({ data: { results } }) => {
            this.expandAll();
            this.detect.intent =
              results[0]["queryResult"]["intent"]["displayName"];
            this.detect.message = results[0]["queryResult"]["fulfillmentText"];
          }
        );
    }
  },
  watch: {
    message: function(old, New) {
      this.closeExpandAll();
    }
  }
};
</script>

<style>
.headermessage {
  text-align: center;
}
/* .action--button {
  position: absolute;
  top: 5em;
  right: 0;
} */
</style>
