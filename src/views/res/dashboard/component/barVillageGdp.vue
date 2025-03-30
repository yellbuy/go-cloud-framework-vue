<template>
  <div id="flareTarget">
    <dv-border-box10>
      <div class="flare-container">
        <div class="flare-title" style="text-align: left;padding-left:10px">乡镇产值情况</div>
        <div ref="echart" class="echartDiv"></div>
      </div>
    </dv-border-box10>
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
      xAxisData: [""],
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
              (parms[0].value).toFixed(2) +
              ' 万元'
            return str
          },
        },
        textStyle: {
          color: '#eee',
        },
        color: ['#9d96f5', '#96bfff'],
        grid: {
          containLabel: true,
          left: '0.5vw',
          top: '10vh',
          bottom: '4vh',
          right: '0.5vw',
        },
        toolbox: {
          show : false,
          orient: 'vertical',
          x: 'right',
          y: 'center',
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
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
            margin: 12, //刻度标签与轴线之间的距离。
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
          barWidth: 12,
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
          barWidth: 8,
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
              symbolSize: ['16', '4'],
              symbolOffset: ['-2', '-4'],
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
      
      state.xAxisData=["仁和镇","平地镇","大田镇","福田镇","同德镇","布德镇","前进镇","大龙潭彝族乡","啊喇彝族乡","太平乡","务本乡","中坝乡"];
        state.yAxisData=[17,16.5,14,15,13.5,12,9,8,6,7,6.5,7.2,6];
        state.yAxisSideData=state.xAxisData.map((val:any)=>{return val+1});
        echartInit();
        const now = dayjs();
      const startTime=now.startOf('year').format(); 
      const endTime=now.endOf('year').format(); 
      // const res = await proxy.$api.erp.waybill.getCustomerStatListByScope("freight",0, 0,{limit:5,startTime:startTime,endTime:endTime});
      // if(res.errcode==0){
       
      // }	
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
  margin:10px 10px;
}
.echartDiv {
  width: 100%;
  height:21vh;
  padding-bottom:1vh;
}
.flare-title{
  background-image: linear-gradient(to right,rgb(83, 78, 234), rgb(21, 6, 110));
  border-radius: 4px;
  margin-top: 1vh;
  height: 3vh;
  font-family: 'LiSu';
  font-weight: bold;
  text-align: 'left' !important;
  font-size: 18px;
}
</style>