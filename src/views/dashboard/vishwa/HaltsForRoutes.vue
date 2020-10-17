<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-btn to="/tables/addroute">Add Route</v-btn>

    <v-btn to="/tables/allroutes">View All Routes</v-btn>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-form
          @submit.prevent="saveHalt"
          ref="routeData"
          lazy-validation
          enctype="multipart/form-data"
          autocomplete="off"
        >
          <v-card-title>
            <span class="headline">Add halts</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Name"
                    v-model="routeData.hName"
                    :rules="inputRules"
                    color="#2C3A47"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Unit Price"
                    v-model="routeData.hDistance"
                    :rules="rules.required"
                    color="#2C3A47"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Halt Number"
                    v-model="routeData.hNumber"
                    :rules="rules.required"
                    color="#2C3A47"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <p v-for="(halt, m) in routeData.halts" :key="halt + m">
                    Name - {{ halt.haltName }} / Distance - {{ halt.distance }} / Number - {{ halt.haltNumber }}
                    <v-icon @click="deleteHalt('halt', m)" aria-label="Close"
                      >mdi-close</v-icon
                    >
                  </p>
                  <v-btn @click="insertHalts()">Add halt</v-btn>
                </v-flex>
                <v-flex> </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#2C3A47" dark @click="close" outlined small>
              <v-icon left>mdi-exit-to-app</v-icon> Close
            </v-btn>
            <v-btn
              color="light-green darken-4"
              dark
              type="submit"
              outlined
              small
            >
              <v-icon left>mdi-pencil</v-icon> Edit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <base-v-component heading="Simple Tables" link="components/simple-tables" />

    <v-snackbar v-model="snackbar" top right :color="color">
      {{ text }}
      <v-btn color="white" text @click="snackbar = false"> Ok </v-btn>
    </v-snackbar>

    <base-material-card
      icon="mdi-clipboard-text"
      title="Rooms"
      class="px-5 py-3"
    >
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon=""
          label="Search"
          single-line
          hide-details
          color="#2C3A47"
        >
        </v-text-field>
      </v-card-title>

      <v-data-table
        item-key="id"
        :headers="headers"
        :items="routes"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="success" @click="editHalt(item)" outlined>
            Edit halts
          </v-btn>
        </template>
      </v-data-table>
    </base-material-card>

    <base-material-card
      icon="mdi-clipboard-text"
      title="Halts"
      class="px-5 py-3"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text>
              <base-subheading subheading="Halts" />

              <template v-for="c in routes">
                <base-material-alert
                  color="secondary"
                  dark
                  v-for="halt in c.halts"
                  :key="c.slug + halt"
                >
                  Halt Name  - {{ halt.haltName }} / Halt Distance - {{ halt.distance }} / Halt Number - {{ halt.haltNumber }}
                </base-material-alert>
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  data() {

    return {
      snackbar: false,
      search: "",
      text: "",
      color: "",
      dialog: false,

      inputRules: [],

      rules: {
        required: [(value) => !!value || "Required."],
      },

      min: false,
      dialog: false,
      fab: false,
      posts: [],
      headers: [
        { text: "Name", value: "name", sortable: true },
        { text: "Price", value: "price", sortable: false },
        { text: "Action", value: "actions", sortable: true, with: "180px" },
      ],

      routeData: {
        hName: "",
        hDistance: "",
        hNumber: "",
      },
      default: {
        hName: "",
        hDistance: "",
        hNumber: "",
      },
      editedIndex: -1,
    };
  },

  computed: {
    ...mapState(["routes"]),
  },

  methods: {
    ...mapActions(["setHaltsByRoomAction"]),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.routeData = Object.assign({}, this.default);
        this.editedIndex = -1;
      }, 3000000);
    },

    loadHalts: async function() {
      const slug = this.$route.params.slug;
      this.setHaltsByRoomAction(slug);
    },

    onChange(e) {
      this.routeData.building = e.target.value;
    },

    saveHalt: async function() {
      this.updateHalt();
    },

    editHalt(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.routeData = Object.assign({}, item);
      this.dialog = true;
    },

    addHalts() {
      console.log("RoomTimes", this.routes[0]);
      this.routes[0].halts.push({
        haltName: this.routeData.hName,
        distance: this.routeData.hDistance,
        haltNumber: this.routeData.hNumber,
      });

      this.routeData.hName = "";
      this.routeData.hDistance = "";
    },

    deleteHalt(timeIndex) {
      this.routeData.halts.splice(timeIndex, 1);
    },

    insertHalts() {
      if (
        this.routeData.hName != "" &&
        this.routeData.hDistance != "" &&
        this.routeData.hNumber != "" &&
        this.routeData.hName != undefined &&
        this.routeData.hDistance != undefined &&
        this.routeData.hNumber != undefined
      ) {
        this.addHalts();
      } else {
        this.color = "red";
        this.text = "Halt Name or Distance canno't be empty";
        this.snackbar = true;
      }
    },

    updateHalt() {
      let apiURL = `http://localhost:8000/api/updateRoute/${this.routeData._id}`;
      axios
        .post(apiURL, this.routeData)
        .then((res) => {
          console.log(res);
          this.close();
          this.loadHalts();
          this.color = "info";
          this.text = "Halts have been updated";
          this.snackbar = true;
        })
        .catch((error) => {
          console.log(error);
          console.log(this.$route.params.id);
        });
    },
  },

  created() {
    const slug = this.$route.params.slug;
    this.setHaltsByRoomAction(slug);
  },
};
</script>
