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
    markLine: [],
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
              top: '10%',
              left: '10%',
              right: '0%',
              bottom: '15%',
            },
            xAxis: {
              type: 'category',
              data: props.label,
              splitLine: {
                show: false // 隐藏横线
              },
              axisLabel: {
                fontSize: 12,
                color: '#28A2CE'
              }
            },
            yAxis: {
              type: 'value',
              splitLine: {
                show: false // 隐藏横线
              },
              axisLabel: {
                fontSize: 12,
                color: '#28A2CE',
                formatter: '{value}万'
              }
            },
            series: [
              {
                type: "pictorialBar",
                symbolSize: [45, 25],
                symbolOffset: [0, -10],
                symbolPosition: "end",
                itemStyle: {
                  color: "#80c0cf",
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
                  distance:10,
                  fontSize: 12,
                  position: 'top',
                  formatter: '{c}万',
                  z:10000,
                },
                markLine: {
                  data: [
                    [
                      {
                        name: props.markLine[0],
                        yAxis: props.markLine[0],
                        x: 70
                      },
                      {
                        yAxis: props.markLine[0],
                        x: 160
                      },
                    ],
                    [
                      {
                        name: props.markLine[1],
                        yAxis: props.markLine[1],
                        x: 210
                      },
                      {
                        yAxis: props.markLine[1],
                        x: 290
                      },
                    ],
                    [
                      {
                        name: props.markLine[2],
                        yAxis: props.markLine[2],
                        x: 340
                      },
                      {
                        yAxis: props.markLine[2],
                        x: 430
                      },
                    ]
                  ],
                  lineStyle: {
                    color: '#FCAE26FF',
                    type: 'dashed',
                    cap: 'round'
                  },
                  label: {
                    position: 'start',
                    formatter: '{b}万',
                    color: '#FCAE26FF',
                    fontSize: 12,
                    z: 2200
                  },
                  z: 22
                }
              }
            ]
          }
      ;
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
  height: 20vh;
}
</style>