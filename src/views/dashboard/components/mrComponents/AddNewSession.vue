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
        >Successfully Added Session.</v-alert
      >
    </div>
    <v-container id="user-profile" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">Add New Session</div>

              <div class="subtitle-1 font-weight-light">
                Complete Session Data
              </div>
            </template>

            <v-form @submit.prevent="handleSubmit">
              <v-container class="py-0">
                <v-form @submit.prevent="addlecturers">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        :items="availableLecturers"
                        v-model="lect"
                        label="Lecturers"
                        :rules="[(v) => !!v || 'Cannot be empty!']"
                        required
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-btn type="submit" class="mx-2" fab dark color="indigo">
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>

                <v-container fluid class="Lecturers">
                  <v-row justify="start">
                    <v-col
                      v-for="(lecturers, i) in sessions.lecturers"
                      :key="i"
                      cols="12"
                      md="4"
                    >
                      <v-card
                        class="mx-auto"
                        max-height="150"
                        max-width="360"
                        outlined
                      >
                        <v-list-item one-line>
                          <v-list-item-content>
                            <v-list-item-title class="headline mb-1">{{
                              lecturers.lect
                            }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-card-actions>
                          <v-btn
                            @click.prevent="deletelecturers(lecturers.id)"
                            text
                            >Delete</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>

                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="availableTags"
                      v-model="sessions.tag"
                      label="Tags"
                      :rules="[(v) => !!v || 'Cannot be empty!']"
                      required
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="availableBatches"
                      v-model="sessions.batch"
                      label="StudentBatch"
                      :rules="[(v) => !!v || 'Cannot be empty!']"
                      required
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="availableSubjects"
                      v-model="sessions.subject"
                      label="Subject"
                      :rules="[(v) => !!v || 'Cannot be empty!']"
                      required
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="types"
                      v-model="sessions.type"
                      label="Parallel/Consecutive"
                      :rules="[(v) => !!v || 'Cannot be empty!']"
                      required
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      class="purple-input"
                      v-model="sessions.noOfStudents"
                      label="NoOfStudents"
                      type="number"
                      :rules="[
                        (v) => !!v || 'Cannot be empty!',
                        (v) => v > 0 || 'Should be greater than 0!',
                      ]"
                      required
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      class="purple-input"
                      v-model="sessions.duration"
                      label="Duration"
                      type="number"
                      :rules="[
                        (v) => !!v || 'Cannot be empty!',
                        (v) => v > 0 || 'Should be greater than 0!',
                        (v) => v < 5 || 'Should be less than 5!',
                      ]"
                      required
                      outlined
                    />
                  </v-col>

                  <v-divider></v-divider>
                  <v-col cols="12">
                    <v-subheader v-bind:style="{ fontSize: '26px' }"
                      >Add Unavailable Times</v-subheader
                    >
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
                            :rules="[
                              (v) => !!v || 'Cannot be empty!',
                              eTime > sTime || 'Should be greater STime!',
                            ]"
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
                        v-for="(unavailableTime, i) in sessions.unavailableTime"
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
                              >Delete</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-form @submit.prevent="addprefferedRooms">
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-select
                            :items="availableRooms"
                            v-model="room"
                            label="Preferred rooms"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
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

                  <v-container fluid class="Preferredrooms">
                    <v-row justify="start">
                      <v-col
                        v-for="(preferredRooms, i) in sessions.prefferedRooms"
                        :key="i"
                        cols="12"
                        md="4"
                      >
                        <v-card class="mx-auto" max-width="344" outlined>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <div class="overline mb-4">Available</div>
                              <v-list-item-title class="headline mb-1">{{
                                preferredRooms.room
                              }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-actions>
                            <v-btn
                              @click.prevent="
                                deleteprefferedRooms(preferredRooms.id)
                              "
                              text
                              >Delete</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-col cols="12" class="text-center">
                    <v-chip class="ma-2" x-large color="green" outlined dark>
                      <span>
                        SessionId {{ sessions.tag }}.{{ sessions.subject }}
                      </span>
                    </v-chip>
                    <v-btn type="submit" color="success" class="mr-0"
                      >Save</v-btn
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
  name: "AddNewSession",

  data() {
    let times = [];
    for (var i = 1; i <= 24; i++) {
      times.push(`${i}:00`);
    }
    return {
      alert: false,
      types: ["consecutive", "parallel"],
      tags: ["Computing", "Engineering", "BusinessManagement"],
      batches: ["Malabe", "Metro", "Kandy", "Matara"],
      subjects: ["IT", "SE", "DS", "CS"],
      Preferredrooms: ["B1502", "H1209", "L1401", "H1302"],
      Lecturers: ["B1502", "H1209", "L1401", "H1302"],
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
      room: "",
      lect: "",

      sessions: {
        sessionId: "",
        lecturers: [],
        tag: "",
        batch: "",
        subject: "",
        noOfStudents: "",
        duration: "",
        unavailableTime: [],
        prefferedRooms: [],
        type: "",
      },
    };
  },
  mounted() {},
  computed: {
    ...mapState(["tharikState", "mrState"]),

    availableRooms() {
      let rooms = this.$store.state.rooms;
      let selectRooms = [];
      for (var i = 0; i < rooms.length; i++) {
        selectRooms.push(rooms[i].name);
      }
      return selectRooms;
    },
    availableLecturers() {
      let Lecturers = this.mrState.lecturers;
      let selectLecturers = [];
      for (var i = 0; i < Lecturers.length; i++) {
        selectLecturers.push(Lecturers[i].lecturerName);
      }
      return selectLecturers;
    },
    availableTags() {
      let tags = this.tharikState.tags;
      let selectTags = [];
      for (var i = 0; i < tags.length; i++) {
        selectTags.push(tags[i].name);
      }
      return selectTags;
    },
    availableBatches() {
      let batches = this.tharikState.studentBatches;
      let selectBatches = [];
      for (var i = 0; i < batches.length; i++) {
        selectBatches.push(batches[i].bId);
      }
      return selectBatches;
    },
    availableSubjects() {
      let subjects = this.mrState.subjects;
      let selectSubjects = [];
      for (var i = 0; i < subjects.length; i++) {
        selectSubjects.push(subjects[i].subjectCode);
      }
      return selectSubjects;
    },
  },

  methods: {
    ...mapActions(["addNewSessionAction"]),
    addUnavailableTime() {
      if (this.day && this.sTime && this.eTime) {
        this.sessions.unavailableTime.push({
          id: this.sessions.unavailableTime.length,
          day: this.day,
          sTime: this.sTime,
          eTime: this.eTime,
        });
      }
    },
    deleteUnavailableTime(id) {
      this.sessions.unavailableTime = this.sessions.unavailableTime.filter(
        (x) => x.id !== id
      );
    },
    addlecturers() {
      if (this.lect) {
        this.sessions.lecturers.push({
          id: this.sessions.lecturers.length,
          lect: this.lect,
        });
        //this.lect = "";
      }
    },
    deletelecturers(id) {
      this.sessions.lecturers = this.sessions.lecturers.filter(
        (x) => x.id !== id
      );
    },
    addprefferedRooms() {
      if (this.room) {
        this.sessions.prefferedRooms.push({
          id: this.sessions.prefferedRooms.length,
          room: this.room,
        });
        this.room = "";
      }
    },
    deleteprefferedRooms(id) {
      this.sessions.prefferedRooms = this.sessions.prefferedRooms.filter(
        (x) => x.id !== id
      );
    },
    handleSubmit() {
      if (!this.sessions.tag == " " && !this.sessions.subject == " ") {
        let payload = {
          ...this.sessions,
          sessionId: `${this.sessions.subject}.${this.sessions.tag}`,
        };
        this.addNewSessionAction(payload);
        this.sessions.lecturers = [];
        //this.sessions.tag = "";
        //this.sessions.batch = "";
        //this.sessions.subject = "";
        this.sessions.noOfStudents = "";
        this.sessions.duration = "";
        this.sessions.prefferedRooms = [];
        this.sessions.unavailableTime = [];
        this.alert = true;
      }
    },
  },
};
</script>
