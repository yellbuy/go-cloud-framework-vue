<template>
  <div class="waybill-scroll-board">
    <div class="chart-name">
      <div>运量分析 </div>
      <div>
        <dv-button @click="onChangeInvertal" border="Border1" color="#f3d19e" font-color="#e18a3b" style="z-index: 999999;text-decoration:underline">{{getModeName}}</dv-button>
      </div>
    </div>
    <dv-charts :option="option" style="width: 100%; height:210px;margin-top:-6vh"/>
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
      data:{},
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
    const setData=()=>{
      if(state.timeMode=="day") {
            state.option.xAxis.data=state.data.day.Name||[]
            state.option.series[0].data=state.data.day.PlanWeight||[]
            state.option.series[1].data=state.data.day.Weight||[]
        }
        else if(state.timeMode=="month") {
            state.option.xAxis.data=state.data.month.Name||[]
            state.option.series[0].data=state.data.month.PlanWeight||[]
            state.option.series[1].data=state.data.month.Weight||[]
        }
        else if(state.timeMode=="year") {
            state.option.xAxis.data=state.data.year.Name||[]
            state.option.series[0].data=state.data.year.PlanWeight||[]
            state.option.series[1].data=state.data.year.Weight||[]
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
      
      const res = await proxy.$api.erp.waybill.getTimeStatListByScope("freight", 0, 0);
      if(res.errcode==0){
        state.data=res.data;
        setData();
      }		
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getTimeStatListByScope("freight", 0, 0);
        if(res.errcode==0){
          state.data=res.data;
          setData();
        }
      }, 60000);
      setInterval(async () => {
        onChangeInvertal();
      }, 10000);
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
.waybill-scroll-board {
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
    display: flex;
    justify-content:space-between;
  }
}
</style>
