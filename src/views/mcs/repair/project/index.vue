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
				<el-table-column type="index" label="序号" width="60" align="right" fixed/>
				<el-table-column prop="Name" label="项目名称" width="200" align="left" show-overflow-tooltip fixed />
				<el-table-column prop="No" label="项目编号" width="200" align="left" show-overflow-tooltip />
				<el-table-column prop="Qty" label="预估工时" width="100" align="right" />
				<el-table-column prop="Price" label="工时单价" width="100" align="right" />
				<el-table-column prop="Content" label="服务内容" width="300" align="left" show-overflow-tooltip />
				<el-table-column label="状态" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.State"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('erp_project', 'state', scope.row.Id, scope.row.State)"
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"/>
						<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Remark" label="备注" align="left" show-overflow-tooltip />
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="right">
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
				:total="tableData.total" />
		</el-card>
		<editDlg ref="editDlgRef" />
		<importDlg ref="importDlgRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import editDlg from './component/projectEdit.vue';
import importDlg from './component/projectImport.vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'projectList',
	components: { editDlg, importDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const route = useRoute();

		const kind = "repair";

		const scopeMode = route.params.scopeMode || 0;

		const scopeValue = route.params.scopeValue || 0;

		const moduleKey = `api_${kind}_project`;

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

		//	初始化加载表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.project.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};

		//	导入功能
		const onOpenImportDlg = () => {
			importDlgRef.value.openDialog(state.kind);
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
					const res = await proxy.$api.erp.project.delete(Id);
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

		//	页面加载时
		onMounted(() => {
			onGetTableData();
		});

		//	时间格式
		const { dateFormatYMDHM } = commonFunction();

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
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>