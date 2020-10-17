<template>

  <div>
    <v-tabs v-if="$vuetify.breakpoint.mdAndUp" centered>
      <v-tab to="/pages/subjectpage/addNewSubject">Add New Subject</v-tab>
      <v-tab to="/pages/subjectpage/view">View Subject</v-tab>
      <v-tab to="/pages/subjectpage/viewall">Subjects</v-tab>
    </v-tabs>
    <router-view/>
  </div>
  
</template>

<script>
export default {
  //
  name: "SubjectPage",
};
</script>
