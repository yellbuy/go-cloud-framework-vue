<template>
	<div class="ims-case-firstaudit-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="80px" :inline="true">
					<el-form-item :label="'下单时间：'">
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
					<el-form-item :label="'支付状态：'">
						<el-select v-model="tableData.param.isPaid" placeholder="请选择" style="width: 90px">
							<el-option label="全部" :value="-1" />
							<el-option label="已支付" :value="1" />
							<el-option label="未支付" :value="0" />
						</el-select>
					</el-form-item>
					<el-form-item :label="'支付模式：'">
						<el-select v-model="tableData.param.mode" placeholder="请选择" style="width: 90px">
							<el-option label="全部" :value="-1" />
							<el-option label="充值" :value="1" />
							<!-- <el-option label="购买金币" :value="1" /> -->
							<el-option label="兑换" :value="10" />
						</el-select>
					</el-form-item>
					<el-form-item :label="'支付方式：'">
						<el-select v-model="tableData.param.payment" placeholder="请选择" style="width: 90px">
							<el-option label="全部" :value="''" />
							<el-option label="微信" :value="'微信'" />
							<el-option label="余额" :value="'余额'" />
							<el-option label="金币" :value="'金币'" />
						</el-select>
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
				<el-table-column type="index" label="序号" width="50" fixed />
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
				</el-table-column>
				<el-table-column prop="Mode" label="支付模式" width="80" align="center" fixed>
					<template #default="scope">
						<el-tag type="warning" effect="plain" v-if="scope.row.Mode == 1">充值</el-tag>
						<el-tag type="primary" effect="plain" v-else-if="scope.row.Mode == 10">兑换</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Uname" label="用户" width="115" align="left" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="PayAmount" label="实付金额" width="115" align="right" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="Amount" label="上账金额" width="115" align="right" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="PayPoint" label="实付金币/积分" width="115" align="right" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="Point" label="上账金币/积分" width="115" align="right" show-overflow-tooltip> </el-table-column>

				<el-table-column label="上账数量/时长" width="115" align="center" show-overflow-tooltip>
					<template #default="scope">
						<span v-if="scope.row.Mode == 2">{{ scope.row.Qty }}{{ scope.row.Unit }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="CreateTime" label="下单时间" width="135" align="left" :formatter="dateFormatYMDHMS" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="PaidTime" label="支付时间" width="135" align="left" :formatter="dateFormatYMDHMS" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="Payment" label="支付方式" width="80" align="center" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="AdminNote" label="管理员备注" width="200" align="left" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="UserNote" label="用户备注" width="200" align="left" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="IsPaid" label="是否支付" width="80" align="center" fixed="right" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="danger" effect="plain" v-if="scope.row.IsPaid == 0">未支付</el-tag>
						<el-tag type="success" effect="plain" v-else-if="scope.row.IsPaid == 1">已支付</el-tag>
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
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';

import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import imageUrl from '/@/components/image/url.vue';
export default {
	name: 'accountlist',
	components: { imageUrl },
	setup() {
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = 'api_eshop_account_list';
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
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
					mode: -1,
					isPaid: -1,
					startTime: '',
					endTime: '',
					payment: '',
					pageNum: 1,
					pageSize: 20,
				},
			},
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});

		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.isPaid = -1;
			state.tableData.param.mode = -1;
			state.tableData.param.startTime = '';
			state.tableData.param.endTime = '';
			state.tableData.param.payment = '';
			state.timeList = [];
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

			if (state.timeList && state.timeList.length == 2) {
				state.tableData.param.startTime = state.timeList[0];
				state.tableData.param.endTime = state.timeList[1];
			} else {
				state.tableData.param.startTime = '';
				state.tableData.param.endTime = '';
			}
			try {
				const res = await proxy.$api.eshop.account.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode !== 0) {
					return;
				}
				state.tableData.total = res.total;
				state.tableData.data = res.data;
			} finally {
				state.tableData.loading = false;
			}
		};

		const deleteRow = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.Nickname}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading = true;
				try {
					const res = await proxy.$api.eshop.member.delete(row.Id);
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

		const { dateFormatYMDHM, scale2Format } = commonFunction();

		return {
			proxy,
			onGetTableData,
			onResetSearch,
			deleteRow,
			onHandleSizeChange,
			onHandleCurrentChange,
			scale2Format,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
