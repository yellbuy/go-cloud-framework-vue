<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowInfoDialog" destroy-on-close width="60%" :before-close="onCancel">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-suffix="：" label-width="120px" v-loading="loading">
				<el-divider content-position="left">工商信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="企业全称" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="客商编码" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="营业执照" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="登录用户名" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="法定代表人" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="法定代表人身份证" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="注册资本" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="币种" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="成立日期" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="注册地址" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="多证合一" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="企业机构类型" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="纳税人类型" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="营业/业务期限" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="纳税人资格证明" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">资质信息*</el-divider>
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Sn" label="供应商类别" width="120" show-overflow-tooltip/>
					<el-table-column prop="Name" label="证书类别" show-overflow-tooltip/>
					<el-table-column prop="Remark" label="证书名称" show-overflow-tooltip/>
					<el-table-column prop="Qty" label="证书编号" show-overflow-tooltip/>
					<el-table-column prop="Qty" label="有效期至" show-overflow-tooltip/>
					<el-table-column prop="Qty" label="证件状态" show-overflow-tooltip/>
					<el-table-column prop="Qty" label="证件附件" show-overflow-tooltip/>
				</el-table>
				<el-divider content-position="left">基本信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="办公地址" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="联系电话" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="生产经营地址" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="企业邮箱" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="官方网址" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">联系人信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="注册人姓名" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="注册人手机" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="注册人邮箱" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="注册人身份证号" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="授权委托有效期" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="委托书" prop="No">{{ruleForm.No}}</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg type="info" @click="onAudit(1)" >{{"审核驳回"}}</el-button>
					<el-button text bg type="primary" @click="onAudit(0)">{{ "审核通过" }}</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog :title="title" v-model="isShowAuditDialog" width="20%" :before-close="onAuditCancel">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-suffix="：" label-width="120px" v-loading="loading">
				<el-row>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						<el-input type="textarea" v-model="ruleForm.No" placeholder="请输入企业全称" />
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg type="primary" @click="onAuditCancel">{{"取消"}}</el-button>
					<el-button text bg type="info" @click="onSubmit" >{{"确认"}}</el-button>
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
	components: { Upload },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const moduleKey = proxy.$parent.moduleKey;
		const store = useStore();
		const token = Session.get('token');
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		const state = reactive({
			moduleKey,
			isShowInfoDialog: false,
			isShowAuditDialog:false,
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
			tableData:{
				data:[],
				loading:false,
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
				state.title = t('message.action.see');
			} else {
				state.ruleForm.Id = 0;
				state.title = t('message.action.add');
			}
			state.ruleForm.Kind = kind;
			state.isShowInfoDialog = true;
		};

		// 获取详细信息
		const GetByIdRow = async (id: string) => {
			try {
				const res = await proxy.$api.base.tenant.getCacheById(id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = JSON.parse(JSON.stringify(res.data));
			} finally {
				state.isShowDialog = true;
			}
		};

		// 打开审核窗口
		const onAudit = (a: number) => {
			state.isShowAuditDialog = true;
			if (a == 0) {
				state.title = "资质审核通过"
			} else if (a == 1) {
				state.title = "资质审核驳回"
			}
		};

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};

		// 取消
		const onAuditCancel = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowAuditDialog = false;
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
			// onGetSectionList();
		});
		return {
			proxy,
			t,
			openDialog,
			onAudit,
			onAuditCancel,
			onLoadTable,
			GetByIdRow,
			onGetSectionList,
			rules,
			getUserInfos,
			...toRefs(state),
		};
	},
};
</script>
