<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-header">
        <span class="target-title">年龄占比</span>
      </div>
      <div class="target-content">
        <div ref="echart" class="echartDiv"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import * as echarts from 'echarts';
import {onMounted, reactive, ref, toRefs, watch} from 'vue';

export default {
  props: {
    eighteen: 20,
    twentyFive: 0,
    thirtyFive: 30,
    aboutThi: 0,
    aboutThiAbove: 0
  },
  setup(props) {
    let state = reactive({
      data: [],
      echart: ref(),
    })

    watch(() => props.eighteen, async (newValue) => {
      props.eighteen = [newValue];
      setChartOption(myChart);
    });
    watch(() => props.twentyFive, async (newValue) => {
      props.twentyFive = [newValue];
      setChartOption(myChart);
    });
    watch(() => props.thirtyFive, async (newValue) => {
      props.thirtyFive = [newValue];
      setChartOption(myChart);
    });
    watch(() => props.aboutThi, async (newValue) => {
      props.aboutThi = [newValue];
      setChartOption(myChart);
    });
    watch(() => props.aboutThiAbove, async (newValue) => {
      props.aboutThiAbove = [newValue];
      setChartOption(myChart);
    });

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
          left: 'top',
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
            radius: ['30%', '60%'],
            roseType: 'radius',
            avoidLabelOverlap: false,
            data: [
              {value: props.eighteen, name: "16岁以下"},
              {value: props.thirtyFive, name: "16-35岁"},
              {value: props.aboutThi, name: "35-60岁"},
              {value: props.aboutThiAbove, name: "60岁以上"}
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
      console.log("props.eighteen", props.eighteen);
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
  height: 21rem;
}
</style>