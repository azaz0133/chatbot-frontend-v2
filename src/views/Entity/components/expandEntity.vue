<template>
  <v-expansion-panel>
    <v-layout row wrap>
      <v-flex lg6 md6 xs6 v-for="(entity,i) in entities" :key="i">
        <v-expansion-panel-content :class=" i%2 !== 0 ? 'ml-2' :''">
          <template v-slot:header>
            <div>
              {{entity['displayName']}}
              <v-icon
                color="error"
                class="click"
                @click="deleteEntity(entity['displayName'])"
              >delete</v-icon>
            </div>
          </template>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex md12 lg12 xs12 v-for="(en, index) in entity['entities']" :key="index">
                  <v-layout row wrap>
                    <v-flex md3 lg3 xs3 class="pr-4">
                      <v-text-field
                        label="entity name"
                        @change.native="handleEntity"
                        :value="en['value']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md7 lg7 xs7>
                      <v-text-field
                        label="synonyms"
                        @change.native="handleSynonyms"
                        :value="en['synonyms']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md1 lg1 xs1 class="pt-4 pl-4">
                      <v-icon
                        color="warning"
                        class="click"
                        @click="updateEntity(entity,en,index)"
                      >edit</v-icon>
                    </v-flex>
                    <v-flex md1 lg1 xs1 class="pt-4 pl-4">
                      <v-icon
                        color="error"
                        class="click"
                        @click="deleteSubEntity(entity['displayName'],entity,index)"
                      >delete</v-icon>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-flex>
    </v-layout>
  </v-expansion-panel>
</template>

<script>
import Axios from "axios";
import { API } from "../../../constant";
export default {
  props: {
    entities: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    test: null,
    entityName: "",
    synonyms: []
  }),
  updated() {
    console.log(this.test);
  },
  methods: {
    handleSynonyms({ target: { value } }) {
      this.synonyms = value.split(",");
      console.log(this.synonyms);
    },
    handleEntity({ target: { value } }) {
      this.entityName = value;
    },
    updateEntity(entityOld, en, index) {
      if (this.entityName == "" && this.synonyms.length == 0) {
        return alert("Wrong input");
      }
      if (this.entityName == "") {
        this.entityName = en["value"];
      }
      if (this.synonyms.length == 0) {
        this.synonyms = en["synonyms"];
      }

      entityOld["entities"][index].value = this.entityName;
      entityOld["entities"][index].synonyms = this.synonyms;

      const entities = entityOld["entities"];

      Axios.post(API + "/proxy/df/update/entity", {
        displayName: entityOld["displayName"],
        entities
      })
        .then(({ data: { data } }) => {
          console.log(data);
          alert("Updated");
          window.location.reload();
        })
        .catch(err => {
          console.log(err.response.data);
        });
      this.entityName = "";
      this.synonyms = [];
    },
    deleteSubEntity(displayName, entity, index) {
      if (confirm("Delete ?")) {
        entity["entities"].splice(index, 1);
        Axios.post(API + "/proxy/df/update/entity", {
          displayName,
          entities: entity["entities"]
        })
          .then(({ data: { data } }) => {
            console.log(data);
            alert("Updated");
            window.location.reload();
          })
          .catch(err => {
            console.log(err.response.data);
          });
      }
    },
    deleteEntity(displayName) {
      if (confirm("Delete Entity ?")) {
        this.entities.filter(e => e["displayName"] != displayName);
        Axios.post(API + "/proxy/df/delete/entity", { displayName }).then(
          ({ data: { data } }) => {
            // console.log(data);
            alert("deleted");
            window.location.reload();
          }
        );
      }
    }
  }
};
</script>

<style>
.click {
  cursor: pointer;
}
</style>
