<template>
	<div class="ims-case-firstaudit-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" :inline="true">
					<el-row :gutter="35">
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="mb20">
							<el-form-item :label="'账户名：'" prop="Account">
								<el-input v-model="ruleForm.Account" disabled> </el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="mb20">
							<el-form-item :label="'昵称：'">
								<el-input placeholder="请输入昵称" v-model="ruleForm.Nickname" clearable> </el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="mb20">
							<el-form-item :label="'姓名：'" prop="Name">
								<el-input placeholder="请输入真实姓名" v-model="ruleForm.Name" clearable> </el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="mb20">
							<el-form-item :label="'手机号：'" prop="Mobile">
								<el-input placeholder="请输入手机号" v-model="ruleForm.Mobile" clearable> </el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="mb20">
							<el-form-item :label="'电话号码：'" prop="Tel">
								<el-input placeholder="请输入电话号码" v-model="ruleForm.Tel" clearable> </el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="mb20">
							<el-form-item :label="'电子邮箱：'" prop="Email">
								<el-input placeholder="请输入电子邮箱" v-model="ruleForm.Email" clearable> </el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="35">
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="mb20">
							<el-form-item :label="'修改密码：'">
								<el-radio-group v-model="ruleForm.PasswordReset">
									<el-radio :label="0">否</el-radio>
									<el-radio :label="1">是</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="35" v-if="ruleForm.PasswordReset == 1">
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="mb20">
							<el-form-item :label="'旧密码：'" prop="Password">
								<el-input placeholder="请输入旧密码" type="password" show-password v-model="ruleForm.Password" clearable> </el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="mb20">
							<el-form-item :label="'新密码：'" prop="PasswordNew">
								<el-input placeholder="请输入新密码" type="password" show-password v-model="ruleForm.PasswordNew" clearable> </el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="mb20">
							<el-form-item :label="'确认密码：'" prop="PasswordConfirm">
								<el-input placeholder="请输入确认密码" type="password" show-password v-model="ruleForm.PasswordConfirm" clearable> </el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div style="text-align: right">
				<el-button type="primary" @click="onSubmit(true)" v-auths:[$parent.moduleKey]="['btn.Save']">{{ $t('message.action.save') }}</el-button>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { resetRoute } from '/@/router/index';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';

export default {
	name: 'baseUsers',

	setup() {
		const router = useRouter();
		const { t } = useI18n();
		const store = useStore();
		const moduleKey = 'api_base_profile';
		const { proxy } = getCurrentInstance() as any;
		const dlgEditRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			ruleForm: {
				Id: store.state.userInfos.userInfos.uid,
			},
		});
		const rules = reactive({
			Account: [
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
			Mobile: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Email: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Password: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			PasswordNew: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			PasswordConfirm: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		const getItem = async () => {
			const res=await proxy.$api.base.user.getById(state.ruleForm.Id)
			if (res.errcode == 0) {
				state.ruleForm = res.data;
			}
		};
		const onSubmit = () => {
			proxy.$refs.ruleFormRef.validate(async (valid:any) => {
				if (valid) {
					state.ruleForm.Id = state.ruleForm.Id.toString();
					const res=await proxy.$api.base.user.updateProfile(state.ruleForm);
					if (res.errcode == 0) {
						ElMessage.success('操作成功！');
						if (state.ruleForm.PasswordReset == 1) {
							Session.clear(); // 清除缓存/token等
							resetRoute(); // 删除/重置路由
							router.push('/login');
							setTimeout(() => {
								ElMessage.success(t('message.user.logOutSuccess'));
							}, 480);
						}
					}
				} 
				return false;
			});
		};

		// 页面加载时
		onMounted(() => {
			getItem();
		});

		return {
			proxy,
			getItem,
			onSubmit,
			rules,
			dlgEditRef,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
