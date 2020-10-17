<template>
  <div>
    <v-container>
      <v-row justify="start" wrap>
        <Program
          v-for="(program, i) in availablePrograms"
          :key="i"
          :programName="program"
          :id="i"
        />
      </v-row>
      <v-row>
        <v-col>
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
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-form @submit.prevent="addProgram">
            <v-container>
              <v-row justify="center" wrap>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="name"
                    label="Program name"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="12" md="3" class="text-center">
                  <v-btn type="submit" color="success" class="mr-0"
                    >Add Program</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Program from "./Program";
export default {
  name: "Programs",
  components: {
    Program,
  },

  data() {
    return {
      alertBox: false,
      alertBoxMessage: "",
      alertBoxType: "success",
      alertBoxColor: "red",
      name: "",
    };
  },
  computed: {
    ...mapState(["tharikState", "alert"]),
    availablePrograms() {
      let programs = this.tharikState.programs;
      console.log("tharikState.programs", programs);
      let selectPrograms = [];
      for (var i = 0; i < programs.length; i++) {
        selectPrograms.push(programs[i].name);
      }
      return selectPrograms;
    },
  },
  methods: {
    ...mapActions(["addProgramAction"]),

    addProgram() {
      let payload = {
        name: this.name,
      };

      this.addProgramAction(payload);
      this.alertBox = true;

      this.alertBoxMessage = this.alert.message;
      this.alertBoxType = this.alert.type;
      this.alertBoxColor = this.alert.color;

      this.name = "";
    },
  },
};
</script>
