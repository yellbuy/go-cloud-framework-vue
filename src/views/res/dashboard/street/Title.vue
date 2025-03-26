<template>
  <div id="flareTarget">
    <div class="flare-container" >
      <div class="target-header">
        <div class="target-title" style="width:1rem">{{ title }}</div>
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