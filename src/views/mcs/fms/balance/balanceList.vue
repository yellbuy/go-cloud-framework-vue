<template>
	<div class="base-user-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item :label="'关键字：'">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
					</el-form-item>
					<el-form-item :label="'录入时间：'">
						<el-date-picker
							v-model="timeList"
							type="datetimerange"
							range-separator="到"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							value-format="YYYY-MM-DD HH:mm:ss"
						/>
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
						<el-button type="primary" @click="onOpenEditDlg('0')" v-auth:[moduleKey]="'btn.Add'">
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
			>
				<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
				<el-table-column prop="BalanceTime" width="140" label="日期" :formatter="dateFormatYMDHM"  show-overflow-tooltip />
				<el-table-column prop="No" width="240" label="流水号" show-overflow-tooltip />
				<el-table-column prop="Title" width="240" label="标题" show-overflow-tooltip />
				<!-- <el-table-column prop="State" label="状态" width="80" align="center" show-overflow-tooltip>
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
				</el-table-column> -->
				<el-table-column prop="BalanceRecharge" label="总收入" show-overflow-tooltip />
				<el-table-column prop="BalanceExpend" label="总支出" show-overflow-tooltip />
				<el-table-column prop="BalanceMoney" label="余额" show-overflow-tooltip />
				<el-table-column prop="Remark" label="备注" show-overflow-tooltip />
				<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(230)" show-overflow-tooltip>
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.Del'">
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
		<balanceEdit ref="balanceEditRef" />
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import { ElMessageBox } from 'element-plus';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import balanceEdit from './component/balanceEdit.vue';
export default {
	name: 'balanceList',
	components: { balanceEdit },
	setup() {
		const route = useRoute();
		const balanceEditRef = ref();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_fms_balance_${kind}`;
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			timeList:[],
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 20,
					endTime:'',
					startTime:''
				},
			},
		});
		// 页面加载时
		onMounted(() => {
			onGetTableData(true);
		});
		// 打开弹窗
		const onOpenEditDlg = (id: string) => {
			balanceEditRef.value.openDialog(state.kind, id);
		};
		//表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			if (state.timeList && state.timeList.length == 2) {
				state.tableData.param.startTime = state.timeList[0];
				state.tableData.param.endTime = state.timeList[1];
			} else {
				state.tableData.param.startTime = '';
				state.tableData.param.endTime = '';
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.fms.balance.getListByScope(
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
			state.tableData.param.keyword = '';
			onGetTableData(true);
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
					const res = await proxy.$api.fms.balance.delete(row.Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			});
		};
		
		const { dateFormatYMDHM } = commonFunction();
		return {
			balanceEditRef,
			dateFormatYMDHM,
			onResetSearch,
			onOpenEditDlg,
			onGetTableData,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
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
