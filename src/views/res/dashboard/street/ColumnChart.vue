<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div ref="echart" class="echartDiv target-container-h3"></div>
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
            color: '#eee'
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false // 隐藏横线
          },
          axisLabel: {
            fontSize: 11,
            color: '#eee',
            formatter: '{value}户'
          }
        },
        series: [
          {
            type: "pictorialBar",
            symbolSize: [45, 25],
            symbolOffset: [0, -10],
            symbolPosition: "end",
            data: [],
          },
          {
            data: [],
            type: "pictorialBar",
            symbolSize: [45, 25],
            symbolOffset: [0, 10],
            z: 0,
          },
          {
            type: "bar",
            barWidth: 45,
            barGap: "-100%",
            z: 0,
            data: [],
            label: {
              show: true,
              color: "#eee",
              fontSize: 14,
              formatter: '{c}户',
            },
          }
        ]
      };

      for (let i = 0; i < props.data?.length; i++) {

        // 生成0到255之间的随机整数
        const randomNumber1 = getRandomInt(0, 255);
        const randomNumber2 = getRandomInt(0, 255);
        const randomNumber3 = getRandomInt(0, 255);
        const itemStyle = {
          value: props.data[i],
          itemStyle: {
            color: "rgb(" + randomNumber1 + "," + randomNumber2 + "," + randomNumber3 + ")",
            opacity: 0.7,
          }
        }
        const itemStyle1 = {
          value: props.data[i],
          itemStyle: {
            color: "rgb(" + randomNumber1 + "," + randomNumber2 + "," + randomNumber3 + ")",
            opacity: 1,
          }
        }
        option.series.at(0)?.data.push(itemStyle1);
        option.series.at(1)?.data.push(itemStyle);
        option.series.at(2)?.data.push(itemStyle);
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
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