<template>
	<el-card v-if="state.isShowPage">
		<el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" size="small" label-suffix="：" label-width="120px" v-loading="state.loading">
			<el-row :gutter="20">
				<el-divider content-position="left">基本信息*</el-divider>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="名称" prop="No">{{state.ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="项目名称" prop="Name">{{state.ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="供应商名称" prop="No">{{state.ruleForm.No}}</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
					<el-form-item label="状态" prop="State">{{state.ruleForm.No}}</el-form-item>
				</el-col>
			</el-row>
			<el-card style="margin-bottom: 30px; background-color: #E8EBFF" v-if="(state.ruleForm.BidPayState == 1 && state.ruleForm.EnsurePayState == 0) || !state.isEdit">
				<el-row :gutter="20">
					<el-divider content-position="left">资料凭证信息*</el-divider>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付金额" prop="BidFee">{{state.ruleForm.BidFee}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付状态" prop="BidPayState">
							<div style="display: flex; align-items: center;" >
								<el-tag type="info" effect="plain" v-if="state.ruleForm.BidPayState == 1">已支付</el-tag>
								<el-tag type="success" effect="plain" v-else>未支付</el-tag>
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付时间" prop="BidPayTime">{{ state.ruleForm.BidPayTime }}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="凭证文件" prop="BidFiles">
							<el-link :href="state.baseUrl + state.ruleForm.BidFiles" target="_blank">{{ state.ruleForm.BidFiles }}</el-link>	
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="凭证图片" prop="BidPics">
							<img :src="state.baseUrl + state.ruleForm.BidPics" alt="资料凭证图片" width="80" height="80" @click="showImage(state.ruleForm.BidPics)"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付审核状态" prop="BidAuditState">
							<div style="display: flex; align-items: center;">
								<el-tag type="info" effect="dark" v-if="state.ruleForm.BidAuditState == 0">待审核</el-tag>
								<el-tag type="success" effect="dark" v-else-if="state.ruleForm.BidAuditState == 1">通过</el-tag>
								<el-tag type="danger" effect="dark" v-else>不通过</el-tag>
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付审核人" prop="BidAuditBy">{{state.ruleForm.BidAuditBy}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付审核时间" prop="BidAuditTime">{{state.ruleForm.BidAuditTime}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
						<el-form-item label="审核意见" prop="BidAuditRemark">{{state.ruleForm.BidAuditRemark}}</el-form-item>
					</el-col>
				</el-row>
			</el-card>
			<el-card style="margin-bottom: 30px; background-color: #E8EBFF" v-if="state.ruleForm.BidAuditState == 1 && state.ruleForm.EnsurePayState == 1">
				<el-row :gutter="20">
					<el-divider content-position="left">保证金信息*</el-divider>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付金额" prop="EnsureFee">{{state.ruleForm.EnsureFee}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付状态" prop="EnsurePayState">
							<div style="display: flex; align-items: center;" >
								<el-tag type="info" effect="plain" v-if="state.ruleForm.EnsurePayState == 1">已支付</el-tag>
								<el-tag type="success" effect="plain" v-else>未支付</el-tag>
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付时间" prop="EnsurePayTime">{{state.ruleForm.EnsurePayTime}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="凭证文件" prop="EnsureFiles">
							<el-link :href="state.baseUrl + state.ruleForm.EnsureFiles" target="_blank">{{ state.ruleForm.EnsureFiles }}</el-link>	
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="凭证图片" prop="EnsurePics">
							<img :src="state.baseUrl + state.ruleForm.EnsurePics" alt="资料凭证图片" width="80" height="80" @click="showImage(state.ruleForm.EnsurePics)"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付审核状态" prop="EnsureAuditState">
							<div style="display: flex; align-items: center;">
								<el-tag type="info" effect="dark" v-if="state.ruleForm.EnsureAuditState == 0">待审核</el-tag>
								<el-tag type="success" effect="dark" v-else-if="state.ruleForm.EnsureAuditState == 1">通过</el-tag>
								<el-tag type="danger" effect="dark" v-else>不通过</el-tag>
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付审核人" prop="EnsureAuditBy">{{state.ruleForm.EnsureAuditBy}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb12">
						<el-form-item label="支付审核时间" prop="EnsureAuditTime">{{state.ruleForm.EnsureAuditTime}}</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
						<el-form-item label="审核意见" prop="EnsureAuditRemark">{{state.ruleForm.EnsureAuditRemark}}</el-form-item>
					</el-col>
				</el-row>
			</el-card>
		</el-form>
			<span class="dialog-footer" style="float: right; margin-bottom: 20px;">
				<el-button text bg type="primary" @click="onCancel()">返回</el-button>
				<el-button text bg type="danger" v-if="state.isEdit" @click="onAudit(1)" >审核驳回</el-button>
				<el-button type="primary" v-if="state.isEdit" @click="onAudit(0)">审核通过</el-button>
			</span>
		<el-dialog :title="title" v-model="state.isShowDialog" width="20%" :before-close="onAuditCancel">
			<el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" size="small" label-suffix="：" label-width="120px" v-loading="state.loading">
				<el-row>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						<el-input type="textarea" v-model="state.param.AuditRemark" placeholder="审核备注" />
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg type="primary" @click="onAuditCancel">取消</el-button>
					<el-button type="primary" @click="onSubmit" >确认</el-button>
				</span>
			</template>
		</el-dialog>
	</el-card>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';

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
	isEdit: true,
	title: '',
	isShowDialog: false,
	loading: false,
	token: token,
	baseUrl: import.meta.env.VITE_URL,
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
const openEditPage = async (id: string) => {
	GetByIdRow(id)
	state.isEdit = true;
	state.isShowPage = true;
};

// 打开查看页面
const openSeePage = async (id: string) => {
	GetByIdRow(id)
	state.isEdit = false
	state.isShowPage = true;
};

// 获取详细信息
const GetByIdRow = async (id: string) => {
	try {
		const res = await proxy.$api.erp.projectcompany.getById(id);
		if (res.errcode != 0) {
			return;
		}
		state.ruleForm = res.data;
	} finally {
	}
};

// 打开审核窗口
//auditKind: 0.通过 ， 1.驳回
const onAudit = (auditKind: number) => {
	state.isShowDialog = true;
	state.param.Id = state.ruleForm.Id
	if (auditKind == 0 && state.ruleForm.EnsurePayState == 0) {
		state.title = "资料支付凭证审核通过意见"
		state.param.AuditKind = 'auditBidPay'
		state.param.AuditState = 1
	} else if (auditKind == 0 && state.ruleForm.EnsurePayState == 1) {
		state.title = "保证金支付凭证审核通过意见"
		state.param.AuditKind = 'auditEnsurePay'
		state.param.AuditState = 1
	} else if (auditKind == 1 && state.ruleForm.EnsurePayState == 0) {
		state.title = "资料支付凭证审核驳回意见"
		state.param.AuditKind = 'auditBidPay'
		state.param.AuditState = 2
	} else if (auditKind == 1 && state.ruleForm.EnsurePayState == 1) {
		state.title = "保证金支付凭证审核驳回意见"
		state.param.AuditKind = 'auditEnsurePay'
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

// 提交
const onSubmit = async () => {
	try {
		const res = await proxy.$api.erp.projectcompany.voucherAudit(state.ruleForm.Id, state.param);
		if (res.errcode != 0) {
			ElMessage.error('提交失败！')
			return;
		}
		ElMessage.success('提交成功！')
		setTimeout(() => {
			GetByIdRow(state.ruleForm.Id)
		}, 500);
		state.param.AuditRemark == ''
		state.isShowDialog = false;
	} finally {
	}
}

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

defineExpose({openEditPage, openSeePage, ...toRefs(state)})

</script>
