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
  props: {
    data: Array,
    label: Array
  },
  setup(props) {
    let state = reactive({
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
          bottom: '10%',
        },
        xAxis: {
          type: 'category',
          data: props.label,
          splitLine: {
            show: false // 隐藏横线
          },
          axisLabel: {
            fontSize: 11,
            color: '#28A2CE'
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false // 隐藏横线
          },
          axisLabel: {
            fontSize: 11,
            color: '#28A2CE',
            formatter: '{value}户'
          }
        },
        series: [
          {
            type: "pictorialBar",
            symbolSize: [45, 25],
            symbolOffset: [0, -10],
            symbolPosition: "end",
            itemStyle: {
              color: "#32dbfc",
              opacity: 1,
            },
            data: props.data,
          },
          {
            data: props.data,
            type: "pictorialBar",
            symbolSize: [45, 25],
            symbolOffset: [0, 10],
            itemStyle: {
              color: "#0869cc",
              opacity: 0.7,
            },
            z: 0,
          },
          {
            type: "bar",
            barWidth: 45,
            barGap: "-100%",
            z: 0,
            itemStyle: {
              color: "#128cfc",
              opacity: 0.7,
            },
            data: props.data,
            label: {
              show: true,
              color: "#ffffff",
              fontSize: 14,
              formatter: '{c}户',
            },
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
  height: 18.2rem;
}
</style>