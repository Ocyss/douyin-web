<template>
  <div class="video" ref="videoRef">
    <div class="positionBox">
      <div class="item avatar">
        <el-avatar :src="data.author.avatar" :size="55" />
      </div>
      <div class="item">
        <lord-icon src="https://cdn.lordicon.com/xryjrepg.json" v-bind="icon" />
        {{ data.favorite_count }}
      </div>
      <div class="item">
        <lord-icon src="https://cdn.lordicon.com/pkmkagva.json" v-bind="icon" />
        {{ data.comment_count }}
      </div>
      <div class="item">
        <lord-icon src="https://cdn.lordicon.com/uvqnvwbl.json" v-bind="icon" />
      </div>
    </div>
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

const icon = {
  trigger: "hover",
  colors: "primary:#ffffff",
  target: ".item",
};

const props = defineProps<{
  data: Video;
  players: Players;
}>();

const videoRef = ref(void 0);

onMounted(() => {
  props.players[props.data.id] = new Player({
    el: videoRef.value,
    playsinline: true,
    videoInit: true,
    url: props.data.play_url,
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
}
.positionBox,
.contentBox {
  position: absolute;
  padding: 10px;
}
.positionBox {
  z-index: 11;
  right: 10px;
  bottom: 68px;
  font-size: 16px;
  font-weight: 600;

  .item {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-avatar {
      border: 2px solid #fff;
    }
    lord-icon {
      width: 50px;
      height: 50px;
    }
  }

  .avatar {
    position: relative;

    .el-avatar:before {
      content: "\FF0B";
      position: absolute;
      bottom: -8px;
      border-radius: 50%;
      background-color: #f92669;
      font-size: 25px;
      width: 22px;
      height: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 13;
    }
    :deep(img) {
      transition: all 0.8s;
      z-index: 12;
      &:hover {
        transform: rotate(360deg);
      }
    }
  }
}
.contentBox {
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
