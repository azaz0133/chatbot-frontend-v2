<template>
  <v-container>
    <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
      <v-tab v-for="n in ['Intents','Create']" :key="n" ripple>{{ n }}</v-tab>
      <v-tab-item>
        <div v-if="isLoadingIntent" class="center_div">
          <div class="lds-hourglass"></div>
        </div>
        <v-list-tile v-else v-for="(intent,index) in getIntents" :key="intent['displayName']">
          <v-list-tile-content>
            <v-list-tile-title>{{intent['displayName']}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon color="warning" @click="openUpdateIntent(intent)" style="cursor: pointer;">edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-icon
              color="red"
              @click="deleteIntent(index,intent['displayName'])"
              style="cursor: pointer;"
            >delete</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-tab-item>
      <v-tab-item>
        <create-intent></create-intent>
      </v-tab-item>
    </v-tabs>
    <edit-dialog
      :dialog="openDialog"
      :intent="intent"
      :updateIntent="updateIntent"
      :handleEditDialog="handleEditDialog"
    />
  </v-container>
</template>

<script>
import Axios from "axios";
import { API } from "../../constant";
import EditDialog from "./components/edit_dialog";
import CreateIntent from "./components/create";

export default {
  components: {
    EditDialog,
    CreateIntent
  },
  data: () => ({
    active: null,
    intents: [],
    intent: {},
    openDialog: false,
    isLoadingIntent: false
  }),
  created() {
    this.getAllIntents();
  },
  methods: {
    async getAllIntents() {
      this.isLoadingIntent = true;
      const {
        data: { data }
      } = await Axios.get(API + "/proxy/get/intents");
      this.isLoadingIntent = false;
      this.intents = data;
    },
    async openUpdateIntent(intent) {
      this.isLoadingIntent = true;
      const res = await Axios.get(
        API + "/proxy/fs/document?collection=IntentDetail"
      );
      res.data.data.forEach(d => {
        if (intent["displayName"] == d.intent) {
          this.intent = {
            ...intent,
            ...d
          };
          this.isLoadingIntent = false;
          this.openDialog = true;
        }
      });
    },
    handleEditDialog(open) {
      this.openDialog = open;
    },
    async deleteIntent(i, displayName) {
      if (confirm("Are you sure?")) {
        await Axios.post(API + "/proxy/df/delete/intent", {
          displayName
        });
        this.intents = this.intents.filter((intent, index) => index != i);
        return;
      } else {
        return;
      }
    },
    async updateIntent(intent) {
      const { data } = await Axios.post(API + "/proxy/df/update/intent", {
        ...intent
      });
      const res = await Axios.post(API + "/proxy/fs/update", {
        collection: "IntentDetail",
        document: intent["id"],
        data: {
          attributes: intent["attributes"],
          intent: intent["intent"],
          responseCodition: intent["responseCodition"]
        }
      });
      this.openDialog = false;
      console.log(data);
    }
  },
  computed: {
    getIntents() {
      return this.intents;
    }
  }
};
</script>

<style>
</style>
