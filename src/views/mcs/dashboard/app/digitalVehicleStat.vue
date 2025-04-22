<template>
  <div id="vehicle-board">
    <div class="vehicle-board-title">车辆状态统计</div>
    <div class="vehicle-board-container" style="background-image:url('./img/bg_panel.png');">
      <el-row :gutter="10">
        <el-col :span="12" >
          <div style="width:120px;margin:50px 0px 0px 130px;">
            <dv-button border="Border1" color="#4c8045" >共 <span style="color:white;font-size:18px;">{{statData.VehicleCount}}</span> 辆</dv-button>
          </div>
         
        </el-col>
        <el-col :span="12">
          <div style="width:120px;margin:50px 50px 0px 50px;">
            <dv-button border="Border1" color="#c8161d" >出 <span style="color:white;font-size:18px;">{{statData.VehicleRunningCount}}</span> 辆</dv-button>
          </div>
          
        </el-col>
        <el-col :span="12">
          <div style="width:120px;margin:50px 0px 0px 130px;">
            <dv-button border="Border1" color="#a6559d" >停 <span style="color:white;font-size:18px;">{{statData.VehicleStopCount}}</span> 辆</dv-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="width:120px;margin:50px 50px 0px 50px;">
            <dv-button border="Border1" color="#e18a3b" >临 <span style="color:white;font-size:18px;">{{statData.VehicleTempCount}}</span> 辆</dv-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
export default {
  setup() {
    const { proxy } = getCurrentInstance() as any;
    let state = reactive({
      statData:{
        DateTitle:'',
        VehicleCount:0,
        VehicleRunningCount:0,
        VehicleStopCount:0,
        VehicleTempCount:0,
        FixedCompanyStatList:[],
        TempCompanyStatList:[]
      }
    })

    //挂载
    onMounted(async () => {
      const res = await proxy.$api.erp.waybill.getDashboardWeightStatByScope(0, 0);
      if(res.errcode==0){
        state.statData=res.data;
      }		
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getDashboardWeightStatByScope(0, 0);
        if(res.errcode==0){
          state.statData=res.data;
        }		
      }, 60000);
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>
 
<style lang='scss'>
#vehicle-board{
    box-shadow: 0 0 3px blue;
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, 0.5);
    box-sizing: border-box;
    
  .vehicle-board-title{
    margin-top:10px;
    height: 40px;
    font-family: 'LiSu';
    font-weight: bold;
    text-align: center;
    font-size: 18px;
  }
  .vehicle-board-container {
    width: 100%;
    height:228px;
    margin-bottom:10px;
    margin-left:4px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
}
</style>