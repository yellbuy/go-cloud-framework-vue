<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="60px" :inline="true">
					<el-form-item label="关键字：">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
					</el-form-item>
					<el-form-item label="任务：">
						<el-select v-model="tableData.param.waybillState" placeholder="任务状态" style="width: 80px">
							<el-option label="不限" :value="-1"></el-option>
							<el-option label="无任务" :value="0"></el-option>
							<el-option label="有任务" :value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="外部车：">
						<el-select v-model="tableData.param.isExternal" placeholder="是否外部车" style="width: 80px">
							<el-option label="不限" :value="-1"></el-option>
							<el-option label="内部车" :value="0"></el-option>
							<el-option label="外部车" :value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="证件：">
						<el-select v-model="tableData.param.certState" placeholder="证件状态" style="width: 90px">
							<el-option label="不限" :value="0"></el-option>
							<el-option label="正常" :value="1"></el-option>
							<el-option label="即将到期" :value="2"></el-option>
							<el-option label="已到期" :value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="保险：">
						<el-select v-model="tableData.param.insuranceState" placeholder="保险状态" style="width: 90px">
							<el-option label="不限" :value="0"></el-option>
							<el-option label="正常" :value="1"></el-option>
							<el-option label="即将到期" :value="2"></el-option>
							<el-option label="已到期" :value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="维修：">
						<el-select v-model="tableData.param.repairState" placeholder="维修状态" style="width: 80px">
							<el-option label="不限" :value="-1"></el-option>
							<el-option label="未维修" :value="0"></el-option>
							<el-option label="维修中" :value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审核：">
						<el-select v-model="tableData.param.auditState" placeholder="审核状态" style="width: 80px">
							<el-option label="不限" :value="-1"></el-option>
							<el-option label="待审" :value="0"></el-option>
							<el-option label="已审" :value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch" style="margin-left:33px;">
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
						<el-button type="primary" @click="onOpenEditDlg(0, false)" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
						<el-button type="primary" @click="onOpenImportDlg" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.import') }}
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
				<el-table-column prop="VehicleNumber" label="车牌号" width="100" fixed></el-table-column>
				<el-table-column prop="BillNo" label="编号" width="110"></el-table-column>
				<el-table-column prop="VehicleType" label="车辆类型" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column label="外部车" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.IsExternal"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Update'"
							@change="proxy.$api.common.table.updateById('erp_vehicle', 'is_external', scope.row.Id, scope.row.IsExternal)"
							:active-text="$t('message.action.yes')"
							:inactive-text="$t('message.action.no')"
							:active-value="1"
							:inactive-value="0"/>
						<el-tag type="success" effect="plain" v-if="scope.row.IsExternal" v-no-auth:[moduleKey]="'btn.Update'">{{ $t('message.action.yes') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Update'">{{ $t('message.action.no') }}</el-tag>
					</template>
				</el-table-column>
				
				<el-table-column prop="Shipper" label="相关方" width="120" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="提醒" width="120" show-overflow-tooltip>
					<template #default="scope">
						<el-tooltip v-if="scope.row.RepairState > 0"
							class="box-item"
							effect="dark"
							placement="top">
						<template #content>维修项目：{{ scope.row.RepairContent }} 
						</template>
						<el-tag type="danger" class="mr4" round effect="dark">修</el-tag>
						</el-tooltip>

						
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
				<el-table-column prop="Driver" label="司机" width="80" show-overflow-tooltip></el-table-column>				
				<el-table-column prop="DriverMobile" label="电话" width="100"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="Mileage" label="公里数" width="70" align="right"></el-table-column>
				<el-table-column prop="DrivingLicense" label="行驶证" width="120"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="TransportLicense" label="道路运输证" width="120"  show-overflow-tooltip></el-table-column>
				<el-table-column label="有效" width="70" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.State"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('erp_vehicle', 'state', scope.row.Id, scope.row.State)"
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"/>
						<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Tname" label="所属公司" show-overflow-tooltip></el-table-column>
				<el-table-column label="审核" width="70" align="center" fixed="right" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.AuditState"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.AuditUpdate'"
							@change="proxy.$api.common.table.updateById('erp_vehicle', 'audit_state', scope.row.Id, scope.row.AuditState)"
							:active-text="$t('message.action.yes')"
							:inactive-text="$t('message.action.no')"
							:active-value="1"
							:inactive-value="0"/>
						<el-tag type="success" effect="plain" v-if="scope.row.AuditState" v-no-auth:[moduleKey]="'btn.AuditUpdate'">{{ $t('message.action.yes') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.AuditUpdate'">{{ $t('message.action.no') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="primary" @click="onChildOpenMapDlg(scope.row.VehicleNumber, true)" v-auth:[moduleKey]="'btn.ChildMap'">
							{{ $t('message.action.location') }}
						</el-button>
						<el-button text bg type="primary" @click="onEnergyOpenMapDlg(scope.row.VehicleNumber, true)" v-auth:[moduleKey]="'btn.ChildEnergy'">
							{{ $t('message.action.statistics') }}
						</el-button>
						<el-button text bg @click="onOpenEditDlg(scope.row.Id, true)">
							{{ $t('message.action.see') }}
						</el-button>
						<el-button text bg type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'" >
							{{ $t('message.action.delete') }}
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
				:total="tableData.total">
			</el-pagination>
		</el-card>
		<editDlg ref="editDlgRef" />
		<childMapDlg ref="childMapDlgRef" />
		<energyStatDlg ref="energyStatDlgRef" />
		<importDlg ref="importDlgRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import childMapDlg from '../waybill/component/vehicleMap.vue';
import editDlg from './component/vehicleEdit.vue';
import energyStatDlg from './component/vehicleEnergyStat.vue';
import importDlg from './component/vehicleImport.vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'vehicleInfo',
	components: { editDlg,childMapDlg,energyStatDlg,importDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind||'info';
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const waybillState = route.query.waybillState===undefined?-1:parseInt(route.query.waybillState?.toString())
		const certState = route.query.certState===undefined?0:parseInt(route.query.certState?.toString())
		const insuranceState = route.query.insuranceState===undefined?0:parseInt(route.query.insuranceState?.toString())
		const moduleKey = `api_commoninfo_vehicle`;
		const editDlgRef = ref();
		const childMapDlgRef=ref();
		const energyStatDlgRef=ref();
		const importDlgRef=ref();
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
					waybillState:waybillState,
					isExternal:-1,
					repairState:-1,
					certState:certState,
					insuranceState:insuranceState,
					auditState:-1,
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
			
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
			
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			state.tableData.param.waybillState = -1;
			state.tableData.param.isExternal = -1;
			state.tableData.param.repairState = -1;
			state.tableData.param.certState = 0;
			state.tableData.param.insuranceState = 0;
			onGetTableData(true);
		};

		// 查询表格数据
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
		// 打开导入弹窗
		const onOpenImportDlg = () => {
			importDlgRef.value.openDialog(state.kind);
		};
		// 打开地图
		const onChildOpenMapDlg = (vehicleNumber: string, ishow: boolean) => {
			childMapDlgRef.value.openDialog(vehicleNumber, ishow);
		};
		// 打开燃油统计
		const onEnergyOpenMapDlg = (vehicleNumber: string, ishow: boolean) => {
			energyStatDlgRef.value.openDialog(vehicleNumber, ishow);
		};
		// 删除用户
		const onModelDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.vehicle.delete(Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			});
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
			importDlgRef,
			childMapDlgRef,
			energyStatDlgRef,
			onGetTableData,
			onGetXlsData,
			onResetSearch,
			onOpenEditDlg,
			onOpenImportDlg,
			onChildOpenMapDlg,
			onEnergyOpenMapDlg,
			onModelDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
.el-form--inline .el-form-item {
    margin-right: 0px !important;
}
</style>