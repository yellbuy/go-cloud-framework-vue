<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-header">
        <span class="target-title">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import { reactive, toRefs } from 'vue';

export default {
  props: {
    title: {}
  },
  components: {},
  setup() {
    let state = reactive({})

    return {
      ...toRefs(state)
    }
  },
}
</script>

<style lang='scss' scoped>
</style>