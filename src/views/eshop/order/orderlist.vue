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
						<el-input placeholder="订单号、姓名" v-model="tableData.param.Keyword"> </el-input>
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
				<el-table-column type="selection" width="40" fixed />
				<el-table-column type="index" label="序号" width="70" fixed />
				<el-table-column prop="Avatar" label="头像" align="center" width="70" fixed>
					<template #default="scope">
						<el-image
							v-if="scope.row.Uid"
							lazy
							preview-teleported
							style="width: 20px; height: 20px"
							:src="proxy.$utils.staticHeardUrl(scope.row.Uid)"
							hide-on-click-modal
							:preview-src-list="[proxy.$utils.staticHeardUrl(scope.row.Uid)]"
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
					<!-- <el-image style="width: 50px; height: 50px" :src="'/static/img/avatar/user/' + scope.row.Uid + '.png'" fit="cover" /> -->
				</el-table-column>
				<el-table-column prop="CreateBy" label="用户" width="110" fixed></el-table-column>
				<el-table-column prop="ExtTag" label="类型" width="70" show-overflow-tooltip fixed></el-table-column>
				<!-- <el-table-column prop="ServiceTime" label="时间" width="115" :formatter="dateFormatYMDHM" show-overflow-tooltip fixed></el-table-column> -->
				<el-table-column prop="GoodsName" label="名称" width="80" align="left" show-overflow-tooltip></el-table-column>
				<el-table-column prop="OrderSn" label="订单流水号" width="110" align="left" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="PrintState" label="打印状态" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain" v-if="scope.row.PrintState == 0">未打印</el-tag>
						<el-tag type="success" effect="plain" v-else>已打印</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="OrderState" label="订单状态" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="danger" effect="plain" v-if="scope.row.OrderState == 100">已取消</el-tag>
						<el-tag type="warning" effect="plain" v-if="scope.row.OrderState == 99">退款售后</el-tag>
						<el-tag type="success" effect="plain" v-if="scope.row.OrderState >= 10">已评价</el-tag>
						<el-tag type="primary" effect="plain" v-else>未评价</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="PayState" label="支付状态" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="danger" effect="plain" v-if="scope.row.PayState == 0">未支付</el-tag>
						<el-tag type="success" effect="plain" v-if="scope.row.PayState == 1">已支付</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="IsAfterSale" label="退款" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="warning" effect="plain" v-if="scope.row.RefundAmount > 0">{{ scope.row.RefundAmount }}</el-tag>
						<el-tag type="success" effect="plain" v-if="scope.row.IsAfterSale == 0">无</el-tag>
						<el-tag type="danger" effect="plain" v-if="scope.row.IsAfterSale == 1">有</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="ShippingState" label="销核状态" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" effect="plain" v-if="scope.row.ShippingState == 1">已销核</el-tag>
						<el-tag type="danger" effect="plain" v-if="scope.row.ShippingState == 0">未销核</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="ConfirmBy" label="销核人" width="80" align="left" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="ConfirmTime" label="销核时间" width="115" align="left" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="PayName" label="支付方式" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="OrderAmount" label="订单金额" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<span>¥ {{ scale2Format(scope.row.OrderAmount) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="CreateTime" label="下单时间" width="115" :formatter="dateFormatYMDHM" align="left" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="PayTime" label="支付时间" width="115" align="left" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="TransactionId" label="外部交易号" width="80" align="left" show-overflow-tooltip> </el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(230)" fixed="right">
					<template #default="scope">
						<el-button text bg type="info" @click="onOpenEditDlg(false, scope.row)">
							<el-icon><Search /></el-icon>
							&#8197;{{ $t('message.action.see') }}
						</el-button>
						<el-button text bg type="primary" @click="onOpenEditDlg(true, scope.row)">
							<el-icon><Edit /></el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="info">
							<el-icon><Search /></el-icon>
							&#8197;{{ $t('message.action.print') }}
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
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<dlgEdit ref="dlgEditRef" />
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';

import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import dlgEdit from './component/orderEdit.vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import imageUrl from '/@/components/image/url.vue';
export default {
	name: 'orderlist',
	components: { imageUrl, dlgEdit },
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
			baseUrl: '/static/img/avatar/user/',
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
					pageNum: 1,
					pageSize: 20,
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
			state.tableData.param.PayState = -1;
			state.tableData.param.ShippingState = -1;
			state.tableData.param.PrintState = -1;
			state.tableData.param.Keyword = '';
			state.tableData.param.ServiceStartTime = '';
			state.tableData.param.ServiceEndTime = '';
			state.tableData.param.ExtTag = '';
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
				state.tableData.param.ServiceStartTime = state.timeList[0];
				state.tableData.param.ServiceEndTime = state.timeList[1];
			} else {
				state.tableData.param.ServiceStartTime = '';
				state.tableData.param.ServiceEndTime = '';
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
			state.tableData.param.isExport = false;
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			state.tableData.data = [];
			try {
				if (state.timeList && state.timeList.length == 2) {
					state.tableData.param.ServiceStartTime = state.timeList[0];
					state.tableData.param.ServiceEndTime = state.timeList[1];
				} else {
					state.tableData.param.ServiceStartTime = '';
					state.tableData.param.ServiceEndTime = '';
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
		// 打开修改弹窗
		const onOpenEditDlg = async (editMode: boolean, row: Object) => {
			// 获取表格信息
			const res = await proxy.$api.eshop.order.getById(row.Id);
			console.log('返回信息', res);
			if (res.errcode == 0) {
				dlgEditRef.value.openDialog(editMode, res.data);
			}
		};
		const getLoadData = async () => {
			//获取订单类型
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

		const { dateFormatYMDHM, scale2Format } = commonFunction();

		return {
			proxy,
			dlgEditRef,
			defaultTime,
			onGetTableData,
			onResetSearch,
			onHandleSizeChange,
			onHandleCurrentChange,
			onOpenEditDlg,
			scale2Format,
			dateFormatYMDHM,
			exportExcel,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
