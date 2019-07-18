<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="1000">
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
            <v-flex
              class="pa-2"
              md3
              xs3
              lg3
              v-for="(t,i) in editIntent['trainingPhrases']"
              :key="i"
            >
              <v-text-field
                :label="'training text'"
                box
                v-model="t['parts'][0]['text']"
                :value="t['parts'][0]['text']"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <h4 class="subtitle">Attributes</h4>
          <v-layout row wrap>
            <v-flex md3 xs3 lg3 v-for="attr in editIntent['attributes']" :key="attr['attribute']">
              <v-card color="cyan">
                <v-card-text class="white--text">
                  <v-text-field :label="'Attribute'" :value="attr['attribute']"></v-text-field>
                  <v-text-field :label="'value'" :value="attr['value']"></v-text-field>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md12 xs12 lg12>
              <h4 class="subtitle">Response Condition</h4>
            </v-flex>
            <v-flex
              md6
              xs6
              lg6
              v-for="(rc,i) in editIntent['responseCodition']"
              :key="i*4"
              class="pa-2"
            >
              <v-card color="primary">
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex
                      md3
                      lg3
                      xs3
                      v-for="(l,index) in ('IF,' + rc['logics']).split(',')"
                      :key="l"
                      class="pa-2"
                    >
                      <v-text-field color="white" :hint="(index + 1) % 4 == 0 ? 'Choice Must Contain With double quote' : '' " :value="l"></v-text-field>
                    </v-flex>
                    <v-flex md6 lg6 xs6 class="pa-2">
                      <v-text-field label="type" color="white" :value="rc['type']"></v-text-field>
                    </v-flex>
                    <v-flex md6 lg6 xs6 class="pa-2">
                      <v-text-field label="response message" color="white" :value="rc['response']"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
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
      "".split();
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
