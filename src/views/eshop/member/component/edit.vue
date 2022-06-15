<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" destroy-on-close :key="ruleForm.Id" width="50%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="90px" v-loading="loading">
				<el-row>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户名：" prop="Username">
							<el-input v-model="ruleForm.Username" :autofocus="true" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="姓名" prop="Name">
							<el-input v-model="ruleForm.Name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- <el-row>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="密码：" prop="Password">
							<el-input v-model="ruleForm.Password"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="确认密码：" prop="Repassword">
							<el-input v-model="ruleForm.Repassword"></el-input>
						</el-form-item>
					</el-col>
				</el-row> -->
				<el-row>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机：" prop="Mobile">
							<el-input v-model="ruleForm.Mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="2" :lg="12" :xl="12" class="mb20">
						<el-form-item label="座机：" prop="Tel">
							<el-input v-model="ruleForm.Tel"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="会员：" prop="Enable">
							<el-radio v-model="ruleForm.Enable" :label="1">可用</el-radio>
							<el-radio v-model="ruleForm.Enable" :label="0">停用</el-radio>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="身份证号：" prop="Idno">
							<el-input v-model="ruleForm.Idno"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="备注" prop="Remark">
							<el-input v-model="ruleForm.Remark" type="textarea" placeholder="请输入备注"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button :loading="loading" type="primary" @click="onSubmit()" v-auths:[$parent.moduleKey]="['btn.Edit']">{{
						$t('message.action.submit')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute } from 'vue-router';
export default {
	name: 'currencyEdit',
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const state = reactive({
			kind,
			scopeMode,
			scopeValue,
			isShowDialog: false,
			title: t('message.action.edit'),
			loading: false,
			ruleForm: {
				Id: 0,
			},
		});
		const rules = reactive({
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = (row: Object) => {
			state.loading = false;
			state.isShowDialog = true;
			state.ruleForm = row;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		const onSubmit = () => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					try {
						const res = await proxy.$api.eshop.member.edit(state.ruleForm);
						if (res.errcode == 0) {
							closeDialog();
							proxy.$parent.onGetTableData();
						}
					} finally {
						state.loading = false;
					}
				}
			});
			return false;
		};
		// 页面加载时
		onMounted(() => {});
		return {
			t,
			proxy,
			rules,
			openDialog,
			closeDialog,
			onSubmit,
			onCancel,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
@import '../../../../theme/mixins/mixins.scss';
</style>
