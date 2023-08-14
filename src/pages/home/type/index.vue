<template>
  <videoListVue
    v-if="typeOf"
    :type="typeOf"
    :key="typeOf"
    repeat
  ></videoListVue>
</template>

<script lang="ts" setup>
import videoListVue from "@/components/videoList.vue";
import { useRoute } from "vue-router";
const route = useRoute();

const typeOf = ref("");

onMounted(() => {
  watch(
    () => route.params,
    (newParams, _) => {
      typeOf.value = newParams.name as string;
    },
    { immediate: true }
  );
});
</script>

<style lang="scss" scoped></style>
