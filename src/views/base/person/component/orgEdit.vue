<template>
	<div class="system-edit-org-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="名称" prop="Name">
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
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="全名" prop="LongName">
							<el-input v-model="ruleForm.LongName" placeholder="请输入全名" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					
				</el-row>
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="父级" prop="Parentid">
							<el-tree-select
								v-model="ruleForm.Parentid"
								placeholder="顶级"
								default-expand-all
								node-key="Id"
								:value-key="Id"
								:current-node-key="ruleForm.Parentid"
								:data="orgList"
								:props="{ label: 'Name', value: 'Id', children: 'Children' }"
								check-strictly
							/>							
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="组织类型" prop="OrgKind">
							<el-select
								v-model="ruleForm.OrgKind"
								default-first-option
								placeholder="请选择">
								<el-option label="组织" value="org"></el-option>
								<el-option label="机构" value="ogn"></el-option>
								<el-option label="分子公司" value="com"></el-option>
								<el-option label="部门" value="dpt"></el-option>
								<el-option label="岗位" value="pos"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="排序" prop="Order">
							<el-input-number type="number" placeholder="排序" 
							:precision="0" :step="10" v-model="ruleForm.Order"></el-input-number>
							<p title="" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>值小的靠前显示</span></p>
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
				Id: 0,
				Name: '', // 名称
				Code: '',
				OrgKind:'',
				Enable: 1,
				Order: 100, // 排序
				Mobile: '',
				Tel: '',
				Email: '',
				Parentid: '',
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
			OrgKind: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = (id: string, orgList:any,parentid:string, disable: boolean) => {
			state.loading = false;
			state.ruleForm.Parentid = parentid;
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
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};
		const getByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.base.org.getById(Id);
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
					state.ruleForm.Order = Number.parseInt(state.ruleForm.Order || 0);
					
					state.loading = true;
					console.log(state.ruleForm);
					try {
						const res = await proxy.$api.base.org.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetTableData();
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
