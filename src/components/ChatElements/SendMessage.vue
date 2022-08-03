<template>
  <div class="mt-2">
    <b-input-group>
      <b-form-input
        id="input-live"
        v-model="message"
        aria-describedby="input-live-help input-live-feedback"
        trim
        placeholder="Введите текст"
      ></b-form-input>
      <b-input-group-append>
        <b-button id="popover-target-1"> &#128512; </b-button>

        <b-popover target="popover-target-1" triggers="hover" placement="top">
          <span v-for="(smile, key) in smiles" :key="key"
            ><span
              class="p-1"
              v-html="myDynamicHtml(smile)"
              @click="addSmile(smile)"
            ></span
          ></span>
        </b-popover>

        <b-button variant="success" @click="sendMessage" :disabled="!message"
          >Отправить</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { EMOJI } from "./../../constants";
export default {
  props: {},
  name: "SendMessage",
  data() {
    return {
      message: "",
      smiles: EMOJI,
    };
  },
  methods: {
    sendMessage: function () {
      this.$emit("send-message", this.message);
      this.message = "";
    },

    addSmile: function (smile) {
      this.message = this.message + " " + smile + " ";
    },
    myDynamicHtml(smile) {
      return smile;
    },
  },
};
</script>

<style scoped>
button,
input {
  border-radius: 0;
}
</style>
