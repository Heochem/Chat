<template>
  <b-container>
    <MyHeader brand="Чат" :username="username" />
    <ChangeName :username="username" @change-name="changeUserName" />
    <b-row>
      <b-col><ChatWindow :messages="messages" :id="id" /></b-col>

      <b-col cols="3"><UserList :userlist="userlist" /></b-col>
    </b-row>

    <SendMessage @send-message="sendMessage" />
  </b-container>
</template>

<script>
import MyHeader from "./ChatElements/MyHeader.vue";
import ChangeName from "./ChatElements/ChangeName.vue";
import SendMessage from "./ChatElements/SendMessage.vue";
import ChatWindow from "./ChatElements/ChatWindow.vue";
import UserList from "./ChatElements/UserList.vue";

const { io } = require("socket.io-client");

export default {
  name: "ChatWrapper",
  props: {},
  components: {
    MyHeader,
    ChangeName,
    SendMessage,
    ChatWindow,
    UserList,
  },
  data() {
    return {
      socket: io("ws://localhost:5000"),
      username: "",
      messages: [],
      id: null,
      userlist: [],
    };
  },
  methods: {
    changeUserName: function (name) {
      this.username = name;
      this.socket.emit("change_username", { username: name });
    },
    sendMessage: function (message) {
      this.socket.emit("new_message", {
        message: message,
        name: this.username,
      });
    },
  },
  created() {
    this.socket.emit("start");
    this.socket.on("get_data", (user) => {
      if (!this.id) this.id = user.id;
      if (!this.username) this.username = user.username;
    });

    this.socket.on("get_user_list", (userlist) => {
      this.userlist = userlist;
    });

    this.socket.on("add_system_message", (message) => {
      this.messages.push({
        name: "system",
        text: message,
        id: null,
      });
    });

    this.socket.on("add_mess", (data) => {
      this.messages.push({
        name: data.username,
        text: data.message,
        id: data.id,
      });
    });
  },
};
</script>

<style scoped>
textarea {
  border-radius: 0;
}
</style>
