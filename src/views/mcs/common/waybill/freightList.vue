<template>
	<div class="base-role-container">
			<splitpanes class="default-theme" @resize="paneSize = $event[0].size" style="height: 100%">
				<pane :size="58">
					<el-card shadow="hover">
						<div class="">
							<el-form ref="searchFormRef" :model="mainTableData.param" label-width="70px" :inline="true">
								<el-form-item label="关键字：">
									<el-input placeholder="输入关键字查询" style="width:100px" v-model="mainTableData.param.keyword"> </el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="info" @click="onMainResetSearch">
										<el-icon>
											<RefreshLeft />
										</el-icon>
										{{ $t('message.action.reset') }}
									</el-button>
									<el-button type="info" @click="onMainGetTableData(true)">
										<el-icon>
											<Search />
										</el-icon>
										&#8197;{{ $t('message.action.search') }}
									</el-button>
									<el-button type="primary" @click="onMainOpenEditDlg(0, false)" v-auth:[moduleKey]="'btn.Add'">
										<el-icon>
											<CirclePlusFilled />
										</el-icon>
										&#8197;{{ $t('message.action.add') }}
									</el-button>
								</el-form-item>
								<el-form-item></el-form-item>
							</el-form>
						</div>
					<el-table
						ref="mainTableRef"
						:data="mainTableData.data"
						@current-change="onMainCurrentChange"
						v-loading="mainTableData.loading"
						style="width: 100%"
						:height="proxy.$calcMainHeight(-75)"
						border
						stripe
						highlight-current-row
					>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
						<el-table-column prop="BillNo" label="单号" width="110" fixed></el-table-column>
						<el-table-column prop="GoodsName" label="货物" width="100"></el-table-column>
						<el-table-column prop="CustomerName" label="客户" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column prop="PlanWeight" label="执行进度" width="80" align="right">
							<template #default="scope">
								<el-tag type="success" effect="plain">{{ scope.row.Weight}} / {{scope.row.PlanWeight }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="SenderAddress" label="发货地址" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column prop="ReceiverAddress" label="收货地址" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column prop="CompanyName" label="所属公司" show-overflow-tooltip></el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(240)" fixed="right">
							<template #default="scope">
								<el-button text bg type="primary" @click="onMainCopy(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Copy'">
									{{ $t('message.action.copy') }}
								</el-button>
								<el-button text bg type="primary" @click="onMainOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
									{{ $t('message.action.edit') }}
								</el-button>
								<el-button text bg @click="onMainOpenEditDlg(scope.row.Id, true)" v-auth:[moduleKey]="'btn.Edit'">
									{{ $t('message.action.see') }}
								</el-button>
								<el-button text bg type="danger" @click="onMainDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
									{{ $t('message.action.delete') }}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="onMainHandleSizeChange"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="mainTableData.param.pageNum"
						background
						v-model:page-size="mainTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="mainTableData.total"
					>
					</el-pagination>
				</el-card>
				</pane>
				<pane :size="42">
					<el-card shadow="hover">
						<div class="">
							<el-form ref="searchFormRef" :model="childTableData.param" label-width="70px" :inline="true">
								<el-form-item label="关键字：">
									<el-input placeholder="输入关键字查询" style="width:100px" v-model="childTableData.param.keyword"> </el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="info" @click="onChildResetSearch">
										<el-icon>
											<RefreshLeft />
										</el-icon>
										{{ $t('message.action.reset') }}
									</el-button>
									<el-button type="info" @click="onChildGetTableData(true)">
										<el-icon>
											<Search />
										</el-icon>
										&#8197;{{ $t('message.action.search') }}
									</el-button>
									<el-button type="primary" @click="onChildOpenAddDlg(0, false)" v-auth:[moduleKey]="'btn.ChildAdd'">
										<el-icon>
											<CirclePlusFilled />
										</el-icon>
										&#8197;{{ $t('message.action.add') }}
									</el-button>
								</el-form-item>
								<el-form-item></el-form-item>
							</el-form>
						</div>
					<el-table
						ref="childTableRef"
						:data="childTableData.data"
						v-loading="childTableData.loading"
						style="width: 100%"
						:height="proxy.$calcMainHeight(-75)"
						border
						stripe
						selectable
						highlight-current-row
					>
						<el-table-column type="selection" width="55" align="center" fixed />
						<!-- <el-table-column type="index" label="序号" align="right" width="60" fixed /> -->
						<!-- <el-table-column prop="BillNo" label="单号" width="100" fixed></el-table-column> -->
						<el-table-column prop="VehicleNumber" label="车牌号" width="85" fixed></el-table-column>
						<el-table-column label="结束" width="70" align="center" show-overflow-tooltip>
							<template #default="scope">
								<el-switch
									v-model="scope.row.FinishState"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.ChildUpdate'"
									@change="proxy.$api.common.table.updateById('erp_waybill_line', 'finish_state', scope.row.Id, scope.row.FinishState)"
									:active-text="$t('message.action.yes')"
									:inactive-text="$t('message.action.no')"
									:active-value="1"
									:inactive-value="0"
								/>
								<el-tag type="success" effect="plain" v-if="scope.row.FinishState" v-no-auth:[moduleKey]="'btn.ChildEdit'">{{ $t('message.action.yes') }}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.ChildEdit'">{{ $t('message.action.') }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="CreateTime" label="创建时间" width="100" :formatter="dateFormatHM" show-overflow-tooltip></el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(180)" fixed="right">
							<template #default="scope">
								<el-button text bg type="primary" @click="onChildOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.ChildEdit'">
									{{ $t('message.action.edit') }}
								</el-button>
								<el-button text bg @click="onMainOpenEditDlg(scope.row.Id, true)" v-auth:[moduleKey]="'btn.ChildEdit'">
									{{ $t('message.action.see') }}
								</el-button>
								<el-button text bg type="danger" @click="onChildDel(scope.row.Id)" v-auth:[moduleKey]="'btn.ChildDel'">
									{{ $t('message.action.delete') }}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="onChildHandleSizeChange"
						@current-change="onChildHandleCurrentChange"
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
			
		
		<editMainDlg ref="editMainDlgRef" />
		<editChildDlg ref="editChildDlgRef" />
		<batchAddLineDlg ref="batchAddLineDlgRef" />
	</div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import editMainDlg from './component/freightEdit.vue';
import batchAddLineDlg from './component/freightLineBatchAdd.vue';
import editChildDlg from './component/freightLineEdit.vue';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'freightList',
	components: { editMainDlg, editChildDlg, batchAddLineDlg,Splitpanes, Pane },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_waybill_freight`;
		const editMainDlgRef = ref();
		const editChildDlgRef = ref();
		const batchAddLineDlgRef = ref();
		const mainTableRef = ref();
		const childTableRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			paneSize: 100,
			kind,
			scopeMode,
			scopeValue,
			mainCurrentRow:null,
			mainTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
			childTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					waybillId:'0',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
		});
		state.mainTableData.param.pageIndex = computed(() => {
			return state.mainTableData.param.pageNum - 1;
		});
		//重置查询条件
		const onMainResetSearch = () => {
			state.mainTableData.param.keyword = '';
			onMainGetTableData(true);
		};

		const onMainCurrentChange = (row) => {
			console.log(row);
			state.mainCurrentRow = row
			if(row){
				state.childTableData.param.waybillId=row.Id
			} else{
				state.childTableData.param.waybillId="0"
			}
			onChildGetTableData(true)
		}

		// 初始化表格数据
		const onMainGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.mainTableData.param.pageNum = 1;
			}
			state.mainTableData.loading = true;
			try {
				const res = await proxy.$api.erp.waybill.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.mainTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.mainTableData.data = res.data;
				state.mainTableData.total = res.total;
			} finally {
				state.mainTableData.loading = false;
			}
		};
		// 打开弹窗
		const onMainCopy = async (id: string, ishow: boolean) => {
			state.mainTableData.loading = true;
			try {
				const res = await proxy.$api.erp.waybill.copy(id);
				if (res.errcode == 0) {
					onMainGetTableData(true)
				}
			} finally {
				state.mainTableData.loading = false;
			}
			return false;
		};
		// 打开弹窗
		const onMainOpenEditDlg = (id: string, ishow: boolean) => {
			editMainDlgRef.value.openDialog(state.kind, id, ishow);
		};
		// 删除用户
		const onMainDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.waybill.delete(Id);
					if (res.errcode == 0) {
						onMainGetTableData();
					}
				} finally {
					state.mainTableData.loading = false;
				}
				return false;
			});
		};

		// 分页改变
		const onMainHandleSizeChange = (val: number) => {
			state.mainTableData.param.pageSize = val;
			onMainGetTableData();
		};
		// 分页改变
		const onMainHandleCurrentChange = (val: number) => {
			state.mainTableData.param.pageNum = val;
			onMainGetTableData();
		};

		state.childTableData.param.pageIndex = computed(() => {
			return state.childTableData.param.pageNum - 1;
		});
		//重置查询条件
		const onChildResetSearch = () => {
			state.childTableData.param.keyword = '';
			onChildGetTableData(true);
		};

		// 初始化表格数据
		const onChildGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.childTableData.param.pageNum = 1;
			}
			state.childTableData.loading = true;
			try {
				const res = await proxy.$api.erp.waybillLine.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.childTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.childTableData.data = res.data;
				state.childTableData.total = res.total;
			} finally {
				state.childTableData.loading = false;
			}
		};
		// 打开弹窗
		const onChildOpenAddDlg = (id: string, ishow: boolean) => {
			if(!state.mainCurrentRow){
				ElMessage.warning('请选择任务单再添加车辆');
				return;
			}
			batchAddLineDlgRef.value.openDialog(state.kind, state.mainCurrentRow.Id, ishow);
		};
		// 打开弹窗
		const onChildOpenEditDlg = (id: string, ishow: boolean) => {
			editChildDlgRef.value.openDialog(state.kind, id, ishow);
		};
		// 删除用户
		const onChildDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.waybillLine.delete(Id);
					if (res.errcode == 0) {
						onChildGetTableData();
					}
				} finally {
					state.childTableData.loading = false;
				}
				return false;
			});
		};

		// 分页改变
		const onChildHandleSizeChange = (val: number) => {
			state.childTableData.param.pageSize = val;
			onChildGetTableData();
		};
		// 分页改变
		const onChildHandleCurrentChange = (val: number) => {
			state.childTableData.param.pageNum = val;
			onChildGetTableData();
		};

		// 页面加载时
		onMounted(() => {
			onMainGetTableData();
		});

		const { dateFormatYMDHM,dateFormatHMS,dateFormatHM } = commonFunction();

		return {
			proxy,
			editMainDlgRef,
			editChildDlgRef,
			batchAddLineDlgRef,
			mainTableRef,
			childTableRef,
			onMainCurrentChange,
			onMainGetTableData,
			onMainResetSearch,
			onMainOpenEditDlg,
			onMainCopy,
			onMainDel,
			onMainHandleSizeChange,
			onMainHandleCurrentChange,
			onChildGetTableData,
			onChildResetSearch,
			onChildOpenAddDlg,
			onChildOpenEditDlg,
			onChildDel,
			onChildHandleSizeChange,
			onChildHandleCurrentChange,
			dateFormatYMDHM,
			dateFormatHMS,
			dateFormatHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.splitpanes__pane {
	justify-content: center;
	align-items: center;
	display: flex;
	position: relative;
	color: var(--color-primary-light-5);
	border: 1px solid #ebeef5;
}
</style>
