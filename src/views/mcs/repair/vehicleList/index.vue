<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="关键字：">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword" />
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<RefreshLeft />
							</el-icon>
							{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
						<el-button type="info" @click="onGetXlsData()" v-auth:[moduleKey]="'btn.ExportXls'">
							<el-icon>
								<Download />
							</el-icon>
							&#8197;{{ $t('message.action.export') }}
						</el-button>
					</el-form-item>
					<el-form-item></el-form-item>
				</el-form>
			</div>
			<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="VehicleNumber" label="车牌号" width="100" fixed />
				<el-table-column prop="VehicleType" label="车辆类型" width="120" show-overflow-tooltip />
				<el-table-column label="外部车" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="danger" effect="plain" v-if="scope.row.IsExternal==0">{{ $t('message.action.no') }}</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.IsExternal==1">{{ $t('message.action.yes') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Shipper" label="相关方" width="120" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="提醒" width="120" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="danger" class="mr4" round effect="dark" v-if="scope.row.RepairState">修</el-tag>
						<el-tag type="success" class="mr4" round effect="dark" v-else-if="scope.row.WaybillLineCount" >任</el-tag>
						<el-tag type="primary" class="mr4" round effect="dark" v-else >空</el-tag>
						<el-tooltip v-if="scope.row.InsuranceState > 0"
							class="box-item"
							effect="dark"
							placement="top">
							<template #content>保险：{{ scope.row.InsuranceStartDate.substr(0,10) }} 至 {{ scope.row.InsuranceEndDate.substr(0,10) }}</template>
							<el-tag :type="scope.row.InsuranceState == 2?'success':'warning'" class="mr4" round effect="dark" >险</el-tag>
						</el-tooltip>
						<el-tag type="danger" class="mr4" round effect="dark" v-else >险</el-tag>
						<el-tooltip v-if="scope.row.DrivingLicenseState < 2 || scope.row.TransportLicenseState < 2" class="box-item" effect="dark" placement="top">
							<template #content>行驶证：{{ scope.row.DrivingLicenseStartDate.substr(0,10) }} 至 {{ scope.row.DrivingLicenseEndDate.substr(0,10) }}
								<br />
								道路运输许可证：{{ scope.row.TransportLicenseStartDate.substr(0,10) }} 至 {{ scope.row.TransportLicenseEndDate.substr(0,10) }}
							</template>
							<el-tag :type="scope.row.DrivingLicenseState==0 || scope.row.TransportLicenseState==0?'danger':'warning'" class="mr4" round effect="dark" v-if="scope.row.DrivingLicenseStat < 2 || scope.row.TransportLicenseState < 2">证</el-tag>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="Driver" label="司机" width="80" show-overflow-tooltip />				
				<el-table-column prop="DriverMobile" label="电话" width="100"  show-overflow-tooltip />
				<el-table-column prop="Mileage" label="公里数" width="70" align="right" />
				<el-table-column prop="DrivingLicense" label="行驶证" width="120"  show-overflow-tooltip />
				<el-table-column prop="TransportLicense" label="道路运输证" width="120"  show-overflow-tooltip />
				<el-table-column prop="Tname" label="所属公司" show-overflow-tooltip />
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onChildOpenMapDlg(scope.row.VehicleNumber, true)" v-auth:[moduleKey]="'btn.ChildMap'">
							{{ $t('message.action.location') }}
						</el-button>
						<el-button text bg type="primary" @click="onEnergyOpenMapDlg(scope.row.VehicleNumber, true)" v-auth:[moduleKey]="'btn.ChildEnergy'">
							{{ $t('message.action.statistics') }}
						</el-button>
						<el-button text bg @click="onOpenEditDlg(scope.row.Id, true)">
							{{ $t('message.action.see') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total" />
		</el-card>
		<editDlg ref="editDlgRef" />
		<childMapDlg ref="childMapDlgRef" />
		<energyStatDlg ref="energyStatDlgRef" />
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import childMapDlg from '/@/views/mcs/common/waybill/component/vehicleMap.vue';
import editDlg from './component/vehicleListEdit.vue';
import energyStatDlg from './component/vehicleListEnergyStat.vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'vehicleListInfo',
	components: { editDlg,childMapDlg,energyStatDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const route = useRoute();

		const kind = route.params.kind||'info';

		const scopeMode = route.params.scopeMode || 0;

		const scopeValue = route.params.scopeValue || 0;

		const moduleKey = `api_commoninfo_vehicle`;

		const editDlgRef = ref();

		const childMapDlgRef=ref();

		const energyStatDlgRef=ref();

		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
			
		});

		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});

		//	重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			onGetTableData(true);
		};

		//	查询表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.vehicle.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};

		// 导出表格数据
		const onGetXlsData = async () => {
			const res = await proxy.$api.erp.vehicle.exportXlsByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
			if (!res.data || res.data.size == 0) {
				return;
			} 
			// 返回不为空
			var url = window.URL.createObjectURL(res.data);
			var a = document.createElement('a');
			a.href = url;
			a.download = '车辆台账_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		};
		
		// 打开编辑弹窗
		const onOpenEditDlg = (id: string, ishow: boolean) => {
			editDlgRef.value.openDialog(state.kind, id, ishow);
		};

		// 打开地图
		const onChildOpenMapDlg = (vehicleNumber: string, ishow: boolean) => {
			childMapDlgRef.value.openDialog(vehicleNumber, ishow);
		};

		// 打开燃油统计
		const onEnergyOpenMapDlg = (vehicleNumber: string, ishow: boolean) => {
			energyStatDlgRef.value.openDialog(vehicleNumber, ishow);
		};

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			onGetTableData();
		};

		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
			onGetTableData();
		};
		
		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			editDlgRef,
			childMapDlgRef,
			energyStatDlgRef,
			onGetTableData,
			onGetXlsData,
			onResetSearch,
			onOpenEditDlg,
			onChildOpenMapDlg,
			onEnergyOpenMapDlg,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>