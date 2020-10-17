<template>
  <v-content style="max-height: 100%; height: 100vh; ">
    <router-view />

    <dashboard-core-footer />
  </v-content>
</template>

<script>
  export default {
    name: "DashboardCoreView",

    components: {
      DashboardCoreFooter: () => import("./Footer"),
    },
  };
</script>
