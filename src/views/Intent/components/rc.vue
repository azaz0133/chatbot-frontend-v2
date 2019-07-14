<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex md12 lg12 xs12>
        <!-- <v-layout row wrap v-for="(logic,i) in dataRc.logics.split(',')" :key="i"> -->
          <!-- <v-flex md3 lg3 xs3 class="pr-2"> -->
            <!-- <v-text-field v-if="i==0" :value="'IF'" disabled></v-text-field> -->
            <!-- <v-text-field :value="logic" disabled></v-text-field> -->
          <!-- </v-flex> -->
          <!-- <v-flex md4 lg4 xs4 class="pr-2">
            <v-text-field :value="dataRc.logics.split(',')[i]" disabled></v-text-field>
          </v-flex>
          <v-flex md2 lg2 xs2 class="pr-2">
            <v-text-field :value="dataRc.logics.split(',')[i]" disabled></v-text-field>
          </v-flex>
          <v-flex md5 lg5 xs5 class="pr-2">
            <v-text-field :value="dataRc.logics.split(',')[i]" disabled></v-text-field>
          </v-flex> -->
        <!-- </v-layout> -->
      </v-flex>
      <v-flex md6 lg6 xs12 class="pl-3">
        <v-text-field :value="dataRc.type" label="type" disabled></v-text-field>
        <v-text-field box label="response message or block id" disabled :value="dataRc.response"></v-text-field>
      </v-flex>
    </v-layout>
    <div style="height:7px; background-color: darkturquoise;"></div>
    <br />
  </v-card-text>
</template>

<script>
export default {
  props: ["color", "dataRc"],
  // watch: {
  //   dataRc: function(old,newO){
  //   this.condis = "IF," + this.dataRc.logics;
  //   }
  // },
};
</script>

<style>
</style>
