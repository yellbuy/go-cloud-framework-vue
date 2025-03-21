<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="flare-title" style="text-align: left;padding-left:10px">家庭收入年占比</div>
      <div ref="echart" class="echartDiv"></div>
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
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            data: [
              {value: 25, name: '财产性收入' + "( " + 25 + "% )"},
              {value: 15, name: '经营性收入' + "( " + 15 + "% )"},
              {value: 30, name: '工资性收入' + "( " + 30 + "% )"},
              {value: 25, name: '转移性收入' + "( " + 25 + "% )"},
              {value: 5, name: '经营成本' + "( " + 5 + "% )"}
            ],
            textStyle: {
              color: '#0497cf',
              textBorderWidth: 0
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

</style>