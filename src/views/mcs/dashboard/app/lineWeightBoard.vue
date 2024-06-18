<template>
  <div class="line-weight-board">
    <div class="chart-name">
      <div style="font-family: 'LiSu';">运力分析（万吨） </div>
      <div>
        <dv-button @click="onChangeInvertal" border="Border1" color="#f3d19e" font-color="#e18a3b" style="z-index: 999999;text-decoration:underline">{{getModeName}}</dv-button>
      </div>
    </div>
    <dv-charts :option="option" class="line-weight-board-chart"/>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
export default {
  name: "waybillTimeStat",
   setup() {
    const { proxy } = getCurrentInstance() as any;
    // const res = proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
    // console.log("res：",res)
    const state = reactive({
      timeMode:'day',
      freightData:{},
      mainBusinessData:{},
      option:{
        legend: {
          data: [
            {
              name: "公路运量",
              color: "rgba(251, 114, 147, 1)",
            },
            {
              name: "铁路运量",
              color: "#b3e19d",
            }
          ],
          textStyle: {
            fill: "#fff",
          },
          title:{
            show:true
          },
        },
        xAxis: {
          type: 'log',  
          data:  ["1"],
          //data: model.labelNameList,
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#999",
            },
          },
          axisTick: {
            show: true,
          },
        },
        yAxis: {
          type: 'log',  
          data: "value",
          min:0,
          splitLine: {
            show: true,
          },
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#999",
            },
          },
          axisTick: {
            show: true,
          },
        },
        series: [
          {
            name: "公路运量",
            data: [0],
            label: {
              show: true,
              style: {
                fill: "#eee",
                //fontSize:12
              },
              formatter: '{value}'
            },
            type: "line",
            //smooth: true,
            lineArea: {
              show: true,
              gradient: ['rgba(251, 114, 147, 1)', 'rgba(251, 114, 147, 0)']
            },
            lineStyle: {
              stroke: 'rgba(251, 114, 147, 1)',
              lineDash: [1, 1]
            },
            linePoint: {
              radius: 6,
              style: {
                stroke: 'rgba(251, 114, 147, 1)'
              }
            },
            
            // lineStyle: {
            //   stroke: "#b3e19d",
            //   lineWidth: 2
            // },
            // linePoint: {
            //   radius: 6,
            //   style: {
            //     fill: "#b3e19d",
            //     stroke: "transparent",
            //   },
            // },
          },
          {
            name: "铁路运量",
            data:  [0],
            label: {
              show: true,
              style: {
                fill: "#eee",
                },
              formatter: '{value}'
            },
            type: "line",
            lineStyle: {
              stroke: "#b3e19d",
              lineWidth: 2
            },
            linePoint: {
              radius: 6,
              style: {
                fill: "#b3e19d",
                stroke: "transparent",
              },
            },
          },
        ],
      }
		});
    const setData=()=>{
      if(state.timeMode=="day") {
            state.option.xAxis.data=state.freightData.day.Name||[]
            state.option.series[0].data=state.freightData.day.PlanWeight||[]
            state.option.series[1].data=state.mainBusinessData.day.Weight||[]
        }
        else if(state.timeMode=="month") {
            state.option.xAxis.data=state.freightData.month.Name||[]
            state.option.series[0].data=state.freightData.month.PlanWeight||[]
            state.option.series[1].data=state.mainBusinessData.month.Weight||[]
        }
        else if(state.timeMode=="year") {
            state.option.xAxis.data=state.freightData.year.Name||[]
            state.option.series[0].data=state.freightData.year.PlanWeight||[]
            state.option.series[1].data=state.mainBusinessData.year.Weight||[]
        }
    }
    const getModeName = computed(() => {
			if(state.timeMode=="month"){
        return "月";
      } else if(state.timeMode=="year"){
        return "年";
      } else {
        return "日"
      }
		});
    const onChangeInvertal=()=>{
      if(state.timeMode=="day"){
        state.timeMode="month";
      } else if(state.timeMode=="month"){
        state.timeMode="year";
      } else{
        state.timeMode="day";
      }
      setData();
    }
    // 页面加载时
		onMounted(async () => {
      const res1 = await proxy.$api.erp.waybill.getTimeStatListByScope("freight", 0, 0);
      if(res1.errcode==0){
        state.freightData=res1.data;
      }		
      const res2 = await proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
      if(res2.errcode==0){
        state.mainBusinessData=res2.data;
      }
      setData();		
      setInterval(async () => {
        const res1 = await proxy.$api.erp.waybill.getTimeStatListByScope("freight", 0, 0);
        if(res1.errcode==0){
          state.freightData=res1.data;
        }		
        const res2 = await proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
        if(res2.errcode==0){
          state.mainBusinessData=res2.data;
        }
        setData();	
      }, 60000);
		});
    return {
      getModeName,
      onChangeInvertal,
      ...toRefs(state)
    }
  },
};
</script>

<style lang="less">
.line-weight-board {
  //position: relative;
  margin-top:2vh;
  padding: 0 2vh;
  box-sizing: border-box;
  height: auto;
  //top:-50px;

  .chart-name {
    // position: absolute;
    margin-left: 10px;
    text-align: left;
    font-size: 18px;
    display: flex;
    justify-content:space-between;
  }
  .line-weight-board-chart{
    width: 100%; 
    //height:240px;
    height:26vh;
    //height:calc(~"70vh - 420px") !important;
    margin-top:-5vh;
  }
}
</style>
