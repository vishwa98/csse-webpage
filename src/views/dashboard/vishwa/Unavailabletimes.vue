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
            <span class="headline">Add unavailable times</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>


                <v-flex xs12 sm12 md12>

                  <v-select
                    :items="availableDays"
                    v-model="postData.sday"
                    label="Day"
                     required
                    outlined
                  ></v-select>

                </v-flex>

                <v-flex xs12 sm12 md12>

                  <v-select
                    :items="times"
                    v-model="postData.rtime"
                    label="Start Time"
                     required
                    outlined
                  ></v-select>

                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-select
                    :items="times"
                    label="End Time"
                    v-model="postData.rmin"
                    required
                    outlined
                  ></v-select>


                </v-flex>










                <v-flex xs12 sm12 md12>
                    <p v-for="(utime, m) in postData.utimes" :key="utime + m">
                    {{ utime.name }}. {{utime.startTime}}. {{utime.endTime}}
                    <v-icon @click="deleteTime('utime', m)" aria-label="Close"
                      >mdi-close</v-icon
                    >
                  </p>
                  <v-btn @click="addSumTimes()">Add unavailabe time</v-btn>
                </v-flex>
                <v-flex>
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

          <v-btn
            color="success"
            @click="editPost(item)"
            outlined
          >
            Edit Unavaiable Times
          </v-btn>

        </template>
      </v-data-table>
    </base-material-card>

     <base-material-card
      icon="mdi-clipboard-text"
      title="Room Unavailabe Times"
      class="px-5 py-3"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text>
              <base-subheading subheading="Unavailable Times" />

              <template v-for="c in rooms">
                <base-material-alert
                  color="secondary"
                  dark
                  v-for="(utime) in c.utimes"
                  :key="(c.slug+utime)"
                >
                  {{ utime.name }}. {{utime.startTime}}. {{utime.endTime}}

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
      let times = [];
    for (var i = 1; i <= 24; i++) {
      times.push(`${i}:00`);
    }

      return {
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
    times,
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
      newutimes: "",
      sday: "",
      rtime: "",
      rmin: ""

    },
    default: {
      name: "",
      type: "",
      max: "",
      building: "",
      newutimes: "",
      sday: "",
      rtime: "",
      rmin : ""
    },
    editedIndex: -1,
  }

},

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

        availableDays() {
      let days = this.vishwaState.days;
      console.log("vishwaState.days", days);
      let selectDays = [];
      for (var i = 0; i < days.length; i++) {
        selectDays.push(days[i].name);
      }
      return selectDays;
    },
  },

  methods: {
    ...mapActions(["setRoomsByBuildingAction"]),

    ...mapActions(["setBuildingsAction"]),

    ...mapActions(["setRoomsByUtAction"]),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.postData = Object.assign({}, this.default);
        this.editedIndex = -1;
      }, 3000000);
    },

    loadRooms: async function () {
      const slug = this.$route.params.slug;
      this.setRoomsByUtAction(slug);;
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

    addUtimes() {

      console.log("RoomTimes", this.rooms[0]);
      this.rooms[0].utimes.push({
          name: this.postData.sday,
          startTime: this.postData.rtime,
          endTime: this.postData.rmin,
        });

    },

    deleteTime(timeIndex) {
      this.postData.utimes.splice(timeIndex, 1);
    },

    addSumTimes() {

        if(this.postData.rmin != '' && this.postData.rtime != '' && this.postData.sday != '' && this.postData.sday != undefined && this.postData.rmin != undefined && this.postData.rtime != undefined){
      this.postData.newutimes =
        this.postData.sday +
        " | " +
        " " +
        this.postData.rtime +
        " - " +
        this.postData.rmin +
        " "

        this.addUtimes();
      }
      else {
        this.color = "red";
        this.text = "Day, Start Time and End Time canno't be empty";
        this.snackbar = true;
      }

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
    const slug = this.$route.params.slug;
    this.setRoomsByUtAction(slug);

    this.setBuildingsAction();
  },
};
</script>
