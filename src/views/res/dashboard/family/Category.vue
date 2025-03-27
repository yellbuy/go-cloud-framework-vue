<template>
  <div>
        <div ref="echart" class="echartDiv"></div>
  </div>
</template>

<script lang="ts">

import "@/views/res/dashboard/component/scss/box.scss";
import * as echarts from "echarts";
import { onMounted, reactive, ref, toRefs } from "vue";

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
        series: [
          {
            label: {
              alignTo: 'edge',
              formatter: '{b} {c}% ',
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15,
              textStyle: {
                fontSize: 13,
                color: '#28A2CE',
              }
            },
            type: 'pie',
            radius: ['20%', '40%'],
            data: [
              {value: 3, name: '财产性收入'},
              {value: 63.1, name: '经营性收入'},
              {value: 32.2, name: '工资性收入'},
              {value: 1.7, name: '转移性收入'}
            ]
          }
        ]
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
.echartDiv{
  height:calc(100vh / 3 - 3.6rem)
}
</style>