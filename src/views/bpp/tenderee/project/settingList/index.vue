<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<el-tabs v-model="state.activeName" type="card" class="demo-tabs" @tab-change="onResetSearch">
				<el-tab-pane label="资格评审" name="zgps">
					<el-form :model="state.tableData.param" label-width="60px" :inline="true">
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
							<el-button type="info" @click="onGetTableData()">
								<el-icon>
									<Search />
								</el-icon>
								搜索
							</el-button>
							<el-button type="primary" @click="onOpenEditDlg(0)">创建</el-button>
						</el-form-item>
					</el-form>
					<el-table :data="state.tableData.data" style="width: 100%; margin-top: 10px;" v-loading="state.tableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
						<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed />
						<!-- <el-table-column prop="Name" label="评审项" width="120" show-overflow-tooltip /> -->
						<el-table-column prop="Content" label="评审内容" width="240" show-overflow-tooltip />
						<el-table-column prop="Standard" label="评审标准" width="300" show-overflow-tooltip />
						<el-table-column prop="State" label="评分方式" width="120" show-overflow-tooltip>
							<template #default="scope">
								<div v-if="scope.row.State === 0" style="display: flex; align-items: center;">
									<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
									<span >通过</span>
								</div>
								<div v-else-if="scope.row.State === 1" style="display: flex; align-items: center;">
									<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
									<span>不通过</span>
								</div>
							</template>
						</el-table-column>
						<!-- <el-table-column prop="Order" label="排序" width="100" align="center">
							<template #header>
								<el-button  type="text" v-if="state.tableData.data" 
									@click="proxy.$api.common.table.update('erp_project_setting','Order', state.tableData.data||[], 0)" v-auth:[moduleKey]="'btn.Edit'">
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;排序{{ $t('message.action.update') }}
								</el-button>
								<span v-no-auth:[moduleKey]="'btn.Edit'">排序</span>
							</template>
							<template #default="scope">
								<el-input type="number" placeholder="排序" v-model="scope.row.Order" input-style="text-align:right" v-auth:[moduleKey]="'btn.Edit'"> </el-input>
								<span v-no-auth:[moduleKey]="'btn.Edit'">{{scope.row.Order}}</span>
							</template>
						</el-table-column> -->
						<el-table-column prop="Remark" label="备注" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(150)" show-overflow-tooltip>
							<template #default="scope">
								<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id)">编辑</el-button>
								<el-button text bg type="danger" @click="onRowDel(scope.row.Id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="技术评审" name="jsps">
					<el-form :model="state.tableData.param" label-width="60px" :inline="true">
						<el-form-item label="评审内容">
							<el-input placeholder="请输入关键词" v-model="state.tableData.param.content" style="width: 150px;"/>
						</el-form-item>
						<el-form-item>
							<el-button type="info" @click="onResetSearch">
								<el-icon>
									<RefreshLeft />
								</el-icon>
								重置
							</el-button>
							<el-button type="info" @click="onGetTableData()">
								<el-icon>
									<Search />
								</el-icon>
								搜索
							</el-button>
							<el-button type="primary" @click="onOpenEditDlg(0)">创建</el-button>
						</el-form-item>
					</el-form>
					<el-table
						:data="state.tableData.data"
						style="width: 100%; margin-top: 10px;"
						v-loading="state.tableData.loading"
						:height="proxy.$calcMainHeight(-170)"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed/>
						<el-table-column prop="Content" label="评审内容" width="240" show-overflow-tooltip />
						<el-table-column prop="Standard" label="评审标准" width="300" show-overflow-tooltip />
						<el-table-column prop="TechnicalMaxScore" label="最高评分" align="right" width="90" />
						
						<!-- <el-table-column prop="Order" label="排序" width="100" align="center">
							<template #header>
								<el-button  type="text" v-if="state.jsTableData.data" 
									@click="proxy.$api.common.table.update('erp_project_setting','Order', state.jsTableData.data||[], 0)" v-auth:[moduleKey]="'btn.Edit'">
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;排序{{ $t('message.action.update') }}
								</el-button>
								<span v-no-auth:[moduleKey]="'btn.Edit'">排序</span>
							</template>
							<template #default="scope">
								<el-input type="number" placeholder="排序" v-model="scope.row.Order" input-style="text-align:right" v-auth:[moduleKey]="'btn.Edit'"> </el-input>
								<span v-no-auth:[moduleKey]="'btn.Edit'">{{scope.row.Order}}</span>
							</template>
						</el-table-column> -->
						<el-table-column prop="Remark" label="备注" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(150)" show-overflow-tooltip>
							<template #default="scope">
								<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id)">编辑</el-button>
								<el-button text bg type="danger" @click="onRowDel(scope.row.Id)">删除</el-button>
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
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
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
	activeName: 'zgps',
	scopeMode,
	scopeValue,
	tableData: {
		data: [],
		total: 0,
		param: {
			kind: 'zgps',
			current: 1,
			pageIndex: 0,
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
		state.tableData.loading = true;
		try {
			const res = await proxy.$api.erp.projectsetting.delete(id);
			if (res.errcode == 0) {
				if (res.errcode == 0) {
					onGetTableData()
				}
			}
		} finally {
			state.tableData.loading = false;
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
