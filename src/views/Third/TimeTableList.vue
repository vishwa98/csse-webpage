<template>
  <v-container>
    <h1>Time Table List: {{ selected }}</h1>
    <v-card>
      <v-card-title>
        <V-row>
          <v-col class="d-flex" cols="10">
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              hide-details
            />
          </v-col>
          <v-col class="d-flex" cols="2">
            <v-select
              v-model="selected"
              :items="items"
              solo
              label="Filter By"
            />
          </v-col>
        </V-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="timeTables"
        :search="search"
        @click:row="onClickRow"
      />
    </v-card>
  </v-container>
</template>

<script>
import TimeTableTypes from "./TimeTableTypes";
export default {
  name: "TimeTableList",
  mounted() {},
  beforeDestroy() {

  },
  data() {
    return {
      selected: "All",
      items: [
        TimeTableTypes.BATCH,
        TimeTableTypes.LECTURER,
        TimeTableTypes.SUBJECT,
        TimeTableTypes.ROOM,
        "All",
      ],
      search: "",
      headers: [
        {
          text: "Title/Name",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Conflicts", value: "conflict" },
      ],
      allTimeTables: this.$store.getters.getTimeTables,
    };
  },
  computed: {
    timeTables: function () {
      if (this.selected === "All") {
        return this.$store.getters.getTimeTables;
      } else {
        return this.$store.getters.getTimeTables.filter((timeTable) => {
          if (!timeTable.type && this.selected === TimeTableTypes.BATCH) {
            return true;
          } else {
            return timeTable.type === this.selected;
          }
        });
      }
    },
  },
  methods: {
    onClickRow(data) {
      this.$router.push({ path: `time-tables/edit/${data.id}` });
    },
  },
};
</script>

<style scoped>
</style>
