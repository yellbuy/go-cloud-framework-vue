<template>
	<el-card>
		<div v-if="state.isShowIndex == 'info'">
			<el-row :gutter="15" style="margin-bottom: 20px;">
				<el-col :span="12">
					<el-button type="primary" style="float: left;" @click="onGetTableData()">刷新</el-button>
				</el-col>
				<el-col :span="12">
					<el-button style="float: right;" @click="closePage">
						<SvgIcon name="fa fa-rotate-left" class="mr3"/>返回
					</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="15">
				<el-col :span="8">
					<el-card shadow="hover">
						<template #header>
							<el-row>
								<el-col :span="24" style="font-size: 18px; font-weight:bold">
									导航信息
								</el-col>
							</el-row>
						</template>
						<el-timeline style="max-width: 600px">
							<el-timeline-item :timestamp="state.projectCompanyForm.ProjectBeginTime" placement="top" type="primary">
								<el-collapse>
									<el-collapse-item :icon="CaretRight">
										<template #title>
											<el-row>
												<el-col :span="24" style="font-size: 15px; font-weight:bold">
													报名开始
												</el-col>
											</el-row>
										</template>
									</el-collapse-item>
								</el-collapse>
							</el-timeline-item>
							<el-timeline-item :timestamp="state.projectCompanyForm.ProjectBeginTime" placement="top" type="primary">
								<el-collapse>
									<el-collapse-item :icon="CaretRight">
										<template #title>
											<el-row>
												<el-col :span="24" style="font-size: 15px; font-weight:bold">
													购买资料
												</el-col>
											</el-row>
										</template>
										<el-row>
											<el-col :span="18">	
												<el-link :href="state.baseUrl + state.projectCompanyForm.BidPics" v-if="state.projectCompanyForm.BidPayState == 1" target="_blank">{{ state.projectCompanyForm.BidPics }}</el-link>	
												<a v-else-if="state.projectCompanyForm.BidAuditState == 2 && state.projectCompanyForm.BidPayState == 0">审核未通过，请重新上传提交审核</a>
												<a v-else>待上传</a>
											</el-col>
											<el-col :span="6" class="text-right">
												<el-upload
													:action="state.uploadURL"
													:accept="'.jpg,.png,.jpeg,.ico,.bmp,.gif,.svg'"
													:headers="proxy.$getRequestHeaders()"
													:on-success="(file) => onSuccessFile(file)"
													:before-upload="onBeforeImageUpload"
													:limit="1"
													v-if="state.projectCompanyForm.BidPayState == 0 && state.projectCompanyForm.BidAuditState != 1">
													<template #default>
														<el-link type="primary" align="right">上传缴费凭证</el-link>
													</template>
												</el-upload>
												<a v-else-if="state.projectCompanyForm.BidAuditState == 0">等待审核</a>
												<a v-else>审核通过</a>
											</el-col>
										</el-row>
									</el-collapse-item>
								</el-collapse>
							</el-timeline-item>
							<el-timeline-item :timestamp="state.projectCompanyForm.ProjectBeginTime" placement="top" type="primary">
								<el-collapse>
									<el-collapse-item :icon="CaretRight">
										<template #title>
											<el-row>
												<el-col :span="24" style="font-size: 15px; font-weight:bold">
													下载标书
												</el-col>
											</el-row>
										</template>
										<el-row>
											<el-col :span="24">
												<el-descriptions border v-if="state.projectCompanyForm.BidPayState == 1 && state.projectForm.Files != ''">
													<el-descriptions-item label-align="left" width="85%" align="right" label="《标书文件》">
														<el-link type="primary" @click="onDownloadFile('标书文件', state.projectForm.Files)">下载</el-link>
													</el-descriptions-item>
												</el-descriptions>
											</el-col>
										</el-row>
									</el-collapse-item>
								</el-collapse>
							</el-timeline-item>
							<el-timeline-item :timestamp="state.projectCompanyForm.ProjectBeginTime" placement="top" type="primary">
								<el-collapse>
									<el-collapse-item :icon="CaretRight">
										<template #title>
											<el-row>
												<el-col :span="24" style="font-size: 15px; font-weight:bold">
													支付投标保证金
												</el-col>
											</el-row>
										</template>
										<el-row v-if="state.projectCompanyForm.BidAuditState == 1">
											<el-col :span="18">	
												<el-link :href="state.baseUrl + state.projectCompanyForm.EnsurePics" v-if="state.projectCompanyForm.EnsurePayState == 1" target="_blank">{{ state.projectCompanyForm.EnsurePics }}</el-link>	
												<a v-else-if="state.projectCompanyForm.EnsureAuditState == 2 && state.projectCompanyForm.EnsurePayState == 0">审核未通过，请重新上传提交审核</a>
												<a v-else>待上传</a>
											</el-col>
											<el-col :span="6" class="text-right">
												<el-upload
													:action="state.uploadURL"
													:accept="'.jpg,.png,.jpeg,.ico,.bmp,.gif,.svg'"
													:headers="proxy.$getRequestHeaders()"
													:on-success="(file) => onSuccessFile(file)"
													:before-upload="onBeforeImageUpload"
													:limit="1"
													v-if="state.projectCompanyForm.EnsurePayState == 0 && state.projectCompanyForm.EnsureAuditState != 1">
													<template #default>
														<el-link type="primary" align="right">上传缴费凭证</el-link>
													</template>
												</el-upload>
												<a v-else-if="state.projectCompanyForm.EnsureAuditState == 0">等待审核</a>
												<a v-else>审核通过</a>
											</el-col>
										</el-row>
									</el-collapse-item>
								</el-collapse>
							</el-timeline-item>
							<el-timeline-item :timestamp="state.projectCompanyForm.BidOpenTime" placement="top" type="primary" >
								<el-collapse>
									<el-collapse-item :icon="CaretRight">
										<template #title>
											<el-row>
												<el-col :span="24" style="font-size: 15px; font-weight:bold">
													提交资料
												</el-col>
											</el-row>
										</template>
										<el-row>
											<el-col :span="16">
												<div v-if="state.projectCompanyForm.Step=='qualifications'">
													<p><b>请提交投标材料</b></p>
												</div>
												<div v-else-if="state.projectCompanyForm.Step=='quotation'">
													<p><b>已完成投标，只可查看提交的投标材料信息</b></p>
												</div>
												<div v-else>
													<p><b>资料缴费凭证及保证金缴费凭证都审核通过，既可参与投标</b></p>
												</div>
											</el-col>
											<el-col :span="8">

												<el-button type="primary" @click="onBeginBid()" style="float: right;" v-if="state.projectCompanyForm.Step=='qualifications'">
													<SvgIcon name="fa fa-cloud-download" class="mr3"/>参与投标
												</el-button>
												<el-button type="primary" @click="onBeginBid()" style="float: right;" v-else-if="state.projectCompanyForm.Step=='quotation'">
													<SvgIcon name="fa fa-cloud-download" class="mr3"/>查看投标
												</el-button>
												<el-button type="info" style="float: right;" v-else>
													<SvgIcon name="fa fa-cloud-download" class="mr3"/>参与投标
												</el-button>
											</el-col>
										</el-row>
									</el-collapse-item>
								</el-collapse>
							</el-timeline-item>
							<el-timeline-item :timestamp="state.projectCompanyForm.ProjectFinishTime" placement="top" type="primary">
								<el-collapse>
									<el-collapse-item :icon="CaretRight">
										<template #title>
											<el-row>
												<el-col :span="24" style="font-size: 15px; font-weight:bold">
													投标截止
												</el-col>
											</el-row>
										</template>
										<el-row>
											<el-col :span="24">
											</el-col>
										</el-row>
									</el-collapse-item>
								</el-collapse>
							</el-timeline-item>
							<el-timeline-item :timestamp="state.projectCompanyForm.ProjectFinishTime" placement="top" type="primary">
								<el-collapse>
									<el-collapse-item :icon="CaretRight">
										<template #title>
											<el-row>
												<el-col :span="24" style="font-size: 15px; font-weight:bold">
													开标结束
												</el-col>
											</el-row>
										</template>
										<el-row>
											<el-col :span="24">
												<p class="font14 mb10" style="text-align: center;"><b>成交通知</b></p>
												<p>您好：我公司的[汉风生产管控系统建设] （YJ2023122102538），经评审，现确定由贵公司供应（承揽）。请收到本通知后10个工作日内,到采购单位签订合同，否则，将视为放弃供应（承揽）权利，并扣除投标/议价/竞价保证金。请到采购组织方领取纸质版成交通知书，或联系组织方领取扫描版成交通知书（电子邮件方式）。</p>
												<p class="text-right">特此通知。</p>
												<p class="mt10" v-if="state.projectForm.Files && state.projectForm.Files != ''"><el-link type="primary" @click="onDownloadFile('《标书文件》', state.projectForm.Files)">中标通知书下载</el-link></p>
											</el-col>
										</el-row>
									</el-collapse-item>
								</el-collapse>
							</el-timeline-item>
						</el-timeline>
					</el-card>
				</el-col>
				<el-col :span="16">
					<el-card shadow="hover" style="margin-bottom: 15px;">
						<template #header>
							<div>
								<el-row>
									<el-col :span="24" style="font-size: 18px; font-weight:bold">
										项目基本信息
									</el-col>
								</el-row>
							</div>
						</template>
						<el-descriptions size="large" :column="2" border>
							<el-descriptions-item label="项目编号" label-align="right" align="left" min-width="130px">
								{{ state.projectCompanyForm.No }}
							</el-descriptions-item>
							<el-descriptions-item label="项目名称" label-align="right" align="left" min-width="130px">
								{{ state.projectCompanyForm.Name }}
							</el-descriptions-item>
							<el-descriptions-item label="执行策略" label-align="right" align="left">
								未对接数据
							</el-descriptions-item>
							<el-descriptions-item label="报价要求" label-align="right" align="left">
								<el-tag size="small">未对接数据</el-tag>
							</el-descriptions-item>
							<el-descriptions-item label="售标截止时间" label-align="right" align="left">
								{{ state.projectCompanyForm.SaleEndTime }}
							</el-descriptions-item>
							<el-descriptions-item label="投标截止时间" label-align="right" align="left">
								{{ state.projectCompanyForm.ProjectFinishTime }}
							</el-descriptions-item>
							<el-descriptions-item label="开标时间" label-align="right" align="left">
								{{ state.projectCompanyForm.BidOpenTime }}
							</el-descriptions-item>
							<el-descriptions-item label="评标办法" label-align="right" align="left">
								{{ state.projectCompanyForm.ReviewDesc }}
							</el-descriptions-item>
							<el-descriptions-item label="项目负责人" label-align="right" align="left">
								{{ state.projectCompanyForm.ProjectManagerName }}
							</el-descriptions-item>
							<el-descriptions-item label="采购负责人" label-align="right" align="left">
								{{ state.projectCompanyForm.PurchaseManangerName }}
							</el-descriptions-item>
							<el-descriptions-item label="供应商报价模式" label-align="right" align="left" :span="2">
								{{ state.projectCompanyForm.QuotationMode }}
							</el-descriptions-item>
							<el-descriptions-item label="投标资格要求" label-align="right" align="left" :span="1">
								<el-tooltip
									class="box-item"
									effect="dark"
									content="1、具有承揽本项目相关经营资格； 2、具有良好的企业信誉和履约能力。"
									placement="top-start">
									<el-text truncated line-clamp="1" size="default" style="width:90%">{{ state.projectCompanyForm.Qualification }}</el-text>
								</el-tooltip>
							</el-descriptions-item>
						</el-descriptions>
					</el-card>
					<el-card shadow="hover">
						<template #header>
							<div>
								<el-row>
									<el-col :span="3" style="font-size: 18px; font-weight:bold">
										标的列表
									</el-col>
									<el-col :span="6">
										显示更多信息
										<el-switch v-model="state.isShowMore" inline-prompt active-text="是" inactive-text="否"/>
									</el-col>
									<el-col :span="15" class="text-right">
										<el-button type="primary">
											<SvgIcon name="fa fa-cloud-download" class="mr3"/>导出标的物
										</el-button>
									</el-col>
								</el-row>
							</div>
						</template>
						<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="70" show-overflow-tooltip fixed />
							<el-table-column prop="No" label="物资编码"  width="120" show-overflow-tooltip fixed/>
							<el-table-column prop="Name" label="名称" width="120" show-overflow-tooltip/>
							<el-table-column v-if="state.isShowMore" prop="Content" label="明细项" width="70"/>
							<el-table-column v-if="state.isShowMore" prop="Unit" label="明细项单位" width="90"/>
							<el-table-column v-if="state.isShowMore" prop="Material" label="材质/系列" width="130" show-overflow-tooltip/>
							<el-table-column v-if="state.isShowMore" prop="Spec" label="规格/型号" width="130" show-overflow-tooltip/>
							<el-table-column v-if="state.isShowMore" prop="Standard" label="执行标准" width="90"/>
							<el-table-column v-if="state.isShowMore" prop="Param" label="技术参数" width="90"/>
							<el-table-column v-if="state.isShowMore" prop="Unit" label="计量单位" width="90"/>
							<el-table-column prop="Qty" label="采购数量" width="90"/>
							<el-table-column v-if="state.isShowMore" prop="SupplyLocation" label="收货/服务/施工地点" width="150"/>
							<el-table-column v-if="state.isShowMore" prop="Color" label="颜色" width="90"/>
							<el-table-column v-if="state.isShowMore" prop="Size" label="尺码" width="90"/>
							<el-table-column prop="BeginTime" label="执行开始时间" width="120"/>
							<el-table-column prop="FinishTime" label="执行截止时间" width="120"/>
							<el-table-column prop="Remark" label="采购备注" width="90"/>
						</el-table>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<projectBiddingEdit ref="projectBiddingEditRef" v-if="state.isShowIndex == 'bidding'"/>
	</el-card>
</template>

<script setup lang="ts">
import { CaretRight } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import projectBiddingEdit from './projectBiddingEdit.vue';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';

const route = useRoute();
const kind = route.params.kind||'bid';
const { proxy } = getCurrentInstance() as any;
const store = useStore();
const token = Session.get('token');
const projectBiddingEditRef = ref();

const state = reactive({
	isShowIndex: 'info',
	isShowMore: false,
	isExpanded: true,
	baseUrl: import.meta.env.VITE_URL as any,
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	projectId: "",
	projectCompanyId: "",
	projectForm: {},
	projectCompanyForm: {},
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
});

//	获取用户信息 vuex
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//	打开页面
const openPage = async (data: object) => {
	state.projectId = data.ProjectId
	state.projectCompanyId = data.Id
	onGetTableData();
};

//	关闭页面
const closePage = async () => {
	nextTick(() => {
		proxy.$parent.isShowPage = 'list';
		proxy.$parent.onGetTableData();
	});
};

//	参与投标
const onBeginBid = ()=>{
	state.isShowIndex = 'bidding'
	let data = {
		projectId: state.projectId,
		projectCompanyId: state.projectCompanyId
	}
	nextTick(() => {
		projectBiddingEditRef.value.openPage(data)
	});
};

//	获取标的物项目信息
const onGetTableData = async () => {
	//	获取项目信息
	const res = await proxy.$api.erp.projectBid.getById(state.projectId);
	if (res.errcode != 0) {
		return;
	}
	state.projectForm = res.data
	//	获取公司已报名详细信息
	onGetprojectCompanyData()
	//	获取标的物项目信息
	state.tableData.loading = true;
	try {
		state.tableData.param.projectId = state.projectId
		const res = await proxy.$api.erp.projectline.getListByScope("bid", 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.tableData.data = res.data;
		state.tableData.total = res.total;
	} finally {
		state.tableData.loading = false;
	}
};

//	获取公司已报名详细信息
const onGetprojectCompanyData = async () => {
	try {
		const res = await proxy.$api.erp.projectcompany.getById(state.projectCompanyId);
		if (res.errcode != 0) {
			return;
		}
		state.projectCompanyForm = res.data;
	} finally {
	}
};

//	上传投标凭证
const onSuccessFile = (file: UploadFile) => {
	state.projectCompanyForm.FileKind = state.projectCompanyForm.Step
	state.projectCompanyForm.PicsPath  = file.data.src
	onProjectCompanyVoucherUpload();
};

// 上传投标凭证
const onProjectCompanyVoucherUpload = async () => {
	try {
		state.projectCompanyForm.Id = state.projectCompanyId
		const res = await proxy.$api.erp.projectcompany.voucherUpload(state.projectCompanyId, state.projectCompanyForm)
		if (res.errcode != 0) {
			onGetprojectCompanyData();
			return;
		}
		onGetprojectCompanyData();
	} finally {
	}
};

const onBeforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
	if (
		rawFile.type !== 'image/jpeg' &&
		rawFile.type !== 'image/jpg' &&
		rawFile.type !== 'image/png' &&
		rawFile.type !== 'image/ico' &&
		rawFile.type !== 'image/bmp' &&
		rawFile.type !== 'image/gif' &&
		rawFile.type !== 'image/svg'
	) {
		ElMessage.error('图片格式错误，支持的图片格式：jpg，png，gif，bmp，ico，svg');
		return false;
	} else if (rawFile.size / 1024 / 1024 > 10) {
		ElMessage.error('图片大小不能超过10MB!');
		return false;
	}
	return true;
};

//	下载文件
const onDownloadFile = async (fileName: string, path: string) => {
	var a = document.createElement('a');
	a.href = import.meta.env.VITE_URL + path;
	a.download = fileName; // 下载后的文件名称
	a.target = '_blank';
	a.click();
};

//	页面加载时
onMounted(() => {
});

defineExpose({openPage, closePage, onGetprojectCompanyData, onGetTableData, ...toRefs(state)})
</script>

<style scoped lang="scss">

</style>
