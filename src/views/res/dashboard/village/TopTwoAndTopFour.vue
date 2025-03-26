<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div ref="echart" class="echartDiv"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {onMounted, reactive, ref, toRefs} from 'vue';
import "@/views/res/dashboard/component/scss/box.scss";
import * as echarts from "echarts";

export default {
  setup() {
    let state = reactive({
      echart: ref(),
    })
    const echartInit = () => {
      const myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      const option = {
        legend: {
          orient: 'vertical',
          left: 'right',
          itemWidth: 25,
          itemHeight: 8,
          textStyle: {
            fontSize: 12,
            color: '#428BD4',
          }
        },
        grid: {
          show: false,
          top: '5%',
          left: '10%',
          right: '15%',
          bottom: '15%',
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '组织强',
              '治理强',
              '产业优',
              '环境优',
              '文化优',
              '服务优'
            ],
            splitLine: {
              show: false // 隐藏横线
            },
            axisLabel: {
              fontSize: 10,
              color: '#28A2CE'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false // 隐藏横线
            },
            axisLabel: {
              fontSize: 11,
              color: '#28A2CE',
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '现状',
            type: 'bar',
            data: [20, 49, 70, 32, 26, 67]
          },
          {
            name: '目标',
            type: 'bar',
            data: [26, 59, 90, 64, 87, 97]
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
  height: 12rem;
}
</style>