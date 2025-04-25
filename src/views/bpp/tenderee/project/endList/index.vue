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
					<el-button type="info" @click="onResetSearch()">
						<el-icon>
							<RefreshLeft />
						</el-icon>
						重置
					</el-button>
					<el-button type="primary" @click="onGetTableData()">
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
				<el-table-column prop="No" label="项目编号" show-overflow-tooltip fixed/>
				<el-table-column prop="Name" label="项目名称" show-overflow-tooltip/>
				<el-table-column prop="Kind" label="招标类型" show-overflow-tooltip>
					<template #default="scope">
						<span v-if="scope.row.ProjectType == 1">公开招标</span>
						<span v-else-if="scope.row.ProjectType == 2">邀请招标</span>
						<span v-else-if="scope.row.ProjectType == 3">竞争性谈判</span>
						<span v-else-if="scope.row.ProjectType == 4">单一来源采购</span>
						<span v-else-if="scope.row.ProjectType == 5">询价采购</span>
					</template>
				</el-table-column>
				<el-table-column prop="fanwei" label="招标范围" show-overflow-tooltip/>
				<el-table-column prop="EndTime" label="报名截止日期" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
				<el-table-column prop="ReviewTime" label="开标日期" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(360)" fixed="right">
					<template #default="scope">
						<el-button type="primary" @click="onProjectSee(scope.row.Id, false)">项目详情</el-button>
						<el-button text bg type="primary" v-if="scope.row.state==0" @click="">查看废标理由</el-button>
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
			<projectSeeDlg ref="projectSeeDlgRef" />
		</el-card>
		<!-- <projectSelection ref="projectSelectionRef"/> -->
	</div>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, nextTick, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import projectSeeDlg from '../bidList/component/projectSee.vue';
import projectSelection from '../bidList/component/projectSelection.vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';

const store = useStore();
const route = useRoute();
const kind = route.params.kind||'bid';
const mode = route.params.mode;
const isBid = route.params.isBid;
const scopeMode = route.params.scopeMode || 0;
const scopeValue = route.params.scopeValue || 0;
const moduleKey = `api_pro_project_${kind}_${mode}`;
const { proxy } = getCurrentInstance() as any;
const projectSeeDlgRef = ref();
const projectSelectionRef = ref();
const state: any = reactive({
	isShowPage: true,
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
			pageSize: 20,
			finishTimeMd: 1,
			isBid: Boolean(isBid),
		},
	},
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//重置查询条件
const onResetSearch = () => {
	state.tableData.param.no = null
	state.tableData.param.name = null
	onGetTableData();
};

//	获取表格数据
const onGetTableData = async () => {
	state.tableData.loading = true;
	try {
		const res = await proxy.$api.erp.projectBid.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.tableData.data = res.data;
		state.tableData.total = res.total;
	} finally {
		state.tableData.loading = false;
	}
};

//打开查看详情页面
const onProjectSee = (Id: string, state: boolean) => {
	nextTick(() => {
		projectSeeDlgRef.value.openDialog(Id, state);
	});
};

// 打开重新评选页面
const onprojectSelection = (id: string) => {
	state.isShowPage = false;
	nextTick(() => {
		projectSelectionRef.value.openPage(id);
	});
};

//跳转
const onToRouter = () => {
	state.isShowPage = false;
	nextTick(() => {
		bidSelectionDlgRef.value.GetByIdRow();
	});
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
			if (res.errcode != 0) {
				return
			}
			onGetTableData();
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

const { dateFormatYMDHM, dateFormat } = commonFunction();

// 页面加载时
onMounted(() => {
	onGetTableData();
});

defineExpose({...toRefs(state)})

</script>

<style scoped lang="scss">
</style>
