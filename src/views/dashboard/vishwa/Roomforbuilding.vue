<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-btn to="/tables/addroom">Add Room</v-btn>

    <v-btn to="/tables/room">View All Rooms</v-btn>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-form
          @submit.prevent="savePost"
          ref="postData"
          lazy-validation
          enctype="multipart/form-data"
          autocomplete="off"
        >
          <v-card-title>
            <span class="headline">Edit Room</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Name"
                    v-model="postData.name"
                    :rules="inputRules"
                    color="#2C3A47"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-select
                    :items="availableTypes"
                    label="Room Type"
                    v-model="postData.type"
                    outlined
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="Maximum Students"
                    v-model="postData.max"
                    :rules="rules.required"
                    color="#2C3A47"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="availableBuildinggs"
                    label="Select Building"
                    v-model="postData.building"
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
        :items="rooms"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <router-link class="nav-link" :to="'/roomut/' + item.slug"
            >View unavailable times</router-link
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
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    snackbar: false,
    search: "",
    text: "",
    color: "",
    dialog: false,

    inputRules: [(v) => v.length >= 2 || "Minimum length is 2 characters"],

    rules: {
      required: [(value) => !!value || "Required."],
    },

    min: false,
    dialog: false,
    fab: false,
    posts: [],
    headers: [
      { text: "Name", value: "name", sortable: true },
      { text: "Room Type", value: "type", sortable: false },
      { text: "Maximum Students", value: "max", sortable: false },
      { text: "Building", value: "building", sortable: false },
      { text: "Action", value: "actions", sortable: true, with: "180px" },
    ],

    postData: {
      name: "",
      type: "",
      max: "",
      building: "",
    },
    default: {
      name: "",
      type: "",
      max: "",
      building: "",
    },
    editedIndex: -1,
  }),

  computed: {
    ...mapState(["rooms"]),
    ...mapState(["buildings"]),

    ...mapState(["vishwaState"]),

    ...mapState(["tharikState"]),

    availableTypes() {
      let tags = this.tharikState.tags;
      console.log("tharikState.tags", tags);
      let selectTypes = [];
      for (var i = 0; i < tags.length; i++) {
        selectTypes.push(tags[i].name);
      }
      return selectTypes;
    },

    availableBuildinggs() {
      let buildings = this.buildings;
      console.log("buildings", buildings);
      let selectBuildingss = [];
      for (var i = 0; i < buildings.length; i++) {
        selectBuildingss.push(buildings[i].name);
      }
      return selectBuildingss;
    },
  },

  methods: {
    ...mapActions(["setRoomsByBuildingAction"]),

    ...mapActions(["setBuildingsAction"]),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.postData = Object.assign({}, this.default);
        this.editedIndex = -1;
      }, 3000000);
    },

    loadRooms: async function () {
      const building = this.$route.params.building;
      this.setRoomsByBuildingAction(building);
    },

    onChange(e) {
      this.postData.building = e.target.value;
    },

    savePost: async function () {
      this.updatePost();
    },

    editPost(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.postData = Object.assign({}, item);
      this.dialog = true;
    },

    updatePost() {
      if (this.$refs.postData.validate() && this.postData.building != "") {

        let apiURL = `http://localhost:8000/api/updroom/${this.postData._id}`;
        axios
          .post(apiURL, this.postData)
          .then((res) => {
            console.log(res);
            this.close();
            this.loadRooms();
            this.color = "info";
            this.text = "Room has been updated";
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
            let apiURL = `http://localhost:8000/api/deleteRoom/${id}`;
            let indexOfArrayItem = this.posts.findIndex((i) => i._id === id);
            axios
              .delete(apiURL)
              .then(() => {
                this.posts.splice(indexOfArrayItem, 1);
              })
              .catch((error) => {
                console.log(error);
              });
            this.$swal("Deleted!", "Room has been deleted", "success");
            this.color = "error";
            this.text = "Room has been deleted";
            this.loadRooms();
            this.setRoomsByBuildingAction(this.$route.params.building);
            this.snackbar = true;
          } catch (error) {
            this.$swal("Failed", "There was something wrong", "warning");
          }
        }
      });
    },
  },

  created() {
    const building = this.$route.params.building;
    this.setRoomsByBuildingAction(building);

    this.setBuildingsAction();
  },
};
</script>
