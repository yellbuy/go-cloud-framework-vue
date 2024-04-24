<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="关键字：">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
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
				style="width: 100%"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row>
				<el-table-column type="index" label="序号" width="60" align="right" fixed />
				<el-table-column prop="VehicleNumber" label="车牌号码" width="80" align="left" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="No" label="保险单号" width="100" align="right" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="BillTime" label="保单日期" width="100" align="center" show-overflow-tooltip :formatter="dateFormatYMD"></el-table-column>
				<el-table-column prop="StartTime" label="保险生效日" width="100" align="center" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="EndTime" label="保险到期日" width="100" align="center" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="CompulsoryStartDate" label="交强险起始日" width="100" align="center" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="CompulsoryEndDate" label="交强险到期日" width="100" align="center" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="CompulsoryFee" label="交强险费用(元)" width="100" align="right" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CommercialStartDate" label="商业险起始日" width="100" align="center" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="CommercialEndDate" label="商业险到期日" width="100" align="center" :formatter="dateFormatYMD"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="CommercialFee" label="商业险费用(元)" width="100" align="right" show-overflow-tooltip></el-table-column>
				<el-table-column prop="TaxFee" label="车船税费用(元)" width="100" align="right" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CompanyName" label="所属公司" align="left" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CreateTime" label="创建时间" width="100" align="center" :formatter="dateFormatYMD" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(180)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg @click="onOpenEditDlg(scope.row.Id, true)">
							{{ $t('message.action.see') }}
						</el-button>
						<el-button text bg type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
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
		<importDlg ref="importDlgRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import editDlg from './component/insuranceEdit.vue';
import importDlg from './component/insuranceImport.vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'insuranceList',
	components: { editDlg, importDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_baseinfo_vehicle_insurance`;
		const editDlgRef = ref();
		const importDlgRef = ref();
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

		//	初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.vehicleinsurance.getListByScope("info", 0, 0, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};

		//	打开弹窗
		const onOpenEditDlg = (id: string, ishow: boolean) => {
			editDlgRef.value.openDialog(state.kind, id, ishow);
		};

		//	删除用户
		const onModelDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.vehicleinsurance.delete(Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			});
		};

		//	分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			onGetTableData();
		};

		//	分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
			onGetTableData();
		};

		//	导入功能
		const onOpenImportDlg = () => {
			importDlgRef.value.openDialog(state.kind);
		};

		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		//	时间格式
		const { dateFormatYMD } = commonFunction();

		return {
			proxy,
			editDlgRef,
			importDlgRef,
			onGetTableData,
			onResetSearch,
			onOpenEditDlg,
			onOpenImportDlg,
			onModelDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMD,
			...toRefs(state),
		};
	},
};
</script>