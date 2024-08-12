<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="tabsName">
				<el-tab-pane label="资格评审" name="zgps">
					<el-form :model="zgTableData.param" label-width="60px" :inline="true">
						<el-form-item label="名称">
							<el-input placeholder="请输入名称" v-model="zgTableData.param.name" style="width: 150px;"/>
						</el-form-item>
						<el-form-item>
							<el-button type="info" @click="onResetSearch">
								<el-icon>
									<RefreshLeft />
								</el-icon>
								重置
							</el-button>
							<el-button type="info" @click="onGetZgTableData(true)">
								<el-icon>
									<Search />
								</el-icon>
								搜索
							</el-button>
							<el-button type="primary" @click="onOpenEditDlg(0)">创建</el-button>
						</el-form-item>
					</el-form>
					<el-table :data="zgTableData.data" style="width: 100%; margin-top: 10px;" v-loading="zgTableData.loading" :height="proxy.$calcMainHeight(-170)" border stripe highlight-current-row>
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
						<el-table-column prop="Order" label="排序" width="100" align="center">
							<template #header>
								<el-button  type="text" v-if="zgTableData.data" 
									@click="proxy.$api.common.table.update('erp_project_setting','Order', zgTableData.data||[], 0)" v-auth:[moduleKey]="'btn.Edit'">
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
						</el-table-column>
						<el-table-column prop="Remark" label="备注" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(150)" show-overflow-tooltip>
							<template #default="scope">
								<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id)">编辑</el-button>
								<el-button text bg type="danger" @click="onRowDel(scope.row.Id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="onHandleSizeChange"
						@current-change="onHandleCurrentChange"
						class="mt15"
						:page-sizes="[10, 20, 30]"
						v-model:current-page="zgTableData.param.current"
						background
						v-model:page-size="zgTableData.param.size"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="zgTableData.total">
					</el-pagination>
				</el-tab-pane>
				<el-tab-pane label="技术评审" name="jsps">
					<el-form :model="jsTableData.param" label-width="60px" :inline="true">
						<el-form-item label="名称">
							<el-input placeholder="请输入名称" v-model="jsTableData.param.name" style="width: 150px;"/>
						</el-form-item>
						<el-form-item>
							<el-button type="info" @click="onResetSearch">
								<el-icon>
									<RefreshLeft />
								</el-icon>
								重置
							</el-button>
							<el-button type="info" @click="onGetJsTableData(true)">
								<el-icon>
									<Search />
								</el-icon>
								搜索
							</el-button>
							<el-button type="primary" @click="onOpenEditDlg(0)">创建</el-button>
						</el-form-item>
					</el-form>
					<el-table
						:data="jsTableData.data"
						style="width: 100%; margin-top: 10px;"
						v-loading="jsTableData.loading"
						:height="proxy.$calcMainHeight(-170)"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed/>
						<el-table-column prop="Content" label="评审内容" width="240" show-overflow-tooltip />
						<el-table-column prop="Standard" label="评审标准" width="300" show-overflow-tooltip />
						<el-table-column prop="TechnicalMaxScore" label="最高评分" align="right" width="90" />
						
						<el-table-column prop="Order" label="排序" width="100" align="center">
							<template #header>
								<el-button  type="text" v-if="jsTableData.data" 
									@click="proxy.$api.common.table.update('erp_project_setting','Order', jsTableData.data||[], 0)" v-auth:[moduleKey]="'btn.Edit'">
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
						</el-table-column>
						、<el-table-column prop="Remark" label="备注" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(150)" show-overflow-tooltip>
							<template #default="scope">
								<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id)">编辑</el-button>
								<el-button text bg type="danger" @click="onRowDel(scope.row.Id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="onHandleSizeChange"
						@current-change="onHandleCurrentChange"
						class="mt15"
						:page-sizes="[10, 20, 30]"
						v-model:current-page="jsTableData.param.current"
						background
						v-model:page-size="jsTableData.param.size"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="jsTableData.total">
					</el-pagination>
				</el-tab-pane>
			</el-tabs>
		</el-card>
		<commondataEdit ref="editDlgRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import commondataEdit from './component/edit.vue';
export default {
	name: 'bidSettingList',
	components: { commondataEdit },
	setup() {
		const editDlgRef = ref();
		const route = useRoute();
		// const activeName = ref('zg');
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = 'tenderee_project_setting';
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			moduleKey: moduleKey,
			// supKindData: [], //类型
			activeName: 'zgps',
			scopeMode,
			scopeValue,
			zgTableData: {
				data: [{Content:"测试", Standard:"测试", State:0}],
				total: 0,
				loading: false,
				param: {
					mode: 1,
					current: 1,
					size: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
			jsTableData: {
				data: [{Content:"测试999", Standard:"测试999", TechnicalMaxScore:100}],
				total: 0,
				loading: false,
				param: {
					mode: 2,
					current: 1,
					size: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
		});
		// 页面加载时
		onMounted(() => {
			onLoadTable(true);
			// getPageCategoryList({ kind: 'supplier', current: 1, size: 10000 }).then((res) => {
			// 	if (res.errcode != 0) {
			// 		ElMessage.warning(res.errmsg);
			// 		return;
			// 	} else {
			// 		state.supKindData = res.data;
			// 	}
			// });
		});
		//切换页面
		const tabsName = () => {
			onLoadTable(true);
		};
		//刷新表格
		const onLoadTable = (refresh: boolean) => {
			console.log(state.activeName);
			if (state.activeName == 'zgps') {
				onGetZgTableData(refresh);
			} else if (state.activeName == 'jsps') {
				onGetJsTableData(refresh);
			}
		};
		// 打开弹窗
		const onOpenEditDlg = (id: string) => {
			editDlgRef.value.openDialog(state.activeName, id);
		};
		const onResetSearch = () => {
			if (state.activeName == 'zgps') {
				state.zgTableData.param.name = '';
				state.zgTableData.param.categoryId = null;
				onGetZgTableData(true);
			} else if (state.activeName == 'jsps') {
				state.jsTableData.param.name = '';
				state.jsTableData.param.categoryId = null;
				onGetJsTableData(true);
			}
		};
		//技术表格
		const onGetJsTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.jsTableData.param.current = 1;
			}
			state.jsTableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectsetting.getListByScope(state.scopeMode, state.scopeValue, state.jsTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.jsTableData.total = res.total;
				state.jsTableData.data = res.data;
			} finally {
				state.jsTableData.loading = false;
			}
		};
		//查询表格数据
		const onGetZgTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.zgTableData.param.current = 1;
			}
			state.zgTableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectsetting.getListByScope(state.scopeMode, state.scopeValue, state.zgTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.zgTableData.total = res.total;
				state.zgTableData.data = res.data;
			} finally {
				state.zgTableData.loading = false;
			}
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			if (state.activeName == 'zgps') {
				state.zgTableData.param.size = val;
				onGetZgTableData();
			} else if (state.activeName == 'jsps') {
				state.jsTableData.param.size = val;
				onGetJsTableData();
			}
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			if (state.activeName == 'zgps') {
				state.zgTableData.param.current = val;
				onGetZgTableData();
			} else if (state.activeName == 'jsps') {
				state.jsTableData.param.current = val;
				onGetJsTableData();
			}
		};
		const onRowDel = (id: number) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.zgTableData.loading = true;
				state.jsTableData.loading = true;
				try {
					const res = await proxy.$api.erp.projectsetting.delete(id);
					if (res.errcode == 0) {
						if (res.errcode == 0) {
							if (state.activeName == 'zgps') {
								onGetZgTableData();
							} else if (state.activeName == 'jsps') {
								onGetJsTableData();
							}
						}
					}
				} finally {
					state.zgTableData.loading = false;
					state.jsTableData.loading = false;
				}

				return false;
			});
		};
		return {
			editDlgRef,
			onOpenEditDlg,
			onGetJsTableData,
			onGetZgTableData,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			onResetSearch,
			tabsName,
			onLoadTable,
			proxy,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
	padding: 32px;
	background-color: #f4f5f7;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
</style>
