<template>
	<div class="el-card is-hover-shadow" v-if="isSelection">
		<el-row :gutter="20" class="mt10 ml10">
			<el-col :span="10" class="mt10">
				<el-timeline>
					<el-timeline-item :timestamp="projectCompany.CreateTime" placement="top" type="success">
						<el-tag class="ml-2" type="success">报名成功</el-tag>
					</el-timeline-item>
					<el-timeline-item
						placement="top"
						type="primary"
						icon="MoreFilled"
						:timestamp="tenderCertificate.AuditState > 0 ? tenderCertificate.AuditTime : ''"
					>
						<div v-if="isTimeShow(new Date(), ruleForm.EndTime) && tenderCertificate.AuditState != 1">已过报名结束时间</div>
						<div v-else-if="ruleForm.BidFee != 0">
							<div v-if="tenderCertificate.State == 0 || tenderCertificate.AuditState == 2">
								<span
									>请上传标书费凭证 ({{ ruleForm.BidFee }}元)<el-tag class="ml-2" type="danger" v-if="tenderCertificate.AuditState == 2"
										>未通过</el-tag
									></span
								>
								<div style="width: 50%">
									<el-upload
										class="avatar-uploader"
										:action="uploadURL"
										:headers="{ Appid: getUserInfos.appid, Authorization: token }"
										:show-file-list="false"
										:on-success="onSuccessTenderFile"
										:accept:="`image/png, image/jpeg,image/bmp,image/jpg,application/pdf`"
									>
										<img v-if="tenderFile" :src="tenderFile" class="avatar" />
										<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
									</el-upload>
								</div>
								<div>
									<el-button style="margin-left: 10px" type="primary" @click="onSubmit(false, tender)">{{ $t('message.action.save') }}</el-button>
									<el-button type="primary" @click="onSubmit(true, tender)">{{ $t('message.action.submit') }}</el-button>
								</div>
							</div>
							<div v-else>
								<span
									>当前标书费状态 <el-tag class="ml-2" type="info" v-if="tenderCertificate.AuditState == 0">待审核</el-tag>
									<el-tag class="ml-2" type="success" v-else-if="tenderCertificate.AuditState == 1">通过</el-tag></span
								>
								<div class="demo-image__preview">
									<el-image :src="getRowFiles(tenderCertificate.Files)" :preview-src-list="getRowFilesList(tenderCertificate.Files)" afit="cover" />
								</div>
							</div>
						</div>
						<div v-else>
							<el-tag class="ml-2" type="info">无需缴纳标书费</el-tag>
						</div>
					</el-timeline-item>

					<el-timeline-item :timestamp="ruleForm.BeginTime" placement="top" type="info">
						<el-tag type="info" class="ml-2">招标开始</el-tag>
					</el-timeline-item>
					<el-timeline-item
						placement="top"
						v-if="projectCompany.Step == bond || projectCompany.Step == qualifications"
						type="primary"
						icon="MoreFilled"
						:timestamp="bondCertificate.AuditState > 0 ? bondCertificate.AuditTime : ''"
					>
						<div v-if="isTimeShow(ruleForm.BeginTime, new Date()) && bondCertificate.AuditState != 1">暂未到招标开始时间</div>
						<div v-else-if="isTimeShow(new Date(), ruleForm.FinishTime) && bondCertificate.AuditState != 1">已过招标结束时间</div>
						<div v-else-if="ruleForm.EnsureFee != 0">
							<div v-if="bondCertificate.State == 0 || bondCertificate.AuditState == 2">
								<span
									>请上传保证金凭证 ({{ ruleForm.EnsureFee }}万元)<el-tag class="ml-2" type="danger" v-if="bondCertificate.AuditState == 2"
										>未通过</el-tag
									></span
								>
								<div style="width: 50%">
									<el-upload
										class="avatar-uploader"
										:action="uploadURL"
										:headers="{ Appid: getUserInfos.appid, Authorization: token }"
										:show-file-list="false"
										:on-success="onSuccessBondFile"
										:accept:="`image/png, image/jpeg,image/bmp,image/jpg,application/pdf`"
									>
										<img v-if="bondFile" :src="bondFile" class="avatar" />
										<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
									</el-upload>
								</div>
								<div>
									<el-button style="margin-left: 10px" type="primary" @click="onSubmit(false, bond)">{{ $t('message.action.save') }}</el-button>
									<el-button type="primary" @click="onSubmit(true, bond)">{{ $t('message.action.submit') }}</el-button>
								</div>
							</div>
							<div v-else>
								<span
									>当前招标保证金状态 <el-tag class="ml-2" type="info" v-if="bondCertificate.AuditState == 0">待审核</el-tag>
									<el-tag class="ml-2" type="success" v-else-if="bondCertificate.AuditState == 1">通过</el-tag></span
								>
								<div class="demo-image__preview">
									<el-image :src="getRowFiles(bondCertificate.Files)" :preview-src-list="getRowFilesList(bondCertificate.Files)" afit="cover" />
								</div>
							</div>
						</div>
						<div v-else>
							<el-tag class="ml-2" type="info">无需缴纳保证金</el-tag>
						</div>
					</el-timeline-item>
					<el-timeline-item placement="top" v-if="projectCompany.Step == qualifications">
						<el-form-item label="公司报价(万元)：" prop="QuotedPrice"
							><el-input-number
								v-model="quotationCertificate.PurchasePrice"
								:min="0"
								:max="ruleForm.PurchasePrice"
								controls-position="right"
								:precision="2"
								:disabled="isTimeShow(ruleForm.FinishTime, new Date()) ? false : true"
							/>
							<el-button
								style="margin-left: 10px"
								v-if="isTimeShow(ruleForm.FinishTime, new Date())"
								type="primary"
								@click="onSubmit(false, quotation)"
								>{{ $t('message.action.save') }}</el-button
							>
							<el-button type="primary" v-if="isTimeShow(ruleForm.FinishTime, new Date())" @click="onSubmit(true, quotation)">{{
								$t('message.action.submit')
							}}</el-button>
						</el-form-item>
						<p title="" class="color-info-light font10">
							<SvgIcon name="fa fa-info-circle" class="mr3" />
							采购控制价<span style="color: #ff0000">{{ ruleForm.PurchasePrice }}</span
							>万元,当前公司报价<span style="color: #19d319">{{ projectCompany.QuotedPrice }}</span
							>万元
						</p>
						<view style="float: right" v-if="isTimeShow(ruleForm.FinishTime, new Date())">
							<el-button style="margin-left: 10px" type="primary" @click="onSubmit(false, qualifications)">{{ $t('message.action.save') }}</el-button>
							<el-button type="primary" @click="onSubmit(true, qualifications)">{{ $t('message.action.submit') }}</el-button>
							<el-button text bg type="primary" @click="tableDataAdd">{{ $t('message.action.add') }} </el-button>
						</view>

						<el-table
							:data="tableData.data"
							v-loading="tableData.loading"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-500)"
							border
							stripe
							highlight-current-row
						>
							<el-table-column prop="Name" label="文件名称" show-overflow-tooltip>
								<template #default="scope">
									<el-input v-if="isTimeShow(ruleForm.FinishTime, new Date())" v-model="scope.row.Name" placeholder="请输入文件名称" />

									<span v-if="isTimeShow(new Date(), ruleForm.FinishTime)">{{ scope.row.Name }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="Files" label="文件" show-overflow-tooltip align="center">
								<template #default="scope">
									<el-button text type="primary" @click="showImage(scope.row.Files)">查看</el-button>
								</template>
							</el-table-column>
							<el-table-column prop="State" label="状态" show-overflow-tooltip align="center">
								<template #default="scope">
									<el-tag class="ml-2" type="danger" v-if="scope.row.State == 0">未提交</el-tag
									><el-tag class="ml-2" type="success" v-else-if="scope.row.State == 1">已提交</el-tag>
								</template>
							</el-table-column>
							<el-table-column prop="Remark" label="备注" show-overflow-tooltip>
								<template #default="scope">
									<el-input v-if="isTimeShow(ruleForm.FinishTime, new Date())" v-model="scope.row.Remark" />
									<span v-if="isTimeShow(new Date(), ruleForm.FinishTime)">{{ scope.row.Remark }}</span>
								</template>
							</el-table-column>
							<el-table-column
								v-if="isTimeShow(ruleForm.FinishTime, new Date())"
								:label="$t('message.action.operate')"
								:width="proxy.$calcWidth(190)"
								fixed="right"
							>
								<template #default="scope">
									<div style="display: flex">
										<el-upload
											:action="uploadURL"
											name="file"
											:headers="{ Appid: getUserInfos.appid, Authorization: token }"
											:show-file-list="false"
											:on-success="onLogoUploadSuccess"
											:before-upload="onBeforeImageUpload"
											style="padding-right: 12px"
										>
											<!-- @click="Upload(scope.row.Id, scope.$index)" -->
											<template #trigger>
												<el-button class="pr-8" text bg type="primary" @click="Upload(scope.$index)">
													<el-icon>
														<Upload />
													</el-icon>
													&#8197;{{ $t('message.action.upload') }}
												</el-button>
											</template>
										</el-upload>
										<el-button text bg type="danger" @click="onModelDel(scope.row.Id, scope.$index)">
											<el-icon>
												<CloseBold />
											</el-icon>
											&#8197;{{ $t('message.action.delete') }}
										</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</el-timeline-item>
					<el-timeline-item :timestamp="ruleForm.FinishTime" placement="top" type="danger">
						<el-tag class="ml-2" type="danger">招标截止</el-tag>
					</el-timeline-item>
					<el-timeline-item :timestamp="ruleForm.ReviewTime" placement="top" type="primary">
						<el-tag class="ml-2" type="primary">评选开始</el-tag>
					</el-timeline-item>
				</el-timeline>
			</el-col>
			<el-col :span="14">
				<div class="flex-center layout-backtop">
					<el-card shadow="hover">
						<div style="float: left">
							<el-button type="primary" @click="changeSelection">
								<el-icon>
									<Edit />
								</el-icon>
								&#8197;{{ $t('message.action.return') }}
							</el-button>
							<el-button type="info" @click="GetByIdRow()">
								<el-icon>
									<Refresh />
								</el-icon>
								&#8197;{{ $t('message.action.refresh') }}
							</el-button>
						</div>
						<h3 style="text-align: center">当前项目：{{ ruleForm.Name }}</h3>
						<el-descriptions style="margin-top: 20px" :column="2">
							<el-descriptions-item label="项目名称：">{{ ruleForm.Name }}</el-descriptions-item>
							<el-descriptions-item label="项目编号：">{{ ruleForm.No }}</el-descriptions-item>
							<el-descriptions-item label="报名开始时间：">{{ ruleForm.StartTime }}</el-descriptions-item>
							<el-descriptions-item label="报名截止地点：">{{ ruleForm.EndTime }} </el-descriptions-item>
							<el-descriptions-item label="投标开始时间：">{{ ruleForm.BeginTime }}</el-descriptions-item>
							<el-descriptions-item label="投标截止时间：">{{ ruleForm.FinishTime }} </el-descriptions-item>
							<el-descriptions-item label="评选时间：">{{ ruleForm.ReviewTime }}</el-descriptions-item>
							<el-descriptions-item label="项目类型："
								><span v-if="ruleForm.ProjectType == 1">公开招标</span>
								<span v-else-if="ruleForm.ProjectType == 2">邀请招标</span>
								<span v-else-if="ruleForm.ProjectType == 3">竞争性谈判</span>
								<span v-else-if="ruleForm.ProjectType == 4">单一来源采购</span>
								<span v-else-if="ruleForm.ProjectType == 5">询价采购</span>
							</el-descriptions-item>
							<el-descriptions-item label="评选地点：">{{ ruleForm.Location }} </el-descriptions-item>
						</el-descriptions>
						<el-row>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
								<el-form-item label="项目内容：" prop="Content">
									<div v-html="ruleForm.Content" v-if="projectCompany.Step == bond || projectCompany.Step == qualifications"></div>
									<span v-else>请先缴纳标书费！</span>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
								<el-form-item label="标书：" prop="Content">
									<div v-if="projectCompany.Step == bond || projectCompany.Step == qualifications">
										<div v-for="(val, index) in FilesList" :key="index">
											<a :href="val.url" target="_blank">点击下载</a>
										</div>
									</div>
									<span v-else>请先缴纳标书费！</span>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</div>
			</el-col>
		</el-row>
		<el-image-viewer v-if="imgViewerVisible" @close="closeImgViewer" hide-on-click-modal :url-list="imgList" />
	</div>
</template>

<script lang="ts">
import type { UploadFile } from 'element-plus';
import { ElMessage, ElMessageBox, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'api_sys_project_signup',
	components: {},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state = reactive({
			title: t('message.action.see'),
			ruleForm: {},
			FilesList: [],
			isSelection: false,
			activities: [],
			projectCompany: {},
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			tenderFile: '',
			tenderImgurl: '',
			bondFile: '',
			bondImgurl: '',
			homeBaseUrl: import.meta.env.VITE_URL as any,
			tenderCertificate: {}, //标书
			bondCertificate: {}, //保证金
			quotationCertificate: {}, //报价
			tender: 'tender',
			bond: 'bond',
			qualifications: 'qualifications',
			quotation: 'quotation',
			imgList: [],
			imgViewerVisible: false,
			tableData: {
				data: [],
				loading: false,
			},
			tableDataIndex: 0,
		});
		const token = Session.get('token');
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		const { dateFormat } = commonFunction();
		const GetByIdRow = async () => {
			state.tenderCertificate = {}; //标书
			state.bondCertificate = {}; //保证金
			state.quotationCertificate = {}; //报价
			state.FilesList = [];
			state.tableData.data = [];
			state.imgList = [];
			let Id = store.state.project.projectId;
			let companyId = store.state.project.projectCompanyId;
			state.isSelection = true;
			try {
				const res = await proxy.$api.erp.project.signUpDetail(Id, companyId);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data.Project;
				if (state.ruleForm.Files != '') {
					let Files = state.ruleForm.Files.split(',');
					state.FilesList = [];
					for (let i = 0; i < Files.length; i++) {
						let image = { url: '' };
						image.url = state.homeBaseUrl + Files[i];
						state.FilesList.push(image);
					}
				}
				state.projectCompany = res.data.ProjectCompany;
				//处理时间线数据
				getTimeList(res.data.TimeLine);
			} finally {
			}
		};

		const getTimeList = (data: Array) => {
			//处理2个 ， 一个是标书费用 一个是招标保证金
			state.tableData.data = [];
			console.log(data);
			if (data) {
				for (let item of data) {
					if (item.Kind == state.tender) {
						//标书费用
						state.tenderCertificate = item;
						if (item.Files != '') {
							state.tenderFile = state.homeBaseUrl + item.Files;
						}
					} else if (item.Kind == state.bond) {
						//招标保证金
						state.bondCertificate = item;
						if (item.Files != '') {
							state.bondFile = state.homeBaseUrl + item.Files;
						}
					} else if (item.Kind == state.quotation) {
						state.quotationCertificate = item;
					} else if (item.Kind == state.qualifications) {
						state.tableData.data.push(item);
					}
				}
			}
			//标书费用
			if (JSON.stringify(state.tenderCertificate) == '{}') {
				state.tenderCertificate = {
					Id: '0',
					Kind: state.tender,
					Name: state.ruleForm.Name + '标书费',
					ProjectId: state.ruleForm.Id,
					ProjectCompanyId: state.projectCompany.Id,
					State: 0,
					AuditState: 0,
				};
			}
			//招标保证金
			if (JSON.stringify(state.bondCertificate) == '{}') {
				state.bondCertificate = {
					Id: '0',
					Kind: state.bond,
					Name: state.ruleForm.Name + '招标保证金',
					ProjectId: state.ruleForm.Id,
					ProjectCompanyId: state.projectCompany.Id,
					State: 0,
					AuditState: 0,
				};
			}
			//采购价
			if (JSON.stringify(state.quotationCertificate) == '{}') {
				state.quotationCertificate = {
					Id: '0',
					Kind: state.quotation,
					ProjectId: state.ruleForm.Id,
					ProjectCompanyId: state.projectCompany.Id,
					State: 0,
					AuditState: 0,
					PurchasePrice: 0,
				};
			}
			console.log('保证金', state.bondCertificate);
		};
		const isTimeShow = (firstTime: any, lastTime: any) => {
			let isTime = false;
			if (dateFormat(firstTime, 'YYYY-mm-dd HH:MM:SS') > dateFormat(lastTime, 'YYYY-mm-dd HH:MM:SS')) {
				isTime = true;
			}
			return isTime;
		};
		//上传成功
		const onSuccessTenderFile = (file: UploadFile) => {
			state.tenderImgurl = file.data.src;
			state.tenderFile = state.homeBaseUrl + file.data.src;
		};
		const onSuccessBondFile = (file: UploadFile) => {
			state.bondImgurl = file.data.src;
			state.bondFile = state.homeBaseUrl + file.data.src;
		};
		const getRowFiles = (Files: string) => {
			let fileUrl = '';
			if (Files) {
				let filList = Files.split(',');
				fileUrl = state.homeBaseUrl + filList[0];
			}
			return fileUrl;
		};
		const getRowFilesList = (Files: string) => {
			let showFilList = [];
			if (Files) {
				showFilList = Files.split(',');
				showFilList.forEach((item: any, i: number) => {
					showFilList[i] = state.homeBaseUrl + item;
				});
			}
			return showFilList;
		};
		const tableDataAdd = () => {
			state.tableData.data.push({
				Id: '0',
				State: 0,
				Files: '',
			});
		};
		const onSubmit = async (isSubmit: boolean, mode: string) => {
			if (mode == state.tender) {
				if (state.tenderFile == '') {
					ElMessage.error('请上传标书费凭证');
					return;
				}
			} else if (mode == state.bond) {
				if (state.bondFile == '') {
					ElMessage.error('请上传招标保证金凭证');
					return;
				}
			} else if (mode == state.qualifications) {
				if (state.tableData.data.length == 0) {
					ElMessage.error('请上传投标文件');
					return;
				}
			} else if (mode == state.quotation) {
				if (state.quotationCertificate.PurchasePrice == '' || state.quotationCertificate.PurchasePrice < 0) {
					ElMessage.error('请输入正确的金额');
					return;
				}
			}
			try {
				if (isSubmit) {
					ElMessageBox.confirm(`确定要提交吗?`, '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}).then(async () => {
						let data = [];
						let model = {};
						if (mode == state.tender) {
							model = JSON.parse(JSON.stringify(state.tenderCertificate));
							model.Files = state.tenderImgurl;
							model.State = 1;
							model.AuditState = 0;
							data.push(model);
						} else if (mode == state.bond) {
							model = JSON.parse(JSON.stringify(state.bondCertificate));
							model.Files = state.bondImgurl;
							model.State = 1;
							model.AuditState = 0;
							data.push(model);
						} else if (mode == state.quotation) {
							model = JSON.parse(JSON.stringify(state.quotationCertificate));
							model.State = 1;
							model.AuditState = 0;
							data.push(model);
						} else if (mode == state.qualifications) {
							for (let item of state.tableData.data) {
								let newitem = JSON.parse(JSON.stringify(item));
								newitem.State = 1;
								if (newitem.Name == '') {
									ElMessage.error('请输入文件名称');
									return;
								}
								if (newitem.Files == '') {
									ElMessage.error('请上传文件');
									return;
								}
								newitem.Kind = state.qualifications;
								newitem.ProjectId = state.ruleForm.Id;
								newitem.ProjectCompanyId = state.projectCompany.Id;
								data.push(newitem);
							}
						}
						const res = await proxy.$api.erp.projectcompanylog.addMuit(JSON.parse(JSON.stringify(data)), state.ruleForm.Tid, 0, 2);
						if (res.errcode == 0) {
							ElMessage.success('操作成功');
							GetByIdRow();
						}
					});
				} else {
					let data = [];
					let model = {};
					if (mode == state.tender) {
						model = JSON.parse(JSON.stringify(state.tenderCertificate));
						model.Files = state.tenderImgurl;
						model.State = 0;
						model.AuditState = 0;
						data.push(model);
					} else if (mode == state.bond) {
						model = JSON.parse(JSON.stringify(state.bondCertificate));
						model.Files = state.bondImgurl;
						model.State = 0;
						model.AuditState = 0;
						data.push(model);
					} else if (mode == state.quotation) {
						model = JSON.parse(JSON.stringify(state.quotationCertificate));
						model.State = 0;
						model.AuditState = 0;
						data.push(model);
					} else if (mode == state.qualifications) {
						for (let item of state.tableData.data) {
							let newitem = JSON.parse(JSON.stringify(item));
							newitem.State = 0;
							if (newitem.Name == '') {
								ElMessage.error('请输入文件名称');
								return;
							}
							if (newitem.Files == '') {
								ElMessage.error('请上传文件');
								return;
							}
							newitem.Kind = state.qualifications;
							newitem.ProjectId = state.ruleForm.Id;
							newitem.ProjectCompanyId = state.projectCompany.Id;
							data.push(newitem);
						}
					}
					const res = await proxy.$api.erp.projectcompanylog.addMuit(JSON.parse(JSON.stringify(data)), state.ruleForm.Tid, 0, 2);
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						GetByIdRow();
					}
				}
			} finally {
			}
		};
		const onModelDel = async (id: number, index: number) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				if (id != 0) {
					try {
						const res = await proxy.$api.erp.projectcompanylog.delete(id);
						if (res.errcode != 0) {
							return;
						}
					} finally {
					}
				}
				state.tableData.data.splice(index, 1);
				return false;
			});
		};
		const showImage = (imgUrl: string) => {
			state.imgList = [];
			if (imgUrl != '' && imgUrl) {
				state.imgViewerVisible = true;
				state.imgList.push(state.homeBaseUrl + imgUrl);
			} else {
				ElMessage.error('暂无影印件');
			}
		};
		const onLogoUploadSuccess: UploadProps['onSuccess'] = (res) => {
			if (res.errcode != 0) {
				state.tableData.loading = false;
				ElMessage.error(res.errmsg);
				return;
			}
			state.tableData.data[state.tableDataIndex].Files = res.data.src;
			state.tableData.loading = false;
		};
		const onBeforeImageUpload: UploadProps['beforeUpload'] = () => {
			state.tableData.loading = true;
			return true;
		};
		const Upload = (index: number) => {
			state.tableDataIndex = index;
		};
		const closeImgViewer = () => {
			state.imgViewerVisible = false;
		};
		const changeSelection = () => {
			state.isSelection = false;
			proxy.$parent.isSelection = true;
		};
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			token,
			getUserInfos,
			tableDataAdd,
			onSuccessBondFile,
			onSuccessTenderFile,
			showImage,
			closeImgViewer,
			onSubmit,
			dateFormat,
			onModelDel,
			getRowFilesList,
			getRowFiles,
			changeSelection,
			isTimeShow,
			t,
			GetByIdRow,
			getTimeList,
			onLogoUploadSuccess,
			onBeforeImageUpload,
			Upload,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>