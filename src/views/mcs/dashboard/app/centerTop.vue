<template>
  <div id="centerTop">
    <div class="digital-container">
        <div class="digital-title">年运量（公路）</div>
        <div class="flex-row">
            <div class="digital-flop-item">
              <div class="unit">计划</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.YearPlanWeight],style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.YearExecWeight],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>
            <div class="digital-flop-item">
              <div class="unit">超/欠</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.YearBalanceWeight],style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>
          
            <div class="digital-flop-item">
              <div class="unit">完成情况</div>
              <dv-water-level-pond class="digital-flop-item-round" :config="{ data: [statData.YearPercent], shape: 'round', waveHeight: 5, waveNum: 5}" />
            </div>
          </div>
          <!-- <Decoration2 style="width:200px; height:5px;" /> -->
        <dv-decoration-2 />
      </div>
      <div class="digital-container">
        <div class="digital-title">月运量（公路）</div>
        <div class="flex-row">
            <div class="digital-flop-item">
              <div class="unit">计划</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.MonthPlanWeight],style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.MonthExecWeight],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>
            <div class="digital-flop-item">
              <div class="unit">超/欠</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.MonthBalanceWeight],style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成情况</div>
              <dv-water-level-pond class="digital-flop-item-round" :config="{ data: [statData.MonthPercent], shape: 'round', waveHeight: 5, waveNum: 5}" />
              
            </div>
          </div>
          <!-- <Decoration2 style="width:200px; height:5px;" /> -->
        <dv-decoration-2 />
      </div>
      <div class="digital-container">
        <div class="digital-title">日运量（公路）</div>
        <div class="flex-row">
            <div class="digital-flop-item">
              <div class="unit">计划</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.DayPlanWeight],style:{fill: '#f46827',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.DayExecWeight],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>
            <div class="digital-flop-item">
              <div class="unit">超/欠</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.DayBalanceWeight],style:{fill: 'lightgreen',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>
            <div class="digital-flop-item">
              <div class="unit">完成情况</div>
              <dv-water-level-pond class="digital-flop-item-round" :config="{ data: [statData.DayPercent], shape: 'round', waveHeight: 5, waveNum: 5}" />
            </div>
          </div>
          <!-- <Decoration2 style="width:200px; height:5px;" /> -->
        <dv-decoration-2 />
      </div>
      <!-- <div class="digital-container">
        <div class="flex-row" style="padding-top:6px !important;padding-bottom:6px !important">
          
          
          
          <dv-decoration-2 />
        </div>
      </div> -->
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
      const res = await proxy.$api.erp.waybill.getDashboardPlanStatByScope(0, 0);
      if(res.errcode==0){
        state.statData=res.data;
      }		
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getDashboardPlanStatByScope(0, 0);
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
  .digital-container {
    margin:10px 10px -7px;
    background-color: rgba(6, 30, 93, 0.5);

    .dv-decoration-2 {
      position: absolute;
      width: 95%;
      left: 2.5%;
      height: 5px;
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
      padding:10px;
      text-align: center;
      flex-direction: column;
      border-left: 3px solid rgb(6, 30, 93);
      border-right: 3px solid rgb(6, 30, 93);
      .digital-flop-item-digital {
        width:100%;
        height:24px;
      }
      .digital-flop-item-round{
        width:100px;
        height:80px;
        margin:auto;
      }
    }

    
  }
  .digital-title {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      text-align: center;
      font-size: 20px;
      padding-top:10px;
      margin-bottom: 10px;
    }

  .unit {
    margin-left: 10px;
    box-sizing: border-box;
    padding-bottom: 8px;
  }
</style>
