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
import {onMounted, reactive, ref, toRefs} from 'vue';

export default {
  props: {
    xAxisData: Array,
    seriesData1: Array,
    seriesData2: Array,
    color1: Array,
    color2: Array,
    formatter: Array,
    objStyle: Array,
    top: Array,
    bottom: Array,
    color3: Array,
  },
  setup(props) {
    let state = reactive({
      echart: ref(),
    })
    const echartInit = () => {
      const myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      //下面就是上图的配置项，关键部分有注释
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
          bottom: props.bottom || '10%',
          top: props.top || '15%',
        },
        xAxis: {
          boundaryGap: true,
          data: props.xAxisData,
          axisLabel: {
            color: '#ddd'
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {show: false, lineStyle: {type: 'dashed', color: '#f5f5f5'}},
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {
            color: '#ddd',
            formatter: props.formatter != undefined ? '{value}' + props.formatter : '{value}%'
          },
          boundaryGap: [0, 0.01]
        },
        series: [
          {//里层的柱子
            name: '现状',
            type: 'bar',//象形柱状图
            barMaxWidth: 30,
            symbol: 'rectange',
            data: props.seriesData2,//柱子的数据
            symbolRepeat: true,//是否重复
            // symbolOffset: [10, 0],//柱子的位置
            symbolBoundingData: 1,//图形的个数
            label: {
              show: true,
              textStyle: {
                color: '#fff',
              },
              formatter: props.formatter != undefined ? '{c}' + props.formatter : '{c}%',
              position: 'inside',
              distance: -20
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 0.3, [
                {offset: 0, color: props.color1 && props.color1.length > 0 ? props.color1[0] : '#83bff6'},
                {offset: 0.5, color: props.color1 && props.color1.length > 1 ? props.color1[1] : '#188df0'},
                {offset: 1, color: props.color1 && props.color1.length > 2 ? props.color1[2] : '#188df0'}
              ])
            },
            z: 12//柱子的层级
          },
          { //外层的柱子
            name: "目标",
            type: "pictorialBar",
            barMinWidth: 50,
            barWidth: 50,
            symbol: 'rectange',
            symbolRepeat: true,
            symbolBoundingData: 1,
            label: {
              show: true,
              formatter: props.formatter != undefined ? '{c}' + props.formatter : '{c}%',
              textStyle: {
                color: '#ddd',
              },
              position: 'top',
              distance: 8
            },
            itemStyle: {
              color: props.color3 || "rgba(128,128,128,0.8)",
              opacity: 1,
            },
            z: 10,//柱子的层级
            data: props.seriesData1
          },
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
  height: 24.9vh;
}
</style>