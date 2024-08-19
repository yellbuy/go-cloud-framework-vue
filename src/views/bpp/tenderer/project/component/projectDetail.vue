<template>
	<div v-if="tabIndex==0">
		<el-row :gutter="15" class="mb15">
			<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="home-warning-media">
				<el-timeline style="max-width: 600px">
					<el-timeline-item timestamp="2018-04-12 15:00" placement="top" type="primary">
					<el-card>
						<el-descriptions title="售标截止">
							<el-descriptions-item label="">2018-04-12 15:00</el-descriptions-item>
						</el-descriptions>
						<el-divider border-style="dashed" />
						<p class="font14"><b>购买资料</b></p>
						<el-row class="mt10">
							<el-col :span="24">
								<el-upload
									:action="uploadURL"
									list-type="picture-card"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onSuccessFile"
									:on-preview="showImage"
									:on-remove="onRemove"
									:before-upload="onBeforeImageUpload"
									:file-list="FilesList"
									:limit="1"
									v-if="projectInfoData.data.BidPayUid >= 0">
									<template #default>
										<el-link type="primary">上传缴费凭证</el-link>
									</template>
								</el-upload>
								<a v-else-if="projectInfoData.data.BidAuditState == 0">等待审核</a>
								<a v-else>审核通过</a>
							</el-col>
						</el-row>
						<el-divider border-style="dashed" />
						<el-descriptions title="下载标书" border >
							<el-descriptions-item label-align="left" width="50%" align="right" label="《标书文件》">
								<el-link type="primary" @click="handleDownload()">下载</el-link>
							</el-descriptions-item>
						</el-descriptions>
						<el-divider border-style="dashed" />
						<p class="font14"><b>支付投标保证金</b></p>
						<el-row class="mt10">
							<el-col :span="24">
								<el-upload
									:action="uploadURL"
									list-type="picture-card"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onSuccessFile"
									:on-preview="showImage"
									:on-remove="onRemove"
									:before-upload="onBeforeImageUpload"
									:file-list="FilesList"
									:limit="1"
									v-if="projectInfoData.data.EnsurePayUid >= 0">
									<template #default>
										<el-link type="primary" @click="submitUpload" >上传缴费凭证</el-link>
									</template>
								</el-upload>
								<el-link v-else-if="projectInfoData.data.EnsureAuditState == 0">等待审核</el-link>
								<el-link v-else>审核通过</el-link>
							</el-col>
						</el-row>
					</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2024-04-12 15:00" placement="top" type="primary">
						<p class="font14"><b>投标截止</b></p>
					</el-timeline-item>
					<el-timeline-item timestamp="2024-04-12 15:00" placement="top" type="primary">
						<p class="font14"><b>开始开标</b></p>
						<el-divider border-style="dashed" />
						<el-button type="primary" @click="onBeginBid">
							<SvgIcon name="fa fa-cloud-download" class="mr3"/>参与投标
						</el-button>
						<el-divider border-style="dashed" />
					</el-timeline-item>
					<el-timeline-item timestamp="">
						<el-card>
							<el-descriptions title="开标结束">
								<el-descriptions-item label="">2024-04-12 18:00</el-descriptions-item>
							</el-descriptions>
							<p class="font14 mb10"><b>成交通知</b></p>
							<p>您好：我公司的[汉风生产管控系统建设] （YJ2023122102538），经评审，现确定由贵公司供应（承揽）。请收到本通知后10个工作日内,到采购单位签订合同，否则，将视为放弃供应（承揽）权利，并扣除投标/议价/竞价保证金。请到采购组织方领取纸质版成交通知书，或联系组织方领取扫描版成交通知书（电子邮件方式）。</p>
							<p class="text-right">特此通知。</p>
							<p class="mt10"><el-link type="primary" @click="handleDownload()">中标通知书下载</el-link></p>
						</el-card>
					</el-timeline-item>
				</el-timeline>
			</el-col>
			<el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="16" class="home-dynamic-media">
				<el-descriptions title="项目基本信息" size="large" :column="2" border>
					<el-descriptions-item label="项目编号" label-align="right" align="left" min-width="130px">
						{{ projectInfoData.data.No }}
					</el-descriptions-item>
					<el-descriptions-item label="项目名称" label-align="right" align="left" min-width="130px">
						{{ projectInfoData.data.Name }}
					</el-descriptions-item>
					<el-descriptions-item label="执行策略" label-align="right" align="left">
						未对接数据
					</el-descriptions-item>
					<el-descriptions-item label="报价要求" label-align="right" align="left">
						<el-tag size="small">未对接数据</el-tag>
					</el-descriptions-item>
					<el-descriptions-item label="售标截止时间" label-align="right" align="left">
						{{ projectInfoData.data.EndTime }}
					</el-descriptions-item>
					<el-descriptions-item label="投标截止时间" label-align="right" align="left">
						{{ projectInfoData.data.FinishTime }}
					</el-descriptions-item>
					<el-descriptions-item label="开标时间" label-align="right" align="left">
						{{ projectInfoData.data.BeginTime }}
					</el-descriptions-item>
					<el-descriptions-item label="评标办法" label-align="right" align="left">
						{{ projectInfoData.data.ReviewDesc }}
					</el-descriptions-item>
					<el-descriptions-item label="项目负责人" label-align="right" align="left">
						{{ projectInfoData.data.ProjectManagerName }}
					</el-descriptions-item>
					<el-descriptions-item label="采购负责人" label-align="right" align="left">
						{{ projectInfoData.data.PurchaseManangerName }}
					</el-descriptions-item>
					<el-descriptions-item label="供应商报价模式" label-align="right" align="left" :span="2">
						{{ projectInfoData.data.QuotationMode }}
					</el-descriptions-item>
					<el-descriptions-item label="投标资格要求" label-align="right" align="left" :span="1">
						<el-tooltip
							class="box-item"
							effect="dark"
							content="1、具有承揽本项目相关经营资格； 2、具有良好的企业信誉和履约能力。"
							placement="top-start">
							<el-text truncated line-clamp="1" size="default" style="width:90%">{{ projectInfoData.data.Qualification }}</el-text>
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
										v-model="isShowMore"
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
					<el-table :data="bidTableData.data" v-loading="bidTableData.loading" style="width: 100%" stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" show-overflow-tooltip fixed />
						<el-table-column prop="No" label="物资编码"  width="120" show-overflow-tooltip fixed/>
						<el-table-column prop="Name" label="名称" width="120" show-overflow-tooltip/>
						<el-table-column v-if="isShowMore" prop="fanwei" label="明细项" width="70"/>
						<el-table-column v-if="isShowMore" prop="Kind" label="明细项单位" width="90"/>
						<el-table-column v-if="isShowMore" prop="EndTime" label="材质/系列" width="130" show-overflow-tooltip/>
						<el-table-column v-if="isShowMore" prop="ReviewTime" label="规格/型号" width="130" show-overflow-tooltip/>
						<el-table-column v-if="isShowMore" prop="State" label="执行标准" width="90"/>
						<el-table-column v-if="isShowMore" prop="State" label="技术参数" width="90"/>
						<el-table-column v-if="isShowMore" prop="State" label="计量单位" width="90"/>
						<el-table-column prop="State" label="采购数量" width="90"/>
						<el-table-column v-if="isShowMore" prop="State" label="收货/服务/施工地点" width="150"/>
						<el-table-column v-if="isShowMore" prop="State" label="颜色" width="90"/>
						<el-table-column v-if="isShowMore" prop="State" label="尺码" width="90"/>
						<el-table-column prop="State" label="执行开始时间" width="120"/>
						<el-table-column prop="State" label="执行截止时间" width="120"/>
						<el-table-column prop="State" label="采购备注" width="90"/>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
		<el-divider border-style="dashed" />
		<el-row>
			<el-col :span="24" class="text-center">
				<el-button @click="onGoToList" class="mt20" size="large">
					<SvgIcon name="fa fa-rotate-left" class="mr3"/>返回
				</el-button>
			</el-col>
		</el-row>
	</div>
	<div v-else-if="tabIndex==1">
		<div class="text-center">
			<el-steps style="max-width: 720px;margin-left: auto;margin-right:auto;" :active="stepIndex" finish-status="finish" align-center>
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
				<div v-if="stepIndex==0">
					<el-table :data="bidTableData.data" v-loading="bidTableData.loading" style="width: 600px;margin-left:auto;margin-right: auto;" stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" />
						<el-table-column prop="name" label="商务文件" width="350">
							<template #default="scope">
								<el-input
									v-model="scope.row.name"
									placeholder="请输入"/> 
							</template>
						</el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="180" align="left">
							<template #header>
								<el-upload
									ref="uploadRef"
									class="upload-demo"
									action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
									accept="xls|xlsx|doc|docx|png|jpg|jpeg|pdf"
									:show-file-list="false"
									:auto-upload="true">
									<el-button type="primary" @click="submitUpload">
									上传
									</el-button>
								</el-upload>
							</template>
							<template #default="scope">
								<el-row>
									<el-col :span="8">
										<el-button text bg  @click="onModelEdit(scope.row.Id, false)">
											查看
										</el-button>
									</el-col>
									<el-col :span="8">
										<el-upload
											ref="uploadRef"
											class="upload-demo"
											action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
											accept="xls|xlsx|doc|docx|png|jpg|jpeg|pdf"
											:show-file-list="false"
											:auto-upload="true">
											<el-button text bg type="primary" @click="submitUpload">
											上传
											</el-button>
										</el-upload>
									</el-col>
									<el-col :span="8">
										<el-button text bg type="danger" @click="onPwdChanggeEdit(scope.row.Id, false)">
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
				<div v-else-if="stepIndex==1">
					<el-table :data="bidTableData.data" v-loading="bidTableData.loading" style="width: 600px;margin-left:auto;margin-right: auto;" stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" />
						<el-table-column prop="name" label="技术文件" width="350">
							<template #default="scope">
								<el-input
									v-model="scope.row.name"
									placeholder="请输入"/> 
							</template>
						</el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="180" align="left">
							<template #header>
								<el-upload
									ref="uploadRef"
									class="upload-demo"
									action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
									accept="xls|xlsx|doc|docx|png|jpg|jpeg|pdf"
									:show-file-list="false"
									:auto-upload="true">
									<el-button type="primary" @click="submitUpload">
									上传
									</el-button>
								</el-upload>
							</template>
							<template #default="scope">
								<el-row>
									<el-col :span="8">
										<el-button text bg  @click="onModelEdit(scope.row.Id, false)">
											查看
										</el-button>
									</el-col>
									<el-col :span="8">
										<el-upload
											ref="uploadRef"
											class="upload-demo"
											action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
											accept="xls|xlsx|doc|docx|png|jpg|jpeg|pdf"
											:show-file-list="false"
											:auto-upload="true">
											<el-button text bg type="primary" @click="submitUpload">
											上传
											</el-button>
										</el-upload>
									</el-col>
									<el-col :span="8">
										<el-button text bg type="danger" @click="onPwdChanggeEdit(scope.row.Id, false)">
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
				<div v-else-if="stepIndex==2">
					<el-table :data="bidTableData.data" v-loading="bidTableData.loading" style="width: 600px;margin-left:auto;margin-right: auto;" stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" />
						<el-table-column prop="name" label="其他文件" width="350">
							<template #default="scope">
								<el-input
									v-model="scope.row.name"
									placeholder="请输入"/> 
							</template>
						</el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="180" align="left">
							<template #header>
								<el-upload
									ref="uploadRef"
									class="upload-demo"
									action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
									accept="xls|xlsx|doc|docx|png|jpg|jpeg|pdf"
									:show-file-list="false"
									:auto-upload="true">
									<el-button type="primary" @click="submitUpload">
									上传
									</el-button>
								</el-upload>
							</template>
							<template #default="scope">
								<el-row>
									<el-col :span="8">
										<el-button text bg  @click="onModelEdit(scope.row.Id, false)">
											查看
										</el-button>
									</el-col>
									<el-col :span="8">
										<el-upload
											ref="uploadRef"
											class="upload-demo"
											action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
											accept="xls|xlsx|doc|docx|png|jpg|jpeg|pdf"
											:show-file-list="false"
											:auto-upload="true">
											<el-button text bg type="primary" @click="submitUpload">
											上传
											</el-button>
										</el-upload>
									</el-col>
									<el-col :span="8">
										<el-button text bg type="danger" @click="onPwdChanggeEdit(scope.row.Id, false)">
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
				<div v-else-if="stepIndex==3">
					<el-table :data="bidTableData.data" v-loading="bidTableData.loading" show-summary style="width: 900px;margin-left:auto;margin-right: auto;" border stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="70" show-overflow-tooltip fixed />
						<el-table-column prop="No" label="物资编码"  width="120" show-overflow-tooltip fixed/>
						<el-table-column prop="name" label="名称" width="200" show-overflow-tooltip/>
						<el-table-column prop="fanwei" label="明细项" width="70"/>
						<el-table-column prop="unit" label="明细项单位" width="90"/>
						<el-table-column prop="amount" label="采购数量" width="90"/>
						<el-table-column prop="price" label="单价" width="110" >
							<template #default="scope">
								<el-input-number v-model="scope.row.price" :min="0" :max="1000000000000" style="width:90px" :step="10" :value-on-clear="0" :precision="2" :controls="false" controls-position="right" /> 
							</template>	
						</el-table-column>
						<el-table-column prop="amount" label="总价" width="110" align="right"/>								
					</el-table>
					<div style="width:900px;margin-left:auto;margin-right:auto;" >
						<div class="mt20 mb10">
							<el-upload
									ref="uploadRef"
									class="upload-demo"
									action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
									accept="xls|xlsx|doc|docx|png|jpg|jpeg|pdf"
									:show-file-list="false"
									:auto-upload="true">
									<el-button type="primary" size="default" @click="submitUpload">
									上传附件
									</el-button>
								</el-upload>
						</div>
						<div>
							<el-text class="mx-1" type="info">支持的文件格式:xls|xlsx|doc|docx|png|jpeg|pdf</el-text>
						</div>							
					</div>			
				</div>	
				<div v-else-if="stepIndex==4">
					<div class="text-center">
						<div>
							<SvgIcon name="fa fa-check-circle" color="green" :size="60" ></SvgIcon>
						</div>
						<div class="mt30 mb30">
							<el-text type="info" size="default">投标文件已上传成功，确认无误后请点击确认提交，开标后数据将无法修改</el-text>	
						</div>
					</div>
				</div>					
			</el-col>
		</el-row>
		<el-divider border-style="dashed" />
		<el-row>
			<el-col :span="24" class="text-center mt20">
				<el-button @click="onGoToList"  size="large">
					<SvgIcon name="fa fa-rotate-left" class="mr3"/>返回
				</el-button>
				<el-button @click="onGoToPrevious" v-if="stepIndex>0" type="primary" size="large">
					<SvgIcon name="fa fa-arrow-left" class="mr3"/>上一步
				</el-button>
				<el-button @click="onGoToNext" type="primary" v-if="stepIndex<4" size="large">
					<SvgIcon name="fa fa-arrow-right" class="mr3"/>下一步
				</el-button>
				<el-button @click="onGoToNext" type="primary" v-if="stepIndex==4" size="large">
					<SvgIcon name="fa fa-rotate-right" class="mr3"/>确认提交
				</el-button>
			</el-col>
		</el-row>
	</div>
	<div v-else>
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, nextTick, onActivated, onMounted, reactive, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import { formatAxis } from '/@/utils/formatTime';
import { Session } from '/@/utils/storage';
export default {
	name: 'admin',
	setup() {
		const moduleKey = 'api_sys_home_alias';
		const router = useRouter();
		console.debug('router：', router.currentRoute.value);
		//console.debug("route:",$route)
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const state = reactive({
			moduleKey: moduleKey,
			isShowMore:false,
			tenant: {},
			tabIndex:0,
			stepIndex:0,
			id: '279083082479309638',
			httpsText: import.meta.env.VITE_URL as any,
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			dialogImageUrl: "",
			ImageVisible: false,
			dialogVisible: false,
			Files: [],
			FilesList: [],
			//	表单
			ruleForm: {
				bid_pics:0,
				bid_files:0,
				bid_pay_state: '0',	
				bid_pay_uid:0,
				bid_pay_by:0,
				bid_audit_state:0,
				bid_audit_uid:0,
				bid_audit_by:0,
				ensure_pics:0,
				ensure_files:0,
				ensure_pay_state:0,
				ensure_pay_uid:0,
				ensure_pay_by:0,
				ensure_audit_state:0,
				ensure_audit_uid:0,
				ensure_audit_by:0,
			},
			projectInfoData: {
				data: {},
				total: 0,
				loading: false,
				param: {
					kind: "repair",
					mode: 2,
					current: 1,
					size: 20,
					categoryId: null,
					name: '',
				},
			},
			bidTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					mode: 2,
					current: 1,
					size: 20,
					projectId: '279082270076182531',
					categoryId: null,
					name: '',
				},
			},
			myCharts: [],
		});

		const token = Session.get('token');

		// 获取项目信息
		const onGetProjectInfoData = async () => {
			state.projectInfoData.loading = true;
			try {
				const res = await proxy.$api.erp.projectcompany.projectcompany(state.id ,state.projectInfoData.param);
				if (res.errcode != 0) {
					return;
				}
				state.projectInfoData.data = res.data[0];
			} finally {
				state.projectInfoData.loading = false;
			}
		};

		// 获取投标方项目信息
		const onGetBidTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.bidTableData.param.pageNum = 1;
			}
			state.bidTableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectCompany.projectcompany(state.projectInfoData.param.projectId);
				if (res.errcode != 0) {
					return;
				}
				state.bidTableData.data = res.data;
				state.bidTableData.total = res.total;
			} finally {
				state.bidTableData.loading = false;
			}
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

		const loadTenant = async () => {
			const res = await proxy.$api.base.tenant.getById(getUserInfos.value.tid);
			if (res.errcode == 0) {
				state.tenant = res.data;
			}
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

		//返回
		const onGoToList=()=>{
			proxy.$parent.$parent.onModelList(false);
		}

		//前一步
		const onGoToPrevious=()=>{
			let stepIndex=state.stepIndex-1
			if(stepIndex<0){
				stepIndex=0
			}
			state.stepIndex=stepIndex
		}

		//后一步
		const onGoToNext=()=>{
			let stepIndex=state.stepIndex+1
			if(stepIndex>4){
				stepIndex=4
			}
			state.stepIndex=stepIndex
		}

		//参与投标
		const onBeginBid = ()=>{
			state.tabIndex=1
		}

		//	文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			console.log(state.FilesList);
		};

		//	显示表格图片
		const showImage: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl = uploadFile.url!
			state.ImageVisible = true
		}

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

		const onRemove = (file: UploadFile) => {
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/'), file.url.length);
			for (let i = 0; i < state.Files.length; i++) {
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
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

		// 上传图片
		const submitUpload = async () => {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';
			input.onchange = async (e) => {
				const file = e.target.files[0];
				const formData = new FormData();
				formData.append('file', file);
				try {
					const response = await fetch(state.uploadURL, {
					method: 'POST',
					body: formData
					});
					if (response.ok) {
						console.log('图片上传成功');
					} else {
						console.error('图片上传失败');
					}
				} catch (error) {
					console.error('上传过程中发生错误', error);
				}
			};
			input.click();
		};

		//预览图片
		const previewImage = () => {
			const imagePath = import.meta.env.VITE_URL+"/static/download/erp/bbp/test.jpg"; 
			const newWindow = window.open('', '_blank');
			newWindow.document.write(`<img src="${imagePath}" alt="预览" />`);
		}

		// 下载文件
		const handleDownload = async () => {
			var file = document.createElement('a');
			file.href = import.meta.env.VITE_URL+"/static/download/erp/bbp/test.jpg";
			file.download = '标书文件_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			file.click();
		};

		//	保存上传
		const submit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						if (state.ruleForm.Id==0){
							let res = await proxy.$api.common.category.insert(state.ruleForm);
								if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetMainTableData();
						}
						}else{
							let res = await proxy.$api.common.category.update(state.ruleForm);
							if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetMainTableData();
						}
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

		// 页面加载时
		onMounted(() => {
			onGetProjectInfoData();
			// onGetBidTableData();
			initEchartsResize();
			loadTenant();
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

		return {
			token,
			onGotoEdit,
			onGoToList,
			onGoToPrevious,
			onGoToNext,
			onBeginBid,
			getUserInfos,
			currentTime,
			onSuccessFile,
			onRemove,
			onPreview,
			showImage,
			onBeforeImageUpload,
			submitUpload,
			previewImage,
			handleDownload,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">

</style>
