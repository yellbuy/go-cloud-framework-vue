<template>
	<el-card v-if="state.isShowPage">
		<el-row>
			<el-col :span="24" style="padding-top: 20px; padding-bottom: 20px;">
				<el-steps :active="state.activeIndex" align-center>
					<el-step title="发布招标项目"/>
					<el-step title="设置招标信息"/>
					<el-step title="评标参数复核"/>
				</el-steps>
			</el-col>
		</el-row>
		<el-row v-if="state.activeIndex == 1">
			<el-form ref="ruleFormRef" :model="state.projectForm" :rules="rules" size="small" label-width="120px" v-loading="state.projectLoading">
				<el-row>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="项目编号：" prop="No">
							<el-input v-model="state.projectForm.No"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="项目名称：" prop="Name">
							<el-input v-model="state.projectForm.Name"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="项目方式：" prop="ProjectType">
							<el-select v-model="state.projectForm.ProjectType" placeholder="请选择">
								<el-option label="公开招标" :value="1" />
								<el-option label="邀请招标" :value="2" />
								<el-option label="竞争性谈判" :value="3" />
								<el-option label="单一来源采购" :value="4" />
								<el-option label="询价采购" :value="5" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="资格要求：" prop="Qualification">
								<el-input v-model="state.projectForm.Qualification"/>
							</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="标书费用(元)：" prop="BidFee">
							<el-input-number v-model="state.projectForm.BidFee" :min="0" controls-position="right" :precision="2"/>
						</el-form-item>
					</el-col>
					<!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="mb16">
						<el-form-item prop="RemoteState">
							<el-checkbox v-model="state.projectForm.RemoteState" :true-label="1" :false-label="0">视频会议</el-checkbox>
						</el-form-item>
					</el-col> -->
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="评选地点：" prop="Location">
							<el-input v-model="state.projectForm.Location"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb16">
						<el-form-item label="项目内容：" prop="Content">
							<vue-ueditor-wrap
								:editor-id="`editor-content`"
								:editor-dependencies="['ueditor.config.js', 'ueditor.all.min.js', 'xiumi/xiumi-ue-dialog-v5.js', 'xiumi/xiumi-ue-v5.css']"
								v-model="state.projectForm.Content"
								style=" z-index: 1"
								:config="{
									UEDITOR_HOME_URL: '/ueditor/',
									serverUrl: `${state.baseUrl}/v1/common/editor/${getUserInfos.appid}`,
									headers: { Authorization: token, Appid: getUserInfos.appid },
								}" >
							</vue-ueditor-wrap>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<el-row v-else-if="state.activeIndex == 2">
			<el-form ref="ruleFormRef" :model="state.projectForm" :rules="rules" size="small" label-width="120px" v-loading="state.updateLoading">
				<el-row>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb16">
						<el-form-item label="上传标书：" prop="Files">
							<div style="width: 50%">
								<el-upload
									class="upload-demo"
									:action="state.uploadURL"
									:accept:="`image/png, image/jpeg,image/bmp,image/jpg,application/pdf,application/docx,application/doc,application/xls,application/xlsx`"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onSuccessFile"
									:on-remove="onRemove"
									:limit="1"
									:file-list="state.FilesList">
									<template #default>
										<el-button>
											<el-icon class="el-icon--right">
												<Upload />
											</el-icon>
											上传
										</el-button>
									</template>
								</el-upload>
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="项目包个数" prop="Location">
							<el-input v-model="state.projectForm.Number"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<div style="float: right;">
							<el-button size="small" type="primary" @click="onProjectLineDialog(true)" class="mb16">添加品目</el-button>
						</div>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb16">
						<el-table :data="state.projectLineTableData.data" v-loading="state.projectLineTableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="70" fixed />
							<el-table-column prop="No" label="品目号" width="120" show-overflow-tooltip/>
							<el-table-column prop="Name" label="设备名称" show-overflow-tooltip/>
							<el-table-column prop="Remark" label="备注" show-overflow-tooltip/>
							<el-table-column prop="Qty" label="数量" show-overflow-tooltip/>
							<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
								<template #default="scope">
									<el-button text bg type="primary" @click="onProjectLineDialog(false, scope.row, scope.$index)">编辑</el-button>
									<el-button text bg type="danger" @click="delProjectLine(scope.$index)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="报名开始时间：" prop="StartTime" required>
							<el-date-picker v-model="state.projectForm.StartTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="报名结束时间：" prop="EndTime" required>
							<el-date-picker v-model="state.projectForm.EndTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="投标开始时间：" prop="BeginTime" required>
							<el-date-picker v-model="state.projectForm.BeginTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="投标结束时间：" prop="FinishTime" required>
							<el-date-picker v-model="state.projectForm.FinishTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
						<el-form-item label="评选时间：" prop="ReviewTime" required>
							<el-date-picker v-model="state.projectForm.ReviewTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20" v-if="state.projectForm.ProjectType == 1">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						<el-form-item>
							<a style="font-size: 20px; padding-top: 20px; padding-bottom: 20px;">注意：如果此公开比选项目不足三家供应商参与，是否自动转为竞争性谈判项目？</a>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						<el-form-item prop="AutoSwitchState">
							<el-checkbox v-model="state.projectForm.AutoSwitchState" :true-label="1" :false-label="0">不足三家供应商参与，比选方式转换为竞争性谈判项目</el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-dialog v-model="state.isShowProjectLineDialog" title="品目信息" :destroy-on-close="true"  width="40%" :before-close="closeProjectLineDialog">
				<el-divider content-position="left">品目信息</el-divider>
				<el-form ref="ruleFormRef" :model="state.projectLineForm" :rules="rules" size="small" label-width="130px" v-loading="state.projectLineLoading">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
							<el-form-item label="品目号：" prop="No">
								<el-input v-model="state.projectLineForm.No" placeholder="品目号"/>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
							<el-form-item label="名称：" prop="Name">
								<el-input v-model="state.projectLineForm.Name" placeholder="名称"/>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
							<el-form-item label="数量：" prop="Qty">
								<el-input-number v-model="state.projectLineForm.Qty" :min="0" controls-position="right" style="width: 100%;"/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb10">
							<el-form-item label="备注：" prop="Remark">
								<el-input v-model="state.projectLineForm.Remark" placeholder="备注"/>
							</el-form-item>
						</el-col>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button text bg @click="closeProjectLineDialog">取消</el-button>
						<el-button text bg type="primary" @click="submitProjectLine">确定</el-button>
					</span>
				</template>
			</el-dialog>
		</el-row>
		<el-row v-else-if="state.activeIndex == 3">
			<!-- <el-row>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-form-item label="请选择当前项目包号：">
						<el-select v-model="projectLineIndex" placeholder="请选择" @change="changeLine">
							<el-option
								v-if="project.ProjectLineList && project.ProjectLineList.length > 0"
								v-for="item in project.ProjectLineList"
								:key="item.Id"
								:label="item.Name"
								:value="item.Id"/>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row> -->
			<el-tabs v-model="state.activeName" type="card" class="demo-tabs" style="width: 100%;" @tab-change="state.activeName">
				<el-tab-pane label="资格评审" name="zgps">
					<el-form :model="state.zgTableData.param" label-width="60px" :inline="true" style="margin-bottom: 10px;">
						<el-form-item>
							<el-button type="primary" @click="onSettingDialog(state.activeName, true)">创建</el-button>
							<el-button text bg type="info" @click="onGetSettingTableData()">恢复默认</el-button>
						</el-form-item>
					</el-form>
					<el-table :data="state.zgTableData.data" v-loading="state.zgTableData.loading" :height="proxy.$calcMainHeight(-240)" style="width: 100%" border stripe highlight-current-row>
						<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed />
						<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
						<el-table-column prop="State" label="评分方式" width="120" show-overflow-tooltip>
							<template #default="scope">
								<div v-if="scope.row.State === 0" style="display: flex; align-items: center;">
									<span style="color: green; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
									<span >通过</span>
								</div>
								<div v-else-if="scope.row.State === 1" style="display: flex; align-items: center;">
									<span style="color: red; font-size: 30px; margin-right: 10px; margin-left: 10px;">&bull;</span>
									<span>不通过</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
							<template #default="scope">
								<el-button type="primary" @click="onSettingDialog(false, scope.row, scope.$index)">编辑</el-button>
								<el-button text bg type="danger" @click="onDelSetting(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="技术评审" name="jsps">
					<el-form :model="state.jsTableData.param" label-width="60px" :inline="true" style="margin-bottom: 10px;">
						<el-form-item>
							<el-button type="primary" @click="onSettingDialog(true)">创建</el-button>
							<el-button text bg type="info" @click="onGetSettingTableData()">恢复默认</el-button>
						</el-form-item>
					</el-form>
					<el-table :data="state.jsTableData.data" style="width: 100%" v-loading="state.jsTableData.loading" :height="proxy.$calcMainHeight(-240)" border stripe highlight-current-row>
						<el-table-column type="index" label="序号" width="70" align="right" show-overflow-tooltip fixed/>
						<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
						<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
						<el-table-column prop="TechnicalMaxScore" label="最高评分" show-overflow-tooltip />
						<el-table-column fixed="right" :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" show-overflow-tooltip>
							<template #default="scope">
								<el-button type="primary" @click="onSettingDialog(false, scope.row, scope.$index)">编辑</el-button>
								<el-button text bg type="danger" @click="onDelSetting(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="经济评审" name="jjps">
					<el-form ref="jjFormRef" :model="state.jjForm" size="small">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
							<el-form-item label="采购控制价：" prop="PurchasePrice">
								<el-input-number
									v-model="state.jjForm.PurchasePrice"
									:min="0"
									controls-position="right"
									:precision="2"/>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
							<el-form-item label="价格评审得分策略：">
								<el-radio-group v-model="state.jjForm.ScoreMode">
									<el-radio :label="0">价格排名打分</el-radio>
									<el-radio :label="1">基础价格打分</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
							<div class="mb20">评审价格从低至高排列（最低价为第一名），第一名供应商价格得分为满分；</div>
							<div class="mb20">
								从第二名起，价格得分减少
								<span>
									<el-input-number
										v-model="state.jjForm.PriceScore"
										:min="0"
										:max="100"
										controls-position="right"/>
								</span>
								分。超出采购控制价的供应商得零分。
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" :offset="1">
							<div class="mb20">
								价格评审最高分的
								<span>
									<el-input-number
										v-model="state.jjForm.PricePercentage"
										:min="0"
										:max="100"
										controls-position="right"/>
								</span>
								%为基础价格得分;
							</div>
							<div class="mb20">
								评审报价比招标控制价每下浮1个百分点，则得分增加
								<span>
									<el-input-number
										v-model="state.jjForm.QualificationScore"
										:min="0"
										:max="100"
										controls-position="right"/>
								</span>
								分;
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :offset="1" class="mb20">
							<div class="mb20">本项目技术评审最高分：{{ state.jjForm.TechnicalScore }}分，最终评审价格最高分：{{ state.jjForm.TechnicalMaxScore }} 分。</div>
							<div class="mb20">如需修改请返回调整技术评审各得分项。</div>
						</el-col>
					</el-row>
				</el-form>
				</el-tab-pane>
			</el-tabs>
			<el-dialog :title="state.settingTitle" v-model="state.isShowSettingDialog" width="25%" :before-close="closeSettingDialog">
				<el-form ref="ruleFormRef" :model="state.settingForm" :rules="rules" size="small" label-width="130px" v-loading="state.settingLoading">
					<el-form-item label="评审内容" prop="Content">
						<el-input v-model="state.settingForm.Content"/>
					</el-form-item>
					<el-form-item label="评审标准" prop="Standard">
						<el-input v-model="state.settingForm.Standard" type="textarea"/>
					</el-form-item>
					<el-form-item label="最高评分" prop="TechnicalMaxScore" v-if="state.activeName == 'jsps'">
						<el-input-number v-model="state.settingForm.TechnicalMaxScore" :min="0" controls-position="right" :precision="1" style="width: 100%;"/>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button text bg type="primary" @click="closeSettingDialog">取消</el-button>
						<el-button type="primary" @click="submitSetting()" >确定</el-button>
					</span>
				</template>
			</el-dialog>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="mt20">
					<span style="float: right; padding-bottom: 20px; padding-right: 20px;">
						<el-button text bg type="info" @click="onCancel">取消</el-button>
						<el-button v-if="state.activeIndex > 1" type="primary" @click="stepChange(-1)">上一步</el-button>
						<el-button v-if="state.activeIndex < 3" type="primary" @click="stepChange(1)">下一步</el-button>
						<el-button v-if="state.activeIndex == 3" text bg type="info" @click="onSubmit()">完成</el-button>
					</span>
				</div>
			</el-col>
		</el-row>
	</el-card>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session } from '/@/utils/storage';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import commonFunction from '/@/utils/commonFunction';
import { useI18n } from 'vue-i18n';
import { number } from 'echarts';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';

const store = useStore();
const route = useRoute();
const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const moduleKey = proxy.$parent.moduleKey;
const token = Session.get('token');
const getUserInfos = computed(() => {return store.state.userInfos.userInfos;});
const scopeMode = route.params.scopeMode || 0;
const scopeValue = route.params.scopeValue || 0;
const state = reactive({
	baseUrl: import.meta.env.VITE_API_URL,
	httpsText: import.meta.env.VITE_URL as any,
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	moduleKey,
	token: token,
	isShowPage: false,
	activeName:"zgps",
	activeIndex: 1,
	isShowProjectLineDialog: false,
	isShowSettingDialog: false,
	projectLineTitle: t('message.action.add'),
	settingTitle: t('message.action.add'),
	projectLoading: false,
	projectLineLoading: false,
	updateLoading: false,
	settingLoading:false,
	isAdd: true,
	index: 0,
	FilesList: [],
	projectForm: {
		No: "",
		Name: "",
		Files: "",
		ProjectType: 1,
		Qualification: "",
		BidFee: 0,
		Location: "",
		Content: "",
		Number: 0,
		StartTime: "",
		EndTime: "",
		BeginTime: "",
		FinishTime: "",
		ReviewTime: "",
		AutoSwitchState: 0,
	},
	projectLineTableData:{
		kind: "bid",
		data: [],
		loading: false,
	},
	projectLineForm: {
		Id: "",
		Kind: "",
		No: "",
		Name: "",
		Qty: 0,
		Remark: "",
	},
	zgTableData: {
		data: [],
		loading: false,
		param: {
			kind: 'zgps',
			pageIndex: 1,
			pageSize: 10000,
		},
	},
	jsTableData: {
		data: [],
		loading: false,
		param: {
			kind: 'jsps',
			pageIndex: 1,
			pageSize: 10000,
		},
	},
	jjForm: {
		Id: "",
		Kind: "",
		PurchasePrice: 0,
		ScoreMode: 0,
		PriceScore: 0,
		PricePercentage: 0,
		QualificationScore: 0,
		TechnicalScore: 0,
		TechnicalMaxScore: 0,
	},
	settingForm: {
		Id: "",
		Kind: "",
		ProjectSettingId: "",
		Content: "",
		Standard: "",
		TechnicalMaxScore: 0,
	},
	ruleForm: {
		Kind: "",
		ProjectSettingLineList: [],
		ProjectLineList: [],
	},
});

const startTimeRule = (rule: any, value: any, callback: any) => {
	switch (rule.field) {
		case 'StartTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value >= state.projectForm.EndTime) {
				callback(new Error('报名开始时间应小于报名结束时间'));
			} else {
				callback();
			}
			break;
		case 'EndTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.projectForm.StartTime) {
				callback(new Error('报名结束时间应大于于报名开始时间'));
			} else {
				callback();
			}
			break;
		case 'BeginTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.projectForm.EndTime) {
				callback(new Error('招标开始时间应大于报名结束时间'));
			} else if (value >= state.projectForm.FinishTime) {
				callback(new Error('招标开始时间应小于招标结束时间'));
			} else {
				callback();
			}
			break;
		case 'FinishTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.projectForm.BeginTime) {
				callback(new Error('招标结束时间应大于招标开始时间'));
			} else {
				callback();
			}
			break;
		case 'ReviewTime':
			if (value == '') {
				callback(new Error('请选择时间'));
			} else if (value <= state.projectForm.FinishTime) {
				callback(new Error('评选时间应大于招标结束时间'));
			} else {
				callback();
			}
			break;
	}
};

const rules = reactive({
	isShowPage: false,
	No: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Name: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	ProjectType: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Content: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	StartTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	EndTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	BeginTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	FinishTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
	ReviewTime: [{ validator: startTimeRule, required: true, trigger: 'blur' }],
});

//	打开页面
const openPage = async (id: number) => {
	// if (id != 0) {
	// 	state.jsTableData.loading = true;
	// 	try {
	// 		const res = await proxy.$api.erp.project.getById(id);
	// 		if (res.errcode != 0) {
	// 			return;
	// 		}
	// 		state.projectForm = res.date
	// 		state.isShowPage = true
	// 	} finally {
	// 		state.jsTableData.loading = false;
	// 	}
	// }
	state.isShowPage = true
};

//	上一步下一步切换
const stepChange = (val: number) => {
	let activeIndex=state.activeIndex+val
	if(activeIndex<1){
		activeIndex=1
	} else if(activeIndex>3){
		activeIndex=3
	}
	state.activeIndex=activeIndex
};

//	上传成功
const onSuccessFile = (file: UploadFile) => {
	state.FilesList.push(file.data)
	state.projectForm.Files = file.data.src
};

//	删除上传文件
const onRemove = () => {
	state.FilesList = []
	state.projectForm.Files = ''
};

//	打开品目编辑弹窗
const onProjectLineDialog = async (isAdd: boolean, row: object, index: number) => {
	state.projectLineForm = {};
	state.isAdd = isAdd
	if (isAdd) {
		state.projectLineForm.Id = "0";
		state.projectLineForm.Kind = state.projectLineTableData.kind;
		state.projectLineTitle = t('message.action.add');
	} else {
		state.index = index;
		state.projectLineForm = JSON.parse(JSON.stringify(row));
		state.projectLineForm.Kind = state.projectLineTableData.kind;
		state.projectLineTitle = t('message.action.edit');
	}
	state.isShowProjectLineDialog = true;
};

//	删除品目
const delProjectLine = (index: number) => {
	state.projectLineTableData.data.splice(index, 1);
};

//	关闭品目编辑弹窗
const closeProjectLineDialog = () => {
	state.projectLineForm = {}
	state.index = 0
	state.isAdd = true
	state.projectLineLoading = false;
	state.isShowProjectLineDialog = false;
};

//	确定品目
const submitProjectLine = () => {
	if (state.isAdd) {
		state.projectLineTableData.data.push(state.projectLineForm)
	}else{
		state.projectLineTableData.data[state.index] = state.projectLineForm
	}
	closeProjectLineDialog()
};

//	打开评审参数编辑弹窗
const onSettingDialog = async (isAdd: boolean, row: object, index: number) => {
	state.settingForm = {};
	state.isAdd = isAdd
	if (isAdd && state.activeName == 'zgps') {
		state.settingForm.Id = "0";
		state.settingForm.Kind = state.activeName;
		state.settingTitle = t('message.action.add');
	} else if (isAdd && state.activeName == 'jsps') {
		state.settingForm.Id = "0";
		state.settingForm.Kind = state.activeName;
		state.settingTitle = t('message.action.add');
	} else if (!isAdd && state.activeName == 'zgps') {
		state.index = index;
		state.settingForm = JSON.parse(JSON.stringify(row));
		state.settingForm.Kind = state.activeName;
		state.settingTitle = t('message.action.edit');
	} else if (!isAdd && state.activeName == 'jsps') {
		state.index = index;
		state.settingForm = JSON.parse(JSON.stringify(row));
		state.settingForm.Kind = state.activeName;
		state.settingTitle = t('message.action.edit');
	} else {
		return
	}
	state.isShowSettingDialog = true;
};

//	计算得分
const getScore = () => {
	if (state.jsTableData.data && state.jsTableData.data.length > 0) {
		state.jjForm.TechnicalScore = 0;
		for (let item of state.jsTableData.data) {
			state.jjForm.TechnicalScore += item.TechnicalMaxScore;
		}
		state.jjForm.TechnicalMaxScore = 100 - state.jjForm.TechnicalScore;
	}
};

//	删除评审参数
const onDelSetting = (index: number) => {
	switch (state.activeName) {
		case 'zgps':
			state.zgTableData.data.splice(index, 1);
			break
		case 'jsps':
			state.jsTableData.data.splice(index, 1);
			break
	}
	getScore()
};

//	关闭评审参数编辑弹窗
const closeSettingDialog = () => {
	state.settingForm = {};
	state.index = 0
	state.isAdd = true
	state.settingLoading = false;
	state.isShowSettingDialog = false;
};

//	确定评审参数
const submitSetting = () => {
	switch (state.activeName) {
		case 'zgps':
			if (state.isAdd) {
				state.zgTableData.data.push(state.settingForm)
			}else{

				state.zgTableData.data[state.index] = state.settingForm
			}
			closeSettingDialog()
			break
		case 'jsps':
			if (state.isAdd) {
				state.jsTableData.data.push(state.settingForm)
			}else{
				state.jsTableData.data[state.index] = state.settingForm
			}
			closeSettingDialog()
			break
	}
	getScore()
};

//	关闭创建页面
const onCancel = () => {
	state.isShowPage = false
	proxy.$parent.isShowPage = true
	state.activeIndex = 1
	state.FilesList = []
	state.projectLineTableData.data = []
	state.zgTableData.data = []
	state.jsTableData.data = []
	state.projectForm = {}
	state.projectLineForm = {}
	state.settingForm = {}
	state.jjForm = {}
	state.ruleForm = {}
};

//	确定提交创建项目
const onSubmit = () => {
	state.ruleForm = state.projectForm
	state.ruleForm.ProjectLineList = []
	state.ruleForm.ProjectSettingLineList = []
	if (state.projectLineTableData.data.length > 0) {
		for (let item of state.projectLineTableData.data) {
			item.Id = "0"
			item.Kind = 'bid'
			state.ruleForm.ProjectLineList.push(item);
		}
	}
	if (state.zgTableData.data.length > 0) {
		for (let item of state.zgTableData.data) {
			item.Id = "0"
			item.Kind = 'zgps'
			state.ruleForm.ProjectSettingLineList.push(item);
		}
	}
	if (state.jsTableData.data.length > 0) {
		for (let item of state.jsTableData.data) {
			item.Id = "0"
			item.Kind = 'jsps'
			state.ruleForm.ProjectSettingLineList.push(item);
		}
	}
	state.jjForm.Id = "0"
	state.jjForm.Kind = 'jjps'
	state.ruleForm.ProjectSettingLineList.push(state.jjForm)

	try {
		state.ruleForm.Kind = "bid"
		const res = proxy.$api.erp.project.saveBid(state.ruleForm);
		if (res.errcode == 0) {
			return
		}

	} finally {
	}
	onCancel()
};

//获取评审参数模版列表
const onGetSettingTableData = async () => {
	switch (state.activeName){
		case "zgps":
			state.zgTableData.loading = true;
			try {
				state.zgTableData.data = []
				const res = await proxy.$api.erp.projectsetting.getListByScope(scopeMode, scopeValue, state.zgTableData.param);
				console.log("测试", res.data[0].Id)
				if (res.errcode == 0) {
					for (let index = 0; index < res.data.length; index++) {
						state.settingForm = {}
						state.settingForm.Id = "0"
						state.settingForm.Kind = state.activeName
						state.settingForm.ProjectSettingId = res.data[index].Id
						state.settingForm.Content = res.data[index].Content
						state.settingForm.Standard = res.data[index].Standard
						state.zgTableData.data.push(state.settingForm)
					}
				}
			} finally {
				state.zgTableData.loading = false;
			}
			break;
		case "jsps":
			state.jsTableData.loading = true;
			try {
				state.jsTableData.data = []
				const res = await proxy.$api.erp.projectsetting.getListByScope(scopeMode, scopeValue, state.jsTableData.param);
				if (res.errcode != 0) {
					return;
				}
				for (let index = 0; index < res.data.length; index++) {
					state.settingForm = {}
					state.settingForm.Id = "0"
					state.settingForm.Kind = state.activeName
					state.settingForm.ProjectSettingId = res.data[index].Id
					state.settingForm.Content = res.data[index].Content
					state.settingForm.Standard = res.data[index].Standard
					state.settingForm.TechnicalMaxScore = res.data[index].TechnicalMaxScore
					state.jsTableData.data.push(state.settingForm)
				}
				getScore()
			} finally {
				state.jsTableData.loading = false;
			}
			break;
	}
};

// 时间格式
const { dateFormat } = commonFunction();

// 页面加载时
onMounted(() => {});

defineExpose({openPage})
</script>
<style scoped lang="scss">
</style>