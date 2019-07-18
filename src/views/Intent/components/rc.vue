<template>
  <v-card class="ma-4" dark>
    <v-card-text>
      <v-layout row wrap>
        <v-flex md12 lg12 xs12>
          <v-layout row wrap>
            <v-flex md3 lg3 xs3 class="pr-2" v-for="(logic,i) in logics" :key="i">
              <v-text-field :value="logic" disabled></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md6 lg6 xs12 class="pl-3">
          <v-text-field :value="dataRc.type" label="type" disabled></v-text-field>
          <v-text-field box label="response message or block id" disabled :value="dataRc.response"></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["color", "dataRc"],
  data: () => ({
    logics: ""
  }),
  created() {
    let c = "IF," + this.dataRc.logics;
    this.logics = c.split(",");
    console.log(" asdasd " + this.logics);
  },
  watch: {
    dataRc: function(val) {
      console.log("21321231321231");
      let c = "IF," + val.logics;
      this.logics = c.split(",");
      console.log(" asdasd " + this.logics);
    }
  }
};
</script>

<style>
</style>
