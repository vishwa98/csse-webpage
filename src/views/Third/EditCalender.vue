<template>
  <v-row>
    <v-col cols="11">
      <v-alert v-if="showSavedAlerts" type="success">
        Time table saved!
      </v-alert>
      <v-sheet height="85vh" width="100%">
        <v-calendar
          id="timeTable"
          ref="calendar"
          :value="today"
          :events="events"
          color="primary"
          type="week"
          start="2019-01-12"
          end="2019-01-27"
          :first-time="`${workingHours}:00`"
          :interval-count="intervalCount"
          :interval-minutes="timeSlot"
          :interval-format="intervalFormat"
          :weekdays="weekday"
          category-days="2"
          @click:time="onEvent"
        >
        </v-calendar>
      </v-sheet>
    </v-col>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">
          {{ dialogTitle }}
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field
              v-model="startHour"
              label="Start Hour"
              type="time"
              :rules="[(v) => !!v || 'Cannot be empty!']"
              required
            />

            <!-- <v-text-field
              v-model="duration"
              :rules="[
                (v) => !!v || 'Cannot be empty!',
                (v) => v > 0 || 'Should be greater than 0!',
              ]"
              label="Duration (mins)"
              type="number"
              min="30"
              max="120"
              step="30"
              required
            /> -->
            <!-- <v-col align-self="center">
              <p>Lecturers:</p>
              <v-select
                v-model="selectedLecturer"
                :items="lecturers"
                label="Select Lecturer"
                item-text="lecturerName"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col> -->
            <v-col align-self="center" v-if="batchID">
              <p>Available Sessions For: {{ batchID }}</p>
              <v-select
                v-model="selectedSession"
                :items="sessions"
                label="Select Sessions"
                item-text="sessionId"
                persistent-hint
                return-object
                single-line
                required
              ></v-select>
            </v-col>
            <hr />

            <v-col align-self="center" v-if="selectedSession">
              <p>
                Available Lecturers For: {{ selectedSession.subject }}
                {{ selectedSession.tag }}
              </p>
              <v-select
                v-model="selectedLecturer"
                :items="selectedSession.lecturers"
                label="Select Lecturer"
                item-text="lect"
                persistent-hint
                return-object
                single-line
                required
              ></v-select>
            </v-col>

            <v-col
              align-self="center"
              v-if="selectedSession && selectedLecturer"
            >
              <p>
                Available Rooms For {{ selectedLecturer.lect }} to teach
                {{ selectedSession.subject }} {{ selectedSession.tag }}
              </p>
              <v-select
                v-model="selectedRoom"
                :items="selectedSession.prefferedRooms"
                label="Rooms"
                item-text="room"
                persistent-hint
                return-object
                single-line
                required
              ></v-select>
            </v-col>
            <hr />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="!valid || getValidation()"
              color="success"
              class="mr-4"
              @click="addOrUpdate"
            >
              {{ btnLabel }}
            </v-btn>
            <v-btn
              v-if="currentIndex >= 0"
              color="red"
              class="mr-4"
              @click="remove"
            >
              Remove
            </v-btn>
            <v-btn color="orange" class="mr-4" @click="dialog = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-col cols="1">
      <v-row>
        <v-btn color="success" class="mr-4" width="100px" @click="onPrint">
          Print
        </v-btn>
      </v-row>
      <v-spacer />
      <v-row>
        <v-btn color="success" class="mr-4" width="100px" @click="onSave">
          Save
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import TimeTableTypes from "./TimeTableTypes";
export default {
  name: "EditCalender",

  data: () => ({
    weekday: [0, 1, 2, 3, 4, 5, 6],
    index: -1,
    showSavedAlerts: false,
    today: "2020-01-08",
    clickedDate: "",
    dialog: false,
    dialogTitle: "Add New Item",
    title: "",
    btnLabel: "Add",
    startHour: "09:00",
    workingHours: "9",
    intervalCount: "24",
    timeSlot: "60",
    nameRules: [
      (v) => Boolean(v) || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    events: [],
    valid: true,
    duration: 30,
    currentIndex: -1,
    id: -1,
    lecturers: [],
    sessions: [],
    selectedSession: { sessionId: "Select" },
    selectedLecturer: { lecturerName: "Select" },
    table: {},
    batchID: "Batch",
    selectedRoom: "Main",
  }),
  mounted() {
    this.id = parseInt(this.$route.params.id);
    this.index = this.$store.state.timeTables.findIndex(
      (timeTable) => timeTable.id === this.id
    );
    if (this.index >= 0) {
      this.table = this.$store.state.timeTables[this.index];
      this.events = this.table.events;
      this.weekday = this.table.days;
      this.timeSlot = this.table.timeSlot.toString();
      this.workingHours = this.table.workingHours.toString();
      this.intervalCount = 24 - this.table.workingHours;
      if (this.table.timeSlot < 60) {
        this.intervalCount = this.intervalCount * 2;
      }
      this.lecturers = this.$store.state.mrState.lecturers;
      if (this.table.type === TimeTableTypes.BATCH && this.table.typePayload) {
        this.sessions = this.$store.state.mrState.sessions.filter(
          (session) => this.table.typePayload.bId === session.batch
        );
        this.batchID = `batch ${this.table.typePayload.bId}`;
      }
      console.log("Sessions: ", this.sessions);
    } else {
      console.log(`ID: ${this.id}, Index not found`);
    }
  },
  methods: {
    intervalFormat(interval) {
      return interval.time;
    },
    getValidation() {
      return (
        !this.selectedLecturer || !this.selectedRoom || !this.selectedSession
      );
    },
    addOrUpdate(e) {
      if (this.$refs.form.validate()) {
        const startDateTime = `${this.clickedDate} ${this.startHour}`;

        const endDateTime = moment(
          moment(startDateTime, "YYYY-MM-DD HH:mm").add(
            "minute",
            Math.max(this.selectedSession.duration, 30)
          )
        )
          .format("YYYY-MM-DD HH:mm")
          .toString();
        this.title = `${this.selectedSession.subject} ${this.selectedSession.tag}`;
        console.log(this.title);
        if (this.currentIndex < 0) {
          this.dialog = false;
          this.events.push({
            name: this.title,
            start: startDateTime,
            end: endDateTime,
            session: this.selectedSession,
          });
        } else {
          this.dialog = false;
          this.events[this.currentIndex].name = this.title;
          this.events[this.currentIndex].start = startDateTime;
          this.events[this.currentIndex].end = endDateTime;
          this.events[this.currentIndex].session = this.selectedSession;
        }
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    onSave() {
      this.showSavedAlerts = true;
      this.$store.commit("MODIFY_TIME_TABLE_EVENTS", {
        index: this.index,
        events: this.events,
      });
      setTimeout(() => {
        this.showSavedAlerts = false;
      }, 3000);
    },
    onPrint() {
      // Get HTML to print from element
      const prtHtml = this.$el.children[0].children[0].innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = "";
      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style'),
      ]) {
        stylesHtml += node.outerHTML;
      }

      // Open the print window
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );

      WinPrint.document.write(`<!DOCTYPE html>
                                <html>
                                  <head>
                                    ${stylesHtml}
                                    v-event-timed {
                                      background-color: #4CAF50;
                                      color: white;
                                    }
                                  </head>
                                  <body>
                                    ${prtHtml}
                                  </body>
                                </html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      // WinPrint.close();
    },
    remove() {
      if (this.currentIndex >= 0) {
        this.events.splice(this.currentIndex, 1);
        console.log("Removed");
        this.dialog = false;
        this.currentIndex = -1;
      } else {
        console.log("Not selected");
      }
    },
    onEvent(e) {
      this.selectedSession = null;
      this.selectedLecturer = null;
      this.selectedRoom = null;
      const clickeDateTime = moment(`${e.date} ${e.time}`).valueOf();
      const index = this.events.findIndex((event) => {
        const start = moment(event.start).valueOf();
        const end = moment(event.end).valueOf();
        if (clickeDateTime >= start && clickeDateTime <= end) {
          return true;
        } else {
          return false;
        }
      });

      if (index !== -1) {
        this.btnLabel = "Update";
        this.clickedDate = e.date;
        let hours = moment(`${e.date} ${e.time}`).hour().toString();
        let mins = moment(`${e.date} ${e.time}`).minute();
        if (mins >= 45) {
          mins = "00";
          hours = hours++;
        } else if (mins < 15) {
          mins = "00";
        } else if (mins > 15 && mins < 45) {
          mins = "30";
        }
        if (hours < 10) {
          hours = "0" + hours;
        }
        this.startHour = `${hours}:${mins}`;
        this.dialogTitle = "Edit existing item: " + this.events[index].name;
        this.currentIndex = index;
        this.title = this.events[index].name;
        if (this.events[index].selectedSession) {
          this.selectedSession = this.events[index].selectedSession;
        }
        this.dialog = true;
      } else {
        this.btnLabel = "Add";
        this.clickedDate = e.date;
        this.title = "";
        let hours = moment(`${e.date} ${e.time}`).hour();
        let mins = moment(`${e.date} ${e.time}`).minute();
        if (mins >= 45) {
          mins = "00";
          hours = hours++;
        } else if (mins < 15) {
          mins = "00";
        } else if (mins > 15 && mins < 45) {
          mins = "30";
        }

        if (hours < 10) {
          hours = "0" + hours;
        }
        this.startHour = `${hours}:${mins}`;
        this.currentIndex = -1;
        this.dialogTitle = "Add new item!";
        this.dialog = true;
      }
    },
  },
};
</script>

<style scoped>
.calender-scroll {
  overflow-y: auto;
}
</style>
