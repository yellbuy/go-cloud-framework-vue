<template>
	<div class="home-container">
		<el-row :gutter="15">
			<el-col :sm="6" class="mb15">
				<div class="home-card-item home-card-first">
					<div class="flex-margin flex">
						
						<img :src="getUserInfos.avatar" />
						<div class="home-card-first-right ml15">
							<div class="flex-margin">
								<div class="home-card-first-right-title">
									{{ currentTime }}，{{ getUserInfos.realname || getUserInfos.username }}！
								</div>
								<div class="home-card-first-right-msg mt5">{{ getUserInfos.username === 'admin' ? '超级管理员' : '普通用户' }}</div>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :sm="6" class="mb15">
				<div class="home-card-item home-card-item-box" :style="{ background: '#F95959' }">
					<div class="home-card-item-flex">
						<div class="home-card-item-title pb3">全部档案</div>
						<div class="home-card-item-title-num pb6" id="statDataTotalCount"></div>
						
					</div>
					<i class="iconfont icon-jinridaiban" :style="{ color: '#F86C6B' }"></i>
				</div>
			</el-col>
			<el-col :sm="6" class="mb15">
				<div class="home-card-item home-card-item-box" :style="{ background: '#8595F4' }">
					<div class="home-card-item-flex">
						<div class="home-card-item-title pb3">今日档案</div>
						<div class="home-card-item-title-num pb6" id="statDataTodayCount"></div>
						
					</div>
					<i class="iconfont icon-AIshiyanshi" :style="{ color: '#92A1F4' }"></i>
				</div>
			</el-col>
			<el-col :sm="6" class="mb15">
				<div class="home-card-item home-card-item-box" :style="{ background: '#FEBB50' }">
					<div class="home-card-item-flex">
						<div class="home-card-item-title pb3">测评总数</div>
						<div class="home-card-item-title-num pb6" id="statDataFollowUpCount"></div>
						
					</div>
					<i class="iconfont icon-shenqingkaiban" :style="{ color: '#FDC566' }"></i>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="15">
			<el-col :sm="12" class="mb15">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<div class="flex-title">风险分析<span class="flex-title-small ml10">单位：(人)</span></div>
						
						<div class="flex-content">
							<div :style="{height: proxy.$calcMainHeight(-120)}" ref="chartsWarningRef"></div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :sm="12" class="mb15">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<div class="flex-title">
							<span>进展分析</span>
							<span class="flex-title-small ml10">单位：(人)</span>
						</div>
						<div class="flex-content">
							<div :style="{height: proxy.$calcMainHeight(-120)}" ref="chartsInvestmentRef"></div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { CountUp } from 'countup.js';
import * as echarts from 'echarts';
import { computed, getCurrentInstance, nextTick, onActivated, onMounted, reactive, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { activitiesList, environmentList, topCardItemList } from './mock';
import { useStore } from '/@/store/index';
import { formatAxis } from '/@/utils/formatTime';
export default {
	name: 'admin',
	setup() {
		const router = useRouter();
		console.debug("router：",router.currentRoute.value)
		//console.debug("route:",$route)
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const store = useStore();
		const kind = route.params.kind||'common';
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const state = reactive({
			kind,
			scopeMode,
			scopeValue,
			topCardItemList,
			environmentList,
			activitiesList,
			tableData: {
				data: [
					{
						date: '2016-05-02',
						name: '1号实验室',
						address: '烟感2.1%OBS/M',
					},
					{
						date: '2016-05-04',
						name: '2号实验室',
						address: '温度30℃',
					},
					{
						date: '2016-05-01',
						name: '3号实验室',
						address: '湿度57%RH',
					},
				],
			},
			statData:{

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
		// const loadData=async ()=>{
		// 	const res = await proxy.$api.hcis.healthRecord.getStatByScope(state.kind, state.scopeMode, state.scopeValue);
		// 	if (res.errcode != 0) {
		// 		return;
		// 	}
		// 	state.statData = res.data;
		// }
		// 初始化数字滚动
		const initData = async () => {
			const res = await proxy.$api.hcis.healthRecord.getStatByScope(state.kind, state.scopeMode, state.scopeValue);
			if (res.errcode != 0) {
				return;
			}
			state.statData = res.data;
			initChartsWarning()
			initChartsProgress()
			nextTick(() => {
				new CountUp('statDataTotalCount', state.statData.TotalCount).start();
				new CountUp('statDataTodayCount', state.statData.TodayCount).start();
				new CountUp('statDataFollowUpCount', state.statData.FollowUpCount).start();
				// new CountUp('tipNum1', Math.random() * 1000).start();
				// new CountUp('tipNum2', Math.random() * 1000).start();
				// new CountUp('tipNum3', Math.random() * 1000).start();
			});
			
		};
		// 风险统计
		const initChartsWarning = () => {
			const myChart = echarts.init(proxy.$refs.chartsWarningRef);
			const list=[];
			for(let i=0;i<state.statData.HealthRecordChart.LevelNameList.length;i++){
				list.push({
					value:state.statData.HealthRecordChart.LevelCountList[i],
					name:state.statData.HealthRecordChart.LevelNameList[i]})
			}
			console.log("list",list)
			const option = {
				grid: {
					top: 50,
					right: 20,
					bottom: 30,
					left: 30,
				},
				tooltip: {
					trigger: 'item',
				},
				series: [
					{
						name: '风险分析',
						type: 'pie',
						radius: [20, 200],
						center: ['50%', '50%'],
						roseType: 'area',
						itemStyle: {
							borderRadius: 6,
						},
						data: list,
					},
				],
			};
			myChart.setOption(option);
			state.myCharts.push(myChart);
		};
		// 进度统计
		const initChartsProgress = () => {
			const myChart = echarts.init(proxy.$refs.chartsInvestmentRef);
			const option = {
				grid: {
					top: 15,
					right: 15,
					bottom: 20,
					left: 30,
				},
				tooltip: {
					trigger: 'axis',
				},
				xAxis: {
					type: 'category',
					data: state.statData.HealthRecordChart.ProgressNameList,
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						data: state.statData.HealthRecordChart.ProgressCountList,
						type: 'bar',
					},
				],
			};
			myChart.setOption(option);
			state.myCharts.push(myChart);
		};
		// 商品销售情
		const initHomeLaboratory = () => {
			const myChart = echarts.init(proxy.$refs.homeLaboratoryRef);
			const option = {
				grid: {
					top: 50,
					right: 20,
					bottom: 30,
					left: 30,
				},
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data: ['预购队列', '最新成交价'],
					right: 13,
				},
				color: [
					'#63caff',
					'#49beff',
					'#03387a',
					'#03387a',
					'#03387a',
					'#6c93ee',
					'#a9abff',
					'#f7a23f',
					'#27bae7',
					'#ff6d9d',
					'#cb79ff',
					'#f95b5a',
					'#ccaf27',
					'#38b99c',
					'#93d0ff',
					'#bd74e0',
					'#fd77da',
					'#dea700',
				],
				xAxis: {
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				},
				yAxis: [
					{
						type: 'value',
						name: '价格',
					},
				],
				series: [
					{
						name: '预购队列',
						type: 'bar',
						data: [200, 85, 112, 275, 305, 415, 441, 405, 275, 305, 415, 441],
						itemStyle: {
							barBorderRadius: [4, 4, 0, 0],
							color: {
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								type: 'linear',
								global: false,
								colorStops: [
									{
										offset: 0,
										color: '#0b9eff',
									},
									{
										offset: 1,
										color: '#63caff',
									},
								],
							},
						},
					},
					{
						name: '最新成交价',
						type: 'line',
						data: [50, 85, 22, 155, 170, 25, 224, 245, 285, 300, 415, 641],
						itemStyle: {
							color: '#febb50',
						},
					},
				],
			};
			myChart.setOption(option);
			state.myCharts.push(myChart);
		};
		// 履约超时预警
		const initHomeOvertime = () => {
			const myChart = echarts.init(proxy.$refs.homeOvertimeRef);
			const option = {
				grid: {
					top: 50,
					right: 20,
					bottom: 30,
					left: 30,
				},
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data: ['订单数量', '超时数量', '在线数量', '预警数量'],
					right: 13,
				},
				xAxis: {
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				},
				yAxis: [
					{
						type: 'value',
						name: '数量',
					},
				],
				series: [
					{
						name: '订单数量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20, 11, 13, 10, 9, 17, 19],
					},
					{
						name: '超时数量',
						type: 'bar',
						data: [15, 12, 26, 15, 11, 16, 31, 13, 5, 16, 13, 15],
					},
					{
						name: '在线数量',
						type: 'line',
						data: [15, 20, 16, 20, 30, 8, 16, 19, 12, 18, 19, 14],
					},
					{
						name: '预警数量',
						type: 'line',
						data: [10, 10, 13, 12, 15, 18, 19, 10, 12, 15, 11, 17],
					},
				],
			};
			myChart.setOption(option);
			state.myCharts.push(myChart);
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
			initData();
			// initChartsInvestment();
			// initChartsWarning();
			// initHomeLaboratory();
			// initHomeOvertime();
			// initEchartsResize();
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
