<template>
  <div class="main">
    <el-scrollbar class="friend">
      <div
        v-for="(item, index) in friendList"
        class="item"
        :class="{ click: hoverIndex == index }"
        @click="
          () => {
            switchItem(item, index);
          }
        "
      >
        <el-avatar :src="item.avatar" :size="32" />
        <div style="width: 70%">
          <div style="font-size: 18px">{{ item.name }}</div>
          <div class="message">{{ item.message }}</div>
        </div>
      </div>
    </el-scrollbar>
    <div class="chat">
      <el-scrollbar class="message">
        <div
          v-for="item in messages"
          class="const"
          :class="item.from_user_id == info?.id ? 'right' : 'left'"
        >
          {{ item.content }}
        </div>
      </el-scrollbar>
      <el-input
        v-model="content"
        type="textarea"
        placeholder="我来讲两句."
        :maxlength="100"
        resize="none"
      />
      <el-button type="success" plain class="send" @click="send">
        Send
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import api from "@/api";
import { User, Message } from "@/types";
const hoverIndex = ref(-1);
const friendList = ref<
  (User & {
    message: string;
    msg_type: number;
  })[]
>([]);
const messages = ref<Message[]>([]);
const content = ref("");
const user = ref<User>();
let messageT: number;
const info = inject<Ref<User>>("userInfo");
let pre_msg_time = 0;
function switchItem(u: User, index: number) {
  user.value = u;
  hoverIndex.value = index;
  api.user.MessageChat(u.id as string).then((res) => {
    if (res.status_code == 0) {
      messages.value = res.message_list;
      if (res.message_list.length > 0) {
        pre_msg_time =
          res.message_list[res.message_list.length - 1]?.create_time;
      }

      clearInterval(messageT);
      messageT = setInterval(() => {
        api.user.MessageChat(u.id as string, pre_msg_time).then((res) => {
          if (res.status_code == 0) {
            if (res.message_list.length > 0) {
              pre_msg_time =
                res.message_list[res.message_list.length - 1].create_time;
            }
            messages.value.push(...res.message_list);
          }
        });
      }, 1000);
    }
  });
}

function send() {
  api.user
    .MessageAction(user.value?.id as string, content.value)
    .then((res) => {
      if (res.status_code == 0) {
        content.value = "";
        ElMessage.success("发送成功");
        // messages.value.push({
        //   id: "-1",
        //   content: content.value,
        //   from_user_id: info?.value.id as string,
        //   to_user_id: userId.value,
        //   create_time: Date.now(),
        // });
      }
    });
}
onMounted(() => {
  api.user.RelationFriendList().then((res) => {
    if (res.status_code == 0) {
      friendList.value = res.user_list;
    }
  });
});

onUnmounted(() => {
  clearInterval(messageT);
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: center;
  padding: 5px;
  font-size: 13px;
  border: 2px solid saddlebrown;
  margin: 8px 0;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  &.click {
    background-color: var(--el-color-info-light-3);
  }
  .message {
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.chat {
  // width: max-content;
  height: 100%;
  position: relative;
  flex: 1;
  .message {
    height: 79%;
    box-sizing: border-box;
    .const {
      width: 80%;
      margin: 10px 0;
      padding: 20px;
      min-height: 30px;
      &.left {
        background-color: rgb(9, 3, 78);
        border-radius: 0 25px 25px 0;
      }
      &.right {
        background-color: rgb(3, 78, 18);
        margin-left: 20%;
        border-radius: 25px 0 0 25px;
      }
    }
  }
  .el-textarea {
    height: 20%;
    box-sizing: border-box;
    :deep(textarea) {
      height: 100%;
    }
  }
  .send {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}

.friend {
  width: 30%;
  max-width: 400px;
  height: 100%;

  background: var(--el-color-primary-light-7);
}
.main {
  width: 100%;
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
