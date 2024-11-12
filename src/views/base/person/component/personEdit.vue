<template>
	<div class="system-edit-person-container">
		<el-dialog :title="title" v-model="isShowDialog" width="70%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-suffix="：" label-width="90px" v-loading="loading">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="姓名" prop="Name" >
							<el-input
								v-model="ruleForm.Name"
								:autofocus="!ruleForm.Id"
								:readonly="ruleForm.Id > 0"
								placeholder="请输入名称"
								maxlength="50"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="编码" prop="Code">
							<el-input v-model="ruleForm.Code" placeholder="请输入编码" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
						<el-form-item label="所属组织" prop="OrgId">
							<el-tree-select
								v-model="ruleForm.OrgId"
								placeholder="请选择"
								default-expand-all
								node-key="Id"
								:value-key="Id"
								:current-node-key="ruleForm.OrgId"
								:data="orgList"
								:props="{ label: 'Name', value: 'Id', children: 'Children' }"
								check-strictly
							/>							
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="性别" prop="Gender">
							<el-radio-group v-model="ruleForm.Gender">
								<el-radio :label="0">未知</el-radio>
								<el-radio :label="1">男</el-radio>
								<el-radio :label="2">女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="助记码" prop="Pinyin">
							<el-input v-model="ruleForm.Pinyin" placeholder="请输入助记码" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="昵称" prop="Nickname">
							<el-input v-model="ruleForm.Nickname" placeholder="请输入昵称" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					
				</el-row>
				<el-row :gutter="35">
					
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="出生年月" prop="Birthdate">
							<el-date-picker
								v-model="ruleForm.Birthdate"
								type="date"
								placeholder="请选择时间"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
						<el-form-item label="排序" prop="Order">
							<el-input-number type="number" placeholder="排序" 
							:precision="0" :step="10" v-model="ruleForm.Order"></el-input-number>
							<p title="" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>值小的靠前显示</span></p>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
						<el-form-item label="备注" prop="Remark">
							<el-input v-model="ruleForm.Remark" placeholder="请输入备注" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">详细信息</el-divider>
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="入职日期" prop="Hiredate">
							<el-date-picker
								v-model="ruleForm.Hiredate"
								type="date"
								placeholder="请选择入职日期"
								format="YYYY-MM-DD" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="职务" prop="Position">
							<el-input v-model="ruleForm.Position" placeholder="请输入职务" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="联系电话" prop="Tel">
							<el-input v-model="ruleForm.Tel" placeholder="请输入联系电话" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="手机号码" prop="Mobile">
							<el-input v-model="ruleForm.Mobile" placeholder="请输入手机号码" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="Email" prop="Email">
							<el-input v-model="ruleForm.Email" placeholder="请输入Email" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="身份证号" prop="Idno">
							<el-input v-model="ruleForm.Idno" placeholder="请输入身份证号码" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="邮政编码" prop="Postcode">
							<el-input v-model="ruleForm.Postcode" placeholder="请输入邮政编码" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="通讯地址" prop="Address">
							<el-input v-model="ruleForm.Address" placeholder="请输入通讯地址" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" :loading="loading" v-auth:[$parent.moduleKey]="'btn.OrgAdd'">{{
						$t('message.action.saveAndAdd')
					}}</el-button>
					<el-button type="primary" @click="onSubmit(true)" :loading="loading" v-auths:[$parent.moduleKey]="['btn.OrgEdit', 'btn.OrgAdd']">{{
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
import { useRoute } from 'vue-router';
export default {
	name: 'baseUserEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const route = useRoute();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {
				Id: '0',
				OrgId:'',
				Name: '', // 名称
				Code: '',
				Gender:0,
				Enable: 1,
				Order: 100, // 排序
				Mobile: '',
				Tel: '',
				Email: '',
				Parentid: '0',
				Vip: 0,
			},
			orgList: [], // 部门数据
		});

		const rules = reactive({
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			OrgId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = (id: string, orgList:any,orgId:string, disable: boolean) => {
			state.loading = false;
			state.ruleForm.OrgId = orgId;
			state.orgList = orgList;
			try {
				state.disable = disable;
				if (disable) {
					state.title = t('message.action.see');
					getByIdRow(id);
				} else if (id && id != '0') {
					getByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = '0';
					state.ruleForm.Enable=1;
					state.title = t('message.action.add');
				}
				
			} finally {
				state.isShowDialog = true;
			}
		};
		const getByIdRow = async (id: string) => {
			try {
				const res = await proxy.$api.base.person.getById(id);
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
			state.isShowDialog = false;
			proxy.$refs.ruleFormRef.resetFields();
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
					state.ruleForm.OrgId = (state.ruleForm.OrgId||0).toString();
					state.ruleForm.Order = Number.parseInt(state.ruleForm.Order || 0);
					
					state.loading = true;
					console.log(state.ruleForm);
					try {
						const res = await proxy.$api.base.person.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = '0';
							}
							proxy.$parent.onGetMainTableData();
						}
					} finally {
						state.loading = false;
					}
				} else {
					return false;
				}
			});
		};
		
		
		// 页面加载时
		onMounted(() => {
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
