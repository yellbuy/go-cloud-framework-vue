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
      yAxisData1: [0],
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
              parms[0].value +
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
        series: [
          {
            data: state.yAxisData,
            stack: 'zs',
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 40,
            label:{
              show: true,
              textStyle: {
                color: '#ddd',
              },
              position:'top'
            },
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#9d96f5',
                  },
                  {
                    offset: 1,
                    color: '#8378ea',
                  },
                ],
              },
            },
          },

          //下面的立体,控制颜色是color第一个
          {
            data: state.yAxisData,
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [40, 6],
            zlevel: 2,
          },
          //上面的立体,控制颜色是color第二个
          {
            data: state.yAxisData,
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [40, 6],
            zlevel: 2,
          },
        ],
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
        console.log("state.xAxisData",state.xAxisData)
        console.log("state.yAxisData",state.yAxisData)
        echartInit();
      }	
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getCustomerStatListByScope("freight",0, 0,{limit:4,startTime:startTime,endTime:endTime});
        if(res.errcode==0){
          state.xAxisData=res.data.map((val:any)=>{return val.Name});
          state.yAxisData=res.data.map((val:any)=>{return val.Weight});
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