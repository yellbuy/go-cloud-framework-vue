<template>
  <div id="tbEnergyBillStat">
    <div>
      <p>
        <span class="tbEnergyBillStat-title">公司{{timeMode==7?'年度':'月度'}}油耗情况</span>
      </p>
    </div>
    <table class="tbEnergyBillStat-table">
      <tr>
        <td class="td-left">{{timeMode==7?'年度':'月度'}}合计</td>
        <td class="td-right">
          油耗金额：{{stat.Amount}} 元 | 油耗总量：{{stat.Volume}} 升
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
      </tr>
      <tr>
        <td class="td-left" colspan="2">分公司油耗情况</td>
      </tr>
      <tr>
        <td class="td-left" >{{list && list.length > 0 && list[0].CompanyName|| "-"}}</td>
        <td class="td-right" v-if="list && list.length > 0">
          油耗合计：{{list[0].Volume}} 升 | 百公里油耗：{{list[0].ConsumptionRate.toFixed(1)}} 升
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
        <td class="td-right" v-else>
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{list && list.length > 1 && list[1].CompanyName|| "-"}}</td>
        <td class="td-right" v-if="list && list.length > 1">
          油耗合计：{{list[1].Volume}} 升 | 百公里油耗：{{list[1].ConsumptionRate.toFixed(1)}} 升
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
        <td class="td-right" v-else>
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{list && list.length > 2 && list[2].CompanyName|| "-"}}</td>
        <td class="td-right" v-if="list && list.length > 2">
          油耗合计：{{list[2].Volume}} 升 | 百公里油耗：{{list[2].ConsumptionRate.toFixed(1)}} 升
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
        <td class="td-right" v-else>
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{list && list.length > 3 && list[3].CompanyName|| "-"}}</td>
        <td class="td-right" v-if="list && list.length > 3">
          油耗合计：{{list[3].Volume}} 升 | 百公里油耗：{{list[3].ConsumptionRate.toFixed(1)}} 升
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
        <td class="td-right" v-else>
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{list && list.length > 4 && list[4].CompanyName|| "-"}}</td>
        <td class="td-right" v-if="list && list.length > 4">
          油耗合计：{{list[4].Volume}} 升 | 百公里油耗：{{list[4].ConsumptionRate.toFixed(1)}} 升
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
        <td class="td-right" v-else>
        </td>
      </tr>
      <tr>
        <td class="td-left" >{{list && list.length > 5 && list[5].CompanyName|| "-"}}</td>
        <td class="td-right" v-if="list && list.length > 5">
          油耗合计：{{list[5].Volume}} 升 | 百公里油耗：{{list[5].ConsumptionRate.toFixed(1)}} 升
          <!-- <div class="marquee-text">渣钢渣铁 900 吨；瑞钢钢坯 1200 吨</div> -->
          <!-- <dv-scroll-board :config="{ rowNum:1,waitTime:5000,oddRowBGC:'#030409',evenRowBGC:'#030409',data: [['渣钢渣铁 900 吨'], ['瑞钢钢坯 1200 吨']] }" style="height:24px;font-size: 10pt;" /> -->
        </td>
        <td class="td-right" v-else>
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
      const res = await proxy.$api.erp.energyBillLine.getTotalStat('oil',0, 0,{timeMode:timeMode});
      if(res.errcode==0){
        state.stat=res.data;
      }		
      const resList = await proxy.$api.erp.energyBillLine.getStatListForCompany('oil',0, 0,{limit:6,timeMode:timeMode});
      if(resList.errcode==0){
        state.list=resList.data;
      }		
      setInterval(async () => {
        const res = await proxy.$api.erp.energyBillLine.getTotalStat('oil',0, 0,{timeMode:timeMode});
        if(res.errcode==0){
          state.stat=res.data;
        }		
        const resList = await proxy.$api.erp.energyBillLine.getStatListForCompany('oil',0, 0,{limit:6,timeMode:timeMode});
        if(resList.errcode==0){
          state.list=resList.data;
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
  padding:2vh;

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
    margin-top:1vh;
    border-collapse:collapse;
    td {
      border: 1px solid grey;
      padding: 0.5vh 4px;
    }
    td.td-left {
      width:34%;
      padding: 0.5vh 4px;
    }
    td.td-right {
      width:67%;
      padding: 0.5vh 4px;
      color:yellow
    }
  }
}
</style>
