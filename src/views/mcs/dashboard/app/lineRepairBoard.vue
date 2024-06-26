<template>
  <div class="line-energy-board">
    <div class="chart-name">
      <div style="font-family: 'LiSu';font-size: 24px;">物耗分析 </div>
      <div>
        <dv-button @click="onChangeInvertal" border="Border1" color="#f3d19e" font-color="#e18a3b" style="z-index: 999999;text-decoration:underline">{{getModeName}}</dv-button>
      </div>
    </div>
    <dv-charts :option="option" class="line-energy-board-chart"/>
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
      projectData:{},
      goodsData:{},
      option:{
        legend: {
          data: [
            {
              name: "项目（元）",
              color: "rgba(251, 114, 147, 1)",
            },
            {
              name: "配件（元）",
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
            name: "项目（元）",
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
            name: "配件（元）",
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
            state.option.xAxis.data=state.projectData.day.Name||[]
            state.option.series[0].data=state.projectData.day.Amount||[]
            state.option.series[1].data=state.goodsData.day.Amount||[]
        }
        else if(state.timeMode=="month") {
            state.option.xAxis.data=state.projectData.month.Name||[]
            state.option.series[0].data=state.projectData.month.Amount||[]
            state.option.series[1].data=state.goodsData.month.Amount||[]
        }
        else if(state.timeMode=="year") {
            state.option.xAxis.data=state.projectData.year.Name||[]
            state.option.series[0].data=state.projectData.year.Amount||[]
            state.option.series[1].data=state.goodsData.year.Amount||[]
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
      const resProject = await proxy.$api.erp.vehicleproject.getTimeStatListByScope("repair", 0, 0);
      if(resProject.errcode==0){
        console.log("res.data:",resProject.data)
        state.projectData=resProject.data;
      }		
      const resGoods = await proxy.$api.erp.vehiclegoods.getTimeStatListByScope("repair", 0, 0);
      if(resGoods.errcode==0){
        console.log("res.data:",resGoods.data)
        state.goodsData=resGoods.data;
      }		
      setData();		
      setInterval(async () => {
        const resProject = await proxy.$api.erp.vehicleproject.getTimeStatListByScope("repair", 0, 0);
        if(resProject.errcode==0){
          console.log("res.data:",resProject.data)
          state.projectData=resProject.data;
        }	
        const resGoods = await proxy.$api.erp.vehiclegoods.getTimeStatListByScope("repair", 0, 0);
        if(resGoods.errcode==0){
          console.log("res.data:",resGoods.data)
          state.goodsData=resGoods.data;
        }			
        setData();	
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
.line-energy-board {
  //position: relative;
  margin-top:1vh;
  padding: 0 2vh 0 1vh;
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
  .line-energy-board-chart{
    width: 100%; 
    //height:240px;
    height:40vh;
    //height:calc(~"70vh - 420px") !important;
    margin-top:-5vh;
  }
}
</style>
