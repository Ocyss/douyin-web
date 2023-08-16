<template>
  <div class="video" @click="dialogVisible = true">
    <el-image :src="data.cover_url" fit="cover" />
    <div class="mask"></div>
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
  <el-dialog
    v-model="dialogVisible"
    class="video"
    :title="data.title"
    width="30%"
    draggable
    align-center
    destroy-on-close
    @opened="openVideo"
    @close="closeVideo"
  >
    <div ref="videoRef">
      <positionBox :data="data" :drawer="() => {}"></positionBox>
    </div>
    <template #footer>
      <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Video } from "@/types";
import Player from "xgplayer";
import type PresetPlayer from "xgplayer";
import positionBox from "./positionBox.vue";
import "xgplayer/dist/index.min.css";

const dialogVisible = ref(false);
const videoRef = ref(void 0);
const props = defineProps<{
  data: Video;
}>();
const player = ref<PresetPlayer>();

function openVideo() {
  player.value = new Player({
    el: videoRef.value,
    playsinline: true,
    videoInit: true,
    // fluid: true,
    height: "80vh",
    fitVideoSize: "fixHeight",
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
    lang: "zh-cn",
  });
}

function closeVideo() {
  player.value?.destroy();
}
onMounted(() => {});
</script>

<style lang="scss" scoped>
.video {
  width: 200px;
  height: 350px;
  transition: all 0.3s ease;
  background-color: black;
  display: inline-block;
  vertical-align: middle;
  margin: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  .el-image {
    height: 100%;
    width: 100%;
    transition: all 0.3s ease-in;
  }
  &:hover .el-image {
    transform: scale(1.1);
    transition: all 0.3s ease-out;
  }
}

.mask {
  position: absolute;
  bottom: 0px;
  height: 150px;
  width: 200px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
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

<style lang="scss">
.el-dialog.video {
  width: auto !important;
  .el-dialog__body {
    padding: 10px !important;
    .xgplayer {
      .controls-autohide {
        opacity: 1;
        visibility: visible;
      }
    }
  }
}
</style>
