<template>
	<div class="base-business-warehouse-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="关键字：">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
					</el-form-item>
					<el-form-item label="日期" style="width:300px; white-space: nowrap;">
						<el-date-picker
							v-model="timeRange"
							type="daterange"
							unlink-panels
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							format="YYYY-MM-DD" />
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<RefreshLeft />
							</el-icon>
							{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="info" @click="onGetTableDtoData(true)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
						<el-button type="info" @click="onGetXlsData()" v-auth:[moduleKey]="'btn.ExportXls'">
							<el-icon>
								<Download />
							</el-icon>
							&#8197;{{ $t('message.action.export') }}
						</el-button>
						<el-button type="primary" @click="onOpenEditDlg(0, false)" v-auth:[moduleKey]="'btn.Add'">
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
				:data="tableData.data"
				v-loading="tableData.loading"
				style="width: 100%"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="50" fixed />
				<el-table-column prop="BusinessBillName" label="平台" width="120" fixed></el-table-column>
				<el-table-column prop="CustomerName" label="客户名称" width="300" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Amount" label="收入" width="80" align="right" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Volume" label="出租面积" width="80" align="right" show-overflow-tooltip></el-table-column>
				<el-table-column prop="BusinessBillVolume" label="平台面积" width="80" align="right" show-overflow-tooltip></el-table-column>
				<el-table-column prop="BillTime" label="日期" width="80" align="left" :formatter="dateFormatYMD" show-overflow-tooltip></el-table-column>
				<el-table-column label="有效" align="center" width="80">
					<template #default="scope">
						<el-switch
							v-model="scope.row.State"
							inline-prompt
							:width="46"
							v-auth:[moduleKey]="'btn.Edit'"
							@change="proxy.$api.common.table.updateById('erp_business_bill_line', 'state', scope.row.Id, scope.row.State)"
							:active-text="$t('message.action.enable')"
							:inactive-text="$t('message.action.disable')"
							:active-value="1"
							:inactive-value="0"/>
						<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="CompanyName" label="所属公司" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(180)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg @click="onOpenEditDlg(scope.row.Id, true)">
							{{ $t('message.action.see') }}
						</el-button>
						<el-button text bg type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
							{{ $t('message.action.delete') }}
						</el-button>
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
				:total="tableData.total">
			</el-pagination>
		</el-card>
		<editDlg ref="editDlgRef" />
	</div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import editDlg from './component/warehouseEdit.vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'warehouseList',
	components: { editDlg },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind||'warehouse';
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_fms_balance_warehouse`;
		const editDlgRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			timeRange: [new Date(), new Date()],
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					businessBillType:2, //1：计划，2：生产
					startTime: '',
					endTime: '',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
			
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			onGetTableDtoData(true);
		};


		//关联查询平台名称
		const onGetTableDtoData = async (gotoFirstPage: boolean = false) => {
			if (state.timeRange && state.timeRange.length > 1) {
				state.tableData.param.startTime = dayjs(state.timeRange[0]).set('hour', 8).set('minute', 0).set('second', 0).format('YYYY-MM-DD');
				state.tableData.param.endTime = dayjs(state.timeRange[1]).set('hour', 32).set('minute', 0).set('second', 0).format('YYYY-MM-DD');
			}
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.businessBillLine.getListDtoByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};

		// 导出表格数据
		const onGetXlsData = async () => {
			const res = await proxy.$api.erp.vehicle.exportXlsByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
			if (!res.data || res.data.size == 0) {
				return;
			} 
			// 返回不为空
			var url = window.URL.createObjectURL(res.data);
			var a = document.createElement('a');
			a.href = url;
			a.download = '车辆台账_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		};
		
		// 打开弹窗
		const onOpenEditDlg = (id: string, ishow: boolean) => {
			editDlgRef.value.openDialog(state.kind, id, ishow);
		};
		// 删除用户
		const onModelDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.businessBillLine.delete(Id);
					if (res.errcode == 0) {
						onGetTableDtoData();
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
			onGetTableDtoData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
			onGetTableDtoData();
		};
		// 页面加载时
		onMounted(() => {
			onGetTableDtoData();

			
		});

		const { dateFormatYMD,dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			editDlgRef,
			onGetXlsData,
			onResetSearch,
			onOpenEditDlg,
			onModelDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMD,
			dateFormatYMDHM,
			onGetTableDtoData,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
