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
        >Successfully Edited</v-alert
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
              <v-btn @click="getSession" class="mt-n2" elevation="1" fab small>
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
              <div class="display-2 font-weight-light">Parallel Sessions</div>

              <div class="subtitle-1 font-weight-light">Add Sessions</div>
            </template>

            <v-form @submit.prevent="handleSubmit">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      :disabled="editable"
                      :items="years"
                      v-model="parallelSession.year"
                      label="Year"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select
                      :disabled="editable"
                      :items="semesters"
                      label="Semester"
                      v-model="parallelSession.semester"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select
                      :disabled="editable"
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
                            <v-subheader>Sessions</v-subheader>
                            <v-list-item-group color="primary">
                              <v-list-item
                                v-for="(item, i) in cs"
                                v-bind:key="i"
                              >
                                <v-list-item-content>
                                  <v-list-item-title></v-list-item-title>
                                  <v-list-item-title
                                    v-text="item"
                                  ></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                          <v-card-actions
                            ><v-btn
                              depressed
                              :disabled="editable"
                              color="error"
                              @click.stop="deleteSession(j)"
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
                            :disabled="editable"
                            v-model="set"
                            label="SET"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                            :disabled="editable"
                            :items="availableSessions"
                            v-model="sessionId"
                            label="Session ID"
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
                    <v-spacer></v-spacer>
                    <v-btn
                      v-if="editable"
                      @click.prevent="edit"
                      color="blue"
                      class="mr-0"
                      >Edit parallel Sessions</v-btn
                    >

                    <v-btn v-else type="submit" color="success" class="mr-0"
                      >Save parallel Sessions</v-btn
                    >
                    <v-spacer></v-spacer>
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
  name: "ViewParallelSessionForm",
  data() {
    return {
      available: false,
      id: "",
      editable: true,
      alert: false,
      years: [1, 2, 3, 4],
      semesters: [1, 2],
      set: "",
      sessionId: "",
      parallelSession: {
        sid: "",
        year: "",
        semester: "",
        program: "",
        parallelSessions: [],
      },
    };
  },
  methods: {
    ...mapActions(["editParallelSessionAction", "deleteParallelSessionAction"]),
    getSession() {
      let sessionsArr = this.tharikState.parallelSessions.filter(
        (x) => x.sid === this.id
      );

      if (sessionsArr.length > 0) {
        this.parallelSession = {
          ...sessionsArr[0],
        };
        this.available = true;
        console.log(this.parallelSession);
      }
    },
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
    edit() {
      this.editable = false;
    },
    handleSubmit() {
      let payload = {
        ...this.parallelSession,
        oldSid: this.parallelSession.sid,
        sid: `Y${this.parallelSession.year}.S${this.parallelSession.semester}.${this.parallelSession.program}`,
      };
      this.editParallelSessionAction(payload);
      this.parallelSession.parallelSessions = [];
      this.alert = true;
      this.available = false;
      this.editable = true;
    },
  },
  computed: {
    ...mapState(["tharikState", "mrState"]),
    availablePrograms() {
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
