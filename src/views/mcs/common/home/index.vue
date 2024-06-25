<template>
	<div class="home-container">
		<el-row :gutter="15">
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
		</el-row>
		<!-- <el-row :gutter="15" style="display: flex; flex-direction: row;">
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<div class="" style=" background-color: brown; width: 100%; height: 100px; border-radius:10px;">{{tableData.vehicleWarningCount}}
				</div>
			</el-col>
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<div class="" style=" background-color: green; width: 100%; height: 100px; border-radius:10px;">{{tableData.driverWarningCount}}
				</div>
			</el-col>
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<div class="" style=" background-color: orange; width: 100%; height: 100px; border-radius:10px;">{{tableData.vehicleInsuranceWarningCount}}
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="15" style="display: flex; flex-direction: row;">
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
				</el-table>
			</el-col>
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
				</el-table>
			</el-col>
			<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb15">
				<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
				</el-table>
			</el-col>
		</el-row> -->
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
			tableData: {
				data: [],
				total: 0,
				loading: false,
				vehicleWarningCount:0,
				driverWarningCount:0,
				vehicleInsuranceWarningCount:0,
				startTime: new Date().getTime(),
				endTime: new Date().getTime(),
				param: {
					startTime: '',
					endTime: '',
				}
			},
			myCharts: [],
		});
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		// 当前时间提示语
		const currentTime = computed(() => {
			return formatAxis(new Date());
		});
		const dateFormat = (timestamp) => {
			const date = new Date(timestamp);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		}
		// 车辆证件超期预警统计
		const GetVehicleWarningCount = async () => {
			try {
				const res = await proxy.$api.erp.vehicle.getVehicleWarningCount(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
					if (res.errcode != 0) {
						return;
					}
				state.tableData.vehicleWarningCount = res.data
			} finally {
				state.tableData.loading = false;
			}
		}
		// 司机驾驶证超期预警统计
		const GetDriverWarningCount = async () => {
			try {
				const res = await proxy.$api.erp.driver.getDriverWarningCount(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
					if (res.errcode != 0) {
						return;
					}
				state.tableData.driverWarningCount = res.data
			} finally {
				state.tableData.loading = false;
			}
		}
		// 车辆保险超期预警统计
		const GetVehicleInsuranceWarningCount = async () => {
			try {
				const res = await proxy.$api.erp.vehicleinsurance.getVehicleInsuranceWarningCount(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
					if (res.errcode != 0) {
						return;
					}
				state.tableData.vehicleInsuranceWarningCount = res.data
			} finally {
				state.tableData.loading = false;
			}
		}
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
			state.tableData.param.startTime = dateFormat(state.tableData.startTime);
			state.tableData.param.endTime = dateFormat(state.tableData.endTime + 31 * 86400000);
			// GetVehicleWarningCount();
			// GetDriverWarningCount();
			// GetVehicleInsuranceWarningCount();

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
			dateFormat,
			GetVehicleWarningCount,
			GetDriverWarningCount,
			GetVehicleInsuranceWarningCount,
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
