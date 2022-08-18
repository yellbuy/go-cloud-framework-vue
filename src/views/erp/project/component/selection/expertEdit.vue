<template>
	<div class="base-role-container">
		<el-button type="primary" @click="isShowDialog = true">
			<el-icon>
				<CirclePlusFilled />
			</el-icon>
			&#8197;{{ $t('message.action.add') }}
		</el-button>
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
			<el-table-column prop="No" label="角色" show-overflow-tooltip fixed>
				<template #default="scope">
					<span v-if="scope.row.State == 0">评审</span>
					<span v-else>监审</span>
				</template>
			</el-table-column>
			<el-table-column prop="Name" label="专家名称" show-overflow-tooltip>
				<template #default="scope">
					{{ scope.row.User.Name }}
				</template>
			</el-table-column>
			<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
				<template #default="scope">
					<el-button text bg type="danger" @click="onModelDel(scope.row.Id)">
						<el-icon>
							<CloseBold />
						</el-icon>
						&#8197;{{ $t('message.action.delete') }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-width="130px" v-loading="loading">
				<el-form-item label="角色" prop="Roles">
					<el-radio-group v-model="ruleForm.Roles">
						<el-radio :label="0">评审</el-radio>
						<el-radio :label="1">监审（有且只有一个）</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="专家姓名：" prop="NameId">
					<el-select v-model="ruleForm.NameId" class="m-2" placeholder="请选择专家姓名" clearable>
						<el-option v-for="item in vipList" :key="item.Id" :label="item.Name" :value="item.Id"> </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit()">{{ $t('message.action.save') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
export default {
	name: 'expertEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			vipList: [],
			expertList: [],
			tableData: {
				data: [],
				total: 0,
				loading: false,
			},
			isShowDialog: false,
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
		});
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			Roles: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			NameId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		const getVipList = async () => {
			try {
				const res = await proxy.$api.base.user.getVipList(1, 0, 1, 2, { pageNum: 1, pageSize: 10000 });
				// const res = await proxy.$api.base.user.getList(state.tableData.param);
				if (res.errcode == 0) {
					state.vipList = res.data;
				}
			} finally {
			}
		};
		const getExpertList = async () => {
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.project.expertList(store.state.project.projectId);
				if (res.errcode == 0) {
					state.tableData.data = res.data;
				}
			} finally {
				state.tableData.loading = false;
			}
		};
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.ruleForm = {
				Roles: 0,
				NameId: '',
			};
		};
		const onSubmit = async () => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					console.log(state.ruleForm);
					let model = {};
					model.ProjectId = store.state.project.projectId;
					let list = [];
					for (let item of state.tableData.data) {
						if (state.ruleForm.Roles == '0') {
							//添加专家
							if (item.State == 1) {
								// if()
								model.SupervisionId = item.Id;
							} else {
								if (item.User.Id != state.ruleForm.NameId) {
									list.push(item.Id);
								} else {
									// ElMessage.
									return false;
								}
							}
						}
					}
				} else {
					return false;
				}
			});
		};
		// 页面加载时
		onMounted(() => {
			getVipList();
		});

		return {
			proxy,
			project,
			rules,
			onSubmit,
			closeDialog,
			getVipList,
			getExpertList,
			...toRefs(state),
		};
	},
	components: {},
};
</script>

<style scoped lang="scss">
</style>
