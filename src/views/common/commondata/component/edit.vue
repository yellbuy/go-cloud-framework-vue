<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading" :disabled="disable">
				<el-form-item label="名称" prop="Name">
					<el-input size="mini" placeholder="请输入名称" v-model="ruleForm.Name"> </el-input>
				</el-form-item>
				<el-form-item label="编码" prop="Code">
					<el-input size="mini" placeholder="请输入名称" v-model="ruleForm.Code"> </el-input>
				</el-form-item>
				<el-form-item label="排序号" prop="Order">
					<el-input size="mini" type="number" placeholder="请输入名称" v-model="ruleForm.Order"> </el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
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
	name: 'Edit',
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
			},
			disable: false, //是否隐藏
		});
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			Code: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
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
		const openDialog = (Type: string, id: string, disable: boolean) => {
			if (id != '0') {
				GetByIdRow(id);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}

			state.ruleForm.Type = Type;
			state.isShowDialog = true;
			state.disable = disable;
		};
		const GetByIdRow = (Id: string) => {
			const url = `/v1/common/commondata/getbyid/${Id}`;
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

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			console.log(state.ruleForm);
			proxy.$refs.ruleFormRef.validate((valid: any) => {
				console.log(valid);
				if (valid) {
					// state.loading = true;
					const url = state.ruleForm.Id > 0 ? `/v1/common/commondata/${state.ruleForm.Id}` : `/v1/common/commondata`;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Order = parseInt(state.ruleForm.Order);
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
