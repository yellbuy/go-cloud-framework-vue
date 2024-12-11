<template>
	<el-dialog :title="state.title" v-model="state.isShowDialog" destroy-on-close width="60%" :before-close="closeDialog">
		<el-tabs v-model="state.activeName" class="demo-tabs">
			<el-tab-pane label="项目详情" name="first" style="height: 400px">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目编号：">{{ state.projectForm.No }}</el-descriptions-item>
					<el-descriptions-item label="项目名称：">{{ state.projectForm.Name }}</el-descriptions-item>
					<el-descriptions-item label="发布日期：">{{ state.projectForm.BidOpenTime }}</el-descriptions-item>
					<el-descriptions-item label="报名截止时间：">{{ state.projectForm.EndTime }}</el-descriptions-item>
					<el-descriptions-item label="投标截止时间：">{{ state.projectForm.FinishTime }}</el-descriptions-item>
					<el-descriptions-item label="评选日期：">{{ state.projectForm.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="项目类型：">
						<span v-if="state.projectForm.ProjectType == 1">公开招标</span>
						<span v-else-if="state.projectForm.ProjectType == 2">邀请招标</span>
						<span v-else-if="state.projectForm.ProjectType == 3">竞争性谈判</span>
						<span v-else-if="state.projectForm.ProjectType == 4">单一来源采购</span>
						<span v-else-if="state.projectForm.ProjectType == 5">询价采购</span>
					</el-descriptions-item>
				</el-descriptions>
				<div>项目共用包列表：</div>
				<el-table :data="state.projectLineTableData.data" v-loading="state.projectLineTableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="60" align="right" show-overflow-tooltip fixed />
					<el-table-column prop="No" label="包号" width="150" show-overflow-tooltip fixed/>
					<el-table-column prop="Name" label="设备名称" width="150" show-overflow-tooltip/>
					<el-table-column prop="Qty" label="数量" width="80" align="right" show-overflow-tooltip/>
					<el-table-column prop="Remark" label="备注"  show-overflow-tooltip/>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="比选公告" name="second" style="height: 400px">
				<el-scrollbar>
					<el-descriptions :column="2">
						<el-descriptions-item label="采购项目编号：">{{ state.projectForm.No }}</el-descriptions-item>
						<el-descriptions-item label="采购方式："></el-descriptions-item>
						<el-descriptions-item label="行政区划："></el-descriptions-item>
						<el-descriptions-item label="采购人：">{{ state.projectForm.PurchaseManangerName }}</el-descriptions-item>
						<el-descriptions-item label="采购人地址：">{{ state.projectForm.Location }}</el-descriptions-item>
						<el-descriptions-item label="采购人联系方式：">{{ state.projectForm.PurchaseManangerMobile }}</el-descriptions-item>
						<el-descriptions-item label="项目联系人：">{{ state.projectForm.ProjectManagerName }}</el-descriptions-item>
						<el-descriptions-item label="供应商资格条件：">{{ state.projectForm.Qualification }}</el-descriptions-item>
						<el-descriptions-item label="标书发售方式："></el-descriptions-item>
						<el-descriptions-item label="项目包个数：">{{ state.projectForm.Qty }}</el-descriptions-item>
						<el-descriptions-item label="报名时间：">{{ state.projectForm.StartTime }}-{{ state.projectForm.EndTime }}</el-descriptions-item>
						<el-descriptions-item label="标书售价：">{{ state.projectForm.BidFee }}</el-descriptions-item>
						<el-descriptions-item label="投标时间：">{{ state.projectForm.BeginTime }}-{{ state.projectForm.FinishTime }}</el-descriptions-item>
					</el-descriptions>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="投标名单" v-if="!state.isShow" name="third" style="height: 400px">
				<el-table :data="state.projectCompanyTableData.data" v-loading="state.projectCompanyTableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" width="60" align="right" fixed />
					<el-table-column prop="No" label="供应商编号" width="200" align="right" show-overflow-tooltip/>
					<el-table-column prop="CompanyName" label="供应商名称" show-overflow-tooltip/>
					<el-table-column prop="SignUpTime" label="报到时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
					<el-table-column prop="ReviewTime" label="比选时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip/>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="比选文件" v-if="!state.isShow" name="fourth" style="height: 400px">
				<div v-for="(val, index) in state.filesList" :key="index">
					<a :href="val.url" target="_blank">点击下载</a>
				</div>
			</el-tab-pane>
		</el-tabs>
		<template #footer>
			<span class="dialog-footer">
				<el-button text bg type="info" @click="closeDialog">取消</el-button>
				<el-button type="primary" @click="closeDialog">关闭</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
import { ElMessageBox, ElMessage } from 'element-plus';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const state = reactive({
	isShowDialog: false,
	isShow: false,
	activeName: 'first',
	httpsText: import.meta.env.VITE_URL as any,
	title: t('message.action.see'),
	projectId: '',
	projectForm: {},
	projectNoticeList: [],
	filesList: [],
	projectCompanyTableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 10000,
		},
	},
	projectLineTableData:{
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 10000,
		},
	},
});

// 打开弹窗
const openDialog = (id: string, isShow: boolean) => {
	state.isShow = isShow;
	state.projectId = id;
	GetByIdRow();
	onGetProjectLineTableData();
	onGetProjectNoticeTableData();
	if (!isShow) {
		onGetProjectCompanyTableData();
	}
	state.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
	state.activeName = 'first'
};

//	获取投标供应商信息
const onGetProjectCompanyTableData = async () => {
	state.projectCompanyTableData.loading = true;
	try {
		state.projectCompanyTableData.param.projectId = state.projectId
		const res = await proxy.$api.erp.projectcompany.signUpList(state.projectCompanyTableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.projectCompanyTableData.data = res.data;
	} finally {
		state.projectCompanyTableData.loading = false
	}
};

// 获取项目信息
const GetByIdRow = async () => {
	try {
		const res = await proxy.$api.erp.projectbid.getById(state.projectId);
		if (res.errcode != 0) {
			return;
		}
		state.projectForm = res.data;
	} finally {
	}
};

//	获取标的物项目信息
const onGetProjectLineTableData = async () => {
	//	获取标的物项目信息
	state.projectLineTableData.loading = true;
	try {
		state.projectLineTableData.param.projectId = state.projectId
		const res = await proxy.$api.erp.projectline.getListByScope("bid", 0, 0, state.projectLineTableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.projectLineTableData.data = res.data;
		state.projectLineTableData.total = res.total;
	} finally {
		state.projectLineTableData.loading = false;
	}
};

// 获取比选公告
const onGetProjectNoticeTableData = async () => {
	try {
		const res = await proxy.$api.erp.projectnotice.getListByScope("bid", 0, 0, {pageIndex: 0, pageSize: 10000,});
		if (res.errcode != 0) {
			return;
		}
		state.projectNoticeList = res.data
	} finally {
	}
};

const onSubmit = async () => {
	console.log('是否报名');
	ElMessageBox.confirm(`确定要报名该项目吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectcompany.signup(state.signUp);
			if (res.errcode != 0) {
				return;
			}
			ElMessage.success('报名成功！');
		} finally {
			closeDialog();
		}
	});
};

const { dateFormat, dateFormatYMDHM } = commonFunction();

// 页面加载时
onMounted(() => {});

defineExpose({openDialog, closeDialog})

</script>
