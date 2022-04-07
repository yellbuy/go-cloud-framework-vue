<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="登录账号" prop="Username">
							<el-input v-model="ruleForm.Username" :autofocus="!ruleForm.Id" :readonly="ruleForm.Id>0" placeholder="请输入账户名" maxlength="50" clearable></el-input>
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
							<p title="" class="color-info-light text-help-info font10" v-if="ruleForm.Id>0"><SvgIcon name="fa fa-info-circle" /><span>无需修改密码，请保留为空</span></p>
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
						<el-form-item label="排序" prop="Order">
							<el-input v-model="ruleForm.Order" placeholder="排序" type="number" :step="10"></el-input>
							<p title="" class="color-info-light font10" ><SvgIcon name="fa fa-info-circle" class="mr3"/>值小的靠前显示</p>
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
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" class="mb20">
						<el-form-item prop="IsAdmin">
							<el-checkbox v-model="ruleForm.IsAdmin" :true-label="1" :false-label="0">管理员</el-checkbox>
							<p title="" class="color-info-light font10" ><SvgIcon name="fa fa-info-circle" class="mr3"/>管理员拥有所有权限</p>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" class="mb20">
						<el-form-item label="" prop="IsExternal">
							<el-checkbox v-model="ruleForm.IsExternal" :true-label="1" :false-label="0">外部用户</el-checkbox>
							<p title="" class="color-info-light font10" ><SvgIcon name="fa fa-info-circle" class="mr3"/>外部用户不允许登录后台</p>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" class="mb20">
						<el-form-item label="" prop="AllowBackendLogin">
							<el-checkbox v-model="ruleForm.AllowBackendLogin" :true-label="1" :false-label="0">后台允许登录</el-checkbox>
							<p title="" class="color-info-light font10" ><SvgIcon name="fa fa-info-circle" class="mr3"/>是否允许登录系统后台</p>
						</el-form-item>
						
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" class="mb20">
						<el-form-item label="" prop="AllowFrontendLogin">
							<el-checkbox v-model="ruleForm.AllowFrontendLogin" :true-label="1" :false-label="0">前台允许登录</el-checkbox>
							<p title="" class="color-info-light font10" ><SvgIcon name="fa fa-info-circle" class="mr3" />是否允许登录前台和客户端</p>
						</el-form-item>
						
					</el-col>
					
				</el-row>
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="所属角色" prop="RoleIds">
							<el-checkbox-group v-model="ruleForm.CheckedRoleList">
								<el-checkbox v-for="val in ruleForm.RoleList"  :checked="val.Checked"  :label="val.Id" :key="val.Id">
									{{val.Name}}
								</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" >{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id"  :loading="loading" v-auth:[$parent.moduleKey]="'btn.UserAdd'">{{ $t('message.action.saveAndAdd') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)"  :loading="loading" v-auths:[$parent.moduleKey]="['btn.UserEdit','btn.UserAdd']">{{ $t('message.action.save') }}</el-button>
					
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
	name: 'baseUserEdit',
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
				RoleIds:'',
				CheckedRoleList:[],
				RoleList:[],
				AllowBackendLogin:1,
				AllowFrontendLogin:1,
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
			state.loading=false
			const model = JSON.parse(JSON.stringify(row))
			state.ruleForm = model;
			if(row && row.Id>0){
				state.title=t('message.action.edit');
			}else{
				state.title=t('message.action.add');
				state.ruleForm.Id=0;
				state.ruleForm.Enable=1;
				state.ruleForm.Order=100;
				state.ruleForm.AllowBackendLogin=1;
				state.ruleForm.AllowFrontendLogin=1;
			}
			state.isShowDialog = true;

			//加载角色数据
			onInitRoleData(row.RoleIds||"");
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
			
			proxy.$refs.ruleFormRef.validate((valid) => {
				if (valid) {
					state.loading=true;
					const url=state.ruleForm.Id>0?`/v1/base/user/${state.ruleForm.Id}`:`/v1/base/user`;
					state.ruleForm.Id=state.ruleForm.Id.toString();
					state.ruleForm.Order=Number.parseInt(state.ruleForm.Order||0);
					state.ruleForm.RoleIds=state.ruleForm.CheckedRoleList.join(",");
					
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
								state.ruleForm.Id=0;
								state.ruleForm.PasswordConfirm='';
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
		//加载角色数据
		const onInitRoleData=((roleIds:string)=>{
			
			state.ruleForm.RoleList=[];
			state.ruleForm.CheckedRoleList=[];
			//加载权限数据
			request({
				url: `v1/base/roles`,
				method: 'get',
				params:{pageSize:1000000}
			}).then((res)=>{
				if(res.errcode!=0){
					return;
				}
				
				const roleIdArr=roleIds.split(",");
				for (const val of res.data) {
					val.Checked=false;
					for(const id of roleIdArr){
						if(val.Id==id){
							state.ruleForm.CheckedRoleList.push(val.Id)
							val.Checked=true
							break;
						}
					}
				}
				state.ruleForm.RoleList=res.data;
			})
		})

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
