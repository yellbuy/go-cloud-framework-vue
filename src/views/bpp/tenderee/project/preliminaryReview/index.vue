<template>
	<div>
		<el-card v-if="state.isShowPage">
			<div>
				<el-form ref="searchFormRef" :model="state.tableData.param" label-suffix="：" label-width="85px" :inline="true">
					<el-form-item label="项目编号">
						<el-input placeholder="请输入关键字" v-model="state.tableData.param.no" style="width: 150px;"/>
					</el-form-item>
					<el-form-item label="项目名称">
						<el-input placeholder="请输入关键字" v-model="state.tableData.param.projectName" style="width: 150px;"/>
					</el-form-item>
					<el-form-item label="供应商名称">
						<el-input placeholder="请输入关键字" v-model="state.tableData.param.companyName" style="width: 150px;"/>
					</el-form-item>
					<el-form-item label="审核状态">
						<el-select
							v-model="state.tableData.param.lineState"
							filterable
							placeholder="请选择"
							style="width: 150px;">
							<el-option v-for="(item, index) in state.tableData.lineStateList" :key="index" :label="item" :value="index" />
						</el-select>
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
							查询
						</el-button>
					</el-form-item>
					<el-form-item></el-form-item>
				</el-form>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-75)" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="60" show-overflow-tooltip fixed />
				<el-table-column prop="No" label="项目编号" width="150" show-overflow-tooltip fixed/>
				<el-table-column prop="ProjectName" label="项目名称" width="150" show-overflow-tooltip/>
				<el-table-column prop="CompanyName" label="供应商名称" show-overflow-tooltip/>
				<el-table-column prop="BidFiles" label="资料凭证" width="80" show-overflow-tooltip>
					<template #default="scope">
						<div style="display: flex; align-items: center; justify-content: center;">
							<img :src="state.baseUrl + scope.row.BidPics" alt="资料凭证图片" width="30" height="30" @click="showImage(scope.row.BidPics)"/>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="BidPayTime" label="资料支付时间" width="120" show-overflow-tooltip>
					<template #default="scope">
						<div >
							<span >{{ dateFormatYMDHM(scope, scope.row, scope.row.BidPayTime) }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="BidAuditState" label="资料凭证审核" width="110" show-overflow-tooltip>
					<template #default="scope">
						<div style="display: flex; align-items: center; justify-content: center;">
							<el-tag type="info" effect="dark" v-if="scope.row.BidAuditState == 0">待审核</el-tag>
							<el-tag type="success" effect="dark" v-else-if="scope.row.BidAuditState == 1">通过</el-tag>
							<el-tag type="danger" effect="dark" v-else-if="scope.row.BidAuditState == 2">不通过</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="EnsureFiles" label="保证金凭证" width="80" show-overflow-tooltip>
					<template #default="scope">
						<div style="display: flex; align-items: center; justify-content: center;">
							<img :src="state.baseUrl + scope.row.EnsurePics" alt="保证金凭证图片" width="30" height="30" v-if="scope.row.EnsurePayState == 1" @click="showImage(scope.row.EnsurePics)"/>
							<span v-else>—</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="EnsurePayTime" label="保证金支付时间" width="120" show-overflow-tooltip>
					<template #default="scope">
						<div v-if="scope.row.EnsurePayState == 1">
							<span >{{ dateFormatYMDHM(scope, scope.row, scope.row.EnsurePayTime) }}</span>
						</div>
						<div style="display: flex; align-items: center; justify-content: center;" v-else>
							<span >—</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="EnsureAuditState" label="保证金凭证审核" width="110" show-overflow-tooltip>
					<template #default="scope">
						<div style="display: flex; align-items: center; justify-content: center;">
							<el-tag type="info" effect="dark" v-if="scope.row.EnsureAuditState == 0 && scope.row.EnsurePayState == 1">待审核</el-tag>
							<el-tag type="success" effect="dark" v-else-if="scope.row.EnsureAuditState == 1 && scope.row.EnsurePayState == 1">通过</el-tag>
							<el-tag type="danger" effect="dark" v-else-if="scope.row.EnsureAuditState == 2 && scope.row.EnsurePayState == 1">不通过</el-tag>
							<span v-else>—</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(130)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onToRouterSee(scope.row.Id, scope.row.ProjectId)">查看</el-button>
						<el-button type="primary" @click="onToRouterEdit(scope.row.Id, scope.row.ProjectId)">审核</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="state.tableData.param.current"
				background
				v-model:page-size="state.tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total"/>
		</el-card>
		<reviewEdit ref="reviewEditDlgRef"/>
	</div>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import reviewEdit from './component/reviewEdit.vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';

const store = useStore();
const route = useRoute();
const kind = route.params.kind || 'bid';
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
		lineStateList:["全部","待审"],
		param: {
			kind: 'bid',
			lineState: 0,
			no: '',
			projectId: 0,
			companyId: 0,
			projectName: '',
			companyName: '',
			current: 1,
			pageSize: 20,
		},
	},
	isShowPage: true,
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//重置查询条件
const onResetSearch = () => {
	state.tableData.param.no = '';
	state.tableData.param.projectName = '';
	state.tableData.param.companyName = '';
	state.tableData.param.lineState = '';
	onGetTableData();
};

// 初始化表格数据
const onGetTableData = async () => {
	state.tableData.loading = true;
	try {
		const res = await proxy.$api.erp.projectcompany.signUpLists(state.tableData.param);
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

//跳转审核
const onToRouterEdit = (id: string, projectId: string) => {
	store.commit('project/getProjectId', projectId);
	store.commit('project/getProjectCompanyId', id);
	reviewEditDlgRef.value.openEditPage(id)
	state.isShowPage = false;
};

//跳转查看
const onToRouterSee = (id: string, projectId: string) => {
	store.commit('project/getProjectId', projectId);
	store.commit('project/getProjectCompanyId', id);
	reviewEditDlgRef.value.openSeePage(id)
	state.isShowPage = false;
};


// 删除用户
const onModelDel = (id: number) => {
	ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		state.tableData.loading = true;
		try {
			const res = await proxy.$api.erp.project.delete(id);
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
	state.tableData.param.current = val;
	onGetTableData();
};

const { dateFormatYMDHM, dateFormat } = commonFunction();

// 页面加载时
onMounted(() => {
	onGetTableData();
});

defineExpose({onGetTableData, ...toRefs(state)})

</script>

<style scoped lang="scss">
</style>
