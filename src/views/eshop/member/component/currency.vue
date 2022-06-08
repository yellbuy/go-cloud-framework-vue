<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" destroy-on-close :key="ruleForm.Id" width="80%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="90px" v-loading="loading">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户名：" prop="Username">
							<el-input v-model="ruleForm.Username" :autofocus="true" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="姓名" prop="Name">
							<el-input v-model="ruleForm.Name" :autofocus="true" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机：" prop="Mobile">
							<el-input v-model="ruleForm.Mobile" :autofocus="true" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="2" :lg="12" :xl="12" class="mb20">
						<el-form-item label="座机：" prop="Tel">
							<el-input v-model="ruleForm.Tel" :autofocus="true" :readonly="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="35">
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="当前积分" prop="Point">
							<el-input v-model="ruleForm.Point" size="small" :autofocus="true" :readonly="true" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="修改积分" prop="editPoint">
							<el-input-number v-model="ruleForm.editPoint" size="small" controls-position="right"></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="35"> </el-row>
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
				Username: '',
				Name: '',
				Tel: '',
				Mobile: '',
				Point: 0,
				editPoint: 0,
			},
		});
		const checkAge = (rule: any, value: any, callback: any) => {
			if (value == 0) {
				callback(new Error('请输入一个不为0的数字'));
			} else {
				callback();
			}
		};
		const rules = reactive({
			editPoint: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					validator: checkAge,
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = (row: Object) => {
			state.loading = false;
			state.isShowDialog = true;
			state.ruleForm.Id = row.Id;
			state.ruleForm.Username = row.Username;
			state.ruleForm.Name = row.Name;
			state.ruleForm.Mobile = row.Mobile;
			state.ruleForm.Tel = row.Tel;
			state.ruleForm.Point = row.Point;
			state.ruleForm.editPoint = 0;
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
						const res = await proxy.$api.eshop.member.postIntegral(state.kind, state.scopeMode, state.scopeValue, {
							Id: state.ruleForm.Id,
							Point: parseInt(state.ruleForm.editPoint),
						});
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
