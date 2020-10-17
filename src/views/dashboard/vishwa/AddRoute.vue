<template>
  <v-container id="user-profile" fluid tag="section">
    <v-snackbar v-model="snackbar" top right :color="color">
      {{ text }}
      <v-btn color="white" text @click="snackbar = false"> Ok </v-btn>
    </v-snackbar>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Add Route</div>

            <div class="subtitle-1 font-weight-light">Add Route Details</div>
          </template>

          <v-form
            @submit.prevent="savePost"
            ref="postData"
            lazy-validation
            enctype="multipart/form-data"
            autocomplete="off"
          >
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Route Name *"
                    required
                    v-model="routeData.name"
                  />
                </v-col>


                <v-col cols="12" md="6">
                  <v-text-field
                    label="Unit Price *"
                    required
                    class="purple-input"
                    v-model="routeData.price"
                    v-on:keypress="isNumber($event)"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-col cols="12">
                    <v-subheader v-bind:style="{ fontSize: '26px' }"
                      >Add Halts</v-subheader
                    >
                  </v-col>

                  <p v-for="(halt, m) in routeData.halts" :key="halt + m">
                    Name - {{ halt.haltName }} / Distance - {{halt.distance}} / Number - {{halt.haltNumber}}
                    <v-icon @click="deleteHalt('halt', m)" aria-label="Close"
                      >mdi-close</v-icon
                    >
                  </p>
                </v-col>

                <v-col cols="12" md="6"> </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Halt Name *"
                    required
                    v-model="routeData.hName"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Distance to Halt *"
                    required
                    v-model="routeData.hDistance"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Halt Number *"
                    required
                    v-model="routeData.hNumber"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-btn color="success" @click="createHalts()"
                    >Save Halt</v-btn
                  >
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" @click="createRoute()">
                    Add Route
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <base-material-card class="v-card-profile" icon="mdi-store" avatar="">
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">ROOM</h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              ROUTE DETAILS
            </h4>
            <p>{{routes.length}}</p>
            <p class="font-weight-light grey--text"></p>

            <v-btn color="success" rounded class="mr-0" to="/tables/allroutes">
              View All Routes
            </v-btn>

          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState, mapActions } from "vuex";
export default {

  data() {
    return {
    snackbar: false,
    text: "",
    color: "",
    rules: [(v) => !!v || 'Cannot be empty!'],

    irules: [(v) => v.length >= 1 || "Minimum length is 1 characters"],


    routeData: {
      name: "",
      price: "",
      hName: "",
      hDistance: "",
      hNumber: "",
      halts: [],
    },
    default: {
      name: "",
      price: "",
      hName: "",
      hNumber: "",
      halts: [],
    },

    }
  },

  computed: {

    ...mapState(["routes"]),

  },



  methods: {

    ...mapActions(["addStoreRoute"]),

    ...mapActions(["setRoutesAction"]),

    savePost: async function () {
      console.log("Hellloooooo");
    },

    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },


    addHalts() {

      this.routeData.halts.push({
          haltName: this.routeData.hName,
          distance: this.routeData.hDistance,
          haltNumber: this.routeData.hNumber,
        });


    },

    createHalts() {

      if(this.routeData.hName != '' && this.routeData.hDistance != '' && this.routeData.hNumber != ''){

        this.addHalts();
      }
      else {
        this.color = "red";
        this.text = "Halt Name, Distance and Halt Number canno't be empty";
        this.snackbar = true;
      }



    },

    deleteHalt(timeIndex) {
      this.routeData.halts.splice(timeIndex, 1);
    },

    createRoute() {
      const { name, price, halts } = this.routeData;

      const payload = {
        name,
        price,
        halts,
      };

      console.log("halts", payload.halts)

      if (
        this.routeData.price != "" &&
        this.routeData.name != ""
      ) {

        console.log("Hello");

        this.addStoreRoute(payload)
          .then(() => {
            this.routeData = {
              name: "",
              price: "",
              halts: [],
            };
            this.color = "success";
            this.text = "Route Details successfully saved";
            this.snackbar = true;
            this.setRoutesAction();
          })
          .catch((error) => {
            console.log(console.error());
          });
      } else {
        this.color = "red";
        this.text = "Fields marked * canno't be kept empty";
        this.snackbar = true;
      }
    },
  },


};
</script>
