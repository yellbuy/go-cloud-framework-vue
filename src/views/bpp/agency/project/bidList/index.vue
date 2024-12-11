<template>
	<div>
		<el-card v-if="state.isShowPage">
			<el-form ref="searchFormRef" :model="state.tableData.param" label-suffix="：" label-width="80px" :inline="true">
				<el-form-item label="比选编号">
					<el-input placeholder="请输入比选编号查询" v-model="state.tableData.param.no" style="width: 150px;"/>
				</el-form-item>
				<el-form-item label="比选项目">
					<el-input placeholder="请输入比选项目查询" v-model="state.tableData.param.name" style="width: 150px;"/>
				</el-form-item>
				<el-form-item>
					<el-button type="info" @click="onResetSearch">
						<el-icon>
							<RefreshLeft />
						</el-icon>
						重置
					</el-button>
					<el-button type="info" @click="onGetTableData(true)">
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
				<el-table-column prop="No" label="招标编号" width="150" show-overflow-tooltip fixed/>
				<el-table-column prop="Kind" label="招标类型" width="100">
					<template #default="scope">
						<span v-if="scope.row.ProjectType == 1">公开招标</span>
						<span v-else-if="scope.row.ProjectType == 2">邀请招标</span>
						<span v-else-if="scope.row.ProjectType == 3">竞争性谈判</span>
						<span v-else-if="scope.row.ProjectType == 4">单一来源采购</span>
						<span v-else-if="scope.row.ProjectType == 5">询价采购</span>
					</template>
				</el-table-column>
				<el-table-column prop="Name" label="招标项目" width="200" show-overflow-tooltip/>
				
				<el-table-column prop="EndTime" label="报名截止日期" width="150" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
				<el-table-column prop="ReviewTime" label="开标日期" width="150"  :formatter="dateFormatYMDHM" show-overflow-tooltip/>
				<el-table-column prop="fanwei" label="招标范围" width="200" show-overflow-tooltip/>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(180)" fixed="right">
					<template #default="scope">
						<el-button text bg type="info" @click="onProjectSee(scope.row.Id, true)">项目详情</el-button>
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
	</div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import projectSeeDlg from '../../../tenderee/project/bidList/component/projectSee.vue';

const store = useStore();
const route = useRoute();
const kind = route.params.kind || 'bid';
const mode = route.params.mode;
const isBid = route.params.isBid;
const scopeMode = route.params.scopeMode || 0;
const scopeValue = route.params.scopeValue || 0;
const moduleKey = `api_pro_project_${kind}_${mode}`;
const { proxy } = getCurrentInstance() as any;
const projectSeeDlgRef = ref();
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
			current: 1,
			pageSize: 20,
			isBid: Boolean(isBid),
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

//打开项目查看弹窗
const onProjectSee = (dd: string, state: boolean) => {
	projectSeeDlgRef.value.openDialog(dd, state);
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

defineExpose({onGetTableData, ...toRefs(state)})

</script>

<style scoped lang="scss">
</style>
