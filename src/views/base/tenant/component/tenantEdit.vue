<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-suffix="：" label-width="90px" v-loading="loading">
				<el-row :gutter="20">
					<el-col :sm="24" :md="12" class="mb16">
						<el-form-item prop="Name" label="单位名称">
							<el-input v-model="ruleForm.Name" :autofocus="true" placeholder="请输入单位名称" maxlength="32" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12" class="mb16">
						<el-form-item prop="Code" label="单位代码">
							<el-input v-model="ruleForm.Code" placeholder="请输入单位代码" maxlength="36" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12" class="mb16">
						<el-form-item prop="Phone" label="单位电话">
							<el-input v-model="ruleForm.Phone" placeholder="请输入单位电话" maxlength="20" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12" class="mb16">
						<el-form-item prop="Linkman" label="单位联系人">
							<el-input v-model="ruleForm.Linkman" placeholder="请输入单位联系人" maxlength="20" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12" class="mb16">
						<el-form-item prop="Addr" label="单位地址">
							<el-input v-model="ruleForm.Addr" placeholder="请输入单位地址" maxlength="63" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12" class="mb16">
						<el-form-item prop="Remark" label="备注">
							<el-input v-model="ruleForm.Remark" placeholder="单位备注信息" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12">
						<el-form-item label="置顶" prop="IsTop">
							<el-checkbox v-model="ruleForm.IsTop" :true-label="1" :false-label="0">置顶</el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12">
						<el-form-item label="排序" prop="Order">
							<el-input v-model="ruleForm.Order" placeholder="排序" type="number" :step="10"></el-input>
							<p title="" class="color-info-light font10"><SvgIcon name="fa fa-info-circle" class="mr3" />值小的靠前显示</p>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12">
						<el-form-item prop="State" label="状态">
							<el-checkbox v-model="ruleForm.State" :true-label="1" :false-label="0">有效</el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12">
						<el-form-item prop="UserCreateState" label="">
							<el-checkbox v-model="ruleForm.UserCreateState" :true-label="1" :false-label="0">创建登录账号</el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider border-style="dashed" v-if="ruleForm.UserCreateState" />
				<el-row :gutter="20" v-if="ruleForm.UserCreateState">
					<el-col :sm="24" :md="12">
						<el-form-item prop="Username" label="用户名" maxlength="50">
							<el-input v-model="ruleForm.Username" placeholder="登录账号" clearable></el-input>
							<p title="" class="color-info-light font10"><SvgIcon name="fa fa-info-circle" class="mr3" />用户名必须唯一</p>
						</el-form-item>
					</el-col>

					<el-col :sm="12" :md="3">
						<el-form-item label="状态" prop="UserState">
							<el-checkbox v-model="ruleForm.UserState" :true-label="1" :false-label="0">有效</el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :sm="12" :md="9">
						<el-form-item prop="UserIsAdmin">
							<el-checkbox v-model="ruleForm.UserIsAdmin" :true-label="1" :false-label="0">管理员</el-checkbox>
							<p title="" class="color-info-light font10"><SvgIcon name="fa fa-info-circle" class="mr3" />管理员拥有所有权限</p>
						</el-form-item>
					</el-col>
					
					<el-col :sm="24" :md="12" class="mb16">
						<el-form-item prop="UserPassword" label="密码" maxlength="64">
							<el-input type="password" v-model="ruleForm.UserPassword" placeholder="登录密码" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12" class="mb16">
						<el-form-item prop="UserConfirmPassword" label="确认密码" maxlength="64">
							<el-input type="password" v-model="ruleForm.UserConfirmPassword" placeholder="确认密码" clearable></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :sm="24" :md="12">
						<el-form-item prop="AllowFrontendLogin">
							<el-checkbox v-model="ruleForm.AllowFrontendLogin" :true-label="1" :false-label="0">前台登录</el-checkbox>
							<p title="" class="color-info-light ml5 font10"><SvgIcon name="fa fa-info-circle" class="mr3" />是否允许登录移动端前台</p>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12">
						<el-form-item prop="AllowBackendLogin">
							<el-checkbox v-model="ruleForm.AllowBackendLogin" :true-label="1" :false-label="0">后台登录</el-checkbox>
							<p title="" class="color-info-light ml5 font10"><SvgIcon name="fa fa-info-circle" class="mr3" />是否允许登录系统后台</p>
						</el-form-item>
					</el-col> -->
					<el-col :sm="24" :md="12" class="mb16">
						<el-form-item prop="UserRealName" label="姓名" maxlength="64">
							<el-input v-model="ruleForm.UserRealName" placeholder="用户姓名" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="24" :md="12" class="mb16">
						<el-form-item prop="UserMobile" label="手机号码" maxlength="32">
							<el-input v-model="ruleForm.UserMobile" placeholder="用户手机号码" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" :loading="loading" v-auth:[$parent.moduleKey]="'btn.Add'">{{
						$t('message.action.saveAndAdd')
					}}</el-button>
					<el-button type="primary" @click="onSubmit(true)" :loading="loading" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
	name: 'baseUserEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {},
			deptData: [], // 部门数据
		});

		const rules = reactive({
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 50,
					message: t('message.validRule.lengthRange', { min: 1, max: 50 }),
					trigger: 'change',
				},
			],
			Username: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 50,
					message: t('message.validRule.lengthRange', { min: 1, max: 50 }),
					trigger: 'change',
				},
			],
		});

		// 打开弹窗
		const openDialog = (row: Object) => {
			state.loading = false;
			const model = JSON.parse(JSON.stringify(row));
			state.ruleForm = model;

			if (row && row.Id > 0) {
				state.title = t('message.action.edit');
				state.ruleForm.UserCreateState = 0;
			} else {
				state.title = t('message.action.add');
				state.ruleForm.UserCreateState = 1;
				state.ruleForm.Id = 0;
				state.ruleForm.State = 1;
				state.ruleForm.IsTop = 0;
				state.ruleForm.Order = 100;
			}
			state.ruleForm.UserState = 1;
			state.ruleForm.UserIsAdmin = 1;
			state.ruleForm.Username = '';
			state.ruleForm.UserPassword = '';
			state.ruleForm.UserConfirmPassword = '';
			state.ruleForm.UserRealName = '';
			state.ruleForm.UserMobile = '';
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.ruleForm.Id = state.ruleForm.Id.toString();
					if (state.ruleForm.Id == 0 && state.ruleForm.Username) {
						if (state.ruleForm.Password == '') {
							ElMessage.error('请输入密码');
							return;
						}
						if (state.ruleForm.ConfirmPassword != state.ruleForm.Password) {
							ElMessage.error('确认密码和密码必须一致');
							return;
						}
					}

					state.ruleForm.State = Number(state.ruleForm.State);
					state.ruleForm.Order = Number(state.ruleForm.Order || 100);
					state.ruleForm.UserIdCreate = Number(state.ruleForm.UserIdCreate);
					state.ruleForm.UserState = Number(state.ruleForm.UserState);
					state.ruleForm.UserIsAdmin = Number(state.ruleForm.UserIsAdmin);

					state.loading = true;
					try {
						const res = await proxy.$api.base.tenant.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm = {
									Id: 0,
									State: 1,
									Username: '',
									UserState: 1,
									UserIsAdmin: 1,
									UserPassword: '',
									UserConfirmPassword: '',
									UserRealName: '',
									UserMobile: '',
								};
							}
							proxy.$parent.onGetTableData();
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
		onMounted(() => {
			//initTableData();
		});
		return {
			t,
			openDialog,
			closeDialog,
			onCancel,
			rules,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
