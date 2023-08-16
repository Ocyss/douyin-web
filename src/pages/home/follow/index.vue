<template>
  <div class="videoList">
    <videoInfoVue v-for="item in videos" :data="item" />
  </div>
</template>

<script lang="ts" setup>
import api from "@/api";
import { User, Video } from "@/types";
import videoInfoVue from "@/components/videoInfo.vue";
const loginDialog = inject<Ref<boolean>>("loginDialog");
const videos = ref<Video[]>();
const info = inject<Ref<User>>("userInfo");

onMounted(() => {
  if (info?.value) {
    api.video.publishFollow().then((res) => {
      if (res.status_code == 0) {
        videos.value = res.video_list;
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

<style lang="scss" scoped>
.videoList {
  --el-color-primary: #cd3521;
}
</style>
