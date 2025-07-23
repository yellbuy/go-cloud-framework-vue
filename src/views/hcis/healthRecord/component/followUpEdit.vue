<template>
	<div class="sys-hcis-healthRecordEdit-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" destroy-on-close :before-close="closeDialog">
			<template #header>
				<el-text class="mx-1" size="large" type="primary"><h3>{{ title }}</h3></el-text>
			</template>
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="200px" label-suffix="："
				v-loading="loading">
				<el-collapse v-model="activeName" accordion>
					<el-collapse-item title="基本信息" name="person_info">
						<el-row :gutter="20">
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
								<el-form-item label="姓名" prop="Name">
									<el-input v-model="ruleForm.Name" placeholder="姓名"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">

								<el-form-item label="性别" prop="Gender">
									<div mb-2 flex items-center>
										<el-radio-group v-model="ruleForm.Gender">
											<el-radio :label="1">男</el-radio>
											<el-radio :label="2">女</el-radio>
										</el-radio-group>
									</div>

								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
								<el-form-item label="联系方式" prop="Contact">
									<el-input v-model="ruleForm.Contact" placeholder="联系方式"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
								<el-form-item label="出生日期" prop="Birthday" required>
									<el-date-picker v-model="ruleForm.Birthday" type="date" placeholder="出生日期"
										format="YYYY-MM-DD"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
								<el-form-item label="建档日期" prop="RecordTime" required>
									<el-date-picker v-model="ruleForm.RecordTime" type="date" placeholder="建档日期"
										format="YYYY-MM-DD"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
								<el-form-item label="民族" prop="Nation">
									<el-select v-model="ruleForm.Nation" filterable placeholder="请选择">
										<el-option v-for="item in nationList" :key="item.Id" :label="item.Name"
											:value="item.Name"> </el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
								<el-form-item label="身份证号" prop="Idno">
									<el-input v-model="ruleForm.Idno" placeholder="身份证号"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="mb20">
								<el-form-item label="家庭住址" prop="Address">
									<el-input v-model="ruleForm.Address" placeholder="家庭住址"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
								<el-form-item label="文化程度" prop="Education">
									<el-radio-group v-model="ruleForm.Education">
										<el-radio v-for="item in educationList" :key="item.Id"
											:label="item.Code">{{ item.Name }}</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
								<el-form-item label="居住情况（多选）" prop="Resident">
									<el-checkbox-group v-model="ruleForm.ResidentArray">
										<el-checkbox v-for="item in residentList" :key="item.Id" :label="item.Name">{{
											item.Name }}</el-checkbox>
									</el-checkbox-group>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
								<el-form-item label="婚姻状况" prop="Marriage">
									<el-radio-group v-model="ruleForm.Marriage">
										<el-radio v-for="item in marriageList" :key="item.Id"
											:label="item.Code">{{ item.Name }}</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
								<el-form-item label="医疗费用支付方式（多选）" prop="PayMode">
									<el-checkbox-group v-model="ruleForm.PayModeArray">
										<el-checkbox v-for="item in payModeList" :key="item.Id"
											:label="item.Name">{{ item.Name }}</el-checkbox>
									</el-checkbox-group>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
								<el-form-item label="经济来源（多选）" prop="IncomeStream">
									<el-checkbox-group v-model="ruleForm.IncomeStreamArray">
										<el-checkbox v-for="item in incomeStreamList" :key="item.Id"
											:label="item.Name">{{ item.Name }}</el-checkbox>
									</el-checkbox-group>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="信息提供者姓名" prop="Linkman">
									<el-input v-model="ruleForm.Linkman" placeholder="信息提供者的姓名"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
								<el-form-item label="联系电话" prop="Phone">
									<el-input v-model="ruleForm.Phone" placeholder="信息提供者的联系电话"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>
				</el-collapse>
				<el-collapse>
					<el-collapse-item title="一般检查信息" name="record_info">
						<el-row :gutter="20">
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
								<el-form-item label="身高（CM）" prop="Height">
									<el-input-number v-model="ruleForm.Height" :precision="0" :step="10" :min="0"
										:max="300" />
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
								<el-form-item label="体重（KG）" prop="Weight">
									<el-input-number v-model="ruleForm.Weight" :precision="0" :step="5" :min="0"
										:max="1500" />
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
								<el-form-item label="不良生活习惯（多选）" prop="BadHabitArray">
									<el-checkbox-group v-model="ruleForm.BadHabitArray">
										<el-checkbox v-for="item in badHabitList" :key="item.Id"
											:label="item.Name">{{ item.Name }}</el-checkbox>
									</el-checkbox-group>
								</el-form-item>
							</el-col>

						</el-row>
						<el-row>
							<el-col :span="22" :offset="1" class="mb20">
								<el-divider border-style="dashed" content-position="left">近30天内照护风险事件</el-divider>
								<el-row>
									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
										<el-form-item label="跌倒" prop="FallState">
											<el-radio-group v-model="ruleForm.FallState">
												<el-radio :label="0">无</el-radio>
												<el-radio :label="1">发生过1 次</el-radio>
												<el-radio :label="2">发生过2 次</el-radio>
												<el-radio :label="3">发生过3次及以上</el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
										<el-form-item label="走失" prop="LostState">
											<el-radio-group v-model="ruleForm.LostState">
												<el-radio :label="0">无</el-radio>
												<el-radio :label="1">发生过1 次</el-radio>
												<el-radio :label="2">发生过2 次</el-radio>
												<el-radio :label="3">发生过3次及以上</el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
										<el-form-item label="噎食" prop="ChokeState">
											<el-radio-group v-model="ruleForm.ChokeState">
												<el-radio :label="0">无</el-radio>
												<el-radio :label="1">发生过1 次</el-radio>
												<el-radio :label="2">发生过2 次</el-radio>
												<el-radio :label="3">发生过3次及以上</el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
										<el-form-item label="自杀自伤" prop="SuicideState">
											<el-radio-group v-model="ruleForm.SuicideState">
												<el-radio :label="0">无</el-radio>
												<el-radio :label="1">发生过1 次</el-radio>
												<el-radio :label="2">发生过2 次</el-radio>
												<el-radio :label="3">发生过3次及以上</el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
								<el-form-item label="疾病诊断(可多选)">
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithHypertension">高血压病
										I10~I15</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithCoronary">冠心病
										I25</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithPulmonitis">肺炎
										J12~J18</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithPulmonary">慢性阻塞性肺疾病
										J44</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithHch">脑出血
										I60~I62</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithCi">脑梗塞
										I63</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0"
										v-model="ruleForm.WithUti">尿路感染(30天内)</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithPkn">帕金森综合征
										G20~G22</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithCrf">慢性肾衰竭
										N18~N192</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithCirrhosis">肝硬化
										K74</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithDu">消化性溃病
										K20~K31</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithTumour">肿瘤
										CO0~D48</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0"
										v-model="ruleForm.WithAmputation">截肢(6个月内)</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithCataclasis">骨折(3个月内)
										M84</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithEpilepsia">癫痫
										G40</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithPypothyrea">甲状腺功能减退症
										E01~E03</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithCataract">白内障
										H25~H26</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithGlaucoma">青光眼
										H40~H42</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithOsteoporosis">骨质疏松症
										M80~82</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithDementia">痴呆
										F00~F03</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0" v-model="ruleForm.WithDisorder">其他精神和行为障碍
										F04~F99</el-checkbox>
									<el-checkbox :true-label="1" :false-label="0"
										v-model="ruleForm.WithOther">其他疾病</el-checkbox>
								</el-form-item>
								<el-form-item label="其他疾病" prop="WithOtherName">
									<el-input v-model="ruleForm.WithOtherName" placeholder="如有其他疾病请补充"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>
				</el-collapse>
				<el-collapse>
					<el-collapse-item title="附件信息" name="record_info">
						<el-divider content-position="left">附件上传*</el-divider>
						<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20"><el-form-item label="上传附件"
							prop="Files">
							<div class="mt10">
								<el-upload :action="`${baseUrl}/v1/file/upload`" list-type="picture-card"
									:headers="httpHeaders"
									:on-success="onSuccessFile" :file-list="FilesList" :limit="10" :on-remove="onRemove"
									:on-preview="showImage" :before-upload="onBeforeImageUpload">
									<template #default>
										<el-icon>
											<plus />
										</el-icon>
									</template>
								</el-upload>
							</div>
						</el-form-item></el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="视频源" prop="Videos">
							<el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18" >
								<el-input v-model="ruleForm.Videos" placeholder="上传或输入" clearable></el-input>
							</el-col>
							<el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" >
								<el-button type="success" @click="showVideo" v-if="ruleForm.Videos != ''">预览</el-button>
							</el-col>
							<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mr10">
								<div class="mt10">
								<el-upload :action="`${baseUrl}/v1/file/upload`"
									:headers="httpHeaders" :limit="1"
									class="upload-demo" :on-success="onSuccessVideoFile"
									:before-upload="onBeforeVideoUpload"
									:show-file-list="false">
									<el-button type="primary">上传</el-button>
									<template #tip>
										<div class="el-upload__tip">
											仅允许上传MP4格式的视频文件且大小不能超过10M，其他格式的视频文件请上传其他平台并直接输入视频链接地址
										</div>
									</template>
								</el-upload>
							</div>
							</el-col>
						</el-form-item></el-col>
				</el-row>
					</el-collapse-item>
				</el-collapse>
				<el-divider content-position="left">认知障碍测评结果及后续跟进方式*</el-divider>
				<el-card class="box-card mb20" v-for="(val, index) in ruleForm.HealthRecordReviews" :key="index">
					<template #header>
						<div class="card-header">
							<span>{{ ruleForm.Sn + ' - ' + (index + 1) }}</span>
							<el-button type="danger" :icon="Delete" @click="onFollowUpDel(index)" />
						</div>
					</template>
					<el-row :gutter="20" justify="center">
						<el-col :span="12" class="mb20">
							<el-form-item label="测评基准日期" :prop="`HealthRecordReviews[${index}].ReviewDate`"
								:rules="rules.ReviewDate">
								<el-date-picker v-model="val.ReviewDate" type="date" placeholder="测评基准日期"
									format="YYYY-MM-DD"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12" class="mb20">
							<el-form-item label="测评（MoCA）量表测评结果" :prop="`HealthRecordReviews[${index}].Score`"
								:rules="rules.Score">
								<el-input-number v-model="val.Score" :precision="0" :step="5" :min="0" :max="100" />
							</el-form-item>
						</el-col>
						<el-col :span="24" class="mb20">
							<el-form-item label="测评原因" prop="Reason">
								<el-input v-model="val.Reason" placeholder="测评原因"></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="18" class="mb20">
							<el-form-item label="老人后续跟进方式" prop="FollowUpMode">
								<el-radio-group v-model="val.FollowUpMode">
									<el-radio :label="1">转诊医疗机构</el-radio>
									<el-radio :label="2">转接专业照护机构</el-radio>
									<el-radio :label="3">纳入社区认知障碍干预及慢病管理</el-radio>
									<el-radio :label="10">其他</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="6" class="mb20">
							<el-input v-model="val.FollowUpRemark" placeholder="其他后续跟进方式"></el-input>
						</el-col>
						<el-col :span="12" class="mb20">
							<el-form-item label="测评地点" prop="Address">
								<el-input v-model="val.Address" placeholder="测评地点"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" class="mb20">
							<el-form-item label="测评人" prop="ReviewBy">
								<el-input v-model="val.ReviewBy" placeholder="测评人"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

				</el-card>


				<el-row :gutter="30">
					<el-col :span="16" :offset="4" class="mb20" style="text-align: center;">
						<el-button size="large" :icon="Plus" style="width:100%"
							@click="onFollowUpAdd">新增障碍测评结果及后续跟进方式</el-button>
					</el-col>
				</el-row>

			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog" v-if="disable">{{ $t('message.action.close') }}</el-button>
					<el-button text bg @click="closeDialog" v-else>{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-if="!disable"
						v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
							$t('message.action.save')
						}}</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="ImageVisible">
			<img class="dialog-image" w-full :src="dialogImageUrl" alt="Preview Image" />
		</el-dialog>
		<el-dialog v-model="dialogVideoVisible" width="80%">
			<video :src="ruleForm.Videos" controls="true" style="width: 100%;height: 100%;">
			</video>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Delete, Plus } from '@element-plus/icons-vue';
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'healthRecordEdit',
	setup() {

		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		console.log("message.action.add:", t('message.action.add'))
		//文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			state.FilesList.push(image);
			console.log(state.FilesList);
		};
		const onRemove = (file: UploadFile) => {
			console.log(file);
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/image/'), file.url.length);
			for (let i = 0; i < state.Files.length; i++) {
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
			}
		};
		const onSuccessVideoFile = (file: UploadFile) => {
			console.log('触发视频上传', file);
			state.ruleForm.Videos = state.httpsText + file.data.src;
		};
		const showVideo = () => {
			state.dialogVideoVisible = true
		};
		const store = useStore();
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		//显示表格图片
		const showImage: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl = uploadFile.url!
			state.ImageVisible = true
		}

		const state = reactive({
			isShowDialog: false,
			httpHeaders:proxy.$getRequestHeaders(),
			activeName: "person_info",
			title: t('message.action.add'),
			loading: false,
			disable: true, //是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			//表单
			ruleForm: {
				Id: "0",
				Name: '',
				Kind: 'common',
				State: 1,
				FallState: 0,
				LostState: 0,
				ChokeState: 0,
				SuicideState: 0,
				HealthRecordReviews: [],
			},
			dialogImageUrl: "",
			ImageVisible: false,
			dialogVisible: false,
			dialogVideoVisible: false,
			nationList: [],
			educationList: [],
			residentList: [],
			marriageList: [],
			payModeList: [],
			incomeStreamList: [],
			relationshipList: [],
			badHabitList: [],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
			Video: "",
		});
		const token = Session.get('token');

		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			Name: [
				{
					required: true,
					message: computed(() => t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			Gender: [
				{
					required: true,
					message: computed(() => t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			Birthday: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			RecordTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Contact: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Address: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Education: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			ResidentArray: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Marriage: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			PayModeArray: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			IncomeStreamArray: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Height: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Weight: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Score: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			ReviewDate: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		// 打开弹窗
		const openDialog = async (kind: string, id: string, title: string, disable: boolean) => {

			state.Files = [];
			state.ruleForm.Id = id || "0";
			state.ruleForm.Kind = kind;
			if (!id) {
				state.ruleForm.RecordTime = new Date()
			}
			const commonDataParams = { types: 'nation,education,resident,marriage,pay_mode,income_stream,relationship,bad_habit' };
			try {
				const commonListMapRes = await proxy.$api.common.commondata.getBatchListByScope(commonDataParams, 0, 2);
				if (commonListMapRes.errcode == 0) {
					state.nationList = commonListMapRes.data.nation || [];
					state.educationList = commonListMapRes.data.education || [];
					state.residentList = commonListMapRes.data.resident || [];
					state.marriageList = commonListMapRes.data.marriage || [];
					state.payModeList = commonListMapRes.data.pay_mode || [];
					state.incomeStreamList = commonListMapRes.data.income_stream || [];
					state.relationshipList = commonListMapRes.data.relationship || [];
					state.badHabitList = commonListMapRes.data.bad_habit || [];
				} else {
					console.log("error:", commonListMapRes.errmsg)
				}
				
				state.disable = disable;
				if (disable) {
					state.title = t('message.action.see');
				} else if (id && id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.IsExternal = 0;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
			state.title = title;
		};
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.hcis.healthRecord.getById(Id, true);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				state.ruleForm.ResidentArray = state.ruleForm.Resident.split(",")
				state.ruleForm.PayModeArray = state.ruleForm.PayMode.split(",")
				state.ruleForm.IncomeStreamArray = state.ruleForm.IncomeStream.split(",")
				state.ruleForm.BadHabitArray = state.ruleForm.BadHabit.split(",")
				state.Files = state.ruleForm.Pics.split(",");
				state.FilesList = [];
				if (state.ruleForm.Pics != "") {
					for (let i = 0; i < state.Files.length; i++) {
						let image = { url: '', name: '' };
						image.url = state.httpsText + state.Files[i];
						image.name = state.httpsText + state.Files[i];
						state.FilesList.push(image);
					}
				}
			} finally {
				state.isShowDialog = true;
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.ruleForm = {};
			state.ruleForm.ResidentArray = [];
			state.ruleForm.PayModeArray = [];
			state.ruleForm.IncomeStreamArray = [];
			state.ruleForm.BadHabitArray = [];
			state.loading = false;
			state.isShowDialog = false;
			state.Files = [];
			state.FilesList = [];
			state.Video = "";
			onLoadTable();
		};

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};
		const onFollowUpAdd = () => {
			const item = { "Id": "0", "ReviewDate": new Date() };
			if (!state.ruleForm.HealthRecordReviews) {
				state.ruleForm.HealthRecordReviews = [];
			}
			state.ruleForm.HealthRecordReviews.push(item)
		};
		const onFollowUpDel = (index: number) => {
			if (state.ruleForm.HealthRecordReviews && state.ruleForm.HealthRecordReviews.length > index) {
				state.ruleForm.HealthRecordReviews.splice(index, 1)
			}
		}
		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.IsSaveHealthRecordReviews = true; //同时更新认知障碍测评结果及后续跟进方式列表数据
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.IsSaveHealthRecordReviews = true;
					state.ruleForm.Resident = state.ruleForm.ResidentArray.join(",")
					state.ruleForm.PayMode = state.ruleForm.PayModeArray.join(",")
					state.ruleForm.IncomeStream = state.ruleForm.IncomeStreamArray.join(",")
					state.ruleForm.BadHabit = state.ruleForm.BadHabitArray.join(",")
					if (state.Files) {
						state.ruleForm.Pics = state.Files.join(',');
					}
					try {
						const res = await proxy.$api.hcis.healthRecord.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetTableData();
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
			} else if (rawFile.size / 1024 / 1024 > 2) {
				ElMessage.error('允许上传的图片大小不能超过2M');
				return false;
			}
			state.httpHeaders=proxy.$getRequestHeaders();
			return true;
		};
		const onBeforeVideoUpload: UploadProps['beforeUpload'] = (rawFile) => {
			if (
				rawFile.type !== 'video/mp4'
			) {
				ElMessage.error('视频格式错误，只支持的图片格式：mp4');
				return false;
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('允许上传的视频大小不能超过10M');
				return false;
			}
			state.httpHeaders=proxy.$getRequestHeaders();
			return true;
		};
		const { dateFormatYMD } = commonFunction();
		// 页面加载时
		onMounted(() => { });
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			GetByIdRow,
			onSuccessFile,
			onRemove,
			onBeforeImageUpload,
			showImage,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			Plus,
			Delete,
			showVideo,
			onSuccessVideoFile,
			onBeforeVideoUpload,
			onFollowUpAdd,
			onFollowUpDel,
			onSubmit,
			...toRefs(state),
		};
	},
	components: {
		Plus,
	},
	data() {
		return {};
	},
	methods: {},
};
</script>
<style scoped lang="scss">
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.el-select {
	width: 100%;
}

.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	text-align: center;
	padding: 40px;
}</style>