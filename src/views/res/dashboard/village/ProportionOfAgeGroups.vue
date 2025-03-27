<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-header">
        <div class="target-title">产业优</div>
      </div>
      <div class="target-content m15">
        <div ref="echart" class="echartDiv"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import {onMounted, reactive, ref, toRefs} from 'vue';
import "@/views/res/dashboard/component/scss/box.scss";

export default {
  setup() {
    let state = reactive({
      data: [],
      echart: ref(),
    })

    let myChart: any
    const setChartOption = (chart: any) => {
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
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
        series: [
          {
            name: "年龄占比",
            type: 'pie',
            radius: ['50%', '70%'],
            roseType: 'radius',
            avoidLabelOverlap: false,
            data: [
              {value: 45, name: "芒果"},
              {value: 20, name: "石榴"},
              {value: 20, name: "蔬菜"},
              {value: 15, name: "肉食"}
            ],
            label: { // 图表的标签配置，例如柱状图的标签显示在柱子上方或下方等位置。
              show: true, // 是否显示标签，默认为false。根据需要开启。
              textStyle: { // 这里可以设置标签的文本样式，包括字体大小等。
                fontSize: 18,
                color: "#428BD4"
              },
              formatter: '{d}%'
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option)
    }

    //挂载
    onMounted(async () => {
      myChart = echarts.init(state.echart)
      setChartOption(myChart);
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang='scss' scoped>
.echartDiv {
  height: 12rem;
}
</style>