<template>
  <div class="positionBox">
    <div class="item avatar">
      <el-avatar :src="data.author.avatar" :size="55" @click="getUserList" />
      <span class="follow" v-if="!is_follow" @click="RelationAction">+</span>
    </div>
    <div class="item" :class="{ clicked: is_favorite }" @click="FavoriteAction">
      <lord-icon
        src="https://cdn.lordicon.com/xryjrepg.json"
        v-bind="icon"
        :colors="is_favorite ? 'primary:#FE2C55' : 'primary:#ffffff'"
      />
      {{ favorite_count + Number(is_favorite) }}
    </div>
    <div class="item" @click="getComment">
      <lord-icon src="https://cdn.lordicon.com/pkmkagva.json" v-bind="icon" />
      {{ comment_count }}
    </div>
    <div
      class="item"
      @click="
        () => {
          ElMessage.success('分享成功!');
        }
      "
    >
      <lord-icon src="https://cdn.lordicon.com/uvqnvwbl.json" v-bind="icon" />
    </div>
  </div>

  <el-drawer
    v-model="commentDrawer"
    :with-header="false"
    size="40%"
    class="comment"
    :append-to-body="true"
    @open="() => drawer(true)"
    @close="() => drawer(false)"
  >
    <u-comment :config="config" @submit="submit" relative-time></u-comment>
  </el-drawer>
  <el-drawer
    v-model="userDrawer"
    :with-header="false"
    size="40%"
    class="user"
    :append-to-body="true"
    @open="() => drawer(true)"
    @close="() => drawer(false)"
  >
    <userinfo
      :info="props.data.author"
      :favorite-list="favoriteList"
      :publish-list="publishList"
      :follow="is_follow"
    />
  </el-drawer>
</template>

<script lang="ts" setup>
import userinfo from "@/components/userinfo.vue";
import api from "@/api";
import { Video, User } from "@/types";
import { CommentApi, ConfigApi, SubmitParamApi, dayjs } from "undraw-ui";
import { ElMessage } from "element-plus";
import emoji from "@/utils/emoji";

const props = defineProps<{
  data: Video;
  drawer: (arg0: boolean) => void;
}>();

const config = reactive<ConfigApi>({
  user: {
    id: "",
    username: "",
    avatar: "",
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: [1, 2, 3],
  },
  emoji: emoji,
  comments: [],
  total: 10,
});

const favoriteList = ref<Video[]>([]);
const publishList = ref<Video[]>([]);
const commentDrawer = ref(false);
const userDrawer = ref(false);
const is_follow = ref(false);
const info = inject<Ref<User>>("userInfo");
const is_favorite = ref(false);
const favorite_count = ref(0);
const comment_count = ref(0);

const icon = {
  trigger: "loop-on-hover",
  colors: "primary:#ffffff",
  target: ".item",
};
function RelationAction() {
  api.user
    .RelationAction(props.data.author.id as string, is_follow.value ? 2 : 1)
    .then((res) => {
      if (res.status_code == 0) {
        is_follow.value = !is_follow.value;
        ElMessage.success(is_follow.value ? "关注成功" : "取关成功");
      }
    });
}

function FavoriteAction() {
  api.video
    .FavoriteAction(props.data.id, is_favorite.value ? 2 : 1)
    .then((res) => {
      if (res.status_code == 0) {
        is_favorite.value = !is_favorite.value;
      }
    });
}

function getComment() {
  api.video.CommentList(props.data.id).then((res) => {
    if (res.status_code == 0) {
      // @ts-ignore：不显示等级,主页
      config.comments = res.comment_list.map((item) => {
        return {
          id: item.id,
          parentId: item.reply_id == "" ? null : item.reply_id,
          uid: item.user.id,
          content: item.content,
          likes: 0,
          createTime: item.created_at,
          user: {
            username: item.user.name,
            avatar: item.user.avatar,
          },
        };
      });
    }
  });
  commentDrawer.value = true;
}

function getUserList() {
  api.video.publish(props.data.author.id).then((res) => {
    if (res.status_code == 0) {
      publishList.value = res.video_list;
    }
  });
  api.video.favorite(props.data.author.id).then((res) => {
    if (res.status_code == 0) {
      favoriteList.value = res.video_list;
    }
  });
  userDrawer.value = true;
}

// 提交评论事件
const submit = ({ content, finish }: SubmitParamApi) => {
  api.video.CommentAction(props.data.id, 1, content).then((res) => {
    if (res.status_code == 0) {
      const comment: CommentApi = {
        id: res.comment.id,
        uid: res.comment.user.id as string,
        content: content,
        likes: 0,
        createTime: dayjs().subtract(0, "seconds").toString(),
        // @ts-ignore：不显示等级,主页
        user: {
          username: config.user.username,
          avatar: config.user.avatar,
        },
      };
      console.log(dayjs().subtract(0, "seconds").toString());

      finish(comment);
      ElMessage.success("发布成功!");
    }
  });
};

onMounted(() => {
  is_favorite.value = props.data.is_favorite;
  favorite_count.value = props.data.favorite_count;
  comment_count.value = props.data.comment_count;
  if (info?.value) {
    config.user.id = info.value.id as string;
    config.user.username = info.value.name;
    config.user.avatar = info.value.avatar;
  }
});
</script>

<style lang="scss">
.el-drawer.comment {
  --el-drawer-padding-primary: 0;
  .comment-list .action-box {
    opacity: 0;
    visibility: hidden;
  }
}
</style>

<style lang="scss" scoped>
.positionBox {
  position: absolute;
  padding: 10px;
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
    .follow {
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
</style>
