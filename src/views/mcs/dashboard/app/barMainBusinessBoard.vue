<template>
  <div class="scroll-board">
    <div class="chart-name">
      铁运业务分析
    </div>
    <dv-charts :option="option" style="width: 100%; height:240px;margin-top:-40px"/>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
export default {
  name: "mainBusinessTimeStat",
   setup() {
    const { proxy } = getCurrentInstance() as any;
    // const res = proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
    // console.log("res：",res)
    const state = reactive({
      timeMode:'day',
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
            data: [0],
            // data: model.planValueList,
            //data: state[state.timeMode].planValueList,
            type: "bar",
            barStyle: {
              fill: "rgba(0, 186, 255, 0.8)",
            },
          },
          {
            name: "完成量",
           data:  [0],
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
        ],
      }
		});
    const setData=(data:never[])=>{
      const list=[];
      data.forEach(v=>{
        list.push(v?v:0)
      })
      console.log("list:",list)
      return list
    }
    // 页面加载时
		onMounted(async () => {
      
      const res = await proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
      if(res.errcode==0){
        if(state.timeMode=="day") {
            state.option.xAxis.data=res.data.day.Name||[]
            state.option.series[0].data=res.data.day.PlanWeight||[]
            state.option.series[1].data=res.data.day.Weight||[]
        }
        
      }		
      setInterval(async () => {
        const res = await proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
        if(res.errcode==0){
            state.option.xAxis.data=res.data.day.Name||[]
            state.option.series[0].data=res.data.day.PlanWeight||[]
            state.option.series[1].data=res.data.day.Weight||[]
        }
      }, 60000);
				
		});
    return {
      ...toRefs(state)
    }
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
