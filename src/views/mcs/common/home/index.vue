<template>
	<div>
		<el-row>
			<el-col :span="4">
				<el-card style="background-color: #31A28E; height: 90px;">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{warningStat.VehicleCount}}</el-row>
							<el-row style="font-size: 12px; color: white;">车辆证件提醒</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-drivers-license" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card style=" background-color: #029BDD; height: 90px;">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{warningStat.DriverCount}}</el-row>
							<el-row style="font-size: 12px; color: white;">司机证件提醒</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-vcard" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card style=" background-color: #894DB8; height: 90px;">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{warningStat.InsuranceCount}}</el-row>
							<el-row style="font-size: 12px; color: white;">车辆保险提醒</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-paste" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card shadow="hover" style=" background-color: #E35E00; height: 90px;">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{stopVehicleTableData.total}}</el-row>
							<el-row style="font-size: 12px; color: white;">停驶车辆</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-product-hunt" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card style=" background-color: #67C23A; height: 90px;">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 15px; color: white;">{{waybillStat.TodayInternalFinishWeight}} / {{waybillStat.TodayInternalPlanWeight}}</el-row>
							<el-row style="font-size: 10px; color: white;margin-top:16px;">当日自有车完成(万吨)</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-truck" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card style=" background-color: #E6A23C; height: 90px;">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 15px; color: white;">{{waybillStat.TodayFinishWeight}} / {{waybillStat.TodayPlanWeight}}</el-row>
							<el-row style="font-size: 10px; color: white;margin-top:16px;">当日业务完成(万吨)</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-stack-overflow" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		<el-row >
			<el-col :xs="12" :sm="12">
				<el-card>
					<template #header>
						<span style="font-size: 16px;">当日自有车出勤明细</span>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="waybillLineVehicleTableData.list"
						v-loading="waybillLineVehicleTableData.loading"
						:height="200"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="VehicleNumber" label="车牌号码" show-overflow-tooltip width="80" fixed />
						<el-table-column prop="DriverName" label="驾驶员" width="60" show-overflow-tooltip/>		
						<el-table-column prop="VehicleType" label="车型" width="80" show-overflow-tooltip/>
						<el-table-column prop="WaybillCustomerName" label="客户单位" width="120" show-overflow-tooltip/>
						<el-table-column prop="WaybillGoodsName" label="货物名称" width="120" show-overflow-tooltip/>
						<el-table-column prop="WaybillSenderAddress" label="运输线路" show-overflow-tooltip >
							<template #default="scope">
								{{ scope.row.WaybillSenderAddress }} 至 {{ scope.row.WaybillReceiverAddress }}
							</template>
						</el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(65)" fixed="right">
							<template #default="scope">
								<el-button text bg type="primary" @click="onChildOpenMapDlg(scope.row.VehicleNumber, true)">
									{{ $t('message.action.location') }}
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
						v-model:current-page="waybillLineVehicleTableData.param.current"
						background
						v-model:page-size="waybillLineVehicleTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="waybillLineVehicleTableData.total" />
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card>
					<template #header>
						<span style="font-size: 16px;">当日业务完成进度列表</span>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="waybillTodayTaskTableData.list"
						v-loading="waybillTodayTaskTableData.loading"
						:height="200"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="Name" label="业务名称" width="120" show-overflow-tooltip fixed/>
						<el-table-column prop="PlanWeight" label="完成业务进度（万吨）" width="150" align="center" show-overflow-tooltip>
							<template #default="scope">
								<el-text type="success" effect="plain">{{ scope.row.Weight}}</el-text> / <el-text type="danger" effect="plain">{{scope.row.PlanWeight }}</el-text>
							</template>
						</el-table-column>
						<el-table-column prop="CustomerName" label="客户单位" width="120" show-overflow-tooltip/>
						<el-table-column prop="SenderAddress" label="运输线路" show-overflow-tooltip >
							<template #default="scope">
								{{ scope.row.SenderAddress }} 至 {{ scope.row.ReceiverAddress }}
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="(val) => onHandleSizeChange(val, 2)"
						@current-change="(val) => onHandleCurrentChange(val, 2)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="waybillTodayTaskTableData.param.current"
						background
						v-model:page-size="waybillTodayTaskTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="waybillTodayTaskTableData.total" />
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card>
					<template #header>
						<span style="font-size: 16px;">当日停驶车辆统计</span>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="stopVehicleTableData.list"
						v-loading="stopVehicleTableData.loading"
						:height="200"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" fixed />
						<el-table-column prop="VehicleNumber" label="车牌号" width="100" fixed/>
						<el-table-column label="提醒" width="120" show-overflow-tooltip>
							<template #default="scope">
								<el-tag type="danger" class="mr4" round effect="dark" v-if="scope.row.RepairState > 0">修</el-tag>
								<el-tag type="success" class="mr4" round effect="dark" v-else-if="scope.row.WaybillLineCount > 0" >任</el-tag>
								<el-tag type="primary" class="mr4" round effect="dark" v-else >空</el-tag>
								<el-tooltip v-if="scope.row.InsuranceState > 0"
									class="box-item"
									effect="dark"
									placement="top">
								<template #content>保险：{{ scope.row.InsuranceStartDate.substr(0,10) }} 至 {{ scope.row.InsuranceEndDate.substr(0,10) }}
								</template>
								<el-tag :type="scope.row.InsuranceState == 2?'success':'warning'" class="mr4" round effect="dark" >险</el-tag>
								</el-tooltip>
								<el-tag type="danger" class="mr4" round effect="dark" v-else >险</el-tag>
								<el-tooltip v-if="scope.row.DrivingLicenseState < 2 || scope.row.TransportLicenseState < 2"
										class="box-item"
										effect="dark"
										placement="top">
									<template #content>行驶证：{{ scope.row.DrivingLicenseStartDate.substr(0,10) }} 至 {{ scope.row.DrivingLicenseEndDate.substr(0,10) }}
										<br />
										道路运输许可证：{{ scope.row.TransportLicenseStartDate.substr(0,10) }} 至 {{ scope.row.TransportLicenseEndDate.substr(0,10) }}
									</template>
									<el-tag :type="scope.row.DrivingLicenseState==0 || scope.row.TransportLicenseState==0?'danger':'warning'" class="mr4" round effect="dark" v-if="scope.row.DrivingLicenseState < 2 || scope.row.TransportLicenseState < 2">证</el-tag>
								</el-tooltip>
							</template>
						</el-table-column>
						<el-table-column prop="VehicleType" label="车辆类型" align="center" width="100" show-overflow-tooltip></el-table-column>
						<el-table-column label="外部车" width="70" align="center" show-overflow-tooltip>
							<template #default="scope">
								<el-tag type="success" effect="plain" v-if="scope.row.IsExternal">{{ $t('message.action.yes') }}</el-tag>
								<el-tag type="danger" effect="plain" v-else>{{ $t('message.action.no') }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="Shipper" label="相关方" width="120" show-overflow-tooltip>
						</el-table-column>
						
						<el-table-column prop="Driver" label="司机" width="80" show-overflow-tooltip/>				
						<el-table-column prop="DriverMobile" label="电话" width="100"  show-overflow-tooltip/>
						<!-- <el-table-column prop="Mileage" label="公里数" width="70" align="right"/>
						<el-table-column prop="DrivingLicense" label="行驶证" width="120"  show-overflow-tooltip/>
						<el-table-column prop="TransportLicense" label="道路运输证" width="120"  show-overflow-tooltip/> -->
						
						<el-table-column prop="Tname" label="所属公司" show-overflow-tooltip/>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(65)" fixed="right">
							<template #default="scope">
								<el-button text bg type="primary" @click="onChildOpenMapDlg(scope.row.VehicleNumber, true)">
									{{ $t('message.action.location') }}
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
						v-model:current-page="stopVehicleTableData.param.current"
						background
						v-model:page-size="stopVehicleTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="stopVehicleTableData.total" />
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card>
					<template #header>
						<span style="font-size: 16px;">当年业务完成进度列表(万吨)</span>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="waybillYearTaskTableData.list"
						v-loading="waybillYearTaskTableData.loading"
						:height="200"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="Name" label="业务名称" width="120" show-overflow-tooltip fixed/>
						<el-table-column prop="PlanWeight" label="完成业务进度（万吨）" width="150" align="center" show-overflow-tooltip>
							<template #default="scope">
								<el-text type="success" effect="plain">{{ scope.row.Weight}}</el-text> / <el-text type="danger" effect="plain">{{scope.row.PlanWeight }}</el-text>
							</template>
						</el-table-column>
						<el-table-column prop="CustomerName" label="客户单位" width="120" show-overflow-tooltip/>
						<el-table-column prop="SenderAddress" label="运输线路" show-overflow-tooltip >
							<template #default="scope">
								{{ scope.row.SenderAddress }} 至 {{ scope.row.ReceiverAddress }}
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="(val) => onHandleSizeChange(val, 4)"
						@current-change="(val) => onHandleCurrentChange(val, 4)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="waybillYearTaskTableData.param.current"
						background
						v-model:page-size="waybillYearTaskTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="waybillYearTaskTableData.total" />
				</el-card>
			</el-col>
		</el-row>
		<childMapDlg ref="childMapDlgRef" />
	</div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { computed, getCurrentInstance, nextTick, onActivated, onMounted, reactive, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import childMapDlg from '../../common/waybill/component/vehicleMap.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { formatAxis } from '/@/utils/formatTime';
export default {
	name: 'admin',
	components: { childMapDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind||'info';
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const router = useRouter();
		// const vehicleEditDlg = ref();
		// const driverEditDlg = ref();
		// const insuranceEditDlg = ref();
		// const childMapDlgRef=ref();
		// console.debug("childMapDlgRef:",childMapDlgRef)
		const store = useStore();
		const state = reactive({
			kind,
			scopeMode,
			scopeValue,
			myCharts: [],
			waybillLineVehicleTableData:{ //当日车辆出勤明细
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
			waybillTodayTaskTableData:{ //当日任务统计
				loading: false,
				total:0,
				list:[],
				param: {
					current: 1,
					pageSize: 10,
				}
			},
			waybillYearTaskTableData:{ //当年任务统计
				loading: false,
				total:0,
				list:[],
				param: {
					current: 1,
					pageSize: 10,
				}
			},
			warningStat:{
				VehicleCount:0,
				DriverCount:0,
				InsuranceCount:0,
			},
			waybillStat:{
				TodayInternalPlanWeight:0,//当日自有车计划重量
				TodayInternalFinishWeight:0, //当日自有车完成重量
				TodayPlanWeight:0,//当日自有车计划重量
				TodayFinishWeight :0, //当日自有车完成重量
			},
			stopVehicleTableData:{
				loading: false,
				total:0,
				list:[],
				param: {
					keyword: '',
					isExternal:-1,
					waybillState:0,
					repairState:-1,
					certState:0,
					insuranceState:0,
					current: 1,
					pageSize: 10,
					state: -1,
				}
			},
		});
		state.waybillLineVehicleTableData.param.pageIndex = computed(() => {
			return state.waybillLineVehicleTableData.param.current - 1;
		});
		state.waybillTodayTaskTableData.param.pageIndex = computed(() => {
			return state.waybillTodayTaskTableData.param.current - 1;
		});
		state.waybillTodayTaskTableData.param.pageIndex = computed(() => {
			return state.waybillTodayTaskTableData.param.current - 1;
		});
		state.stopVehicleTableData.param.pageIndex = computed(() => {
			return state.stopVehicleTableData.param.current - 1;
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
			// 当日运量统计
			try {
				const waybillStatRes = await proxy.$api.erp.waybill.getHomeStatList(0, 0)
				if (waybillStatRes.errcode == 0) {
					state.waybillStat = waybillStatRes.data
				}else{
				}
			} finally {
				
			}

			// 车辆证件超期预警统计
			try {
				const resVehicleWarning = await proxy.$api.erp.vehicle.getVehicleWarning("info", 0, 0);
				if (resVehicleWarning.errcode == 0) {
					state.warningStat.VehicleCount = resVehicleWarning.total
				}else{
					console.log("error:",resVehicleWarning.errmsg)
				}
			}finally {
				
			}

			// 司机驾驶证超期预警统计
			try {
				const resDriverWarning = await proxy.$api.erp.driver.getDriverWarning("info", 0, 0);
				if (resDriverWarning.errcode == 0) {
					state.warningStat.DriverCount = resDriverWarning.total
				}else{
					console.log("error:",resDriverWarning.errmsg)
				}
			}finally {
				
			}

			// 车辆保险超期预警统计
			try {
				const resInsuranceWarning = await proxy.$api.erp.vehicleinsurance.getVehicleInsuranceWarning("info", 0, 0);
				if (resInsuranceWarning.errcode == 0) {
					state.warningStat.InsuranceCount = resInsuranceWarning.total
				}else{
					console.log("error:",resInsuranceWarning.errmsg)
				}
			}finally {
				
			}

			// 当日车辆出勤明细
			try {
				const stopRes = await proxy.$api.erp.waybill.getHomeVehicleList(0, 0, state.waybillLineVehicleTableData.param)
				if (stopRes.errcode == 0) {
					state.waybillLineVehicleTableData.total = stopRes.total
					state.waybillLineVehicleTableData.list = stopRes.data
				}else{
				}
			} finally {
				state.waybillLineVehicleTableData.loading = false;
			}
			//当日任务统计
			try {
				const now = dayjs();
				state.waybillTodayTaskTableData.param.startTime=now.startOf('day').format();
				state.waybillTodayTaskTableData.param.endTime=now.endOf('day').format();

				const todayTaskRes = await proxy.$api.erp.waybill.getGoodsAndCustomerStatListByScope("freight",0, 0,state.waybillTodayTaskTableData.param);
				if(todayTaskRes.errcode==0){
					state.waybillTodayTaskTableData.total = todayTaskRes.total
					state.waybillTodayTaskTableData.list = todayTaskRes.data
				}	
			} finally {
				state.waybillTodayTaskTableData.loading = false;
			}
			//当日停驶车辆统计
			try {
				const res = await proxy.$api.erp.vehicle.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.stopVehicleTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.stopVehicleTableData.list = res.data;
				state.stopVehicleTableData.total = res.total;
			} finally {
				state.stopVehicleTableData.loading = false;
			}
			//当年任务统计
			try {
				const now = dayjs();
				state.waybillYearTaskTableData.param.startTime=now.startOf('year').format();
				state.waybillYearTaskTableData.param.endTime=now.endOf('year').format();

				const yearTaskRes = await proxy.$api.erp.waybill.getGoodsAndCustomerStatListByScope("freight",0, 0,state.waybillYearTaskTableData.param);
				if(yearTaskRes.errcode==0){
					state.waybillYearTaskTableData.total = yearTaskRes.total
					state.waybillYearTaskTableData.list = yearTaskRes.data
				}	
			} finally {
				state.waybillYearTaskTableData.loading = false;
			}
		}
		// 打开地图
		const onChildOpenMapDlg = (vehicleNumber: string, ishow: boolean) => {
			const childMapDlgRef = proxy.$refs.childMapDlgRef;
			console.debug("childMapDlgRef",childMapDlgRef)
			childMapDlgRef.openDialog(vehicleNumber, ishow);
		};
		// // 打开车辆详情
		// const onVehicleEditDlg = (id: string, ishow: boolean) => {
		// 	vehicleEditDlg.value.openDialog(state.kind, id, ishow);
		// };
		// // 打开司机详情
		// const onDriverEditDlg = (id: string, ishow: boolean) => {
		// 	driverEditDlg.value.openDialog(state.kind, id, ishow);
		// };
		// // 打开保险详情
		// const onInsuranceEditDlg = (id: string, ishow: boolean) => {
		// 	insuranceEditDlg.value.openDialog(state.kind, id, ishow);
		// };

		//	分页改变
		const onHandleSizeChange = (val: number, index: number) => {
			switch(index){
				case 1:
					state.waybillLineVehicleTableData.param.pageSize = val;
					break;
				case 2:
					state.waybillTodayTaskTableData.param.pageSize = val;
					break;
				case 3:
					state.stopVehicleTableData.param.pageSize = val;
					break;
				case 4:
					state.waybillYearTaskTableData.param.pageSize = val;
					break;
			}
		};
		//	分页改变
		const onHandleCurrentChange = (val: number, index: number) => {
			switch(index){
				case 1:
					state.waybillLineVehicleTableData.param.current = val;
					break;
				case 2:
					state.waybillTodayTaskTableData.param.current = val;
					break;
				case 3:
					state.stopVehicleTableData.param.current = val;
					break;
				case 4:
					state.waybillYearTaskTableData.param.current = val;
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
			// onVehicleEditDlg,
			// onDriverEditDlg,
			// onInsuranceEditDlg,
			onHandleSizeChange,
			onHandleCurrentChange,
			formatGender,
			dateFormatYMD,
			onChildOpenMapDlg,
			proxy,
			getUserInfos,
			currentTime,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
	.el-card {
		border-radius:15px;
		width: 100%;
	}
	.el-row {
		padding-left: 10px;
	}
	.el-col {
		padding-bottom: 10px;
		padding-right: 10px;
	}
	.el-card:hover {
		transform: scale(1.02); 
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}
</style>
