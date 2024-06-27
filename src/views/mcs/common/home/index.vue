<template>
	<div class="home-container">
		<!-- <el-row :gutter="15">
			<el-col class="mb15">
				<div class="home-card-item home-card-first">
					<div class="flex-margin flex">
						<img :src="getUserInfos.avatar" />
						<div class="home-card-first-right ml15">
							<div class="flex-margin">
								<div class="home-card-first-right-title">
									{{ currentTime }}，{{ getUserInfos.username === '' ? 'test' : getUserInfos.realname || getUserInfos.username }}！
								</div>
								<div class="home-card-first-right-msg mt5">{{ getUserInfos.isAdmin ? '超级管理员' : '普通用户' }}</div>
							</div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row> -->
		<el-row :gutter="15">
			<el-col class="mb15">
				<div class="home-card-item home-card-first">
					首页界面开发调整中.......
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="15" style="display: flex; flex-direction: row;">
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<div class="" style=" background-color: brown; width: 100%; height: 100px; border-radius:10px;">{{vehicleWarning.count}}
				</div>
			</el-col>
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<div class="" style=" background-color: green; width: 100%; height: 100px; border-radius:10px;">{{driverWarning.count}}
				</div>
			</el-col>
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<div class="" style=" background-color: orange; width: 100%; height: 100px; border-radius:10px;">{{vehicleInsuranceWarning.count}}
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="15" style="display: flex; flex-direction: row;">
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<el-table
					:data="vehicleWarning.list"
					v-loading="vehicleWarning.loading"
					:height="proxy.$calcMainHeight(-75)"
					border
					stripe
					highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="VehicleNumber" label="车牌号" align="left" show-overflow-tooltip width="100" fixed />
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
			</el-col>
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<el-table
					:data="driverWarning.list"
					v-loading="driverWarning.loading"
					:height="proxy.$calcMainHeight(-75)"
					border
					stripe
					highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Name" label="姓名" width="100" align="left" show-overflow-tooltip fixed></el-table-column>
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
			</el-col>
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<el-table
					:data="vehicleInsuranceWarning.list"
					v-loading="vehicleInsuranceWarning.loading"
					:height="proxy.$calcMainHeight(-75)"
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
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, nextTick, onActivated, onMounted, reactive, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import { formatAxis } from '/@/utils/formatTime';
export default {
	name: 'admin',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const router = useRouter();
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
		return {
			GetVehicleWarningData,
			GetDriverWarningData,
			GetVehicleInsuranceWarningData,
			onHandleSizeChange,
			onHandleCurrentChange,
			proxy,
			getUserInfos,
			currentTime,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
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
