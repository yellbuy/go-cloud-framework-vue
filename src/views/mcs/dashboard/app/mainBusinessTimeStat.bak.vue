<template>
  <div class="scroll-board">
    <div class="chart-name">
      铁路运量分析
    </div>
    <dv-charts :option= "option" style="width: 180px; height:180pxy"/>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
export default {
  name: "mainBusinessTimeStat",
  async setup() {
    const { proxy } = getCurrentInstance() as any;
    const res = await proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
    console.log("res：",res)
    const state = reactive({
      timeMode:'day',
      day:{
        labelNameList:res.data.day.Name,
        planValueList :res.data.day.PlanWeight, //计划量
        finishValueList :res.data.day.Weight, //完成量
      },
			month:{
        labelNameList:[],
        planValueList :[], //计划量
        finishValueList :[], //完成量
      },
      year:{
        labelNameList:[],
        planValueList :[], //计划量
        finishValueList :[], //完成量
      },
      option:{
        legend: {
          data: [
            {
              name: "计划量",
              color: "#00baff",
            },
            {
              name: "完成量",
              color: "#ff5ca9",
            }
          ],
          textStyle: {
            fill: "#fff",
          },
        },
        xAxis: {
          data: res.data.day.Name,
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
            show: false,
          },
        },
        yAxis: {
          data: "value",
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
            name: "计划量",
            data: res.data.day.PlanWeight,
            // data: model.planValueList,
            //data: state[state.timeMode].planValueList,
            type: "bar",
            barStyle: {
              fill: "rgba(0, 186, 255, 0.4)",
            },
          },
          {
            name: "完成量",
           data: res.data.day.Weight,
             //data: model.finishValueList,
            //data: state[state.timeMode].finishValueList,
            type: "line",
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
          {
            data: [0.2, 1.2, 4.2, 4.2, 5.2, 4.2],
            type: "line",
            name: "完成进度",
            lineArea: {
              show: true,
              gradient: ["rgba(245, 217, 79, 0.8)", "rgba(245, 217, 79, 0.2)"],
            },
            lineStyle: {
              stroke: "#f5d94e",
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#f5d94e",
                stroke: "transparent",
              },
            },
          },
        ],
      }
		});
    
    // 页面加载时
		onMounted(async () => {
      
      // const res = await proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
      // if(res.errcode==0){
      //   nextTick(() => {
      //     state.day.labelNameList=res.data.day.Name;
      //     state.day.planValueList=res.data.day.PlanWeight;
      //     state.day.finishValueList=res.data.day.Weight;
      //     state.month.labelNameList=res.data.month.Name;
      //     state.month.planValueList=res.data.month.PlanWeight;
      //     state.month.finishValueList=res.data.month.Weight;
      //     state.year.labelNameList=res.data.year.Name;
      //     state.year.planValueList=res.data.year.PlanWeight;
      //     state.year.finishValueList=res.data.year.Weight;
      //     if(state.timeMode=="day"){
      //       state.option.xAxis.data=state.day.labelNameList
      //       state.option.series[0].data=state.day.PlanWeight
      //       state.option.series[1]=state.day.Weight
      //     }
			// });
        
      // }		
      // setInterval(async () => {
      //   const res = await proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
      //   if(res.errcode==0){
      //     nextTick(() => {
      //     state.day.labelNameList=res.data.day.Name;
      //     state.day.planValueList=res.data.day.PlanWeight;
      //     state.day.finishValueList=res.data.day.Weight;
      //     state.month.labelNameList=res.data.month.Name;
      //     state.month.planValueList=res.data.month.PlanWeight;
      //     state.month.finishValueList=res.data.month.Weight;
      //     state.year.labelNameList=res.data.year.Name;
      //     state.year.planValueList=res.data.year.PlanWeight;
      //     state.year.finishValueList=res.data.year.Weight;
      //     state.option.xAxis.data=state.day.labelNameList
      //     state.option.series[0].data=state.day.PlanWeight
      //     state.option.series[1]=state.day.Weight
      //   })
      // }
      // }, 60000);
				
		});
    return {
      ...toRefs(state)
    };
  },
};
</script>

<style lang="less">
.scroll-board {
  //position: relative;
  padding: 8px;
  box-sizing: border-box;
  height: 100%;
  //top:-50px;

  .chart-name {
    // position: absolute;
    margin-left: 10px;
    text-align: left;
    font-size: 18px;
  }
}
</style>
