<template>
  <div
    ref="videoRef"
    class="player"
    @mouseenter="player?.play"
    @mouseleave="player?.pause"
    @click="click"
  >
    <div class="contentBox">
      <div class="info">
        <a class="name">
          <el-avatar :src="data.author.avatar" :size="18" />
          {{ data.author.name }}
        </a>
        <div class="date">{{}}</div>
      </div>
      <div class="title">{{ data.title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Video } from "@/types";
import Player from "xgplayer";
import type PresetPlayer from "xgplayer";
import "xgplayer/dist/index.min.css";

const Fullscreen = ref(false);
const videoRef = ref(void 0);
const props = defineProps<{
  data: Video;
}>();
const player = ref<PresetPlayer>();
function click() {
  if (!player.value) {
    return;
  }
  if (Fullscreen.value) {
    player.value.exitFullscreen();
    player.value.muted = true;
  } else {
    player.value.getFullscreen();
    player.value.muted = false;
  }
}

onMounted(() => {
  player.value = new Player({
    el: videoRef.value,
    playsinline: true,
    videoInit: true,
    url: props.data.play_url,
    // poster: props.data.cover_url,
    plugins: [],
    autoplay: false,
    keyShortcut: false,
    closeVideoDblclick: true,
    closeVideoTouch: false,
    closeVideoClick: false,
    cssFullscreen: false,
    loop: true,
    dynamicBg: {
      disable: false,
    },
    volume: 0.3,
    controls: false,
    lang: "zh-cn",
    ignores: ["loading", "fullscreen", "time", "pc"],
    width: "200px",
    height: "350px",
  });
  player.value.muted = true;
});
</script>

<style lang="scss" scoped>
.player {
  :deep(.xgplayer-start) {
    opacity: 0;
    visibility: hidden;
  }
}
.contentBox {
  position: absolute;
  padding: 10px;
  z-index: 10;
  bottom: 10px;
  font-size: 11px;
  .info {
    margin-bottom: 5px;
    .name {
      font-size: 14px;
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
