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
        >Successfully Edited Subject.
      </v-alert>
    </div>
    <v-container>
      <v-row justify="center">
        <v-col cols="3" md="2">
          <v-text-field
            :label="$t('search')"
            v-model="id"
            color="secondary"
            hide-details
            style="max-width: 165px;"
          >
            <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
              <v-btn @click="getSubject()"
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
              <div class="display-2 font-weight-light">Edit Subject</div>

              <div class="subtitle-1 font-weight-light">{{ subjects.subjectCode }}</div>
            </template>

          <v-form @submit.prevent="handleSubmit">
            <v-container class="py-0">

            <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                  :disabled="editable"
                  v-model="subjects.subjectName"
                  label="Subject Name"
                  class="purple-input"
                  :rules="[(v) => !!v || 'Cannot be empty!']"
                  required/>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                  :disabled="editable"
                  v-model="subjects.subjectCode"
                  label="Subject Code"
                  class="purple-input"
                  :rules="[(v) => v != getall || 'Already In Use']"
                  required/>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                  <v-select
                  :items="years"
                  label="Offered Year"
                  :disabled="editable"
                  v-model="subjects.offeredYear"
                  outlined></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                  :items="Semester"
                  label="Semester"
                  :disabled="editable"
                  v-model="subjects.semester"
                  outlined></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                  class="purple-input"
                  :disabled="editable"
                  v-model="subjects.lectureHours"
                  label="Lecture Hours"
                  type="number"
                  :rules="[(v) => !!v || 'Cannot be empty!',(v) => v > 0 || 'Should be greater than 0!',(v) => v < 5 || 'Should be less than 5!',]"
                  required
                  outlined/>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                  class="purple-input"
                  :disabled="editable"
                  v-model="subjects.tutorialHours"
                  label="Tutorial Hours"
                  type="number"
                  :rules="[(v) => !!v || 'Cannot be empty!',(v) => v > 0 || 'Should be greater than 0!',(v) => v < 5 || 'Should be less than 5!',]"
                  required
                  outlined/>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                  class="purple-input"
                  :disabled="editable"
                  v-model="subjects.labHours"
                  label="Lab Hours"
                  type="number"
                  :rules="[(v) => !!v || 'Cannot be empty!',(v) => v > 0 || 'Should be greater than 0!',(v) => v < 5 || 'Should be less than 5!',]"
                  required
                  outlined/>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                  class="purple-input"
                  :disabled="editable"
                  v-model="subjects.evaluationHours"
                  label="Evaluation Hours"
                  type="number"
                  :rules="[(v) => !!v || 'Cannot be empty!',(v) => v > 0 || 'Should be greater than 0!',(v) => v < 5 || 'Should be less than 5!',]"
                  required
                  outlined/>
                </v-col>
            </v-row>

                <v-container fluid class="Preferredrooms">
                  <v-row justify="start">
                    <v-col
                    v-for="(preferredRooms,
                        i) in subjects.prefferedRooms"
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
                          <v-btn @click.prevent="deleteprefferedRooms(preferredRooms.id)" :disabled="editable" text>
                            Delete</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>

            <v-form @submit.prevent="addprefferedRooms">
            <v-row>
                <v-col cols="12" md="6">
                  <v-select :disabled="editable" :items="availableRooms" v-model="room" label="Preferred rooms" outlined></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn type="submit" :disabled="editable" class="mx-2" fab dark color="indigo">
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
            </v-row>
            </v-form>

            <v-divider dark></v-divider>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-spacer></v-spacer>
                    <v-chip class="ma-2" x-large color="green" outlined dark>
                      <span>
                        sId {{ subjects.subjectCode }}
                      </span>
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-if="editable"
                      @click.prevent="edit"
                      color="blue"
                      class="mr-0"
                      >Edit Subject</v-btn
                    >
                    <v-btn v-else type="submit" color="success" class="mr-0"
                      >Save Subject</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteSubject" color="red" class="mr-0"
                      >Delete Subject</v-btn
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
  name: "ViewSubject",
    data() {
    let times = [];
    for (var i = 1; i <= 24; i++) {
      times.push(`${i}:00`);
    }
    return {
      alert: false,
      id: "",
      room: "",
      years: ["1","2","3","4"],
      Semester: ["1","2"],
      Preferredrooms: ["B1502", "H1209", "L1401", "H1302"],
      times,
      subjects: {
        offeredYear: "",
        semester: "",
        subjectName: "",
        subjectCode: "",
        lectureHours: "",
        tutorialHours: "",
        labHours: "",
        evaluationHours: "",
        prefferedRooms: [],
      },
      available: false,
      editable: true,
    };
  },
  mounted() {
  },
  computed: {
    ...mapState(["mrState"]),
    getall(){
      let subs = this.mrState.subjects;
      let x = this.subjects.subjectCode;
      let y = "";
      for (var i = 0; i < subs.length; i++) {
        if(subs[i].subjectCode!=x) {
            return subs[i].subjectCode;
        } else if(subs[i].subjectCode===x) {
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
    }
  },

  methods: {
    ...mapActions(["editNewSubjectAction", "deleteNewSubjectAction"]),

    addprefferedRooms() {

      if (this.room) {
        this.subjects.prefferedRooms.push({
          id: this.subjects.prefferedRooms.length,
          room: this.room,
        });
        this.room = "";
      }
    },
    deleteprefferedRooms(id) {
      this.subjects.prefferedRooms = this.subjects.prefferedRooms.filter(
        (x) => x.id !== id
      );
    },
    getSubject() {
      let subjectArr = this.mrState.subjects.filter(
        (x) => x.sId === this.id
      );
      if (subjectArr.length > 0) {
        this.subjects = {
          ...subjectArr[0],
        };
        this.available = true;
      }
    },
    edit() {
      this.editable = false;
    },
    deleteSubject() {
      let payload = {
        sId:this.subjects.subjectCode,
      };
      this.deleteNewSubjectAction(payload);
      this.subjects.offeredYear = "";
      this.subjects.semester = "";
      this.subjects.subjectName = "";
      this.subjects.subjectCode = "";
      this.subjects.lectureHours = "";
      this.subjects.tutorialHours = "";
      this.subjects.labHours = "";
      this.subjects.evaluationHours = "";
      this.subjects.prefferedRooms = [];
      this.available = false;
      this.editable = true;
      this.id = "";
    },
    handleSubmit() {

      let payload = {
        oldsId: this.subjects.subjectCode,
        ...this.subjects,
        sId:`${this.subjects.subjectCode}`,
      };
      this.editNewSubjectAction(payload);
      this.available = false;
      this.editable = true;
      this.id = "";
      this.alert = true;
    },
  }
};
</script>
