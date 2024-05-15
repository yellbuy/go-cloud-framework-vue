<template>
  <div id="vehicleList">
    <dv-scroll-board :config="{header: ['车牌号码','司机电话','定位'],
    align: ['center','center','center','center'],
    data:list,
    columnWidth:[50,120,150],index: true,rowNum:15,waitTime:5000,carousel: 'page',
      headerBGC: '#1981f6',
        headerHeight: 30,
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        evenRowBGC: 'rgba(10, 29, 50, 0.8)'}" style="width:100%;height:450px;margin-top:10px" @click="onClick"/>
        <childMapDlg ref="childMapDlgRef" />
  </div>
</template>

<script lang="ts">
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

<style lang="less">

</style>
