<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-btn to="/tables/addinspector">Add Inspector</v-btn>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-form
          @submit.prevent="saveInspector"
          ref="inspectorData"
          lazy-validation
          enctype="multipart/form-data"
          autocomplete="off"
        >
          <v-card-title>
            <span class="headline">Edit Inspector</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Name"
                    v-model="inspectorData.name"
                    :rules="inputRules"
                    color="#2C3A47"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Password"
                    v-model="inspectorData.password"
                    :rules="rules.required"
                    color="#2C3A47"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="availableRoutess"
                    label="Select Route"
                    v-model="inspectorData.route"
                    outlined
                  ></v-select>
                </v-flex>
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
      <v-btn color="white" text @click="snackbar = false">
        Ok
      </v-btn>
    </v-snackbar>

    <base-material-card
      icon="mdi-clipboard-text"
      title="Inspectors"
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
        :items="posts"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            color="success"
            class="mx-2"
            fab
            x-small
            @click="editInspector(item)"
            outlined
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            color="pink"
            fab
            x-small
            @click="deleteInspector(item._id)"
            outlined
          >
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>
<script>
import axios from "axios";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  data: () => ({
    snackbar: false,
    search: "",
    text: "",
    color: "",
    dialog: false,

    inputRules: [(v) => v.length >= 2 || "Minimum length is 2 characters"],

    inputNumRules: [(v) => v.length >= 1 || "Minimum length is 1 characters"],

    rules: {
      required: [(value) => !!value || "Required."],
    },

    min: false,
    dialog: false,
    fab: false,
    posts: [],
    headers: [
      { text: "Name", value: "name", sortable: true },
      { text: "Password", value: "password", sortable: false },
      { text: "Route", value: "route", sortable: false },
      { text: "Action", value: "actions", sortable: true, with: "180px" },
    ],

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
    editedIndex: -1,
  }),

  computed: {
    ...mapState(["routes"]),

    availableRoutess() {
      let routes = this.routes;
      console.log("routes", routes);
      let selectRoutess = [];
      for (var i = 0; i < routes.length; i++) {
        selectRoutess.push(routes[i].name);
      }
      return selectRoutess;
    },
  },

  mounted() {
    this.loadInspectors();
  },

  methods: {
    ...mapActions(["setRoutesAction"]),

    ...mapActions(["setInspectorsAction"]),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.inspectorData = Object.assign({}, this.default);
        this.editedIndex = -1;
      }, 3000000);
    },

    loadInspectors: async function() {
      console.log("Loading...");

      let apiURL = "http://localhost:8000/api/viewInspectors";
      axios
        .get(apiURL)
        .then((res) => {
          this.posts = res.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.setInspectorsAction();
    },

    saveInspector: async function() {
      this.updateInspector();
    },

    editInspector(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.inspectorData = Object.assign({}, item);
      this.dialog = true;
    },

    updateInspector() {
      if (
        this.$refs.inspectorData.validate() &&
        this.inspectorData.route != ""
      ) {
        let apiURL = `http://localhost:8000/api/updateInspectors/${this.inspectorData._id}`;
        axios
          .post(apiURL, this.inspectorData)
          .then((res) => {
            console.log(res);
            this.close();
            this.loadInspectors();
            this.color = "info";
            this.text = "Inspector has been updated";
            this.snackbar = true;
          })
          .catch((error) => {
            console.log(error);
            console.log(this.$route.params.id);
          });
      } else {
        this.color = "red";
        this.text = "All fields are mandatory";
        this.snackbar = true;
      }
    },

    deleteInspector(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You will not be able to undo this action",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00b894",
        cancelButtonColor: "#d63031",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          try {
            let apiURL = `http://localhost:8000/api/deleteInspector/${id}`;
            let indexOfArrayItem = this.posts.findIndex((i) => i._id === id);
            axios
              .delete(apiURL)
              .then(() => {
                this.posts.splice(indexOfArrayItem, 1);
              })
              .catch((error) => {
                console.log(error);
              });
            this.$swal("Deleted!", "Inspector has been deleted", "success");
            this.color = "error";
            this.text = "Inpector has been deleted";
            this.snackbar = true;
          } catch (error) {
            this.$swal("Failed", "There was something wrong", "warning");
          }
        }
      });
    },
  },

  created() {
    this.setRoutesAction();
  },
};
</script>
