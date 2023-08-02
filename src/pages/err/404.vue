<template>
    <div class="errmain">
        <div class="lord">
            <lord-icon src="https://cdn.lordicon.com/msdnoxun.json" trigger="loop"
                colors="primary:#4be1ec,secondary:#cb5eee" style="width:100%;height:100%">
            </lord-icon>
        </div>
        <cybertextVue size="150px" msg="404" />
    </div>
</template>

<script lang="ts" setup>
import cybertextVue from '@/components/cybertext.vue';

</script>

<style lang="scss" scoped>
.errmain {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .lord {
        width: 100%;
        height: 50vh;
    }

    div {
        display: inline-block;
    }
}
</style>
