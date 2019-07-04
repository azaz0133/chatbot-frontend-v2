<template>
  <v-navigation-drawer v-model="drawer" app right width="350" class="blue-grey lighten-5">
    <v-layout row wrap justify-center>
      <v-flex md9 xs9 lg9 class="pt-2">
        <v-text-field v-model="message" class="ml-4" color="blue" box label="Type something..."></v-text-field>
      </v-flex>
      <v-flex md3 xs3 lg3 column class="pt-3">
        <v-btn  color="primary" style="display: inline-block;">
          <v-icon>search</v-icon>Test
        </v-btn>
      </v-flex>
      <v-flex md12 xs12 lg12>
        <v-card class="ma-3" color="cyan lighten-5">
          <v-divider color="grey"></v-divider>
          <v-card-text>
            <v-expansion-panel expand v-model="expand">
              <v-expansion-panel-content>
                <template v-slot:header>
                  <div class="headline">Detected</div>
                </template>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Intent</v-card-title>
                  <v-card-text>
                    <h4 class="sub-title success--text">{{'intent'}}</h4>
                  </v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Entity</v-card-title>
                  <v-card-text></v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-divider color="white"></v-divider>
              <v-expansion-panel-content>
                <template v-slot:header>
                  <div class="headline">All In Memories</div>
                </template>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Entity</v-card-title>
                  <v-card-text></v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Entity</v-card-title>
                  <v-card-text></v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
              </v-expansion-panel-content>
              <v-divider color="white"></v-divider>
              <v-expansion-panel-content>
                <template v-slot:header>
                  <div class="headline">Response</div>
                </template>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Response Text</v-card-title>
                  <v-card-text>
                    <v-card-text>
                      <h4 class="sub-title success--text">{{'textResponse'}}</h4>
                    </v-card-text>
                  </v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Type</v-card-title>
                  <v-card-text></v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
                <v-card>
                  <v-card-title class="title light-blue--text darken-2--text">Return</v-card-title>
                  <v-card-text></v-card-text>
                </v-card>
                <v-divider color="white" inset></v-divider>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-btn v-if="isExpanded" color="warning" class="black--text" @click="closeExpandAll">close</v-btn>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
export default {
  components: {},
  data: () => ({
    drawer: true,
    expand: [],
    isExpanded: false,
    message:""
  }),
  methods: {
    expandAll() {
      this.expand = [...Array(this.items).keys()].map(_ => true);
      this.isExpanded = true;
    },
    closeExpandAll() {
      this.expand = [...Array(this.items).keys()].map(_ => false);
      this.isExpanded = false;
    }
  }
};
</script>

<style>
.headermessage {
  text-align: center;
}
/* .action--button {
  position: absolute;
  top: 5em;
  right: 0;
} */
</style>
