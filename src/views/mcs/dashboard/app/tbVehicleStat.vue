<template>
  <div id="tbVehicleStat">
    <table class="tbVehicleStat-table">
      <tr>
        <td class="td-left">
          自有车 <span class="td-value">{{stat.InternalCount}}</span> 辆<br/>
          当日已出车 <span class="td-value">{{stat.InternalRunningCount}}</span>台<br/>
          停驶 <span class="td-value">{{stat.InternalStopCount}}</span> 台
        </td>
        <td class="td-right">
          外租车 <span class="td-value">{{stat.ExternalCount}}</span> 台<br/>
          今日调派 <span class="td-value">{{stat.ExternalRunningCount}}</span> 台
        </td>
      </tr>
      <tr>
        <td class="td-left">
          自有货车 <span class="td-value">{{stat.InternalTruckCount}}</span> 辆<br/>
          当日已出车 <span class="td-value">{{stat.InternalTruckRunningCount}}</span>台<br/>
          停驶 <span class="td-value">{{stat.InternalTruckStopCount}}</span> 台
        </td>
        <td class="td-right">
          自有乘用车 <span class="td-value">{{stat.InternalBusCount}}</span> 辆<br/>
          当日已出车 <span class="td-value">{{stat.InternalBusRunningCount}}</span>台<br/>
          停驶 <span class="td-value">{{stat.InternalBusStopCount}}</span> 台
        </td>
      </tr>
      <tr>
        <td class="td-left">
          工程机械车 <span class="td-value">{{stat.MachineCount}}</span> 辆<br/>
          当日已出车 <span class="td-value">{{stat.MachineRunningCount}}</span>台<br/>
          停驶 <span class="td-value">{{stat.MachineStopCount}}</span> 台
        </td>
        <td class="td-right">
          搅拌罐车 <span class="td-value">{{stat.SpecialCount}}</span> 辆<br/>
          当日已出车 <span class="td-value">{{stat.SpecialRunningCount}}</span>台<br/>
          停驶 <span class="td-value">{{stat.SpecialStopCount}}</span> 台
        </td>
      </tr>
    </table>

  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
	name: 'dashboardLeftTop',
	components: {  },
  props:{
		timeMode:{
			default:1
		},

	},
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
    const timeMode=props.timeMode || 1;
		const state = reactive({
      stat:{

      }
		});
		
		
		// 页面加载时
		onMounted(async () => {
      const res = await proxy.$api.erp.vehicle.getStateStat('info',0, 0);
      if(res.errcode==0){
        state.stat=res.data;
      }			
      setInterval(async () => {
        const res = await proxy.$api.erp.vehicle.getStateStat('info',0, 0);
        if(res.errcode==0){
          state.stat=res.data;
        }		
      }, 60000);
				
		});
		return {
			t,
			...toRefs(state),
		};
	},
};
</script>

<style lang="less">
#tbVehicleStat{
  text-align: left;
  padding:2vh;

  .tbVehicleStat-title{
    font-family: 'LiSu';
    color:white;
    font-size: 18pt;
    margin-right: 12px;
  }
  .tbVehicleStat-sub-title{
    font-family: 'LiSu';
    color:lightgray;
    font-size: 16pt;
    margin-right: 4px;
  }
  .tbVehicleStat-table{
    width:100%;
    margin-top:1vh;
    border-collapse:collapse;
    td {
      border: 1px solid grey;
      padding: 0.5vh 4px;
    }
    td.td-left {
      text-align: center;
      width:50%;
      padding: 0.5vh 4px;
    }
    td.td-right {
      width:50%;
      text-align: center;
      padding: 0.5vh 4px;
    }
    .td-value {
      font-size:18px;
      margin-left:2px;
      margin-right: 2px;
      font-weight:200;
      color:yellow; 
    }
  }
}
</style>
