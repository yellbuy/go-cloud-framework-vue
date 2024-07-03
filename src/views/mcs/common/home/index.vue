<template>
	<div class="home-container">
		<el-row>
			<el-col style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
				<el-card shadow="hover" style="background-color: #31A28E; width: 100%; height: 95px; border-radius:15px; margin: 10px; transition: all 0.2s;">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{vehicleWarning.count}}</el-row>
							<el-row style="font-size: 15px; color: white;">车辆证件临期超期统计</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-truck" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
				<el-card shadow="hover" style=" background-color: #029BDD; width: 100%; height: 95px; border-radius:15px; margin: 10px;">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{driverWarning.count}}</el-row>
							<el-row style="font-size: 15px; color: white;">司机证件临期超期统计</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-address-card" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
				<el-card shadow="hover" style=" background-color: #894DB8; width: 100%; height: 95px; border-radius:15px; margin: 10px;">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{vehicleInsuranceWarning.count}}</el-row>
							<el-row style="font-size: 15px; color: white;">车辆保险临期超期统计</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-file-text" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
				<el-card shadow="hover" style=" background-color: #E35E00; width: 100%; height: 95px; border-radius:15px; margin: 10px;">
					<el-row>
						<el-col :xs="24" :sm="16">
							<el-row style="font-size: 30px; color: white;">{{notice.count}}</el-row>
							<el-row style="font-size: 15px; color: white;">3日内站内消息统计</el-row>
						</el-col>
						<el-col :xs="24" :sm="8" style="display: flex; align-items: center; justify-content: flex-end;">
							<i class="fa fa-volume-up" aria-hidden="true" style="font-size: 40px; color: white;" />
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<!-- 消息通知 -->
			<el-col :xs="24" :sm="12">
				<el-card shadow="hover" style="border-radius:15px; margin: 10px;">
					<template #header>
						<span style="font-size: 16px;">车辆证件临期超期列表</span>
						<span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span>
					</template>
					<el-table
						:data="vehicleWarning.list"
						v-loading="vehicleWarning.loading"
						height="190px"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="VehicleNumber" label="车牌号" align="left" show-overflow-tooltip width="80" fixed />
						<el-table-column prop="Driver" label="司机" width="80" show-overflow-tooltip></el-table-column>		
						<el-table-column label="外部车" width="60" show-overflow-tooltip>
							<template #default="scope">
								<el-switch
									v-model="scope.row.IsExternal"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.Edit'"
									@change="proxy.$api.common.table.updateById('erp_vehicle', 'is_external', scope.row.Id, scope.row.IsExternal)"
									:active-text="$t('message.action.yes')"
									:inactive-text="$t('message.action.no')"
									:active-value="1"
									:inactive-value="0"/>
								<el-tag type="success" effect="plain" v-if="scope.row.IsExternal" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.yes') }}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.no') }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="Shipper" label="相关方" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column prop="DrivingLicenseEndDate" label="行驶证结束日期" width="110" :formatter="dateFormatYMD" align="right"></el-table-column>
						<el-table-column prop="TransportLicenseEndDate" label="运输证结束日期" width="110" :formatter="dateFormatYMD" align="right"></el-table-column>
						<el-table-column prop="Tname" label="所属公司" show-overflow-tooltip></el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(65)" fixed="right">
							<template #default="scope">
								<el-button text bg @click="onVehicleEditDlg(scope.row.Id, true)">
									{{ $t('message.action.see') }}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination style=""
						small
						@size-change="(val) => onHandleSizeChange(val, 1)"
						@current-change="(val) => onHandleCurrentChange(val, 1)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="vehicleWarning.param.pageNum"
						background
						v-model:page-size="vehicleWarning.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="vehicleWarning.count" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="12">
				<el-card shadow="hover" style="border-radius:15px; margin: 10px;">
					<template #header>
						<span style="font-size: 16px;">司机证件临期超期列表</span>
						<span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span>
					</template>
					<el-table
						:data="driverWarning.list"
						v-loading="driverWarning.loading"
						height="190px"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="Name" label="姓名" width="80" align="left" show-overflow-tooltip fixed></el-table-column>
						<el-table-column prop="Gender" label="性别" width="50" align="left" :formatter="formatGender" show-overflow-tooltip></el-table-column>
						<el-table-column prop="Mobile" label="手机号" width="100" align="right" show-overflow-tooltip></el-table-column>
						<el-table-column prop="IdnoEndDate" label="身份证截止日" width="100" align="left" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
						<el-table-column prop="DriverLicenseType" label="驾照类型" width="70" align="left" show-overflow-tooltip></el-table-column>
						<el-table-column prop="IdnoEndDate" label="驾照截止日" width="100" align="left" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
						<el-table-column prop="Tname" label="所属公司"  align="left" show-overflow-tooltip></el-table-column>
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
						v-model:current-page="driverWarning.param.pageNum"
						background
						v-model:page-size="driverWarning.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="driverWarning.count" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="12">
				<el-card shadow="hover" style="border-radius:15px; margin: 10px;">
					<template #header>
						<span style="font-size: 16px;">车辆保险临期超期列表</span>
						<span style="font-size: 12px; color: gray;">(包括已经超期及30日内即将超期)</span>
					</template>
					<el-table
						:data="vehicleInsuranceWarning.list"
						v-loading="vehicleInsuranceWarning.loading"
						height="190px"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="50" fixed />
						<el-table-column prop="VehicleNumber" label="车牌号" align="left" show-overflow-tooltip width="80" fixed />
						<el-table-column prop="No" label="保险单号" width="100" align="right" show-overflow-tooltip fixed></el-table-column>
						<el-table-column prop="EndTime" label="保险到期日" width="100" align="center" :formatter="dateFormatYMD"  show-overflow-tooltip />
						<el-table-column prop="CompulsoryEndDate" label="交强险到期日" width="100" align="center" :formatter="dateFormatYMD"  show-overflow-tooltip />
						<el-table-column prop="CommercialEndDate" label="商业险到期日" width="100" align="center" :formatter="dateFormatYMD"  show-overflow-tooltip />
						<el-table-column prop="CompanyName" label="所属公司" align="left" show-overflow-tooltip />
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
						v-model:current-page="vehicleInsuranceWarning.param.pageNum"
						background
						v-model:page-size="vehicleInsuranceWarning.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="vehicleInsuranceWarning.count" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="12">
				<el-card shadow="hover" style="border-radius:15px; margin: 10px;">
					<template #header style="flex: 0 0 auto;">
						<span style="font-size: 16px;">3日站内消息列表</span>
						<span style="font-size: 12px; color: gray;">(包括3日内新消息)</span>
					</template>
					<div class="personal-info-box" style="height: 190px;">
						<ul class="personal-info-ul">
							<li v-for="(v, k) in notice.list" :key="k" class="personal-info-li">
								<a :href="v.link" target="_block" class="personal-info-li-title">{{ v.title }}</a>
							</li>
						</ul>
					</div>
					<el-pagination
						small
						@size-change="(val) => onHandleSizeChange(val, 4)"
						@current-change="(val) => onHandleCurrentChange(val, 4)"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="notice.param.pageNum"
						background
						v-model:page-size="notice.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="notice.count" />
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="15" style="display: flex; flex-direction: row;">
		</el-row>
		<vehicleEditDlg ref="vehicleEditDlg" />
		<driverEditDlg ref="driverEditDlg" />
		<insuranceEditDlg ref="insuranceEditDlg" />
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, nextTick, onActivated, onMounted, ref, reactive, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import { formatAxis } from '/@/utils/formatTime';
import commonFunction from '/@/utils/commonFunction';
import vehicleEditDlg from '../vehicle/component/vehicleEdit.vue';
import driverEditDlg from '../driver/component/driverEdit.vue';
import insuranceEditDlg from '../insurance/component/insuranceEdit.vue';
export default {
	name: 'admin',
	components: { vehicleEditDlg, driverEditDlg, insuranceEditDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const router = useRouter();
		const vehicleEditDlg = ref();
		const driverEditDlg = ref();
		const insuranceEditDlg = ref();
		console.debug("router：",router.currentRoute.value)
		const store = useStore();
		const state = reactive({
			kind:'info',
			myCharts: [],
			vehicleWarning: {
				loading: false,
				count:0,
				list:[],
				param: {
					state: -1,
					isExternal: -1,
					pageNum: 1,
					pageSize: 10,
				}
			},
			driverWarning:{
				loading: false,
				count:0,
				list:[],
				param: {
					state: -1,
					isExternal: -1,
					pageNum: 1,
					pageSize: 10,
				}
			},
			vehicleInsuranceWarning:{
				loading: false,
				count:0,
				list:[],
				param: {
					state: -1,
					isExternal: -1,
					pageNum: 1,
					pageSize: 10,
				}
			},
			notice:{
				loading: false,
				count:0,
				list:[],
				param: {
					state: -1,
					isExternal: -1,
					pageNum: 1,
					pageSize: 10,
				}
			},
		});
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		// 当前时间提示语
		const currentTime = computed(() => {
			return formatAxis(new Date());
		});
		
		// 车辆证件超期预警统计
		const getVehicleWarningData = async () => {
			try {
				const resVehicleWarning = await proxy.$api.erp.vehicle.getVehicleWarning(state.kind, 0, 0, state.vehicleWarning.param);
				if (resVehicleWarning.errcode == 0) {
					state.vehicleWarning.count = resVehicleWarning.total
					state.vehicleWarning.list = resVehicleWarning.data
				}else{
					console.log("error:",resVehicleWarning.errmsg)
				}
			}finally {
				state.vehicleWarning.loading = false;
			}
		}

		// 司机驾驶证超期预警统计
		const getDriverWarningData = async () => {
			try {
				const resDriverWarning = await proxy.$api.erp.driver.getDriverWarning(state.kind, 0, 0, state.driverWarning.param);
				if (resDriverWarning.errcode == 0) {
					state.driverWarning.count = resDriverWarning.total
					state.driverWarning.list = resDriverWarning.data
				}else{
					console.log("error:",resDriverWarning.errmsg)
				}
			}finally {
				state.driverWarning.loading = false;
			}
		}

		// 车辆保险超期预警统计
		const getVehicleInsuranceWarningData = async () => {
			try {
				const resVehicleInsuranceWarning = await proxy.$api.erp.vehicleinsurance.getVehicleInsuranceWarning(state.kind, 0, 0, state.vehicleInsuranceWarning.param);
				if (resVehicleInsuranceWarning.errcode == 0) {
					state.vehicleInsuranceWarning.count = resVehicleInsuranceWarning.total
					state.vehicleInsuranceWarning.list = resVehicleInsuranceWarning.data
				}else{
					console.log("error:",resVehicleInsuranceWarning.errmsg)
				}
			}finally {
				state.vehicleInsuranceWarning.loading = false;
			}
		}

		// 站内消息统计
		const getNoticeData = async () => {
			try {
				const resNoticeData = await proxy.$api.cms.article.getThreeDaysListByScope(state.kind, 0, 0, state.notice.param)
				if (resNoticeData.errcode == 0) {
					state.notice.count = resNoticeData.total
					state.notice.list = resNoticeData.data
				}else{
					console.log("error:",resNoticeData.errmsg)
				}
			}finally {
				state.notice.loading = false;
			}
		}

		// 打开编辑弹窗
		const onVehicleEditDlg = (id: string, ishow: boolean) => {
			vehicleEditDlg.value.openDialog(state.kind, id, ishow);
		};
		// 打开弹窗
		const onDriverEditDlg = (id: string, ishow: boolean) => {
			driverEditDlg.value.openDialog(state.kind, id, ishow);
		};
		// 打开弹窗
		const onIndexEditDlg = (id: string, ishow: boolean) => {
			insuranceEditDlg.value.openDialog(state.kind, id, ishow);
		};

		//	分页改变
		const onHandleSizeChange = (val: number, index: number) => {
			switch (index){
				case 1:
					state.vehicleWarning.param.pageSize = val;
					getVehicleWarningData();
					break;
				case 2:
					state.driverWarning.param.pageSize = val;
					getDriverWarningData();
					break;
				case 3:
					state.vehicleInsuranceWarning.param.pageSize = val;
					getVehicleInsuranceWarningData();
					break;
				case 4:
					state.notice.param.pageSize = val;
					getNoticeData();
					break;
			}
		};
		//	分页改变
		const onHandleCurrentChange = (val: number, index: number) => {
			switch (index){
				case 1:
					state.vehicleWarning.param.pageNum = val;
					getVehicleWarningData();
					break;
				case 2:
					state.driverWarning.param.pageNum = val;
					getDriverWarningData();
					break;
				case 3:
					state.vehicleInsuranceWarning.param.pageNum = val;
					getVehicleInsuranceWarningData();
					break;
				case 4:
					state.notice.param.pageNum = val;
					getNoticeData();
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
			getVehicleWarningData()
			getDriverWarningData()
			getVehicleInsuranceWarningData()
			getNoticeData()
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
			getVehicleWarningData,
			getDriverWarningData,
			getVehicleInsuranceWarningData,
			getNoticeData,
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
