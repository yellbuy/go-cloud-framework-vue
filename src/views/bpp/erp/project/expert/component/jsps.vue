<template>
	<div class="base-role-container">
		<el-form-item :label="'投标方名称：'">
			<el-select v-model="companyId" placeholder="请选择">
				<el-option v-for="item in signUpList" :key="item.CompanyId" :label="item.CompanyName" :value="item.CompanyId" />
			</el-select>
			<el-button style="margin-left: 10px" type="primary" @click="onSubmit(false)">{{ $t('message.action.save') }}</el-button>
			<el-button type="primary" @click="onSubmit(true)">{{ $t('message.action.submit') }}</el-button>
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
			<el-table-column prop="SetLineStandard" label="通过内容" show-overflow-tooltip fixed>
				<template #default="scope">
					<span v-if="scope.row.SetLineStandard == ''">符合通过，不符合则不通过</span>
					<span v-else>{{ scope.row.SetLineStandard }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="ReviewState" label="是否通过" show-overflow-tooltip fixed>
				<template #default="scope">
					<el-radio-group v-model="scope.row.ReviewState" class="ml-4" @change="changeRadio" :disabled="scope.row.IsGather == 1 ? true : false">
						<el-radio :label="1">通过</el-radio>
						<el-radio :label="0">不通过</el-radio>
					</el-radio-group>
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
	name: 'expertEdit',
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
			companyId: 0,
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
			mode: 1,
		});
		const getExpertList = async () => {
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectreview.expertList(store.state.project.projectId, { mode: 2, companyId: state.CompanyId });
				if (res.errcode == 0) {
					state.tableData.data = res.data;
				}
			} finally {
				state.tableData.loading = false;
			}
		};
		const onLeader = async (row) => {
			try {
				const res = await proxy.$api.erp.projectreview.expertLeader(row);
				if (res.errcode == 0) {
					getExpertList();
				}
			} finally {
			}
		};

		const GetSignUpList = async (isState: boolean) => {
			try {
				const res = await proxy.$api.erp.projectcompany.signUpList({ projectId: store.state.project.projectId });
				if (res.errcode != 0) {
					return;
				}
				state.signUpList = res.data;
				state.companyId = res.data[0].CompanyId;
				if (isState) {
					getExpertList();
				}
				state.signUpData = res.data;
			} finally {
			}
		};
		const changeRadio = () => {
			let reviewState = true;
			for (let item of state.tableData.data) {
				console.log('是否通过', item);
				if (item.IsGather != 1) {
					if (item.ReviewState == 0) {
						reviewState = false;
					}
				} else {
					if (reviewState) {
						item.ReviewState = 1;
					} else {
						item.ReviewState = 0;
					}
				}
			}
		};
		const onSubmit = async (isSubmit: boolean) => {
			try {
				if (isSubmit) {
					state.tableData.data.forEach((item) => {
						item.State = 1;
					});
					ElMessageBox.confirm(`确定要提交吗?`, '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}).then(async () => {
						let data = JSON.stringify(state.tableData.data);
						const res = await proxy.$api.erp.projectreview.expertSave(state.mode, data);
						if (res.errcode == 0) {
							getExpertList();
						}
					});
				} else {
					let data = JSON.stringify(state.tableData.data);
					const res = await proxy.$api.erp.projectreview.expertSave(state.mode, data);
					if (res.errcode == 0) {
						getExpertList();
					}
				}
			} finally {
			}
		};

		// 页面加载时
		onMounted(() => {
			console.log('页面渲染');
			GetSignUpList(false);
		});

		return {
			proxy,
			onLeader,
			onSubmit,
			project,
			changeRadio,
			getExpertList,
			GetSignUpList,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss"></style>
