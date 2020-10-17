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
        >Successfully Added Parallel Sessions !</v-alert
      >
    </div>
    <v-container id="user-profile" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">Parallel Sessions</div>

              <div class="subtitle-1 font-weight-light">Add Sessions</div>
            </template>

            <v-form @submit.prevent="handleSubmit">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="years"
                      v-model="parallelSession.year"
                      label="Year"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select
                      :items="semesters"
                      label="Semester"
                      v-model="parallelSession.semester"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select
                      :items="availablePrograms"
                      label="Program"
                      v-model="parallelSession.program"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-divider></v-divider>
                  <v-col cols="12">
                    <v-subheader v-bind:style="{ fontSize: '26px' }"
                      >Add parallel Sessions</v-subheader
                    >
                  </v-col>
                  <v-container
                    v-if="parallelSession.parallelSessions.length > 0"
                    fluid
                    class="notAvailable"
                  >
                    <v-row>
                      <v-col
                        justify="start"
                        v-for="(cs, j) in parallelSession.parallelSessions"
                        :key="j"
                        cols="12"
                        md="4"
                      >
                        <v-card class="mx-auto" max-width="300" tile>
                          <v-list dense>
                            <v-subheader>Parallel Sessions</v-subheader>
                            <v-list-item-group color="primary">
                              <v-list-item v-for="(item, i) in cs" :key="i">
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-text="item"
                                  ></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                          <v-card-actions>
                            <v-btn
                              depressed
                              color="error"
                              @click.prevent="deleteSession(j)"
                            >
                              DELETE
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-form @submit.prevent="addSessions">
                      <v-row justify="start">
                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="set"
                            label="SET"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                            :items="availableSessions"
                            v-model="sessionId"
                            label="session Id"
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
                  <v-chip class="ma-2" x-large color="green" outlined dark>
                    <span>
                      Y{{ parallelSession.year }}.S{{
                        parallelSession.semester
                      }}.{{ parallelSession.program }}
                    </span>
                  </v-chip>

                  <v-col cols="12" class="text-center">
                    <v-btn type="submit" color="success" class="mr-0"
                      >Add
                    </v-btn>
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
  name: "AddParallelSessionForm",
  data() {
    return {
      alert: false,
      years: [1, 2, 3, 4],
      semesters: [1, 2],
      set: "",
      sessionId: "",
      parallelSession: {
        year: "",
        semester: "",
        program: "",
        parallelSessions: [],
      },
    };
  },
  methods: {
    ...mapActions(["addParallelSessionAction"]),
    addSessions() {
      let i = 0;
      if (
        this.parallelSession.parallelSessions.length > 0 &&
        this.set <= this.parallelSession.parallelSessions.length
      ) {
        this.parallelSession.parallelSessions = this.parallelSession.parallelSessions.map(
          (x) => {
            if (this.set - 1 === i) {
              x.push(this.sessionId);
            }
            i++;
            return x;
          }
        );
      } else {
        this.parallelSession.parallelSessions.push([this.sessionId]);
      }
    },
    deleteSession(i) {
      console.log(i);
      let j = 0;
      this.parallelSession.parallelSessions = this.parallelSession.parallelSessions.filter(
        (x) => {
          if (j !== i) {
            j++;
            return x;
          }
          j++;
          return;
        }
      );
    },
    handleSubmit() {
      let payload = {
        ...this.parallelSession,
        sid: `Y${this.parallelSession.year}.S${this.parallelSession.semester}.${this.parallelSession.program}`,
      };
      this.addParallelSessionAction(payload);
      this.parallelSession.parallelSessions = [];
      this.alert = true;
    },
  },
  computed: {
    ...mapState(["tharikState", "mrState"]),
    availablePrograms() {
      //hello
      let programs = this.tharikState.programs;
      console.log("tharikState.programs", programs);
      let selectPrograms = [];
      for (var i = 0; i < programs.length; i++) {
        selectPrograms.push(programs[i].name);
      }
      return selectPrograms;
    },
     availableSessions() {
      let sessions = this.mrState.sessions;
      sessions = sessions.filter((x) => {
        return x.type == "parallel";
      });

      console.log("mrState.sessions", sessions);
      let selectSessions = [];
      for (var i = 0; i < sessions.length; i++) {
        selectSessions.push(sessions[i].sessionId);
      }
      return selectSessions;
    },
  },
};
</script>
