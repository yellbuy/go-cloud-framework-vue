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
									class="upload-demo"
									:action="uploadURL"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onSuccessFile"
									:on-preview="onPreview"
									:on-remove="onRemove"
									:file-list="FilesList"
									:accept:="`image/png, image/jpeg,image/bmp,image/jpg,application/pdf,application/docx,application/doc,application/xls,application/xlsx`"
									multiple
									show-file-list
								>
									<template #default>
										<el-button
											><el-icon class="el-icon--right"><Upload /></el-icon>上传</el-button
										>
									</template>
								</el-upload>
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
								class="upload-demo"
								:action="uploadURL"
								:headers="{ Appid: getUserInfos.appid, Authorization: token }"
								:on-success="onSuccessFile"
								:on-preview="onPreview"
								:on-remove="onRemove"
								:file-list="FilesList"
								:accept:="`image/png, image/jpeg,image/bmp,image/jpg,application/pdf,application/docx,application/doc,application/xls,application/xlsx`"
								multiple
								show-file-list
							>
								<template #default>
									<el-button
										><el-icon class="el-icon--right"><Upload /></el-icon>上传</el-button
									>
								</template>
							</el-upload>
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
						<h3 style="text-align: center">当前选择项目：{{ ruleForm.Name }}</h3>
						<el-descriptions style="margin-top: 20px" :column="2">
							<el-descriptions-item label="项目名称：">{{ ruleForm.Name }}</el-descriptions-item>
							<el-descriptions-item label="项目编号：">{{ ruleForm.No }}</el-descriptions-item>
							<el-descriptions-item label="评选时间：">{{ ruleForm.ReviewTime }}</el-descriptions-item>
							<el-descriptions-item label="评选地点：">{{ ruleForm.Location }} </el-descriptions-item>
						</el-descriptions>
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
			indexLine: 'file',
			activities: [],
			projectCompany: {},
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
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
			state.activities = data;
			//报名开始时间

			console.log(data);
		};
		const isTimeShow = (time: string) => {
			let isTime = false;
			if (time > dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS')) {
				isTime = true;
			}
			return isTime;
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
</style>