<template>
  <div id="flareTarget">
    <div class="aflare-container">
      <div class="target-header">
        <div class="target-title">男女比例</div>
      </div>
      <div>
        <div class="target-content" style="text-align: center;">
          <div style="display: inline-block;margin-right:20px;">
            <barHuman endColor="blue" height="20vh" progress="58%" startColor="lightblue"
                      text="男：58%"></barHuman>
          </div>
          <div style="display: inline-block;margin-left:20px;">
            <barHuman :gender="1" height="20vh" progress="42%" text="女：42%"></barHuman>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs} from 'vue';
import "@/views/res/dashboard/component/scss/box.scss";
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
.echartDiv {
  height: 30rem;
}
</style>