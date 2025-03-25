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
        grid: {
          show: false,
          top: '5%',
          left: '10%',
          right: '0%',
          bottom: '5%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['未购买基本养老保险', '未购买基本医疗保险', 'D级危房', '生产生活缺水', '辍学学生'],
          splitLine: {
            show: false // 隐藏横线
          },
          axisLabel: {
            fontSize: 0
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false // 隐藏横线
          },
          axisLabel: {
            fontSize: 15,
            color: '#28A2CE',
          }
        },
        series: [
          {
            data: [120, 200, 150, 80, 70],
            color: '#28A2CE',
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
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