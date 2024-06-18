<template>
  <div id="centerBottom">
    <div class="mainbusiness-digital-container">
        <div class="digital-title">年运量（铁路）</div>
        <div class="flex-row">
            <div class="digital-flop-item">
              <div class="unit">计划</div>
              <dv-digital-flop class="digital-flop-item-value"
                :config="{number:[statData.YearPlanWeight],content: '{nt} 万吨',style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
              />
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成</div>
              <dv-digital-flop class="digital-flop-item-value"
                :config="{number:[statData.YearExecWeight],content: '{nt} 万吨',style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
              />
            </div>
            <div class="digital-flop-item">
              <div class="unit">超/欠</div>
              <dv-digital-flop class="digital-flop-item-value"
                :config="{number:[statData.YearBalanceWeight],content: '{nt} 万吨',style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
              />
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成情况</div>
              <dv-percent-pond class="digital-flop-item-progress" :config="{value: statData.YearPercent,localGradient:true,colors: ['#01c4f9', '#c135ff'],lineDash: [5, 1]}" />
              <!-- <dv-water-level-pond class="digital-flop-item-progress" :config="{ data: [statData.MonthPercent], shape: 'round', waveHeight: 5, waveNum: 5}" /> -->
              
            </div>
          </div>
          <!-- <Decoration2 style="width:200px; height:5px;" /> -->
      </div>
      <div class="mainbusiness-digital-container">
        <div class="digital-title">月运量（铁路）</div>
        <div class="flex-row">
            <div class="digital-flop-item">
              <div class="unit">计划</div>
              <dv-digital-flop class="digital-flop-item-value"
                :config="{number:[statData.MonthPlanWeight],content: '{nt} 万吨',style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
              />
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成</div>
              <dv-digital-flop class="digital-flop-item-value"
                :config="{number:[statData.MonthExecWeight],content: '{nt} 万吨',style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
              />
            </div>
            <div class="digital-flop-item">
              <div class="unit">超/欠</div>
              <dv-digital-flop class="digital-flop-item-value"
                :config="{number:[statData.MonthBalanceWeight],content: '{nt} 万吨',style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
              />
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成情况</div>
              <dv-percent-pond class="digital-flop-item-progress" :config="{value: statData.MonthPercent,localGradient:true,colors: ['#01c4f9', '#c135ff'],lineDash: [5, 1]}" />
              <!-- <dv-water-level-pond class="digital-flop-item-progress" :config="{ data: [statData.MonthPercent], shape: 'round', waveHeight: 5, waveNum: 5}" /> -->
              
            </div>
          </div>
          <!-- <Decoration2 style="width:200px; height:5px;" /> -->
      </div>
      <div class="mainbusiness-digital-container">
        <div class="digital-title">日运量（铁路）</div>
        <div class="flex-row">
            <div class="digital-flop-item">
              <div class="unit">计划</div>
              <dv-digital-flop class="digital-flop-item-value"
                :config="{number:[statData.DayPlanWeight],content: '{nt} 万吨',style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
              />
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成</div>
              <dv-digital-flop class="digital-flop-item-value"
                :config="{number:[statData.DayExecWeight],content: '{nt} 万吨',style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
              />
            </div>
            <div class="digital-flop-item">
              <div class="unit">超/欠</div>
              <dv-digital-flop class="digital-flop-item-value"
                :config="{number:[statData.DayExecWeight],content: '{nt} 万吨',style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
              />
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成情况</div>
              <dv-percent-pond class="digital-flop-item-progress" :config="{value: statData.DayPercent,localGradient:true,colors: ['#01c4f9', '#c135ff'],lineDash: [5, 1]}" />
              <!-- <dv-water-level-pond class="digital-flop-item-progress" :config="{ data: [statData.MonthPercent], shape: 'round', waveHeight: 5, waveNum: 5}" /> -->
              
            </div>
          </div>
          <!-- <Decoration2 style="width:200px; height:5px;" /> -->
      </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
	name: 'dashboardCenterTop',
	components: {  },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			statData:{
        YearPlanWeight :0, //年计划量
        YearExecWeight:0, //年已执行量
        YearBalanceWeight:0, //年运量差额
        YearBalanceWeightString:"0",  //年运量差额
        YearPercent:0, //年计划百分比
        MonthPlanWeight:0, //月计划量
        MonthExecWeight:0, //月已执行量
        MonthBalanceWeight:0, //月运量差额
        MonthBalanceWeightString:"0",  //月运量差额
        MonthPercent:0, //月计划百分比
        DayPlanWeight:0,//日计划量
        DayExecWeight:0, //日已执行量
        DayBalanceWeight:0, //日运量差额
        DayBalanceWeightString:"0",  //日运量差额
        DayPercent:0, //日计划百分比
      }
		});
		
		
		// 页面加载时
		onMounted(async () => {
      const res = await proxy.$api.erp.businessBillLine.getDashboardPlanStatByScope("main_business",0, 0);
      if(res.errcode==0){
        state.statData=res.data;
      }		
      setInterval(async () => {
        const res = await proxy.$api.erp.businessBillLine.getDashboardPlanStatByScope("main_business",0, 0);
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

<style lang="less" scoped>
  #centerBottom{
    margin-top:3vh;
  }
  .dv-percent-pond text{
    font-size: 18px !important;
  }
  .mainbusiness-digital-container {
    margin:2vh 2vh -1vh;
    background-color: rgba(6, 30, 93, 0.5);

    .dv-decoration-2 {
      position: absolute;
      width: 95%;
      left: 2.5%;
      height: 1vh;
      bottom: 0px;
    }

    .flex-row {
      display: flex;
      flex-direction: row;
      align-content: center;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    .digital-flop-item {
      width: 25%;
      padding:1vh;
      text-align: center;
      flex-direction: column;
      border-left: 3px solid rgb(6, 30, 93);
      border-right: 3px solid rgb(6, 30, 93);
      .digital-flop-item-value {
        width:100%;
        height:4vh;
      }
      .digital-flop-item-progress{
        width:90%;
        height:4vh;
        font-size:14pt;
        margin:auto;
      }
      
    }

    
  }
  .digital-title {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      font-size:18pt;
      font-family: 'LiSu';
      text-align: center;
      padding-top:10px;
      margin-bottom: 0px;
    }

  .unit {
    margin-left: 10px;
    box-sizing: border-box;
    padding-bottom: 8px;
  }
</style>
