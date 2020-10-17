<template>

  <div>
    <v-tabs v-if="$vuetify.breakpoint.mdAndUp" centered>
      <v-tab to="/pages/lecturerpage/addNewLecturer">Add New Lecture</v-tab>
      <v-tab to="/pages/lecturerpage/view">View Lecturer</v-tab>
      <v-tab to="/pages/lecturerpage/viewall">Lecturers</v-tab>
    </v-tabs>
    <router-view/>
  </div>
  
</template>

<script>
export default {
  //
  name: "LecturerPage",
};
</script>
