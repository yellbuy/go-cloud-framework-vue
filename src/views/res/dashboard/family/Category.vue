<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="flare-title" style="text-align: left;padding-left:10px">家庭年收入趋势</div>
      <div ref="echart" class="echartDiv"></div>
    </div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import {onMounted, reactive, ref, toRefs} from 'vue';

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
        xAxis: {
          type: 'category',
          data: ['2022年', '2023年', '2024年', ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [11.5, 13.5, 15.5],
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
#flareTarget {
  margin: 0 10px;
}

.echartDiv {
  width: 100%;
  height: 23vh;
  padding-bottom: 1vh;
}

.flare-title {
  padding-left: 10px;
  color: #0498D1;
  background: linear-gradient(to right, rgba(11, 33, 145, 1), rgba(9, 56, 122, 1), rgba(10, 52, 110, 0));
  border-radius: 6px;
  margin-top: 1vh;
  height: 5vh;
  font-family: 'LiSu',serif;
  font-weight: bold;
  text-align: left !important;
  padding-top: 6px;
  font-size: 20px;
}
</style>