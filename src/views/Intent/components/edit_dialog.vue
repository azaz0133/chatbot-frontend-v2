<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Edit Intent {{editIntent['displayName']}}</v-card-title>
        <v-card-text>
          <h4 class="subtitle">Training Phrases</h4>
          <v-layout wrap row>
            <v-flex
              class="pa-2"
              md3
              xs3
              lg3
              v-for="(t,i) in editIntent['trainingPhrases']"
              :key="i"
            >
              <v-layout row wrap>
                <v-flex md10 lg10 xs10>
                  <v-text-field
                    :label="'training text'"
                    box
                    v-model="t['parts'][0]['text']"
                    :value="t['parts'][0]['text']"
                  ></v-text-field>
                </v-flex>
                <v-flex md2 lg2 xs2>
                  <v-icon color="red" class="click" @click="handleDeleteTraining(i)">delete</v-icon>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md3 lg3 xs3 class="pa-2" v-for="(n) in newTrains" :key="n">
              <v-layout row wrap>
                <v-flex>
                  <v-text-field
                    label="Add New Training Phrases"
                    hint="Press + for adding"
                    box
                    v-model="t"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-icon class="click" @click="addTrainingPhrase" color="success">add</v-icon>
                </v-flex>
              </v-layout>
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
                    <v-flex md10 xs10 lg10></v-flex>
                    <v-flex md2 lg2 xs2>
                      <v-btn flat color="red" @click="delRC(i)">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex md12 xs12 lg12 v-for="(l,index) in conditions[i]" :key="index*99">
                      <v-layout row wrap>
                        <v-flex md3 xs3 lg3 class="pa-1">
                          <v-autocomplete
                            hide-selected
                            :items=" index == 0 ? ['IF'] : ['AND','OR']"
                            label="Logic"
                            color="white"
                            v-model="l['logic']"
                          ></v-autocomplete>
                        </v-flex>
                        <v-flex md3 xs3 lg3 class="pa-1">
                          <v-autocomplete
                            :items="attrs"
                            v-on:change="v => handleAttrValueAC(v,index)"
                            hide-selected
                            label="Attribute"
                            color="white"
                            v-model="l['attribute']"
                          ></v-autocomplete>
                        </v-flex>
                        <v-flex md3 xs3 lg3 class="pa-1">
                          <v-autocomplete
                            label="Condition"
                            hide-selected
                            color="white"
                            :items="['>','<','IS NOT','IS']"
                            v-model="l['condition']"
                          ></v-autocomplete>
                        </v-flex>
                        <v-flex md3 xs3 lg3 class="pa-1">
                          <v-autocomplete
                            color="white"
                            :items="attrVals[l['attribute']]"
                            hide-selected
                            v-model="l['value']"
                          ></v-autocomplete>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex md12 xs12 lg12 v-if="addL[i]">
                      <v-layout row wrap>
                        <v-flex class="pa-1" md3 xs3 lg3>
                          <v-autocomplete
                            color="white"
                            hide-selected
                            label="Logic"
                            v-model="lol['logic']"
                            :items="['AND','OR']"
                          ></v-autocomplete>
                        </v-flex>
                        <v-flex class="pa-1" md3 xs3 lg3>
                          <v-autocomplete
                            color="white"
                            hide-selected
                            :items="attrs"
                            v-model="lol['attribute']"
                            label="Attribute"
                          ></v-autocomplete>
                        </v-flex>
                        <v-flex class="pa-1" md3 xs3 lg3>
                          <v-autocomplete
                            color="white"
                            hide-selected
                            label="Condition"
                            v-model="lol['condition']"
                            :items="['>','<','IS NOT','IS']"
                          ></v-autocomplete>
                        </v-flex>
                        <v-flex class="pa-1" md3 xs3 lg3>
                          <v-autocomplete
                            color="white"
                            hide-selected
                            label="value"
                            v-model="lol['value']"
                            :items="attrVals[lol['attribute']]"
                          ></v-autocomplete>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex md12 xs12 lg12>
                      <v-icon class="click" @click="handleAddLogics(i)" color="success">add</v-icon>
                    </v-flex>
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
    <v-dialog v-model="rcDialog" width="500">
      <v-card>
        <v-card-title class="headline">Add Response Condition</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn>
            <v-icon>add</v-icon>ADD
          </v-btn>
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
    dialogRc: false,
    rcDialog: false,
    attrDialog: false,
    conditions: [],
    newAttr: "",
    addL: [],
    values: [],
    newValue: "",
    newTrains: [""],
    isLoading: false,
    lol: {
      logic: "",
      attribute: "",
      condition: "",
      value: ""
    },
    t: "",
    attrItems: [],
    type: "",
    message: "",
    logics: "",
    stopIntent: false,
    attrs: [],
    attrVals: {},
    attrChoice: [],
    addLogic: []
  }),
  updated() {
    this.editIntent = this.intent;
  },
  destroyed() {
    this.dialog = false;
  },
  created() {
    Axios.get(API + "/proxy/fs/document?collection=Attribute").then(
      ({ data: { data } }) => {
        this.attrItems = data;
        this.attrs = data.map(d => {
          this.attrVals = {
            ...this.attrVals,
            [d["attribute"]]: d["value"].split(",").map(v => '"' + v + '"')
          };
          return d["attribute"];
        });
      }
    );
  },
  methods: {
    handleAttrValueAC(attr, index) {
      this.attrItems.forEach((a, i) => {
        if (a.attribute == attr) {
          this.attrChoice[index] = a.value.split(",");
        }
      });
      this.$forceUpdate();
    },
    handleDeleteTraining(index) {
      this.editIntent["trainingPhrases"].splice(index, 1);
    },
    handleAddLogics(index) {
      this.addL[index] = true
      if (this.addLogic[index].length == 0) {
      } else {
        let g = Object.create(this.editIntent);
        g["responseCodition"][index].logics +=
          "," +
          this.lol["logic"] +
          "," +
          this.lol["attribute"] +
          "," +
          this.lol["condition"] +
          "," +
          this.lol["value"];
        this.editIntent = g;
        console.log(this.editIntent["responseCodition"][index]);
        this.lol = {
          logic: "",
          attribute: "",
          condition: "",
          value: ""
        };
      }
      this.addLogic[index].push("");
    },
    handleAddAttr() {
      this.editIntent.attributes.push({
        attribute: this.newAttr,
        value: this.newValue
      });
      this.newAttr = "";
      this.attrDialog = false;
      this.newValue = "";
    },
    handleAddRC() {
      this.editIntent.responseCodition.push({
        type: this.newAttr,
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
    deLogics(arr) {
      let lo = "";
      for (let i = 0; i < arr.length; i++) {
        if (i == 0) {
          lo +=
            arr[i]["attribute"] +
            "," +
            arr[i]["condition"] +
            "," +
            arr[i]["value"];
        } else {
          lo +=
            "," +
            arr[i]["logic"] +
            "," +
            arr[i]["attribute"] +
            "," +
            arr[i]["condition"] +
            "," +
            arr[i]["value"];
        }
      }
      return lo;
    },
    destuctureLogic() {
      const rcs = [];
      this.editIntent["responseCodition"].forEach((a, index) => {
        rcs.push({
          ...a,
          logics: this.deLogics(this.conditions[index])
        });
      });
      return rcs;
    },
    addTrainingPhrase() {
      this.editIntent["trainingPhrases"].push({
        parts: [
          {
            text: this.t
          }
        ]
      });
      this.t = "";
    },
    async editIntentMethod() {
      // this.editIntent["responseCodition"] = this.destuctureLogic();
      this.addLogic.forEach((a, i) => {
        if (a.length == 1) {
          this.editIntent["responseCodition"][index].logics +=
            "," +
            this.lol["logic"] +
            "," +
            this.lol["attribute"] +
            "," +
            this.lol["condition"] +
            "," +
            this.lol["value"];
        }
      });
      console.log(this.addLogic, "sss");
      // this.isLoading = true;
      // await this.updateIntent(this.editIntent);
      // this.isLoading = false;
      // console.log(this.editIntent);
      // window.location.reload();
    }
  },
  computed: {
    openDialog() {
      return this.dialog;
    }
  },
  watch: {
    intent(val) {},
    dialog: function(oldProp, newProps) {
      if (newProps) {
        alert("Anythings wag changed if you not accept it before");
        this.handleEditDialog(false);
      }
    },
    newAttr(val) {
      this.attrItems.forEach(a => {
        if (a.attribute == val) {
          this.values = a.value.split(",");
        }
      });
    },
    conditions(val) {
      console.log(val);
    },
    editIntent(val) {
      const conditions = [];
      console.log(val["responseCodition"]);
      val["responseCodition"].forEach((a, index) => {
        conditions.push([]);
        this.addLogic.push([]);
        this.addL.push(false)
        // this.attrChoice.push([]);
        const logics = ("IF," + a["logics"]).split(",");
        for (let i = 0; i < logics.length; i += 4) {
          this.attrItems.forEach(a => {
            if (a.attribute == logics[i + 1]) {
              this.attrChoice.push(a.value.split(","));
            }
          });
          conditions[index].push({
            logic: logics[i],
            attribute: logics[i + 1],
            condition: logics[i + 2],
            value: logics[i + 3]
          });
        }
      });
      this.conditions = conditions;
      console.log("object " + this.conditions[0] + " da asd");
    }
  }
};
</script>

<style>
</style>
