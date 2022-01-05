<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" >
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="登录账号" prop="Username" :error="ruleForm.Username?'':t('message.validRule.required')">
							<el-input v-model="ruleForm.Username" placeholder="请输入账户名" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="姓名" prop="Name" >
							<el-input v-model="ruleForm.Name" placeholder="请输入用户姓名" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="编码" prop="Code">
							<el-input v-model="ruleForm.Code" placeholder="请输入编码" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="关联角色">
							<el-select v-model="ruleForm.roleSign" placeholder="请选择" clearable class="w100">
								<el-option label="超级管理员" value="admin"></el-option>
								<el-option label="普通用户" value="common"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="部门">
							<el-cascader
								:options="deptData"
								:props="{ checkStrictly: true, value: 'deptName', label: 'deptName' }"
								placeholder="请选择部门"
								clearable
								class="w100"
								v-model="ruleForm.department"
							>
								<template #default="{ node, data }">
									<span>{{ data.deptName }}</span>
									<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号">
							<el-input v-model="ruleForm.phone" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="邮箱">
							<el-input v-model="ruleForm.email" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="性别">
							<el-select v-model="ruleForm.sex" placeholder="请选择" clearable class="w100">
								<el-option label="男" value="男"></el-option>
								<el-option label="女" value="女"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账户密码">
							<el-input v-model="ruleForm.password" placeholder="请输入" type="password" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账户过期">
							<el-date-picker v-model="ruleForm.overdueTime" type="date" placeholder="请选择" class="w100"> </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户状态">
							<el-switch v-model="ruleForm.status" inline-prompt active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="用户描述">
							<el-input v-model="ruleForm.describe" type="textarea" placeholder="请输入用户描述" maxlength="150"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit" size="small">{{ $t('message.action.save') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
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
			ruleForm: {
				Username: '', // 账户名称
				Name: '', // 用户昵称
				Code:'',
				roleSign: '', // 关联角色
				department: [], // 部门
				phone: '', // 手机号
				email: '', // 邮箱
				sex: '', // 性别
				password: '', // 账户密码
				overdueTime: '', // 账户过期
				status: true, // 用户状态
				describe: '', // 用户描述
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
		const onSubmit = () => {
			proxy.$refs.ruleFormRef.validate((valid) => {
				if (valid) {
					proxy.$message.success('验证成功');
					closeDialog();
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
