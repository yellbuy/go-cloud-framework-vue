<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-header">
        <div class="target-title">帮扶人数</div>
      </div>
      <div ref="echart" class="echartDiv"></div>
    </div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import {onMounted, reactive, ref, toRefs} from 'vue';
import "@/views/res/dashboard/component/scss/box.scss";

export default {
  setup() {
    let state = reactive({
      xAxisData: [""],
      yAxisData: [0],
      yAxisSideData: [0],
      echart: ref(),
    })
    const echartInit = () => {
      const myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      const option = {
        color: ['#71b15f'],
        yAxis: {
          type: 'category',
          data: ['生活用水帮扶情况', '垃圾不乱堆帮扶情况', '卫生厕所帮扶情况', '家用网络帮扶情况', '供电稳定帮扶情况'],
          axisLabel: {
            fontSize: 32, // 设置Y轴标签字体大小
            color: "#9dbbdd"
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 32, // 设置Y轴标签字体大小
            color: "#9dbbdd"
          }
        },
        series: [
          {
            data: [120, 200, 150, 80, 70],
            type: 'bar'
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }

    //挂载
    onMounted(async () => {

      echartInit();
    })

    return {
      ...toRefs(state),
      echartInit,
    }
  },
}
</script>

<style lang='scss' scoped>
.echartDiv {
  height: 40rem;
}
</style>