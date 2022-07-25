<template>
  <div class="mt-2 mb-2">
    <b-input-group>
      <b-form-input
        id="input-live"
        v-model="name"
        aria-describedby="input-live-help input-live-feedback"
        trim
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="success" @click="changeName">Изменить</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  props: {
    username: String,
  },
  name: "ChangeName",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    changeName: function () {
      this.$emit("change-name", this.name);
    },
  },
  created() {
    this.name = this.username;
  },
};
</script>

<style scoped>
button,
input {
  border-radius: 0;
}
</style>
