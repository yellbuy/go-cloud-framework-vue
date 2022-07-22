<template>
	<div class="eshop-ad-container">
		<splitpanes class="default-theme" @resize="paneSize = $event[0].size">
			<pane :size="34">
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
								<el-button type="primary" @click="onOpenMainEditDlg()" v-auth:[moduleKey]="'btn.PositionAdd'">
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
						border
						stripe
						highlight-current-row
					>
						<el-table-column prop="PositionName" label="广告位名称" show-overflow-tooltip :width="100"> </el-table-column>
						<el-table-column prop="AdWidth" label="宽度" :width="50" align="right"> </el-table-column>
						<el-table-column prop="AdHeight" label="高度" :width="50" align="right"> </el-table-column>
						
						<el-table-column prop="Order" label="排序" :width="85" align="center">
							<template #header>
								<el-button
									type="text"
									v-if="mainTableData.data"
									@click="proxy.$api.common.table.update('eshop_ad_position', 'Order', mainTableData.data || [], 0)"
									v-auth:[moduleKey]="'btn.PositionEdit'"
								>
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;排序{{ $t('message.action.update') }}
								</el-button>
								<span v-no-auth:[moduleKey]="'btn.PositionEdit'">排序</span>
							</template>
							<template #default="scope">
								<el-input type="number" placeholder="排序" v-model="scope.row.Order" input-style="text-align:right" v-auth:[moduleKey]="'btn.PositionEdit'">
								</el-input>
								<span v-no-auth:[moduleKey]="'btn.PositionEdit'">{{ scope.row.Order }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="Id" label="标识" :width="160" align="right"> </el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(138)" fixed="right">
							<template #default="scope">
								<el-button-group>
									<el-button text bg type="primary" @click="onOpenMainEditDlg(scope.row)" v-auth:[moduleKey]="'btn.PositionEdit'">
										<el-icon><Edit /></el-icon>
										&#8197;{{ $t('message.action.edit') }}
									</el-button>
									<el-button text bg type="danger" @click="onMainRowDel(scope.row)" v-auth:[moduleKey]="'btn.PositionDel'">
										<el-icon><CloseBold /></el-icon>
										&#8197;{{ $t('message.action.delete') }}
									</el-button>
								</el-button-group>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</pane>
			<pane :size="66">
				<el-card shadow="hover">
					<div class="">
						<el-form ref="searchFormRef" :model="childTableData.param" label-width="90px" :inline="true">
							
							<el-form-item>
								<el-button info @click="onResetChildSearch">
									<el-icon>
										<RefreshLeft />
									</el-icon>
									&#8197;{{ $t('message.action.refresh') }}
								</el-button>
								<el-button type="primary" @click="onOpenChildEditDlg()" v-auth:[moduleKey]="'btn.AdAdd'">
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
					>
						<el-table-column type="index" label="序号" align="right" width="70" />

						<el-table-column prop="ImgUrl" label="封面图" width="70" align="center">
							<template #default="scope">
								<el-image
									v-if="scope.row.ImgUrl"
									lazy
									preview-teleported
									style="width: 50px; height: 50px"
									:src="proxy.$utils.staticUrlParse(scope.row.ImgUrl)"
									hide-on-click-modal
									:preview-src-list="[proxy.$utils.staticUrlParse(scope.row.ImgUrl)]"
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
						<el-table-column prop="AdName" label="广告名称" width="150"> </el-table-column>
						<el-table-column prop="AdPosition.PositionName" label="广告位" width="120"> </el-table-column>
						<el-table-column prop="Enabled" label="开启" width="80" align="center">
							<template #default="scope">
								<el-switch
									v-model="scope.row.Enabled"
									inline-prompt
									v-auth:[moduleKey]="'btn.AdEdit'"
									@change="proxy.$api.common.table.updateById('eshop_ad', 'Enabled', scope.row.Id, scope.row.Enabled)"
									:active-text="$t('message.action.yes')"
									:inactive-text="$t('message.action.no')"
									:active-value="1"
									:inactive-value="0"
								/>
								<el-tag type="success" effect="plain" v-if="scope.row.Enabled" v-no-auth:[moduleKey]="'btn.AdEdit'">{{
									$t('message.action.enable')
								}}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.AdEdit'">{{ $t('message.action.disable') }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="Order" label="排序" width="100" align="center">
							<template #header>
								<el-button
									type="text"
									v-if="childTableData.data"
									@click="proxy.$api.common.table.update('eshop_ad', 'Order', childTableData.data || [], 0)"
									v-auth:[moduleKey]="'btn.AdEdit'"
								>
									<el-icon>
										<Edit />
									</el-icon>
									&#8197;排序{{ $t('message.action.update') }}
								</el-button>
								<span v-no-auth:[moduleKey]="'btn.AdEdit'">排序</span>
							</template>
							<template #default="scope">
								<el-input
									type="number"
									placeholder="排序"
									v-model="scope.row.Order"
									input-style="text-align:right"
									v-auth:[moduleKey]="'btn.AdEdit'"
								>
								</el-input>
								<span v-no-auth:[moduleKey]="'btn.AdEdit'">{{ scope.row.Order }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="StartTime" label="开始时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
						<el-table-column prop="EndTime" label="结束时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
						<el-table-column prop="ExpireTime" label="过期时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip></el-table-column>
						<el-table-column prop="ClickCount" label="点击数" width="80" align="right"></el-table-column>
						<el-table-column prop="Id" label="标识" width="160" align="right"> </el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="right">
							<template #default="scope">
								<el-button-group>
									<el-button text bg info @click="onCopyChildRow(scope.row)" v-auth:[moduleKey]="'btn.AdAdd'">
										<el-icon><DocumentCopy /></el-icon>
										&#8197;{{ $t('message.action.copy') }}
									</el-button>
									<el-button text bg type="primary" @click="onOpenChildEditDlg(scope.row)" v-auth:[moduleKey]="'btn.AdEdit'">
										<el-icon><Edit /></el-icon>
										&#8197;{{ $t('message.action.edit') }}
									</el-button>
									<el-button text bg type="danger" @click="onChildRowDel(scope.row)" v-auth:[moduleKey]="'btn.AdDel'">
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

		<dlgMainEdit ref="dlgMainEditRef" :step="25" />
		<dlgChildEdit ref="dlgChildEditRef" :step="25" />
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import dlgMainEdit from './component/positionEdit.vue';
import dlgChildEdit from './component/adEdit.vue';
import other from '/@/utils/other';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
export default {
	name: 'eshopAdList',
	components: { dlgMainEdit, dlgChildEdit, Splitpanes, Pane },
	setup() {
		const route = useRoute();
		const kind = parseInt(route.params.kind)||0;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_eshop_ad_${kind}`;
		const { proxy } = getCurrentInstance() as any;
		const dlgMainEditRef = ref();
		const dlgChildEditRef = ref();
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
					positionId: 0,
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
				const res = await proxy.$api.eshop.adPosition.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.mainTableData.param);
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
			ElMessageBox.confirm(`确定要删除记录“${row.PositionName}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.mainTableData.loading = true;
				try {
					const res = await proxy.$api.eshop.adPosition.delete(row.Id);
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
			state.childTableData.param.positionId = row.Id || '0';
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
				const res = await proxy.$api.eshop.ad.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.childTableData.param);
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
			ElMessageBox.confirm(`确定要复制记录“${row.AdName}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				const model = JSON.parse(JSON.stringify(row));
				model.Id = '0';
				model.Key = '';
				const res = await proxy.$api.eshop.ad.save(model);
				if (res.errcode == 0) {
					onGetChildTableData();
				}
				return false;
			});
		};
		// 打开修改弹窗
		const onOpenChildEditDlg = async (row: Object) => {
			if (!row) {
				row = { Kind: state.kind, Enabled: 1, Order: 50 };
				if (state.childTableData.param.positionId != '0') {
					row.PositionId = state.childTableData.param.positionId;
				}
			} else {
				row.PositionId = row.AdPosition && row.AdPosition.Id || row.PositionId;
			}
			dlgChildEditRef.value.openDialog(row, state.mainTableData.data);
		};
		// 删除记录
		const onChildRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.AdName}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.childTableData.loading = true;
				try {
					const res = await proxy.$api.eshop.ad.delete(row.Id);
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
			onMainRefresh,
			onGetMainTableData,
			onOpenMainEditDlg,
			onMainRowDel,
			onMainCellClick,

			onGetChildTableData,
			onCopyChildRow,
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
