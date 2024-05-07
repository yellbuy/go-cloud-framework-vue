<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<div style="height: 400px;width:100%" id="mainChart" ref="mainChart" />
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.close') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'vehicleEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const homeBarRef = ref();

		const { t } = useI18n();

		const store = useStore();

		const mainChart = ref()

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});

		//	显示表格图片
		const showImage = (Files: string) => {
			let fileUrl = '';
			let filList = Files.split(',');
			fileUrl = state.httpsText + filList[0];
			return fileUrl;
		};
		
		const state = reactive({
			isShowDialog: false,
			title: '油耗统计',
			vehicleNumber:'',
			loading: false,
			disable: true, //是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			dialogVisible: false,
			charts: {
				theme: '',
				bgColor: '',
				color: '#303133',
			},
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			items:[],
			httpsText: import.meta.env.VITE_URL as any,
		});
		const token = Session.get('token');
		
		// 打开弹窗
		const openDialog = async (vehicleNumber: string, id: string, disable: boolean) => {
			state.vehicleNumber=vehicleNumber;
			state.title=vehicleNumber;
			try {
				state.isShowDialog = true;
				nextTick(() => {
					setTimeout(() => {
						initBarChart();
				}, 500);
			})
				
			} finally {
				state.isShowDialog = true;
			}
		};

		const getByIdRow = async (vehicleNumber: string) => {
			try {
				state.items=[];
				const res = await proxy.$api.erp.energyBillLine.getStatListByVehicle("oil",vehicleNumber);
				if (res.errcode != 0) {
					return;
				}
				state.items = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};

		// 关闭弹窗
		const closeDialog = () => {
			state.loading = false;
			state.isShowDialog = false;
		};

		const onBeforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
			if (
				rawFile.type !== 'image/jpeg' &&
				rawFile.type !== 'image/jpg' &&
				rawFile.type !== 'image/png' &&
				rawFile.type !== 'image/ico' &&
				rawFile.type !== 'image/bmp' &&
				rawFile.type !== 'image/gif' &&
				rawFile.type !== 'image/svg'
			) {
				ElMessage.error('图片格式错误，支持的图片格式：jpg，png，gif，bmp，ico，svg');
				return false;
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('图片大小不能超过10MB!');
				return false;
			}
			return true;
		};

		//	柱状图
		const initBarChart = async () => {
			await getByIdRow(state.vehicleNumber)
			const mainChart=document.querySelector('#mainChart');
			const myChart = echarts.init(mainChart);
			const serialBillDateList=[];
			const serialWeightList=[];
			const serialMileageList=[];
			const serialConsumptionRateList=[];
			for (const val of state.items) {
				serialBillDateList.push(val.BillDate);
				serialWeightList.push({value:val.Weight,stationName:val.BillNo});
				serialMileageList.push({value:val.Mileage,stationName:val.BillNo});
				serialConsumptionRateList.push({value:val.ConsumptionRate,stationName:val.BillNo});
			}
			const option = {
				backgroundColor: state.charts.bgColor,
				title: {
					text: '油耗统计',
					x: 'left',
					textStyle: { fontSize: '15', color: state.charts.color },
				},
				tooltip: { trigger: 'axis' },
				legend: { data: ['油耗', '里程（百公里）', '运量(万吨)'], right: 0 },
				grid: { top: 70, right: 80, bottom: 30, left: 80 },
				xAxis: [
					{
						type: 'category',
						data: serialBillDateList,
						boundaryGap: true,
						axisTick: { show: false },
					},
				],
				yAxis: [
					{
						name: '运量(万吨）',
						nameLocation: 'middle',
						nameTextStyle: { padding: [3, 4, 50, 6] },
						splitLine: { show: true, lineStyle: { type: 'dashed', color: '#f5f5f5' } },
						axisLine: { show: false },
						axisTick: { show: false },
						axisLabel: { color: state.charts.color, formatter: '{value} 万吨' },
					},
					{
						name: '油耗(百公里)',
						nameLocation: 'middle',
						nameTextStyle: { padding: [50, 4, 5, 6] },
						splitLine: { show: false },
						axisLine: { show: false },
						axisTick: { show: false },
						axisLabel: { color: state.charts.color, formatter: '{value} 百公里' },
					},
				],
				series: [
					{
						name: '油耗',
						type: 'line',
						smooth: true,
						showSymbol: true,
						silent: true,
						label: {
							show: true,
							position: 'top'
						},
						// 矢量画五角星
						symbol: 'path://M150 0 L80 175 L250 75 L50 75 L220 175 Z',
						symbolSize: 12,
						yAxisIndex: 0,
						areaStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: 'rgba(250,180,101,0.3)' },
								{ offset: 1, color: 'rgba(250,180,101,0)' },
							]),
							shadowColor: 'rgba(250,180,101,0.2)',
							shadowBlur: 20,
						},
						itemStyle: { color: '#FF8000' },
						// data中可以使用对象，value代表相应的值，另外可加入自定义的属性
						data: serialConsumptionRateList,
					},
					{
						name: '里程（百公里）',
						type: 'line',
						smooth: true,
						showSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 12,
						yAxisIndex: 0,
						areaStyle: {
							color: new echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[
									{ offset: 0, color: 'rgba(199, 237, 250,0.5)' },
									{ offset: 1, color: 'rgba(199, 237, 250,0.2)' },
								],
								false
							),
						},
						itemStyle: {
							color: '#3bbc86',
						},
						label: {
							show: true,
							position: 'top'
						},
						data: serialMileageList,
					},
					{
						name: '运量(万吨)',
						type: 'bar',
						barWidth: 30,
						yAxisIndex: 1,
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: 'rgba(108,80,243,0.3)' },
								{ offset: 1, color: 'rgba(108,80,243,0)' },
							]),
							//柱状图圆角
							borderRadius: [30, 30, 0, 0],
						},
						label: {
							show: true,
							position: 'right'
						},
						data: serialWeightList,
					},
				],
			};
			myChart.setOption(option);
		};

		const { dateFormatYMD } = commonFunction();

		// 页面加载时
		onMounted(() => {});
		
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			getByIdRow,
			onBeforeImageUpload,
			showImage,
			dateFormatYMD,
			getUserInfos,
			token,
			...toRefs(state),
		};
	},
	components: {
		Plus,
	},
	data() {
		return {};
	},
	methods: {},
};
</script>
<style scoped lang="scss">
.el-select .el-date-picker .el-input .el-input-number {
	width: 100%;
}

.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	text-align: center;
	padding: 40px;
}
</style>