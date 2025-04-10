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
    label: Array,
    YFormatter: Array
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
          right: "0",
          bottom: "15%",
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: props.label,
          textStyle: {
            color: '#fff'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['2022', '2023', '2024'],
            axisLabel: {
              color: '#fff'
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
              color: '#fff',
              formatter: props.YFormatter || '{value}%'
            }
          }
        ],
        series: []
      };

      for (let i = 0; i < props.label?.length; i++) {
        option.series.push({
          name: props.label[i],
          type: 'bar',
          data: props.data[i],
        });
      }

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
  height: calc((100vh - 5.6rem) / 5.7);
}
</style>