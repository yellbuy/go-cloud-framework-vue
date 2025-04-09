<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-content">
        <div ref="echart" class="echartDiv"></div>
        <div>农业社会化服务协办员1名</div>
        <div>姓名：<span style="color:#1AFD9BFF;">李*</span> &nbsp;&nbsp;职务：<span style="color:#1AFD9BFF;">主任</span> &nbsp;&nbsp;电话：<span
            style="color:#1AFD9BFF;">135****8935</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "@/views/res/dashboard/component/scss/box.scss";
import * as echarts from 'echarts';
import {onMounted, reactive, ref, toRefs} from 'vue';

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
            color: '#fff',
          }
        },
        series: [
          {
            name: "产值占比",
            type: 'pie',
            radius: ['50%', '70%'],
            roseType: 'radius',
            avoidLabelOverlap: false,
            data: [
              {value: 28.32, name: "芒果产值"},
              {value: 26.14, name: "蔬菜产值"},
            ],
            label: { // 图表的标签配置，例如柱状图的标签显示在柱子上方或下方等位置。
              show: true, // 是否显示标签，默认为false。根据需要开启。
              textStyle: { // 这里可以设置标签的文本样式，包括字体大小等。
                fontSize: 18,
                color: "#fff"
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
  width: 100%;
  height: 10rem;
}
</style>