<template>
  <div>
    <v-tabs v-if="$vuetify.breakpoint.mdAndUp" centered>
      <v-tab exact to="/pages/sessionGroup/">Add Consecutive Session</v-tab>
      <v-tab exact to="/pages/sessionGroup/viewconsecutive"
        >View Consecutive Session</v-tab
      >
      <v-tab exact to="/pages/sessionGroup/addparallel">Add Parallel Session</v-tab>
      <v-tab exact to="/pages/sessionGroup/viewparallel"
        >View Parallel Session</v-tab
      >
    </v-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "SessionsPage",
};
</script>
