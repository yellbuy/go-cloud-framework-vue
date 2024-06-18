<template>
  <div id="tbWaybillStat">
    <div>
      <p>
        <span class="tbWaybillStat-title">{{statData.DateTitle}}生产完成情况</span> 
        共<span style="color:lightblue;font-size: 16pt;margin-left:4px;margin-right:4px">{{statData.VehicleCount}}</span>
        出<span style="color:lightgreen;font-size: 16pt;margin-left:4px;margin-right:4px">{{statData.VehicleRunningCount}}</span>
        停<span style="color:lightsalmon;font-size: 16pt;margin-left:4px">{{statData.VehicleStopCount}}</span>
      </p>
    </div>
    <div style="margin-top:4px">
      <span class="tbWaybillStat-sub-title">主要业务完成情况</span>
    </div>
    <table class="tbWaybillStat-table">
      <tr>
        <td class="td-left" >{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 0 && statData.FixedCompanyStatList[0].CompanyName || "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.FixedCompanyStatList && statData.FixedCompanyStatList.length > 0 && statData.FixedCompanyStatList[0].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
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
    <div style="margin-top:8px">
      <p>
        <span class="tbWaybillStat-title">{{statData.DateTitle}}临配用车情况</span> 
        共<span style="color:lightblue;font-size: 16pt;margin-left:4px;margin-right:4px">{{statData.VehicleTempCount}}</span>
      </p>
    </div>
    <div style="margin-top:4px">
      <span class="tbWaybillStat-sub-title">临配用车情况</span>
    </div>
    <table class="tbWaybillStat-table">
      <tr>
        <td class="td-left" >{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 0 && statData.TempCompanyStatList[0].CompanyName || "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 0 && statData.TempCompanyStatList[0].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 1 && statData.TempCompanyStatList[1].CompanyName|| "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 1 && statData.TempCompanyStatList[1].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 2 && statData.TempCompanyStatList[2].CompanyName|| "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 2 && statData.TempCompanyStatList[2].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 3 && statData.TempCompanyStatList[3].CompanyName || "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 3 && statData.TempCompanyStatList[3].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 4 && statData.TempCompanyStatList[4].CompanyName || "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 4 && statData.TempCompanyStatList[4].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 5 && statData.TempCompanyStatList[5].CompanyName || "-"}}</td>
        <td class="td-right">
          <marquee class="pt5">{{statData.TempCompanyStatList && statData.TempCompanyStatList.length > 5 && statData.TempCompanyStatList[5].ComanyStat || ""}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
    </table>

    <table style="width:100%">
      <tr v-for="(val,index) in statData.TempCompanyStatList" :key="index">
        <td style="width:25% !important">{{val.CompanyName}}</td>
        <td style="width:75% !important;color:#e1f3d8">
          <marquee class="pt5">{{val.ComanyStat}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr v-for="(val,index) in statData.TempCompanyStatList" :key="index">
        <td style="width:25% !important">{{val.CompanyName}}</td>
        <td style="width:75% !important;color:#e1f3d8">
          <marquee class="pt5">{{val.ComanyStat}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr v-for="(val,index) in statData.TempCompanyStatList" :key="index">
        <td style="width:25% !important">{{val.CompanyName}}</td>
        <td style="width:75% !important;color:#e1f3d8">
          <marquee class="pt5">{{val.ComanyStat}}</marquee>
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
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
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
				
		});
		return {
			t,
			...toRefs(state),
		};
	},
};
</script>

<style lang="less">
#tbWaybillStat{
  text-align: left;
  padding:20px;

  .tbWaybillStat-title{
    font-family: 'LiSu';
    color:white;
    font-size: 20pt;
    margin-right: 16px;
  }
  .tbWaybillStat-sub-title{
    font-family: 'LiSu';
    color:lightgray;
    font-size: 16pt;
    margin-right: 4px;
  }
  .tbWaybillStat-table{
    width:100%;
    margin-top:6px;
    border-collapse:collapse;
    td {
      border: 1px solid grey;
      padding: 0px 4px;
    }
    td.td-left {
      width:33%;
      padding: 3px 4px;
    }
    td.td-right {
      width:67%;
      color:yellow
    }
  }
}
</style>
