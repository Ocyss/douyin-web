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
