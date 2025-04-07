<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div ref="echart" class="echartDiv"></div>
    </div>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import * as echarts from "echarts";
import {onMounted, reactive, ref, toRefs} from 'vue';

export default {
  props: {},
  setup(props) {
    let state = reactive({
      echart: ref(),
    })
    const echartInit = () => {
      const myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      const option = {
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#9a60b4'],
        polar: {
          radius: [0, '100%']
        },
        angleAxis: {
          max: 100,
          startAngle: 90,
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisPointer: {
            show: false
          }
        },
        radiusAxis: {
          type: 'category',
          data: ['住房好', '家风好', '医疗好', '生活好', '教育好'],
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: {
          type: 'bar',
          data: [75, 60, 80, 60, 100],
          coordinateSystem: 'polar',
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}%'
          },
          colorBy: "data"
        }
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize();
      });
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
  width: 100%;
  height: 17rem;
}
</style>