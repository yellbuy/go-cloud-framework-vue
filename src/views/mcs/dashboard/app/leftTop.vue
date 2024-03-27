<template>
  <div id="leftTop">
    <div>
      <p>
        <span style="color:white;font-size: 16pt;margin-right: 16px;">{{statData.DateTitle}}运量情况</span> 
        共<span style="color:lightblue;font-size: 12pt;margin-left:4px;margin-right:4px">{{statData.VechileCount}}</span>
        出<span style="color:lightgreen;font-size: 12pt;margin-left:4px;margin-right:4px">{{statData.VechileRunningCount}}</span>
        停<span style="color:lightsalmon;font-size: 12pt;margin-left:4px">{{statData.VechileStopCount}}</span>
      </p>
    </div>
    <div style="margin-top:12px">
      <span style="color:lightgray;font-size: 14pt;margin-right: 4px;">主要业务完成情况</span>
    </div>
    <table style="width:100%">
      <tr v-for="(val,index) in statData.FixedCompanyStatList" :key="index">
        <td style="width:25% !important">{{val.CompanyName}}</td>
        <td style="width:75% !important;color:#e1f3d8">
          <marquee class="pt5">{{val.ComanyStat}}</marquee>
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
    </table>
    <div style="margin-top:12px">
      <p>
        <span style="color:white;font-size: 16pt;margin-right: 16px;">{{statData.DateTitle}}临配用车情况</span> 
        共<span style="color:lightblue;font-size: 12pt;margin-left:4px;margin-right:4px">{{statData.VechileTempCount}}</span>
      </p>
    </div>
    <div style="margin-top:12px">
      <span style="color:lightgray;font-size: 14pt;margin-right: 4px;">临配业务完成情况</span>
    </div>
    <table style="width:100%">
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
        VechileCount:0,
        VechileRunningCount:0,
        VechileStopCount:0,
        VechileTempCount:0,
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

</style>
