<template>
  <div id="flareTarget">
    <div ref="echart" class="echartDiv"></div>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import * as echarts from 'echarts';
import {onMounted, reactive, ref, toRefs, watch} from 'vue';

export default {
  props: {
    data: Array
  },
  setup(props) {
    let state = reactive({
      xAxisData: [""],
      yAxisData: [0],
      yAxisSideData: [0],
      echart: ref(),
    })
    watch(() => props.data, async (newValue) => {
      props.data = [newValue];
      echartInit();
    });

    const echartInit = () => {
      const myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      const option = {
        grid: {
          show: false,
          top: '5%',
          left: '10%',
          right: '0%',
          bottom: '15%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['⽣活好', '教育好', '医疗好', '住房好', '家⻛好',],
          splitLine: {
            show: false // 隐藏横线
          },
          axisLabel: {
            fontSize: 12,
            color: '#fff'
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false // 隐藏横线
          },
          axisLabel: {
            fontSize: 13,
            color: '#fff',
            formatter: '{value}'
          }
        },
        series: [
          {
            data: props.data,
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
      echartInit
    }
  },
}
</script>

<style lang='scss' scoped>
.echartDiv {
  height: 14rem;
}
</style>