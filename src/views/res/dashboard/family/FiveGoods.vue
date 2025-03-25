<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-header">
        <div class="target-title">五好达标情况</div>
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
        color: ['#FFE434', '#67F9D8', '#56A3F1', '#FF917C'],
        textStyle: {
          fontFamily: 'Arial, Verdana, sans-serif', // 字体类型
          fontSize: 20, // 字体大小
          fontWeight: 'bold' // 字体粗细
        },
        radar: {
          indicator: [
            {name: '住房好', max: 100},
            {name: '家风好', max: 100},
            {name: '医疗好', max: 100},
            {name: '生活好', max: 100},
            {name: '教育好', max: 100},
          ],
          center: ['50%', '50%'],
          radius: 100,
          startAngle: 0,
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
  height: 25rem;
}
</style>