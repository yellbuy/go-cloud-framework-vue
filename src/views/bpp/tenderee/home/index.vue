<template>
	<div class="home-container">
		<el-row :gutter="15">
			<el-col :sm="16" class="mb15">
				<div class="home-card-item home-card-first">
					<div class="ml24 flex quote-block tip pt12">
						<img :src="getUserInfos.avatar" />
						<div class="ml20 p5">
							<div class="mt12">
								<div class="font18">{{ currentTime }}，{{ tenant.Name || getUserInfos.realname || getUserInfos.account }}！</div>
								<div class="home-card-first-right-msg mt6">招采方</div>
							</div>
						</div>
					</div>
					<div class="ml10 mt50" v-no-auth:[moduleKey]="'btn.Update'">
						<el-alert title="待实名认证！请进行实名认证" type="warning" v-if="tenant.State == 0" :closable="false"></el-alert>
						<el-alert title="实名认证已成功" type="success" v-else-if="tenant.State == 1" :closable="false"></el-alert>
						<el-alert title="实名认证未通过" type="danger" v-else-if="tenant.State == -1" :closable="false"></el-alert>
					</div>
					<div class="ml10 mt50" v-auth:[moduleKey]="'btn.Update'">
						<el-button type="warning" @click="onGotoEdit" size="default" v-if="tenant.State == 0">待实名认证！点击立即去进行实名认证</el-button>
						<el-button type="success" @click="onGotoEdit" size="default" v-else-if="tenant.State == 1" plain
							>已实名认证！点击去更新实名认证信息</el-button
						>
						<el-button type="danger" @click="onGotoEdit" size="default" v-else-if="tenant.State == 2"
							>实名认证未通过！点击立即重新进行实名认证</el-button
						>
					</div>
				</div>
			</el-col>
			<el-col :sm="8" class="mb15">
				<div class="yb-big-data home-card-item">
					<div class="flex-warp-item-box">
						<div class="flex-title">近三年项目统计</div>
						<div class="task">
							<div class="task-item task-first-item">
								<div class="task-item-value task-first">25</div>
								<div class="task-item-label">参与项目</div>
							</div>
							<div class="task-item">
								<div class="task-item-box task-warning">
									<div class="task-item-value">12</div>
									<div class="task-item-label">将开始</div>
								</div>
							</div>
							<div class="task-item">
								<div class="task-item-box task-success">
									<div class="task-item-value">3</div>
									<div class="task-item-label">已中选</div>
								</div>
							</div>
							<div class="task-item">
								<div class="task-item-box task-primary">
									<div class="task-item-value">5</div>
									<div class="task-item-label">已公示</div>
								</div>
							</div>
						</div>
						<div class="progress">
							<div class="progress-item mt5">
								<span>中选率</span>
								<div class="progress-box">
									<el-progress :percentage="70" color="#67C23A"></el-progress>
								</div>
							</div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-row :gutter="15" class="mb15">
			<el-col :xs="24" :sm="14" :md="14" :lg="16" :xl="16" class="home-warning-media">
				<el-card shadow="hover" class="home-warning-card">
					<template #header>
						<div class="card-header">
							<el-row :gutter="15">
								<el-col :sm="12">
									<span>进行中的项目</span>
								</el-col>
								<el-col :sm="12" class="text-right">
									<el-link type="primary">更多</el-link>
								</el-col>
							</el-row>
						</div>
						</template>
					<el-table :data="tableData.data" style="width: 100%" stripe>
						<el-table-column prop="name" label="项目名称"></el-table-column>
						<el-table-column prop="date" label="评选时间"></el-table-column>
						<el-table-column prop="address" :label="$t('message.table.th3')"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8" class="home-dynamic-media">
				<el-card shadow="hover" header="快速开始 / 便捷导航">
					<div class="home-dynamic">
						<el-scrollbar>
							
							<el-row :gutter="15">
								<el-col :sm="8">
									<el-link type="primary">比选项目</el-link>
								</el-col>
								<el-col :sm="8">
									<el-link type="primary">已结束项目</el-link>
								</el-col>
							</el-row>
							<el-divider border-style="dashed" />
							<el-row :gutter="15">
								<el-col :sm="8">
									资质审核
								</el-col>
								<el-col :sm="8">
									<el-badge :value="2" type="warning" :max="9">
										<el-button type="primary" plain>待审核</el-button>
									</el-badge>
								</el-col>
								<el-col :sm="8">
									<el-badge :value="1" class="item" :max="9">
										<el-button type="danger" plain>已驳回</el-button>
									</el-badge>
								</el-col>
							</el-row>
						</el-scrollbar>
					</div>
				</el-card>
			</el-col>
		</el-row>
		
		<el-row class="mb15">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-card shadow="hover" header="系统日志">
					<div style="height: 200px" ref="homeOvertimeRef"></div>
				</el-card>
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
		const moduleKey = 'api_sys_home_alias';
		const router = useRouter();
		console.debug('router：', router.currentRoute.value);
		//console.debug("route:",$route)
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const state = reactive({
			moduleKey: moduleKey,
			tenant: {},
			tableData: {
				data: [
					{
						date: '2016-05-02 10:00:00',
						name: '项目一1号标段',
						address: '烟感2.1%OBS/M',
					},
					{
						date: '2016-05-04 10:00:00',
						name: '项目二2号标段',
						address: '温度30℃',
					},
					{
						date: '2016-05-01 10:00:00',
						name: '项目三3号标段',
						address: '湿度57%RH',
					},
				],
			},
			myCharts: [],
		});
		const onGotoEdit = () => {
			router.push(`/bpp/home/tenantEdit/bpp`);
		};
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		// 当前时间提示语
		const currentTime = computed(() => {
			return formatAxis(new Date());
		});

		const loadTenant = async () => {
			const res = await proxy.$api.base.tenant.getById(getUserInfos.value.tid);
			if (res.errcode == 0) {
				state.tenant = res.data;
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
		// 批量设置 echarts resize
		const initEchartsResize = () => {
			window.addEventListener('resize', initEchartsResizeFun);
		};
		// 页面加载时
		onMounted(() => {
			initEchartsResize();
			loadTenant();
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
			onGotoEdit,
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
		height: 150px;
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
			width: 80px;
			height: 80px;
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
