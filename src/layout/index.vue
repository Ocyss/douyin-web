<template>
    <el-container class="layout-container">
        <el-aside width="200px">
            <div class="logo">
                <cybertextVue class="logo-text" msg="抖音" size="43px" />
            </div>
            <slot name="LeftSidebar"></slot>
            <aboutVue />
        </el-aside>
        <el-container>
            <el-header>
                <menuVue />
            </el-header>
            <el-main ref="mainRef">

                <slot></slot>

            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import cybertextVue from '@/components/cybertext.vue';

import { ElMain } from 'element-plus';
import aboutVue from '@/components/about.vue';
import menuVue from "./menu.vue"


const mainRef = ref<InstanceType<typeof ElMain> | undefined>(void 0)
const scrollElementRef = ref<HTMLElement | undefined>(void 0)
const catalog = ref([])
provide("scrollElement", scrollElementRef)
provide("catalog", catalog)



onMounted(() => {
    scrollElementRef.value = mainRef.value?.$el
})

</script>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-header {
        padding: 0;
        text-align: right;
        --el-header-height: 6vh;

        .el-menu {
            height: 100%;
            width: 100%;
            position: relative;
            background-color: var(--el-color-primary-light-5);
            color: var(--el-text-color-primary);
            --el-menu-bg-color: var(--el-color-primary-light-5);
            --el-menu-text-color: rgba(255, 255, 255, 0.6);
            --el-menu-active-color: rgb(255, 255, 255);
            --el-menu-hover-text-color: rgb(255, 255, 255);
            --el-menu-hover-bg-color: var(--el-color-primary-light-5);
            --el-menu-item-font-size: 18px;
        }
    }

    .el-aside {
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        // align-items: flex-start;
        align-items: center;
        color: var(--el-text-color-primary);
        background: var(--el-color-primary);
        // background-color: #111111;
        flex-direction: column;

        :deep(.el-scrollbar__bar) {
            z-index: 9999;
        }

        >div {
            width: 100%;
        }
    }

    .el-aside,
    .el-main {
        &::-webkit-scrollbar {
            display: none;
        }

        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .el-menu {
        border-right: none;
    }

    .el-main {
        padding: 0;
        background-color: var(--el-color-primary-light-9);
    }

    .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
    }
}

.logo {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin: 20px 0;

    .logo-text {
        @font-face {
            font-family: 'iconfont';
            src: url('/static/logo-font.ttf') format('truetype');
        }

        font-family: "iconfont" !important;
    }
}
</style>
