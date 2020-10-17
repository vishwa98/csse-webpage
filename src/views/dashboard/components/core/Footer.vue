<template>
  <v-footer
    id="dashboard-core-footer"
  >
    <!-- <v-spacer style="flex-grow: 1;" />
    <div
      class="body-1 font-weight-light pt-6 pt-md-0 text-center"
    >
      &copy; 2020, Time Table Generator
    </div> -->
  </v-footer>
</template>

<script>
  export default {
    name: "DashboardCoreFooter",

    data: () => ({
      links: [
        {
          href: "#",
          text: "Time Table Generator",
        },
        // {
        //   href: "#",
        //   text: "About Us",
        // },
        // {
        //   href: "#",
        //   text: "Blog",
        // },
        // {
        //   href: "#",
        //   text: "Licenses",
        // },
      ],
    }),
  };
</script>

<style>
  #dashboard-core-footer a {
      font-size: .825rem;
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
  }
</style>
