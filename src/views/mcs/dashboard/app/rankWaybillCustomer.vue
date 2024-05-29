<template>
  <div id="ranking-board">
    <div class="ranking-board-title">客户运量统计</div>
    <dv-scroll-ranking-board :config="config" style="width:95%;height:200px"/>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
	name: 'RankingWaybillCustomerBoard',
	components: {  },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({config:{
      data:[],
      rowNum:3,
      sort:false,
      color:'#F56C6C',
      textColor:'#fde2e2',
      unit: '万吨',
      valueFormatter ({ value }) {
        return ' '+value+' 万吨'
      }
		}});
		
		
		// 页面加载时
		onMounted(async () => {
      const now = dayjs();
      const startTime=now.startOf('year').format(); 
      const endTime=now.endOf('year').format(); 

      const res = await proxy.$api.erp.waybill.getCustomerStatListByScope("freight",0, 0,{limit:30,startTime:startTime,endTime:endTime});
      if(res.errcode==0){
        state.config.data=res.data.map((val:any)=>{return {name:val.Name,value:val.Weight}});
        console.log("state.config.data:",state.config.data)
      }	
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getCustomerStatListByScope("freight",0, 0,{limit:30,startTime:startTime,endTime:endTime});
        if(res.errcode==0){
          state.config.data=res.data.map((val:any)=>{return {name:val.Name,value:val.Weight}});
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
#ranking-board {
  width: 95%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  box-sizing: border-box;
  margin-right: 30px;
  margin-left:10px;
  padding: 0 15px;

  .ranking-board-title {
    height: 40px;
    display: flex;
    font-family: 'LiSu';
    align-items: center;
    font-size: 18px;
  }

  .dv-scroll-ranking-board {
    flex: 1;
  }
  .row-item{
    height:45px !important;
  }
}
</style>
