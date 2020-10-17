<template>
  <v-card class="d-inline-block mx-auto">
    <v-container>
      <v-row justify="space-between">
        <v-col cols="4" md="6" sm="12">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                <v-text-field
                  :disabled="editable"
                  label="Program Name"
                  v-model="programName"
                  class="purple-input"
                />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center pl-0">
          <v-row class="flex-row ma-0 fill-height" justify="space-between">
            <v-col v-if="editable" class="px-0">
              <v-btn @click.prevent="edit" icon color="warning">
                <v-icon x-large>mdi-pencil</v-icon>
              </v-btn>
            </v-col>

            <v-col v-else class="px-0">
              <v-btn @click.prevent="save" icon color="success">
                <v-icon x-large>mdi-folder</v-icon>
              </v-btn>
            </v-col>

            <v-col class="px-0">
              <v-btn @click.prevent="deleteProgram" icon color="success">
                <v-icon x-large color="red">mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["programName", "id"],

  data() {
    return {
      editable: true,
    };
  },
  methods: {
    ...mapActions(["editProgramAction", "deleteProgramAction"]),
    edit() {
      this.editable = false;
    },
    save() {
      let payload = {
        id: this.id,
        name: this.programName,
      };

      this.editProgramAction(payload);
      this.editable = true;
    },
    deleteProgram() {
      let payload = {
        name: this.programName,
      };

      this.deleteProgramAction(payload);
    },
  },
};
</script>