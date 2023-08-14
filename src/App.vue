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
    });
  }
});
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  -webkit-user-select: none;
  /*webkit浏览器*/
  -moz-user-select: none;
  /*火狐*/
  -ms-user-select: none;
  /*IE10*/
  user-select: none;
}
</style>
