<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item :label="'关键字：'">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.name"> </el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<RefreshLeft />
							</el-icon>
							&#8197;{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
						<el-button type="primary" @click="onOpenEditDlg(0, 0)" v-auth:[moduleKey]="'btn.CategoryAdd'">
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
				:data="tableData.data"
				style="width: 100%"
				v-loading="tableData.loading"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row
				lazy
				row-key="Id"
				:load="load"
				:tree-props="{ children: 'Children', hasChildren: 'HasChildren' }"
				ref="tableList"
				@expand-change="expandChange"
			>
				<!-- <el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip /> -->
				<el-table-column prop="Key" width="100" label="类别标识" show-overflow-tooltip />
				<el-table-column prop="Name" width="240" label="类别名称" show-overflow-tooltip />
				<el-table-column prop="State" label="状态" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-switch
							v-model="scope.row.State"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.CategoryEdit'"
							@change="proxy.$api.common.table.updateById('common_category', 'State', scope.row.Id, scope.row.State)"
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"
						/>
						<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.CategoryEdit'">{{
							$t('message.action.enable')
						}}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.CategoryEdit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Order" label="排序" width="100" align="center">
					<template #header>
						<el-button
							type="text"
							v-if="tableData.data"
							@click="proxy.$api.common.table.update('common_category', 'Order', tableData.data || [], 0)"
							v-auth:[moduleKey]="'btn.CategoryEdit'"
						>
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;排序{{ $t('message.action.update') }}
						</el-button>
						<span v-no-auth:[moduleKey]="'btn.CategoryEdit'">排序</span>
					</template>
					<template #default="scope">
						<el-input
							type="number"
							placeholder="排序"
							v-model="scope.row.Order"
							input-style="text-align:right"
							v-auth:[moduleKey]="'btn.CategoryEdit'"
						>
						</el-input>
						<span v-no-auth:[moduleKey]="'btn.CategoryEdit'">{{ scope.row.Order }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="Description" label="类别描述" show-overflow-tooltip />
				<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(230)" show-overflow-tooltip>
					<template #default="scope">
						<el-button type="primary" @click="onOpenEditDlg(0, scope.row.Id)" v-auth:[moduleKey]="'btn.CategoryAdd'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
						<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id, scope.row.Id)" v-auth:[moduleKey]="'btn.CategoryEdit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.CategoryDel'">
							<el-icon>
								<CloseBold />
							</el-icon>
							&#8197;{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<categoryEdit ref="categoryEditRef" />
	</div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import categoryEdit from './component/categoryEdit.vue';
export default {
	name: 'categoryList',
	components: { categoryEdit },
	setup() {
		const route = useRoute();
		const categoryEditRef = ref();
		const kind = route.params.type;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_common_category_${kind}`;
		const { proxy } = getCurrentInstance() as any;
		const tableList = ref(null);
		const tableMaps = ref(new Map());

		const state = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					name: '',
					pageNum: 1,
					pageSize: 20,
					fetchChild: false,
				},
			},
			lineState: false,
		});
		// 页面加载时
		onMounted(() => {
			onGetTableData(true);
		});
		const load = async (row, treeNode, resolve) => {
			console.log('加载子节点', treeNode, row.Id);
			let data = [];
			data = await onGetLineTableData(row.Id); //请求数据
			resolve(data);
			tableMaps.value.set(row.Id, { row, treeNode, resolve });
		};
		// 打开弹窗
		const onOpenEditDlg = (id: string, parentid: number) => {
			categoryEditRef.value.openDialog(state.kind, id, parentid);
		};
		const onGetLineTableData = async (parentid: number) => {
			let param = {
				pageNum: 1,
				pageSize: 10000,
				fetchChild: false,
				parentid: parentid,
			};
			const res = await proxy.$api.common.category.getHierarchyDataListByScope(state.kind, state.scopeMode, state.scopeValue, param);
			if (res.errcode != 0) {
				return;
			}
			return res.data;
		};
		//表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.common.commondata.getHierarchyDataListByScope(
					state.kind,
					state.scopeMode,
					state.scopeValue,
					state.tableData.param
				);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.name = '';
			onGetTableData(true);
		};
		const expandChange = async (row, expanded) => {
			let rtr = tableMaps.value.get(row.Id);
			if (rtr && expanded && !rtr.prevStatus) {
				// rtr.treeNode.loading = true;
				let data = [];
				data = await onGetLineTableData(row.Id);
				rtr.resolve(data);
				// load(rtr.row, rtr.treeNode, rtr.resolve);
			}
			if (rtr) {
				rtr.prevStatus = expanded;
			}
		};
		const tableOnReset = async (parentid: number) => {
			let rtr = tableMaps.value.get(parentid);
			if (rtr) {
				let data = [];
				data = await onGetLineTableData(parentid);
				rtr.resolve(data);
			}
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			onGetTableData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
			onGetTableData();
		};
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading = true;
				try {
					const res = await proxy.$api.common.category.delete(row.Id);
					if (res.errcode == 0) {
						onGetTableData();
						tableOnReset(row.Parentid);
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			});
		};
		return {
			categoryEditRef,
			tableMaps,
			expandChange,
			tableOnReset,
			load,
			onResetSearch,
			onOpenEditDlg,
			onGetLineTableData,
			onGetTableData,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			proxy,
			tableList,
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
