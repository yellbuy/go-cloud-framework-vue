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
						<el-button type="primary" @click="onOpenEditDlg(0, false)" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
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
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="BillNo" label="流水号" width="110" fixed />
				<el-table-column prop="VehicleNumber" label="车牌号" width="100" fixed />
				<el-table-column prop="StartTime" label="进厂时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip />
				<el-table-column prop="EndTime" label="完成时间" :formatter="dateFormatYMDHM" width="120" show-overflow-tooltip />
				<el-table-column prop="CompanyName" label="客户名称" width="120" show-overflow-tooltip />
				<el-table-column prop="Brand" label="车辆品牌" width="120" show-overflow-tooltip />
				<el-table-column prop="VehicleType" label="车辆类型" width="120" show-overflow-tooltip />
				<el-table-column prop="Mileage" label="公里数" width="70" align="right"  show-overflow-tooltip />
				<el-table-column prop="Linkman" label="联系人" width="90" />				
				<el-table-column prop="Phone" label="联系电话" width="120"  show-overflow-tooltip />
				<el-table-column label="是否开单" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-switch v-if="scope.row.State<2"
							v-model="scope.row.State"
							inline-prompt
							:width="60"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('erp_vehicle', 'state', scope.row.Id, scope.row.State)"
							:active-text="$t('pages.mcs.action.has_billed')"
							:inactive-text="$t('pages.mcs.action.not_billing')"
							:active-value="1"
							:inactive-value="0"/>
						<el-tag type="danger" effect="plain" v-else>{{ $t('pages.mcs.action.has_finished') }}</el-tag>
						<el-tag type="success" effect="plain" v-if="!scope.row.State" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('pages.mcs.action.not_billing') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else-if="scope.row.State==1" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('pages.mcs.action.has_billed') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Tname" label="所属公司" show-overflow-tooltip />
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(240)" fixed="right">
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
						<el-button text bg @click="routerPath(0, false)" v-auth:[moduleKey]="'btn.Add'" v-if="!scope.row.State">
							{{ $t('message.action.billing') }}
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
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import editDlg from './component/receptionEdit.vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'receptionList',
	components: { editDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const route = useRoute();

		const router =  useRouter();

		const kind = "repair";

		const scopeMode = route.params.scopeMode || 0;

		const scopeValue = route.params.scopeValue || 0;

		const moduleKey = `api_repair_reception`;

		const editDlgRef = ref();

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
					state: -1, //所有数据，未维修和已维修
				},
			},
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});

		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			onGetTableData(true);
		};

		// 初始化表格数据
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

		// 打开弹窗
		const onOpenEditDlg = (id: string, ishow: boolean) => {
			editDlgRef.value.openDialog(state.kind, id, ishow);
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

		// 打开弹窗
		const routerPath= (id: string, ishow: boolean)=>{
			//console.log(id)
			router.push('/admin/mcs/repair/sheet/0/0')
			editDlgRef.value.openDialog(state.kind, id, ishow);
		}

		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			editDlgRef,
			onGetTableData,
			onResetSearch,
			onOpenEditDlg,
			onModelDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMDHM,
			routerPath,
			...toRefs(state),
		};
	},
};
</script>