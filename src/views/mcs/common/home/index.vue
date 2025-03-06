<template>
	<div>
		<el-row>
			<el-col :span="4">
				<el-card style="background-color: #31A28E; height: 90px;" @click="toVehicleRemind">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{homeStat.VehicleRemindCount}}</el-row>
							<el-row style="font-size: 12px; color: white;">车辆证件提醒</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-address-card" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card style=" background-color: #029BDD; height: 90px;" @click="toDriverRemind">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{homeStat.DriverRemindCount}}</el-row>
							<el-row style="font-size: 12px; color: white;">司机证件提醒</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-drivers-license" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card style=" background-color: #894DB8; height: 90px;" @click="toInsuranceRemind">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{homeStat.InsuranceRemindCount}}</el-row>
							<el-row style="font-size: 12px; color: white;">车辆保险提醒</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-paste" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card shadow="hover" style=" background-color: #E35E00; height: 90px;" @click="toWaybillView">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{homeStat.VehicleInnerStopCount}}</el-row>
							<el-row style="font-size: 12px; color: white;">停驶车辆</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-product-hunt" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card shadow="hover" style=" background-color: #67C23A; height: 90px;" @click="toWaybillView">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{homeStat.VehicleInnerRunCount}}</el-row>
							<el-row style="font-size: 12px; color: white;">自有车出勤</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-truck" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			
			<el-col :span="4">
				<el-card shadow="hover" style=" background-color: #E6A23C; height: 90px;" @click="toWaybillView">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{homeStat.VehicleTempRunCount}}</el-row>
							<el-row style="font-size: 12px; color: white;">临时车出勤</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-wrench" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		<el-row >
			<el-col :xs="12" :sm="12">
				<el-card>
					<template #header>
						<div>
							<el-form ref="searchFormRef" :model="waybillTableData.param" label-suffix="："  label-width="60px" :inline="true">
								<span style="font-size: 16px;">业务完成进度</span>
								<el-form-item label="时间" style="width:260px; white-space: nowrap;" >
									<el-date-picker
										v-model="waybillTableData.timeRange"
										type="daterange"
										unlink-panels
										range-separator="至"
										start-placeholder="开始时间"
										end-placeholder="结束时间"
										format="YYYY-MM-DD"
										date-format="YYYY/MM/DD"/>
								</el-form-item>
								<el-form-ite style="margin-top:15px">
									<el-button type="info" @click="onWaybillTableSearch">
										<el-icon>
											<Search />
										</el-icon>
										{{ $t('message.action.search') }}
									</el-button>
								</el-form-ite>
							</el-form>
						</div>
					</template>
					<el-table
						:data="waybillTableData.data"
						v-loading="waybillTableData.loading"
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
						@size-change="(val) => onHandleSizeChange(val, 1)"
						@current-change="(val) => onHandleCurrentChange(val, 1)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="waybillTableData.param.current"
						background
						v-model:page-size="waybillTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="waybillTableData.total" />
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card>
					<template #header>
						<span style="font-size: 16px;">当日出勤自有车</span>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="vehicleRunTableData.data"
						v-loading="vehicleRunTableData.loading"
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
						@size-change="(val) => onHandleSizeChange(val, 2)"
						@current-change="(val) => onHandleCurrentChange(val, 2)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="vehicleRunTableData.param.current"
						background
						v-model:page-size="vehicleRunTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="vehicleRunTableData.total" />
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card v-if="isMainBusinessState">
					<template #header>
						<el-button type="primary" @click="onSetBusinessState(false)">
							年度铁运
						</el-button>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="mainBusinessBillLineTableData.data"
						v-loading="mainBusinessBillLineTableData.loading"
						:height="236"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="GoodsName" label="产品名称" width="100" show-overflow-tooltip/>
						<el-table-column prop="CustomerName" label="客户名称" width="90" show-overflow-tooltip/>
						<el-table-column prop="SenderAddress" label="发货地" width="90" show-overflow-tooltip/>
						<el-table-column prop="ReceiverAddress" label="到达地" width="90" show-overflow-tooltip/>
						<el-table-column prop="TodayVehicleCount" label="日车数" width="60" show-overflow-tooltip/>
						<el-table-column prop="TodayWeight" label="日运量" width="60" show-overflow-tooltip/>
						<el-table-column prop="Weight" label="年运量" width="80" show-overflow-tooltip/>
					</el-table>
					<!-- <el-pagination
						small
						@size-change="(val) => onHandleSizeChange(val, 3)"
						@current-change="(val) => onHandleCurrentChange(val, 3)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="mainBusinessBillLineTableData.param.current"
						background
						v-model:page-size="mainBusinessBillLineTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="mainBusinessBillLineTableData.total" /> -->
				</el-card>
				<el-card v-else>
					<template #header>
						<el-button type="success" @click="onSetBusinessState(true)">
							年度贸易
						</el-button>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="tradeBusinessBillLineTableData.data"
						v-loading="tradeBusinessBillLineTableData.loading"
						:height="200"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="GoodsName" label="产品名称" width="100" show-overflow-tooltip fixed/>
						<el-table-column prop="GoodsCategoryName" label="品类" width="90"></el-table-column>
						<el-table-column prop="CustomerName" label="供应商" width="120" show-overflow-tooltip/>
						<el-table-column prop="PlanWeight" label="完成情况" width="120" align="center">
							<template #default="scope">
								<el-text type="success" effect="plain">{{ scope.row.Weight}}</el-text> / <el-text type="danger" effect="plain">{{scope.row.PlanWeight }}</el-text>
							</template>
						</el-table-column>
						<el-table-column prop="SenderPlanTime" label="开始时间" width="80" align="left" :formatter="dateFormatYMD" show-overflow-tooltip></el-table-column>
						<el-table-column prop="ReceiverPlanTime" label="结束时间" width="80" align="left" :formatter="dateFormatYMD" show-overflow-tooltip></el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="(val) => onHandleSizeChange(val, 3)"
						@current-change="(val) => onHandleCurrentChange(val, 3)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="tradeBusinessBillLineTableData.param.current"
						background
						v-model:page-size="tradeBusinessBillLineTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="tradeBusinessBillLineTableData.total" />
				</el-card>
			</el-col>
			<el-col :xs="12" :sm="12">
				<el-card>
					<template #header>
						<span style="font-size: 16px;">当日停驶自有车</span>
						<!-- <span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span> -->
					</template>
					<el-table
						:data="vehicleStopTableData.data"
						v-loading="vehicleStopTableData.loading"
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
						@size-change="(val) => onHandleSizeChange(val, 4)"
						@current-change="(val) => onHandleCurrentChange(val, 4)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="vehicleStopTableData.param.current"
						background
						v-model:page-size="vehicleStopTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="vehicleStopTableData.total" />
				</el-card>
			</el-col>
		</el-row>
		<childMapDlg ref="childMapDlgRef" />
	</div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { computed, getCurrentInstance, onActivated, onMounted, reactive, toRefs, watch } from 'vue';
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
		// router.push(url||path);
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
			isMainBusinessState:true,
			homeStat:{	// 首页统计数据
				VehicleRemindCount: 0, //车辆证件超期预警
				DriverRemindCount: 0, //司机证件超期预警
				InsuranceRemindCount: 0, //自有车出勤车辆统计
				VehicleInnerRunCount: 0, //自有车停驶车辆统计
				VehicleInnerStopCount: 0, //自有车停驶车辆统计
				VehicleTempRunCount: 0, //临配车辆出勤数
			},
			waybillTableData:{ //当日任务列表
				loading: false,
				total:0,
				data:[],
				param: {
					current: 1,
					pageSize: 10,
				},
				timeRange: [],
			},
			vehicleRunTableData:{ //当日出勤车辆列表
				loading: false,
				total:0,
				data:[],
				param: {
					finishState: -1,
					isTodayAll: 1,
					vehicleIsExternal: 0,
					state: -1,
					current: 1,
					pageSize: 10,
				}
			},
			mainBusinessBillLineTableData:{ //铁运列表
				loading: false,
				total:0,
				data:[],
				param: {
					current: 1,
					timeSpan:'year',
					pageSize: 1000,
				}
			},
			tradeBusinessBillLineTableData:{ //贸易列表
				loading: false,
				total:0,
				data:[],
				param: {
					current: 1,
					pageSize: 10,
				}
			},
			vehicleStopTableData:{	//当日停驶车辆列表
				loading: false,
				total:0,
				data:[],
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
		state.waybillTableData.param.pageIndex = computed(() => {
			return state.waybillTableData.param.current - 1;
		});
		state.vehicleRunTableData.param.pageIndex = computed(() => {
			return state.vehicleRunTableData.param.current - 1;
		});
		state.mainBusinessBillLineTableData.param.pageIndex = computed(() => {
			return state.mainBusinessBillLineTableData.param.current - 1;
		});
		state.tradeBusinessBillLineTableData.param.pageIndex = computed(() => {
			return state.tradeBusinessBillLineTableData.param.current - 1;
		});
		state.vehicleStopTableData.param.pageIndex = computed(() => {
			return state.vehicleStopTableData.param.current - 1;
		});
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		// 当前时间提示语
		const currentTime = computed(() => {
			return formatAxis(new Date());
		});

		const onGetHomeStatData = async () => {
			// 获取首页统计数据
			try {
				const res = await proxy.$api.erp.vehicle.getHomeStat(0, 0)
				if (res.errcode == 0) {
					state.homeStat = res.data
				}
			}catch(er){
				console.log("onGetHomeStatData:",er)
			} finally {
				
			}
		}
		const onWaybillTableSearch=async()=>{
			try {
				const now=dayjs();
				state.waybillTableData.param.startTime=state.waybillTableData.timeRange && state.waybillTableData.timeRange.length>0
					?state.waybillTableData.timeRange[0]:now.startOf('day').format();
				state.waybillTableData.param.endTime=state.waybillTableData.timeRange && state.waybillTableData.timeRange.length>1
					?state.waybillTableData.timeRange[1]:now.endOf('day').format();
				
				const waybillTodayRes = await proxy.$api.erp.waybill.getGoodsAndCustomerStatListByScope("freight",0, 0,state.waybillTableData.param);
				if(waybillTodayRes.errcode!=0){
					return;
				}
				state.waybillTableData.data = waybillTodayRes.data
				state.waybillTableData.total = waybillTodayRes.total
			} finally {
				state.waybillTableData.loading = false;
			}
		}
		const onSetBusinessState=(val:Boolean)=>{
			state.isMainBusinessState=val
		}
		const onGetTableData = async (status = 0) => {
			//	获取当日任务数据
			try {
				const waybillTodayRes = await proxy.$api.erp.waybill.getGoodsAndCustomerStatListByScope("freight",0, 0,state.waybillTableData.param);
				if(waybillTodayRes.errcode!=0){
					return;
				}
				state.waybillTableData.data = waybillTodayRes.data
				state.waybillTableData.total = waybillTodayRes.total
			} finally {
				state.waybillTableData.loading = false;
			}

			// 获取当日出勤车辆数据
			try {
				const vehicleRunRes = await proxy.$api.erp.waybill.getHomeVehicleList(0, 0, state.vehicleRunTableData.param)
				if (vehicleRunRes.errcode != 0) {
					return;
				}
				state.vehicleRunTableData.data = vehicleRunRes.data
				state.vehicleRunTableData.total = vehicleRunRes.total
			} finally {
				state.vehicleRunTableData.loading = false;
			}

			// 获取铁运数据
			try {
				const businessBillLineRes = await proxy.$api.erp.businessBillLine.getStatListByScope("main_business", state.scopeMode, state.scopeValue, state.mainBusinessBillLineTableData.param);
				if (businessBillLineRes.errcode != 0) {
					return;
				}
				state.mainBusinessBillLineTableData.data = businessBillLineRes.data;
				state.mainBusinessBillLineTableData.total = businessBillLineRes.data.length;
			} finally {
				state.mainBusinessBillLineTableData.loading = false;
			}

			// 获取贸易数据
			try {
				
				const businessBillLineRes = await proxy.$api.erp.businessBill.getListByScope("trade", state.scopeMode, state.scopeValue, state.tradeBusinessBillLineTableData.param);
				if (businessBillLineRes.errcode != 0) {
					return;
				}
				state.tradeBusinessBillLineTableData.data = businessBillLineRes.data;
				state.tradeBusinessBillLineTableData.total = businessBillLineRes.total;
			} finally {
				state.tradeBusinessBillLineTableData.loading = false;
			}

			//	获取当日停驶车辆数据
			try {
				const vehicleStopRes = await proxy.$api.erp.vehicle.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.vehicleStopTableData.param);
				if (vehicleStopRes.errcode != 0) {
					return;
				}
				state.vehicleStopTableData.data = vehicleStopRes.data;
				state.vehicleStopTableData.total = vehicleStopRes.total;
			} finally {
				state.vehicleStopTableData.loading = false;
			}
		}
		// 打开地图
		const onChildOpenMapDlg = (vehicleNumber: string, ishow: boolean) => {
			const childMapDlgRef = proxy.$refs.childMapDlgRef;
			console.debug("childMapDlgRef",childMapDlgRef)
			childMapDlgRef.openDialog(vehicleNumber, ishow);
		};
		// 打开车辆详情
		const toVehicleRemind = (id: string, ishow: boolean) => {
			router.push({
				name: 'api_commoninfo_vehicle',
				params: {
					kind: 'info',
					scopeMode:0,
					scopeValue:0,
				},
			});
		};
		// 打开司机详情
		const toDriverRemind = (id: string, ishow: boolean) => {
			router.push({
				name: 'api_baseinfo_driver',
				params: {
					kind: 'info',
					scopeMode:0,
					scopeValue:0,
				},
			});
		};
		// 打开保险详情
		const toInsuranceRemind = (id: string, ishow: boolean) => {
			router.push({
				name: 'api_baseinfo_vehicle_insurance',
				params: {
					kind: 'info',
					scopeMode:0,
					scopeValue:0,
				},
			});
		};
		// 打开运单管理页面
		const toWaybillView = (id: string, ishow: boolean) => {
			router.push({
				name: 'api_waybill_freight',
				params: {
					kind: 'freight',
					scopeMode:0,
					scopeValue:0,
				},
			});
		};

		//	分页改变
		const onHandleSizeChange = (val: number, index: number) => {
			switch(index){
				case 1:
					state.waybillTableData.param.pageSize = val;
					break;
				case 2:
					state.vehicleRunTableData.param.pageSize = val;
					break;
				case 3:
					state.mainBusinessBillLineTableData.param.pageSize = val;
					break;
				case 4:
					state.vehicleStopTableData.param.pageSize = val;
					break;
			}
			onGetHomeStatData()
			onGetTableData()
		};
		//	分页改变
		const onHandleCurrentChange = (val: number, index: number) => {
			switch(index){
				case 1:
					state.waybillTableData.param.current = val;
					break;
				case 2:
					state.vehicleRunTableData.param.current = val;
					break;
				case 3:
					state.mainBusinessBillLineTableData.param.current = val;
					break;
				case 4:
					state.vehicleStopTableData.param.current = val;
					break;
			}
			onGetHomeStatData()
			onGetTableData()
		};

		// 页面加载时
		onMounted(() => {
			onGetHomeStatData();
			const now = dayjs();
			state.waybillTableData.timeRange=[now.startOf('day').format(),now.endOf('day').format()]
			state.waybillTableData.param.startTime=now.startOf('day').format();
			state.waybillTableData.param.endTime=now.endOf('day').format();

			state.mainBusinessBillLineTableData.param.startTime=now.startOf('year').format();
			state.mainBusinessBillLineTableData.param.timeSpan="year";
			state.tradeBusinessBillLineTableData.param.startTime=now.startOf('year').format();
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
			onGetHomeStatData,
			onWaybillTableSearch,
			onGetTableData,
			// onVehicleEditDlg,
			// onDriverEditDlg,
			// onInsuranceEditDlg,
			onHandleSizeChange,
			onHandleCurrentChange,
			onSetBusinessState,
			formatGender,
			dateFormatYMD,
			onChildOpenMapDlg,
			toVehicleRemind,
			toDriverRemind,
			toInsuranceRemind,
			toWaybillView,
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
