<template>
  <div class="video" ref="videoRef">
    <div class="positionBox">
      <div class="item avatar">
        <el-avatar :src="data.author.avatar" :size="55" />
      </div>
      <div
        class="item"
        :class="{ clicked: is_favorite }"
        @click="FavoriteAction"
      >
        <lord-icon
          src="https://cdn.lordicon.com/xryjrepg.json"
          v-bind="icon"
          :colors="is_favorite ? 'primary:#FE2C55' : 'primary:#ffffff'"
        />
        {{ favorite_count + Number(is_favorite) }}
      </div>
      <div class="item" @click="drawer = true">
        <lord-icon src="https://cdn.lordicon.com/pkmkagva.json" v-bind="icon" />
        {{ comment_count }}
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
  <el-drawer v-model="drawer" :with-header="false" size="40%" class="comment">
    <u-comment :config="config" @submit="submit" @like="like" relative-time>
      <!-- <template>导航栏卡槽</template> -->
      <!-- <template #info>用户信息卡槽</template> -->
      <!-- <template #card>用户信息卡片卡槽</template> -->
      <!-- <template #opearte>操作栏卡槽</template> -->
    </u-comment>
  </el-drawer>
</template>

<script setup lang="ts">
import api from "@/api";
import { Video, Players } from "@/types";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import emoji from "@/utils/emoji";
import {
  CommentApi,
  ConfigApi,
  SubmitParamApi,
  UToast,
  createObjectURL,
  dayjs,
} from "undraw-ui";

const drawer = ref(false);
const icon = {
  trigger: "loop-on-hover",
  colors: "primary:#ffffff",
  target: ".item",
};

const props = defineProps<{
  data: Video;
  players: Players;
}>();
const favorite_count = ref(0);
const comment_count = ref(0);
const is_favorite = ref(false);
const videoRef = ref(void 0);

function FavoriteAction() {
  api.video
    .FavoriteAction(props.data.id, is_favorite.value ? 1 : 2)
    .then((res) => {
      if (res.status_code == 0) {
        is_favorite.value = !is_favorite.value;
      }
    });
}
const config = reactive<ConfigApi>({
  user: {
    id: 1,
    username: "jack",
    avatar:
      "https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100",
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: [1, 2, 3],
  },
  emoji: emoji,
  comments: [],
  total: 10,
});

let temp_id = 100;
// 提交评论事件
const submit = ({
  content,
  parentId,
  files,
  finish,
  reply,
}: SubmitParamApi) => {
  let str =
    "提交评论:" +
    content +
    ";\t父id: " +
    parentId +
    ";\t图片:" +
    files +
    ";\t被回复评论:";
  console.log(str, reply);

  /**
   * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
   */
  let contentImg = files?.map((e) => createObjectURL(e)).join("||");

  temp_id += 1;
  const comment: CommentApi = {
    id: String(temp_id),
    parentId: parentId,
    uid: config.user.id,
    address: "来自江苏",
    content: content,
    likes: 0,
    createTime: dayjs().subtract(5, "seconds").toString(),
    contentImg: contentImg,
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
      level: 6,
      homeLink: `/${temp_id}`,
    },
    reply: null,
  };
  setTimeout(() => {
    finish(comment);
    UToast({ message: "评论成功!", type: "info" });
  }, 200);
};
// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = (id: string, finish: () => void) => {
  console.log("点赞: " + id);
  setTimeout(() => {
    finish();
  }, 200);
};

config.comments = [
  {
    id: "1",
    parentId: null,
    uid: "1",
    content:
      "缘生缘灭，缘起缘落，我在看别人的故事，别人何尝不是在看我的故事?别人在演绎人生，我又何尝不是在这场戏里?谁的眼神沧桑了谁?我的眼神，只是沧桑了自己[喝酒]",
    likes: 2,
    contentImg:
      "https://gitee.com/undraw/undraw-ui/raw/master/public/docs/normal.webp",
    createTime: dayjs().subtract(10, "minute").toString(),
    // @ts-ignore：不显示等级,主页
    user: {
      username: "落🤍尘",
      avatar:
        "https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100",
    },
  },
];

onMounted(() => {
  props.players[props.data.id] = new Player({
    el: videoRef.value,
    playsinline: true,
    videoInit: true,
    url: props.data.play_url,
    poster: props.data.cover_url,
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
  favorite_count.value = props.data.favorite_count;
  comment_count.value = props.data.comment_count;
  is_favorite.value = props.data.is_favorite;
});
</script>

<style lang="scss">
.el-drawer.comment {
  --el-drawer-padding-primary: 0;
}
</style>

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
