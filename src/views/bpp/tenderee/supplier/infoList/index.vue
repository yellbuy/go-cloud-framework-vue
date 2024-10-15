<template>
	<div>
		<el-card v-if="isShowPage">
			<el-form ref="searchFormRef" :model="tableData.param" label-suffix="：" label-width="85px" :inline="true">
				<el-form-item label="名称">
					<el-input placeholder="请输入关键字" v-model="tableData.param.no" style="width: 150px;"/>
				</el-form-item>
				<el-form-item>
					<el-button type="info" @click="onResetSearch">
						<el-icon>
							<RefreshLeft />
						</el-icon>
						重置
					</el-button>
					<el-button type="primary" @click="onGetTableData(true)">
						<el-icon>
							<Search />
						</el-icon>
						搜索
					</el-button>
				</el-form-item>
				<el-form-item> </el-form-item>
			</el-form>
			<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%; margin-top: 15px;" :height="proxy.$calcMainHeight(-75)" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed />
				<el-table-column prop="User" label="供应商编号" width="120" fixed />
				<el-table-column prop="Name" label="供应商类别" width="120" show-overflow-tooltip fixed/>
				<el-table-column prop="Department" label="审核信息" show-overflow-tooltip/>
				<el-table-column prop="Type" label="公司注册时间" width="120" show-overflow-tooltip/>
				<el-table-column prop="Phone" label="账号注册时间" width="150" show-overflow-tooltip/>
				<el-table-column label="账号状态" width="70" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.State"
							inline-prompt
							:width="46"
							@change=""
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"/>
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
					<template #default="scope">
						<el-button text bg type="info" @click="">账号禁用</el-button>
						<el-button text bg type="primary" @click="onModelSee(scope.row.Id)">详细信息</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.current"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"/>
		</el-card>
		<editDlg ref="editDlgRef"/>
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import editDlg from './component/infoEdit.vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default {
	name: 'supplierKind',
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
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					current: 1,
					pageSize: 10000,
				},
			},
			isShowPage: true,
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.current - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.name = '';
			state.tableData.param.no = '';
			onGetTableData();
		};

		// 初始化表格数据
		const onGetTableData = async () => {
			state.tableData.loading = true;
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
		// 打开修改用户弹窗
		const onModelEdit = (Id: number) => {
			editDlgRef.value.onGetTableData(state.kind, Id);
		};
		//打开查看数据弹窗

		const onModelSee = (id: string) => {
			state.isShowPage = false;
			editDlgRef.value.openPage(id);
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
		// 改变单页数量
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};
		// 改变页数
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
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
			onGetTableData()
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
