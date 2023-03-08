<template>
	<div class="base-role-container">
		<el-form-item :label="'参数：'">
			<el-select v-model="uid" placeholder="请选择" @change="getExpertList()">
				<el-option v-for="item in expertList" :key="item.Id" :label="item.Name" :value="item.Id" />
			</el-select>
			<el-select style="margin-left: 10px" v-model="companyId" placeholder="请选择" @change="getExpertList()">
				<el-option v-for="item in signUpList" :key="item.CompanyId" :label="item.CompanyName" :value="item.CompanyId" />
			</el-select>

			<el-button style="margin-left: 10px" type="primary" @click="onSubmit()">{{ $t('message.action.gather') }}</el-button>
			<el-button type="primary" @click="onReturn()">{{ $t('message.action.returnForReappraisal') }}</el-button>
		</el-form-item>
		<el-table
			:data="tableData.data"
			v-loading="tableData.loading"
			style="width: 100%"
			:height="proxy.$calcMainHeight(-75)"
			border
			stripe
			highlight-current-row
		>
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="SetLineContent" label="参数内容" show-overflow-tooltip fixed>
				<template #default="scope">
					<span v-if="scope.row.SetLineContent == ''">【结论】评审汇总</span>
					<span v-else>{{ scope.row.SetLineContent }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="SetLineStandard" label="评分标准" show-overflow-tooltip fixed />
			<el-table-column prop="SetLineTechnicalMaxScore" label="最高分" show-overflow-tooltip align="right" />
			<el-table-column prop="TechnicalScore" label="评审" show-overflow-tooltip align="right" />
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
	name: 'jspsGather',
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
			signUpList: [],
			expertList: [],
			uid: 0,
			companyId: 0,
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
			kind: 'jsps',
			gatherKind: 'jspsGather',
			isGather: 0,
			nextKind: 'jjps',
		});
		const getNumber = async (numState: boolean) => {
			if (state.tableData.data.length > 0) {
				let TechnicalScore = 0;
				let SetLineTechnicalMaxScore = 0;
				state.tableData.data.forEach((item) => {
					if (item.IsGather < 1) {
						TechnicalScore += item.TechnicalScore;
						if (numState) {
							SetLineTechnicalMaxScore += item.SetLineTechnicalMaxScore;
						}
					} else {
						item.TechnicalScore = TechnicalScore;
						if (numState) {
							item.SetLineTechnicalMaxScore = SetLineTechnicalMaxScore;
						}
					}
				});
			}
		};
		const getExpertList = async () => {
			console.log('获取的数据', state.companyId);
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
					companyId: state.companyId,
					uid: state.uid,
					isGather: state.isGather,
					settingKind: state.kind,
				});
				if (res.errcode == 0) {
					state.tableData.data = res.data;
					getNumber(true);
				}
			} finally {
				state.tableData.loading = false;
			}
		};

		const GetSignUpList = async (isState: boolean) => {
			try {
				const res = await proxy.$api.erp.projectcompany.signUpList({ projectId: store.state.project.projectId, state: 1 });
				if (res.errcode != 0) {
					return;
				}
				state.signUpList = res.data;
				state.companyId = res.data[0].CompanyId;
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
				state.signUpData = res.data;
			} finally {
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
						getExpertList();
					}
				});
			} finally {
			}
		};

		// 页面加载时
		onMounted(() => {
			GetSignUpList(false);
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
