<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="90px" v-loading="loading">
				<!-- <el-form-item label="类别标识" prop="Key">
					<el-input v-model="ruleForm.Key"></el-input>
				</el-form-item> -->
				<el-form-item label="科目名称" prop="Name">
					<el-input v-model="ruleForm.Name"></el-input>
				</el-form-item>
				<el-form-item label="科目名称" prop="Mold">
					<el-radio-group v-model="ruleForm.Mold">
						<el-radio :label="1">收</el-radio>
						<el-radio :label="2">支</el-radio>
					</el-radio-group>
				</el-form-item>
				
				<el-form-item  label="状态" prop="State">
					<el-checkbox v-model="ruleForm.State" :true-label="1" :false-label="0">有效</el-checkbox>
				</el-form-item>
				<el-form-item label="排序" prop="Order">
					<el-col :span="12">
						<el-input type="number" placeholder="排序" v-model="ruleForm.Order"> </el-input>
						<p title="" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>值小的靠前显示</span></p>
					</el-col>
				</el-form-item>

				<el-form-item label="类别描述" prop="Description">
					<el-input v-model="ruleForm.Description" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" size="small" v-auth:[$parent.moduleKey]="'btn.CategoryAdd'">{{
						$t('message.action.saveAndAdd')
					}}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.CategoryEdit', 'btn.CategoryAdd']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
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
				Id: 0,
				Kind: 'finance_account',
				Name: '',
				Ext: '',
				Value: '',
				Description: '',
				State: 1,
			},
		});

		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			Key: [
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
		const openDialog = (kind: string, id: string, parentid: number) => {
			if (id && id != '0') {
				GetByIdRow(id);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.ruleForm.State = 1;
				state.ruleForm.Order = 100;
				state.ruleForm.Parentid = parentid;
				state.title = t('message.action.add');
			}
			state.ruleForm.Kind = kind;
			state.isShowDialog = true;
		};
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.common.category.getById(Id);
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
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Parentid = state.ruleForm.Parentid.toString();
					state.ruleForm.Order = parseInt(state.ruleForm.Order);
					state.ruleForm.State = parseInt(state.ruleForm.State);
					try {
						const res = await proxy.$api.common.category.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetTableData();
							proxy.$parent.tableOnReset(state.ruleForm.Parentid);
						}
					} finally {
						state.loading = false;
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
