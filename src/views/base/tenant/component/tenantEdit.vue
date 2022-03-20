<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" >
			<el-form ref="ruleFormRef" :inline="true" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<el-form-item  prop="Name" label="单位名称">
					<el-input v-model="ruleForm.Name" :autofocus="true" placeholder="请输入单位名称" maxlength="32" clearable></el-input>
				</el-form-item>
				<el-form-item prop="Code" label="单位代码" >
					<el-input v-model="ruleForm.Code" placeholder="请输入单位代码" maxlength="36" clearable></el-input>
				</el-form-item>
				<el-form-item prop="Phone" label="单位电话">
					<el-input v-model="ruleForm.Phone" placeholder="请输入单位电话" maxlength="20" clearable></el-input>
				</el-form-item>
				<el-form-item prop="Linkman" label="单位联系人" >
					<el-input v-model="ruleForm.Linkman" placeholder="请输入单位联系人" maxlength="20" clearable></el-input>
				</el-form-item>
				
				<el-form-item prop="Addr" label="单位地址">
					<el-input v-model="ruleForm.Addr" placeholder="请输入单位地址" maxlength="63" clearable></el-input>
				</el-form-item>
				<el-form-item prop="Remark" label="备注">
					<el-input v-model="ruleForm.Remark" placeholder="单位备注信息" clearable></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="State">
					<el-checkbox v-model="ruleForm.State" :true-label="1" :false-label="0">有效</el-checkbox>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" size="small" v-auth:[$parent.moduleKey]="'btn.Add'">{{ $t('message.action.saveAndAdd') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.Edit','btn.Add']">{{ $t('message.action.save') }}</el-button>
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
			Name: [
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
			const model = JSON.parse(JSON.stringify(row))
			state.ruleForm = model;
			if(row && row.Id>0){
				state.title=t('message.action.edit');
				
			}else{
				state.title=t('message.action.add');
				state.ruleForm.Id=0;
				state.ruleForm.State=1;
				state.ruleForm.Order=100;
				state.ruleForm.AllowBackendLogin=1;
				state.ruleForm.AllowFrontendLogin=1;
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
			
			proxy.$refs.ruleFormRef.validate((valid) => {
				if (valid) {
					state.loading=true;
					const url=state.ruleForm.Id>0?`/v1/base/tenant/${state.ruleForm.Id}`:`/v1/base/tenant`;
					state.ruleForm.Id=state.ruleForm.Id.toString();
					state.ruleForm.Order=Number.parseInt(state.ruleForm.Order||0);
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
								state.ruleForm={Id:0,State:1};
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
