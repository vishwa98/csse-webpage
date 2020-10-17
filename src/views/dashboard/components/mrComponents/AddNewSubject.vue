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
        >Successfully Added Subject.</v-alert>
    </div>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Add New Subject</div>

            <div class="subtitle-1 font-weight-light">Complete Subject Data</div>
          </template>

          <v-form @submit.prevent="handleSubmit">
            <v-container class="py-0">

            <v-row>
                <v-col cols="12" md="4">
                  <v-select :items="years" v-model="subjects.offeredYear" label="Offered Year" outlined></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select :items="Semester" v-model="subjects.semester" label="Semester" outlined></v-select>
                </v-col>
            </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                  label="Subject Name"
                  v-model="subjects.subjectName"
                  class="purple-input"
                  :rules="[(v) => !!v || 'Cannot be empty!']"
                  required/>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                  label="Subject Code"
                  v-model="subjects.subjectCode"
                  class="purple-input"
                  :rules="[(v) => v != getall || 'Already In Use!']"
                  required/>
                </v-col>
              </v-row>

            <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                  class="purple-input"
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
                  v-model="subjects.evaluationHours"
                  label="Evaluation Hours"
                  type="number"
                  :rules="[(v) => !!v || 'Cannot be empty!',(v) => v > 0 || 'Should be greater than 0!',(v) => v < 5 || 'Should be less than 5!',]"
                  required
                  outlined/>
                </v-col>
            </v-row>
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
                          <v-btn @click.prevent="deleteprefferedRooms(preferredRooms.id)" text>Delete</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>

              <v-divider dark></v-divider>

              <v-row>
                <v-col cols="12" class="text-center">
                  <v-chip class="ma-2" x-large color="green" outlined dark>
                      <span>
                        sId {{ subjects.subjectCode }}
                      </span>
                  </v-chip>
                  <v-btn type="submit" color="success" class="mr-0"
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
  name: "AddNewSubject",
    data() {
    let times = [];
    for (var i = 1; i <= 24; i++) {
      times.push(`${i}:00`);
    }
    return {
      alert: false,
      years: [1,2,3,4],
      Semester: [1,2],
      Preferredrooms: ["B1502", "H1209", "L1401", "H1302"],
      times,
      room: "",
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
    };
  },
  mounted() {
  },
  computed: {
    ...mapState(["mrState"]),

    getall(){
      let subs = this.mrState.subjects;
      let x = this.subjects.subjectCode;
      //let y = "";
      for (var i = 0; i < subs.length; i++) {
        if(subs[i].subjectCode===x){
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
    ...mapActions(["addNewSubjectAction"]),
    addprefferedRooms() {

      if (this.room) {
        this.subjects.prefferedRooms.push({
          id:this.subjects.prefferedRooms.length,
          room:this.room,
        });
        this.room = "";
      }
    },
    deleteprefferedRooms(id) {
      this.subjects.prefferedRooms = this.subjects.prefferedRooms.filter(
        (x) => x.id !== id
      );
    },
    handleSubmit() {
      if(!this.subjects.subjectCode==" " && !this.subjects.subjectName == " ") {
      let payload = {
        ...this.subjects,
        sId:`${this.subjects.subjectCode}`,
      };
      this.addNewSubjectAction(payload);
      this.subjects.offeredYear = "";
      this.subjects.semester = "";
      //this.subjects.subjectName = "";
      this.subjects.subjectCode = "";
      //this.subjects.lectureHours = "";
      //this.subjects.tutorialHours = "";
      //this.subjects.labHours = "";
      //this.subjects.evaluationHours = "";
      this.subjects.prefferedRooms = [];
      this.alert = true;
      }
    },
  }
};
</script>
