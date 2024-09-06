<template>
	<el-card v-if="isShowPage">
		<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-suffix="：" label-width="120px" v-loading="loading">
			<el-row :gutter="20">
				<el-divider content-position="left">基本信息*</el-divider>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="名称" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="项目名称" prop="Name">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="供应商名称" prop="No">{{ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="状态" prop="State">{{ruleForm.No}}</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-divider content-position="left">资料凭证信息*</el-divider>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付金额" prop="BidFee">{{ruleForm.BidFee}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付状态" prop="BidPayState">
						<div style="display: flex; align-items: center;" v-if="ruleForm.BidPayState == 1">
							<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>已支付</span>
						</div>
						<div style="display: flex; align-items: center;" v-else>
							<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>未支付</span>
						</div>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="凭证图片" prop="BidPics">
						<img :src="baseUrl + ruleForm.BidPics" alt="资料凭证图片" width="80" height="80" @click="showImage(ruleForm.BidPics)"/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="凭证文件" prop="BidFiles">
						<el-link :href="baseUrl+ruleForm.BidFiles" target="_blank">{{ ruleForm.BidFiles }}</el-link>	
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付时间" prop="BidPayTime">{{ruleForm.BidPayTime}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核状态" prop="BidAuditState">
						<div style="display: flex; align-items: center;" v-if="ruleForm.BidAuditState == 0">
							<span style="color: gray; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>待审核</span>
						</div>
						<div style="display: flex; align-items: center;" v-else-if="ruleForm.BidAuditState == 1">
							<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>通过</span>
						</div>
						<div style="display: flex; align-items: center;" v-else>
							<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>驳回</span>
						</div>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核人" prop="BidAuditBy">{{ruleForm.BidAuditBy}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核时间" prop="BidAuditTime">{{ruleForm.BidAuditTime}}</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20" v-if="ruleForm.BidAuditState == 1">
				<el-divider content-position="left">保证金信息*</el-divider>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付金额" prop="EnsureFee">{{ruleForm.EnsureFee}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付状态" prop="EnsurePayState">
						<div style="display: flex; align-items: center;" v-if="ruleForm.EnsurePayState == 1">
							<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>已支付</span>
						</div>
						<div style="display: flex; align-items: center;" v-else>
							<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>未支付</span>
						</div>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="凭证图片" prop="EnsurePics">
						<img :src="baseUrl + ruleForm.EnsurePics" alt="资料凭证图片" width="80" height="80" @click="showImage(ruleForm.EnsurePics)"/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="凭证文件" prop="EnsureFiles">
						<el-link :href="baseUrl+ruleForm.EnsureFiles" target="_blank">{{ ruleForm.EnsureFiles }}</el-link>	
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付时间" prop="EnsurePayTime">{{ruleForm.EnsurePayTime}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核状态" prop="EnsureAuditState">
						<div style="display: flex; align-items: center;" v-if="ruleForm.EnsureAuditState == 0">
							<span style="color: gray; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>待审核</span>
						</div>
						<div style="display: flex; align-items: center;" v-else-if="ruleForm.EnsureAuditState == 1">
							<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>通过</span>
						</div>
						<div style="display: flex; align-items: center;" v-else>
							<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
							<span>驳回</span>
						</div>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核人" prop="EnsureAuditBy">{{ruleForm.EnsureAuditBy}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="支付审核时间" prop="EnsureAuditTime">{{ruleForm.EnsureAuditTime}}</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button text bg type="primary" @click="onCancel()">返回</el-button>
				<el-button text bg type="danger" v-if="ruleForm.BidAuditState == 0 || ruleForm.EnsureAuditState == 0" @click="onAudit(1)" >审核驳回</el-button>
				<el-button type="primary" v-if="ruleForm.BidAuditState == 0 || ruleForm.EnsureAuditState == 0" @click="onAudit(0)">审核通过</el-button>
			</span>
		</template>
		<el-dialog :title="title" v-model="isShowDialog" width="20%" :before-close="onAuditCancel">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="small" label-suffix="：" label-width="120px" v-loading="loading">
				<el-row>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						<el-input type="textarea" v-model="param.AuditRemark" placeholder="审核备注" />
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
	name: 'reviewEdit',
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
			isEdit: false,
			title: '',
			isShowDialog: false,
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
			param: {
				Id: '',
				AuditKind: '',
				AuditState: 0,
				AuditRemark: '',
			},
			homeBaseUrl: import.meta.env.VITE_URL as any,
		});

		// 打开编辑审核
		const openEditPage = async (id: number|string) => {
			GetByIdRow(id)
			state.isEdit = true;
			state.isShowPage = true;
		};

		// 打开查看页面
		const openSeePage = async (id: number|string) => {
			GetByIdRow(id)
			state.isShowPage = true;
		};

		// 获取详细信息
		const GetByIdRow = async (id: number|string) => {
			try {
				const res = await proxy.$api.erp.projectcompany.projectcompany("repair", id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data[0];
			} finally {
			}
		};

		const onSubmit = async () => {
			try {
				const res = await proxy.$api.erp.projectcompany.auditUpdate(state.ruleForm.Id, state.param);
				if (res.errcode != 0) {
					return;
				}
				GetByIdRow(state.ruleForm.Id)
				state.isShowDialog = false;
			} finally {
			}
		}

		// 打开审核窗口
		const onAudit = (a: number) => {
			state.isShowDialog = true;
			state.param.Id = state.ruleForm.Id
			if (a == 0 && state.ruleForm.BidAuditState == 0) {
				state.title = "资料支付凭证审核通过意见"
				state.param.AuditKind = 'bid'
				state.param.AuditState = 1
			} else if (a == 0 && state.ruleForm.EnsureAuditState == 0 && state.ruleForm.BidAuditState == 1) {
				state.title = "保证金支付凭证审核通过意见"
				state.param.AuditKind = 'ensure'
				state.param.AuditState = 1
			} else if (a == 1 && state.ruleForm.BidAuditState == 0) {
				state.title = "资料支付凭证审核驳回意见"
				state.param.AuditKind = 'bid'
				state.param.AuditState = 2
			} else if (a == 1 && state.ruleForm.EnsureAuditState == 0 && state.ruleForm.BidAuditState == 1) {
				state.title = "保证金支付凭证审核驳回意见"
				state.param.AuditKind = 'ensure'
				state.param.AuditState = 2
			} else {
				state.isShowDialog = false;
			}
		};

		// 取消
		const onAuditCancel = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
		};

		// 打开新标签预览图片
		const showImage = async (path: string) => {
			const newWindow = window.open(import.meta.env.VITE_URL + path, '_blank');
				if (!newWindow) {
				alert('弹出窗口被阻止。请在浏览器设置中允许弹出窗口以查看图片。');
			}
		};

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};

		// 返回
		const onCancel = () => {
			state.isShowPage = false;
			proxy.$parent.isShowPage = true;
			proxy.$parent.onGetTableData();
		};

		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openEditPage,
			openSeePage,
			onSubmit,
			onCancel,
			onAudit,
			onAuditCancel,
			onLoadTable,
			GetByIdRow,
			showImage,
			getUserInfos,
			...toRefs(state),
		};
	},
};
</script>
