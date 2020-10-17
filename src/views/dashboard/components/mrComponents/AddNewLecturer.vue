<template>
<div>
    <div>
      <v-alert
        v-model="alert"
        border="left"
        close-text="Close Alert"
        color="deep-purple accent-4"
        dark
        dismissible
        >Successfully Added Lecturer.</v-alert>
    </div>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Add New Lecturer</div>

            <div class="subtitle-1 font-weight-light">Complete Lecturer Data</div>
          </template>

          <v-form @submit.prevent="handleSubmit">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                  v-model="lecturers.lecturerName"
                  label="Lecturer Name"
                  class="purple-input"
                  :rules="[(v) => !!v || 'Cannot be empty!']"
                  required
                   />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                  v-model="lecturers.lecturerId"
                  label="Lecturer ID"
                  class="purple-input"
                  :rules="[(v) => v.length === 6 || 'Should be six characters!',
                          (v) => v != getall || 'Already In Use!']"
                  required/>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <v-select
                  :items="faculties"
                  v-model="lecturers.faculty"
                  label="Faculty"
                  :rules="[(v) => !!v || 'Cannot be empty!']"
                  required
                  outlined>
                  </v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                  :items="availableDepartments"
                  v-model="lecturers.department"
                  label="Department"
                  :rules="[(v) => !!v || 'Cannot be empty!']"
                  required
                  outlined></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <v-select :items="centers" v-model="lecturers.center" label="Center" outlined></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select :items="availableBuildings" v-model="lecturers.building" label="Building" outlined></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                  class="purple-input"
                  v-model="lecturers.level"
                  label="Level"
                  type="number"
                  :rules="[(v) => !!v || 'Cannot be empty!',
                          (v) => v > 0 && v <= 7 || 'Should be between 1 to 7']"
                  required
                  outlined/>
                </v-col>

                <v-divider></v-divider>
                  <v-col cols="12">
                    <v-subheader v-bind:style="{ fontSize: '26px' }"
                      >Add Unavailable Times</v-subheader>
                  </v-col>
                  <v-container>
                    <v-form @submit.prevent="addUnavailableTime">
                      <v-row justify="start">
                        <v-col cols="12" md="3">
                          <v-select
                            :items="days"
                            v-model="day"
                            label="Day"
                            :rules="[(v) => !!v || 'Cannot be empty!']"
                            required
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                            :items="times"
                            v-model="sTime"
                            label="Start Time"
                            :rules="[(v) => !!v || 'Cannot be empty!']"
                            required
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                            :items="times"
                            v-model="eTime"
                            label="End Time"
                            :rules="[(v) => !!v || 'Cannot be empty!',eTime > sTime || 'Should be greater STime!']"
                            required
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-btn
                            type="submit"
                            class="mx-2"
                            fab
                            dark
                            color="indigo"
                          >
                            <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                  <v-container fluid class="notAvailable">
                    <v-row justify="start">
                      <v-col
                        v-for="(unavailableTime,
                        i) in lecturers.unavailableTime"
                        :key="i"
                        cols="12"
                        md="4"
                      >
                        <v-card class="mx-auto" max-width="344" outlined>
                          <v-list-item three-line>
                            <v-list-item-content>
                              <div class="overline mb-4">Not Available</div>
                              <v-list-item-title class="headline mb-1">{{
                                unavailableTime.day
                              }}</v-list-item-title>
                              <v-list-item-subtitle>
                                {{ unavailableTime.sTime }} to
                                {{ unavailableTime.eTime }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-actions>
                            <v-btn
                              @click="deleteUnavailableTime(unavailableTime.id)"
                              text
                              >Delete</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                    <v-container>
                    <v-form @submit.prevent="addprefferedRooms">
                    <v-row>
                        <v-col cols="12" md="6">
                        <v-select :items="availableRooms" v-model="room" label="Preferred rooms" outlined></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                        <v-btn type="submit" class="mx-2" fab dark color="indigo">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                        </v-col>
                    </v-row>
                    </v-form>
                    </v-container>

                <v-container fluid class="Preferredrooms">
                  <v-row justify="start">
                    <v-col
                    v-for="(preferredRooms,
                        i) in lecturers.prefferedRooms"
                        :key="i"
                        cols="12" md="4">
                      <v-card class="mx-auto" max-width="344" outlined>
                        <v-list-item two-line>
                          <v-list-item-content>
                            <div class="overline mb-4">Available</div>
                            <v-list-item-title class="headline mb-1"
                              >{{ preferredRooms.room }}</v-list-item-title
                            >
                          </v-list-item-content>
                        </v-list-item>
                        <v-card-actions>
                          <v-btn @click.prevent="deleteprefferedRooms(preferredRooms.id)" text>Delete</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>

                <v-col cols="12" class="text-center">
                  <v-chip class="ma-2" x-large color="green" outlined dark>
                      <span>
                        Rank {{ lecturers.level }}.{{ lecturers.lecturerId }}
                      </span>
                  </v-chip>
                  <v-btn type="submit"  color="success" class="mr-0"
                    >Save</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AddNewLecturer",

  data() {
    let times = [];
    for (var i = 1; i <= 24; i++) {
      times.push(`${i}:00`);
    }
    return {
      alert: false,
      faculties: ["Computing","Engineering","BusinessManagement"],
      centers: ["Malabe","Metro","Kandy","Matara"],
      departments: ["IT", "SE", "DS", "CS"],
      buildings: ["New","Old"],
      times,
      days: [
        "Monday",
        "Tuesday",
        "Wednessday",
        "Thusrsday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      day: "",
      sTime: "",
      eTime: "",
      id: "",
      room: "",

      lecturers: {
        lecturerName: "",
        lecturerId: "",
        faculty: "",
        department: "",
        center: "",
        building: "",
        level: "",
        unavailableTime: [],
        prefferedRooms: [],
      },
    };
  },
  mounted() {
  },
  computed: {
    ...mapState(["tharikState", "mrState"]),

    getall(){
      let subs = this.mrState.lecturers;
      let x = this.lecturers.lecturerId;
      //let y = "";
      for (var i = 0; i < subs.length; i++) {
        if(subs[i].lecturerId===x){
            return x;
        }
      }
    },
    availableRooms() {
      let rooms = this.$store.state.rooms;
      let selectRooms = [];
      for (var i = 0; i < rooms.length; i++) {
        selectRooms.push(rooms[i].name);
      }
      return selectRooms;
    },

    availableDepartments() {
      let depts = this.tharikState.programs;
      let selectDepts = [];
      for (var i = 0; i < depts.length; i++) {
        selectDepts.push(depts[i].name);
      }
      return selectDepts;
    },
    availableBuildings() {
      let buildings = this.$store.state.buildings;
      let selectBuildings = [];
      for (var i = 0; i < buildings.length; i++) {
        selectBuildings.push(buildings[i].name);
      }
      return selectBuildings;
    },
  },
  methods: {
    ...mapActions(["addNewLecturerAction"]),
    addUnavailableTime() {
      if (this.day && this.sTime && this.eTime) {
        this.lecturers.unavailableTime.push({
          id: this.lecturers.unavailableTime.length,
          day: this.day,
          sTime: this.sTime,
          eTime: this.eTime,
        });
      }
    },
    deleteUnavailableTime(id) {
      this.lecturers.unavailableTime = this.lecturers.unavailableTime.filter(
        (x) => x.id !== id
      );
    },
    addprefferedRooms() {

      if (this.room) {
        this.lecturers.prefferedRooms.push({
          id:this.lecturers.prefferedRooms.length,
          room:this.room,
        });
        this.room = "";
      }
    },
    deleteprefferedRooms(id) {
      this.lecturers.prefferedRooms = this.lecturers.prefferedRooms.filter(
        (x) => x.id !== id
      );
    },
    handleSubmit() {
      if(!this.lecturers.lecturerId==" " && !this.lecturers.level == " ") {
      let payload = {
        ...this.lecturers,
        rank:`${this.lecturers.level}.${this.lecturers.lecturerId}`,
      };
      this.addNewLecturerAction(payload);
      this.lecturers.lecturerName = "";
      this.lecturers.lecturerId = "";
      this.lecturers.faculty = "";
      this.lecturers.department = "";
      this.lecturers.center = "";
      this.lecturers.building = "";
      this.lecturers.level = "";
      this.lecturers.unavailableTime = [];
      this.lecturers.prefferedRooms = [];
      this.alert = true;
    }
    },
    },

};
</script>


