<template>
  <div class="userList">
    <b-list-group
      style="max-width: 300px"
      v-for="(user, id) in userlist"
      :key="id"
    >
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar class="mr-3"></b-avatar>
        <span class="mr-auto">{{ user.username }}</span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: {
    userlist: [],
  },
  name: "UserList",
};
</script>

<style scoped>
.userList {
  overflow: auto;
  border: solid 1px #eee;
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 80vh;
  max-height: 400px;
}
</style>
