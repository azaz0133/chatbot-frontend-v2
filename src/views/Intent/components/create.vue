<template>
  <v-layout row wrap>
    <v-flex xs10 md10 lg10>
      <v-text-field label="Intent name"></v-text-field>
    </v-flex>
    <v-flex xs2 md2 lg2 class="mt-2 pl-2">
      <v-btn color="primary" block>
        <v-icon>save</v-icon>Save
      </v-btn>
    </v-flex>
    <v-flex md12 lg12 xs12 class="pa-1">
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
    <br />
    <v-layout row wrap>
      <v-flex md12 xs12 lg12>
        <v-card>
          <v-card-title class="headline">Response & Condition</v-card-title>
          <v-card-text>
            <v-btn @click="addCondition" class="primary">ADD</v-btn>
            <v-layout row wrap v-for="(r,i) in cLen" :key="i">
              <v-flex md3>
                <v-autocomplete
                  box
                  label="Logic"
                  :disabled="resData[i].isAdd"
                  :v-model="resData[i].login"
                  :items=" i == 0 ? ['IF'] : ['AND','OR']"
                  :value="i == 0 ? 'IF' : '' "
                ></v-autocomplete>
              </v-flex>
              <v-flex md3>
                <v-autocomplete
                  box
                  label="Entity"
                  :disabled="resData[i].isAdd"
                  v-model="resData[i].entity"
                  :items="aEntities"
                  @change="autocompleteValues($event)"
                ></v-autocomplete>
              </v-flex>
              <v-flex md3>
                <v-autocomplete
                  box
                  label="Operation"
                  :disabled="resData[i].isAdd"
                  v-model="resData[i].operation"
                  :items="['IS','IS NOT','<','>']"
                ></v-autocomplete>
              </v-flex>
              <v-flex md3>
                <v-autocomplete
                  v-if="resData[i].value == ''"
                  box
                  label="Value"
                  :disabled="resData[i].isAdd"
                  :items="aValue"
                  v-model="resData[i].value"
                ></v-autocomplete>
                <v-text-field
                  v-else
                  :value="resData[i].value"
                  :disabled="resData[i].isAdd"
                  box
                  label="Value"
                ></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <v-flex md12 class="mt-2">
              <v-card>
                <v-card-title>
                  <v-select
                    :items="['text','block']"
                    label="Message Type"
                    v-model="typeMessage"
                    solo
                  ></v-select>
                </v-card-title>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex md12 lg12 xs12>
                      <h4 class="sub-title text-xs-left">Response Message</h4>
                    </v-flex>
                    <v-textarea name="input-7-1" v-model="message" label="message" hint="Hint text"></v-textarea>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import Axios from "axios";
import { API } from '../../../constant'
export default {
  data: () => ({
    phraseTexts: [],
    phraseText: "",
    resData: [
      {
        logic: "IF",
        entity: "",
        operation: "",
        value: "",
        isAdd: false
      }
    ],
    len: 1,
    message: "",
    typeMessage: "",
    aEntities: [],
    aValue: []
  }),
  methods: {
    handlePhrase() {
      this.phraseTexts.push(this.phraseText);
      this.phraseText = "";
    },
    addCondition() {
      this.resData[this.resData.length - 1].isAdd = true;
      this.resData.push({
        logic: "",
        entity: "",
        operation: "",
        value: "",
        isAdd: false
      });
      ++this.len;
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
    Axios.get(API + "/proxy/df/get/entities").then(({ data: { data } }) => {
      this.aEntities = data.map(d => d["displayName"]);
    });
  },
  computed: {
    cLen() {
      return this.len;
    }
  }
};
</script>

<style>
</style>
