<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Edit Intent {{editIntent['displayName']}}</v-card-title>
        <v-card-text>
          <!-- <v-text-field
            v-model="editIntent['displayName']"
            :label="'Display Name'"
            :value="editIntent['displayName']"
          ></v-text-field>-->
          <h4 class="subtitle">Training Phrases</h4>
          <v-btn color="success" @click="isAdd = true">Add Training Phrases</v-btn>
          <v-text-field v-if="isAdd" v-model="newTrain"></v-text-field>
          <v-layout wrap row>
            <v-flex md12 xs12 lg12 v-for="(t,i) in editIntent['trainingPhrases']" :key="i">
              <v-text-field v-model="t['parts'][0]['text']" :value="t['parts'][0]['text']"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="editIntentMethod" v-if="!isLoading">I accept</v-btn>
          <div v-else class="lds-hourglass"></div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Axios from "axios";
import { API } from "../../../constant";
export default {
  props: {
    intent: {
      required: true
    },
    dialog: {
      required: true,
      type: Boolean
    },
    updateIntent: {
      type: Function,
      required: true
    },
    handleEditDialog: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    editIntent: {},
    isAdd: false,
    dialogRc: false,
    newTrain: "",
    isLoading: false
  }),
  updated() {
    console.log(this.editIntent);
    this.editIntent = this.intent;
  },
  destroyed() {
    this.dialog = false;
  },
  methods: {
    async editIntentMethod() {
      if (this.isAdd) {
        this.editIntent["trainingPhrases"].push({
          parts: [
            {
              text: this.newTrain
            }
          ]
        });
      }
      this.isLoading = true;
      await this.updateIntent(this.editIntent);
      this.isLoading = false;
    }
  },
  computed: {
    openDialog() {
      return this.dialog;
    }
  },
  watch: {
    dialog: function(oldProp, newProps) {
      if (newProps) {
        this.handleEditDialog(false);
      }
    }
  }
};
</script>

<style>
</style>
