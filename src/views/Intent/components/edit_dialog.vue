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
          <v-text-field v-if="isAdd" label="training text" v-model="newTrain"></v-text-field>
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
          <v-layout>
            <v-flex md10 xs10 lg10>
              <h4 class="subtitle">Attributes</h4>
            </v-flex>
            <v-flex md2 xs2 lg2>
              <v-btn color="success" @click="attrDialog = true">
                <v-icon>add</v-icon>Attribute
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex
              class="pa-3"
              md3
              xs3
              lg3
              v-for="(attr,i) in editIntent['attributes']"
              :key="attr['attribute'] + i"
            >
              <v-card color="cyan">
                <v-card-text class="white--text">
                  <v-layout row wrap>
                    <v-flex md8 xs8 lg8>
                      <v-text-field :label="'Attribute'" :value="attr['attribute']"></v-text-field>
                    </v-flex>
                    <v-flex md2 xs2 lg2>
                      <v-btn flat color="red" @click="delAttr(i)">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                  <v-text-field :label="'value'" :value="attr['value']"></v-text-field>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md10 xs10 lg10>
              <h4 class="subtitle">Response Condition</h4>
            </v-flex>
            <v-flex md2 xs2 lg2>
              <v-btn color="success">
                <v-icon>add</v-icon>Response
              </v-btn>
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
                    <!-- <v-flex
                      md3
                      lg3
                      xs3
                      v-for="(l,index) in ('IF,' + rc['logics']).split(',')"
                      :key="index"
                      class="pa-2"
                    >-->
                    <v-flex md10 xs10 lg10>
                      <v-text-field color="white" v-model="rc['logics']"></v-text-field>
                    </v-flex>
                    <v-flex md2 xs2 lg2>
                      <v-btn flat color="red" @click="delRC(i)">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-flex>
                    <!-- </v-flex> -->
                    <v-flex md6 lg6 xs6 class="pa-2">
                      <v-text-field label="type" color="white" v-model="rc['type']"></v-text-field>
                      <v-switch v-model="rc['stopIntent']" label="Stop Intent"></v-switch>
                    </v-flex>
                    <v-flex md6 lg6 xs6 class="pa-2">
                      <v-text-field label="response message" color="white" v-model="rc['response']"></v-text-field>
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

    <!-- DIALOG -->
    <v-dialog v-model="attrDialog" width="300">
      <v-card>
        <v-card-title class="headline">Add Attribute</v-card-title>
        <v-card-text>
          <v-autocomplete v-model="newAttr" :items="attrs" label="Attribute"></v-autocomplete>
          <v-autocomplete v-model="newValue" :items="values" label="Choice"></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="handleAddAttr">ADD</v-btn>
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
    attrDialog: false,
    newAttr: "",
    values: [],
    newValue: "",
    newTrain: "",
    isLoading: false,
    attrItems: [],
    attrs: []
  }),
  updated() {
    // console.log(this.editIntent);
    this.editIntent = this.intent;
  },
  destroyed() {
    this.dialog = false;
  },
  created() {
    Axios.get(API + "/proxy/fs/document?collection=Attribute").then(
      ({ data: { data } }) => {
        this.attrItems = data;
        this.attrs = data.map(d => d["attribute"]);
      }
    );
  },
  methods: {
    handleAddAttr() {
      this.editIntent.attributes.push({
        attribute: this.newAttr,
        value: this.newValue
      });
      this.newAttr = "";
      this.attrDialog = false;
      this.newValue = "";
    },
    delRC(index) {
      this.editIntent.responseCodition.splice(index, 1);
    },
    delAttr(index) {
      this.editIntent.attributes.splice(index, 1);
    },
    async editIntentMethod() {
      console.log(this.editIntent);
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
      window.location.reload();
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
    },
    newAttr(val) {
      this.attrItems.forEach(a => {
        if (a.attribute == val) {
          this.values = a.value.split(",");
        }
      });
    }
  }
};
</script>

<style>
</style>
