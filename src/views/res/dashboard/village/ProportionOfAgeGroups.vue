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
import { onMounted, reactive, ref, toRefs, watch } from 'vue';

export default {
  props: {
    ageData: []
  },
  setup(props) {
    let state = reactive({
      data: [],
      echart: ref(),
    })

    watch(() => props.ageData, async () => {
      setChartOption(myChart);
    });

    let myChart: any
    const setChartOption = (chart: any) => {
      // 指定图表的配置项和数据
      const option = {
        
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(50,50,50,0.7)',
          formatter: '{b} : {d}%',
          textStyle: {
            color: '#eee'
          },
          
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: "年龄占比",
            type: 'pie',
            radius: ['30%','60%'],
            data: [
              {value: props.ageData[0], name: "3岁以下"},
              {value: props.ageData[1], name: "3-6岁"},
              {value: props.ageData[2], name: "6-18岁"},
              {value: props.ageData[3], name: "18-60岁"},
              {value: props.ageData[4], name: "60-80岁"},
              {value: props.ageData[5], name: "80岁以上"}
            ],
            label: {
              normal: {
                show: true,
                formatter: '{b}\n{d}%',
                fontSize: 10,
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

      let currentIndex = -1;
      setInterval(function() {
        var dataLen = 6;
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 2000);

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