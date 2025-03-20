<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="flare-title" style="text-align: left;padding-left:10px">五好达标情况</div>
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
        color: ['#FFE434', '#67F9D8', '#56A3F1', '#FF917C'],
        legend: {
          data: ['目标', '进度'],
          orient: 'vertical',
          align: "left",
          top: "0",
          right: "0",
          textStyle: {
            color: "#fff"
          }

        },
        radar: {
          indicator: [
            {name: '住房好', max: 100},
            {name: '家风好', max: 100},
            {name: '医疗好', max: 100},
            {name: '保障好', max: 100},
            {name: '教育好', max: 100},
          ],
          center: ['50%', '55%'],
          radius: 90,
          startAngle: 60,
          splitNumber: 4,
          shape: 'circle',
          axisName: {
            formatter: '{value}',
            color: '#428BD4'
          },
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          }
        },
        series: [
          {
            name: '达标进度%',
            type: 'radar',
            lineStyle: {
              width: 2
            },
            symbolSize: 6,

            data: [
              {
                value: [100, 75, 95, 95, 95, 100],
                name: '目标',
                symbolSize: 6,
                lineStyle: {
                  type: 'dashed'
                }
              },
              {
                value: [75, 60, 80, 60, 100, 60],
                name: '进度'
              }
            ]
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
  margin: 0px 10px;
}

.echartDiv {
  width: 100%;
  height: 28vh;
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