<template>
  <div id="centerTop">
    <div class="digital-container">
        <div class="digital-title">年 运 力 数 据 汇 总</div>
        <div class="flex-row">
            <div class="digital-flop-item">
              <div class="unit">公路运量</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.WaybillWeight],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>
            <div class="digital-flop-item">
              <div class="unit">公路运单</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.WaybillCount],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">条</div>
            </div> 
            <div class="digital-flop-item">
              <div class="unit">铁路运量</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.MainBusinessWeight],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div> 
            <div class="digital-flop-item">
              <div class="unit">贸易运量</div>
              <dv-digital-flop class="digital-flop-item-digital"
                :config="{number:[statData.TradeWeight],style:{fill: '#e3dc0f',fontWeight: 'bold',fontSize:20}}"
              />
              <div class="unit">吨</div>
            </div>    
                  
          </div>
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
import dayjs from 'dayjs';
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
        WaybillWeight:0, //公路年已执行重量
        WaybillCount:0, //公路年已执行记录
        MainBusinessWeight:0, //铁路年已执行重量
        TradeWeight:0, //贸易年已执行重量
      }
		});
		
		
		// 页面加载时
		onMounted(async () => {
      const res = await proxy.$api.erp.waybill.getDashboardPlanStatByScope(0, 0);
      if(res.errcode==0){
        state.statData.WaybillWeight=res.data.YearExecWeight;
        state.statData.WaybillCount=res.data.YearCount;
      }	
      const now = dayjs();
      const startTime=now.startOf('year').format(); 
      const endTime=now.endOf('year').format(); 
      //铁运年度运量
      const mainBusinessRes = await proxy.$api.erp.businessBill.getWeightStatByScope("main_business", 0, 0,{startTime,endTime});
      if(mainBusinessRes.errcode==0){
        state.statData.MainBusinessWeight=mainBusinessRes.data.Weight;
      }		
      //贸易年度运量
      const tradeRes = await proxy.$api.erp.businessBill.getWeightStatByScope("trade", 0, 0,{startTime,endTime});
      if(tradeRes.errcode==0){
        state.statData.TradeWeight=tradeRes.data.Weight;
      }	
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getDashboardPlanStatByScope(0, 0);
        if(res.errcode==0){
          state.statData.WaybillWeight=res.data.YearExecWeight;
          state.statData.WaybillCount=res.data.YearCount;
        }		
        //铁运年度运量
        const mainBusinessRes = await proxy.$api.erp.businessBill.getWeightStatByScope("main_business", 0, 0,{startTime,endTime});
        if(mainBusinessRes.errcode==0){
          state.statData.MainBusinessWeight=mainBusinessRes.data.Weight;
        }		
        //贸易年度运量
        const tradeRes = await proxy.$api.erp.businessBill.getWeightStatByScope("trade", 0, 0,{startTime,endTime});
        if(tradeRes.errcode==0){
          state.statData.TradeWeight=tradeRes.data.Weight;
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
      .digital-flop-item-progress{
        width:90%;
        height:40px;
        margin:auto
      }
    }

    
  }
  .digital-title {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      color:lightgray;
      text-align: center;
      font-size: 20px;
      padding-top:10px;
      margin-bottom: 0px;
    }

  .unit {
    margin-left: 10px;
    box-sizing: border-box;
    padding-bottom: 8px;
  }
</style>
