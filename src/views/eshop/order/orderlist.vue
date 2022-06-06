<template>
	<div class="ims-case-firstaudit-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="80px" :inline="true">
					<el-form-item :label="'支付时间：'">
						<el-date-picker
							v-model="timeList"
							type="datetimerange"
							:shortcuts="shortcuts"
							range-separator="到"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							value-format="YYYY-MM-DD HH:mm:ss"
						/>
					</el-form-item>
					<el-form-item :label="'类型：'">
						<el-select v-model="tableData.param.ExtTag" placeholder="请选择" style="width: 90px">
							<el-option v-for="item in kindData" :key="item.Id" :label="item.Name" :value="item.Id" />
						</el-select>
					</el-form-item>
					<el-form-item :label="'支付状态：'">
						<el-select v-model="tableData.param.PayState" placeholder="请选择" style="width: 90px">
							<el-option v-for="item in payData" :key="item.Id" :label="item.Name" :value="item.Id" />
						</el-select>
					</el-form-item>
					<el-form-item :label="'销核状态：'">
						<el-select v-model="tableData.param.ShippingState" placeholder="请选择" style="width: 90px">
							<el-option v-for="item in shippingData" :key="item.Id" :label="item.Name" :value="item.Id" />
						</el-select>
					</el-form-item>
					<el-form-item :label="'打印状态：'">
						<el-select v-model="tableData.param.PrintState" placeholder="请选择" style="width: 90px">
							<el-option v-for="item in printData" :key="item.Id" :label="item.Name" :value="item.Id" />
						</el-select>
					</el-form-item>
					<el-form-item :label="'关键字：'">
						<el-input placeholder="订单号、姓名" v-model="tableData.param.no"> </el-input>
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
						<el-button type="info" @click="exportExcel()" v-auth:[moduleKey]="'btn.Export'">
							<el-icon>
								<Download />
							</el-icon>
							&#8197;{{ $t('message.action.export') }}
						</el-button>
					</el-form-item>
					<el-form-item> </el-form-item>
				</el-form>
			</div>
			<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				style="width: 100%"
				size="small"
				:height="proxy.$calcMainHeight(-125)"
				border
				stripe
				highlight-current-row
			>
				<el-table-column type="selection" width="55" fixed />
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="CaseNo" label="头像" width="100" fixed></el-table-column>
				<el-table-column prop="TName" label="用户" width="110" fixed></el-table-column>
				<el-table-column prop="UName" label="类型" width="70" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Sn" label="时间" width="130" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="PersonName" label="名称" width="80" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CaseMode" label="订单流水号" width="110" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain" v-if="scope.row.CaseMode == 1">估损</el-tag>
						<el-tag type="success" effect="plain" v-else-if="scope.row.CaseMode == 2">核损</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.CaseMode == 10">鉴定</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="CaseType" label="打印状态" width="100" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain" v-if="scope.row.CaseType == 1">门诊就医</el-tag>
						<el-tag type="success" effect="plain" v-else-if="scope.row.CaseType == 2">住院非手术</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.CaseType == 3">住院手术</el-tag>
						<el-tag type="danger" effect="plain" v-else-if="scope.row.CaseType == 10">死亡</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="ExpertAuditBy" label="订单状态" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<!-- <el-table-column prop="ExpertAuditReceiveTime" label="接单时间" width="115" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column> -->
				<el-table-column prop="ExpertAuditBy" label="支付状态" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="ExpertAuditBy" label="退款" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="ExpertAuditBy" label="销核状态" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="ExpertAuditBy" label="销核人" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="ExpertAuditBy" label="支付方式" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="ExpertAuditBy" label="订单金额" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="ExpertAuditBy" label="下单时间" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="ExpertAuditBy" label="支付时间" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="ExpertAuditBy" label="外部交易号" width="80" align="center" show-overflow-tooltip> </el-table-column>
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
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';

import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
export default {
	name: 'baseUsers',
	setup() {
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = 'api_eshop_order_list';
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const dlgEditRef = ref();
		const defaultTime = new Date(2000, 1, 1, 12, 0, 0);
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			timeList: [],
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					PayState: -1,
					ShippingState: -1,
					PrintState: -1,
					Keyword: '',
					ServiceStartTime: '',
					ServiceEndTime: '',
					ExtTag: '',
				},
			},
			expertAuditUids: [],
			kindData: [
				{ Id: -1, Name: '全部' },
				{
					Id: 1,
					Name: '次数',
				},
				{
					Id: 2,
					Name: '包年',
				},
				{
					Id: 3,
					Name: '包月',
				},
			],
			payData: [
				{ Id: -1, Name: '支付状态' },
				{
					Id: 1,
					Name: '已支付',
				},
				{
					Id: 0,
					Name: '未支付',
				},
			],
			printData: [
				{ Id: -1, Name: '打印状态' },
				{
					Id: 0,
					Name: '未打印',
				},
				{
					Id: 1,
					Name: '已打印',
				},
			],
			shippingData: [
				{ Id: -1, Name: '核销状态' },
				{
					Id: 0,
					Name: '未核销',
				},
				{
					Id: 2,
					Name: '已核销',
				},
			],
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});

		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.no = '';
			state.expertAuditUids = [];
			state.tableData.param.state = -1;
			state.tableData.param.tids = [];
			state.tableData.param.expertAuditUids = '';
			state.expertReviewStatTime = '';
			state.expertReviewEndTime = '';
			state.timeList = [];
			onGetTableData(true);
		};
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.pageNum+1;
		// })

		//导出
		const exportExcel = async () => {
			state.tableData.param.expertAuditUids = state.expertAuditUids.toString();

			if (state.timeList && state.timeList.length == 2) {
				state.tableData.param.expertReviewStatTime = state.timeList[0];
				state.tableData.param.expertReviewEndTime = state.timeList[1];
			} else {
				state.tableData.param.expertReviewStatTime = '';
				state.tableData.param.expertReviewEndTime = '';
			}
			state.tableData.param.isExport = true;
			const res = await proxy.$api.ims.casepersonline.export(state.tableData.param);
			if (res.data.size == 0) {
				return;
			} else {
				// 返回不为空
				var url = window.URL.createObjectURL(res.data);
				var a = document.createElement('a');
				a.href = url;
				a.download = '订单管理_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
				a.click();
			}

			// if (res.errcode !== 0) {
			// 	return;
			// }
		};
		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			console.log('加载表格数据', state.timeList);
			state.tableData.param.isExport = false;
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			state.tableData.data = [];
			try {
				console.log(state.tableData.param);
				state.tableData.param.expertAuditUids = state.expertAuditUids.toString();
				if (state.timeList && state.timeList.length == 2) {
					state.tableData.param.expertReviewStatTime = state.timeList[0];
					state.tableData.param.expertReviewEndTime = state.timeList[1];
				} else {
					state.tableData.param.expertReviewStatTime = '';
					state.tableData.param.expertReviewEndTime = '';
				}

				const res = await proxy.$api.eshop.order.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode !== 0) {
					return;
				}
				state.tableData.total = res.total;
				state.tableData.data = res.data;
			} finally {
				state.tableData.loading = false;
			}
		};

		const getLoadData = async () => {
			//获取支付类型
			// const tidRes = await proxy.$api.base.tenant.getList({ pageNum: 1, pageSize: 10000 });
			// if (tidRes.errcode != 0) {
			// 	return;
			// }
			onGetTableData();
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
			getLoadData();
		});

		const { dateFormatYMDHM } = commonFunction();

		return {
			proxy,
			dlgEditRef,
			defaultTime,
			onGetTableData,
			onResetSearch,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMDHM,
			exportExcel,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
