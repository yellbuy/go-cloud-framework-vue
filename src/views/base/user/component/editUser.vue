<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="登录账号" prop="Username" :error="ruleForm.Username?'':t('message.validRule.required')">
							<el-input v-model="ruleForm.Username" placeholder="请输入账户名" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="姓名" prop="Name" >
							<el-input v-model="ruleForm.Name" placeholder="请输入姓名" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="编码" prop="Code">
							<el-input v-model="ruleForm.Code" placeholder="请输入编码" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="" prop="Enable">
							<el-checkbox v-model="ruleForm.Enable" :true-label="1" :false-label="0">账号可用</el-checkbox>
						</el-form-item>
					</el-col>
					
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="密码" prop="Password">
							<el-input v-model="ruleForm.Password" type="new-password" placeholder="如需修改密码，请输入新密码" maxlength="50" clearable></el-input>
							<p title="" class="color-info-light font10" v-if="ruleForm.Id>0"><SvgIcon name="fa fa-info-circle" />无需修改密码，请保留为空</p>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20" v-if="!ruleForm.Id">
						<el-form-item label="确认密码" prop="PasswordConfirm">
							<el-input v-model="ruleForm.PasswordConfirm" type="new-password" placeholder="请输入确认密码" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="手机号" prop="Mobile">
							<el-input v-model="ruleForm.Mobile" placeholder="请输入手机号" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="电话" prop="Tel">
							<el-input v-model="ruleForm.Tel" placeholder="请输入电话" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="邮箱" prop="Email">
							<el-input v-model="ruleForm.Email" placeholder="请输入邮箱" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item prop="IsAdmin">
							<el-checkbox v-model="ruleForm.IsAdmin" :true-label="1" :false-label="0">管理员</el-checkbox>
							<p title="" class="color-info-light font10" ><SvgIcon name="fa fa-info-circle" />管理员拥有所有权限</p>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="职务" prop="Position">
							<el-input v-model="ruleForm.Position" placeholder="请输入职务" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="" prop="Gender">
							<el-radio-group v-model="ruleForm.Gender">
								<el-radio :label="1" size="large">男</el-radio>
								<el-radio :label="2" size="large">女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="" prop="AllowBackendLogin">
							<el-checkbox v-model="ruleForm.AllowBackendLogin" :true-label="1" :false-label="0">后台允许登录</el-checkbox>
							<p title="" class="color-info-light font10" ><SvgIcon name="fa fa-info-circle" />是否允许登录系统后台</p>
						</el-form-item>
						
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="" prop="AllowFrontendLogin">
							<el-checkbox v-model="ruleForm.AllowFrontendLogin" :true-label="1" :false-label="0">前台允许登录</el-checkbox>
							<p title="" class="color-info-light font10" ><SvgIcon name="fa fa-info-circle" />是否允许登录系统前台和客户端</p>
						</el-form-item>
						
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="" prop="IsExternal">
							<el-checkbox v-model="ruleForm.IsExternal" :true-label="1" :false-label="0">外部用户</el-checkbox>
							<p title="" class="color-info-light font10" ><SvgIcon name="fa fa-info-circle" />外部用户不允许登录后台</p>
						</el-form-item>
						
					</el-col>
					
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="ruleForm.Id==0" size="small">{{ $t('message.action.saveAndAdd') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small">{{ $t('message.action.save') }}</el-button>
					
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
	name: 'baseEditUser',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title:t('message.action.add'),
			loading:false,
			ruleForm: {
				Id:0,
				Username: '', // 账户名称
				Name: '', // 用户昵称
				Code:'',
				Enable:1,
				Order: 100, // 排序
				Password:'',
				PasswordConfirm:'',
				Mobile:'',
				Tel:'',
				Email:'',
				Addrcode:'',
				RoleIds:[],
				AllowBackendLogin:0,
				AllowFrontendLogin:0,
				IsExternal:0,
				department: [], // 部门
				Gender: 0 // 性别
			},
			deptData: [], // 部门数据
		});

		const rules = reactive({
			Username: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 50,
					message: t('message.validRule.lengthRange',{'min':1,'max':50}),
					trigger: 'change',
				},
			]
		});

		// 打开弹窗
		const openDialog = (row: Object) => {
			state.ruleForm = row;
			if(row && row.Id>0){
				state.title=t('message.action.edit');
			}
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
		const onSubmit = (isCloseDlg:boolean) => {
			state.loading=true;
			proxy.$refs.ruleFormRef.validate((valid) => {
				if (valid) {
					const url=state.ruleForm.Id>0?`/v1/base/user/${state.ruleForm.Id}`:`/v1/base/user`;
					request({
						url: url,
						method: 'post',
						data: state.ruleForm,
					}).then((res)=>{
						state.loading=false;
						if(res.errcode==0){
							if(isCloseDlg){
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
							}
							proxy.$parent.onGetTableData();
						}
					}).catch((err)=>{
						state.loading=false;
					});
					return false;
				} else {
					return false;
				}
			});
		};
		// 初始化部门数据
		const initTableData = () => {
			state.deptData.push({
				deptName: 'vueNextAdmin',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Number.parseInt(Math.random()),
				describe: '顶级部门',
				id: Math.random(),
				children: [
					{
						deptName: 'IT外包服务',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Number.parseInt(Math.random()),
						describe: '总部',
						id: Math.random(),
					},
					{
						deptName: '资本控股',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Number.parseInt(Math.random()),
						describe: '分部',
						id: Math.random(),
					},
				],
			});
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
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
