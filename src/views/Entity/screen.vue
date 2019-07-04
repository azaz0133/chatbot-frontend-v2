<template>
  <v-container>
    <v-tabs v-model="tabActive" color="cyan" dark slider-color="yellow">
      <v-tab v-for="tab in ['Entities','Create']" :key="tab" ripple>{{tab}}</v-tab>
      <v-tab-item>
        <div v-if="isLoadingEntity" class="center_div">
          <div class="lds-hourglass"></div>
        </div>
        <expand-entities v-else class="mt-3" :entities="entities" />
      </v-tab-item>
      <v-tab-item>
        <create-entity></create-entity>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import Axios from "axios";
import { API } from "../../constant";
import ExpandEntities from "./components/expandEntity";
import CreateEntity from './components/create'
export default {
  components: {
    ExpandEntities,
    CreateEntity
  },
  data: () => ({
    tabActive: null,
    entities: [],
    isLoadingEntity: false
  }),
  created() {
    this.isLoadingEntity = true;
    Axios.get(API + "/proxy/df/get/entities").then(({ data: { data } }) => {
      this.entities = data;
      this.isLoadingEntity = false;
      console.log(data);
    });
  }
};
</script>

<style>
</style>
