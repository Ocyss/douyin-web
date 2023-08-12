<template>
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect" :ellipsis="false"
        text-color="rgba(255,255,255,0.6)" active-text-color="rgba(255,255,255,1)">
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
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()

const activeIndex = computed(() => {
    if (["follow", "friend", "my", "type"].indexOf(route.name as string) > -1) {
        return "home"
    }
    return route.name as string
})
function handleSelect(key: string, _: string[]) {
    router.push({ name: key })
}
</script>

<style lang="scss" scoped>
.flex-grow {
    flex-grow: 1;
}
</style>
