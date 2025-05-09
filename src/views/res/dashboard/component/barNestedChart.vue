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
    xAxisData: Array,
    seriesData1: Array,
    seriesData2: Array,
    color1: Array,
    color2: Array,
    formatter: Array,
    objStyle: Array,
    top: Array,
    bottom: Array,
    left: Array,
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
          data: ['2030年', '2024年'],
          right: 10,
          itemHeight:10,
          height :20,
          padding: [2, 5],
          textStyle: {
            color: '#ffffff'
          }
        },
        grid: {
          left: props.left || '50',
          right: '10',
          bottom: props.bottom || '20',
          top: props.top || '36',
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
          splitNumber:2,
          //show: false,
          splitLine: {show: true, lineStyle: {type: 'dashed', color: '#555'}},
          axisLine: {show: true},
          axisTick: {show: true},
          axisLabel: {
            color: '#ddd',
            formatter: props.formatter != undefined ? '{value}' + props.formatter : '{value}%'
          },
          max:100,
          min:0,
          boundaryGap: [0, 0.01]
        },
        series: [
          {//里层的柱子
            name: '2024年',
            type: 'bar',//象形柱状图
            barMaxWidth: 26,
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
            name: "2030年",
            type: "pictorialBar",
            barMinWidth: 32,
            barWidth: 32,
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
              distance: 3
            },
            itemStyle: {
              color: props.color3 || "rgb(194,202,234)",
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
  height: 24vh;
}
</style>