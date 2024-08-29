<template>
	<el-card v-if="isShowPage">
		<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-suffix="：" label-width="120px" v-loading="loading">
			<el-divider content-position="left">基本信息*</el-divider>
			<el-row :gutter="20">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="名称" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="项目名称" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="供应商名称" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="状态" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
			</el-row>
			<el-divider content-position="left">资料凭证信息*</el-divider>
			<el-row :gutter="20">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付金额" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付状态" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="凭证图片" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="凭证文件" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付时间" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核状态" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核人" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核时间" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
			</el-row>
			<el-divider content-position="left">保证金信息*</el-divider>
			<el-row :gutter="20">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付金额" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付状态" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="凭证图片" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="凭证文件" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付时间" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核状态" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核人" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核时间" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button text bg type="primary" @click="onAuditCancel()">返回</el-button>
				<el-button text bg type="danger" @click="onAudit(1)" >审核驳回</el-button>
				<el-button type="primary" @click="onAudit(0)">审核通过</el-button>
			</span>
		</template>
	</el-card>
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
			isShowPage: false,
			isShowAuditDialog:false,
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

		// 打开弹窗
		const openDialog = async () => {
			state.isShowPage = true;
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
				state.isShowPage = true;
			}
		};

		// 打开审核窗口
		const onAudit = (a: number) => {
			if (a == 0) {
				state.isShowAuditDialog = true;
				state.title = "资质审核通过"
			} else if (a == 1) {
				state.isShowAuditDialog = true;
				state.title = "资质审核驳回"
			}
		};

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};

		// 返回
		const onAuditCancel = () => {
			state.isShowPage = false;
			proxy.$parent.isShowPage = true;
			proxy.$parent.onGetTableData();
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
			getUserInfos,
			...toRefs(state),
		};
	},
};
</script>
