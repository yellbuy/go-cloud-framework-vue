<template>
	<div class="eshop-goods-container">
		<splitpanes class="default-theme" @resize="paneSize = $event[0].size">
			<pane :size="30">
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
						<el-table-column prop="ImgUrl" label="封面图" width="60" align="center">
							<template #default="scope">
								<el-image
									v-if="scope.row.ImgUrl"
									lazy
									preview-teleported
									style="width: 20px; height: 20px"
									:src="proxy.$utils.staticUrlParse(scope.row.ImgUrl)"
									hide-on-click-modal
									:preview-src-list="[proxy.$utils.staticUrlParse(scope.row.ImgUrl)]"
									:initial-index="0"
									fit="cover"
								>
									<template #error>
										<div class="image-slot">
											<SvgIcon name="el-Picture" />
										</div>
									</template>
								</el-image>
							</template>
						</el-table-column>
						<el-table-column prop="Title" label="标题" width="200">
							<template #default="scope">
								<SvgIcon name="fa fa-angle-right" /><span class="title-link ml5">{{ scope.row.Title }}</span>
							</template>
						</el-table-column>
						<!-- <el-table-column prop="SpecialName" label="所属专题" width="180" ></el-table-column> -->
						<el-table-column prop="CreateBy" label="创建人" width="70" show-overflow-tooltip></el-table-column>
						<el-table-column prop="CreateTime" label="创建时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
						<el-table-column prop="PublishTime" label="发布时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
						<el-table-column prop="State" label="状态" width="80" align="center">
							<template #default="scope">
								<el-switch
									v-model="scope.row.State"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.ArticleEdit'"
									@change="proxy.$api.common.table.updateById('cms_article', 'State', scope.row.Id, scope.row.State)"
									:active-text="$t('message.action.publish')"
									:inactive-text="$t('message.action.draft')"
									:active-value="1"
									:inactive-value="0"
								/>
								<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{
									$t('message.action.publish')
								}}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{ $t('message.action.draft') }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="AuditState" label="审核" width="80" align="center" show-overflow-tooltip>
							<template #default="scope">
								<el-switch
									v-model="scope.row.AuditState"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.ArticleAudit'"
									v-if="scope.row.State == 1"
									@change="proxy.$api.common.table.updateById('cms_article', 'AuditState', scope.row.Id, scope.row.AuditState)"
									:active-text="$t('message.action.approval')"
									:inactive-text="scope.row.AuditState == 0 ? $t('message.action.pending') : $t('message.action.disapproval')"
									:active-value="1"
									:inactive-value="scope.row.AuditState == 0 ? 0 : -1"
								/>

								<el-tag
									type="success"
									effect="plain"
									v-if="scope.row.State == 1 && scope.row.AuditState == 1"
									v-no-auth:[moduleKey]="'btn.ArticleAudit'"
									>{{ $t('message.action.approval') }}</el-tag
								>
								<el-tag
									type="danger"
									effect="plain"
									v-else-if="scope.row.State == 1 && scope.row.AuditState == -1"
									v-no-auth:[moduleKey]="'btn.ArticleAudit'"
									>{{ $t('message.action.disapproval') }}</el-tag
								>
								<el-tag type="info" effect="plain" v-else-if="scope.row.State == 1" v-no-auth:[moduleKey]="'btn.ArticleAudit'">{{
									$t('message.action.pending')
								}}</el-tag>
								<span></span>
							</template>
						</el-table-column>
						<el-table-column prop="IsTop" label="置顶" width="70" align="center">
							<template #default="scope">
								<el-switch
									v-model="scope.row.IsTop"
									inline-prompt
									v-auth:[moduleKey]="'btn.ArticleEdit'"
									@change="proxy.$api.common.table.updateById('cms_article', 'IsTop', scope.row.Id, scope.row.IsTop)"
									:active-text="$t('message.action.yes')"
									:inactive-text="$t('message.action.no')"
									:active-value="1"
									:inactive-value="0"
								/>
								<el-tag type="success" effect="plain" v-if="scope.row.IsTop" v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{
									$t('message.action.yes')
								}}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{ $t('message.action.no') }}</el-tag>
							</template>
						</el-table-column>

						<el-table-column prop="IsSwiper" label="轮播" width="80" align="center">
							<template #default="scope">
								<el-switch
									v-model="scope.row.IsSwiper"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.ArticleEdit'"
									@change="proxy.$api.common.table.updateById('cms_article', 'IsSwiper', scope.row.Id, scope.row.IsSwiper)"
									:active-text="$t('message.action.enable')"
									:inactive-text="$t('message.action.disable')"
									:active-value="1"
									:inactive-value="0"
								/>
								<el-tag type="success" effect="plain" v-if="scope.row.IsSwiper" v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{
									$t('message.action.enable')
								}}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{ $t('message.action.disable') }}</el-tag>
							</template>
						</el-table-column>

						<el-table-column prop="IsPromote" label="推荐" width="80" align="center">
							<template #default="scope">
								<el-switch
									v-model="scope.row.IsPromote"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.ArticleEdit'"
									@change="proxy.$api.common.table.updateById('cms_article', 'IsPromote', scope.row.Id, scope.row.IsPromote)"
									:active-text="$t('message.action.enable')"
									:inactive-text="$t('message.action.disable')"
									:active-value="1"
									:inactive-value="0"
								/>
								<el-tag type="success" effect="plain" v-if="scope.row.IsPromote" v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{
									$t('message.action.enable')
								}}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{ $t('message.action.disable') }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="ViewNum" label="虚拟阅读量" width="100" align="center">
							<template #header>
								<el-button
									type="text"
									v-if="childTableData.data"
									@click="proxy.$api.common.table.update('cms_article', 'ViewNum', childTableData.data || [], 0)"
									v-auth:[moduleKey]="'btn.ArticleEdit'"
								>
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;阅读量{{ $t('message.action.update') }}
								</el-button>
								<span v-no-auth:[moduleKey]="'btn.ArticleEdit'">阅读量</span>
							</template>
							<template #default="scope">
								<el-input
									type="number"
									placeholder="排序"
									v-model="scope.row.ViewNum"
									input-style="text-align:right"
									v-auth:[moduleKey]="'btn.ArticleEdit'"
								>
								</el-input>
								<span v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{ scope.row.ViewNum }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="ClickNum" label="阅读量" width="80" align="right"> </el-table-column>
						<el-table-column prop="FaviorNum" label="点赞数" width="80" align="right"></el-table-column>
						<el-table-column prop="ReplyNum" label="评论数" width="80" align="right"></el-table-column>
						<!-- <el-table-column prop="Order" label="排序" width="100" align="center">
							<template #header>
								<el-button
									type="text"
									v-if="childTableData.data"
									@click="proxy.$api.common.table.update('cms_article', 'Order', childTableData.data || [], 0)"
									v-auth:[moduleKey]="'btn.ArticleEdit'"
								>
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;排序{{ $t('message.action.update') }}
								</el-button>
								<span v-no-auth:[moduleKey]="'btn.ArticleEdit'">排序</span>
							</template>
							<template #default="scope">
								<el-input
									type="number"
									placeholder="排序"
									v-model="scope.row.Order"
									input-style="text-align:right"
									v-auth:[moduleKey]="'btn.ArticleEdit'"
								>
								</el-input>
								<span v-no-auth:[moduleKey]="'btn.ArticleEdit'">{{ scope.row.Order }}</span>
							</template>
						</el-table-column> -->
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
							<template #default="scope">
								<el-button-group>
									<!-- <el-button text bg type="info" @click="onCopyChildRow(scope.row)" v-auth:[moduleKey]="'btn.ArticleAdd'">
										<el-icon><DocumentCopy /></el-icon>
										&#8197;{{ $t('message.action.copy') }}
									</el-button> -->
									<el-button text bg type="primary" @click="onOpenChildEditDlg(scope.row)" v-auth:[moduleKey]="'btn.ArticleEdit'">
										<el-icon><Edit /></el-icon>
										&#8197;{{ $t('message.action.edit') }}
									</el-button>
									<el-button text bg type="danger" @click="onChildRowDel(scope.row)" v-auth:[moduleKey]="'btn.ArticleDel'">
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
import dlgDetail from './component/articleDetail.vue';
import dlgMainEdit from './component/categoryEdit.vue';
import dlgChildEdit from './component/forumEdit.vue';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'CmsForumList',
	components: { dlgMainEdit, dlgChildEdit, dlgDetail, Splitpanes, Pane },
	setup() {
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_cms_article_${kind}`;
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
					loadRelatedSel: false, //不加载栏目关联数据
				},
			},
			childTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					searchPage: 10, // 1：保司二级审核，2：保司三级审核，5：制作专家，6：审核专家，10：平台
					searchMode: 2, //0：所有，1：待审，2：已审，3：我审核的
					loadRelatedSel: false, //不加载栏目关联数据
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
				const res = await proxy.$api.cms.article.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.childTableData.param);
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
