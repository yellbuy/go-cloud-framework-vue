<template>
	<div class="eshop-prepay-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item :label="'名称：'">
						<el-input placeholder="请输入名称查询" v-model="tableData.param.name"> </el-input>
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
						<el-button type="primary" @click="onOpenEditDlg()" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
					</el-form-item>
					<el-form-item> </el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData.data" v-loading="tableData.loading" :height="proxy.$calcMainHeight(-75)" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" />

				<el-table-column prop="ActImg" label="封面图" width="60" align="center">
					<template #default="scope">
						<el-image
							v-if="scope.row.ActImg"
							lazy
							preview-teleported
							style="width: 20px; height: 20px"
							:src="proxy.$utils.staticUrlParse(scope.row.ActImg)"
							hide-on-click-modal
							:preview-src-list="[proxy.$utils.staticUrlParse(scope.row.ActImg)]"
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
				<el-table-column prop="ActName" label="活动名称"> </el-table-column>
				<el-table-column prop="State" label="有效" width="80" align="center">
					<template #default="scope">
						<el-switch
							v-model="scope.row.State"
							inline-prompt
							v-auth:[moduleKey]="'btn.Edit'"
							:width="50"
							@change="proxy.$api.common.table.updateById('eshop_prepay_activity', 'State', scope.row.Id, scope.row.State)"
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"
						/>
						<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="PayAmount" label="售价" width="80" align="right" v-if="actMode == 0"> </el-table-column>
				<el-table-column prop="Amount" :label="actType == 0 ? '面值' : '上账'" width="80" align="right" v-if="actMode == 0"> </el-table-column>
				<el-table-column
					prop="Point"
					:label="actType == 1 ? '兑换积分' : actType == 2 || actMode == 10 ? '兑换金币' : ''"
					width="90"
					align="right"
					v-else-if="actMode == 1 || actMode == 10"
				>
				</el-table-column>
				<el-table-column
					prop="Qty"
					:label="actType == 13 ? '会员时长（月）' : actType == 15 ? '会员时长（年）' : ''"
					width="110"
					align="right"
					v-if="actMode == 10"
				>
				</el-table-column>
				<el-table-column prop="Order" label="排序" width="100" align="center">
					<template #header>
						<el-button
							type="text"
							v-if="tableData.data"
							@click="proxy.$api.common.table.update('eshop_prepay_activity', 'Order', tableData.data || [], 0)"
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

				<el-table-column prop="StartTime" label="活动开始时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="EndTime" label="活动结束时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip> </el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="right">
					<template #default="scope">
						<el-button-group>
							<el-button text bg type="info" @click="onCopyRow(scope.row)" v-auth:[moduleKey]="'btn.Add'">
								<el-icon><DocumentCopy /></el-icon>
								&#8197;{{ $t('message.action.copy') }}
							</el-button>
							<el-button text bg type="primary" @click="onOpenEditDlg(scope.row)" v-auth:[moduleKey]="'btn.Edit'">
								<el-icon><Edit /></el-icon>
								&#8197;{{ $t('message.action.edit') }}
							</el-button>
							<el-button text bg type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.Delete'">
								<el-icon><CloseBold /></el-icon>
								&#8197;{{ $t('message.action.delete') }}
							</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<dlgEdit ref="dlgEditRef" />
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import dlgEdit from './component/prepayEdit.vue';
import other from '/@/utils/other';
export default {
	name: 'eshopPrepayAmountList',
	components: { dlgEdit },
	setup() {
		const route = useRoute();

		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;

		const actMode = Number.parseInt(route.query.actMode || 0); //0：账户金额充值，1：账号积分充值，10：账户期限充值
		const actType = Number.parseInt(route.query.actType || 0); //上账类型或单位：0：元，1：积分，2：金币，3：点，10：小时，11：天，12：周，13：月，14：季度，15：年
		const moduleKey = `api_eshop_prepay_${kind}`;
		const { proxy } = getCurrentInstance() as any;
		const dlgEditRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			actMode,
			actType,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					kind,
					name: '',
					pageNum: 1,
					pageSize: 20,
				},
			},
		});

		/* 子表相关 */
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});

		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.name = '';
			onGetTableData(true);
		};
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.pageNum+1;
		// })

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			state.tableData.data = [];
			try {
				const res = await proxy.$api.eshop.prepay_activity.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.total = res.total;
				state.tableData.data = res.data;
			} finally {
				state.tableData.loading = false;
			}
		};

		// 记录复制
		const onCopyRow = (row: Object) => {
			if (!row) {
				return;
			}
			ElMessageBox.confirm(`确定要复制记录“${row.ActName}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				const model = JSON.parse(JSON.stringify(row));
				model.Id = '0';
				const res = await proxy.$api.eshop.prepay_activity.save(model);
				if (res.errcode == 0) {
					onGetTableData();
				}
				return false;
			});
		};

		// 打开修改弹窗
		const onOpenEditDlg = async (row: Object) => {
			if (!row) {
				row = { Kind: state.kind, state: 1, ActMode: actMode, ActType: actType, Amount: 0, Point: 0, PayAmount: 0, Qty: 0 };
			}
			dlgEditRef.value.openDialog(row, state.tableData.data);
		};
		// 删除记录
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.ActName}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading = true;
				try {
					const res = await proxy.$api.eshop.prepay_activity.delete(row.Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			});
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

		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			dlgEditRef,

			onGetTableData,
			onCopyRow,
			onResetSearch,
			onOpenEditDlg,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
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
