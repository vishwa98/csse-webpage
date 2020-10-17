<template>
  <section class="mb-12 text-center">
    <h1
      class="font-weight-light mb-2 headline"
      v-text="`Locations`"
    />

    <span
      class="font-weight-light subtitle-1"
    >
      Please checkout the

        locations here

    </span>
  </section>
</template>

<script>
  export default {
    name: "VComponent",

    props: {
      heading: {
        type: String,
        default: "",
      },
      link: {
        type: String,
        default: "",
      },
    },
  };
</script>
