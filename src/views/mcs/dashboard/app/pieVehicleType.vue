<template>
  <div id="pie-board">
    <div class="pie-board-title">车型占比统计</div>
    <div ref="echart" class="echartDiv"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const { proxy } = getCurrentInstance() as any;
    let state = reactive({
      data: [],
      echart: ref(),
    })
    let myChart:any
    const echartInit = () => {
      myChart = echarts.init(state.echart, 'dark')
      // 指定图表的配置项和数据
      var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // legend: {
      //   left: 'center',
      //   top: 'bottom',
      //   data: [
      //     '四桥货车',
      //     '六桥货车',
      //     'rose3',
      //     'rose4',
      //     'rose5',
      //     'rose6',
      //     'rose7',
      //     'rose8'
      //   ]
      // },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: false, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: false }
        }
      },
      series: [
        {
          name: '车型',
          type: 'pie',
          radius: [20, 70],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: state.data
        }
      ]
    };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }

    //挂载
    onMounted(async () => {

      const res = await proxy.$api.erp.vehicle.getVehicleTypeStat("info",0, 0,{limit:10});
      if(res.errcode==0){
        state.data=res.data.map((val:any)=>{return {value:val.VehicleCount,name:val.Name}});
        echartInit();
      }	
      setInterval(async () => {
        const res = await proxy.$api.erp.vehicle.getVehicleTypeStat("info",0, 0,{limit:10});
        if(res.errcode==0){
          state.data=res.data.map((val:any)=>{return {value:val.VehicleCount,name:val.Name}});
          echartInit();
        }	
      }, 5000);
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
  height: 240px;
}
#pie-board {
  width: 100%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  box-sizing: border-box;
  margin-bottom: 20px;

  .pie-board-title {
    height: 40px;
    display: flex;
    font-family: 'LiSu';
    align-items: center;
    font-size: 18px;
    margin-left:20px;
  }
}
</style>