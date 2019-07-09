<template>
  <div v-if="isLoading" class="center_div">
    <div class="lds-hourglass"></div>
  </div>
  <v-layout row wrap class="pa-3" v-else>
    <v-flex md10 xs10 lg10>
      <v-text-field v-model="displayName" label="Entity name"></v-text-field>
    </v-flex>
    <v-flex md2 xs2 lg2>
      <v-btn class="mt-2 ml-2 light-blue accent-3" block @click="handleSave">
        <v-icon>save</v-icon>Save
      </v-btn>
    </v-flex>
    <v-flex md4 lg4 xs4>
      <h2 class="display-1 text-xs-center green--text">Correct Value</h2>
    </v-flex>
    <v-flex md1 lg1 xs1></v-flex>
    <v-flex md7 lg7 xs7>
      <h2 class="display-1 text-xs-center green--text">Synonyms Value</h2>
    </v-flex>
    <v-flex md12 lg12 xs12>
      <v-layout row wrap>
        <v-flex md4 lg4 xs4>
          <v-text-field v-model="correctValue" box label="value"></v-text-field>
        </v-flex>
        <v-flex md1 lg1 xs1></v-flex>
        <v-flex md7 lg7 xs7>
          <v-text-field
            v-model="synonymsValue"
            box
            label="synonyms"
            hint="you can put more than one word by seperate the word by ',' "
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md12 lg12 xs12 v-for="item in itemsAdd" :key="item['value']" class="mt-2">
      <v-layout row wrap>
        <v-flex md4 lg4 xs4>
          <h2 class="subtitle">{{item['value']}}</h2>
        </v-flex>
        <v-flex md1 lg1 xs1></v-flex>
        <v-flex md7 lg7 xs7>
          <h2 class="subtitle">{{item['synonyms']}}</h2>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-btn color="primary" @click="handleAdd">add</v-btn>
  </v-layout>
</template>
<script>
import Axios from "axios";
import { API } from "../../../constant";
export default {
  data: () => ({
    itemsAdd: [],
    displayName: "",
    correctValue: "",
    synonymsValue: "",
    isLoading: false
  }),
  methods: {
    handleAdd() {
      if (this.synonymsValue == "" || this.correctValue == "") {
        return alert("Wrong input");
      }
      this.synonymsValue = this.synonymsValue + "," + this.correctValue
      this.itemsAdd.push({
        value: this.correctValue,
        synonyms: this.synonymsValue.split(",")
      });
      this.correctValue = "";
      this.synonymsValue = "";
    },
    handleSave() {
      if (this.itemsAdd.length == 0 || this.displayName == "") {
        if (this.itemsAdd.length == 0) {
          return alert("Add value first");
        }
        return alert("entity name is not empty");
      }
      this.isLoading = true;
      Axios.post(API + "/proxy/df/create/entity", {
        displayName: this.displayName,
        entities: this.itemsAdd
      }).then(({ data: { data } }) => {
        this.itemsAdd = [];
        this.displayName = "";
        this.isLoading = false;
      });
    }
  }
};
</script>

<style>
</style>
