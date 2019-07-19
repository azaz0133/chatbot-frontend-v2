<template>
  <div class="div_center" v-if="loading">
    <div class="lds-hourglass"></div>
  </div>
  <v-layout row wrap class="mt-3" v-else>
    <v-flex xs10 md10 lg10>
      <v-text-field v-model="displayName" label="Intent name"></v-text-field>
    </v-flex>
    <v-flex xs2 md2 lg2 class="mt-2 pl-2">
      <v-btn color="primary" block @click="handleSave">
        <v-icon>save</v-icon>Save
      </v-btn>
    </v-flex>
    <!-- <v-flex md12 lg12 xs12 class="mb-3"> -->
      <!-- <v-card> -->
        <!-- <v-card-text> -->
          <!-- <v-layout row wrap>
            <v-flex md10 lg10 xs10>
              <v-text-field label="Context"></v-text-field>
            </v-flex>
            <v-flex md2 lg2 xs2 class="mt-2 pl-2">
              <v-btn block color="primary">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout> -->
        <!-- </v-card-text> -->
      <!-- </v-card> -->
    <!-- </v-flex> -->
    <v-flex md12 lg12 xs12 class>
      <v-card>
        <v-layout row wrap class="pa-2">
          <v-flex xs10 md10 lg10>
            <v-text-field label="Phrase text" v-model="phraseText"></v-text-field>
          </v-flex>
          <v-flex md2 lg2 xs2 class="mt-2 pl-2">
            <v-btn @click="handlePhrase" color="success" block>
              <v-icon>add</v-icon>Add
            </v-btn>
          </v-flex>
          <v-flex
            md12
            lg12
            xs12
            v-for="(phraseText,index) in phraseTexts"
            :key="index"
            class="pl-4 pr-4"
          >
            <v-text-field :value="(index + 1) + ' ' +phraseText" disabled></v-text-field>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex md12 sm12 lg12 xs12 class="mt-3">
      <v-card>
        <v-card-title class="headline">
          Attributes
          <v-spacer></v-spacer>
          <v-btn @click="dialog = true" center right fab color="success">
            <v-icon>add</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 md3 lg3 sm3 v-for="(item,i) in items" :key="i" class="pa-1">
              <v-card color="blue" class="white--text">
                <v-card-title class="title">Attribute</v-card-title>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex md5 lg5 xs5>{{item['attribute']}}</v-flex>
                    <v-flex md2 lg2 xs2></v-flex>
                    <v-flex md5 lg5 xs5>{{item['value']}}</v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex md12 xs12 lg12 class="mt-3">
      <v-card>
        <v-card-title>
          <h3 class="headline">Response and Condition</h3>
          <v-spacer></v-spacer>
          <v-btn bottom left fab @click="dialogRc = true" color="pink" class="white--text">
            <v-icon>add</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <Rc class="pa-3" v-for="(rc,i) in rcs" :dataRc="rcs[i]" :key="i*100"></Rc>
        </v-card-text>
      </v-card>
    </v-flex>

    <!--  Dialog Section  -->
    <v-dialog v-model="dialogRc" max-width="450">
      <v-card>
        <v-card-title>
          <h3 class="headline">Add Response</h3>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md12 lg12 xs12 v-for="i in countCodition" :key="i*2">
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
                    :items="attributes"
                    :rules="rules"
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
          <v-btn color="red darken-1" flat="flat" @click="dialogRc = false;">Cancel</v-btn>
          <v-btn color="primary darken-1" @click="addCondition">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Add Attribute</v-card-title>
        <!-- <v-card-text> -->
        <!-- <div class="center_div">
            <div class="lds-hourglass"></div>
        </div>-->
        <!-- </v-card-text> -->
        <v-card-text>
          <v-autocomplete :items="bundleAttr.attributes" v-model="attribute" label="attribute"></v-autocomplete>
          <v-autocomplete :items="this.bundleAttr.values" v-model="value" label="value"></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click="dialog = false;">Disagree</v-btn>
          <v-btn color="primary darken-1" @click="addAttribute">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Axios from "axios";
import uuid from "uuid/v4";
import { API } from "../../../constant";
import Rc from "./rc";
export default {
  components: {
    Rc
  },
  data: () => ({
    phraseTexts: [],
    loading: false,
    dialogRc: false,
    attribute: "",
    value: "",
    stopIntent: false,
    dialog: false,
    bundleAttr: {
      attributes: [],
      values: []
    },
    valueAttrs: [],
    countCodition: 1,
    phraseText: "",
    attributes: [],
    displayName: "",
    values: [],
    message: "",
    logics: "",
    typeMessage: "",
    items: [],
    rcForm: [
      {
        logic: "",
        operation: "",
        attribute: "",
        choice: ""
      }
    ],
    type: "",
    stopIntent: false,
    message: "",
    attributesSelected: [],
    attrs: [],
    choices: [],
    rcs: [],
    selectedAttr: "",
    attrChoice: [[],[],[],[]]
  }),
  methods: {
    handleAttrValueAC(attr) {
      this.valueAttrs.forEach((a, i) => {
        if (a.attribute == attr) {
          this.attrChoice[this.countCodition - 1] = a.value.split(",");
        }
      });
      this.$forceUpdate()
    },
    handleSave() {
      const intentId = uuid();
      if (confirm("Did you type all input ?")) {
        if (true) this.loading = true;
        Axios.post(API + "/proxy/df/create/intent", {
          trainingPhrases: this.phraseTexts.map(phraseText => ({
            type: "EXAMPLE",
            parts: [
              {
                text: phraseText
              }
            ]
          })),
          displayName: this.displayName
        })
          .then(({ data }) => {
            Axios.post(API + "/proxy/fs/add", {
              collection: "IntentDetail",
              data: {
                attributes: this.items,
                responseCodition: this.rcs,
                intent: this.displayName
              }
            }).then(({ data }) => {
              console.log(data);
              this.loading = false;
              window.location.reload();
            });
          })
          .catch(err => {
            console.log(err.response.data);
          });
      }
    },
    addAttribute() {
      this.items.push({
        value: this.value,
        attribute: this.attribute
      });
      this.attribute = "";
      this.value = "";
      this.dialog = false;
    },
    addCondition() {
      if(this.type == "" || this.message == "") {
        return alert("Wrong input type and message is not empty")
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
      this.rcs.push({
        response: this.message,
        type: this.type,
        logics: this.logics,
        stopIntent: this.stopIntent
      });
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
      this.dialogRc = false;
      this.attributesSelected = [];
    },
    getAttributes() {
      this.r;
      return this.attributes;
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
    handlePhrase() {
      this.phraseTexts.push(this.phraseText);
      this.phraseText = "";
    }
  },
  created() {
    Axios.get(API + "/proxy/fs/document?collection=Attribute").then(
      ({ data: { data } }) => {
        this.attributes = data.map(d => d["attribute"]);
        this.bundleAttr.attributes = this.attributes;
        this.valueAttrs = data;
        this.bundleAttr.values = [];
      }
    );
  },
  watch: {
    selectedAttr(o, n) {
      this.rcForm[this.countCodition - 1].attribute = n;
      this.selectedAttr = "";
    },
    attribute: function(val) {
      this.bundleAttr.values = this.valueAttrs
        .filter(a => a["attribute"] == val)[0]
        ["value"].split(",");
    }
  },
  computed: {
    RCS() {
      return this.rcs;
    },
    attributesAC() {
      return this.attributes.map(a => {
        if (!this.attributesSelected.includes(a)) {
          return a;
        }
      });
    },
    ATTRCHOICE() {
      return this.attrChoice;
    },
    rules() {
      return [
        val => {
          return (
            !this.attributesSelected.includes(val) || `${val} has been selected`
          );
        }
      ];
    }
  }
};
</script>

<style>
</style>



