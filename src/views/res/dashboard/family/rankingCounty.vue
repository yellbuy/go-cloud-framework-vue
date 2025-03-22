<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-header">
        <div class="target-title">帮扶人数</div>
      </div>
      <div>
        <dv-scroll-ranking-board :config="countyConfig" style="padding:0 2.5rem;height:38rem;text-align:left"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs} from 'vue';
import "@/views/res/dashboard/component/scss/box.scss";

export default {
  setup() {
    const state: any = reactive({
      isFullScreen: true,// 是否全屏
      countyConfig: {
        carousel: 'single',
        rowNum: 5,
        data: [
          {
            name: '生活用水帮扶情况',
            value: 55,
          },
          {
            name: '垃圾不乱堆帮扶情况',
            value: 100,
          },
          {
            name: '卫生厕所帮扶情况',
            value: 78,
          },
          {
            name: '家用网络帮扶情况',
            value: 66,
          },
          {
            name: '供电稳定帮扶情况',
            value: 80,
          }
        ],
        unit: '%',
      }
    })


    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang='scss' scoped>

.flare-container {
  text-align: left !important;
}
</style>