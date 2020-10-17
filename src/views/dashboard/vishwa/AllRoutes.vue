<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-btn to="/tables/addroute">Add Routes</v-btn>



    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-form
          @submit.prevent="savePost"
          ref="routeData"
          lazy-validation
          enctype="multipart/form-data"
          autocomplete="off"
        >
          <v-card-title>
            <span class="headline">Edit Route</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Name"
                    v-model="routeData.name"
                    :rules="inputRules"
                    color="#2C3A47"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Unit Price"
                    v-model="routeData.price"
                    :rules="rules.required"
                    color="#2C3A47"
                  ></v-text-field>
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
      title="Routes"
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
          <router-link class="nav-link" :to="'/halts/' + item.slug"
            >View halts</router-link
          >
          <v-btn
            color="success"
            class="mx-2"
            fab
            x-small
            @click="editPost(item)"
            outlined
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            color="pink"
            fab
            x-small
            @click="deletePost(item._id)"
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
      { text: "Price per unit", value: "price", sortable: false },
      { text: "Action", value: "actions", sortable: true, with: "180px" },
    ],

    routeData: {
      name: "",
      price: "",
    },
    default: {
      name: "",
      price: "",
    },
    editedIndex: -1,
  }),

  computed: {},

  mounted() {
    this.loadRoutes();
  },

  methods: {
    ...mapActions(["setRoutesAction"]),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.routeData = Object.assign({}, this.default);
        this.editedIndex = -1;
      }, 3000000);
    },

    loadRoutes: async function() {
      let apiURL = "http://localhost:8000/api/viewRoutes";
      axios
        .get(apiURL)
        .then((res) => {
          this.posts = res.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.setRoutesAction();
    },

    onChange(e) {
      this.routeData.building = e.target.value;
    },

    savePost: async function() {
      this.updatePost();
    },

    editPost(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.routeData = Object.assign({}, item);
      this.dialog = true;
    },

    updatePost() {
      if (this.$refs.routeData.validate() && this.routeData.building != "") {
        let apiURL = `http://localhost:8000/api/updateRoute/${this.routeData._id}`;
        axios
          .post(apiURL, this.routeData)
          .then((res) => {
            console.log(res);
            this.close();
            this.loadRoutes();
            this.color = "info";
            this.text = "Route has been updated";
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

    deletePost(id) {
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
            let apiURL = `http://localhost:8000/api/deleteRoute/${id}`;
            let indexOfArrayItem = this.posts.findIndex((i) => i._id === id);
            axios
              .delete(apiURL)
              .then(() => {
                this.posts.splice(indexOfArrayItem, 1);
              })
              .catch((error) => {
                console.log(error);
              });
            this.$swal("Deleted!", "Route has been deleted", "success");
            this.color = "error";
            this.text = "Route has been deleted";
            this.snackbar = true;
          } catch (error) {
            this.$swal("Failed", "There was something wrong", "warning");
          }
        }
      });
    },
  },
};
</script>
