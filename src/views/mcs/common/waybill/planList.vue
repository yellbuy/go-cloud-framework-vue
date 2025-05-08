<template>
	<div class="base-freight-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="mainTableData.param" label-suffix="："  label-width="60px" :inline="true">
					<el-form-item label="关键字" style="width:160px">
						<el-input
							placeholder="输入关键字查询"
							v-model="mainTableData.param.keyword"/>
					</el-form-item>
					<el-form-item label="发货时间" style="width:250px; white-space: nowrap;" >
						<el-date-picker
							v-model="timeRange"
							type="daterange"
							unlink-panels
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							format="YYYY-MM-DD"
							date-format="YYYY/MM/DD"/>
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
				highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="60" fixed />
				<el-table-column prop="BillNo" label="单号" width="110" fixed></el-table-column>
				<el-table-column prop="GoodsName" label="货物" width="100"></el-table-column>
				<el-table-column prop="CustomerName" label="客户" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="WaybillMode" label="业务类型" width="70" align="center">
					<template #default="scope">
						<el-tag type="success" class="mr4" effect="dark" v-if="scope.row.WaybillMode==1">固定</el-tag>
						<el-tag type="danger" class="mr4" effect="dark" v-else-if="scope.row.WaybillMode==2">临配</el-tag>
						<el-tag type="warning" class="mr4" effect="dark" v-else-if="scope.row.WaybillMode==10">其他</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="PlanQty" label="计划数量" width="100" align="right">
				</el-table-column>
				<el-table-column prop="SenderPlanTime" label="计划月份" width="80" align="left" :formatter="dateFormatYM" show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="CompanyName" label="所属公司" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(100)" fixed="right">
					<template #default="scope">
						<el-dropdown split-button >
							{{ $t('message.action.operate') }}
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="onMainOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
										<el-text type="primary" >{{ $t('message.action.edit') }}</el-text>
									</el-dropdown-item>
									<el-dropdown-item @click="onMainOpenEditDlg(scope.row.Id, true)">
										<el-text >{{ $t('message.action.see') }}</el-text>
									</el-dropdown-item>
									<el-dropdown-item divided @click="onMainDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
										<el-text type="danger" >{{ $t('message.action.delete') }}</el-text>
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onMainHandleSizeChange"
				@current-change="onMainHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="mainTableData.param.pageNum"
				background
				v-model:page-size="mainTableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="mainTableData.total">
			</el-pagination>
		</el-card>
		<editMainDlg ref="editMainDlgRef" />
	</div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { ElMessageBox } from 'element-plus';
import 'splitpanes/dist/splitpanes.css';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import editMainDlg from './component/planLineEdit.vue';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'freightList',
	components: { editMainDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_waybill_plan`;
		const editMainDlgRef = ref();
		const editChildDlgRef = ref();
		const childMapDlgRef=ref();
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
			timeRange: [dayjs().startOf("month"), dayjs().endOf("month")],
			mainTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					sendPlanStartTime: "",
					sendPlanEndTime: "",
					waybillType:1,
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
		});
		state.mainTableData.param.pageIndex = computed(() => {
			return state.mainTableData.param.pageNum - 1;
		});

		//	重置查询条件
		const onMainResetSearch = () => {
			state.mainTableData.param.keyword = '';
			onMainGetTableData(true);
		};

		const onMainCurrentChange = (row) => {
			if(!row){
				return;
			}
			state.mainCurrentRow = row
		}

		//	初始化表格数据
		const onMainGetTableData = async (gotoFirstPage: boolean = false) => {
			if (state.timeRange && state.timeRange.length>1) {
				state.mainTableData.param.sendPlanStartTime = state.timeRange[0]
				state.mainTableData.param.sendPlanEndTime = state.timeRange[1]
			}
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

		//	打开弹窗
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
		//	打开弹窗
		const onMainOpenEditDlg = (id: string, ishow: boolean) => {
			editMainDlgRef.value.openDialog(state.kind, id, ishow);
		};
		//	删除用户
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

		//	分页改变
		const onMainHandleSizeChange = (val: number) => {
			state.mainTableData.param.pageSize = val;
			onMainGetTableData();
		};

		//	分页改变
		const onMainHandleCurrentChange = (val: number) => {
			state.mainTableData.param.pageNum = val;
			onMainGetTableData();
		};
		//	页面加载时
		onMounted(() => {
			onMainGetTableData();
		});

		const { dateFormatYM,dateFormatHMS,dateFormatHM } = commonFunction();

		return {
			proxy,
			editMainDlgRef,
			mainTableRef,
			onMainCurrentChange,
			onMainGetTableData,
			onMainResetSearch,
			onMainOpenEditDlg,
			onMainCopy,
			onMainDel,
			onMainHandleSizeChange,
			onMainHandleCurrentChange,
			dateFormatYM,
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
