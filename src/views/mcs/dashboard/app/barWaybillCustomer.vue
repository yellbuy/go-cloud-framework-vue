<template>
  <div id="ranking-board">
    <div class="ranking-board-title">客户运量统计</div>
    <div ref="echart" class="echartDiv" style="width:95%;height:160px"></div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const { proxy } = getCurrentInstance() as any;
    let state = reactive({
      xAxisData: [0],
      yAxisData: [0],
      yAxisSideData: [0],
      echart: ref(),
    })
    const echartInit = () => {
      var myChart = echarts.init(state.echart)
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (parms) {
            var str =
              parms[0].axisValue +
              '</br>' +
              (parms[0].value-12).toFixed(2) +
              ' 万吨'
            return str
          },
        },
        textStyle: {
          color: '#ddd',
        },
        color: ['#9d96f5', '#96bfff'],
        grid: {
          containLabel: true,
          left: '1%',
          top: '2%',
          bottom: '1%',
          right: '2%',
        },
      //   toolbox: {
      //     show : true,
      //     orient: 'vertical',
      //     x: 'right',
      //     y: 'center',
      //     feature : {
      //         mark : {show: true},
      //         dataView : {show: true, readOnly: false},
      //         magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
      //         restore : {show: true},
      //         saveAsImage : {show: true}
      //     }
      // },
        calculable : false,
        legend: {
        data:[]
        },
        xAxis: {
          type: 'category',
          data: state.xAxisData,
          axisLine: {
            lineStyle: {
              color: '#777',
            },
          },
          axisTick: {
            show: true,
          },
          // axisLabel: {
          //   formatter: function (value, index) {
          //     // 自定义标签格式
          //     return `${value} 标签`;
          //   }
          // },
          axisLabel: {
            interval:'auto',
            show: true,
            margin: 16, //刻度标签与轴线之间的距离。
            textStyle: {
              color: '#ddd',
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#B5B5B5',
            },
          },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#B5B5B5'],
              type: 'dashed',
              opacity: 0.5,
            },
          },
          axisLabel: {
              show: true,
              textStyle: {
                color: '#ddd',
              },
          },
          
        },
        series: [{
          name: 'a',
          tooltip: {
              show: false
          },
          type: 'bar',
          barWidth: 30,
          label:{
            show: true,
            textStyle: {
              color: '#ddd',
            },
            position:'top',
            distance:8
          },
          itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0,
                      color: "#0B4EC3" // 0% 处的颜色
                  }, {
                      offset: 0.6,
                      color: "#138CEB" // 60% 处的颜色
                  }, {
                      offset: 1,
                      color: "#17AAFE" // 100% 处的颜色
                  }], false)
              }
          },
          data: state.yAxisData,
          barGap: 0
      }, {
          type: 'bar',
          barWidth: 10,
          itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "#09337C" // 0% 处的颜色
                }, {
                    offset: 0.6,
                    color: "#0761C0" // 60% 处的颜色
                }, {
                    offset: 1,
                    color: "#0575DE" // 100% 处的颜色
                }], false)
              }
          },
          barGap: 0,
          data: state.yAxisSideData
          }, {
              name: 'b',
              tooltip: {
                  show: false
              },
              type: 'pictorialBar',
              itemStyle: {
                  borderWidth: 2,
                  borderColor: '#0571D5',
                  color: '#1779E0'
              },
              symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
              symbolSize: ['40', '8'],
              symbolOffset: ['0', '-8'],
              //symbolRotate: -5,
              symbolPosition: 'end',
              data: state.yAxisData,
              z: 3
          }]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }

    //挂载
    onMounted(async () => {
      const now = dayjs();
      const startTime=now.startOf('year').format(); 
      const endTime=now.endOf('year').format(); 

      const res = await proxy.$api.erp.waybill.getCustomerStatListByScope("freight",0, 0,{limit:4,startTime:startTime,endTime:endTime});
      if(res.errcode==0){
        state.xAxisData=res.data.map((val:any)=>{return val.Name});
        state.yAxisData=res.data.map((val:any)=>{return val.Weight});
        state.yAxisSideData=res.data.map((val:any)=>{return val.Weight+12});
        echartInit();
      }	
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getCustomerStatListByScope("freight",0, 0,{limit:4,startTime:startTime,endTime:endTime});
        if(res.errcode==0){
          state.xAxisData=res.data.map((val:any)=>{return val.Name});
          state.yAxisData=res.data.map((val:any)=>{return val.Weight});
          state.yAxisSideData=res.data.map((val:any)=>{return val.Weight+12});
          echartInit();
        }	
      }, 60000);
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
  width: 100%;
  height: 400px;
}
</style>