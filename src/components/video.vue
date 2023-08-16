<template>
  <div class="video" ref="videoRef">
    <positionBox :data="data" :drawer="drawer"></positionBox>
    <div class="contentBox">
      <div class="info">
        <a class="name">@{{ data.author.name }}</a>
        <div class="date">{{}}</div>
      </div>
      <div class="title">{{ data.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Video, Players } from "@/types";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import positionBox from "./positionBox.vue";

const props = defineProps<{
  data: Video;
  players: Players;
  drawer: (arg0: boolean) => void;
}>();

const videoRef = ref(void 0);

onMounted(() => {
  props.players[props.data.id] = new Player({
    el: videoRef.value,
    playsinline: true,
    videoInit: true,
    url: props.data.play_url,
    // poster: props.data.cover_url,
    plugins: [],
    autoplay: false,
    playbackRate: [0.5, 1, 1.5, 2, 3],
    keyShortcut: false,
    closeVideoDblclick: true,
    closeVideoTouch: false,
    closeVideoClick: false,
    cssFullscreen: false,
    loop: true,
    dynamicBg: {
      disable: false,
    },
    lang: "zh-cn",
    ignores: ["loading", "fullscreen"],
    width: "100%",
    height: "94vh",
  });
});
</script>

<style lang="scss" scoped>
.video {
  :deep(.xgplayer-dynamic-bg) {
    z-index: 0;
  }
  :deep(.controls-autohide) {
    opacity: 1;
    visibility: visible;
  }
}

.contentBox {
  position: absolute;
  padding: 10px;
  z-index: 10;
  bottom: 68px;
  font-size: 16px;
  .info {
    margin-bottom: 5px;
    .name {
      font-size: 23px;
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
