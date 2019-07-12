<template>
  <v-container>
    <v-tabs v-model="tabActive" color="cyan" dark slider-color="yellow">
      <v-tab v-for="tab in ['Attributes']" :key="tab" ripple>{{tab}}</v-tab>
      <v-tab-item>
        <div v-if="isLoadingCreate" class="center_div">
          <div class="lds-hourglass"></div>
        </div>
        <v-btn absolute dark fab top right color="purple" @click="dialogCreate = true">
          <v-icon large>add</v-icon>
        </v-btn>
        <v-layout row wrap class="mt-3">
          <v-flex md3 lg3 xs12 v-for="(item,index) in items" :key="item['attribure']">
            <v-card class="ma-2">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex md5 lg5 xs5>
                    <h class="subtitle primary--text">Attribute</h>
                  </v-flex>
                  <v-flex md5 lg5 xs5>
                    <h4 class="subtitle success--text">Value</h4>
                  </v-flex>
                  <v-flex md1 lg1 xs1>
                    <v-icon size="15" class="click" color="warning" @click="edit(index)">edit</v-icon>
                  </v-flex>
                  <v-flex md1 lg1 xs1>
                    <v-icon size="15" class="click" color="error" @click="del(item,index)">delete</v-icon>
                  </v-flex>
                  <v-flex md5 lg5 xs5>{{item['attribute']}}</v-flex>
                  <v-flex md6 lg6 xs6>{{item['value']}}</v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="dialogCreate" max-width="290">
      <v-card>
        <v-card-title class="headline">Create New Attribute</v-card-title>
        <v-card-text v-if="isLoadingCreate">
          <div class="center_div">
            <div class="lds-hourglass"></div>
          </div>
        </v-card-text>
        <v-card-text v-else>
          <v-text-field v-model="attribute" label="attribute"></v-text-field>
          <v-text-field v-model="value" label="value"></v-text-field>
        </v-card-text>
        <v-card-actions v-show="!isLoadingCreate">
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click="disagree">Disagree</v-btn>
          <v-btn color="primary darken-1" @click="agree">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" max-width="290">
      <v-card>
        <v-card-title class="headline">Edit Attribute</v-card-title>
        <v-card-text v-if="isLoadingCreate">
          <div class="center_div">
            <div class="lds-hourglass"></div>
          </div>
        </v-card-text>
        <v-card-text v-else>
          <v-text-field v-model="attribute" label="attribute"></v-text-field>
          <v-text-field v-model="value" label="value"></v-text-field>
        </v-card-text>
        <v-card-actions v-show="!isLoadingCreate">
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="dialogEdit = false; attribute=''; value = '';"
          >Disagree</v-btn>
          <v-btn color="primary darken-1" @click="agreeEdit()">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Axios from "axios";
import { API } from "../../constant";
export default {
  data: () => ({
    tabActive: null,
    dialogCreate: false,
    dialogEdit: false,
    attribute: "",
    value: "",
    isLoadingCreate: false,
    items: [],
    indexEdit:""
  }),
  created() {
    this.isLoadingCreate = true
    Axios.get(API + "/proxy/fs/document?collection=Attribute").then(
      ({ data: { data } }) => {
        this.items = data;
        this.isLoadingCreate = false;
      }
    );
  },
  methods: {
    del(data, index) {
      if (!confirm("Are you sure ??")) {
      } else {
        Axios.post(API + "/proxy/fs/delete/document", {
          collection: "Attribute",
          document: data.id
        })
          .then(({ data }) => {
            console.log(data);
            this.items.splice(index, 1);
          })
          .catch(err => {
            console.log(err.response.data);
          });
      }
    },
    disagree() {
      this.dialogCreate = false;
      this.attribute = "";
      this.value = "";
    },
    agree() {
      this.isLoadingCreate = true;
      Axios.post(API + "/proxy/fs/add", {
        collection: "Attribute",
        data: {
          attribute: this.attribute,
          value: this.value
        }
      })
        .then(({ data }) => {
          this.items.push({
            attribute: this.attribute,
            value: this.value
          });
          this.dialogCreate = false;
          this.attribute = "";
          this.value = "";
          console.log(data);
          this.isLoadingCreate = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoadingCreate = false;
        });
    },
    edit(index) {
      this.indexEdit = index
      this.attribute = this.items[index].attribute;
      this.value = this.items[index].value;
      this.dialogEdit = true;
    },
    agreeEdit() {
      Axios.post(API + "/proxy/fs/update", {
        collection: "Attribute",
        document: this.items[this.indexEdit].id,
        data: {
          attribute: this.attribute,
          value: this.value
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.items[this.indexEdit].attribute = this.attribute
          this.items[this.indexEdit].value = this.value
          this.value = "";
          this.attribute = "";
          this.dialogEdit = false;
        })
        .catch(err => {
          console.log(err.response.data);
          this.value = "";
          this.attribute = "";
          this.dialogEdit = false;
        });
    }
  }
};
</script>

<style>
.click {
  cursor: pointer;
}
</style>
