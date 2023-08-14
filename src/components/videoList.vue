<template>
  <swiper
    direction="vertical"
    :slidesPerView="1"
    :spaceBetween="30"
    :mousewheel="true"
    :pagination="{
      clickable: true,
    }"
    :keyboard="{
      enabled: true,
    }"
    :shortSwipes="false"
    :simulateTouch="false"
    :modules="modules"
    @slideChange="onSlideChange"
    v-if="data.length > 0"
  >
    <swiper-slide class="swiper-item" v-for="item in data" :key="item.id">
      <videoVue :data="item" :players="players" />
    </swiper-slide>
  </swiper>
  <div v-else><el-empty :image-size="200" /></div>
</template>

<script lang="ts" setup>
import api from "@/api";
import { Video, Players } from "@/types";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Swiper as SwiperType } from "swiper/types";
import { Mousewheel, Keyboard } from "swiper/modules";
import videoVue from "@/components/video.vue";
import "swiper/css";

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  repeat: {
    type: Boolean,
    default: false,
  },
});

const data = ref<Video[]>([]);

const players: Players = {};
const modules = [Mousewheel, Keyboard];

const onSlideChange = (e: SwiperType) => {
  if (!data.value) {
    return;
  }
  // console.log(e);

  if (data.value.length - e.activeIndex < 3) {
    api.video.feed(props.type, props.repeat).then((res) => {
      data.value?.push(...res.video_list);
    });
  }

  const prePlayer = players[data.value[e.previousIndex].id];
  prePlayer.pause();

  const cur = data.value[e.activeIndex];
  const player = players[cur.id];
  player.play();
};

onMounted(() => {
  api.video.feed(props.type, props.repeat).then((res) => {
    data.value = res.video_list;
  });
});
</script>

<style lang="scss">
.swiper {
  width: 100%;
  height: 94vh;
}

.swiper-slide {
  // height: 94vh;
}
</style>
