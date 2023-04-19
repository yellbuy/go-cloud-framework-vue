<template>
	<div class="el-card is-hover-shadow" v-if="isSelection">
		<el-row :gutter="20" class="mt10 ml10">
			<el-col :span="10" class="mt10">
				<el-timeline>
					<el-timeline-item :timestamp="projectCompany.CreateTime" placement="top" type="success">
						<el-tag class="ml-2" type="success">报名成功</el-tag>
					</el-timeline-item>
					<el-timeline-item placement="top" v-if="projectCompany.State == 0" type="primary" icon="MoreFilled">
						<div v-if="ruleForm.BidFee != 0">
							<span>请上传标书费凭证 ({{ ruleForm.BidFee }}元)</span>
							<div style="width: 50%">
								<el-upload
									class="avatar-uploader"
									:action="uploadURL"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:show-file-list="false"
									:on-success="onSuccessFile"
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
							<el-tag class="ml-2" type="info">无需缴纳标书费</el-tag>
						</div>
					</el-timeline-item>

					<el-timeline-item :timestamp="ruleForm.BeginTime" placement="top" type="info">
						<el-tag type="info" class="ml-2">招标开始</el-tag>
					</el-timeline-item>
					<el-timeline-item placement="top" v-if="projectCompany.State == 1 && isTimeShow(ruleForm.BeginTime)" type="primary" icon="MoreFilled">
						<span>请上传保证金凭证 ({{ ruleForm.BidFee }}元)</span>
						<div style="width: 50%">
							<el-upload
								class="avatar-uploader"
								:action="uploadURL"
								:headers="{ Appid: getUserInfos.appid, Authorization: token }"
								:show-file-list="false"
								:on-success="onSuccessFile"
								:accept:="`image/png, image/jpeg,image/bmp,image/jpg,application/pdf`"
							>
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
							</el-upload>
							<!-- <el-upload
								class="upload-demo"
								:action="uploadURL"
								:headers="{ Appid: getUserInfos.appid, Authorization: token }"
								:on-success="onSuccessFile"
								:on-preview="onPreview"
								:on-remove="onRemove"
								:file-list="tenderFilesList"
								:accept:="`image/png, image/jpeg,image/bmp,image/jpg,application/pdf,application/docx,application/doc,application/xls,application/xlsx`"
								multiple
								show-file-list
							>
								<template #default>
									<el-button
										><el-icon class="el-icon--right"><Upload /></el-icon>上传</el-button
									>
								</template>
							</el-upload> -->
						</div>
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
									<div v-html="ruleForm.Content" v-if="ruleForm.State > 1"></div>
									<span v-else>请先缴纳标书费！</span>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { computed, reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
import type { UploadFile } from 'element-plus';
import { ElMessageBox, ElMessage } from 'element-plus';
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
			homeBaseUrl: import.meta.env.VITE_URL as any,
			tenderCertificate: {}, //标书
			bondCertificate: {}, //保证金
			tender: 'tender',
			bond: 'bond',
		});
		const token = Session.get('token');
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		const { dateFormat } = commonFunction();
		const GetByIdRow = async () => {
			let Id = store.state.project.projectId;
			let companyId = store.state.project.projectCompanyId;
			state.isSelection = true;
			try {
				const res = await proxy.$api.erp.project.signUpDetail(Id, companyId);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data.Project;
				state.projectCompany = res.data.ProjectCompany;
				//处理时间线数据
				getTimeList(res.data.TimeLine);
			} finally {
			}
		};

		const getTimeList = (data: Array) => {
			console.log('执行');
			//处理2个 ， 一个是标书费用 一个是招标保证金
			if (data) {
				for (let item of data) {
					if (item.Kind == state.tender) {
						//标书费用
						state.tenderCertificate = item;
						if (item.Files != '') {
							state.tenderFile = state.homeBaseUrl + item.Files;
							console.log(state.tenderFile);
						}
					} else if (item.Kind == state.bond) {
						//招标保证金
						state.bondCertificate = item;
						if (item.Files != '') {
							state.tenderFile = state.homeBaseUrl + item.Files;
						}
					}
				}
			}
			//标书费用
			if (JSON.stringify(state.tenderCertificate) == '{}') {
				console.log('触发');
				state.tenderCertificate = {
					Id: '0',
					Kind: state.tender,
					Name: state.ruleForm.Name + '标书费',
					ProjectId: state.ruleForm.Id,
					ProjectCompanyId: state.projectCompany.Id,
				};
			}
			//招标保证金
			if (JSON.stringify(state.bondCertificate) == '{}') {
				console.log('触发');
				state.bondCertificate = {
					Id: '0',
					Kind: state.bond,
					Name: state.ruleForm.Name + '招标保证金',
					ProjectId: state.ruleForm.Id,
					ProjectCompanyId: state.projectCompany.Id,
				};
			}
		};
		const isTimeShow = (time: string) => {
			let isTime = false;
			if (time > dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS')) {
				isTime = true;
			}
			return isTime;
		};
		//上传成功
		const onSuccessFile = (file: UploadFile) => {
			state.tenderImgurl = file.data.src;
			state.tenderFile = state.homeBaseUrl + file.data.src;
		};
		const onSubmit = async (isSubmit: boolean, mode: string) => {
			if (mode == state.tender) {
				if (state.tenderFile == '') {
					ElMessage.error('请上传凭证');
					return;
				}
			} else if (mode == state.bond) {
				if (state.tenderFile == '') {
					ElMessage.error('请上传凭证');
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
						if (mode == state.tender) {
							state.tenderCertificate.Files = state.tenderImgurl;
							state.tenderCertificate.State = 1;
							state.tenderCertificate.AuditState = 0;
							data.push(state.tenderCertificate);
						} else if (mode == state.bond) {
							state.bondCertificate.Files = state.tenderImgurl;
							state.bondCertificate.State = 1;
							state.bondCertificate.AuditState = 0;
							data.push(state.tenderCertificate);
						}
						console.log(data);
						const res = await proxy.$api.erp.projectcompanylog.addMuit(JSON.parse(JSON.stringify(data)),state.ruleForm.Tid, 0, 2);
						if (res.errcode == 0) {
							GetByIdRow();
						}
					});
				} else {
					let data = [];
					if (mode == state.tender) {
						console.log(state.tenderCertificate);
						state.tenderCertificate.Files = state.tenderImgurl;
						state.tenderCertificate.State = 0;
						state.tenderCertificate.AuditState = 0;
						data.push(state.tenderCertificate);
					} else if (mode == state.bond) {
						state.bondCertificate.Files = state.tenderImgurl;
						state.bondCertificate.State = 0;
						state.bondCertificate.AuditState = 0;
						data.push(state.tenderCertificate);
					}
					const res = await proxy.$api.erp.projectcompanylog.addMuit(JSON.parse(JSON.stringify(data)),state.ruleForm.Tid, 0, 2);
					if (res.errcode == 0) {
						GetByIdRow();
					}
				}
			} finally {
			}
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
			onSuccessFile,
			onSubmit,
			dateFormat,
			changeSelection,
			isTimeShow,
			t,
			GetByIdRow,
			getTimeList,
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