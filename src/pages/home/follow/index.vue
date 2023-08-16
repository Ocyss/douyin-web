<template>
  <div class="videoList">
    <videoInfoVue v-for="item in videos" :data="item" />
  </div>
</template>

<script lang="ts" setup>
import api from "@/api";
import { Video } from "@/types";
import videoInfoVue from "@/components/videoInfo.vue";

const videos = ref<Video[]>();

onMounted(() => {
  api.video.publishFollow().then((res) => {
    if (res.status_code == 0) {
      videos.value = res.video_list;
    }
  });
});
</script>

<style lang="scss" scoped>
.videoList {
  > div {
    display: inline-block;
    margin: 10px;
  }
}
</style>
