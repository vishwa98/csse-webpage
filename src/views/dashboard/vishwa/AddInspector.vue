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
            <div class="display-2 font-weight-light">Add Inspector</div>

            <div class="subtitle-1 font-weight-light">
              Add Inspector Details
            </div>
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
                    label="Inspector Name *"
                    required
                    v-model="inspectorData.name"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Inspector Password *"
                    required
                    v-model="inspectorData.password"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    :items="availableRoutes"
                    label="Select Route *"
                    required
                    v-model="inspectorData.route"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="createInspector()"
                  >
                    Add Inspector
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
              INSPECTOR DETAILS
            </h4>
            <p>{{ inspectors.length }}</p>
            <p class="font-weight-light grey--text"></p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
              to="/tables/allinspectors"
            >
              View All Inspectors
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
      rules: [(v) => !!v || "Cannot be empty!"],

      irules: [(v) => v.length >= 1 || "Minimum length is 1 characters"],

      inspectorData: {
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
    ...mapState(["routes"]),

    ...mapState(["inspectors"]),

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
    ...mapActions(["addStoreInspector"]),

    ...mapActions(["setRoutesAction"]),

    ...mapActions(["setInspectorsAction"]),

    savePost: async function() {
      console.log("Hellloooooo");
    },

    createInspector() {
      const { name, password, route } = this.inspectorData;

      const payload = {
        name,
        password,
        route,
      };

      if (
        this.inspectorData.route != "" &&
        this.inspectorData.password != "" &&
        this.inspectorData.name != ""
      ) {
        this.addStoreInspector(payload)
          .then(() => {
            this.inspectorData = {
              name: "",
              password: "",
              route: "",
            };
            this.color = "success";
            this.text = "Inspector Details successfully saved";
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
  },

  created() {
    this.setRoutesAction();
  },
};
</script>
