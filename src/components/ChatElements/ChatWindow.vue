<template>
  <div class="chat">
    <div v-for="(message, index) in messages" :key="index">
      <div
        class="messages"
        v-if="message.id"
        :class="{ mine: message.id === id, yours: message.id !== id }"
      >
        <div class="message">
          <div v-html="myDynamicHtml(message)" />
        </div>
      </div>
      <div v-else class="system">{{ message.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: Array,
    id: String,
  },
  name: "ChatWindow",
  data() {
    return { list: [] };
  },
  created() {
    this.list = this.messages;
  },
  methods: {
    myDynamicHtml(message) {
      return "<b>" + message.name + "</b> : " + message.text;
    },
  },
};
</script>

<style scoped>
.chat {
  overflow: auto;
  border: solid 1px #eee;
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 80vh;
  max-height: 600px;
}

.messages {
  display: flex;
  flex-direction: column;
}

.message {
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
}

.yours {
  align-items: flex-start;
}

.yours .message {
  margin-right: 25%;
  background-color: #eee;
  position: relative;
}

.yours .message.last:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -7px;
  height: 20px;
  width: 20px;
  background: #eee;
  border-bottom-right-radius: 15px;
}
.yours .message.last:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: -10px;
  width: 10px;
  height: 20px;
  background: white;
  border-bottom-right-radius: 10px;
}

.mine {
  align-items: flex-end;
}

.system {
  text-align: center;
}

.mine .message {
  color: white;
  margin-left: 25%;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
  position: relative;
}

.mine .message.last:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
  border-bottom-left-radius: 15px;
}

.mine .message.last:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: white;
  border-bottom-left-radius: 10px;
}
</style>
