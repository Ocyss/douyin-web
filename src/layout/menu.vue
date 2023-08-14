<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu"
    mode="horizontal"
    @select="handleSelect"
    :ellipsis="false"
    text-color="rgba(255,255,255,0.6)"
    active-text-color="rgba(255,255,255,1)"
  >
    <div class="user">
      <el-button
        type="success"
        round
        v-if="!isLogin"
        @click="centerDialogVisible = true"
      >
        登录
      </el-button>
      <div v-else class="info">
        <el-avatar :src="info?.avatar" />
        <span>Hi,{{ info?.name }}</span>
        <a @click="logout">注销</a>
      </div>
    </div>
    <div class="flex-grow" />
    <el-menu-item index="home">首页</el-menu-item>
    <el-sub-menu index="docs">
      <template #title>文档</template>
      <el-menu-item index="docs-project">项目</el-menu-item>
      <el-menu-item index="docs-model">模型</el-menu-item>
      <el-menu-item index="docs-api">Api</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="about">
      <template #title>关于</template>
      <el-menu-item index="about-team">团队</el-menu-item>
      <el-menu-item index="about-ocyss">Ocyss(队长)</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <el-dialog
    class="login"
    v-model="centerDialogVisible"
    width="50%"
    destroy-on-close
    center
  >
    <template #header>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="登录" name="login"></el-tab-pane>
        <el-tab-pane label="注册" name="register"></el-tab-pane>
      </el-tabs>
    </template>

    <el-form
      label-position="right"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="用户名">
        <el-input :maxlength="32" v-model="formLabelAlign.user" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          :maxlength="32"
          type="password"
          show-password
          v-model="formLabelAlign.pwd"
        />
      </el-form-item>
      <el-form-item v-if="activeName == 'register'" label="重复">
        <el-input
          :maxlength="32"
          type="password"
          show-password
          v-model="formLabelAlign.pwd2"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="info" @click="centerDialogVisible = false">
          取消
        </el-button>
        <el-button type="success" @click="login">
          {{ activeName == "register" ? "注册" : "登录" }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { getToken, delCookie } from "@/utils";
import { User } from "@/types";
import api from "@/api";

const isLogin = ref(false);
const router = useRouter();
const route = useRoute();
const info = inject<Ref<User>>("userInfo");
const activeIndex = computed(() => {
  if (["follow", "friend", "my", "type"].indexOf(route.name as string) > -1) {
    return "home";
  }
  return route.name as string;
});

const centerDialogVisible = ref(false);
const activeName = ref("login");

const formLabelAlign = reactive({
  user: "",
  pwd: "",
  pwd2: "",
});

function handleSelect(key: string, _: string[]) {
  router.push({ name: key });
}

function logout() {
  delCookie("uid");
  delCookie("token");
  location.reload();
}

function login() {
  const f = () => {
    centerDialogVisible.value = false;
    location.reload();
  };
  if (activeName.value == "login") {
    api.user.login(formLabelAlign.user, formLabelAlign.pwd, f);
  } else {
    if (formLabelAlign.pwd == formLabelAlign.pwd2) {
      api.user.register(formLabelAlign.user, formLabelAlign.pwd, f);
    } else {
      ElMessage.error("两次密码不一样哦");
    }
  }
}

onMounted(() => {
  isLogin.value = getToken() != undefined;
});
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}

.user {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    * {
      margin: 0 3px;
    }
    a {
      font-size: 11px;
      cursor: pointer;
      text-decoration: underline;
      &:hover {
        color: #cd3420;
      }
    }
  }
}
</style>

<style lang="scss">
.el-dialog.login {
  .el-dialog__body {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 80%;
    }
  }
  .el-dialog__header {
    .el-tabs__nav {
      width: 100%;
      justify-content: center;
      --el-color-primary: rgba(255, 255, 255, 0.8);
      --el-text-color-primary: rgba(255, 255, 255, 0.4);
      --el-font-size-base: 18px;
    }
  }
}
</style>
