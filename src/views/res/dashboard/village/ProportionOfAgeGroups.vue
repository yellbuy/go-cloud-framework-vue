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
    eighteen: Array,
    twentyFive: Array,
    thirtyFive: Array,
    aboutThi: Array,
    aboutThiAbove: Array
  },
  setup(props) {
    let state = reactive({
      data: [],
      echart: ref(),
    })

    watch(() => props.eighteen, async () => {
      setChartOption(myChart);
    });
    watch(() => props.twentyFive, async () => {
      setChartOption(myChart);
    });
    watch(() => props.thirtyFive, async () => {
      setChartOption(myChart);
    });
    watch(() => props.aboutThi, async () => {
      setChartOption(myChart);
    });
    watch(() => props.aboutThiAbove, async () => {
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
        // legend: {
        //   orient: 'vertical',
        //   left: 'top',
        //   itemWidth: 25,
        //   itemHeight: 8,
        //   textStyle: {
        //     fontSize: 12,
        //     color: '#fff',
        //   }
        // },
        series: [
          {
            name: "年龄占比",
            type: 'pie',
            radius: '90%',
            data: [
              {value: props.eighteen, name: "16岁以下"},
              {value: props.thirtyFive, name: "16-35岁"},
              {value: props.aboutThi, name: "35-60岁"},
              {value: props.aboutThiAbove, name: "60岁以上"}
            ],
            label: {
              normal: {
                show: true,
                position: 'inner',
                formatter: '{b}\n{d}%',
                fontSize: 12,
                color: '#fff',
              },
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
  height: 16rem;
}
</style>