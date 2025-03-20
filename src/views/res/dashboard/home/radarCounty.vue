<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">区建成情况</div>
        <div ref="echart" class="echartDiv"></div>
      </div>
    </dv-border-box10>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const { proxy } = getCurrentInstance() as any;
    let state = reactive({
      xAxisData: [""],
      yAxisData: [0],
      yAxisSideData: [0],
      echart: ref(),
    })
    const echartInit = () => {
      var myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      var option = {
        color: ['#FFE434', '#67F9D8', '#56A3F1', '#FF917C'],
        legend: {
          data: ['目标', '进度'],
          orient : 'vertical',
          align:"left",
          top:"0",
          right:"0",
          textStyle:{
            color: "#fff"
          }
          
        },
        radar: {
          indicator: [
            { name: '经济优建', max: 100 },
            { name: '民生优享', max: 100 },
            { name: '文明优创', max: 100 },
            { name: '环境优宜', max: 100 },
            { name: '社会优质', max: 100 },
            { name: '党建优促', max: 100 },
          ],
          center: ['50%', '55%'],
          radius: 90,
          startAngle: 60,
          splitNumber: 4,
          shape: 'circle',
          axisName: {
            formatter: '{value}',
            color: '#428BD4'
          },
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          }
        },
        series: [
          {
            name: '达标进度%',
            type: 'radar',
            lineStyle:{
              width:2
            },
            symbolSize: 6,
            
            data: [
              {
                value: [100, 75, 95, 95, 95,100],
                name: '目标',
                symbolSize: 6,
                lineStyle: {
                  type: 'dashed'
                },
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.value+'%';
                  }
                }
              },
              {
                value: [75, 60, 80, 60, 100,60],
                name: '进度'
              }
            ]
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
      echartInit,
    }
  },
}
</script>
 
<style lang='scss' scoped>
#flareTarget{
  margin:0px 10px;
}
.echartDiv {
  width: 100%;
  height:40vh;
  padding-bottom:1vh;
}
.flare-title{
  text-align: left;
  padding-left:10px;
  color:yellow;
  background-image: linear-gradient(to bottom,rgb(83, 77, 237),rgb(8, 3, 32));
  border-radius: 2px;
  margin-top: 1vh;
  height: 5vh;
  font-family: 'LiSu';
  font-weight: bold;
  text-align: 'left' !important;
  padding-top:6px;
  font-size: 20px;
}
</style>