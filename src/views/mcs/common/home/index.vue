<template>
	<div>
		<p style="font-size: 30px;">功能数据接口修改中</p>
		<el-row :gutter="15" style="margin-bottom: 15px;">
			<el-col :xs="8" :sm="8">
				<el-card shadow="hover" style="background-color: #31A28E; width: 100%; height: 90px; border-radius:15px; transition: all 0.2s;">
					<el-row>
						<el-col :xs="24" :sm="20">
							<el-row style="font-size: 30px; color: white;">{{statData.VehicleInsideRunningCount}}	/	{{statData.VehicleInsideCount}}</el-row>
							<el-row style="font-size: 15px; color: white;">当日自有车出勤统计（完成数 / 任务数）</el-row>
						</el-col>
						<el-col :xs="24" :sm="4" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-truck" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :xs="8" :sm="8">
				<el-card shadow="hover" style=" background-color: #029BDD; width: 100%; height: 90px; border-radius:15px">
					<el-row>
						<el-col :xs="24" :sm="20">
							<el-row style="font-size: 30px; color: white;">{{statData.WaybillFinishedCount}}	/	{{statData.WaybillLineCount}}</el-row>
							<el-row style="font-size: 15px; color: white;">当日业务完成进度统计（完成数 / 任务数）</el-row>
						</el-col>
						<el-col :xs="24" :sm="4" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-file-text" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :xs="8" :sm="8">
				<el-card shadow="hover" style=" background-color: #894DB8; width: 100%; height: 90px; border-radius:15px">
					<el-row>
						<el-col :xs="24" :sm="20">
							<el-row style="font-size: 30px; color: white;">{{statData.VehicleStopCount}}	/	{{statData.VehicleCount}}</el-row>
							<el-row style="font-size: 15px; color: white;">当日停驶车辆统计（停驶数 / 车辆总数）</el-row>
						</el-col>
						<el-col :xs="24" :sm="4" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-product-hunt" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="15">
			<el-col :xs="8" :sm="8">
				<el-card shadow="hover" style="border-radius:15px">
					<template #header>
						<span style="font-size: 16px;">当日自有车出勤明细</span>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="attendanceTableData.list"
						v-loading="attendanceTableData.loading"
						:height="proxy.$calcMainHeight(-205)"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="VehicleNumber" label="车牌号码" show-overflow-tooltip width="80" fixed />
						<el-table-column prop="DriverName" label="驾驶员" width="60" show-overflow-tooltip/>		
						<el-table-column prop="VehicleType" label="车型" width="80" show-overflow-tooltip/>
						<el-table-column prop="WaybillCustomerName" label="客户单位" width="120" show-overflow-tooltip/>
						<el-table-column prop="WaybillGoodsName" label="货物名称" width="120" show-overflow-tooltip/>
						<el-table-column prop="RouterId" label="运输线路" width="200" show-overflow-tooltip/>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(65)" fixed="right">
							<template #default="scope">
								<el-button text bg @click="onVehicleEditDlg(scope.row.Id, true)">
									{{ $t('message.action.see') }}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="(val) => onHandleSizeChange(val, 1)"
						@current-change="(val) => onHandleCurrentChange(val, 1)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="attendanceTableData.param.current"
						background
						v-model:page-size="attendanceTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="attendanceTableData.total" />
				</el-card>
			</el-col>
			<el-col :xs="8" :sm="8">
				<el-card shadow="hover" style="border-radius:15px">
					<template #header>
						<span style="font-size: 16px;">当日业务完成进度列表</span>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="finishTableData.list"
						v-loading="finishTableData.loading"
						:height="proxy.$calcMainHeight(-205)"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="WaybillGoodsName" label="业务名称" width="120" show-overflow-tooltip fixed></el-table-column>
						<el-table-column prop="PlanWeight" label="完成业务进度" width="90" align="center" show-overflow-tooltip fixed>
							<template #default="scope">
								<el-text type="success" effect="plain">{{ scope.row.Weight}}</el-text> / <el-text type="danger" effect="plain">{{scope.row.PlanWeight }}</el-text>
							</template>
						</el-table-column>
						<el-table-column prop="WaybillCustomerName" label="客户单位" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column prop="RouterId" label="运输线路" width="200" show-overflow-tooltip></el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(65)" fixed="right">
							<template #default="scope">
								<el-button text bg @click="onDriverEditDlg(scope.row.Id, true)">
									{{ $t('message.action.see') }}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="(val) => onHandleSizeChange(val, 2)"
						@current-change="(val) => onHandleCurrentChange(val, 2)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="finishTableData.param.current"
						background
						v-model:page-size="finishTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="finishTableData.total" />
				</el-card>
			</el-col>
			<el-col :xs="8" :sm="8">
				<el-card shadow="hover" style="border-radius:15px">
					<template #header>
						<span style="font-size: 16px;">当日停驶车辆统计</span>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="stopTableData.list"
						v-loading="stopTableData.loading"
						:height="proxy.$calcMainHeight(-205)"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="VehicleNumber" label="车牌号码" width="80" show-overflow-tooltip/>
						<el-table-column prop="VehicleKind" label="停驶原因" show-overflow-tooltip>
							<template #default="scope">
								<el-tag type="danger" class="mr4" round effect="dark" v-if="scope.row.RepairState > 0">修</el-tag>
								<el-tag type="success" class="mr4" round effect="dark" v-else-if="scope.row.WaybillLineCount = 0" >空</el-tag>
							</template>
						</el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(65)" fixed="right">
							<template #default="scope">
								<el-button text bg @click="onIndexEditDlg(scope.row.Id, true)">
									{{ $t('message.action.see') }}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="(val) => onHandleSizeChange(val, 3)"
						@current-change="(val) => onHandleCurrentChange(val, 3)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="stopTableData.param.current"
						background
						v-model:page-size="stopTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="stopTableData.total" />
				</el-card>
			</el-col>
		</el-row>
		<vehicleEditDlg ref="vehicleEditDlg" />
		<driverEditDlg ref="driverEditDlg" />
		<insuranceEditDlg ref="insuranceEditDlg" />
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, nextTick, onActivated, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import driverEditDlg from '../driver/component/driverEdit.vue';
import insuranceEditDlg from '../insurance/component/insuranceEdit.vue';
import vehicleEditDlg from '../vehicle/component/vehicleEdit.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { formatAxis } from '/@/utils/formatTime';
export default {
	name: 'admin',
	components: { vehicleEditDlg, driverEditDlg, insuranceEditDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind||'info';
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const router = useRouter();
		const vehicleEditDlg = ref();
		const driverEditDlg = ref();
		const insuranceEditDlg = ref();
		console.debug("router：",router.currentRoute.value)
		const store = useStore();
		const state = reactive({
			kind,
			scopeMode,
			scopeValue,
			myCharts: [],
			statData: {
				list: [],
				total: 0,
				param: {
					finishState: -1,
					isTodayAll: 1,
					vehicleIsExternal: -1,
					state: -1,
					pageNum: 1,
					pageSize: 10,
				}
			},
			attendanceTableData: {
				loading: false,
				total:0,
				list:[],
				param: {
					finishState: -1,
					isTodayAll: 1,
					vehicleIsExternal: 0,
					state: -1,
					current: 1,
					pageSize: 10,
				}
			},
			finishTableData:{
				loading: false,
				total:0,
				list:[],
				param: {
					finishState: -1,
					isTodayAll: 1,
					vehicleIsExternal: -1,
					state: -1,
					current: 1,
					pageSize: 10,
				}
			},
			stopTableData:{
				loading: false,
				total:0,
				list:[],
				param: {
					finishState: -1,
					isTodayAll: 1,
					vehicleIsExternal: -1,
					state: -1,
					current: 1,
					pageSize: 10,
				}
			},
		});
		state.attendanceTableData.param.pageIndex = computed(() => {
			return state.attendanceTableData.param.current - 1;
		});
		state.finishTableData.param.pageIndex = computed(() => {
			return state.finishTableData.param.current - 1;
		});
		state.stopTableData.param.pageIndex = computed(() => {
			return state.stopTableData.param.current - 1;
		});
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		// 当前时间提示语
		const currentTime = computed(() => {
			return formatAxis(new Date());
		});

		const onGetTableData = async (status = 0) => {
			if(status==0||status==1){
				// 车辆证件超期预警统计
				try {
					const attendanceRes = await proxy.$api.erp.waybill.getHomeList(0, 0, state.statData.param)
					if (attendanceRes.errcode == 0) {
						state.attendanceTableData.total = attendanceRes.total
						state.attendanceTableData.list = attendanceRes.data
						state.statData.VehicleInsideRunningCount = attendanceRes.total
						state.statData.VehicleInsideCount = attendanceRes.total
					}else{
					}
				}finally {
					state.attendanceTableData.loading = false;
				}
			} 
			if(status==0||status==2){
				// 司机驾驶证超期预警统计
				try {
					const finishRes = await proxy.$api.erp.waybill.getHomeList(0, 0, state.finishTableData.param)
					if (finishRes.errcode == 0) {
						state.finishTableData.total = finishRes.total
						state.finishTableData.list = finishRes.data
						state.statData.WaybillFinishedCount = finishRes.total
						state.statData.WaybillLineCount = finishRes.total
					}else{
					}
				}finally {
					state.finishTableData.loading = false;
				}
			} 
			if(status==0||status==3) {
				// 车辆保险超期预警统计
				try {
					const stopRes = await proxy.$api.erp.waybill.getHomeList(0, 0, state.stopTableData.param)
					if (stopRes.errcode == 0) {
						state.stopTableData.total = stopRes.total
						state.stopTableData.list = stopRes.data
						state.statData.VehicleStopCount = stopRes.total
						state.statData.VehicleCount = stopRes.total
					}else{
					}
				}finally {
					state.stopTableData.loading = false;
				}
			}
		}

		// 打开车辆详情
		const onVehicleEditDlg = (id: string, ishow: boolean) => {
			vehicleEditDlg.value.openDialog(state.kind, id, ishow);
		};
		// 打开司机详情
		const onDriverEditDlg = (id: string, ishow: boolean) => {
			driverEditDlg.value.openDialog(state.kind, id, ishow);
		};
		// 打开保险详情
		const onIndexEditDlg = (id: string, ishow: boolean) => {
			insuranceEditDlg.value.openDialog(state.kind, id, ishow);
		};

		//	分页改变
		const onHandleSizeChange = (val: number, index: number) => {
			switch(index){
				case 1:
					state.attendanceTableData.param.pageSize = val;
					break;
				case 2:
					state.finishTableData.param.pageSize = val;
					break;
				case 3:
					state.stopTableData.param.pageSize = val;
					break;
			}
		};
		//	分页改变
		const onHandleCurrentChange = (val: number, index: number) => {
			switch(index){
				case 1:
					state.attendanceTableData.param.current = val;
					break;
				case 2:
					state.finishTableData.param.current = val;
					break;
				case 3:
					state.stopTableData.param.current = val;
					break;
			}
		};

		// 批量设置 echarts resize
		const initEchartsResizeFun = () => {
			nextTick(() => {
				for (let i = 0; i < state.myCharts.length; i++) {
					state.myCharts[i].resize();
				}
			});
		};
		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});
		// 由于页面缓存原因，keep-alive
		onActivated(() => {
			initEchartsResizeFun();
		});
		// 监听 vuex 中的 tagsview 开启全屏变化，重新 resize 图表，防止不出现/大小不变等
		watch(
			() => store.state.tagsViewRoutes.isTagsViewCurrenFull,
			() => {
				initEchartsResizeFun();
			}
		);

		//性别展示
		const formatGender = (row: object) => {
			return row.Gender === 1 ? '男' : '女'
		};

		const { dateFormatYMD } = commonFunction();

		return {
			onGetTableData,
			onVehicleEditDlg,
			onDriverEditDlg,
			onIndexEditDlg,
			onHandleSizeChange,
			onHandleCurrentChange,
			formatGender,
			dateFormatYMD,
			vehicleEditDlg,
			driverEditDlg,
			insuranceEditDlg,
			proxy,
			getUserInfos,
			currentTime,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
	.el-card:hover {
	transform: scale(1.03); 
	}
</style>
