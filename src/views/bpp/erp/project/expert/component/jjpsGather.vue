<template>
	<div class="base-role-container">
		<el-form-item :label="'参数：'">
			<el-select v-model="uid" placeholder="请选择" @change="getExpertList()">
				<el-option v-for="item in expertList" :key="item.Id" :label="item.Name" :value="item.Id" />
			</el-select>
			<el-button style="margin-left: 10px" v-if="!state" type="primary" @click="onSubmit()">{{ $t('message.action.gather') }}</el-button>
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
			<el-table-column prop="TechnicalScore" label="总报价" show-overflow-tooltip align="right" />
			<el-table-column prop="ReviewPrice" label="最终评审报价" show-overflow-tooltip align="right" />
			<el-table-column prop="PriceScore" label="价格得分" show-overflow-tooltip align="right" />
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
	name: 'jjpsGather',
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
			expertList: [],
			uid: 0,
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
			kind: 'jjps',
			gatherKind: 'jjpsGather',
			isGather: 0,
			nextKind: 'gather',
			state: false,
		});
		const getExpertList = async () => {
			state.tableData.loading = true;
			try {
				let kind = state.kind;
				if (state.uid == 'gather') {
					state.isGather = 1;
					kind = state.gatherKind;
				} else {
					state.isGather = 0;
				}
				const res = await proxy.$api.erp.projectreview.expertGather(store.state.project.projectId, {
					kind: kind,
					uid: state.uid,
					isGather: state.isGather,
					settingKind: state.kind,
				});
				if (res.errcode == 0) {
					state.tableData.data = res.data;
				}
			} finally {
				state.tableData.loading = false;
			}
		};

		const GetSignUpList = async (isState: boolean, isShow: boolean) => {
			state.state = isShow;
			state.tableData.loading = true;
			try {
				const expertRes = await proxy.$api.erp.project.expertList(store.state.project.projectId);
				if (expertRes.errcode == 0) {
					state.expertList = [];
					expertRes.data.forEach((item) => {
						if (item.State <= 0) {
							state.expertList.push(item.User);
						}
					});
					state.expertList.push({
						Id: 'gather',
						Name: '汇总',
					});
					state.uid = state.expertList[0].Id;
				}
				if (isState) {
					getExpertList();
				}
			} finally {
				state.tableData.loading = false;
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
						GatherKind: state.gatherKind,
					});
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						getExpertList();
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
						getExpertList();
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
			onReturn,
			project,
			getExpertList,
			GetSignUpList,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss"></style>
