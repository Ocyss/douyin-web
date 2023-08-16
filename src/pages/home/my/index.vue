<template>
  <userinfo
    v-if="info"
    :info="info"
    :favorite-list="favoriteList"
    :publish-list="publishList"
  />
</template>

<script lang="ts" setup>
import { User, Video } from "@/types";
import api from "@/api";
import userinfo from "@/components/userinfo.vue";
const info = inject<Ref<User>>("userInfo");
const favoriteList = ref<Video[]>([]);
const publishList = ref<Video[]>([]);
const loginDialog = inject<Ref<boolean>>("loginDialog");
onMounted(() => {
  if (info?.value) {
    api.video.publish().then((res) => {
      if (res.status_code == 0) {
        publishList.value = res.video_list;
      }
    });
    api.video.favorite().then((res) => {
      if (res.status_code == 0) {
        favoriteList.value = res.video_list;
      }
    });
  } else {
    ElMessage.error("请先登录");
    if (loginDialog) {
      loginDialog.value = true;
    }
  }
});
</script>

<style lang="scss" scoped></style>
