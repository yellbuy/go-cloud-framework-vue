<template>
	<div class="base-role-container">
		<div v-if="isSelection">
			<el-card shadow="hover">
				<div class="">
					<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
						<el-form-item label="比选编号">
							<el-input placeholder="请输入比选编号查询" v-model="tableData.param.no"> </el-input>
						</el-form-item>
						<el-form-item label="比选项目">
							<el-input placeholder="请输入比选项目查询" v-model="tableData.param.name"> </el-input>
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
							<el-button type="primary" @click="onModelEdit(0)" v-auth:[moduleKey]="'btn.Add'">
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
					highlight-current-row
				>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="No" label="比选编号" show-overflow-tooltip fixed></el-table-column>
					<el-table-column prop="Kind" label="比选类型" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.ProjectType == 1">公开招标</span>
							<span v-else-if="scope.row.ProjectType == 2">邀请招标</span>
							<span v-else-if="scope.row.ProjectType == 3">竞争性谈判</span>
							<span v-else-if="scope.row.ProjectType == 4">单一来源采购</span>
							<span v-else-if="scope.row.ProjectType == 5">询价采购</span>
						</template>
					</el-table-column>
					<el-table-column prop="Name" label="比选项目" show-overflow-tooltip></el-table-column>
					<el-table-column prop="fanwei" label="比选范围" show-overflow-tooltip></el-table-column>
					<el-table-column prop="EndTime" label="报名截止日期" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
					<el-table-column prop="ReviewTime" label="评选日期" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(360)" fixed="right">
						<template #default="scope">
							<el-button text bg type="info" v-auth:[moduleKey]="'btn.See'" @click="onModelSee(scope.row.Id, false)">
								<el-icon>
									<Search />
								</el-icon>
								&#8197;{{ $t('message.action.see') }}
							</el-button>
							<el-button
								text
								bg
								type="primary"
								v-if="isSignUpTime(scope.row)"
								@click="onModelSee(scope.row.Id, true)"
								v-auth:[moduleKey]="'btn.signup'"
								>{{ $t('message.action.signUp') }}</el-button
							>

							<el-button text bg type="primary" v-if="isEditTime(scope.row)" @click="onModelEdit(scope.row.Id)" v-auth:[moduleKey]="'btn.Edit'">
								<el-icon>
									<Edit />
								</el-icon>
								&#8197;{{ $t('message.action.edit') }}
							</el-button>
							<el-button text bg type="danger" v-if="scope.row.State != 1" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
								<el-icon>
									<CloseBold />
								</el-icon>
								&#8197;{{ $t('message.action.delete') }}
							</el-button>
							<el-button text bg type="primary" @click="onToRouter(scope.row.Id)" v-auth:[moduleKey]="'btn.Selection'">
								{{ $t('message.action.selection') }}
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
					:total="tableData.total"
				>
				</el-pagination>
			</el-card>
			<editDlg ref="editDlgRef" />
			<seeDlg ref="seeDlgRef" />
		</div>
		<selectionDlg ref="selectionDlgRef" />
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import editDlg from './component/projectEdit.vue';
import seeDlg from './component/projectSee.vue';
import selectionDlg from './component/selection.vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default {
	name: 'project',
	components: { editDlg, seeDlg, selectionDlg },
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
		const seeDlgRef = ref();
		const selectionDlgRef = ref();
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
					name: '',
					no: '',
					pageNum: 1,
					pageSize: 20,
					isBid: Boolean(isBid),
				},
			},
			isSelection: true,
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.name = '';
			state.tableData.param.no = '';
			onGetTableData(true);
		};

		// 初始化表格数据
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
		// 打开修改用户弹窗
		const onModelEdit = (Id: number) => {
			editDlgRef.value.openDialog(state.kind, Id);
		};
		//打开查看数据弹窗

		const onModelSee = (Id: string, state: boolean) => {
			seeDlgRef.value.openDialog(Id, state);
		};
		//跳转
		const onToRouter = (Id: string) => {
			store.commit('project/getProjectId', Id);
			state.isSelection = false;
			selectionDlgRef.value.GetByIdRow();
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
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
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
			onGetTableData();
		});

		const { dateFormatYMDHM, dateFormat } = commonFunction();

		return {
			proxy,
			editDlgRef,
			seeDlgRef,
			selectionDlgRef,
			onGetTableData,
			onResetSearch,
			onModelEdit,
			onModelSee,
			onToRouter,
			isSeletionTime,
			isEditTime,
			isSignUpTime,
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
