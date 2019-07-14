<template>
  <v-layout row wrap class="mt-3">
    <v-flex xs10 md10 lg10>
      <v-text-field v-model="displayName" label="Intent name"></v-text-field>
    </v-flex>
    <v-flex xs2 md2 lg2 class="mt-2 pl-2">
      <v-btn color="primary" block @click="handleSave">
        <v-icon>save</v-icon>Save
      </v-btn>
    </v-flex>
    <v-flex md12 lg12 xs12 class="mb-3">
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md10 lg10 xs10>
              <v-text-field label="Context"></v-text-field>
            </v-flex>
            <v-flex md2 lg2 xs2 class="mt-2 pl-2">
              <v-btn block color="primary">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
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
        <v-card-text v-for="(rc,i) in RCS" :key="i*100">
          <v-layout row wrap>
            <v-flex md12 lg12 xs12>
              <v-layout row wrap>
                <v-flex md3 lg3 xs3 v-for="(logic,i) in rc.logics.split(',')" :key="i * 100">
                  <v-layout v-if="i == 0">
                    <v-flex md6 lg6 xs6>
                      <v-text-field :value="'IF'"></v-text-field>
                    </v-flex>
                    <v-flex md6 lg6 xs6>
                      <v-text-field :value="logic"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-text-field v-else :value="logic"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md6 lg6 xs12 class="pl-3">
              <v-text-field :value="rc.type" label="type" disabled></v-text-field>
              <v-text-field box label="response message or block id" disabled :value="rc.response"></v-text-field>
            </v-flex>
          </v-layout>
          <div style="height:7px; background-color: darkturquoise;"></div>
          <br />
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
                    label="Attribute"
                    v-model="rcForm[i - 1].attribute"
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
                  <v-text-field label="Choice" v-model="rcForm[i - 1].choice"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md12 lg12 xs12>
              <v-spacer></v-spacer>
              <v-icon color="green" class="click" @click="addSubCondition">add</v-icon>
            </v-flex>
            <v-flex md3 lg3 xs3>
              <v-autocomplete :items="['text','block']" v-model="type"></v-autocomplete>
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
          <v-text-field v-model="attribute" label="attribute"></v-text-field>
          <v-text-field v-model="value" label="value"></v-text-field>
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
    dialogRc: false,
    attribute: "",
    value: "",
    dialog: false,
    bundleAttr: {
      attributes: [],
      values: []
    },
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
    message: "",
    attrs: [],
    choices: [],
    rcs: []
  }),
  methods: {
    handleSave() {
      const intentId = uuid();
      if (confirm("Did you type all input ?")) {
        if (true)
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
              });
            })
            .catch(err => {
              console.log(err.response.data);
            });
        console.log({
          attributes: this.items,
          responseCodition: this.rcs,
          intent: this.displayName
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
      console.log(this.countCodition);
      if (this.countCodition == 1) {
        this.logics =
          this.rcForm[this.countCodition - 1].attribute +
          "," +
          this.rcForm[this.countCodition - 1].operation +
          "," +
          this.rcForm[this.countCodition - 1].choice;
      }
      if (
        this.countCodition != 1 &&
        (this.rcForm[this.countCodition - 1].logic != "" ||
          this.rcForm[this.countCodition - 1].operation != "" ||
          this.rcForm[this.countCodition - 1].choice != "" ||
          this.rcForm[this.countCodition - 1].attribute != "")
      ) {
        this.logics +=
          "," +
          this.rcForm[this.countCodition - 1].logic +
          "," +
          this.rcForm[this.countCodition - 1].attribute +
          "," +
          this.rcForm[this.countCodition - 1].operation +
          "," +
          this.rcForm[this.countCodition - 1].choice;
      }
      this.rcs.push({
        response: this.message,
        type: this.type,
        logics: this.logics
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
      console.log(this.rcs);
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
          this.rcForm[this.countCodition - 1].choice;
      } else {
        this.logics +=
          "," +
          this.rcForm[this.countCodition - 1].logic +
          "," +
          this.rcForm[this.countCodition - 1].attribute +
          "," +
          this.rcForm[this.countCodition - 1].operation +
          "," +
          this.rcForm[this.countCodition - 1].choice;
      }
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
    },
    async autocompleteValues(displayName) {
      try {
        const {
          data: { data },
          status
        } = await Axios.get(API + "/proxy/df/get/entities");
        if (status != 200) {
          console.log("fail");
        } else {
          this.aValue = data
            .filter(d => d["displayName"] == displayName)[0]
            ["entities"].map(v => v["value"]);
        }
        console.log(this.aValue);
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  created() {
    Axios.get(API + "/proxy/fs/document?collection=Attribute").then(
      ({ data: { data } }) => {
        this.attributes = data.map(d => d["attribute"]);
        this.values = data.map(d => d["value"]);
        this.bundleAttr.attributes = this.attributes;
        this.bundleAttr.values = this.values;
      }
    );
  },
  computed: {
    RCS() {
      console.log("asdqeeqqwe");
      return this.rcs;
    }
  }
};
</script>

<style>
</style>



