<template>
  <div id="flareTarget">
    <div class="aflare-container">
      <div class="target-header">
        <div class="target-title">五好指标预警</div>
      </div>
      <div class="target-content">
        <div ref="echart" class="echartDiv"></div>
      </div>
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
        color: ['#1AFD9BFF'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['保障好', '教育好', '医疗好', '住房好', '家风好'],
          axisLabel: {
            fontSize: 14, // 设置Y轴标签字体大小
            color: "#409eff",
            lineHeight: 20
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 14, // 设置Y轴标签字体大小
            color: "#409eff"
          }
        },
        series: [
          {
            name: '性别',
            type: 'line',
            stack: 'Total',
            data: [20, 30, 41, 22, 15]
          },
          {
            name: '年龄 ',
            type: 'line',
            stack: 'Total',
            data: [20, 15, 22, 15, 33]
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
  height: 25rem;
}
</style>