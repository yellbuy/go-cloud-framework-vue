<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" destroy-on-close :key="ruleForm.Id" width="80%">
			<el-form ref="ruleFormRef" :model="ruleForm" label-width="90px" v-loading="loading">
				<table class="yb-table" style="width: 100%">
					<thead>
						<th width="8%" />
						<th width="26%" />
						<th width="8%" />
						<th width="26%" />
						<th width="8%" />
						<th width="26%" />
					</thead>
					<tr>
						<td colspan="6">订单基本信息</td>
					</tr>
					<tr>
						<td>流水号</td>
						<td>{{ ruleForm.OrderSn }}</td>
						<td>订单金额</td>
						<td>¥ {{ scale2Format(ruleForm.OrderAmount) }}</td>
						<td>下单时间</td>
						<td>{{ ruleForm.CreateTime }}</td>
					</tr>
					<tr>
						<td>支付金额</td>
						<td>¥ {{ scale2Format(ruleForm.PayFee) }}</td>
						<td>支付状态</td>
						<td>
							<el-tag type="danger" effect="plain" v-if="ruleForm.PayState == 0">未支付</el-tag>
							<el-tag type="success" effect="plain" v-if="ruleForm.PayState == 1">已支付</el-tag>
						</td>
						<td>支付方式</td>
						<td>{{ ruleForm.PayName }}</td>
					</tr>
					<tr>
						<td>外部订单号</td>
						<td>{{ ruleForm.TransactionId }}</td>
						<td>时间</td>
						<td>{{ ruleForm.ServiceTime }}</td>
						<td>订单状态</td>
						<td>
							<el-tag type="danger" effect="plain" v-if="ruleForm.OrderState == 100">已取消</el-tag>
							<el-tag type="warning" effect="plain" v-if="ruleForm.OrderState == 99">退款售后</el-tag>
							<el-tag type="success" effect="plain" v-if="ruleForm.OrderState >= 10">已评价</el-tag>
							<el-tag type="primary" effect="plain" v-else>未评价</el-tag>
						</td>
					</tr>
					<tr>
						<td colspan="6">顾客信息</td>
					</tr>
					<tr>
						<td>姓名</td>
						<td>{{ ruleForm.ReceiveName }}</td>
						<td>手机</td>
						<td>{{ ruleForm.ReceiveMobile }}</td>
						<td>电话</td>
						<td>{{ ruleForm.ReceiveTel }}</td>
					</tr>
					<tr>
						<td colspan="6">明细信息（共 {{ ruleForm.GoodsNums }} 条）</td>
					</tr>
					<tr>
						<td colspan="6">
							<el-table
								:data="ruleForm.OrderGoods"
								style="width: 100%"
								size="small"
								:height="proxy.$calcMainHeight(-320)"
								border
								stripe
								highlight-current-row
							>
								<el-table-column prop="GoodsName" label="名称/货号" width="110" fixed></el-table-column>
								<el-table-column prop="ShippingName" label="姓名" width="110" show-overflow-tooltip fixed></el-table-column>
								<el-table-column prop="GoodsPrice" label="单价" width="80" align="center" show-overflow-tooltip>
									<template #default="scope">
										<span>¥ {{ scale2Format(scope.row.GoodsPrice) }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="GoodsNums" label="数量" width="110" align="center" show-overflow-tooltip> </el-table-column>
								<el-table-column prop="RealPrice" label="金额" width="110" align="center" show-overflow-tooltip>
									<template #default="scope">
										<span>¥ {{ scale2Format(scope.row.RealPrice) }}</span>
									</template>
								</el-table-column>
								<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(100)" fixed="right">
									<template #default="scope">
										<el-button text bg type="primary" @click="onOpenEditDlg(true, scope.row)">
											<el-icon><Edit /></el-icon>
											&#8197;{{ $t('message.action.edit') }}
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</td>
					</tr>
				</table>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button v-if="editMode" :loading="loading" type="primary" v-auths:[$parent.moduleKey]="['btn.AuditEdit']">{{
						$t('message.action.submit')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
	name: 'auditEdit',
	props: {
		step: Number,
	},
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.edit'),
			loading: false,
			editMode: false,
			ruleForm: {},
			disapprovalReasons: [],
			otherRemark: '',
			deptData: [], // 部门数据
		});

		// 打开弹窗
		const openDialog = (editMode: Boolean, row: Object) => {
			state.loading = false;
			state.editMode = editMode;
			state.isShowDialog = true;
			state.ruleForm = row;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		const { scale2Format } = commonFunction();
		// 页面加载时
		onMounted(() => {});
		return {
			t,
			proxy,
			openDialog,
			closeDialog,
			onCancel,
			scale2Format,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
@import '../../../../theme/mixins/mixins.scss';
table,
table tr th,
table tr td {
	border: 1px solid gray;
	padding: 8px;
}
table {
	border-collapse: collapse;
	padding: 0px;
}
</style>
