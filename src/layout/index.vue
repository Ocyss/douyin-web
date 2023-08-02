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
            <el-header style="text-align: right; font-size: 19px">
                <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect"
                    :ellipsis="false" text-color="rgba(255,255,255,0.6)" active-text-color="rgba(255,255,255,1)">
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
            </el-header>
            <el-main ref="mainRef">

                <slot></slot>
                <div class="filling"></div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import cybertextVue from '@/components/cybertext.vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMain } from 'element-plus';
import aboutVue from '@/components/about.vue';
const router = useRouter()
const route = useRoute()

const activeIndex = computed(() => route.name as string)

const mainRef = ref<InstanceType<typeof ElMain> | undefined>(void 0)
const scrollElementRef = ref<HTMLElement | undefined>(void 0)
const catalog = ref([])
provide("scrollElement", scrollElementRef)
provide("catalog", catalog)

function handleSelect(key: string, _: string[]) {
    router.push({ name: key })
}

onMounted(() => {
    scrollElementRef.value = mainRef.value?.$el
})

</script>

<style lang="scss" scoped>
.flex-grow {
    flex-grow: 1;
}

.layout-container {
    height: 100vh;

    .el-header {
        position: relative;
        background-color: var(--el-color-primary-light-5);
        color: var(--el-text-color-primary);
        padding: 0;
        --el-menu-bg-color: var(--el-color-primary-light-5);
        --el-menu-text-color: rgba(255, 255, 255, 0.6);
        --el-menu-active-color: rgb(255, 255, 255);
        --el-menu-hover-text-color: rgb(255, 255, 255);
        --el-menu-hover-bg-color: var(--el-color-primary-light-5);
        --el-menu-item-font-size: 16px;



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

        .filling {
            height: 300px;
        }
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
