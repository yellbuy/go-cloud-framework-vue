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
import { onMounted, reactive, ref, toRefs } from 'vue';

export default {
  props: {
    xAxisData: Array,
    seriesData1: Array,
    seriesData2: Array,
    color1: Array,
    color2: Array
  },
  setup(props) {
    let state = reactive({
      echart: ref(),
    })
    const echartInit = () => {
      const myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
        },
        legend: {
          data: ['目标', '现状'],
          textStyle: {
            color: '#ffffff'
          }
        },
        grid: {
          left: '10%',
          right: '5%',
          bottom: '20%',
          top: '15%',
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: props.xAxisData,
            axisLabel: {
              color: '#ddd'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: { show: true, lineStyle: { type: 'dashed', color: '#f5f5f5' } },
						axisLine: { show: false },
						axisTick: { show: false },
            axisLabel: {
              color: '#ddd',
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '目标',
            type: 'line',
            symbolSize: 12,
            areaStyle: {},
            data: props.seriesData1,
            color: props.color1 || "#fdffc4"
          },
          {
            name: '现状',
            type: 'line',
            symbolSize: 12,
            areaStyle: {},
            data: props.seriesData2,
            color: props.color2 || "#da8b8b"
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
.echartDiv {
  width: 100%;
  height: 24.4vh;
}
</style>