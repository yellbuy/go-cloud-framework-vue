<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<el-form-item label="类别" prop="CategoryId">
					<el-select v-model="ruleForm.CategoryId" size="mini" class="m-2" placeholder="请选择类别" clearable>
						<el-option v-for="item in supKindData" :key="item.Id" :label="item.Name" :value="item.Id"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="名称" prop="Name">
					<el-input size="mini" placeholder="请输入名称" v-model="ruleForm.Name"> </el-input>
				</el-form-item>
				<el-form-item label="评审内容" prop="Line.Content">
					<el-input v-model="ruleForm.Line.Content"></el-input>
				</el-form-item>
				<el-form-item label="评审标准" prop="Line.Standard">
					<el-input v-model="ruleForm.Line.Standard" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="最高评分" v-if="ruleForm.Kind != 'zgps'" prop="Line.TechnicalMaxScore">
					<el-input-number v-model="ruleForm.Line.TechnicalMaxScore" :min="0" controls-position="right" :precision="1" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" size="small" v-auth:[$parent.moduleKey]="'btn.SettingAdd'">{{
						$t('message.action.saveAndAdd')
					}}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.SettingEdit', 'btn.SettingAdd']">{{
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
				Kind: 'zgps',
				Name: '',
				CategoryId: '',
				ProjectId: '0',
				Line: {
					Id: 0,
					Kind: 'zgps',
					Content: '',
					Standard: '',
					TechnicalMaxScore: 0,
				},
			},
			supKindData: [],
		});

		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			'Line.Content': [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			'Line.Standard': [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			'Line.TechnicalMaxScore': [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			CategoryId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'change',
				},
			],
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = (Type: string, id: string) => {
			state.supKindData = proxy.$parent.supKindData;
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
		const GetByIdRow = (Id: string) => {
			const url = `/v1/erp/projectsetting/${Id}`;
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
			state.ruleForm = {
				Id: 0,
				Kind: 'zgps',
				Name: '',
				CategoryId: '',
				ProjectId: '0',
				Line: {
					Id: 0,
					Kind: 'zgps',
					Content: '',
					Standard: '',
					TechnicalMaxScore: 0,
				},
			};
			state.loading = false;
			state.isShowDialog = false;
			state.ruleForm.CategoryId = '';
			onLoadTable();
		};

		const onLoadTable = () => {
			if (state.ruleForm.Kind == 'zgps') {
				proxy.$parent.onGetZgTableData();
			} else if (state.ruleForm.Kind == 'jsps') {
				proxy.$parent.onGetJsTableData();
			}
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			console.log(state.ruleForm);
			proxy.$refs.ruleFormRef.validate((valid: any) => {
				if (valid) {
					state.loading = true;
					const url = state.ruleForm.Id > 0 ? `/v1/erp/projectsetting/${state.ruleForm.Id}` : `/v1/erp/projectsetting`;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Line.Id = state.ruleForm.Line.Id.toString();
					// state.ruleForm.CategoryId = parseInt(state.ruleForm.CategoryId);
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
			onLoadTable,
			GetByIdRow,
			rules,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
