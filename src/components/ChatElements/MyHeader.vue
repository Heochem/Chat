<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#" class="px-3"
      >{{ brand }} - {{ username }}</b-navbar-brand
    >
  </b-navbar>
</template>

<script>
export default {
  props: {
    brand: String,
    username: String,
  },
  name: "MyHeader",
};
</script>
