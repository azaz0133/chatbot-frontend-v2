<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex md12 lg12 xs12>
        <v-layout row wrap>
          <v-flex md1 lg1 xs1 class="pr-2">
            <v-text-field :value="data.logic" disabled></v-text-field>
          </v-flex>
          <v-flex md4 lg4 xs4 class="pr-2">
            <v-text-field :value="data.attribute" disabled></v-text-field>
          </v-flex>
          <v-flex md2 lg2 xs2 class="pr-2">
            <v-text-field :value="data.operator" disabled></v-text-field>
          </v-flex>
          <v-flex md5 lg5 xs5 class="pr-2">
            <v-text-field :value="data.choice" disabled></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md6 lg6 xs12 class="pl-3">
        <v-text-field :value="data.type" label="type" disabled></v-text-field>
        <v-text-field box label="response message or block id" disabled :value="data.message"></v-text-field>
      </v-flex>
    </v-layout>
    <div style="height:7px; background-color: darkturquoise;"></div>
    <br />
  </v-card-text>
</template>

<script>
export default {
  props: ["color", "data"]
};
</script>

<style>
</style>
