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
            <div class="display-2 font-weight-light">Drivers</div>

            <div class="subtitle-1 font-weight-light">Add Driver Details</div>
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
                    label="Driver Name *"
                    required
                    v-model="driverData.name"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Driver Password *"
                    required
                    v-model="driverData.password"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    :items="availableRoutes"
                    label="Select Route *"
                    required
                    v-model="driverData.route"
                    outlined
                  ></v-select>
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" @click="createDriver()">
                    Add Driver
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
            <h6 class="display-1 mb-1 grey--text">Drivers</h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              DRIVER COUNT
            </h4>

            <p class="font-weight-light grey--text"></p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
              to="/tables/alldrivers"
            >
              View All Drivers
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
      menu2: false,
      snackbar: false,
      text: "",
      color: "",
      rules: [(v) => !!v || "Cannot be empty!"],

      irules: [(v) => v.length >= 1 || "Minimum length is 1 characters"],

      driverData: {
        name: "",
        password: "",
        route: "",
      },
      default: {
        name: "",
        password: "",
        route: "",
      },
    };
  },

  computed: {
    ...mapState(["drivers"]),

    ...mapState(["routes"]),

    availableRoutes() {
      let routes = this.routes;
      console.log("routes", routes);
      let selectRoutess = [];
      for (var i = 0; i < routes.length; i++) {
        selectRoutess.push(routes[i].name);
      }
      return selectRoutess;
    },
  },

  methods: {
    ...mapActions(["addStoreDriver"]),

    ...mapActions(["setRoutesAction"]),

    savePost: async function() {
      console.log("Hellloooooo");
    },

    createDriver() {
      const { name, password, route } = this.driverData;

      const payload = {
        name,
        password,
        route,
      };

      console.log("name", payload.name);
      console.log("password", payload.password);

      if (this.driverData.password != "" && this.driverData.name != "" && this.driverData.route != "") {
        this.addStoreDriver(payload)
          .then(() => {
            this.driverData = {
              name: "",
              password: "",
              route: "",
            };
            this.color = "success";
            this.text = "Driver Details successfully saved";
            this.snackbar = true;
            this.setInspectorsAction();
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

    created() {
    console.log(this.routes);

    this.setRoutesAction();
  },

  },
};
</script>
