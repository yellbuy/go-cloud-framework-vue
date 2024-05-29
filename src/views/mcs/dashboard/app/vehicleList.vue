<template>
  <div id="vehicleList">
    <div id="ranking-board-vehicle">
      <div class="ranking-board-title">车辆信息</div>
    </div>
    <dv-scroll-board :config="{header: [],
    align: ['center','center','center','center'],
    data:list,
    columnWidth:[50,120,150],index: true,rowNum:5,waitTime:5000,carousel: 'page',
      headerBGC: '#337ecc',
        headerHeight: 10,
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        evenRowBGC: 'rgba(10, 29, 50, 0.8)'}" style="width:100%;height:180px;" @click="onClick"/>
        <childMapDlg ref="childMapDlgRef" />
      
  </div>
</template>

<script lang="ts" scoped>
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
      const res = await proxy.$api.erp.vehicle.getListByScope("info", 0, 0, {pageSize:1000,isExternal:0});
				if (res.errcode == 0) {
          state.list=res.data.map((val:any)=>{
          return [val.VehicleNumber, val.DriverMobile,"<span style='color:lightgray'>〉</span>"]
        })
				}
     
      setInterval(async () => {
        const res = await proxy.$api.erp.vehicle.getListByScope("info", 0, 0, {pageSize:1000,isExternal:0});
				if (res.errcode == 0) {
          state.list=res.data.map((val:any)=>{
          return [val.VehicleNumber, val.DriverMobile,"<span style='color:dardgray'>〉</span>"]
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
    height:50px !important;
  }
}
</style>
