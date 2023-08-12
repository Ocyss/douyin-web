<template>
    <MdPreview :modelValue="props.text" theme="dark" :showCodeRowNumber="true" :noKatex="true" :noMermaid="true"
        @onGetCatalog="onGetCatalog" :mdHeadingId="mdHeadingId" />
    <div class="filling"></div>
</template>

<script lang="ts" setup>
import { MdPreview } from 'md-editor-v3';
import "@/styles/md-editor/index.scss";
import { mdHeadingId } from "@/utils"

const props = defineProps({
    text: String,
})

interface Catalog {
    text: string,
    level: number,
}

const catalog = inject<Ref<Catalog[]>>("catalog")


function onGetCatalog(list: Catalog[]) {
    if (catalog && list.length > 0) {
        catalog.value = list
    }
}
</script>

<style lang="scss" scoped>
.filling {
    height: 400px;
}
</style>
