<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="40%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="130px" v-loading="loading">
				<el-form-item label="评审内容" prop="Content">
					<el-input v-model="ruleForm.Content"/>
				</el-form-item>
				<el-form-item label="评审标准" prop="Standard">
					<el-input v-model="ruleForm.Standard" type="textarea"/>
				</el-form-item>
				<el-form-item label="最高评分" v-if="ruleForm.Kind != 'zgps'" prop="TechnicalMaxScore">
					<el-input-number v-model="ruleForm.TechnicalMaxScore" :min="0" controls-position="right" :precision="1" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg type="info" @click="closeDialog">取消</el-button>
					<el-button type="primary" @click="onSubmit()">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox, ElMessage } from 'element-plus';
export default {
	name: 'categoryEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {
				Id: '0',
				Kind: 'zgps',
				Content: '',
				Standard: '',
				TechnicalMaxScore: 0,
				SettingType: 1,
			},
		});

		const rules = reactive({
			Content: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Standard: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			TechnicalMaxScore: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		// 打开弹窗
		const openDialog = (Type: string, id: string) => {
			if (id != '0') {
				GetByIdRow(id);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}
			state.ruleForm.Kind = Type;
			state.isShowDialog = true;
		};
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.projectsetting.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.clearValidate();
			state.ruleForm = {
				Id: '0',
				Kind: 'zgps',
				Content: '',
				Standard: '',
				TechnicalMaxScore: 0,
				SettingType: 1,
			};
			state.loading = false;
			state.isShowDialog = false;
		};
		// 新增
		const onSubmit = () => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					try {
						state.ruleForm.Id = state.ruleForm.Id.toString();
						const res = await proxy.$api.erp.projectsetting.save(state.ruleForm);
						if (res.errcode == 0) {
							if (state.ruleForm.Kind == 'zgps') {
								proxy.$parent.onGetZgTableData(true);
							} else if (state.ruleForm.Kind == 'jsps') {
								proxy.$parent.onGetJsTableData(true);
							}
						}
					} finally {
						state.loading = false;
					}
					closeDialog();
					return false;
				} else {
					return false;
				}
			});
		};
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			rules,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
