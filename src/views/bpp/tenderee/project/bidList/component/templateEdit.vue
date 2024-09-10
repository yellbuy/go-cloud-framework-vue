<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-width="130px" v-loading="loading">
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
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit()" v-auths:[$parent.moduleKey]="['btn.CategoryEdit', 'btn.CategoryAdd']">{{$t('message.action.save')}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
export default {
	name: 'categoryEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
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
			},
			isAjax: false,
			editState: false,
			index: 0,
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
		const openDialog = (kind: string, isAdd: boolean, item: object, isAjax: boolean, index: number) => {
			state.isAjax = isAjax;
			console.log("测试1", isAdd)
			state.ruleForm = { Id: '0', Kind: 'zgps', Content: '', Standard: '', TechnicalMaxScore: 0 };
			if (isAdd) {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			} else {
				state.index = index;
				state.ruleForm = JSON.parse(JSON.stringify(item));
				state.title = t('message.action.edit');
			}
			state.editState = isAdd;
			state.ruleForm.Kind = kind;
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.clearValidate();
			state.loading = false;
			state.isShowDialog = false;
		};
		// 新增
		const onSubmit = () => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.ruleForm.Id = state.ruleForm.Id.toString();
					if (state.isAjax) {
						try {
							state.ruleForm.Parentid = store.state.project.projectLineId;
							const res = await proxy.$api.erp.projectsettingline.save(state.ruleForm);
							if (res.errcode == 0) {
								proxy.$parent.changeLine(); //刷新
								closeDialog();
							}
						} finally {
						}
					} else {
						if (state.ruleForm.Kind == 'zgps') {
							if (state.editState) {
								proxy.$parent.zgTableData.data.push(state.ruleForm);
							} else {
								proxy.$parent.zgTableData.data[state.index] = state.ruleForm;
							}
						} else if (state.ruleForm.Kind == 'jsps') {
							if (state.editState) {
								proxy.$parent.jsTableData.data.push(state.ruleForm);
							} else {
								proxy.$parent.jsTableData.data[state.index] = state.ruleForm;
							}
							proxy.$parent.getScore();
						}
						closeDialog();
					}
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
