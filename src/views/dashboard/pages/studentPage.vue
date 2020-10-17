<template>
  <div>
    <v-tabs v-if="$vuetify.breakpoint.mdAndUp" centered>
      <v-tab exact to="/pages/student/">Add Student Batch</v-tab>
      <v-tab exact to="/pages/student/view">View Student Batch</v-tab>
      <v-tab exact to="/pages/student/program">Programs</v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "StudentPage",
};
</script>
