<template>
  <div id="tbEnergyBillStat">
    <div>
      <p>
        <span class="tbEnergyBillStat-title">公司{{timeMode==7?'年度':'月度'}}油耗情况</span>
      </p>
    </div>
    <table class="tbEnergyBillStat-table">
      <tr>
        <td class="td-left" >{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 0 && statData.FixedCompanyStatList[0].CompanyName || "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 0 && statData.FixedCompanyStatList[0].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" colspan="2">分公司油耗情况</td>
      </tr>
      <tr>
        <td class="td-left" >{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 1 && statData.FixedCompanyStatList[1].CompanyName|| "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 1 && statData.FixedCompanyStatList[1].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 2 && statData.FixedCompanyStatList[2].CompanyName|| "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 2 && statData.FixedCompanyStatList[2].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 3 && statData.FixedCompanyStatList[3].CompanyName || "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 3 && statData.FixedCompanyStatList[3].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 4 && statData.FixedCompanyStatList[4].CompanyName || "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 4 && statData.FixedCompanyStatList[4].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 5 && statData.FixedCompanyStatList[5].CompanyName || "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 5 && statData.FixedCompanyStatList[5].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
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
			statData:{
        DateTitle:'',
        VehicleCount:0,
        VehicleRunningCount:0,
        VehicleStopCount:0,
        VehicleTempCount:0,
        FixedCompanyStatList:[],
        TempCompanyStatList:[]
      }
		});
		
		
		// 页面加载时
		onMounted(async () => {
      const res = await proxy.$api.erp.waybill.getDashboardWeightStatByScope(0, 0,{mode:1,timeMode:timeMode});
      if(res.errcode==0){
        state.statData=res.data;
      }		
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getDashboardWeightStatByScope(0, 0,{mode:1,timeMode:timeMode});
        if(res.errcode==0){
          state.statData=res.data;
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
#tbEnergyBillStat{
  text-align: left;
  padding:20px;

  .tbEnergyBillStat-title{
    font-family: 'LiSu';
    color:white;
    font-size: 18pt;
    margin-right: 12px;
  }
  .tbEnergyBillStat-sub-title{
    font-family: 'LiSu';
    color:lightgray;
    font-size: 16pt;
    margin-right: 4px;
  }
  .tbEnergyBillStat-table{
    width:100%;
    margin-top:6px;
    border-collapse:collapse;
    td {
      border: 1px solid grey;
      padding: 0px 4px;
    }
    td.td-left {
      width:50%;
      padding: 3px 4px;
    }
    td.td-right {
      width:50%;
      color:yellow
    }
  }
}
</style>
