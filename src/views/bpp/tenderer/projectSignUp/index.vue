<template>
	<div>
		<el-card v-if="state.isShowPage">
			<el-form ref="searchFormRef" :model="state.tableData.param" label-suffix="：" label-width="85px" :inline="true">
				<el-form-item label="项目编号">
					<el-input placeholder="请输入关键字" v-model="state.tableData.param.no" style="width: 150px;"/>
				</el-form-item>
				<el-form-item label="项目名称">
					<el-input placeholder="请输入关键字" v-model="state.tableData.param.name" style="width: 150px;"/>
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
				<el-form-item></el-form-item>
			</el-form>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-75)" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" show-overflow-tooltip fixed />
				<el-table-column prop="No" label="项目编号"  width="160" show-overflow-tooltip fixed/>
				<el-table-column prop="Name" label="项目名称" show-overflow-tooltip/>
				<el-table-column prop="Kind" label="参与方式" width="100" align="center">
					<template #default="scope">
						<span v-if="scope.row.ProjectType == 1">公开招标</span>
						<span v-else-if="scope.row.ProjectType == 2">邀请招标</span>
						<span v-else-if="scope.row.ProjectType == 3">竞争性谈判</span>
						<span v-else-if="scope.row.ProjectType == 4">单一来源采购</span>
						<span v-else-if="scope.row.ProjectType == 5">询价采购</span>
					</template>
				</el-table-column>
				<el-table-column prop="EndTime" label="报名截止日期" width="130" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
				<el-table-column prop="ReviewTime" label="开标时间" width="130" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(150)" fixed="right">
					<template #default="scope">
						<el-button text bg type="info" @click="onModelSee(scope.row.Id, true)">详情</el-button>
						<el-button text bg type="primary" @click="onSubmit(scope.row.Id)">报名</el-button>
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
			<seeDlg ref="seeDlgRef" />
		</el-card>
		<projectDetail ref="projectDetailRef"/>
	</div>
</template>

<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import projectDetail from './component/projectDetail.vue';
import seeDlg from '/@/views/bpp/tenderee/project/bidList/component/projectSee.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';

const store = useStore();
const route = useRoute();
const kind = route.params.kind || 'bid';
const mode = route.params.mode;
const isBid = route.params.isBid;
const scopeMode = route.params.scopeMode || 1;
const scopeValue = route.params.scopeValue || 0;
const moduleKey = `api_pro_project_${kind}_${mode}`;
const { proxy } = getCurrentInstance() as any;
const seeDlgRef = ref();
const projectDetailRef = ref();
const state: any = reactive({
	moduleKey: moduleKey,
	kind,
	scopeMode,
	scopeValue,
	isShowPage: true,
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			kind: "bid",
			isBid: true,
			current: 1,
			pageSize: 20,
		},
	},
	ruleForm: {
		projectId: "0",
		companyId: "0",
	}
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//重置查询条件
const onResetSearch = () => {
	state.tableData.param.name = null;
	state.tableData.param.no = null;
	onGetTableData();
};

// 初始化表格数据
const onGetTableData = async () => {
	state.tableData.loading = true;
	try {
		const res = await proxy.$api.erp.projectbid.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.tableData.data = res.data;
		state.tableData.total = res.total;
	} finally {
		state.tableData.loading = false;
	}
};

//	项目报名
const onSubmit = (id: string) => {
	try {
		state.ruleForm.projectId = id
		state.ruleForm.companyId = "0"
		const res = proxy.$api.erp.projectcompany.signup(state.ruleForm);
		res.then(res => {
			if (res.errcode == 0) {
				ElMessage({
					message: '报名成功',
					type: 'success',
					plain: true,
					})
			} else {
				ElMessage({
					message: '报名失败',
					type: 'error',
					plain: true,
					})
			}
		}).catch(error => {
			ElMessage({
				message: '报名失败，出现错误：'+ error,
				type: 'error',
				plain: true,
				})
		});
	} finally {
	}
};

// 打开修改界面
const onModelEdit = (id: number) => {
	store.commit('project/getProjectId', id);
	state.isShowPage = false;
	projectDetailRef.value.openPage()
};
// 打开列表
const onModelList = () => {
	state.isShowPage = true;
};
//打开查看数据弹窗

const onModelSee = (id: string, state: boolean) => {
	seeDlgRef.value.openDialog(id, state);
};
// 跳转
const onToDetail = (id: string|number, projectId: string|number) => {
	store.commit('project/getProjectCompanyId', id)
	store.commit('project/getProjectId', projectId);
	projectDetailRef.value.openPage();
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
			const res = await proxy.$api.erp.projectbid.delete(id);
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
	state.tableData.param.current = val;
};

// 页面加载时
onMounted(() => {
	onGetTableData();
});

const { dateFormatYMDHM, dateFormat } = commonFunction();

</script>

<style scoped lang="scss">
</style>
