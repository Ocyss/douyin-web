<template>
  <div class="main">
    <div style="display: flex; align-items: center; height: 180px">
      <el-avatar :src="info?.avatar" :size="100" />
      <div style="margin-left: 20px">
        <div style="font-size: 28px; font-weight: 600; margin-bottom: 10px">
          {{ info?.name }}
        </div>
        <div class="count">
          <div>获赞&nbsp;{{ info?.total_favorited }}</div>
          <div>作品&nbsp;{{ info?.work_count }}</div>
          <div>关注&nbsp;{{ info?.follow_count }}</div>
          <div>粉丝&nbsp;{{ info?.follower_count }}</div>
        </div>
        <div style="font-size: 13px">抖b号:&nbsp;{{ info?.id }}</div>
      </div>
      <el-button
        :type="is_follow ? 'warning' : 'success'"
        @click="RelationAction"
      >
        {{ is_follow ? "取关" : "关注" }}
      </el-button>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="喜欢" name="favorite" class="videoList">
        <videoInfoVue v-for="item in favoriteList" :data="item" />
      </el-tab-pane>
      <el-tab-pane label="投稿" name="publish" class="videoList">
        <videoInfoVue v-for="item in publishList" :data="item" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { User, Video } from "@/types";
import videoInfoVue from "@/components/videoInfo.vue";
import api from "@/api";
const activeName = ref("publish");
const is_follow = ref(false);
const props = defineProps<{
  info: User;
  follow?: boolean;
  favoriteList: Video[];
  publishList: Video[];
}>();

function RelationAction() {
  api.user
    .RelationAction(props.info.id as string, is_follow.value ? 2 : 1)
    .then((res) => {
      if (res.status_code == 0) {
        is_follow.value = !is_follow.value;
        ElMessage.success(is_follow.value ? "关注成功" : "取关成功");
      }
    });
}

onMounted(() => {
  is_follow.value = props.follow;
});
</script>

<style lang="scss" scoped>
.main {
  --el-color-primary: #cd3521;
  margin: auto;
  width: 100%;
  max-width: 700px;
  .el-image {
    width: 100%;
    height: 200px;
  }
  .count {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    div {
      margin-right: 10px;
    }
  }
}
</style>
