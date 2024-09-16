<template>
	<el-card>
		<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="onLoadTable">
			<el-tab-pane label="待审核" name="PendingAudit">
				<el-table :data="tableData.data" style="width: 100%; margin-top: 10px;" v-loading="tableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="60" align="right" show-overflow-tooltip fixed />
					<el-table-column prop="Id" label="供应商编码" width="150" show-overflow-tooltip />
					<el-table-column prop="Name" label="公司名称" show-overflow-tooltip />
					<el-table-column prop="Kind" label="供应商类别" width="150" show-overflow-tooltip />
					<el-table-column prop="Companytime" label="申请日期" width="150" show-overflow-tooltip />
					<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
						<template #default="scope">
							<el-button type="primary" @click="onModelEdit(scope.row.Id)">编辑</el-button>
							<el-button text bg type="danger" @click="onModelDel(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30]"
					v-model:current-page="tableData.param.current"
					background
					v-model:page-size="tableData.param.pageSize"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="tableData.total">
				</el-pagination>
			</el-tab-pane>
			<el-tab-pane label="全部" name="AllAudit">
				<el-table :data="tableData.data" style="width: 100%; margin-top: 10px;" v-loading="tableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="60" align="right" show-overflow-tooltip fixed/>
					<el-table-column prop="Id" label="供应商编码" width="150" show-overflow-tooltip />
					<el-table-column prop="Name" label="公司名称" show-overflow-tooltip />
					<el-table-column prop="Kind" label="供应商类别" width="150" show-overflow-tooltip />
					<el-table-column prop="Companytime" label="申请日期" width="150" show-overflow-tooltip />
					<el-table-column prop="Remark" label="审核意见" show-overflow-tooltip />
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30]"
					v-model:current-page="tableData.param.current"
					background
					v-model:page-size="tableData.param.pageSize"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="tableData.total">
				</el-pagination>
			</el-tab-pane>
			<el-tab-pane label="通过" name="PassAudit">
				<el-table :data="tableData.data" style="width: 100%; margin-top: 10px;" v-loading="tableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="60" align="right" show-overflow-tooltip fixed/>
					<el-table-column prop="Id" label="供应商编码" width="150" show-overflow-tooltip />
					<el-table-column prop="Name" label="公司名称" show-overflow-tooltip />
					<el-table-column prop="Kind" label="供应商类别" width="150" show-overflow-tooltip />
					<el-table-column prop="Companytime" label="申请日期" width="150" show-overflow-tooltip />
					<el-table-column prop="Remark" label="审核意见" show-overflow-tooltip />
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30]"
					v-model:current-page="tableData.param.current"
					background
					v-model:page-size="tableData.param.pageSize"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="tableData.total">
				</el-pagination>
			</el-tab-pane>
		</el-tabs>
		<editDlg ref="editDlgRef" />
	</el-card>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import editDlg from './component/informationEdit.vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default {
	name: 'information',
	components: { editDlg },
	setup() {
		const store = useStore();
		const route = useRoute();
		const kind = route.params.kind;
		const mode = route.params.mode;
		const isBid = route.params.isBid;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_pro_project_${kind}_${mode}`;
		const { proxy } = getCurrentInstance() as any;
		const editDlgRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			activeName: 'PendingAudit',
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					state: 0,
					current: 1,
					pageSize: 20,
				},
			},
			isSelection: true,
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.current - 1;
		});

		// 打开修改用户弹窗
		const onModelEdit = (id: string) => {
			editDlgRef.value.openDialog(state.kind, id);
		};

		//打开查看数据弹窗
		const onModelSee = (Id: string, state: boolean) => {
			editDlgRef.value.openDialog(Id, state);
		};

		// 初始化表格数据
		const onGetTableData = async () => {
			try {
				const res = await proxy.$api.base.tenant.getList(state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};

		// 删除用户
		const onModelDel = (Id: number) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading = true;
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

		//刷新表格
		const onLoadTable = () => {
			state.tableData.param.current = 1
			switch (state.activeName) {
				case 'PendingAudit':
					state.tableData.param.state = 0
					break
				case 'AllAudit':
					state.tableData.param.state = -2
					break
				case 'PassAudit':
					state.tableData.param.state = 1
					break
			}
			onGetTableData()
		};

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			onGetTableData()
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
			onGetTableData();
		};

		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYMDHM, dateFormat } = commonFunction();

		return {
			proxy,
			editDlgRef,
			onGetTableData,
			onLoadTable,
			onModelEdit,
			onModelSee,
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
</style>
