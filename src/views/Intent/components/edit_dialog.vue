<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Edit Intent {{editIntent['displayName']}}</v-card-title>
        <v-card-text >
          <h4 class="subtitle" v-if="editIntent['displayName'] != 'Default Fallback Intent'">Training Phrases</h4>
          <v-layout wrap row v-if="editIntent['displayName'] != 'Default Fallback Intent'">
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
          <v-layout v-if="editIntent['displayName'] != 'Default Fallback Intent'">
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
              <v-btn color="success" @click="rcDialog = true;">
                <v-icon class="click">add</v-icon>Response
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
                            @change="test(conditions[i],i)"
                            :rules="[v => !attrThatSelected[i].includes(v) || `${v} has been selected`]"
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
                    <!-- ADD SECTION -->
                    <v-flex md12 xs12 lg12 v-if="addL[i]">
                      <v-layout row wrap>
                        <v-flex class="pa-1" md3 xs3 lg3>
                          <v-autocomplete
                            background-color="white"
                            color="yellow"
                            hide-selected
                            label="Logic"
                            v-model="lol[i]['logic']"
                            :items="['AND','OR']"
                          ></v-autocomplete>
                        </v-flex>
                        <v-flex class="pa-1" md3 xs3 lg3>
                          <v-autocomplete
                            background-color="white"
                            color="yellow"
                            hide-selected
                            :items="attrs"
                            @change="test(conditions[i],i)"
                            :rules="[v => !attrThatSelected[i].includes(v) || `${v} has been selected`]"
                            v-model="lol[i]['attribute']"
                            label="Attribute"
                          ></v-autocomplete>
                        </v-flex>
                        <v-flex class="pa-1" md3 xs3 lg3>
                          <v-autocomplete
                            background-color="white"
                            color="yellow"
                            hide-selected
                            label="Condition"
                            v-model="lol[i]['condition']"
                            :items="['>','<','IS NOT','IS']"
                          ></v-autocomplete>
                        </v-flex>
                        <v-flex class="pa-1" md3 xs3 lg3>
                          <v-autocomplete
                            background-color="white"
                            color="yellow"
                            hide-selected
                            label="value"
                            v-model="lol[i]['value']"
                            :items="attrVals[lol[i]['attribute']]"
                          ></v-autocomplete>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex md12 xs12 lg12>
                      <v-icon class="click" @click="handleDeleCon(i)" color="red">remove</v-icon>
                    </v-flex>
                    <v-flex md12 xs12 lg12>
                      <v-icon class="click" @click="handleAddLogics(i)" color="success">add</v-icon>
                    </v-flex>
                    <v-flex md6 lg6 xs6 class="pa-2">
                      <v-autocomplete
                        :items="['text','block']"
                        hide-selected
                        label="type"
                        color="white"
                        v-model="rc['type']"
                      ></v-autocomplete>
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

    <v-dialog v-model="rcDialog" max-width="450">
      <v-card>
        <v-card-title>
          <h3 class="headline">Add Response</h3>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md12 lg12 xs12 v-for="i in countCodition" :key="i*2 + 6">
              <v-layout row wrap>
                <v-flex md3 xs3 lg3 class="pr-3">
                  <v-autocomplete
                    label="Condition"
                    v-model="rcForm[i - 1].logic"
                    :items=" i == 1 ? ['IF'] : ['AND','OR']"
                    :value="i == 1 && 'IF'"
                  ></v-autocomplete>
                </v-flex>
                <v-flex md3 xs3 lg3 class="pr-3">
                  <v-autocomplete
                    :items="attrs"
                    :rules="[v => !attributesSelected.includes(v) || `${v} has been selected`]"
                    :item-disabled="attributesSelected"
                    label="Attribute"
                    v-on:change="handleAttrValueAC"
                    v-model="rcForm[i -1 ].attribute"
                  ></v-autocomplete>
                </v-flex>
                <v-flex md3 xs3 lg3 class="pr-3">
                  <v-autocomplete
                    :items="['IS','IS NOT','<','>']"
                    v-model="rcForm[i - 1].operation"
                    label="Operator"
                  ></v-autocomplete>
                </v-flex>
                <v-flex md3 xs3 lg3 class="pr-3">
                  <v-autocomplete
                    :items="ATTRCHOICE[i - 1]"
                    label="Choice"
                    v-model="rcForm[i - 1].choice"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md12 lg12 xs12>
              <v-spacer></v-spacer>
              <v-icon color="green" class="click" @click="addSubCondition">add</v-icon>
            </v-flex>
            <v-flex md3 lg3 xs3>
              <v-autocomplete :items="['text','block']" label="Type" v-model="type"></v-autocomplete>
              <v-switch v-model="stopIntent" :label="`Stop Intent`"></v-switch>
            </v-flex>
            <v-flex md1 lg1 xs1></v-flex>
            <v-flex md8 lg8 xs8>
              <v-textarea box label="Response message or Block" v-model="message"></v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click="rcDialog = false;">Cancel</v-btn>
          <v-btn color="primary darken-1" @click="addCondition">Agree</v-btn>
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
    attributesSelected: [],
    countCodition: 1,
    rcDialog: false,
    rcForm: [
      {
        logic: "",
        operation: "",
        attribute: "",
        choice: ""
      }
    ],
    attrDialog: false,
    conditions: [],
    message: "",
    type: "",
    newAttr: "",
    addL: [],
    values: [],
    newValue: "",
    newTrains: [""],
    isLoading: false,
    lol: [],
    t: "",
    attrItems: [],
    type: "",
    message: "",
    logics: "",
    stopIntent: false,
    attrs: [],
    attrVals: {},
    attrChoice: [],
    addLogic: [],
    attrThatSelected: [],
    isAccept: false
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
    addCondition() {
      if (this.type == "" || this.message == "") {
        return alert("Wrong input type and message is not empty");
      }
      if (this.countCodition == 1) {
        this.logics =
          this.rcForm[this.countCodition - 1].attribute +
          "," +
          this.rcForm[this.countCodition - 1].operation +
          "," +
          '"' +
          this.rcForm[this.countCodition - 1].choice +
          '"';
      }
      if (
        this.countCodition != 1 &&
        (this.rcForm[this.countCodition - 1].logic != "" ||
          this.rcForm[this.countCodition - 1].operation != "" ||
          this.rcForm[this.countCodition - 1].choice != "" ||
          this.rcForm[this.countCodition - 1].attribute != "")
      ) {
        if (
          this.attributesSelected.includes(
            this.rcForm[this.countCodition - 1].attribute
          )
        ) {
          return alert(
            `${this.rcForm[this.countCodition - 1].attribute} has been selected`
          );
        }
        this.logics +=
          "," +
          this.rcForm[this.countCodition - 1].logic +
          "," +
          this.rcForm[this.countCodition - 1].attribute +
          "," +
          this.rcForm[this.countCodition - 1].operation +
          "," +
          '"' +
          this.rcForm[this.countCodition - 1].choice +
          '"';
      }
      const cc = Object.create(this.editIntent);
      cc["responseCodition"].push({
        response: this.message,
        type: this.type,
        logics: this.logics,
        stopIntent: this.stopIntent
      });
      this.editIntent = cc;
      this.type = "";
      this.message = "";
      this.rcForm = [
        {
          logic: "",
          operation: "",
          attribute: "",
          choice: ""
        }
      ];
      this.countCodition = 1;
      this.rcDialog = false;
      this.attributesSelected = [];
      // this.$forceUpdate()
    },
    addSubCondition() {
      if (
        this.rcForm[this.countCodition - 1].logic == "" ||
        this.rcForm[this.countCodition - 1].operation == "" ||
        this.rcForm[this.countCodition - 1].choice == "" ||
        this.rcForm[this.countCodition - 1].attribute == ""
      ) {
        return alert("Wrong input");
      }

      if (this.countCodition == 1) {
        this.logics =
          this.rcForm[this.countCodition - 1].attribute +
          "," +
          this.rcForm[this.countCodition - 1].operation +
          "," +
          '"' +
          this.rcForm[this.countCodition - 1].choice +
          '"';
      } else {
        if (
          this.attributesSelected.includes(
            this.rcForm[this.countCodition - 1].attribute
          )
        ) {
          return alert(
            `${this.rcForm[this.countCodition - 1].attribute} has been selected`
          );
        }
        this.logics +=
          "," +
          this.rcForm[this.countCodition - 1].logic +
          "," +
          this.rcForm[this.countCodition - 1].attribute +
          "," +
          this.rcForm[this.countCodition - 1].operation +
          "," +
          '"' +
          this.rcForm[this.countCodition - 1].choice +
          '"';
      }
      this.attributesSelected.push(
        this.rcForm[this.countCodition - 1].attribute
      );
      this.rcForm[++this.countCodition - 1] = {
        logic: "",
        operation: "",
        attribute: "",
        choice: ""
      };
    },
    handleAttrValueAC(attr, index) {
      this.attrItems.forEach((a, i) => {
        if (a.attribute == attr) {
          this.attrChoice[index] = a.value.split(",");
        }
      });
      this.$forceUpdate();
    },
    test(a, i) {
      this.attrThatSelected[i] = a.map(s => s["attribute"]);
    },
    handleDeleCon(index) {
      const c = Object.create(this.editIntent);
      let log = c["responseCodition"][index].logics.split(",");
      for (let i = 0; i < 4; i++) {
        log.pop();
      }
      c["responseCodition"][index].logics = "";
      log.forEach(l => {
        c["responseCodition"][index].logics += l + ",";
      });
      c["responseCodition"][index].logics = c["responseCodition"][
        index
      ].logics.substr(0, c["responseCodition"][index].logics.length - 1);

      console.log(log.length);
      this.editIntent = c;
      console.log(c["responseCodition"][index]);
      this.$forceUpdate();
    },
    handleDeleteTraining(index) {
      this.editIntent["trainingPhrases"].splice(index, 1);
    },
    handleAddLogics(index) {
      this.addL[index] = true;
      this.attrThatSelected[index] = ["color"];
      console.log("aaaa   " + this.attrThatSelected[index]);
      this.$forceUpdate();
      console.log(this.editIntent["responseCodition"][index]);
      this.attrThatSelected[index] = this.editIntent["responseCodition"][index];
      if (this.addLogic[index].length == 0) {
      } else {
        let g = Object.create(this.editIntent);
        g["responseCodition"][index].logics +=
          "," +
          this.lol[index]["logic"] +
          "," +
          this.lol[index]["attribute"] +
          "," +
          this.lol[index]["condition"] +
          "," +
          this.lol[index]["value"];
        this.editIntent = g;
        this.lol[index - 1] = {
          logic: "",
          attribute: "",
          condition: "",
          value: ""
        };
        console.log(this.editIntent["responseCodition"][index]);
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
      this.lol.forEach(l => {
        if (l.logic != "") {
          return alert("You need to click + button for add condition first");
        }
      });
      this.editIntent["responseCodition"] = this.destuctureLogic();
      // this.addLogic.forEach((a, i) => {
      //   if (a.length == 1) {
      //     this.editIntent["responseCodition"][i].logics +=
      //       "," +
      //       this.lol["logic"] +
      //       "," +
      //       this.lol["attribute"] +
      //       "," +
      //       this.lol["condition"] +
      //       "," +
      //       this.lol["value"];
      //   }
      // });
      console.log(this.editIntent, "sss");
      this.isLoading = true;
      await this.updateIntent(this.editIntent);
      this.isLoading = false;
      this.isAccept = true;
      console.log(this.editIntent);
      window.location.reload();
    }
  },
  computed: {
    ATTRCHOICE() {
      return this.attrChoice;
    },
    openDialog() {
      return this.dialog;
    },
    rules() {
      return [
        // val => {
        //   return (
        //     !this.attrThatSelected[0].includes(val) ||
        //     `${val} has been selected`
        //   );
        // }
      ];
    }
  },
  watch: {
    attrThatSelected(val) {
      console.log(" asdasd  " + val);
    },
    intent(val) {},
    dialog: function(oldProp, newProps) {
      if (newProps) {
        if (!isAccept) {
          alert("Anythings wasn't changed if you not accept it before");
        }
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
        this.attrThatSelected.push([]);
        this.lol.push({
          logic: "",
          attribute: "",
          value: "",
          condition: ""
        });
        this.addL.push(false);
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
