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
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              {value: 25, name: '财产性收入' + "( " + 25 + "% )"},
              {value: 15, name: '经营性收入' + "( " + 15 + "% )"},
              {value: 30, name: '工资性收入' + "( " + 30 + "% )"},
              {value: 25, name: '转移性收入' + "( " + 25 + "% )"},
              {value: 5, name: '经营成本' + "( " + 5 + "% )"}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option)
    }

    //挂载
    onMounted(async () => {
      myChart = echarts.init(state.echart, 'dark')
      setChartOption(myChart);
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang='scss' scoped>
#flareTarget {
  margin: 10px 10px;
}

.echartDiv {
  width: 100%;
  height: 30vh;
  padding: 1vh;
}

.flare-title {
  color: #0498D1;
  background: linear-gradient(to right, rgba(11, 33, 145, 1), rgba(9, 56, 122, 1), rgba(10, 52, 110, 0));
  border-radius: 6px;
  margin-top: 1vh;
  height: 5vh;
  font-family: 'LiSu',serif;
  font-weight: bold;
  text-align: left !important;
  padding-top: 6px;
  font-size: 20px;
}
</style>