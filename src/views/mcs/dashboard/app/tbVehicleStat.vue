<template>
  <div id="tbVehicleStat">
    <table class="tbVehicleStat-table">
      <tr>
        <td class="td-left">
          自有车 <span class="td-value">355</span> 辆<br/>
          当日已出车 <span class="td-value">39</span>台<br/>
          停驶 <span class="td-value">9</span> 台
        </td>
        <td class="td-right">
          外租车 <span class="td-value">2189</span> 台<br/>
          今日调派 <span class="td-value">210</span> 台
        </td>
      </tr>
      <tr>
        <td class="td-left">
          自有货车 <span class="td-value">355</span> 辆<br/>
          当日已出车 <span class="td-value">39</span>台<br/>
          停驶 <span class="td-value">9</span> 台
        </td>
        <td class="td-right">
          自有乘用车 <span class="td-value">355</span> 辆<br/>
          当日已出车 <span class="td-value">39</span>台<br/>
          停驶 <span class="td-value">9</span> 台
        </td>
      </tr>
      <tr>
        <td class="td-left">
          工程机械车 <span class="td-value">355</span> 辆<br/>
          当日已出车 <span class="td-value">39</span>台<br/>
          停驶 <span class="td-value">9</span> 台
        </td>
        <td class="td-right">
          搅拌罐车 <span class="td-value">32</span> 辆<br/>
          当日已出车 <span class="td-value">16</span>台<br/>
          停驶 <span class="td-value">16</span> 台
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

      },
			list:{
      }
		});
		
		
		// 页面加载时
		onMounted(async () => {
      // const res = await proxy.$api.erp.VehicleLine.getTotalStat('oil',0, 0,{timeMode:timeMode});
      // if(res.errcode==0){
      //   state.stat=res.data;
      // }		
      // const resList = await proxy.$api.erp.WaybillLine.getStatListForCompany('oil',0, 0,{limit:6,timeMode:timeMode});
      // if(resList.errcode==0){
      //   state.list=resList.data;
      // }		
      // setInterval(async () => {
      //   const res = await proxy.$api.erp.WaybillLine.getTotalStat('oil',0, 0,{timeMode:timeMode});
      //   if(res.errcode==0){
      //     state.stat=res.data;
      //   }		
      //   const resList = await proxy.$api.erp.WaybillLine.getStatListForCompany('oil',0, 0,{limit:6,timeMode:timeMode});
      //   if(resList.errcode==0){
      //     state.list=resList.data;
      //   }		
      // }, 60000);
				
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
