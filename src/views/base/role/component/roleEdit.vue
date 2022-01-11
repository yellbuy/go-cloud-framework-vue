<template>
	<div class="system-edit-role-container">
		<el-dialog :title="title" v-model="isShowDialog">
			<!-- <template #title>
				{{title}}
				<div class="line">
					<div></div>
				</div>
			</template> -->
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<el-form-item label="名称" prop="Name" style="max-width: 420px">
					<el-input v-model="ruleForm.Name" placeholder="请输入角色名称" maxlength="50" clearable></el-input>
				</el-form-item>
				<el-form-item label="编码" prop="Code" style="max-width: 420px">
					<el-input v-model="ruleForm.Code" placeholder="请输入角色编码" maxlength="50" clearable></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="Remark">
					<el-input v-model="ruleForm.Remark" type="textarea" placeholder="请输入角色备注"  :rows="5" clearable></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" size="small">{{ $t('message.action.saveAndAdd') }}</el-button>
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
	name: 'baseRoleEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title:t('message.action.add'),
			loading:false,
			ruleForm: {
				Id:0,
				Name: '', // 角色名称
				Code:'',
				Order: 100, // 排序
				Remark:'',
				department: [], // 部门
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
			state.ruleForm = row;
			if(row && row.Id>0){
				state.title=t('message.action.edit');
			}else{
				state.title=t('message.action.add');
				state.ruleForm.Id=0;
				state.ruleForm.Enable=1;
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
