<template>
  <v-container>
    <v-card>
      <v-layout row wrap class="pa-3">
        <v-flex xs12 md12 lg12 class="mb-4">
          <h1 class="title">Training</h1>
        </v-flex>
        <v-flex md3 lg3 xs3>
          <h3 class="subtitle">Message</h3>
        </v-flex>
        <v-flex md2 lg2 xs2></v-flex>
        <v-flex md3 lg3 xs3>
          <h3 class="subtitle">Intent</h3>
        </v-flex>
        <v-flex md1 lg1 xs1></v-flex>
        <v-flex md3 lg3 xs3>
          <h3 class="subtitle">Entity</h3>
        </v-flex>
        <v-flex md12 xs12 lg12 class="mt-3" v-for="i in 10" :key="i">
          <v-layout row wrap>
            <v-flex md3 lg3 xs3>
              <p
                class="font-weight-light"
              >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo nisi illum nobis, explicabo consequuntur reiciendis alias, nihil officia quis praesentium sit harum atque commodi rem pariatur aliquid ducimus culpa minima.</p>
            </v-flex>
            <v-flex md2 lg2 xs2></v-flex>
            <v-flex md3 lg3 xs3>
              <v-autocomplete label="Intent" :loading="loading.intents" :items="intents"></v-autocomplete>
            </v-flex>
            <v-flex md1 lg1 xs1></v-flex>
            <v-flex md3 lg3 xs3>
              <v-autocomplete label="Entity" :loading="loading.entities" :items="entities"></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import Axios from "axios";
import { API } from "../../constant";

export default {
  data: () => ({
    items: [],
    intents: [],
    entities: [],
    loading: {
        entities: false,
        intents: false
    }
  }),
  created() {
      this.loading.intents = true
      this.loading.entities = true
    Axios.get(API + "/proxy/get/intents").then(({ data: { data } }) => {
      this.intents = data.map(d => d["displayName"]);
      this.loading.intents = false
    });
    Axios.get(API + "/proxy/df/get/entities").then(({ data: { data } }) => {
      this.entities = data.map(d => d["displayName"]);
      this.loading.entities = false
    });
  }
};
</script>

<style>
</style>
