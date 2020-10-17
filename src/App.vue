<template>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  methods: {
    ...mapActions(["setBuildingsAction"]),

    ...mapActions(["setRoomsAction"]),

    ...mapActions(["setRoutesAction"])
  },
  async created() {
    this.setBuildingsAction();
    this.setRoomsAction();
    this.setRoutesAction();
  },
};
</script>
