<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" destroy-on-close width="450px" :before-close="onCancel">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-width="120px" v-loading="loading">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
						<el-form-item label="旧密码" prop="No">
							<el-input v-model="ruleForm.No"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
						<el-form-item label="新密码" prop="Name">
							<el-input v-model="ruleForm.Name"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
						<el-form-item label="重复新密码" prop="Name">
							<el-input v-model="ruleForm.Name"/>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit()" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{$t('message.action.save')}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Upload } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
export default {
	name: 'projectEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const moduleKey = proxy.$parent.moduleKey;
		// const lineEditDlgRef = ref();
		const store = useStore();
		const token = Session.get('token');
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		const state = reactive({
			moduleKey,
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			token: token,
			baseUrl: import.meta.env.VITE_API_URL,
			dialogVisible: false,
			ruleForm: {
				Id: 0,
				Kind: '',
				Name: '',
				No: '',
				Sn: '',
			},
			sectionList: [],
			homeBaseUrl: import.meta.env.VITE_URL as any,
		});

		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			No: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Sn: [
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
			ProjectType: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Content: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = async (kind: string, id: string) => {
			if (id != '0') {
				GetByIdRow(id);
				state.title = t('message.action.edit');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}
			state.ruleForm.Kind = kind;
			state.isShowDialog = true;
		};

		// 获取详细信息
		const GetByIdRow = async (id: string) => {
			try {
				const res = await proxy.$api.erp.project.getById(id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = JSON.parse(JSON.stringify(res.data));
			} finally {
				state.isShowDialog = true;
			}
		};

		// 取消
		const onCancel = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
		};

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};

		// 保存
		const onSubmit = () => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					try {
						const res = await proxy.$api.erp.project.save(state.ruleForm);
						if (res.errcode == 0) {
							ElMessage.success('操作成功！');
							onLoadTable();
							onCancel();
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

		//	加载所属部门
		const onGetSectionList = async () => {
			try {
				const res = await proxy.$api.base.tenant.getList(param);
				if (res.errcode != 0) {
					return;
				}
				state.sectionList = res.data;
			} finally {
			}
		};

		// 页面加载时
		onMounted(() => {
			onGetSectionList();
		});
		return {
			proxy,
			t,
			openDialog,
			onCancel,
			onLoadTable,
			GetByIdRow,
			onGetSectionList,
			rules,
			getUserInfos,
			onSubmit,
			...toRefs(state),
		};
	},
	components: {
		Upload,
	},
};
</script>
