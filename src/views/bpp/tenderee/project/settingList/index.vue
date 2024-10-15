<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<el-tabs v-model="state.activeName" type="card" class="demo-tabs" @tab-change="onResetSearch">
				<el-form :model="state.tableData.param" label-suffix="：" label-width="85px" :inline="true">
					<el-form-item label="评审内容">
						<el-input placeholder="请输入关键词" v-model="state.tableData.param.content" style="width: 150px;"/>
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
						<el-button type="primary" @click="onOpenEditDlg(0)">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							创建
						</el-button>
					</el-form-item>
					<el-form-item></el-form-item>
				</el-form>
				<el-tab-pane label="资格评审" name="zgps">
					<el-table :data="state.tableData.data" style="width: 100%; margin-top: 10px;" v-loading="state.tableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
						<el-table-column type="index" label="序号" width="60" align="right" show-overflow-tooltip fixed />
						<el-table-column prop="Content" label="评审内容" width="240" show-overflow-tooltip />
						<el-table-column prop="Standard" label="评审标准" width="300" show-overflow-tooltip />
						<el-table-column prop="State" label="评分方式" width="150" show-overflow-tooltip>
							<template #default="scope">
								<el-radio v-model="scope.row.State" disabled :value="0">通过</el-radio>
								<el-radio v-model="scope.row.State" disabled :value="1">不通过</el-radio>
							</template>
						</el-table-column>
						<el-table-column prop="Remark" label="备注" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(150)" show-overflow-tooltip>
							<template #default="scope">
								<el-button type="primary" @click="onOpenEditDlg(scope.row.Id)">编辑</el-button>
								<el-button type="danger" @click="onRowDel(scope.row.Id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="技术评审" name="jsps">
					<el-table
						:data="state.tableData.data"
						style="width: 100%; margin-top: 10px;"
						v-loading="state.tableData.loading"
						:height="proxy.$calcMainHeight(-170)"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" width="60" align="right" show-overflow-tooltip fixed/>
						<el-table-column prop="Content" label="评审内容" width="240" show-overflow-tooltip />
						<el-table-column prop="Standard" label="评审标准" width="300" show-overflow-tooltip />
						<el-table-column prop="TechnicalMaxScore" label="最高评分" align="right" width="150" />
						<el-table-column prop="Remark" label="备注" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(150)" show-overflow-tooltip>
							<template #default="scope">
								<el-button type="primary" @click="onOpenEditDlg(scope.row.Id)">编辑</el-button>
								<el-button type="danger" @click="onRowDel(scope.row.Id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</el-card>
		<settingEdit ref="settingEditDlgRef" />
	</div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import settingEdit from './component/settingEdit.vue';

const settingEditDlgRef = ref();
const route = useRoute();
const scopeMode = route.params.scopeMode || 0;
const scopeValue = route.params.scopeValue || 0;
const moduleKey = 'tenderee_project_setting';
const { proxy } = getCurrentInstance() as any;
const state = reactive({
	moduleKey: moduleKey,
	loading: false,
	activeName: 'zgps',
	scopeMode,
	scopeValue,
	tableData: {
		data: [],
		loading: false,
		total: 0,
		param: {
			kind: 'zgps',
			current: 1,
			pageSize: 10000,
		},
	},
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//	打开编辑弹窗
const onOpenEditDlg = (id: string) => {
	settingEditDlgRef.value.openDialog(state.activeName, id);
};

//	重置搜索
const onResetSearch = () => {
	state.tableData.param.content = null
	state.tableData.param.kind = state.activeName
	onGetTableData();
};

//获取评审参数模版列表
const onGetTableData = async () => {
	state.tableData.loading = true;
	try {
		const res = await proxy.$api.erp.projectsetting.getListByScope(state.tableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.tableData.data = res.data
	} finally {
		state.tableData.loading = false;
	}
};

const onRowDel = (id: number) => {
	ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectsetting.delete(id);
			if (res.errcode != 0) {
				return
			}
			onGetTableData()
			ElMessage('删除成功')
		} finally {
			state.loading = false;
		}
		return false;
	});
};

// 页面加载时
onMounted(() => {
	onGetTableData();
});

defineExpose({onGetTableData})

</script>

<style scoped lang="scss">
</style>
