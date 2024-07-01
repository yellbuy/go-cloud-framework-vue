<template>
	<div class="home-container">
		<el-row>
			<el-col style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
				<el-card shadow="hover" style=" background-color: #31A28E; width: 100%; height: 95px; border-radius:15px; margin: 10px;">
					<div>{{vehicleWarning.count}}
					</div>
				</el-card>
				<el-card shadow="hover" style=" background-color: #029BDD; width: 100%; height: 95px; border-radius:15px; margin: 10px;">
					<div>{{driverWarning.count}}
					</div>
				</el-card>
				<el-card shadow="hover" style=" background-color: #894DB8; width: 100%; height: 95px; border-radius:15px; margin: 10px;">
					<div >{{vehicleInsuranceWarning.count}}
					</div>
				</el-card>
				<el-card shadow="hover" style=" background-color: #E35E00; width: 100%; height: 95px; border-radius:15px; margin: 10px;">
					<div>{{vehicleInsuranceWarning.count}}
					</div>
				</el-card>
			</el-col>
			<!-- 消息通知 -->
			<el-col :xs="24" :sm="12">
				<el-card shadow="hover" style="border-radius:15px; margin: 10px;">
					<template #header>
						<span>车辆证件超期预警统计</span>
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
						<el-table-column prop="Shipper" label="相关方" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column prop="DrivingLicenseEndDate" label="行驶证结束日期" width="120" :formatter="dateFormatYMD" align="right"></el-table-column>
						<el-table-column prop="TransportLicenseEndDate" label="运输证结束日期" width="120" :formatter="dateFormatYMD" align="right"></el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(60)" fixed="right">
							<template #default="scope">
								<el-button text bg @click="onOpenEditDlg(scope.row.Id, true)">
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
						<span>司机证件超期预警统计</span>
						<span class="personal-info-more">更多</span>
					</template>
					<el-table
						:data="driverWarning.list"
						v-loading="driverWarning.loading"
						height="190px"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" fixed />
						<el-table-column prop="Name" label="姓名" width="100" align="left" show-overflow-tooltip fixed></el-table-column>
						<el-table-column prop="Gender" label="性别" width="100" align="left" :formatter="formatGender" show-overflow-tooltip></el-table-column>
						<el-table-column prop="Mobile" label="手机号" width="120" align="right" show-overflow-tooltip></el-table-column>
						<el-table-column prop="DriverLicenseType" label="驾照类型" width="120" align="left" show-overflow-tooltip></el-table-column>
						<el-table-column prop="IdnoEndDate" label="驾照截止日" width="120" align="left" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
							<template #default="scope">
								<el-button text bg @click="onOpenEditDlg(scope.row.Id, true)">
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
						<span>车辆保险超期预警统计</span>
						<span class="personal-info-more">更多</span>
					</template>
					<el-table
						:data="vehicleInsuranceWarning.list"
						v-loading="vehicleInsuranceWarning.loading"
						height="190px"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" fixed />
						<el-table-column prop="VehicleNumber" label="车牌号" align="left" show-overflow-tooltip width="100" fixed />
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
					<template #header>
						<span>站内消息通知</span>
						<span class="personal-info-more">更多</span>
					</template>
					<div class="personal-info-box">
						<ul class="personal-info-ul">
							<li v-for="(v, k) in newsInfoList" :key="k" class="personal-info-li">
								<a :href="v.link" target="_block" class="personal-info-li-title">{{ v.title }}</a>
							</li>
						</ul>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="15" style="display: flex; flex-direction: row;">
		</el-row>
		<editDlg ref="editDlgRef" />
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, nextTick, onActivated, onMounted, ref, reactive, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import { formatAxis } from '/@/utils/formatTime';
import commonFunction from '/@/utils/commonFunction';
import editDlg from '../vehicle/component/vehicleEdit.vue';
export default {
	name: 'admin',
	components: { editDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const router = useRouter();
		const editDlgRef = ref();
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
					pageSize: 20,
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
					pageSize: 20,
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
					pageSize: 20,
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
		const GetVehicleWarningData = async () => {
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
		const GetDriverWarningData = async () => {
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
		const GetVehicleInsuranceWarningData = async () => {
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

		// 打开编辑弹窗
		const onOpenEditDlg = (id: string, ishow: boolean) => {
			editDlgRef.value.openDialog(state.kind, id, ishow);
		};

		//	分页改变
		const onHandleSizeChange = (val: number, index: number) => {
			switch (index){
				case 1:
					state.vehicleWarning.param.pageSize = val;
					GetVehicleWarningData();
					break;
				case 2:
					state.driverWarning.param.pageSize = val;
					GetDriverWarningData();
					break;
				case 3:
					state.vehicleInsuranceWarning.param.pageSize = val;
					GetVehicleInsuranceWarningData();
					break;
			}
		};
		//	分页改变
		const onHandleCurrentChange = (val: number, index: number) => {
			switch (index){
				case 1:
					state.vehicleWarning.param.pageNum = val;
					GetVehicleWarningData();
					break;
				case 2:
					state.driverWarning.param.pageNum = val;
					GetDriverWarningData();
					break;
				case 3:
					state.vehicleInsuranceWarning.param.pageNum = val;
					GetVehicleInsuranceWarningData();
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
			GetVehicleWarningData()
			GetDriverWarningData()
			GetVehicleInsuranceWarningData()
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
			GetVehicleWarningData,
			GetDriverWarningData,
			GetVehicleInsuranceWarningData,
			onOpenEditDlg,
			onHandleSizeChange,
			onHandleCurrentChange,
			formatGender,
			dateFormatYMD,
			editDlgRef,
			proxy,
			getUserInfos,
			currentTime,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.card{
	display: flex;
	
	width: 100%;
	height: 103px;
	background: var(--el-text-color-secondary);
	border-radius: 4px;
}
.home-container {
	overflow-x: hidden;
	.home-card-item {
		width: 100%;
		height: 103px;
		background: var(--el-text-color-secondary);
		border-radius: 4px;
		transition: all ease 0.3s;
		&:hover {
			box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
			transition: all ease 0.3s;
		}
	}
	.home-card-item-box {
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
		&:hover {
			i {
				right: 0px !important;
				bottom: 0px !important;
				transition: all ease 0.3s;
			}
		}
		i {
			position: absolute;
			right: -10px;
			bottom: -10px;
			font-size: 70px;
			transform: rotate(-30deg);
			transition: all ease 0.3s;
		}
		.home-card-item-flex {
			padding: 0 20px;
			color: var(--color-whites);
			.home-card-item-title,
			.home-card-item-tip {
				font-size: 13px;
			}
			.home-card-item-title-num {
				font-size: 18px;
			}
			.home-card-item-tip-num {
				font-size: 13px;
			}
		}
	}
	.home-card-first {
		background: var(--el-color-white);
		border: 1px solid var(--el-border-color-light, #ebeef5);
		display: flex;
		align-items: center;
		img {
			width: 60px;
			height: 60px;
			border-radius: 100%;
			border: 2px solid var(--color-primary-light-5);
		}
		.home-card-first-right {
			flex: 1;
			display: flex;
			flex-direction: column;
			.home-card-first-right-title {
				color: var(--el-color-black);
			}
			.home-card-first-right-msg {
				font-size: 13px;
				color: var(--el-text-color-secondary);
			}
		}
	}
	.home-monitor {
		height: 200px;
		.flex-warp-item {
			width: 50%;
			height: 100px;
			display: flex;
			.flex-warp-item-box {
				margin: auto;
				height: auto;
				text-align: center;
				color: var(--el-text-color-primary);
			}
		}
	}
	.home-warning-card {
		height: 292px;
		::v-deep(.el-card) {
			height: 100%;
		}
	}
	.home-dynamic {
		height: 200px;
		.home-dynamic-item {
			display: flex;
			width: 100%;
			height: 60px;
			overflow: hidden;
			&:first-of-type {
				.home-dynamic-item-line {
					i {
						color: orange !important;
					}
				}
			}
			.home-dynamic-item-left {
				text-align: right;
				.home-dynamic-item-left-time1 {
				}
				.home-dynamic-item-left-time2 {
					font-size: 13px;
					color: var(--el-text-color-secondary);
				}
			}
			.home-dynamic-item-line {
				height: 60px;
				border-right: 2px dashed var(--el-border-color-light, #ebeef5);
				margin: 0 20px;
				position: relative;
				i {
					color: var(--color-primary);
					font-size: 12px;
					position: absolute;
					top: 1px;
					left: -6px;
					transform: rotate(46deg);
					background: var(--el-color-white);
				}
			}
			.home-dynamic-item-right {
				flex: 1;
				.home-dynamic-item-right-title {
					i {
						margin-right: 5px;
						border: 1px solid var(--el-border-color-light, #ebeef5);
						width: 20px;
						height: 20px;
						border-radius: 100%;
						padding: 3px 2px 2px;
						text-align: center;
						color: var(--color-primary);
					}
				}
				.home-dynamic-item-right-label {
					font-size: 13px;
					color: var(--el-text-color-secondary);
				}
			}
		}
	}
}
</style>
