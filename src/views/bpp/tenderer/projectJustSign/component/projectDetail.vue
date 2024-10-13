<template>
	<el-card v-if="state.isShowPage">
		<div v-if="state.tabIndex==0">
			<el-row :gutter="15" class="mb15">
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="home-warning-media">
					<el-timeline style="max-width: 600px">
						<el-timeline-item :timestamp = state.projectCompanyData.data.ProjectBeginTime placement="top" type="primary">
							<p class="font14" style="margin-bottom: 10px;"><b>投标开始</b></p>
							<el-card>
								<el-row class="mt10">
									<el-col :span="24">
										<el-descriptions title="售标截止">
											<el-descriptions-item label="">{{state.projectCompanyData.data.SaleEndTime}}</el-descriptions-item>
										</el-descriptions>
									</el-col>
								</el-row>
								<el-row class="mt10">
									<el-divider border-style="dashed" />
									<el-col :span="24">
										<p class="font14" style="margin-bottom: 10px;"><b>购买资料</b></p>
									</el-col>
									<el-col :span="12">	
										<el-link :href="state.baseUrl + state.projectCompanyData.data.BidPics" v-if="state.projectCompanyData.data.BidPayState == 1" target="_blank">{{ state.projectCompanyData.data.BidPics }}</el-link>	
										<a v-else-if="state.projectCompanyData.data.BidAuditState == 2 && state.projectCompanyData.data.BidPayState == 0">审核未通过，请重新上传提交审核</a>
										<a v-else>待上传</a>
									</el-col>
									<el-col :span="12" class="text-right">
										<el-upload
											:action="state.uploadURL"
											:accept="'.jpg,.png,.jpeg,.ico,.bmp,.gif,.svg'"
											:headers="{ Appid: getUserInfos.appid, Authorization: token }"
											:on-success="(file) => onSuccessFile(file, 'bid')"
											:before-upload="onBeforeImageUpload"
											:limit="1"
											v-if="state.projectCompanyData.data.BidPayState == 0 && state.projectCompanyData.data.BidAuditState != 1">
											<template #default>
												<el-link type="primary" align="right">上传缴费凭证</el-link>
											</template>
										</el-upload>
										<a v-else-if="state.projectCompanyData.data.BidAuditState == 0">等待审核</a>
										<a v-else>审核通过</a>
									</el-col>
								</el-row>
								<el-row class="mt10">
									<el-divider border-style="dashed" />
									<el-col :span="24">
										<el-descriptions title="下载标书" border v-if="state.projectCompanyData.data.BidPayState == 1">
											<el-descriptions-item label-align="left" width="50%" align="right" label="《标书文件》">
												<el-link type="primary" @click="onDownloadFile('标书文件', '/static/upload/31/image/20240821/298509223602421761.jpg')">下载</el-link>
											</el-descriptions-item>
										</el-descriptions>
									</el-col>
								</el-row>
								<el-row class="mt10" v-if="state.projectCompanyData.data.BidAuditState == 1">
									<el-divider border-style="dashed" />
									<el-col :span="24">
										<p class="font14" style="margin-bottom: 10px;"><b>支付投标保证金</b></p>
									</el-col>
									<el-col :span="12">	
										<el-link :href="state.baseUrl + state.projectCompanyData.data.EnsurePics" v-if="state.projectCompanyData.data.EnsurePayState == 1" target="_blank">{{ state.projectCompanyData.data.EnsurePics }}</el-link>	
										<a v-else-if="state.projectCompanyData.data.EnsureAuditState == 2 && state.projectCompanyData.data.EnsurePayState == 0">审核未通过，请重新上传提交审核</a>
										<a v-else>待上传</a>
									</el-col>
									<el-col :span="12" class="text-right">
										<el-upload
											:action="state.uploadURL"
											:accept="'.jpg,.png,.jpeg,.ico,.bmp,.gif,.svg'"
											:headers="{ Appid: getUserInfos.appid, Authorization: token }"
											:on-success="(file) => onSuccessFile(file, 'ensure')"
											:before-upload="onBeforeImageUpload"
											:limit="1"
											v-if="state.projectCompanyData.data.EnsurePayState == 0 && state.projectCompanyData.data.EnsureAuditState != 1">
											<template #default>
												<el-link type="primary" align="right">上传缴费凭证</el-link>
											</template>
										</el-upload>
										<a v-else-if="state.projectCompanyData.data.EnsureAuditState == 0">等待审核</a>
										<a v-else>审核通过</a>
									</el-col>
								</el-row>
							</el-card>
						</el-timeline-item>
						<el-timeline-item :timestamp = state.projectCompanyData.data.ProjectFinishTime placement="top" type="primary">
							<p class="font14"><b>投标截止</b></p>
						</el-timeline-item>
						<el-timeline-item :timestamp = state.projectCompanyData.data.BidOpenTime placement="top" type="primary" >
							<p class="font14"><b>开始开标</b></p>
							<el-divider border-style="dashed" />
							<div v-if="state.projectCompanyData.data.BidAuditState==1 && state.projectCompanyData.data.EnsureAuditState==1">
								<el-button type="primary" @click="onBeginBid" style="float: right;">
									<SvgIcon name="fa fa-cloud-download" class="mr3"/>参与投标
								</el-button>
							</div>
							<div v-else>
								<p style="font-size: 14px;"><b>资料缴费凭证及保证金缴费凭证都审核通过，既可参与投标</b></p>
								<el-button type="info" style="float: right;">
									<SvgIcon name="fa fa-cloud-download" class="mr3"/>参与投标
								</el-button>
							</div>
							<el-divider border-style="dashed" />
						</el-timeline-item>
						<el-timeline-item :timestamp = state.projectCompanyData.data.ProjectFinishTime placement="top" type="primary">
							<p class="font14" style="margin-bottom: 10px;"><b>开标结束</b></p>
							<el-card>
								<p class="font14 mb10"><b>成交通知</b></p>
								<p>您好：我公司的[汉风生产管控系统建设] （YJ2023122102538），经评审，现确定由贵公司供应（承揽）。请收到本通知后10个工作日内,到采购单位签订合同，否则，将视为放弃供应（承揽）权利，并扣除投标/议价/竞价保证金。请到采购组织方领取纸质版成交通知书，或联系组织方领取扫描版成交通知书（电子邮件方式）。</p>
								<p class="text-right">特此通知。</p>
								<p class="mt10" v-if="state.projectForm.Files && state.projectForm.Files != ''"><el-link type="primary" @click="onDownloadFile('标书文件', state.projectForm.Files)">中标通知书下载</el-link></p>
							</el-card>
						</el-timeline-item>
					</el-timeline>
				</el-col>
				<el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="16" class="home-dynamic-media">
					<el-descriptions title="项目基本信息" size="large" :column="2" border>
						<el-descriptions-item label="项目编号" label-align="right" align="left" min-width="130px">
							{{ state.projectCompanyData.data.No }}
						</el-descriptions-item>
						<el-descriptions-item label="项目名称" label-align="right" align="left" min-width="130px">
							{{ state.projectCompanyData.data.Name }}
						</el-descriptions-item>
						<el-descriptions-item label="执行策略" label-align="right" align="left">
							未对接数据
						</el-descriptions-item>
						<el-descriptions-item label="报价要求" label-align="right" align="left">
							<el-tag size="small">未对接数据</el-tag>
						</el-descriptions-item>
						<el-descriptions-item label="售标截止时间" label-align="right" align="left">
							{{ state.projectCompanyData.data.SaleEndTime }}
						</el-descriptions-item>
						<el-descriptions-item label="投标截止时间" label-align="right" align="left">
							{{ state.projectCompanyData.data.ProjectFinishTime }}
						</el-descriptions-item>
						<el-descriptions-item label="开标时间" label-align="right" align="left">
							{{ state.projectCompanyData.data.BidOpenTime }}
						</el-descriptions-item>
						<el-descriptions-item label="评标办法" label-align="right" align="left">
							{{ state.projectCompanyData.data.ReviewDesc }}
						</el-descriptions-item>
						<el-descriptions-item label="项目负责人" label-align="right" align="left">
							{{ state.projectCompanyData.data.ProjectManagerName }}
						</el-descriptions-item>
						<el-descriptions-item label="采购负责人" label-align="right" align="left">
							{{ state.projectCompanyData.data.PurchaseManangerName }}
						</el-descriptions-item>
						<el-descriptions-item label="供应商报价模式" label-align="right" align="left" :span="2">
							{{ state.projectCompanyData.data.QuotationMode }}
						</el-descriptions-item>
						<el-descriptions-item label="投标资格要求" label-align="right" align="left" :span="1">
							<el-tooltip
								class="box-item"
								effect="dark"
								content="1、具有承揽本项目相关经营资格； 2、具有良好的企业信誉和履约能力。"
								placement="top-start">
								<el-text truncated line-clamp="1" size="default" style="width:90%">{{ state.projectCompanyData.data.Qualification }}</el-text>
							</el-tooltip>
						</el-descriptions-item>
					</el-descriptions>
					<el-divider border-style="dashed" />
					<el-descriptions title="标的列表" size="large">
					</el-descriptions>
					<el-card shadow="hover" header="标的列表">
						<template #header>
							<div class="card-header">
								<el-row>
									<el-col :span="3">
										显示更多信息
									</el-col>
									<el-col :span="9">
										<el-switch
											v-model="state.isShowMore"
											inline-prompt
											active-text="是"
											inactive-text="否"/>
									</el-col>
									<el-col :span="12" class="text-right">
										<el-button type="primary">
											<SvgIcon name="fa fa-cloud-download" class="mr3"/>导出标的物
										</el-button>
									</el-col>
								</el-row>
							</div>
							</template>
						<el-table :data="state.bidTableData.data" v-loading="state.bidTableData.loading" style="width: 100%" stripe highlight-current-row>
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
			<el-divider border-style="dashed" />
			<el-row>
				<el-col :span="24" class="text-center">
					<el-button @click="onGoToList(0)" class="mt20" size="large">
						<SvgIcon name="fa fa-rotate-left" class="mr3"/>返回
					</el-button>
				</el-col>
			</el-row>
		</div>
		<div v-else-if="state.tabIndex==1">
			<div class="text-center">
				<el-steps style="max-width: 720px;margin-left: auto;margin-right:auto;" :active="state.stepIndex" finish-status="finish" align-center>
					<el-step title="上传商务文件" />
					<el-step title="上传技术文件" />
					<el-step title="上传其他文件" />
					<el-step title="填写开标一览表" />
					<el-step title="完成投标" />
				</el-steps>
			</div>
			<el-divider border-style="dashed" />			
			<el-row>
				<el-col :span="24" >
					<div v-if="state.stepIndex==0">
						<el-table :data="state.ProjectCompanyLineTableData.data" v-loading="state.ProjectCompanyLineTableData.loading" style="width: 600px;margin-left:auto;margin-right: auto;" stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="70" />
							<el-table-column prop="Name" label="商务文件" width="350">
								<template #default="scope" v-if="state.projectCompanyData.data.State == 0">
									<el-input v-model="scope.row.Name" placeholder="请输入"/> 
								</template>
							</el-table-column>
							<el-table-column :label="$t('message.action.operate')" :width="180" align="left">
								<template #header v-if="state.projectCompanyData.data.State == 0">
									<el-upload
										:action="state.uploadURL"
										:accept="'.xls,.xlsx,.doc,.docx,.png,.jpg,.jpeg,.pdf'"
										:headers="{ Appid: getUserInfos.appid, Authorization: token }"
										:on-success="(file) => onSuccessFile(file, 'zgps')"
										:show-file-list="false">
										<template #default>
											<el-button type="primary" align="right">上传</el-button>
										</template>
									</el-upload>
								</template>
								<template #default="scope">
									<el-row>
										<el-col :span="8">
											<el-button text bg type="primary" @click="onDownloadFile('商务文件', scope.row.Files)">
												下载
											</el-button>
										</el-col>
										<el-col :span="8" v-if="state.projectCompanyData.data.State == 0">
											<el-button text bg type="danger" @click="onDelProjectCompanyLineTableData(scope.row.Id)">
												删除
											</el-button>
										</el-col>
									</el-row>
								</template>
							</el-table-column>
						</el-table>
						<p class="text-center">
							<el-text class="mx-1" type="info">支持的文件格式:xls|xlsx|doc|docx|png|jpeg|pdf</el-text>
						</p>						
					</div>
					<div v-else-if="state.stepIndex == 1">
						<el-table :data="state.ProjectCompanyLineTableData.data" v-loading="state.ProjectCompanyLineTableData.loading" style="width: 600px;margin-left:auto;margin-right: auto;" stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="70" />
							<el-table-column prop="Name" label="技术文件" width="350">
								<template #default="scope" v-if="state.projectCompanyData.data.State == 0">
									<el-input
										v-model="scope.row.Name"
										placeholder="请输入"/> 
								</template>
							</el-table-column>
							<el-table-column :label="$t('message.action.operate')" :width="180" align="left">
								<template #header v-if="state.projectCompanyData.data.State == 0">
									<el-upload
										:action="state.uploadURL"
										:accept="'.xls,.xlsx,.doc,.docx,.png,.jpg,.jpeg,.pdf'"
										:headers="{ Appid: getUserInfos.appid, Authorization: token }"
										:on-success="(file) => onSuccessFile(file, 'jsps')"
										:show-file-list="false">
										<template #default>
											<el-button type="primary" align="right">上传</el-button>
										</template>
									</el-upload>
								</template>
								<template #default="scope">
									<el-row>
										<el-col :span="8">
											<el-button text bg type="primary"  @click="onDownloadFile('技术文件', scope.row.Files)">
												下载
											</el-button>
										</el-col>
										<el-col :span="8" v-if="state.projectCompanyData.data.State == 0">
											<el-button text bg type="danger" @click="onDelProjectCompanyLineTableData(scope.row.Id)">
												删除
											</el-button>
										</el-col>
									</el-row>
								</template>
							</el-table-column>
						</el-table>
						<p class="text-center">
							<el-text class="mx-1" type="info">支持的文件格式:xls|xlsx|doc|docx|png|jpeg|pdf</el-text>
						</p>						
					</div>		
					<div v-else-if="state.stepIndex==2">
						<el-table :data="state.ProjectCompanyLineTableData.data" v-loading="state.ProjectCompanyLineTableData.loading" style="width: 600px;margin-left:auto;margin-right: auto;" stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="70" />
							<el-table-column prop="Name" label="其他文件" width="350">
								<template #default="scope" v-if="state.projectCompanyData.data.State == 0">
									<el-input
										v-model="scope.row.Name"
										placeholder="请输入"/> 
								</template>
							</el-table-column>
							<el-table-column :label="$t('message.action.operate')" :width="180" align="left">
								<template #header v-if="state.projectCompanyData.data.State == 0">
									<el-upload
										:action="state.uploadURL"
										:accept="'.xls,.xlsx,.doc,.docx,.png,.jpg,.jpeg,.pdf'"
										:headers="{ Appid: getUserInfos.appid, Authorization: token }"
										:on-success="(file) => onSuccessFile(file, 'qt')"
										:show-file-list="false">
										<template #default>
											<el-button type="primary" align="right">上传</el-button>
										</template>
									</el-upload>
								</template>
								<template #default="scope">
									<el-row>
										<el-col :span="8">
											<el-button text bg type="primary"  @click="onDownloadFile('其他文件', scope.row.Files)">
												下载
											</el-button>
										</el-col>
										<el-col :span="8" v-if="state.projectCompanyData.data.State == 0">
											<el-button text bg type="danger" @click="onDelProjectCompanyLineTableData(scope.row.Id, scope.row.Kind)">
												删除
											</el-button>
										</el-col>
									</el-row>
								</template>
							</el-table-column>
						</el-table>
						<p class="text-center">
							<el-text class="mx-1" type="info">支持的文件格式:xls|xlsx|doc|docx|png|jpeg|pdf</el-text>
						</p>					
					</div>	
					<div v-else-if="state.stepIndex==3">
						<el-table :data="state.ProjectCompanyLineTableData.data" v-loading="state.ProjectCompanyLineTableData.loading" show-summary style="width: 900px;margin-left:auto;margin-right: auto;" border stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="60" show-overflow-tooltip fixed />
							<el-table-column prop="No" label="物资编码"  width="100" show-overflow-tooltip fixed/>
							<el-table-column prop="Name" label="名称" show-overflow-tooltip/>
							<el-table-column prop="Content" label="明细项" width="150"/>
							<el-table-column prop="Unit" label="明细项单位" width="80"/>
							<el-table-column prop="Qty" label="采购数量" align="right" width="70"/>
							<el-table-column prop="Price" label="单价" align="right" width="80" >
								<template #default="scope" v-if="state.projectCompanyData.data.State == 0">
									<el-input-number v-model="scope.row.Price" :min="0" :max="1000000000000" style="width:90px" :step="10" :value-on-clear="0" :precision="2" :controls="false" controls-position="right" /> 
								</template>	
							</el-table-column>
							<el-table-column prop="Amount" label="总价" width="80" align="right"/>								
						</el-table>
						<el-row>
							<el-col :span="24" v-if="state.projectCompanyData.data.State == 0">
								<div style="width:900px;margin-left:auto;margin-right:auto;margin-top: 10px;" >
									<el-upload
										:action="state.uploadURL"
										:accept="'.xls,.xlsx,.doc,.docx,.png,.jpg,.jpeg,.pdf'"
										:headers="{ Appid: getUserInfos.appid, Authorization: token }"
										:on-success="(file) => onSuccessFile(file, 'jjps')"
										:limit="1"
										:show-file-list="false">
										<template #default>
											<el-button type="primary">上传附件</el-button>
										</template>
									</el-upload>
								</div>
							</el-col>
							<el-col :span="24" v-if="state.ProjectCompanyLineTableData.data.State == 0">
								<div style="width:900px;margin-left:auto;margin-right:auto;margin-top: 10px;">
									<el-text class="mx-1" type="info">支持的文件格式:xls|xlsx|doc|docx|png|jpeg|pdf</el-text>
								</div>	
							</el-col>
							<el-col :span="24" v-if="state.projectCompanyData.data.Files != ''">
								<el-descriptions border style="width:900px;margin-left:auto;margin-right:auto;margin-top: 10px;">
									<el-descriptions-item label-align="left" width="50%" align="right" label="《一览表附件》">
										<el-button text bg type="primary"  @click="onDownloadFile('其他文件', scope.row.Files)">
											下载
										</el-button>
										<el-button text bg type="danger" v-if="state.projectCompanyData.data.State == 0" @click="onDelProjectCompanyTableData()">
											删除
										</el-button>
									</el-descriptions-item>
								</el-descriptions>
							</el-col>
						</el-row>		
					</div>	
					<div v-else-if="state.stepIndex==4">
						<div class="text-center" v-if="state.projectCompanyData.data.State == 0">
							<div>
								<SvgIcon name="fa fa-check-circle" color="green" :size="60" ></SvgIcon>
							</div>
							<div class="mt30 mb30" >
								<el-text type="info" size="default">投标文件已上传成功，确认无误后请点击确认提交，开标后数据将无法修改</el-text>	
							</div>
						</div>
						<div class="text-center" v-else>
							<div>
								<SvgIcon name="fa fa-check-circle" color="green" :size="60" ></SvgIcon>
							</div>
							<div class="mt30 mb30" >
								<el-text type="info" size="default">当前已开标，数据只可查看，无法修改！</el-text>	
							</div>
						</div>
					</div>					
				</el-col>
			</el-row>
			<el-divider border-style="dashed" />
			<el-row>
				<el-col :span="24" class="text-center mt20">
					<el-button @click="onGoToList(1)"  size="large">
						<SvgIcon name="fa fa-rotate-left" class="mr3"/>返回
					</el-button>
					<el-button @click="onGoToPrevious" v-if="state.stepIndex>0" type="primary" size="large">
						<SvgIcon name="fa fa-arrow-left" class="mr3"/>上一步
					</el-button>
					<el-button @click="onGoToNext" type="primary" v-if="state.stepIndex<4" size="large">
						<SvgIcon name="fa fa-arrow-right" class="mr3"/>下一步
					</el-button>
					<el-button @click="submit" type="primary" v-if="state.stepIndex == 4 && state.projectCompanyData.data.State == 0" size="large">
						<SvgIcon name="fa fa-rotate-right" class="mr3"/>确认提交
					</el-button>
				</el-col>
			</el-row>
		</div>
	</el-card>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onActivated, onMounted, reactive, toRefs, watch } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import { formatAxis } from '/@/utils/formatTime';
import { Session } from '/@/utils/storage';
import { stat } from 'fs';
import project from '/@/api/erp/project';

const moduleKey = 'api_sys_home_alias';
const route = useRoute();
const kind = route.params.kind||'bid';
const router = useRouter();
console.debug('router：', router.currentRoute.value);
//console.debug("route:",$route)
const { proxy } = getCurrentInstance() as any;
const store = useStore();
const state = reactive({
	moduleKey: moduleKey,
	isShowMore:false,
	tenant: {},
	isShowPage: false,
	tabIndex:0,
	stepIndex:0,
	baseUrl: import.meta.env.VITE_URL as any,
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	dialogImageUrl: "",
	ImageVisible: false,
	dialogVisible: false,
	myCharts: [],
	projectId: store.state.project.projectId,
	projectCompanyId: store.state.project.projectCompanyId,
	projectForm: {},
	projectCompanyData: {
		data: {},
		from: {},
	},
	bidTableData: {
		data: [],
		fileList: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	ProjectCompanyLineTableData:{
		data: [],
		list: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
});

state.bidTableData.param.pageIndex = computed(() => {
	return state.bidTableData.param.current - 1;
});

state.ProjectCompanyLineTableData.param.pageIndex = computed(() => {
	return state.ProjectCompanyLineTableData.param.current - 1;
});

const token = Session.get('token');

// 跳转页面
const openPage = async () => {
	onGetprojectData()
	onGetprojectCompanyData();
	onGetBidTableData();
	state.isShowPage = true;
};

const onGotoEdit = () => {
	router.push(`/bpp/home/tenantEdit/bpp`);
};

// 获取用户信息 vuex
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});

// 当前时间提示语
const currentTime = computed(() => {
	return formatAxis(new Date());
});

//	获取项目信息
const onGetprojectData = async () => {
	try {
		const res = await proxy.$api.erp.project.getById(state.projectId);
		if (res.errcode != 0) {
			return;
		}
		state.projectForm = res.data
	} finally {
	}
};

// 获取公司已报名详细信息
const onGetprojectCompanyData = async () => {
	try {
		const res = await proxy.$api.erp.projectcompany.projectcompany(kind, store.state.project.projectCompanyId);
		if (res.errcode != 0) {
			return;
		}
		state.projectCompanyData.data = res.data[0];
	} finally {
	}
};

// 获取投标方项目信息
const onGetBidTableData = async () => {
	state.bidTableData.loading = true;
	try {
		const res = await proxy.$api.erp.projectline.getListByScope(state.bidTableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.bidTableData.data = res.data;
		state.bidTableData.total = res.total;
	} finally {
		state.bidTableData.loading = false;
	}
};

// 获取已报名信息详细信息文件表
const onGetProjectCompanyLineTableData = async (select: string) => {
	try {
		state.ProjectCompanyLineTableData.param.kind = select
		if (select == "jjps") {
			state.ProjectCompanyLineTableData.param.projectLineId =  '298664702576164898'
		}else{
			state.ProjectCompanyLineTableData.param.projectLineId =  ''
		}
		const res = await proxy.$api.erp.projectcompanyline.getListByScope(state.ProjectCompanyLineTableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.ProjectCompanyLineTableData.data = res.data;
	} finally {
	}
};

// 更新公司报名信息上传的文件及状态
const onUpdateProjectCompanyFileData = async (select: string) => {
	try {
		state.projectCompanyData.from.Id = state.projectCompanyData.data.Id
		state.projectCompanyData.from.FileKind = select
		if (select == "bid") {
			state.projectCompanyData.from.PicsPath = state.projectCompanyData.data.BidPics
		}else if (select == "ensure"){
			state.projectCompanyData.from.PicsPath = state.projectCompanyData.data.EnsurePics
		}else if (select == "jjps"){
			state.projectCompanyData.from.FilePath = state.projectCompanyData.data.Files
		}
		const res = await proxy.$api.erp.projectcompany.fileUpdate(state.projectCompanyData.data.Id, state.projectCompanyData.from)
		if (res.errcode != 0) {
			onGetprojectCompanyData();
			return;
		}
		onGetprojectCompanyData();
	} finally {
	}
};

// 批量更新公司报名信息文件表上传的文件
const onMultiUpdateProjectCompanyLineTableData = async (select: string) => {
	try {
		let model = {}
		state.ProjectCompanyLineTableData.list = []
		state.ProjectCompanyLineTableData.param.kind = select
		for (let i = 0; i < state.ProjectCompanyLineTableData.data.length; i++) {
			model = {}
			model.Id = state.ProjectCompanyLineTableData.data[i].Id
			model.Kind = state.ProjectCompanyLineTableData.data[i].Kind
			model.Name = state.ProjectCompanyLineTableData.data[i].Name
			model.Files = state.ProjectCompanyLineTableData.data[i].Files
			model.ProjectId = state.ProjectCompanyLineTableData.data[i].ProjectId
			model.ProjectCompanyId = state.ProjectCompanyLineTableData.data[i].ProjectCompanyId
			state.ProjectCompanyLineTableData.list.push(model)
		}
		const jsres = await proxy.$api.erp.projectcompanyline.saveMulti(select, state.ProjectCompanyLineTableData.list)
		if (jsres.errcode != 0) {
			return;
		}
	} finally {
	}
};

//	删除公司报名信息文件表数据
const onDelProjectCompanyLineTableData = async (id: Number, select : number) => {
	if (!id) {
		ElMessage.error('当前没有可删除的文件，请刷新后重试。');
		return;
	}
	ElMessageBox.confirm(`确定删除文件吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectcompanyline.delete(id)
			if (res.errcode != 0) {
				return;
			}
			state.ProjectCompanyLineTableData.data = []
			onGetProjectCompanyLineTableData(select)
			ElMessage('删除成功')
		} finally {
		}
		return false;
	});
};

//	删除公司报名信息表数据
const onDelProjectCompanyTableData = async () => {
	ElMessageBox.confirm(`确定删除附件吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			state.projectCompanyData.data.Files = ""
			onUpdateProjectCompanyFileData("jjps")
			ElMessage('删除成功')
		} finally {
		}
		return false;
	});
};

//参与投标
const onBeginBid = ()=>{
	state.tabIndex=1
	state.stepIndex = 0
	onGetprojectCompanyData()
	onGetProjectCompanyLineTableData("zgps")
}

//后一步
const onGoToNext=()=>{
	let stepIndex=state.stepIndex+1
	if(stepIndex>4){
		stepIndex=4
	}
	switch(stepIndex){
		case 1:
			if (state.ProjectCompanyLineTableData.data.length > 0){
				onMultiUpdateProjectCompanyLineTableData("zgps")
			}
			onGetProjectCompanyLineTableData("jsps")
			break;

		case 2:
			if (state.ProjectCompanyLineTableData.data.length > 0){
				onMultiUpdateProjectCompanyLineTableData("jsps")
			}
			onGetProjectCompanyLineTableData("qt")
			break;

		case 3:
			if (state.ProjectCompanyLineTableData.data.length > 0){
				onMultiUpdateProjectCompanyLineTableData("qt")
			}
			onGetProjectCompanyLineTableData("jjps")
			break;
		case 4:	
			break;
	}
	state.stepIndex = stepIndex
}

//前一步
const onGoToPrevious=()=>{
	let stepIndex=state.stepIndex-1
	if(stepIndex<0){
		stepIndex=0
	}
	switch(stepIndex){
		case 0:
			onGetProjectCompanyLineTableData("zgps")
			break;
		case 1:
			onGetProjectCompanyLineTableData("jsps")
			break;
		case 2:
			onGetProjectCompanyLineTableData("qt")
			break;
		case 3:
			onGetProjectCompanyLineTableData("jjps")
			state.projectCompanyData.from.Files = state.projectCompanyData.data.Files
			break;
	}
	state.stepIndex=stepIndex
}

//返回
const onGoToList=(select : number)=>{
	switch (select){
		case 0:
			state.isShowPage = false
			proxy.$parent.onGetTableData();
			proxy.$parent.isShowPage = true;
			break;
		case 1:
			state.tabIndex = 0
			state.stepIndex = 0
			break;
	}
};

//	确认提交并更新公司报名项目状态
const submit = () => {
	ElMessageBox.confirm(`确认已检查文件上传无误，立刻提交吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			onUpdateProjectCompanyFileData("submit");
			onGoToList(1)
			ElMessage('提交成功')
		} finally {
		}
		return false;
	});
};

//	更新公司报名信息文件表上传的文件
const onSuccessFile = (file: UploadFile, select: string) => {
	let model = {}
	model.ProjectId = store.state.project.projectId
	model.ProjectCompanyId = state.projectCompanyData.Id
	switch (select) {
		case 'bid':
			state.projectCompanyData.data.BidPics = file.data.src
			onUpdateProjectCompanyFileData(select);
			break;
		case 'ensure':
			state.projectCompanyData.data.EnsurePics = file.data.src
			onUpdateProjectCompanyFileData(select);
			break;
		case 'zgps':
			model.Kind = 'zgps'
			model.Name = "商务文件"+formatTimestamp(Date.now())
			state.ProjectCompanyLineTableData.data.push(model)
			break;
		case 'jsps':
			model.Kind = 'jsps'
			model.Name = "技术文件"+formatTimestamp(Date.now())
			state.ProjectCompanyLineTableData.data.push(model)
			break;
		case 'qt':
			model.Kind = 'qt'
			model.Name = "其他文件"+formatTimestamp(Date.now())
			state.ProjectCompanyLineTableData.data.push(model)
			break;
		case 'jjps':
			state.projectCompanyData.data.Files = file.data.src
			onUpdateProjectCompanyFileData(select)
			break;
		}
};

// 上传文件删除
const onRemove = (file: UploadFile) => {
	let removeUrl = file.url.substring(file.url.indexOf('/static/upload/'), file.url.length);
	for (let i = 0; i < state.projectCompanyData.files.length; i++) {
		if (state.projectCompanyData.files[i] == removeUrl) {
			state.projectCompanyData.files.splice(i, 1);
		}
	}
};

//	预览文件
const onPreview = (uploadFile: any) => {
	//	当格式为图片就预览图片，否则下载文件
	let filename = uploadFile.name;
	if (!uploadFile.name || uploadFile.name == '') {
		filename = uploadFile.url;
	}
	let fileurl = uploadFile.url;
	let fileExtension = '';
	//	校检文件类型
	var imageTypes = ['png', 'jpg', 'jpeg', 'gif'];
	if (filename.lastIndexOf('.') > -1) {
		fileExtension = filename.slice(filename.lastIndexOf('.') + 1);
	}
	const isTypeOk = imageTypes.some((type) => {
		if (fileExtension && fileExtension.indexOf(type) > -1) {
			return true;
		}
	});
	if (isTypeOk) {
		//	预览图片
		state.dialogImageUrl[0] = fileurl;
		state.dialogTitle = filename;
		state.dialogVisible = true;
	} else {
		//	下载文件
		state.dialogVisible = false;
		//	openWindow(fileurl, { target: "_self" });
		window.open(fileurl, '_self');
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

// 下载文件
const onDownloadFile = async (fileName: string, path: string) => {
	var a = document.createElement('a');
	a.href = import.meta.env.VITE_URL + path;
	a.download = fileName; // 下载后的文件名称
	a.click();
};

const formatTimestamp = (timestamp) => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
	return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

// 批量设置 echarts resize
const initEchartsResizeFun = () => {
	nextTick(() => {
		for (let i = 0; i < state.myCharts.length; i++) {
			state.myCharts[i].resize();
		}
	});
};

// 批量设置 echarts resize
const initEchartsResize = () => {
	window.addEventListener('resize', initEchartsResizeFun);
};

// 页面加载时
onMounted(() => {
	initEchartsResize();
});

// 由于页面缓存原因，keep-alive
onActivated(() => {
	initEchartsResizeFun();
});

// 监听 vuex 中的 tagsview 开启全屏变化，重新 resize 图表，防止不出现/大小不变等
watch(
	() => store.state.tagsViewRoutes.isTagsViewCurrenFull,
	() => {
		initEchartsResizeFun();
	}
);

defineExpose({openPage, onGoToList, ...toRefs(state)})
</script>

<style scoped lang="scss">

</style>
