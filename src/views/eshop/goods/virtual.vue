<template>
	<div class="eshop-goods-container">
		<splitpanes class="default-theme" @resize="paneSize = $event[0].size">
			<pane :size="30">
				<el-card shadow="hover">
					<div class="">
						<el-form label-width="90px" :inline="true">
							<el-form-item>
								<el-button info @click="onGetMainTableData(true)">
									<el-icon>
										<Search />
									</el-icon>
									&#8197;{{ $t('message.action.refresh') }}
								</el-button>
								<el-button type="primary" @click="onOpenMainEditDlg()" v-auth:[moduleKey]="'btn.CategoryAdd'">
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
						<el-table-column prop="Name" label="类别" show-overflow-tooltip :width="200"> </el-table-column>

						<el-table-column prop="Order" label="排序" :width="80" align="center">
							<template #header>
								<el-button
									type="text"
									v-if="mainTableData.data"
									@click="proxy.$api.common.table.update('common_category', 'Order', mainTableData.data || [], 0)"
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
								<el-input type="number" placeholder="排序" v-model="scope.row.Order" input-style="text-align:right" v-auth:[moduleKey]="'btn.Edit'">
								</el-input>
								<span v-no-auth:[moduleKey]="'btn.Edit'">{{ scope.row.Order }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="Id" label="标识" :width="160" align="right"> </el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(138)" fixed="right">
							<template #default="scope">
								<el-button-group>
									<el-button text bg type="primary" @click="onOpenMainEditDlg(scope.row)" v-auth:[moduleKey]="'btn.CategoryEdit'">
										<el-icon><Edit /></el-icon>
										&#8197;{{ $t('message.action.edit') }}
									</el-button>
									<el-button text bg type="danger" @click="onMainRowDel(scope.row)" v-auth:[moduleKey]="'btn.CategoryDel'">
										<el-icon><CloseBold /></el-icon>
										&#8197;{{ $t('message.action.delete') }}
									</el-button>
								</el-button-group>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</pane>
			<pane :size="70">
				<el-card shadow="hover">
					<div class="">
						<el-form ref="searchFormRef" :model="childTableData.param" label-width="90px" :inline="true">
							<el-form-item :label="'关键字：'">
								<el-input placeholder="请输入关键字查询" v-model="childTableData.param.keyword"> </el-input>
							</el-form-item>
							<el-form-item>
								<el-button info @click="onResetChildSearch">
									<el-icon>
										<RefreshLeft />
									</el-icon>
									&#8197;{{ $t('message.action.reset') }}
								</el-button>
								<el-button info @click="onGetChildTableData(true)">
									<el-icon>
										<Search />
									</el-icon>
									&#8197;{{ $t('message.action.search') }}
								</el-button>
								<el-button type="primary" @click="onOpenChildEditDlg()" v-auth:[moduleKey]="'btn.GoodsAdd'">
									<el-icon>
										<CirclePlusFilled />
									</el-icon>
									&#8197;{{ $t('message.action.add') }}
								</el-button>
								<el-button type="danger" @click="onChildIdsDel()" v-auth:[moduleKey]="'btn.GoodsDel'">
									<el-icon><CloseBold /></el-icon>
									&#8197;{{ $t('message.action.batchdeletion') }}
								</el-button>
								<el-button type="primary" @click="download()" v-auth:[moduleKey]="'btn.CategoryAdd'">
									<el-icon>
										<Bottom />
									</el-icon>
									&#8197;{{ $t('message.action.download') }}
								</el-button>
								<el-upload
									class="upload-demo"
									:action="`${baseUrl}/v2/admin/eshop/goods/virtual/import/` + CategoryId"
									name="file"
									:limit="1"
									:headers="httpHeaders"
									:on-success="onImageUploadSuccess"
									:before-upload="onBeforeUpload"
									:show-file-list="false"
									style="margin-left: 15px"
								>
									<el-button type="primary">&#8197;{{ $t('message.action.import') }}</el-button>
								</el-upload>
							</el-form-item>
							<!-- <el-form-item label="所属类别" prop="CategoryId">
								<el-tree-select
									v-model="CategoryId"
									placeholder="请选择父级"
									default-expand-all
									node-key="Id"
									:value-key="Id"
									:current-node-key="CategoryId"
									:data="mainTableData.data"
									:props="{ label: 'Name', value: 'Id', children: 'Children' }"
									check-strictly
								/>
							</el-form-item> -->
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
						@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="55" />
						<el-table-column type="index" label="序号" align="right" width="70" />

						<el-table-column prop="GoodsImg" label="封面图" width="60" align="center">
							<template #default="scope">
								<el-image
									v-if="scope.row.GoodsImg"
									lazy
									preview-teleported
									style="width: 20px; height: 20px"
									:src="proxy.$utils.staticUrlParse(scope.row.GoodsImg)"
									hide-on-click-modal
									:preview-src-list="[proxy.$utils.staticUrlParse(scope.row.GoodsImg)]"
									:initial-index="0"
									fit="cover"
								>
									<template #error>
										<div class="image-slot">
											<el-icon>
												<Picture />
											</el-icon>
										</div>
									</template>
								</el-image>
							</template>
						</el-table-column>
						<el-table-column prop="GoodsName" label="名称" width="200"> </el-table-column>
						<el-table-column prop="GoodsNameStyle" label="文章号" width="200"> </el-table-column>
						<el-table-column prop="ExtensionCode" label="英文简称" width="200"> </el-table-column>
						<el-table-column prop="IsOnSale" label="在售" width="80" align="center">
							<template #default="scope">
								<el-switch
									v-model="scope.row.IsOnSale"
									inline-prompt
									v-auth:[moduleKey]="'btn.GoodsEdit'"
									@change="proxy.$api.common.table.updateById('eshop_goods', 'IsOnSale', scope.row.Id, scope.row.IsOnSale)"
									:active-text="$t('message.action.yes')"
									:inactive-text="$t('message.action.no')"
									:active-value="1"
									:inactive-value="0"
								/>
								<el-tag type="success" effect="plain" v-if="scope.row.IsOnSale" v-no-auth:[moduleKey]="'btn.GoodsEdit'">{{
									$t('message.action.enable')
								}}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.GoodsEdit'">{{ $t('message.action.disable') }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="IsTop" label="推荐" width="80" align="center">
							<template #default="scope">
								<el-switch
									v-model="scope.row.IsTop"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.GoodsEdit'"
									@change="proxy.$api.common.table.updateById('eshop_goods', 'IsTop', scope.row.Id, scope.row.IsTop)"
									:active-text="$t('message.action.enable')"
									:inactive-text="$t('message.action.disable')"
									:active-value="1"
									:inactive-value="0"
								/>
								<el-tag type="success" effect="plain" v-if="scope.row.IsTop" v-no-auth:[moduleKey]="'btn.GoodsEdit'">{{
									$t('message.action.enable')
								}}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.GoodsEdit'">{{ $t('message.action.disable') }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="Order" label="排序" width="100" align="center">
							<template #header>
								<el-button
									type="text"
									v-if="childTableData.data"
									@click="proxy.$api.common.table.update('eshop_goods', 'Order', childTableData.data || [], 0)"
									v-auth:[moduleKey]="'btn.GoodsEdit'"
								>
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;排序{{ $t('message.action.update') }}
								</el-button>
								<span v-no-auth:[moduleKey]="'btn.GoodsEdit'">排序</span>
							</template>
							<template #default="scope">
								<el-input
									type="number"
									placeholder="排序"
									v-model="scope.row.Order"
									input-style="text-align:right"
									v-auth:[moduleKey]="'btn.GoodsEdit'"
								>
								</el-input>
								<span v-no-auth:[moduleKey]="'btn.GoodsEdit'">{{ scope.row.Order }}</span>
							</template>
						</el-table-column>

						<el-table-column prop="Id" label="标识" width="160" align="right"> </el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="right">
							<template #default="scope">
								<el-button-group>
									<el-button text bg info @click="onCopyChildRow(scope.row)" v-auth:[moduleKey]="'btn.GoodsAdd'">
										<el-icon><DocumentCopy /></el-icon>
										&#8197;{{ $t('message.action.copy') }}
									</el-button>
									<el-button text bg type="primary" @click="onOpenChildEditDlg(scope.row)" v-auth:[moduleKey]="'btn.GoodsEdit'">
										<el-icon><Edit /></el-icon>
										&#8197;{{ $t('message.action.edit') }}
									</el-button>
									<el-button text bg type="danger" @click="onChildRowDel(scope.row)" v-auth:[moduleKey]="'btn.GoodsDel'">
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
	</div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox, ElNotification, UploadProps } from 'element-plus';
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import dlgMainEdit from './component/categoryEdit.vue';
import dlgChildEdit from './component/virtualEdit.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'eshopGoodsVirtualList',
	components: { dlgMainEdit, dlgChildEdit, Splitpanes, Pane },
	setup() {
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_eshop_goods_${kind}`;
		const { proxy } = getCurrentInstance() as any;
		const dlgMainEditRef = ref();
		const dlgChildEditRef = ref();
		const store = useStore();
		const token = Session.get('token');
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		const state: any = reactive({
			baseUrl: import.meta.env.VITE_API_URL,
			moduleKey: moduleKey,
			httpHeaders:proxy.$getRequestHeaders(),
			token: token,
			kind,
			scopeMode,
			scopeValue,
			CategoryId: null,
			selectData: [],
			mainTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					loadRelatedSel: false, //不加载栏目关联数据
				},
			},
			childTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					categoryId: 0,
					searchPage: 10, // 1：保司二级审核，2：保司三级审核，5：制作专家，6：审核专家，10：平台
					searchMode: 2, //0：所有，1：待审，2：已审，3：我审核的
					loadRelatedSel: false, //不加载栏目关联数据
					keyword: '',
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
				const res = await proxy.$api.common.category.getHierarchyDataList(state.kind, state.scopeMode, state.scopeValue, state.mainTableData.param);
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

		// 打开修改弹窗
		const onOpenMainEditDlg = async (row: Object) => {
			if (!row) {
				row = { Kind: state.kind, Order: 50 };
			}
			dlgMainEditRef.value.openDialog(row, state.mainTableData.data);
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
					const res = await proxy.$api.common.category.delete(row.Id);
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
			state.childTableData.param.categoryId = row.Id || '0';
			state.CategoryId = state.childTableData.param.categoryId;
			onGetChildTableData();
			// if(row && column.property=="Title"){
			// 	// const res=await proxy.$api.cms.article.getById(row.Id)
			// 	// if(res.errcode==0){
			// 	// 	dlgDetailRef.value.openDialog(res.data);
			// 	// }

			// }
		};

		const download = () => {
			console.log('下载模板');
			// var ishttps = 'https:' == document.location.protocol ? true : false;
			//window.location.host
			var url = import.meta.env.VITE_URL + '/static/download/eshop/eshop_goods.xlsx?var=' + (Math.random() * 10000).toString();
			console.log(url);
			// if (ishttps) {
			// 	url = 'https://' + url;
			// } else {
			// 	url = 'http://' + url;
			// }

			window.open(url);
		};
		/* 子表相关 */
		state.childTableData.param.pageIndex = computed(() => {
			return state.childTableData.param.pageNum - 1;
		});

		//重置查询条件
		const onResetChildSearch = () => {
			state.childTableData.param.keyword = '';
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
				const res = await proxy.$api.eshop.goods.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.childTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.childTableData.total = res.total;
				state.childTableData.data = res.data;
			} finally {
				state.childTableData.loading = false;
			}
		};

		// 记录复制
		const onCopyChildRow = (row: Object) => {
			if (!row) {
				return;
			}
			ElMessageBox.confirm(`确定要复制记录“${row.GoodsName}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				const model = JSON.parse(JSON.stringify(row));
				model.Id = '0';
				model.Key = '';
				const res = await proxy.$api.eshop.goods.save(model);
				if (res.errcode == 0) {
					onGetChildTableData();
				}
				return false;
			});
		};
		// 打开修改弹窗
		const onOpenChildEditDlg = async (row: Object) => {
			if (!row) {
				row = { Kind: state.kind, SpecialId: '0' };
				if (state.childTableData.param.categoryId != '0') {
					row.CategoryId = state.childTableData.param.categoryId;
				}
			}
			dlgChildEditRef.value.openDialog(row, state.mainTableData.data);
		};
		// 删除记录
		const onChildRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.GoodsName}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.childTableData.loading = true;
				try {
					const res = await proxy.$api.eshop.goods.delete(row.Id);
					if (res.errcode == 0) {
						onGetChildTableData();
					}
				} finally {
					state.childTableData.loading = false;
				}
				return false;
			});
		};
		// 删除记录
		const onChildIdsDel = () => {
			if (state.selectData.length <= 0) {
				ElNotification.error({
					title: '温馨提示',
					message: '请勾选要删除的数据',
				});
				return;
			}
			ElMessageBox.confirm(`确定要删除选中记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.childTableData.loading = true;
				let ids = [];
				for (let model of state.selectData) {
					ids.push(model.Id);
				}
				try {
					const res = await proxy.$api.eshop.goods.delete(ids);
					if (res.errcode == 0) {
						onGetChildTableData();
					}
				} finally {
					state.childTableData.loading = false;
				}
				return false;
			});
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
		const handleSelectionChange = (val: []) => {
			state.selectData = val;
		};
		const onBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
			state.httpHeaders=proxy.$getRequestHeaders();
			return true;
		};
		const onImageUploadSuccess: UploadProps['onSuccess'] = (res, uploadFile) => {
			console.log('onSuccess:', res);
			if (res.errcode != 0) {
				ElMessage.error(res.errmsg);
				return;
			}
			onGetChildTableData(true);
		};

		// 页面加载时
		onMounted(() => {
			onGetMainTableData(true);
			onGetChildTableData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			getUserInfos,
			dlgMainEditRef,
			dlgChildEditRef,
			onImageUploadSuccess,
			onBeforeUpload,
			onMainRefresh,
			onGetMainTableData,
			onOpenMainEditDlg,
			onMainRowDel,
			onMainCellClick,
			download,
			onGetChildTableData,
			onCopyChildRow,
			onResetChildSearch,
			onOpenChildEditDlg,
			onChildRowDel,
			onChildIdsDel,
			handleSelectionChange,
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
