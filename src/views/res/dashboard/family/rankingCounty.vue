<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-header">
        <div class="target-title">帮扶人数</div>
      </div>
      <div class="target-content">
        <dv-scroll-ranking-board :config="countyConfig" :valueFormatter="valueFormatter"
                                 style="padding:0 2.5rem;height:30rem;text-align:left"/>
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
        data: [
          {
            name: '&nbsp;&nbsp;&nbsp;生活用水帮扶情况',
            value: 55,
          },
          {
            name: '&nbsp;&nbsp;&nbsp;垃圾不乱堆帮扶情况',
            value: 100,
          },
          {
            name: '&nbsp;&nbsp;&nbsp;卫生厕所帮扶情况',
            value: 78,
          },
          {
            name: '&nbsp;&nbsp;&nbsp;家用网络帮扶情况',
            value: 66,
          },
          {
            name: '&nbsp;&nbsp;&nbsp;供电稳定帮扶情况',
            value: 80,
          }
        ],
        fontSize: 24,
        color: "rgb(26,253,155)",
        unit: '人',
        sort: true,
        textColor: "rgb(168,230,61)"
      },
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