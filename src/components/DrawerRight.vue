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
          <v-icon>send</v-icon>send
        </v-btn>
      </v-flex>
      Session talk : {{uuid}}
      <div class="lds-hourglass" v-if="loading"></div>
      <template v-else>
        <v-flex md12 lg12 xs12>
          <v-card class="ma-3">
            <v-card-title class="headline primary--text">Intent Detected</v-card-title>
            <v-card-text>
              <h5 class="title blue--text">{{intent}}</h5>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md12 lg12 xs12>
          <v-card class="ma-3">
            <v-card-title class="headline primary--text">Response Message</v-card-title>
            <v-card-text>
              <h5 class="title blue--text">{{responseMessage}}</h5>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md12 lg12 xs12>
          <v-card class="ma-3">
            <v-card-title class="headline primary--text">Memories</v-card-title>
            <v-card-text v-if="intents.length != 0">
              <h4 class="title green-text">Attributes And Choice</h4>
              <ol>
                <li
                  v-for="(attr,i) in attributes"
                  :key="i*3"
                >{{"attribute = " +attr.attribute + " value = " + attr.value}}</li>
              </ol>
              <h4 class="title brown--text">Intent</h4>
              <ol>
                <li v-for="(int ,i ) in intents" :key="i*5">{{int}}</li>
              </ol>
            </v-card-text>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import Axios from "axios";
import { API } from "../constant";
import uuid from "uuid/v4";
export default {
  components: {},
  data: () => ({
    drawer: true,
    uuid: "",
    message: "",
    responseMessage: "",
    attributes: [],
    intents: [],
    loading:false,
    intent: "",
    detect: {
      intent: "",
      entity: "",
      message: ""
    }
  }),
  created() {
    this.uuid = uuid();
  },
  methods: {
    sendMessageTest() {
      if (this.message != "")
      this.loading = true
        Axios.get(
          API + `/hbot/test?message=${this.message}&uid=${this.uuid}`
        ).then(({ data }) => {
          console.log(data);
          this.loading = false
          this.intent = data.intentDetectNow;
          this.responseMessage = data.responseMessage;
          this.intents = data.memories.intents;
          this.attributes = data.memories.attributes;
        });
      // Axios.get(API + "/proxy/message_test/" + this.message).then(
      //   ({ data: { results } }) => {
      //     console.log(results);
      //     this.expandAll();
      //     this.detect.intent =
      //       results[0]["queryResult"]["intent"]["displayName"];
      //     this.detect.message = results[0]["queryResult"]["fulfillmentText"];
      //   }
      // );
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
