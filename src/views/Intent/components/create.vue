<template>
  <v-layout row wrap class="mt-3">
    <v-flex xs10 md10 lg10>
      <v-text-field label="Intent name"></v-text-field>
    </v-flex>
    <v-flex xs2 md2 lg2 class="mt-2 pl-2">
      <v-btn color="primary" block>
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
            <v-flex xs12 md6 lg6 sm6 v-for="(item,i) in items" :key="i" class="pa-1">
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
        <Rc :data="rc" v-for="(rc,i) in rcs" :key="i"></Rc>
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
            <v-flex md3 xs3 lg3 class="pr-3">
              <v-autocomplete
                v-model="rcForm.logic"
                :items=" rcs.length == 0 ? ['IF'] : ['AND','OR']"
                :value="rcs.length == 0 && 'IF'"
              ></v-autocomplete>
            </v-flex>
            <v-flex md3 xs3 lg3 class="pr-3">
              <v-text-field label="Attribute" v-model="rcForm.attribute"></v-text-field>
            </v-flex>
            <v-flex md3 xs3 lg3 class="pr-3">
              <v-autocomplete
                :items="['IS','IS NOT','<','>']"
                v-model="rcForm.operation"
                label="Operator"
              ></v-autocomplete>
            </v-flex>
            <v-flex md3 xs3 lg3 class="pr-3">
              <v-text-field label="Choice" v-model="rcForm.choice"></v-text-field>
            </v-flex>
            <v-flex md3 lg3 xs3>
              <v-autocomplete :items="['text','block']" v-model="rcForm.type"></v-autocomplete>
            </v-flex>
            <v-flex md1 lg1 xs1></v-flex>
            <v-flex md8 lg8 xs8>
              <v-textarea box label="Response message or Block" v-model="rcForm.message"></v-textarea>
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
    phraseText: "",
    attributes: [],
    values: [],
    message: "",
    typeMessage: "",
    items: [],
    rcForm: {
      logic: "",
      operation: "",
      attribute: "",
      choice: "",
      type: "",
      message: ""
    },
    rcs: []
  }),
  methods: {
    addAttribute() {
      this.items.push({
        value: this.value,
        attribute: this.attribute
      });
      // Axios.post(API + "/proxy/fs/add").then(({ data: { data } }) => {

      // });
      this.attribute = "";
      this.value = "";
      this.dialog = false;
    },
    addCondition() {
      if (
        this.rcForm.logic == "" ||
        this.rcForm.operation == "" ||
        this.rcForm.choice == "" ||
        this.rcForm.attribute == "" ||
        this.rcForm.type == "" ||
        this.rcForm.message == ""
      ) {
        return alert("Wrong input");
      }
      this.rcs.push({
        logic: this.rcForm.logic,
        operator: this.rcForm.operation,
        choice: this.rcForm.choice,
        attribute: this.rcForm.attribute,
        type: this.rcForm.type,
        message: this.rcForm.message
      });
      this.rcForm.logic = "";
      this.rcForm.operation = "";
      this.rcForm.choice = "";
      this.rcForm.attribute = "";
      this.rcForm.type = "";
      this.rcForm.message = "";
      this.dialogRc = false;
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
      }
    );
  }
};
</script>

<style>
</style>



