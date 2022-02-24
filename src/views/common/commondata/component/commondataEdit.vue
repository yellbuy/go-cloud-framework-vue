<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="onCancel">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<el-form-item label="评审内容" prop="Name">
					<el-input v-model="ruleForm.Name"></el-input>
				</el-form-item>
				<el-form-item label="评审标准" prop="Ext">
					<el-input v-model="ruleForm.Ext" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="最高评分" v-if="ruleForm.Type != 'zgps'" prop="Value">
					<el-input v-model="ruleForm.Value"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" size="small" v-auth:[$parent.moduleKey]="'btn.CommondataAdd'">{{
						$t('message.action.saveAndAdd')
					}}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.CommondataEdit', 'btn.CommondataAdd']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox, ElMessage } from 'element-plus';
export default {
	name: 'commonDataEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {
				Id: 0,
				Type: 'zgps',
				Name: '',
				Ext: '',
				Value: '',
				Code: '',
			},
		});

		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Ext: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Value: [
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
			state.ruleForm.Type = Type;
			state.isShowDialog = true;
		};
		const GetByIdRow = (Id: string) => {
			const url = `/v1/common/commondata/${Id}`;
			request({
				url: url,
				method: 'get',
			})
				.then((res) => {
					if (res.errcode == 0) {
						state.ruleForm = res.data;
					} else {
						ElMessage.warning(res.errmsg);
					}
				})
				.catch((err) => {});
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};
		// 取消
		const onCancel = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.ruleForm.Value = '';
			state.loading = false;
			state.isShowDialog = false;
		};
		const onLoadTable = () => {
			if (state.ruleForm.Type == 'zgps') {
				proxy.$parent.onGetZgTableData();
			} else if (state.ruleForm.Type == 'jsps') {
				proxy.$parent.onGetJsTableData();
			}
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate((valid: any) => {
				if (valid) {
					state.loading = true;
					const url = state.ruleForm.Id > 0 ? `/v1/common/commondata/${state.ruleForm.Id}` : `/v1/common/commondata`;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Code = state.ruleForm.Name;
					if (state.ruleForm.Type == 'zgps') {
						state.ruleForm.Value = '1';
					}
					request({
						url: url,
						method: 'post',
						data: state.ruleForm,
					})
						.then((res) => {
							state.loading = false;
							if (res.errcode == 0) {
								if (isCloseDlg) {
									closeDialog();
								} else {
									proxy.$refs.ruleFormRef.resetFields();
									state.ruleForm.Id = 0;
								}
							}
						})
						.catch(() => {
							state.loading = false;
						});
					return false;
				} else {
					return false;
				}
			});
		};
		// 页面加载时
		onMounted(() => {});
		return {
			t,
			openDialog,
			closeDialog,
			onCancel,
			onLoadTable,
			GetByIdRow,
			rules,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
