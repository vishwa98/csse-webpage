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
            <div class="display-2 font-weight-light">Add Room</div>

            <div class="subtitle-1 font-weight-light">Add Room Details</div>
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
                    label="Room Name *"
                    required
                    v-model="roomData.name"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    :items="availableTypes"
                    label="Room Type *"
                    required
                    v-model="roomData.type"
                    outlined
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="Maximum Students *"
                    required
                    class="purple-input"
                    v-model="roomData.max"
                    v-on:keypress="isNumber($event)"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    :items="availableBuildinggs"
                    label="Select Building *"
                    required
                    v-model="roomData.building"
                    outlined
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-col cols="12">
                    <v-subheader v-bind:style="{ fontSize: '26px' }"
                      >Add Unavailable Times</v-subheader
                    >
                  </v-col>

                  <p v-for="(utime, m) in roomData.utimes" :key="utime + m">
                    {{ utime.name }}. {{utime.startTime}}. {{utime.endTime}}
                    <v-icon @click="deleteTime('utime', m)" aria-label="Close"
                      >mdi-close</v-icon
                    >
                  </p>
                </v-col>

                <v-col cols="12" md="6"> </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    :items="availableDays"
                    v-model="roomData.sday"
                    label="Day"
                     required
                    outlined
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    :items="times"
                    v-model="roomData.rtime"
                    label="Start Time"
                     required
                    outlined
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    :items="times"
                    label="End Time"
                    v-model="roomData.rmin"
                    :rules="[roomData.rmin > roomData.rtime || 'Should be greater than Start Time!']"
                    required
                    outlined
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-btn color="success" @click="addSum()"
                    >Save Room Unavailable times</v-btn
                  >
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" @click="createRooom()">
                    Add Room
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
              ROOM DETAILS
            </h4>
            <p>{{rooms.length}}</p>
            <p class="font-weight-light grey--text"></p>

            <v-btn color="success" rounded class="mr-0" to="/tables/room">
              View All Rooms
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
import DatePicker, {
  CalendarDialog,
} from "vue-time-date-range-picker/dist/vdprDatePicker";
export default {
  components: {
    DatePicker,
  },

  data() {
      let times = [];
    for (var i = 1; i <= 24; i++) {
      times.push(`${i}:00`);
    }
    return {
    date: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    modal2: false,
    menu2: false,
    times,
    snackbar: false,
    text: "",
    color: "",
    rules: [(v) => !!v || 'Cannot be empty!'],

    irules: [(v) => v.length >= 1 || "Minimum length is 1 characters"],

    defaultSelected: '1:00',

    roomData: {
      name: "",
      type: "",
      max: "",
      building: "",
      rtime: "",
      rtimet: "",
      rmin: "",
      sday: "",
      newutimes: "",
      utimes: [],
      sum: "",
    },
    default: {
      name: "",
      type: "",
      max: "",
      building: "",
      rtime: "",
      rtimet: "",
      rmin: "",
      sday: "",
      newutimes: "",
      utimes: [],
      sum: "",
    },

    dateInput: {
      placeholder: "Select Date",
    },
    format: "DD MM YYYY hh:mm",
    sameDateFormat: {
      from: "DD MM YYYY, hh:mm",
      to: "hh:mm",
    },
    }
  },

  computed: {
    ...mapState(["buildings"]),

    ...mapState(["vishwaState"]),

    ...mapState(["tharikState"]),

    ...mapState(["rooms"]),

    availableTypes() {
      let tags = this.tharikState.tags;
      console.log("tharikState.tags", tags);
      let selectTypes = [];
      for (var i = 0; i < tags.length; i++) {
        selectTypes.push(tags[i].name);
      }
      return selectTypes;
    },

    availableTimes() {
      let timeroom = this.vishwaState.timeroom;
      console.log("vishwaState.timeroom", timeroom);
      let selectTimes = [];
      for (var i = 0; i < timeroom.length; i++) {
        selectTimes.push(timeroom[i].time);
      }
      return selectTimes;
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

    availableTimeMin() {
      let timemin = this.vishwaState.timemin;
      console.log("vishwaState.timeroom", timemin);
      let selectTimesMin = [];
      for (var i = 0; i < timemin.length; i++) {
        selectTimesMin.push(timemin[i].timee);
      }
      return selectTimesMin;
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

  watch: {
    selectbuilding: function (val) {
      if (val == 0) {
        alert("Please select a service");
        e.preventDefault();
        return false;
      }
    },
  },

  methods: {
    ...mapActions(["addStoreRoom"]),

    ...mapActions(["setBuildingsAction"]),

    ...mapActions(["setRoomsAction"]),

    savePost: async function () {
      console.log("Hellloooooo");
    },

    onChange(e) {
      this.roomData.building = e.target.value;
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

    async handleRoom() {
      const roomData = new FormData();

      roomData.append("roomName", this.roomData.name);
      roomData.append("roomType", this.roomData.type);
      roomData.append("roomMax", this.roomData.max);
      roomData.append("building", this.roomData.building);
    },

    addUtimes() {

      this.roomData.utimes.push({
          name: this.roomData.sday,
          startTime: this.roomData.rtime,
          endTime: this.roomData.rmin,
        });


    },

    addSum() {

      if(this.roomData.rmin != '' && this.roomData.rtime != '' && this.roomData.sday != ''){
      this.roomData.newutimes =
        this.roomData.sday +
        " | " +
        " " +
        this.roomData.rtime +
        " - " +
        this.roomData.rmin +
        " "

        this.addUtimes();
      }
      else {
        this.color = "red";
        this.text = "Day, Start Time and End Time canno't be empty";
        this.snackbar = true;
      }



    },

    deleteTime(timeIndex) {
      this.roomData.utimes.splice(timeIndex, 1);
    },

    createRooom() {
      const { name, type, max, building, utimes } = this.roomData;

      const payload = {
        name,
        type,
        max,
        building,
        utimes,
      };

      console.log("Utimes", payload.utimes)

      if (

        this.roomData.building != "" &&
        this.roomData.type != "" &&
        this.roomData.max != "" &&
        this.roomData.name != ""
      ) {

          for(var i = 0; i < this.rooms.length; i++){

                  if(this.rooms[i].name == this.roomData.name)
                  {
                      this.color = 'red'
				      this.text = 'Please enter a unique room name'
                      this.snackbar = true;

                      return false;
                  }
            }


        console.log("Hello");

        this.addStoreRoom(payload)
          .then(() => {
            this.roomData = {
              name: "",
              type: "",
              max: "",
              building: "",
              rmin: "",
              rtime: "",
              sday: "",
              utimes: [],
            };
            this.color = "success";
            this.text = "Room Details successfully saved";
            this.snackbar = true;
            this.setRoomsAction();
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
    console.log(this.buildings);

    this.setBuildingsAction();
  },
};
</script>
