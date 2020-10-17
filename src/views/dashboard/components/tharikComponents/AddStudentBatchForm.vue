<template>
  <div>
    <div>
      <v-alert
        v-model="alertBox"
        border="left"
        close-text="Close Alert"
        :color="alertBoxColor"
        :type="alertBoxType"
        dark
        dismissible
        >{{ alertBoxMessage }}</v-alert
      >
    </div>
    <v-container id="user-profile" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">ADD Student Batch</div>

              <div class="subtitle-1 font-weight-light">
                Complete Batch Data
              </div>
            </template>

            <v-form @submit.prevent="handleSubmit">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="years"
                      v-model="studentBatch.year"
                      label="Year"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select
                      :items="semesters"
                      label="Semester"
                      v-model="studentBatch.semester"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select
                      :items="availablePrograms"
                      label="Program"
                      v-model="studentBatch.program"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Group Number"
                      v-model="studentBatch.groupNumber"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Sub Group Number"
                      v-model="studentBatch.subGroupNumber"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="centers"
                      label="Center"
                      v-model="studentBatch.center"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      v-model="studentBatch.prefferedRooms"
                      :items="availableRooms"
                      chips
                      label="Preffered Rooms"
                      multiple
                      outlined
                    ></v-select>
                  </v-col>
                  <v-divider></v-divider>
                  <v-col cols="12">
                    <v-subheader v-bind:style="{ fontSize: '26px' }"
                      >Add Unavailable Days</v-subheader
                    >
                  </v-col>
                  <v-container fluid class="notAvailable">
                    <v-row justify="start">
                      <v-col
                        v-for="(unavailableDay,
                        i) in studentBatch.unavailableDays"
                        :key="i"
                        cols="12"
                        md="4"
                      >
                        <v-card class="mx-auto" max-width="344" outlined>
                          <v-list-item three-line>
                            <v-list-item-content>
                              <div class="overline mb-4">Not Available</div>
                              <v-list-item-title class="headline mb-1">{{
                                unavailableDay.day
                              }}</v-list-item-title>
                              <v-list-item-subtitle>
                                {{ unavailableDay.sTime }} to
                                {{ unavailableDay.eTime }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>

                          <v-card-actions>
                            <v-btn
                              @click="deleteUnavailableDay(unavailableDay.id)"
                              text
                              >Delete</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-form @submit.prevent="addUnavailableDays">
                      <v-row justify="start">
                        <v-col cols="12" md="3">
                          <v-select
                            :items="days"
                            v-model="day"
                            label="Day"
                            outlined
                          ></v-select>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-select
                            :items="times"
                            v-model="sTime"
                            label="Start Time"
                            outlined
                          ></v-select>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-select
                            :items="times"
                            v-model="eTime"
                            label="End Time"
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

                  <v-divider></v-divider>

                  <v-col cols="12" class="text-center">
                    <v-chip class="ma-2" x-large color="green" outlined dark>
                      <span>
                        Y{{ studentBatch.year }}.S{{ studentBatch.semester }}.{{
                          studentBatch.program
                        }}.{{ studentBatch.groupNumber }}.{{
                          studentBatch.subGroupNumber
                        }}
                      </span>
                    </v-chip>
                    <v-btn type="submit" color="success" class="mr-0"
                      >Add Batch</v-btn
                    >
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
  name: "AddStudentBatchForm",
  data() {
    let times = [];

    for (var i = 1; i <= 24; i++) {
      times.push(`${i}:00`);
    }

    return {
      alertBox: false,
      alertBoxMessage: "",
      alertBoxType: "success",
      alertBoxColor: "red",
      years: [1, 2, 3, 4],
      semesters: [1, 2],

      times,
      //rooms: ["B401", "B403", "B450"],
      centers: ["Malabe", "Metro", "Matara", "Kandy"],
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

      studentBatch: {
        bId:"",
        year: "",
        semester: "",
        program: "",
        groupNumber: "",
        subGroupNumber: "",
        center: "",
        prefferedRooms: [],
        unavailableDays: [],
      },
    };
  },
  methods: {
    ...mapActions(["addStudentBatchAction"]),
    addUnavailableDays() {
      console.log("submit2");
      if (this.day && this.sTime && this.eTime) {
        this.studentBatch.unavailableDays.push({
          id: this.studentBatch.unavailableDays.length,
          day: this.day,
          sTime: this.sTime,
          eTime: this.eTime,
        });

        this.day = "";
        this.eTime = "";
        this.sTime = "";
      }
    },
    deleteUnavailableDay(id) {
      this.studentBatch.unavailableDays = this.studentBatch.unavailableDays.filter(
        (x) => x.id !== id
      );
    },
    handleSubmit() {
      let payload = {
        ...this.studentBatch,
        bId: `Y${this.studentBatch.year}.S${this.studentBatch.semester}.${this.studentBatch.program}.${this.studentBatch.groupNumber}.${this.studentBatch.subGroupNumber}`,
      };

      this.addStudentBatchAction(payload);

      if (this.alert.success) {
        this.studentBatch.year = "";
        this.studentBatch.semester = "";
        this.studentBatch.program = "";
        this.studentBatch.groupNumber = "";
        this.studentBatch.subGroupNumber = "";
        this.studentBatch.unavailableDays = [];
        this.studentBatch.prefferedRooms = [];
        this.studentBatch.center = "";
        this.alert = true;
      }
      this.alertBox = true;
      this.alertBoxMessage = this.alert.message;
      this.alertBoxType = this.alert.type;
      this.alertBoxColor = this.alert.color;
    },
  },
  computed: {
    ...mapState(["tharikState", "alert", "rooms", "buildings"]),
    availablePrograms() {
      let programs = this.tharikState.programs;
      console.log("tharikState.programs", programs);
      let selectPrograms = [];
      for (var i = 0; i < programs.length; i++) {
        selectPrograms.push(programs[i].name);
      }
      return selectPrograms;
    },
    availableRooms() {
      let buildings = this.buildings;
      console.log("buildings", buildings);
      let rooms = this.rooms;
      buildings = buildings.filter(
        (x) => x.description === this.studentBatch.center
      );
      let FilteredBuildingNames = [];

      for (var i = 0; i < buildings.length; i++) {
        FilteredBuildingNames.push(buildings[i].name);
      }
      console.log("Buildings", FilteredBuildingNames);
      rooms = rooms.filter((x) => {
        return FilteredBuildingNames.includes(x.building);
      });

      let filteredRoomsNames = [];
      for (var i = 0; i < rooms.length; i++) {
        filteredRoomsNames.push(rooms[i].name);
      }

      return filteredRoomsNames;
    },
  },
};
</script>
