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
        >Successfully Edited Lecturer.
      </v-alert>
    </div>
    <v-container>
      <v-row justify="center">
        <v-col cols="3" md="2">
          <v-text-field
            :label="$t('search')"
            v-model="rank"
            color="secondary"
            hide-details
            style="max-width: 165px;"
          >
            <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
              <v-btn @click="getLecturer"
              class="mt-n2" elevation="1" fab small>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-container id="user-profile" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">Edit Lecturer</div>

              <div class="subtitle-1 font-weight-light">{{ lecturers.lecturerId }}</div>
            </template>

            <v-form @submit.prevent="handleSubmit">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                  :disabled="editable"
                  label="Lecturer Name"
                  v-model="lecturers.lecturerName"
                  class="purple-input"
                  :rules="[(v) => !!v || 'Cannot be empty!']"
                  required />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                  :disabled="editable"
                  label="Lecturer ID"
                  v-model="lecturers.lecturerId"
                  class="purple-input"
                  :rules="[(v) => !!v || 'Cannot be empty!',
                          (v) => v.length === 6 || 'Should be six characters!',
                          (v) => v != getall || 'Already In Use']"
                  required />
                </v-col>

              </v-row>

               <v-row>
                <v-col cols="12" md="4">
                  <v-select
                  :disabled="editable"
                  :items="faculties"
                  label="Faculty"
                  v-model="lecturers.faculty"
                  :rules="[(v) => !!v || 'Cannot be empty!']"
                  required
                  outlined></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                  :disabled="editable"
                  v-model="lecturers.department"
                  :items="availableDepartments"
                  label="Department"
                  :rules="[(v) => !!v || 'Cannot be empty!']"
                  required
                  outlined></v-select>
                </v-col>
                </v-row>

                <v-row>
                <v-col cols="12" md="4">
                  <v-select
                  :disabled="editable"
                  v-model="lecturers.center"
                  :items="centers"
                  label="Center"
                  outlined></v-select>

                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                  :disabled="editable"
                  v-model="lecturers.building"
                  :items="availableBuildings"
                  label="Building"
                  outlined></v-select>
                </v-col>
                </v-row>

                <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                  :disabled="editable"
                  v-model="lecturers.level"
                  class="purple-input"
                  label="Level"
                  type="number"
                  :rules="[(v) => !!v || 'Cannot be empty!',
                          (v) => v > 0 && v <= 7 || 'Should be between 1 to 7']"
                  required
                  outlined/>
                </v-col>

                <v-divider dark="true"></v-divider>

                <v-col cols="12">
                  <v-subheader v-bind:style="{ fontSize: '24px' }">Not Available Times</v-subheader>
                </v-col>
                <v-container>
                    <v-form @submit.prevent="addUnavailableTime">
                      <v-row justify="start">
                        <v-col cols="12" md="3">
                          <v-select
                            :items="days"
                            v-model="day"
                            :disabled="editable"
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
                            :disabled="editable"
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
                            :disabled="editable"
                            label="End Time"
                            :rules="[(v) => !!v || 'Cannot be empty!',eTime > sTime || 'Should be greater STime!']"
                            required
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-btn
                            type="submit"
                            :disabled="editable"
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
                              :disabled="editable"
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
                        <v-select :items="availableRooms"
                        :disabled="editable"
                        v-model="room" label="Preferred rooms" outlined></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                        <v-btn type="submit"
                        :disabled="editable"
                         class="mx-2" fab dark color="indigo">
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
                          <v-btn
                          :disabled="editable"
                          @click.prevent="deleteprefferedRooms(preferredRooms.id)" text>Delete</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>

                <v-row>
                  <v-col cols="12" class="text-center">
                    <v-spacer></v-spacer>
                    <v-chip class="ma-2" x-large color="green" outlined dark>
                      <span>
                        Rank {{ lecturers.level }}.{{ lecturers.lecturerId }}
                      </span>
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-if="editable"
                      @click.prevent="edit"
                      color="blue"
                      class="mr-0"
                      >Edit Lecturer</v-btn
                    >
                    <v-btn v-else type="submit" color="success" class="mr-0"
                      >Save Lecturer</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn @click.prevent="deleteLecturer" color="red" class="mr-0"
                      >Delete Lecturer</v-btn
                    >
                  </v-col>
                </v-row>

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
  name: "ViewLecturer",
  data() {
    let times = [];

    for (var i = 1; i <= 24; i++) {
      times.push(`${i}:00`);
    }
    return {
      alert: false,
      id: "",
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
      rank: "",

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
      available: false,
      editable: true,

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
        if(subs[i].lecturerId!=x) {
            return subs[i].lecturerId;
        } else if(subs[i].lecturerId===x) {
            return x;
        }
      }
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
    availableRooms() {
      let rooms = this.$store.state.rooms;
      let selectRooms = [];
      for (var i = 0; i < rooms.length; i++) {
        selectRooms.push(rooms[i].name);
      }
      return selectRooms;
    },
  },
  methods: {
    ...mapActions(["editNewLecturerAction", "deleteNewLecturerAction"]),
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
    getLecturer() {
      let lecturerArr = this.mrState.lecturers.filter(
        (x) => x.rank === this.rank
      );
      if (lecturerArr.length > 0) {
        this.lecturers = {
          ...lecturerArr[0],
        };
        this.available = true;
      }
    },
    edit() {
      this.editable = false;
    },
    deleteLecturer() {
      let payload = {
        rank: this.lecturers.rank,
      };
      this.deleteNewLecturerAction(payload);
      this.lecturers.lecturerName = "";
      this.lecturers.lecturerId = "";
      this.lecturers.faculty = "";
      this.lecturers.department = "";
      this.lecturers.center = "";
      this.lecturers.building = "";
      this.lecturers.level = "";
      this.lecturers.unavailableTime = [];
      this.lecturers.prefferedRooms = [];
      this.available = false;
      this.editable = true;
      this.rank = "";
    },
    handleSubmit() {

      let payload = {
        oldrank: this.lecturers.rank,
        ...this.lecturers,
        rank: `${this.lecturers.level}.${this.lecturers.lecturerId}`,
      };
      this.editNewLecturerAction(payload);
      this.available = false;
      this.editable = true;
      this.id = "";
      this.alert = true;

    },
  },

};
</script>
