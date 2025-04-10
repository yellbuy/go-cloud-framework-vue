<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div ref="echart" :style="objStyle||''" class="echartDiv"></div>
    </div>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import * as echarts from "echarts";
import { onMounted, reactive, ref, toRefs } from 'vue';

export default {
  props: {
    data: Array,
    label: Array,
    XLabel: Array,
    objStyle: Array,
    formatter: Array,
    YFontSize: Array,
    YAxisLabel: Array,
    left: Array,
    bottom: Array
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
          top: "40%",
          right: "0",
          left: props.left || "10%",
          bottom: props.bottom || "15%",
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
            data: props.XLabel || ['2022年', '2023年', '2024年'],
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
              show: props.YAxisLabel || true,
              color: '#fff',
              fontSize: props.YFontSize || 11,
              formatter: props.formatter != undefined ? '{value}' + props.formatter : '{value}%',
            }
          }
        ],
        series: []
      };

      for (let i = 0; i < props.label?.length; i++) {
        const data = {
          name: props.label[i],
          type: 'bar',
          data: props.data[i],
          label: {
            show: true,
            formatter: props.formatter != undefined ? '{c}' + props.formatter : '{c}%',
            textStyle: {
              color: '#ddd',
              fontSize: props.YFontSize || 11,
            },
            position: 'top',
            distance: 8
          },
          itemStyle: {}
        };
        if (i == 0) {
          data.itemStyle = {
            color: '#DADA00FF'
          }
        }
        option.series.push(data);
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