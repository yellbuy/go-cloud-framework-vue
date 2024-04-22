<template>
  <div>
    <div style="margin:12px">
      <dv-capsule-chart :config="configInternal" style="height:150px" />
    </div>
    <div style="margin:12px">
      <dv-capsule-chart :config="configExternal" style="height:100px" />
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
export default {
  name: "capshuleVehicleInternalStat",
   setup() {
    const { proxy } = getCurrentInstance() as any;
    // const res = proxy.$api.erp.businessBillLine.getTimeStatListByScope("main_business", 0, 0);
    // console.log("res：",res)
    const state = reactive({
      configInternal:{
        data:[
          {name: '自有车', value: 0},{name: '已出车', value: 0},{name: '停驶中', value: 0}
        ],
        colors: ['#32c5e9', '#96bfff','#e062ae', '#fb7293', '#e690d1'],
        unit: '辆',
        showValue: true
      },
      configExternal:{
        data:[
          {name: '外租车', value: 0},{name: '今日调配', value: 0}
        ],
        colors: ['#fb7293', '#e690d1'],
        unit: '辆',
        showValue: true
      }
      });
    
    // 页面加载时
		onMounted(async () => {
      
      const res = await proxy.$api.erp.vehicle.getCountStat("info", 0, 0);
      if(res.errcode==0){
        state.configInternal.data[0].value=res.data.VechileCount;
        state.configInternal.data[1].value=res.data.VechileRunningCount;
        state.configInternal.data[2].value=res.data.VechileStopCount;
      }		
      setInterval(async () => {
        const res = await proxy.$api.erp.vehicle.getCountStat("info", 0, 0);
        if(res.errcode==0){
          state.configExternal.data[0].value=res.data.VechileExternalCount; //外部车总数
          state.configExternal.data[1].value=res.data.VechileTempCount; //临配车出车数
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
    display: flex;
    justify-content:space-between;
  }
}
</style>
