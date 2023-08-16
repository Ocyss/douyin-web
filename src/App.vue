<template>
  <layoutVue>
    <RouterView />
    <template #LeftSidebar>
      <RouterView name="LeftSidebar" />
    </template>
  </layoutVue>
</template>

<script setup lang="ts">
import layoutVue from "@/layout/index.vue";
import { getToken } from "./utils";
import api from "./api";
import { User } from "./types";
const info = ref<User | undefined>(void 0);
provide("userInfo", info);

onMounted(() => {
  if (getToken()) {
    api.user.info().then((res) => {
      info.value = res.user;
      info.value.id = info.value.user_id;
    });
  }
});
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
* {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
}
</style>
