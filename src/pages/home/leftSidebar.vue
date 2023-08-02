<template>
    <el-menu default-active="2" class="el-menu-vertical">
        <el-menu-item index="1">
            <lord-icon src="https://cdn.lordicon.com/kxoxiwrf.json" v-bind="icon" />
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2">
            <lord-icon src="https://cdn.lordicon.com/ihyatngg.json" v-bind="icon" />
            <span>推荐</span>
        </el-menu-item>
        <el-menu-item index="3">
            <lord-icon src="https://cdn.lordicon.com/yrxnwkni.json" v-bind="icon" />
            <span>关注</span>
        </el-menu-item>
        <el-menu-item index="4">
            <lord-icon src="https://cdn.lordicon.com/mjmrmyzg.json" v-bind="icon" />
            <span>朋友</span>
        </el-menu-item>
        <el-menu-item index="5">
            <lord-icon src="https://cdn.lordicon.com/ljvjsnvh.json" v-bind="icon" />
            <span>我的</span>
        </el-menu-item>
        <el-divider />
        <el-menu-item index="6">
            <lord-icon src="https://cdn.lordicon.com/pgbyoxin.json" v-bind="icon" />
            <span>音乐</span>
        </el-menu-item>
        <el-menu-item index="7">
            <lord-icon src="https://cdn.lordicon.com/wgydzbzz.json" v-bind="icon" />
            <span>爱情</span>
        </el-menu-item>
        <el-menu-item index="8">
            <lord-icon src="https://cdn.lordicon.com/whxfxpyt.json" v-bind="icon" />
            <span>宠物</span>
        </el-menu-item>
        <el-menu-item index="9">
            <lord-icon src="https://cdn.lordicon.com/usapctuq.json" v-bind="icon" />
            <span>美食</span>
        </el-menu-item>
        <el-menu-item index="10">
            <lord-icon src="https://cdn.lordicon.com/btogdxxi.json" v-bind="icon" />
            <span>默剧</span>
        </el-menu-item>
        <el-menu-item index="11">
            <lord-icon src="https://cdn.lordicon.com/zywndszx.json" v-bind="icon" />
            <span>煽情</span>
        </el-menu-item>
        <el-menu-item index="12">
            <lord-icon src="https://cdn.lordicon.com/uckdrslf.json" v-bind="icon" />
            <span>妙招</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>

const icon = {
    trigger: "hover",
    colors: "primary:#4be1ec,secondary:#cb5eee",
    target: ".el-menu-item"
}
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
        --el-menu-text-color: rgba(255, 255, 255, .5);

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
