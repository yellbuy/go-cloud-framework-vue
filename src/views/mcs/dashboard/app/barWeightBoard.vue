<template>
  <div class="weight-scroll-board">
    <div class="chart-name">
      <div style="font-family: 'LiSu';">运力分析（万吨） </div>
      <div>
        <dv-button @click="onChangeInvertal" border="Border1" color="#f3d19e" font-color="#e18a3b" style="z-index: 999999;text-decoration:underline">{{getModeName}}</dv-button>
      </div>
    </div>
    <dv-charts :option="option" class="weight-scroll-board-chart"/>
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
              color: "#b3e19d",
            },
            {
              name: "铁路运量",
              color: "#fab6b6",
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
              formatter: '{value}'
            },
            // data: model.planValueList,
            //data: state[state.timeMode].planValueList,
            type: "bar",
            shapeType: 'leftEchelon',
            gradient: {
              color: ['#b3e19d', '#e1f3d8']
            },
            // barStyle: {
            //   fill: "#529b2e",
            // },
          },
          {
            name: "铁路运量",
           data:  [0],
           label: {
            show: true,
            formatter: '{value}'
          },
             //data: model.finishValueList,
            //data: state[state.timeMode].finishValueList,
            type: "bar",
            shapeType: 'rightEchelon',
            gradient: {
              color: ['#fab6b6', '#fde2e2']
            },
            // barStyle: {
            //   fill: "#ff5ca9",
            // },
            lineStyle: {
              stroke: "#ff5ca9",
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#ff5ca9",
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
.weight-scroll-board {
  //position: relative;
  padding: 8px;
  box-sizing: border-box;
  //top:-50px;

  .chart-name {
    // position: absolute;
    margin-left: 10px;
    text-align: left;
    font-size: 18px;
    display: flex;
    justify-content:space-between;
  }
  .weight-scroll-board-chart{
    width: 100%; 
    height:20vh;
    margin-top:-50px;
  }
}
</style>
