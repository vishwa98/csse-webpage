<template>

  <div>
    <v-tabs v-if="$vuetify.breakpoint.mdAndUp" centered>
      <v-tab to="/pages/sessionpage/addNewSession">Add New Session</v-tab>
      <v-tab to="/pages/sessionpage/view">View Session</v-tab>
      <v-tab to="/pages/sessionpage/viewall">Sessions</v-tab>
    </v-tabs>
    <router-view/>
  </div>
  
</template>

<script>
export default {
  //
  name: "SessionPage",
};
</script>
