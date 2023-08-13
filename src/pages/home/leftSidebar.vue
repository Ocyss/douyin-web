<template>
  <el-menu :default-active="activeIndex" class="el-menu-vertical" router>
    <el-menu-item index="/">
      <lord-icon src="https://cdn.lordicon.com/ihyatngg.json" v-bind="icon" />
      <span>推荐</span>
    </el-menu-item>
    <el-menu-item index="/follow">
      <lord-icon src="https://cdn.lordicon.com/yrxnwkni.json" v-bind="icon" />
      <span>关注</span>
    </el-menu-item>
    <el-menu-item index="/friend">
      <lord-icon src="https://cdn.lordicon.com/mjmrmyzg.json" v-bind="icon" />
      <span>朋友</span>
    </el-menu-item>
    <el-menu-item index="/my">
      <lord-icon src="https://cdn.lordicon.com/ljvjsnvh.json" v-bind="icon" />
      <span>我的</span>
    </el-menu-item>
    <el-divider />
    <el-menu-item index="/type/t">
      <lord-icon src="https://cdn.lordicon.com/lxotnbfa.json" v-bind="icon" />
      <span>投稿</span>
    </el-menu-item>
    <el-menu-item index="/type/m">
      <lord-icon src="https://cdn.lordicon.com/pgbyoxin.json" v-bind="icon" />
      <span>音乐</span>
    </el-menu-item>
    <el-menu-item index="/type/a">
      <lord-icon src="https://cdn.lordicon.com/wgydzbzz.json" v-bind="icon" />
      <span>爱情</span>
    </el-menu-item>
    <el-menu-item index="/type/c">
      <lord-icon src="https://cdn.lordicon.com/whxfxpyt.json" v-bind="icon" />
      <span>宠物</span>
    </el-menu-item>
    <el-menu-item index="/type/s">
      <lord-icon src="https://cdn.lordicon.com/usapctuq.json" v-bind="icon" />
      <span>美食</span>
    </el-menu-item>
    <el-menu-item index="/type/m">
      <lord-icon src="https://cdn.lordicon.com/btogdxxi.json" v-bind="icon" />
      <span>默剧</span>
    </el-menu-item>
    <el-menu-item index="/type/q">
      <lord-icon src="https://cdn.lordicon.com/zywndszx.json" v-bind="icon" />
      <span>煽情</span>
    </el-menu-item>
    <el-menu-item index="/type/x">
      <lord-icon src="https://cdn.lordicon.com/uckdrslf.json" v-bind="icon" />
      <span>妙招</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();

const activeIndex = computed(() => route.path as string);

const icon = {
  trigger: "loop-on-hover",
  colors: "primary:#4be1ec,secondary:#cb5eee",
  target: ".el-menu-item",
};
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  --el-menu-item-font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 0;
  flex-direction: column;

  .el-menu-item {
    --el-menu-hover-bg-color: "" !important;
    --el-menu-active-color: rgba(255, 255, 255, 1);
    --el-menu-text-color: rgba(255, 255, 255, 0.5);

    lord-icon {
      width: 30px;
      height: 30px;
    }

    &:hover {
      --el-menu-text-color: rgba(255, 255, 255, 1);
    }
  }

  .el-divider {
    width: 40%;
  }
}
</style>
