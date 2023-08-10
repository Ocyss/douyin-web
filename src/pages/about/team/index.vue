<template>
    <MdPreview :text="text" />
</template>

<script lang="ts" setup>
import axios from 'axios'
import MdPreview from '@/components/mdPreview.vue';
const text = ref("")

onMounted(async () => {
    const res = await axios.get("/docs/team.md")
    text.value = res.data
})
</script>

<style lang="scss" scoped></style>
