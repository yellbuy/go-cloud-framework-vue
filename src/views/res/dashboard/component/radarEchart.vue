<template>
  <div>
    <div ref="echart" :style="style"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import {getCurrentInstance, onMounted, reactive, ref, toRefs} from 'vue';

export default {
  props: {
    legendNameData: {
      type: Array,
      default: ['目标', '进度'],
    },
    indicatorNameData: {
      type: Array,
      default: [
        {name: '经济优建', max: 100},
        {name: '民生优享', max: 100},
        {name: '文明优创', max: 100},
        {name: '环境优宜', max: 100},
        {name: '社会优质', max: 100},
        {name: '党建优促', max: 100},
      ],
    },
    startAngle: {
      type: Number,
      default: 0
    },
    style: {
      type: String,
      default: "width:100%;"
    },
    seriesName: {
      type: String,
      default: "达标进度%"
    },
    series1ValueData: {
      type: Array,
      default: [100, 75, 95, 95, 95, 100]
    },
    series1NameData: {
      type: String,
      default: "目标"
    },
    series2ValueData: {
      type: Array,
      default: [75, 60, 80, 60, 100, 60]
    },
    series2NameData: {
      type: Array,
      default: "进度"
    },
  },
  setup(props) {
    const {proxy} = getCurrentInstance() as any;
    let state = reactive({
      xAxisData: [""],
      yAxisData: [0],
      yAxisSideData: [0],
      echart: ref(),
    })
    const echartInit = () => {
      var myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      var option = {
        color: ['#FFE434', '#67F9D8', '#56A3F1', '#FF917C'],
        legend: {
          data: props.legendNameData,
          orient: 'vertical',
          align: "left",
          top: "0",
          right: "0",
          textStyle: {
            color: "#fff"
          }

        },
        radar: {
          indicator: props.indicatorNameData,
          center: ['50%', '50%'],
          radius: 80,
          startAngle: props.startAngle,
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
            name: props.seriesName,
            type: 'radar',
            lineStyle: {
              width: 2
            },
            symbolSize: 6,

            data: [
              {
                value: props.series1ValueData,
                name: props.series1NameData, //目标

              },
              {
                value: props.series2ValueData,
                name: props.series2NameData, //进度
                symbolSize: 6,
                lineStyle: {
                  type: 'dashed'
                },
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.value + '%';
                  }
                }
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

</style>