<template>
	<div class="base-org-container">
		<splitpanes class="default-theme" @resize="paneSize = $event[0].size">
			<pane :size="40">
				<el-card shadow="hover">
					<div class="">
						
						<el-form label-width="90px" :inline="true">
							<el-form-item>
								<el-button type="info" @click="onGetMainTableData(true)">
									<el-icon>
										<Search />
									</el-icon>
									&#8197;{{ $t('message.action.refresh') }}
								</el-button>
								<el-button type="primary" @click="onOpenMainEditDlg()" v-auth:[moduleKey]="'btn.OrgAdd'">
									<el-icon>
										<CirclePlusFilled />
									</el-icon>
									&#8197;{{ $t('message.action.add') }}
								</el-button>
							</el-form-item>
							<el-form-item> </el-form-item>
						</el-form>
					</div>
					<el-table
						:data="mainTableData.data"
						row-key="Id"
						table-layout="fixed"
						:lazy="false"
						v-loading="mainTableData.loading"
						:height="proxy.$calcMainHeight(-35)"
						@cell-click="onMainCellClick"
						default-expand-all
						stripe
						highlight-current-row
						:tree-props="{ children: 'Children' }"
					>
					
						<el-table-column prop="Name" label="组织机构" show-overflow-tooltip :width="200"> </el-table-column>
						<el-table-column prop="OrgKind" label="类型" :width="80" align="center">
							<template #default="scope">
								<el-text type="info" v-if="scope.row.OrgKind=='org'">
									组织
								</el-text>
								<el-text type="primary" v-else-if="scope.row.OrgKind=='ogn'">
									机构
								</el-text>
								<el-text type="success" v-else-if="scope.row.OrgKind=='com'">
									分子公司
								</el-text>
								<el-text type="warning" v-else-if="scope.row.OrgKind=='dpt'">
									部门
								</el-text>
								<el-text type="danger" v-else-if="scope.row.OrgKind=='pos'">
									岗位
								</el-text>
							</template>
						</el-table-column>
						<el-table-column prop="Code" label="编码" width="90">
						</el-table-column>
						
						<el-table-column prop="Order" label="排序" :width="80" align="center">
							<template #header>
								<el-button
									type="text"
									v-if="mainTableData.data"
									@click="proxy.$api.common.table.update('base_org', 'Order', mainTableData.data || [], 0)"
									v-auth:[moduleKey]="'btn.OrgEdit'"
								>
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;排序{{ $t('message.action.update') }}
								</el-button>
								<span v-no-auth:[moduleKey]="'btn.OrgEdit'">排序</span>
							</template>
							<template #default="scope">
								<el-input type="number" placeholder="排序" v-model="scope.row.Order" input-style="text-align:right" v-auth:[moduleKey]="'btn.OrgEdit'">
								</el-input>
								<span v-no-auth:[moduleKey]="'btn.OrgEdit'">{{ scope.row.Order }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="Id" label="标识" :width="160" align="right"> </el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(138)" fixed="right">
							<template #default="scope">
								<el-button-group>
									<el-button text bg type="primary" @click="onOpenMainEditDlg(scope.row.Id,scope.row.Parentid)" v-auth:[moduleKey]="'btn.OrgEdit'">
										<el-icon><Edit /></el-icon>
										&#8197;{{ $t('message.action.edit') }}
									</el-button>
									<el-button text bg type="danger" @click="onMainRowDel(scope.row)" v-auth:[moduleKey]="'btn.OrgDel'">
										<el-icon><CloseBold /></el-icon>
										&#8197;{{ $t('message.action.delete') }}
									</el-button>
								</el-button-group>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</pane>
			<pane :size="60">
				<el-card shadow="hover">
					<div class="">
						<el-form ref="searchFormRef" :model="childTableData.param" label-width="90px" :inline="true">
							<el-form-item :label="'关键字：'">
								<el-input placeholder="请输入关键字查询" v-model="childTableData.param.keyword"> </el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="info" @click="onResetChildSearch">
									<el-icon>
										<RefreshLeft />
									</el-icon>
									&#8197;{{ $t('message.action.reset') }}
								</el-button>
								<el-button type="info" @click="onGetChildTableData(true)">
									<el-icon>
										<Search />
									</el-icon>
									&#8197;{{ $t('message.action.search') }}
								</el-button>
								<el-button type="primary" @click="onOpenChildEditDlg()" v-auth:[moduleKey]="'btn.ArticleAdd'">
									<el-icon>
										<CirclePlusFilled />
									</el-icon>
									&#8197;{{ $t('message.action.add') }}
								</el-button>
							</el-form-item>
							<el-form-item> </el-form-item>
						</el-form>
					</div>
					<el-table
						:data="childTableData.data"
						v-loading="childTableData.loading"
						:height="proxy.$calcMainHeight(-75)"
						border
						stripe
						highlight-current-row
						@cell-click="onCellClick"
					>
						<el-table-column type="index" label="序号" align="right" width="70" fixed />
						<el-table-column prop="Id" label="标识" width="160" align="right"> </el-table-column>
						<el-table-column prop="Code" label="编码" width="90">
						</el-table-column>
						<el-table-column prop="Name" label="姓名" width="90">
						</el-table-column>
						<el-table-column prop="Position" label="职务" width="90">
						</el-table-column>
						<!-- <el-table-column prop="SpecialName" label="所属专题" width="180" ></el-table-column> -->
						<el-table-column prop="CreateBy" label="创建人" width="70" show-overflow-tooltip></el-table-column>
						<el-table-column prop="CreateTime" label="创建时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
						<el-table-column prop="PublishTime" label="发布时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
						
						<el-table-column prop="Enable" label="状态" width="80" align="center" show-overflow-tooltip>
							<template #default="scope">
								<el-switch
									v-model="scope.row.AuditState"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.Edit'"
									v-if="scope.row.State == 1"
									@change="proxy.$api.common.table.updateById('base_person', 'Enable', scope.row.Id, scope.row.Enable)"
									:active-text="$t('message.action.enable')"
									:inactive-text="scope.row.Enable == 0 ? $t('message.action.enable') : $t('message.action.disable')"
									:active-value="1"
									:inactive-value="scope.row.Enable == 0 ? 0 : -1"
								/>

								<el-tag
									type="success"
									effect="plain"
									v-if="scope.row.Enable == 1"
									v-no-auth:[moduleKey]="'btn.Edit'"
									>{{ $t('message.action.enable') }}</el-tag
								>
								<el-tag
									type="danger"
									effect="plain"
									v-else-if="scope.row.Enable == 1"
									v-no-auth:[moduleKey]="'btn.Edit'"
									>{{ $t('message.action.disable') }}</el-tag
								>
								<el-tag type="info" effect="plain" v-else-if="scope.row.Enable == 1" v-no-auth:[moduleKey]="'btn.Edit'">{{
									$t('message.action.enable')
								}}</el-tag>
								<span></span>
							</template>
						</el-table-column>
						<el-table-column prop="Order" label="排序" width="100" align="center">
							<template #header>
								<el-button
									type="text"
									v-if="childTableData.data"
									@click="proxy.$api.base.table.update('base_person', 'Order', childTableData.data || [], 0)"
									v-auth:[moduleKey]="'btn.Edit'"
								>
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;排序{{ $t('message.action.update') }}
								</el-button>
								<span v-no-auth:[moduleKey]="'btn.Edit'">排序</span>
							</template>
							<template #default="scope">
								<el-input
									type="number"
									placeholder="排序"
									v-model="scope.row.Order"
									input-style="text-align:right"
									v-auth:[moduleKey]="'btn.Edit'"
								>
								</el-input>
								<span v-no-auth:[moduleKey]="'btn.Edit'">{{ scope.row.Order }}</span>
							</template>
						</el-table-column>
						
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
							<template #default="scope">
								<el-button-group>
									<!-- <el-button text bg type="info" @click="onCopyChildRow(scope.row)" v-auth:[moduleKey]="'btn.ArticleAdd'">
										<el-icon><DocumentCopy /></el-icon>
										&#8197;{{ $t('message.action.copy') }}
									</el-button> -->
									<el-button text bg type="primary" @click="onOpenChildEditDlg(scope.row)" v-auth:[moduleKey]="'btn.Edit'">
										<el-icon><Edit /></el-icon>
										&#8197;{{ $t('message.action.edit') }}
									</el-button>
									<el-button text bg type="danger" @click="onChildRowDel(scope.row)" v-auth:[moduleKey]="'btn.Del'">
										<el-icon><CloseBold /></el-icon>
										&#8197;{{ $t('message.action.delete') }}
									</el-button>
								</el-button-group>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="onHandleChildSizeChange"
						@current-change="onHandleChildCurrentChange"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="childTableData.param.pageNum"
						background
						v-model:page-size="childTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="childTableData.total"
					>
					</el-pagination>
				</el-card>
			</pane>
		</splitpanes>

		<dlgMainEdit ref="dlgMainEditRef" :allow-edit-category="false" :allow-edit-special="false" :step="25" />
		<dlgChildEdit ref="dlgChildEditRef" :allow-edit-category="false" :allow-edit-special="false" :step="25" />
		<dlgDetail ref="dlgDetailRef" :step="25" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import dlgMainEdit, { default as dlgChildEdit, default as dlgDetail } from './component/orgEdit.vue';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'BaseOrgList',
	components: { dlgMainEdit, dlgChildEdit, dlgDetail, Splitpanes, Pane },
	setup() {
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_base_person`;
		const { proxy } = getCurrentInstance() as any;
		const dlgMainEditRef = ref();
		const dlgChildEditRef = ref();
		const dlgDetailRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			mainTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
				},
			},
			childTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					cateId: 0,
					pageNum: 1,
					pageSize: 20,
				},
			},
		});

		/* 主表相关 */

		//刷新
		const onMainRefresh = () => {
			onGetMainTableData();
		};

		// 初始化表格数据
		const onGetMainTableData = async (loadFirstChildData: boolean = false) => {
			state.mainTableData.loading = true;
			state.mainTableData.data = [];
			try {
				const res = await proxy.$api.base.org.getTree(state.mainTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.mainTableData.total = res.total;
				state.mainTableData.data = res.data;
				// if(loadFirstChildData && state.mainTableData.data.length){
				// 	onGetChildTableData(true)
				// }
			} finally {
				state.mainTableData.loading = false;
			}
		};

		// 打开弹窗
		const onOpenMainEditDlg = (id: string,parentid:string, disable: boolean=false) => {
			dlgMainEditRef.value.openDialog(id, state.mainTableData.data, parentid, disable);
		};
		// 删除记录
		const onMainRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.Name}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.mainTableData.loading = true;
				try {
					const res = await proxy.$api.base.org.delete(row.Id);
					if (res.errcode == 0) {
						onGetMainTableData();
					}
				} finally {
					state.childTableData.loading = false;
				}
				return false;
			});
		};

		const onMainCellClick = async (row: any, column: any, cell: any, event: any) => {
			console.log(column);
			state.childTableData.param.cateId = row.Id || '0';
			onGetChildTableData();
			// if(row && column.property=="Title"){
			// 	// const res=await proxy.$api.cms.article.getById(row.Id)
			// 	// if(res.errcode==0){
			// 	// 	dlgDetailRef.value.openDialog(res.data);
			// 	// }

			// }
		};

		/* 子表相关 */
		state.childTableData.param.pageIndex = computed(() => {
			return state.childTableData.param.pageNum - 1;
		});

		//重置查询条件
		const onResetChildSearch = () => {
			state.childTableData.param.keyword = '';
			state.childTableData.param.cateId = 0;
			onGetChildTableData(true);
		};
		// effect(()=>{
		// 	state.childTableData.param.pageIndex = state.childTableData.param.pageNum+1;
		// })

		// 初始化表格数据
		const onGetChildTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.childTableData.param.pageNum = 1;
			}
			state.childTableData.loading = true;
			state.childTableData.data = [];
			try {
				const res = await proxy.$api.base.person.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.childTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.childTableData.total = res.total;
				state.childTableData.data = res.data;
			} finally {
				state.childTableData.loading = false;
			}
		};

		// 打开修改弹窗
		const onOpenChildEditDlg = async (row: Object) => {
			if (!row) {
				row = { Kind: state.kind, SpecialId: '0' };
				if (state.childTableData.param.categoryId == '0') {
					row.CategoryId = state.childTableData.param.categoryId;
				}
			} else {
				row.CategoryId = row.Category.Id;
			}
			console.log(row);
			dlgChildEditRef.value.openDialog(row, state.mainTableData.data);
		};
		// 删除记录
		const onChildRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.Title}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.childTableData.loading = true;
				try {
					const res = await proxy.$api.cms.article.delete(row.Id);
					if (res.errcode == 0) {
						onGetChildTableData();
					}
				} finally {
					state.childTableData.loading = false;
				}
				return false;
			});
		};
		const onCellClick = async (row: any, column: any, cell: any, event: any) => {
			console.log(column);
			if (row && column.property == 'Title') {
				const res = await proxy.$api.cms.article.getById(row.Id);
				if (res.errcode == 0) {
					dlgDetailRef.value.openDialog(res.data);
				}
			}
		};
		// 分页改变
		const onHandleChildSizeChange = (val: number) => {
			state.childTableData.param.pageSize = val;
			onGetChildTableData();
		};
		// 分页改变
		const onHandleChildCurrentChange = (val: number) => {
			state.childTableData.param.pageNum = val;
			onGetChildTableData();
		};

		// 页面加载时
		onMounted(() => {
			onGetMainTableData(true);
			onGetChildTableData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			dlgMainEditRef,
			dlgChildEditRef,
			dlgDetailRef,
			onMainRefresh,
			onGetMainTableData,
			onOpenMainEditDlg,
			onMainRowDel,
			onMainCellClick,
			onCellClick,
			onGetChildTableData,
			// onCopyChildRow,
			onResetChildSearch,
			onOpenChildEditDlg,
			onChildRowDel,
			onHandleChildSizeChange,
			onHandleChildCurrentChange,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.title-link {
	text-decoration: none;
	color: var(--el-color-primary-dark-2);
	cursor: pointer;
}
.title-link:hover {
	text-decoration: none;
	border-bottom: 1px solid var(--el-color-primary-dark-2); /* #555换成链接的颜色 */
	display: inline-block;
	padding-bottom: 0px;
	color: var(--el-color-primary-dark-2);
	cursor: pointer;
}
</style>
