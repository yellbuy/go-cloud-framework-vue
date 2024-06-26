<template>
  <div class="warehouse-scroll-board">
    <div class="chart-name">
      <div>仓储业务分析 </div>
      <div>
        <dv-button @click="onChangeInvertal" border="Border1" color="#f3d19e" font-color="#e18a3b" style="z-index: 999999;text-decoration:underline">{{getModeName}}</dv-button>
      </div>
    </div>
    <dv-charts :option="option" style="width: 100%; margin-top:-6vh" :style="{height:chartHeight+'vh'}"/>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
export default {
  name: "warehouseTimeStat",
  props: {
		chartHeight: {
			type: Number,
			default: () => 22,
		},
	},
   setup(props, { emit }) {
    const { proxy } = getCurrentInstance() as any;
    // const res = proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
    // console.log("res：",res)
    const state = reactive({
      chartHeight:props.chartHeight||22,
      timeMode:'day',
      data:{},
      option:{
        legend: {
          data: [
            {
              name: "收入",
              color: "#00baff",
            },
            {
              name: "面积",
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
            name: "收入",
            data: [0],
            // data: model.planValueList,
            //data: state[state.timeMode].planValueList,
            type: "bar",
            barStyle: {
              fill: "rgba(0, 186, 255, 0.8)",
            },
          },
          {
            name: "面积",
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
            state.option.series[0].data=state.data.day.Amount||[]
            state.option.series[1].data=state.data.day.Volume||[]
        }
        else if(state.timeMode=="month") {
            state.option.xAxis.data=state.data.month.Name||[]
            state.option.series[0].data=state.data.month.Amount||[]
            state.option.series[1].data=state.data.month.Volume||[]
        }
        else if(state.timeMode=="year") {
            state.option.xAxis.data=state.data.year.Name||[]
            state.option.series[0].data=state.data.year.Amount||[]
            state.option.series[1].data=state.data.year.Volume||[]
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
      
      const res = await proxy.$api.erp.businessBillLine.getTimeStatListByScope("warehouse", 0, 0);
      if(res.errcode==0){
        state.data=res.data;
        setData();
      }		
      setInterval(async () => {
        const res = await proxy.$api.erp.businessBillLine.getTimeStatListByScope("warehouse", 0, 0);
        if(res.errcode==0){
          state.data=res.data;
          setData();
        }
      }, 60000);
      setInterval(async () => {
        onChangeInvertal();
      }, 5000);
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
.warehouse-scroll-board {
  //position: relative;
  padding: 1vh;
  box-sizing: border-box;
  height: 100%;
  //top:-50px;

  .chart-name {
    // position: absolute;
    margin-left: 1vw;
    margin-right: 1vw;
    text-align: left;
    font-size: 18px;
    display: flex;
    justify-content:space-between;
  }
}
</style>
