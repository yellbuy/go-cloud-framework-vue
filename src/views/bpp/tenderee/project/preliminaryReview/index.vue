<template>
	<div>
		<el-card v-if="isShowPage">
			<div>
				<el-form ref="searchFormRef" :model="tableData.param" label-width="60px" :inline="true">
					<el-form-item label="编号">
						<el-input placeholder="请输入" v-model="tableData.param.no" style="width: 150px;"/>
					</el-form-item>
					<el-form-item label="供应商名">
						<el-input placeholder="请输入" v-model="tableData.param.companyName" style="width: 150px;"/>
					</el-form-item>
					<el-form-item label="项目名称">
						<el-input placeholder="请输入" v-model="tableData.param.projectName" style="width: 150px;"/>
					</el-form-item>
					<el-form-item label="审核状态">
						<el-select
							v-model="tableData.param.LineState"
							filterable
							placeholder="请选择"
							style="width: 150px;">
							<el-option v-for="(item, index) in tableData.lineStateList" :key="index" :label="item" :value="index" />
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<RefreshLeft />
							</el-icon>
							{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="primary" @click="onGetTableData(true)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
					</el-form-item>
					<el-form-item></el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-75)" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="60" show-overflow-tooltip fixed />
				<el-table-column prop="No" label="编号" width="150" show-overflow-tooltip fixed/>
				<el-table-column prop="CompanyName" label="供应商名称" width="300" show-overflow-tooltip fixed/>
				<el-table-column prop="ProjectName" label="项目名称" show-overflow-tooltip/>
				<el-table-column prop="BidFiles" label="资料凭证" width="100" show-overflow-tooltip>
					<template #default="scope">
						<img :src="baseUrl + scope.row.BidFiles" alt="资料凭证图片" width="80" height="80" @click="showImage(scope.row.BidFiles)"/>
					</template>
				</el-table-column>
				<el-table-column prop="BidPayTime" label="资料支付时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
				<el-table-column prop="BidAuditState" label="资料凭证审核" width="110" show-overflow-tooltip>
					<template #default="scope">
						<div v-if="scope.row.BidAuditState == 0" style="display: flex; align-items: center;">
							<span style="color: gray; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span >待审核</span>
						</div>
						<div v-else-if="scope.row.BidAuditState == 1" style="display: flex; align-items: center;">
							<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>通过</span>
						</div>
						<div v-else-if="scope.row.BidAuditState == 2" style="display: flex; align-items: center;">
							<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>不通过</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="EnsureFiles" label="保证金凭证" width="100" show-overflow-tooltip>
					<template #default="scope">
						<img :src="baseUrl + scope.row.EnsureFiles" alt="保证金凭证图片" width="80" height="80" @click="showImage(scope.row.EnsureFiles)"/>
					</template>
				</el-table-column>
				<el-table-column prop="EnsurePayTime" label="保证金支付时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
				<el-table-column prop="EnsureAuditState" label="保证金凭证审核" width="110" show-overflow-tooltip>
					<template #default="scope">
						<div v-if="scope.row.EnsureAuditState == 0" style="display: flex; align-items: center;">
							<span style="color: gray; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span >待审核</span>
						</div>
						<div v-else-if="scope.row.EnsureAuditState == 1" style="display: flex; align-items: center;">
							<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>通过</span>
						</div>
						<div v-else-if="scope.row.EnsureAuditState == 2" style="display: flex; align-items: center;">
							<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>不通过</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(80)" fixed="right">
					<template #default="scope">
						<el-button type="primary" @click="onModelEdit()">审核</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.pageIndex"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"/>
		</el-card>
		<reviewEdit ref="reviewEditDlgRef"/>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import reviewEdit from './component/reviewEdit.vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default {
	name: 'project',
	components: { reviewEdit },
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
		const reviewEditDlgRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			baseUrl: import.meta.env.VITE_URL as any,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				lineStateList:["标书缴费待审","保证金缴费待审","标书缴费通过","保证金缴费通过","标书缴费不通过","保证金缴费不通过"],
				param: {
					kind: 'repair',
					no: '',
					projectId: 0,
					companyId: 0,
					projectName: '',
					companyName: '',
					pageIndex: 1,
					pageSize: 20,
				},
			},
			isShowPage: true,
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.no = '';
			state.tableData.param.projectName = '';
			state.tableData.param.companyName = '';
			state.tableData.param.LineState = '';
			onGetTableData();
		};

		// 初始化表格数据
		const onGetTableData = async () => {
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectcompany.preliminaryReviewList(state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};

		// 打开新标签预览图片
		const showImage = async (path: string) => {
			const newWindow = window.open(import.meta.env.VITE_URL + path, '_blank');
				if (!newWindow) {
				alert('弹出窗口被阻止。请在浏览器设置中允许弹出窗口以查看图片。');
			}
		};

		// 打开编辑弹窗
		const onModelEdit = (Id: number) => {
			store.commit('project/getProjectId', Id);
			store.commit('project/getProjectCompanyId', Id);
			state.isShowPage = false;
			reviewEditDlgRef.value.openDialog();
		};
		//打开查看弹窗

		const onModelSee = (Id: string, state: boolean) => {
			seeDlgRef.value.openDialog(Id, state);
		};
		//跳转
		const onToRouter = (Id: string) => {
			store.commit('project/getProjectId', Id);
			state.isShowPage = false;
			bidSelectionDlgRef.value.GetByIdRow(Id);
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
			state.tableData.param.size = val;
			onGetTableData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
			onGetTableData();
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
			reviewEditDlgRef,
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
			showImage,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
