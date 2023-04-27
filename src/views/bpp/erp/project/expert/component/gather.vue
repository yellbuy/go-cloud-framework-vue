<template>
	<div class="base-role-container">
		<el-form-item>
			<el-button style="margin-left: 10px" type="primary" v-if="!state" @click="onSubmit()">{{ $t('message.action.gather') }}</el-button>
			<el-button type="primary" v-if="!state" @click="onReturn()">{{ $t('message.action.returnForReappraisal') }}</el-button>
		</el-form-item>
		<el-table
			:data="tableData.data"
			v-loading="tableData.loading"
			style="width: 100%"
			:height="proxy.$calcMainHeight(-175)"
			border
			stripe
			highlight-current-row
		>
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="CompanyName" label="投标方" show-overflow-tooltip fixed />
			<el-table-column prop="ReviewPrice" label="投标评审价" show-overflow-tooltip align="right" />
			<el-table-column prop="TechnicalScore" label="技术得分" show-overflow-tooltip align="right" />
			<el-table-column prop="PriceScore" label="报价得分" show-overflow-tooltip align="right" />
			<el-table-column prop="GatherScore" label="最终得分" show-overflow-tooltip align="right" />
			<el-table-column prop="IsLeader" label="推荐中标候选人" show-overflow-tooltip>
				<template #default="scope">
					<span v-if="scope.row.IsLeader == 0"></span>
					<span v-else>第一中标供应商</span>
				</template>
			</el-table-column>
			<el-table-column v-if="!state" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" fixed="right">
				<template #default="scope">
					<el-button text bg type="primary" @click="onLeader(scope.row)"> 推荐 </el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import { Item } from 'ant-design-vue/lib/menu';
export default {
	name: 'gather',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			project: store.state.project.project,
			tableData: {
				data: [],
				total: 0,
				loading: false,
			},
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
			kind: 'gather',
			nextKind: 'recommend',
			nextKind2: 'signature',
			state: false,
		});

		const GetSignUpList = async (isState: boolean, isShow: boolean) => {
			state.state = isShow;
			if (isState) {
				state.tableData.loading = true;
				try {
					const res = await proxy.$api.erp.projectreview.expertList(store.state.project.projectId, { kind: state.kind });
					if (res.errcode == 0) {
						state.tableData.data = res.data;
					}
				} finally {
					state.tableData.loading = false;
				}
			}
		};
		const onSubmit = async () => {
			try {
				ElMessageBox.confirm(`确定要汇总吗?`, '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					const res = await proxy.$api.erp.projectreview.expertGatherSave(store.state.project.projectId, {
						Kind: state.kind,
						NextKind: state.nextKind,
					});
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						GetSignUpList(true, state.state);
					}
				});
			} finally {
			}
		};
		const onLeader = async (row) => {
			try {
				ElMessageBox.confirm(`确定要推荐吗?`, '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					let data = JSON.parse(JSON.stringify(row));
					data.IsLeader = 1;
					const res = await proxy.$api.erp.projectreview.expertGatherSave(store.state.project.projectId, {
						Kind: state.nextKind,
						NextKind: state.nextKind2,
						ProjectReview: data,
					});
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						GetSignUpList(true, state.state);
					}
				});
			} finally {
			}
		};
		const onReturn = async () => {
			try {
				ElMessageBox.confirm(`确定要退回重评吗?`, '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					const res = await proxy.$api.erp.projectreview.expertGatherReturn(store.state.project.projectId);
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						GetSignUpList(true, state.state);
					}
				});
			} finally {
			}
		};
		// 页面加载时
		onMounted(() => {
			GetSignUpList(false, false);
		});

		return {
			proxy,
			onSubmit,
			onLeader,
			onReturn,
			project,
			GetSignUpList,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss"></style>
