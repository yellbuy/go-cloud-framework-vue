<template>
  <div>
    <div ref="echart" class="echartDiv"></div>
  </div>
</template>

<script lang="ts">

import "@/views/res/dashboard/component/scss/box.scss";
import * as echarts from "echarts";
import {onMounted, reactive, ref, toRefs, watch} from "vue";

export default {
  props: {
    incomeFromProperty: 0,
    operationalIncome: 0,
    incomeFromWageAndSalary: 0,
    transferIncome: 0,
  },
  setup(props) {
    let state = reactive({
      xAxisData: [""],
      yAxisData: [0],
      yAxisSideData: [0],
      echart: ref(),
    })
    watch(() => props.incomeFromProperty, async (newValue) => {
      props.incomeFromProperty = [newValue];
      echartInit();
    });
    watch(() => props.operationalIncome, async (newValue) => {
      props.operationalIncome = [newValue];
      echartInit();
    });
    watch(() => props.incomeFromWageAndSalary, async (newValue) => {
      props.incomeFromWageAndSalary = [newValue];
      echartInit();
    });
    watch(() => props.transferIncome, async (newValue) => {
      props.transferIncome = [newValue];
      echartInit();
    });

    const echartInit = () => {
      const myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      const option = {
        series: [
          {
            label: {
              alignTo: 'edge',
              formatter: '{b} {c}% ',
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15,
              textStyle: {
                fontSize: 13,
                color: '#fff',
              }
            },
            type: 'pie',
            radius: ['20%', '40%'],
            data: [
              {value: props.incomeFromProperty, name: '财产性收入'},
              {value: props.operationalIncome, name: '经营性收入'},
              {value: props.incomeFromWageAndSalary, name: '工资性收入'},
              {value: props.transferIncome, name: '转移性收入'}
            ]
          }
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
  height: 12rem
}
</style>