<template>
	<div>
		<el-card v-if="state.isShowPage === 'list'">
			<div>
				<el-form ref="searchFormRef" :model="state.tableData.param" label-suffix="：" label-width="80px" :inline="true">
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
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-75)" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" show-overflow-tooltip fixed />
				<el-table-column prop="No" label="项目编号"  width="160" show-overflow-tooltip fixed/>
				<el-table-column prop="Name" label="项目名称" show-overflow-tooltip/>
				<el-table-column prop="Kind" label="参与方式" width="100">
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
						<el-button text bg type="info" @click="onModelSee(scope.row.ProjectId, true)">详情</el-button>
						<el-button text bg type="primary" @click="onTodo(scope.row)">待办</el-button>
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
		<projectTodoEdit ref="projectTodoEditRef" v-if="state.isShowPage === 'todo'"/>
	</div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import projectTodoEdit from './component/projectTodoEdit.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import seeDlg from '/@/views/bpp/tenderee/project/bidList/component/projectSee.vue';

const store = useStore();
const route = useRoute();
const kind = route.params.kind;
const mode = route.params.mode;
const isBid = route.params.isBid;
const scopeMode = route.params.scopeMode || 0;
const scopeValue = route.params.scopeValue || 3;
const moduleKey = `api_pro_project_${kind}_${mode}`;
const { proxy } = getCurrentInstance() as any;
const seeDlgRef = ref();
const projectTodoEditRef = ref();
const state: any = reactive({
	isShowPage: 'list',
	moduleKey: moduleKey,
	kind,
	scopeMode,
	scopeValue,
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			kind: "bid",
			current: 1,
			pageSize: 20,
		},
	},
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

//打开查看数据弹窗
const onModelSee = (id: string, state: boolean) => {
	nextTick(() => {
		seeDlgRef.value.openDialog(id, state);
	});
};

// 打开待办
const onTodo = (data: {}) => {
	state.isShowPage = 'todo';
	nextTick(() => {
		projectTodoEditRef.value.openPage(data);
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

defineExpose({onGetTableData, ...toRefs(state)})

const { dateFormatYMDHM, dateFormat } = commonFunction();

</script>

<style scoped lang="scss">
</style>
