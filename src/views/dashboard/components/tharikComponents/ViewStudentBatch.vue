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
    <v-container>
      <v-row justify="center">
        <v-col cols="3" md="2">
          <v-text-field
            :label="$t('search')"
            v-model="id"
            color="secondary"
            hide-details
            style="max-width: 165px"
          >
            <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
              <v-btn
                @click="getStudentBatch"
                class="mt-n2"
                elevation="1"
                fab
                small
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="available" id="user-profile" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">Edit Student Batch</div>

              <div class="subtitle-1 font-weight-light">
                {{ studentBatch.bId }}
              </div>
            </template>

            <v-form @submit.prevent="handleSubmit">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      :disabled="editable"
                      :items="years"
                      v-model="studentBatch.year"
                      label="Year"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select
                      :disabled="editable"
                      :items="semesters"
                      label="Semester"
                      v-model="studentBatch.semester"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select
                      :disabled="editable"
                      :items="selectedPrograms"
                      label="Program"
                      v-model="studentBatch.program"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      :disabled="editable"
                      label="Group Number"
                      v-model="studentBatch.groupNumber"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      :disabled="editable"
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
                      :disabled="editable"
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
                              <v-list-item-title class="headline mb-1">
                                {{ unavailableDay.day }}
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ unavailableDay.sTime }} to
                                {{ unavailableDay.eTime }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>

                          <v-card-actions>
                            <v-btn
                              :disabled="editable"
                              @click.prevent="
                                deleteUnavailableDay(unavailableDay.id)
                              "
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
                            :disabled="editable"
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
                    <v-spacer></v-spacer>
                    <v-chip class="ma-2" x-large color="green" outlined dark>
                      <span>
                        Y{{ studentBatch.year }}.S{{ studentBatch.semester }}.{{
                          studentBatch.program
                        }}.{{ studentBatch.groupNumber }}.{{
                          studentBatch.subGroupNumber
                        }}
                      </span>
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-if="editable"
                      @click.prevent="edit"
                      color="blue"
                      class="mr-0"
                      >Edit Batch</v-btn
                    >

                    <v-btn v-else type="submit" color="success" class="mr-0"
                      >Save Batch</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn @click.prevent="deleteBatch" color="red" class="mr-0"
                      >Delete Batch</v-btn
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
import { mapState, mapActions } from "vuex";

export default {
  name: "ViewStudentBatch",
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
      id: "",
      years: [1, 2, 3, 4],
      semesters: [1, 2],

      times,
      //  rooms: ["B401", "B403", "B450"],
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
      centers: ["Malabe", "Metro", "Matara", "Kandy"],

      studentBatch: {
        bId: "",
        year: "",
        semester: "",
        program: "",
        groupNumber: "",
        center: "",
        subGroupNumber: "",
        prefferedRooms: [],
        unavailableDays: [],
      },
      available: false,
      editable: true,
    };
  },
  computed: {
    ...mapState(["tharikState", "alert", "rooms", "buildings"]),
    selectedPrograms() {
      let programs = this.tharikState.programs;
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
  methods: {
    ...mapActions(["editStudentBatchAction", "deleteStudentBatchAction"]),
    addUnavailableDays() {
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
    getStudentBatch() {
      let studentBatchArr = this.tharikState.studentBatches.filter(
        (x) => x.bId === this.id
      );

      if (studentBatchArr.length > 0) {
        this.studentBatch = {
          ...studentBatchArr[0],
        };
        this.available = true;
        console.log(this.studentBatch);
      }
    },
    edit() {
      this.editable = false;
    },

    deleteBatch() {
      let payload = {
        bId: this.studentBatch.bId,
      };
      this.deleteStudentBatchAction(payload);
      this.available = false;
      this.editable = true;
      this.id = "";
    },

    handleSubmit() {
      let payload = {
        oldBId: this.studentBatch.bId,
        ...this.studentBatch,
        bId: `Y${this.studentBatch.year}.S${this.studentBatch.semester}.${this.studentBatch.program}.${this.studentBatch.groupNumber}.${this.studentBatch.subGroupNumber}`,
      };

      this.editStudentBatchAction(payload);
      this.available = false;
      this.editable = true;
      this.id = "";

      this.alertBox = true;
      this.alertBoxMessage = this.alert.message;
      this.alertBoxType = this.alert.type;
      this.alertBoxColor = this.alert.color;
      if (this.alert.success) {

      }
    },
  },
};
</script>
