<template>
  <div id="flareTarget">
    <div class="aflare-container">
      <div class="target-header">
        <span class="target-title">男女比例</span>
      </div>
      <div>
        <div class="target-content" style="text-align: center;">
          <div style="display: inline-block;" class="margin-lg">
            <barHuman endColor="blue" height="10rem" progress="49.1%" startColor="lightblue"
                      text="男：49.1%"></barHuman>
          </div>
          <div style="display: inline-block;" class="margin-lg">
            <barHuman :gender="1" height="10rem" progress="50.9%" text="女：50.9%"></barHuman>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import { reactive, toRefs } from 'vue';
import barHuman from "/@/components/barHuman/index.vue";

export default {
  components: {barHuman},
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