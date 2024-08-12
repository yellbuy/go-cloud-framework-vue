<template>
	<el-card>
		<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="tabsName">
			<el-tab-pane label="待审核" name="PendingReview">
				<el-table :data="pendingReviewTableData.data" style="width: 100%; margin-top: 10px;" v-loading="pendingReviewTableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed />
					<el-table-column prop="Id" label="供应商编码" show-overflow-tooltip />
					<el-table-column prop="Name" label="公司名称" show-overflow-tooltip />
					<el-table-column prop="Kind" label="供应商类别" show-overflow-tooltip />
					<el-table-column prop="Companytime" label="申请日期" show-overflow-tooltip />
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
					v-model:current-page="pendingReviewTableData.param.current"
					background
					v-model:page-size="pendingReviewTableData.param.size"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="pendingReviewTableData.total">
				</el-pagination>
			</el-tab-pane>
			<el-tab-pane label="已审核" name="Review">
				<el-table :data="reviewTableData.data" style="width: 100%; margin-top: 10px;" v-loading="reviewTableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed/>
					<el-table-column prop="Id" label="供应商编码" show-overflow-tooltip />
					<el-table-column prop="Name" label="公司名称" show-overflow-tooltip />
					<el-table-column prop="Kind" label="供应商类别" show-overflow-tooltip />
					<el-table-column prop="Companytime" label="申请日期" show-overflow-tooltip />
					<el-table-column prop="Reason" label="驳回理由" show-overflow-tooltip />
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30]"
					v-model:current-page="reviewTableData.param.current"
					background
					v-model:page-size="reviewTableData.param.size"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="reviewTableData.total">
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
			activeName: 'PendingReview',
			pendingReviewTableData: {
				data: [{Id:"123", Name:"攀枝花xx公司", Kind:"网络", Companytime:"2024-7-19"}],
				total: 0,
				loading: false,
				param: {
					mode: 1,
					current: 1,
					size: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
			reviewTableData: {
				data: [{Id:"123", Name:"攀枝花xx公司", Kind:"网络", Companytime:"2024-7-19", Reason:"测试测试测试"}],
				total: 0,
				loading: false,
				param: {
					mode: 2,
					current: 1,
					size: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
			isSelection: true,
		});
		state.pendingReviewTableData.param.pageIndex = computed(() => {
			return state.tableData.param.current - 1;
		});
		state.reviewTableData.param.pageIndex = computed(() => {
			return state.tableData.param.current - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			onGetTableData(true);
		};

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			// if (gotoFirstPage) {
			// 	state.tableData.param.current = 1;
			// }
			// state.tableData.loading = true;
			// try {
			// 	const res = await proxy.$api.erp.project.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
			// 	if (res.errcode != 0) {
			// 		return;
			// 	}
			// 	state.tableData.data = res.data;
			// 	state.tableData.total = res.total;
			// } finally {
			// 	state.tableData.loading = false;
			// }
		};
		// 打开修改用户弹窗
		const onModelEdit = (Id: number) => {
			editDlgRef.value.openDialog(state.kind, Id);
		};
		//打开查看数据弹窗

		const onModelSee = (Id: string, state: boolean) => {
			editDlgRef.value.openDialog(Id, state);
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

		//切换页面
		const tabsName = () => {
			onLoadTable(true);
		};
		//刷新表格
		const onLoadTable = (refresh: boolean) => {
			console.log(state.activeName);
			if (state.activeName == 'PendingReview') {
				onGetTableData(refresh);
			} else if (state.activeName == 'Review') {
				onGetTableData(refresh);
			}
		};

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			if (state.activeName == 'PendingReview') {
				state.zgTableData.param.size = val;
				onGetTableData(true);
			} else if (state.activeName == 'Review') {
				state.jsTableData.param.size = val;
				onGetTableData(true);
			}
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			if (state.activeName == 'PendingReview') {
				state.zgTableData.param.current = val;
				onGetTableData(true);
			} else if (state.activeName == 'Review') {
				state.jsTableData.param.current = val;
				onGetTableData(true);
			}
		};
		const isSeletionTime = (model) => {
			let isTime = false;
			if (
				model.BeginTime <= dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') &&
				dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') < model.FinishTime &&
				model.State == 0
			) {
				isTime = true;
			}
			return isTime;
		};
		const isEditTime = (model) => {
			let isTime = false;
			if (model.BeginTime > dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') && model.State == 0) {
				isTime = true;
			}
			return isTime;
		};
		const isSignUpTime = (model) => {
			let isTime = false;
			if (
				model.StartTime <= dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') &&
				dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') < model.EndTime &&
				model.State == 0
			) {
				isTime = true;
			}
			return isTime;
		};
		// 页面加载时
		onMounted(() => {
			// onGetTableData();
		});

		const { dateFormatYMDHM, dateFormat } = commonFunction();

		return {
			proxy,
			editDlgRef,
			onGetTableData,
			onResetSearch,
			onModelEdit,
			onModelSee,
			isSeletionTime,
			isEditTime,
			isSignUpTime,
			onModelDel,
			tabsName,
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
