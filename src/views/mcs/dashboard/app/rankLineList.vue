<template>
  <div id="vehicleList">
    <div id="ranking-board-vehicle">
      <div class="ranking-board-title">今日线路</div>
    </div>
    <dv-scroll-board :config="{header: [],
    align: ['right','left','left','center','left'],
    data:list,
    columnWidth:[50,300,80,40,80],index: true,rowNum:6,waitTime:2000,
      headerBGC: '#337ecc',
        headerHeight: 10,
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        evenRowBGC: 'rgba(10, 29, 50, 0.8)'}" style="width:100%;height:23vh;" @click="onClick"/>
        <childMapDlg ref="childMapDlgRef" />
      
  </div>
</template>

<script lang="ts" scoped>
import dayjs from 'dayjs';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import childMapDlg from '../../common/waybill/component/vehicleMap.vue';
export default {
	name: 'dashboardLeftTop',
	components: { childMapDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
    const childMapDlgRef=ref();
		const state = reactive({
			list:[]
		});
		// 打开地图
		const onClick = (rowData:any) => {
      console.log("row:",rowData)
      const vehicleNumber=rowData.row[1];
      if(vehicleNumber){
        childMapDlgRef.value.openDialog(vehicleNumber, true);
      }
    }
		// 页面加载时
		onMounted(async () => {
      const now = dayjs();
      const startTime=now.startOf('day').format(); 
      const endTime=now.endOf('day').format(); 
      const res = await proxy.$api.erp.waybill.getCustomerlineListByScope("freight", 0, 0, {pageSize:50,startTime:startTime,endTime:endTime});
			if (res.errcode == 0) {
          state.list=res.data.map((val:any)=>{
            return [`<span style='color:orange'>${val.CustomerName}</span>`,`<span style='color:orange'>${val.SenderAddress}</span>`,`<span style='color:lightgray'>〉</span>`, `<span style='color:orange'>${val.ReceiverAddress}</span>`]
        })
			}
     
      setInterval(async () => {
        const res = await proxy.$api.erp.waybill.getCustomerlineListByScope("freight", 0, 0, {pageSize:50,startTime:startTime,endTime:endTime});
        if (res.errcode == 0) {
            state.list=res.data.map((val:any)=>{
            return [`<span style='color:orange'>${val.CustomerName}</span>`,`<span style='color:orange'>${val.SenderAddress}</span>`,`<span style='color:lightgray'>〉</span>`, `<span style='color:orange'>${val.ReceiverAddress}</span>`]
          })
        }
      }, 300000);
				
		});
		return {
			t,
      onClick,
      childMapDlgRef,
			...toRefs(state),
		};
	},
};
</script>

<style lang="less" scoped>
#ranking-board-vehicle {
  width: 100%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  box-sizing: border-box;
  margin-right: 20px;
  margin-left:0px;
  padding: 0 15px 0px 15px;

  .ranking-board-title {
    height: 4vh;
    display: flex;
    font-family: 'LiSu';
    align-items: center;
    font-size: 18px;
  }

  .dv-scroll-ranking-board {
    flex: 1;
  }
}
</style>
