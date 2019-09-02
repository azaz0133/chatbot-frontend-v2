import Vue from "vue";
import './plugins/vuetify'
import Notifications from 'vue-notification'
import App from "./App.vue";
import router from "./router";
import Chat from 'vue-beautiful-chat'

Vue.use(Chat)

Vue.config.productionTip = false;
Vue.use(Notifications)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");



// <v-flex md12 xs12 lg12>
//         <v-card>
//           <v-card-title class="headline">
//             Response & Condition
//             <v-spacer></v-spacer>
//             <v-btn @click="addCondition" fab top class="success">
//               <v-icon>add</v-icon>
//             </v-btn>
//           </v-card-title>
//           <v-card-text>
//             <v-layout row wrap v-for="(r,i) in cLen" :key="i">
//               <v-flex md3>
//                 <v-autocomplete
//                   box
//                   label="Logic"
//                   :disabled="resData[i].isAdd"
//                   :v-model="resData[i].login"
//                   :items=" i == 0 ? ['IF'] : ['AND','OR']"
//                   :value="i == 0 ? 'IF' : '' "
//                 ></v-autocomplete>
//               </v-flex>
//               <v-flex md3>
//                 <v-autocomplete
//                   box
//                   label="Attribute"
//                   :disabled="resData[i].isAdd"
//                   v-model="resData[i].entity"
//                   :items="aEntities"
//                   @change="autocompleteValues($event)"
//                 ></v-autocomplete>
//               </v-flex>
//               <v-flex md3>
//                 <v-autocomplete
//                   box
//                   label="Operation"
//                   :disabled="resData[i].isAdd"
//                   v-model="resData[i].operation"
//                   :items="['IS','IS NOT','<','>']"
//                 ></v-autocomplete>
//               </v-flex>
//               <v-flex md3>
//                 <v-autocomplete
//                   v-if="resData[i].value == ''"
//                   box
//                   label="Value"
//                   :disabled="resData[i].isAdd"
//                   :items="aValue"
//                   v-model="resData[i].value"
//                 ></v-autocomplete>
//                 <v-text-field
//                   v-else
//                   :value="resData[i].value"
//                   :disabled="resData[i].isAdd"
//                   box
//                   label="Value"
//                 ></v-text-field>
//               </v-flex>
//               <v-flex md12>
//                 <v-divider></v-divider>
//               </v-flex>
//             </v-layout>
//             <v-flex md12 class="mt-2">
//               <v-card>
//                 <v-card-title>
//                   <v-select
//                     :items="['text','block']"
//                     label="Message Type"
//                     v-model="typeMessage"
//                     solo
//                   ></v-select>
//                 </v-card-title>
//                 <v-card-text>
//                   <v-layout row wrap>
//                     <v-flex md12 lg12 xs12>
//                       <h4 class="sub-title text-xs-left">Response Message</h4>
//                     </v-flex>
//                     <v-textarea name="input-7-1" v-model="message" label="message" hint="Hint text"></v-textarea>
//                   </v-layout>
//                 </v-card-text>
//               </v-card>
//             </v-flex>
//           </v-card-text>
//         </v-card>
//       </v-flex>