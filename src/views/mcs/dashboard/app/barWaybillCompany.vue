<template>
  <div id="ranking-board">
    <div class="company-board-title">公司运量统计</div>
    <div ref="echart" class="echartDiv"></div>
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
          backgroundColor: 'rgba(50,50,50,0.7)',
          axisPointer: {
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            color: '#eee',
          },
          formatter: function (parms) {
            var str =
              parms[0].axisValue +
              '</br>' +
              (parms[0].value-24).toFixed(2) +
              ' 万吨'
            return str
          },
        },
        textStyle: {
          color: '#eee',
        },
        color: ['#fb7293', '#ffdb5c'],
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
          min:0,
          boundaryGap:true,
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
            show: false,
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
              show: true
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
                      color: "#F56C6C" // 0% 处的颜色
                  }, {
                      offset: 0.6,
                      color: "#f89898" // 60% 处的颜色
                  }, {
                      offset: 1,
                      color: "#fab6b6" // 100% 处的颜色
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
                      color: "#c45656" // 0% 处的颜色
                  }, {
                      offset: 0.6,
                      color: "#F56C6C" // 60% 处的颜色
                  }, {
                      offset: 1,
                      color: "#f89898" // 100% 处的颜色
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
                  color: '#f89898'
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

      const res = await proxy.$api.erp.waybill.getCompanyStatListByScope("freight",0, 0,{limit:5,startTime:startTime,endTime:endTime});
      if(res.errcode==0){
        state.xAxisData=res.data.map((val:any)=>{return val.Name});
        state.yAxisData=res.data.map((val:any)=>{return val.Weight});
        state.yAxisSideData=res.data.map((val:any)=>{return val.Weight+16});
        echartInit();
      }	
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getCompanyStatListByScope("freight",0, 0,{limit:5,startTime:startTime,endTime:endTime});
        if(res.errcode==0){
          state.xAxisData=res.data.map((val:any)=>{return val.Name});
          state.yAxisData=res.data.map((val:any)=>{return val.Weight});
          state.yAxisSideData=res.data.map((val:any)=>{return val.Weight+16});
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
  height:20vh;
  padding-bottom:1vh;
}
.company-board-title{
  margin-top: 1vh;
  height: 4vh;
  font-family: 'LiSu';
  font-weight: bold;
  text-align: left;
  font-size: 18px;
}
</style>