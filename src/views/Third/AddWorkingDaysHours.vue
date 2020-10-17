<template>
  <v-container class="main-container">
    <h1>Add working days & hours</h1>

    <v-container fluid>
      <v-alert v-if="showSavedAlerts" outlined type="success" text>
        Time table saved!
      </v-alert>
      <v-alert v-if="showErrorAlerts" outlined type="error" text>
        Time table for {{ selected.bId }} already exists!
      </v-alert>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="numOfWorkingDays"
          :counter="1"
          label="Number of working days"
          type="number"
          :rules="[
            (v) => !!v || 'Cannot be empty!',
            (v) => v > 0 || 'Should be greater than 0!',
          ]"
          required
        />
        <v-row>
          <v-checkbox
            v-model="mon"
            :label="`Monday`"
            @change="checkBoxValidation"
          />
          <v-checkbox
            v-model="tues"
            :label="`Tuesday`"
            @change="checkBoxValidation"
          />
          <v-checkbox
            v-model="wed"
            :label="`Wedday`"
            @change="checkBoxValidation"
          />
          <v-checkbox
            v-model="thurs"
            :label="`Thursday`"
            @change="checkBoxValidation"
          />
          <v-checkbox
            v-model="fri"
            :label="`Friday`"
            @change="checkBoxValidation"
          />
          <v-checkbox
            v-model="sat"
            :label="`Saturday`"
            @change="checkBoxValidation"
          />
          <v-checkbox
            v-model="sun"
            :label="`Sunday`"
            @change="checkBoxValidation"
          />
        </v-row>

        <v-text-field
          v-model="workingHours"
          :counter="1"
          label="Starting Hour"
          type="number"
          :rules="[
            (v) => !!v || 'Cannot be empty!',
            (v) => v > 0 || 'Should be greater than 0!',
          ]"
          required
        />

        <v-text-field
          v-model="timeSlotRange"
          :counter="30"
          label="Time Slot Range(in mins)"
          type="number"
          step="30"
          max="120"
          min="30"
          :rules="[
            (v) => !!v || 'Cannot be empty!',
            (v) => v > 0 || 'Should be greater than or equal to 30 mins!',
            (v) => v % 30 === 0 || 'it should be in increments of 30',
          ]"
          required
        />
        <!-- <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        /> -->

        <v-select
          v-if="selected"
          v-model="selected"
          :hint="`Year: ${selected.year} Semester: ${selected.semester} Program: ${selected.program} Group: ${selected.groupNumber}`"
          :items="studentBatch"
          item-text="bId"
          item-value="bId"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
        <br />
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          rounded
          :rules="[
            (v) =>
              numOfWorkingDays === days.length ||
              'Selected days of week does not match',
          ]"
          @click="validate"
        >
          Generate
        </v-btn>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import TimeTableTypes from "./TimeTableTypes";
import TimeTableGenerator from "./TimeTableGenerator";
export default {
  name: "AddWorkingDaysHours",
  data() {
    return {
      selected: { bId: "Not Selected" },
      name: "",
      showSavedAlerts: false,
      showErrorAlerts: false,
      mon: false,
      tues: false,
      wed: false,
      thurs: false,
      fri: false,
      sat: false,
      sun: false,
      valid: false,
      numOfWorkingDays: 1,
      workingHours: 2,
      timeSlotRange: 30,
      days: [],
      emailRules: [(v) => Boolean(v) || "Cannot be empty!"],
      nameRules: [(v) => Boolean(v) || "Cannot be empty!"],
      studentBatch: [],
    };
  },
  mounted() {
    console.log("Mounted");
    this.studentBatch = this.$store.state.tharikState.studentBatches;
    this.selected = this.studentBatch[0];
    console.log(this.selected);
  },
  methods: {
    validate() {
      this.checkBoxValidation();
      this.$refs.form.validate();

      if (
        !TimeTableGenerator.checkIfBatchTableAlreadyExists(
          this.selected.bId,
          this.$store.state.timeTables
        )
      ) {
        this.showSavedAlerts = true;
        const createdTimeTable = TimeTableGenerator.createTimeTable(
          `Time Table for Batch: ${this.selected.bId}`,
          this.numOfWorkingDays,
          this.workingHours,
          this.timeSlotRange,
          this.days,
          [],
          TimeTableTypes.BATCH,
          this.selected
        );
        this.$store.commit("ADD_NEW_TIME_TABLE", createdTimeTable);
      } else {
        this.showErrorAlerts = true;
      }
    },
    ResetFields() {
      this.name = "";
      this.showSavedAlerts = false;
      this.showErrorAlerts = false;
      this.mon = false;
      this.tues = false;
      this.wed = false;
      this.thurs = false;
      this.fri = false;
      this.sat = false;
      this.sun = false;
      this.valid = false;
      this.numOfWorkingDays = 1;
      this.workingHours = 9;
      this.timeSlotRange = 30;
    },
    checkBoxValidation() {
      this.days = [];
      if (this.sun) {
        this.days.push(0);
      }
      if (this.mon) {
        this.days.push(1);
      }
      if (this.tues) {
        this.days.push(2);
      }
      if (this.wed) {
        this.days.push(3);
      }
      if (this.thurs) {
        this.days.push(4);
      }
      if (this.fri) {
        this.days.push(5);
      }
      if (this.sat) {
        this.days.push(6);
      }

      this.numOfWorkingDays = this.days.length;
    },
  },
};
</script>

<style scoped>
.main-container {
  padding: 20px;
}
</style>
