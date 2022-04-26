<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" :key="ruleForm.Id" destroy-on-close width="80%">
			<el-form ref="ruleFormRef" :model="ruleForm" label-width="90px" v-loading="loading">
				<table class="yb-table" style="width: 100%">
					<thead>
						<th width="8%" />
						<th width="12%" />
						<th width="8%" />
						<th width="12%" />
						<th width="8%" />
						<th width="12%" />
						<th width="7%" />
						<th width="13%" />
						<th width="7%" />
						<th width="13%" />
					</thead>
					<tbody>
						<tr>
							<td class="bg-gray text-right">报案号</td>
							<td>{{ ruleForm.CaseNo }}</td>
							<td class="bg-gray text-right">委托单位</td>
							<td colspan="3">{{ ruleForm.TName }}</td>
							<td class="bg-gray text-right">委托人</td>
							<td>{{ ruleForm.UName }}</td>
							<td class="bg-gray text-right">委托时间</td>
							<td>{{ ruleForm.CaseCreateTime == '0001-01-01 00:00:00' ? '-' : ruleForm.CaseCreateTime }}</td>
						</tr>
						<tr>
							<td class="bg-gray text-right">伤者姓名</td>
							<td>{{ ruleForm.PersonName }}</td>
							<td class="bg-gray text-right">联系电话</td>
							<td>{{ ruleForm.PersonTel }}</td>
							<td class="bg-gray text-right">性别</td>
							<td>{{ ruleForm.PersonGender == 1 ? '男' : ruleForm.PersonGender == 2 ? '女' : '-' }}</td>
							<td class="bg-gray text-right">年龄</td>
							<td>{{ ruleForm.PersonAge }}</td>
							<td class="bg-gray text-right">民族</td>
							<td>{{ ruleForm.PersonNation }}</td>
						</tr>
						<tr>
							<td class="bg-gray text-right">委托类别</td>
							<td v-if="ruleForm.CaseType == 1">门诊就医</td>
							<td v-else-if="ruleForm.CaseType == 2">住院非手术</td>
							<td v-else-if="ruleForm.CaseType == 3">住院手术</td>
							<td v-else-if="ruleForm.CaseType == 10">死亡</td>
							<td class="bg-gray text-right">委托事项</td>
							<td v-if="ruleForm.CaseMode == 1">估损</td>
							<td v-else-if="ruleForm.CaseMode == 2">核损</td>
							<td v-else-if="ruleForm.CaseMode == 10">鉴定</td>
							<td class="bg-gray text-right">出险时间</td>
							<td >{{ proxy.$utils.dateFormat(ruleForm.CaseTime,"yyyy-mm-dd") }}</td>
							<td colspan="4"></td>
						</tr>
						<tr>
							<td class="bg-gray text-right">委托内容</td>
							<td colspan="9" class="check-box">
								<el-checkbox v-model="ruleForm.MedicalDiagnosisState" @change="disableChange('MedicalDiagnosisState')" :true-label="1" :false-label="0"
								v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2" :disabled="!editMode">*医学诊断审查</el-checkbox>
								<!-- <checkTag
									:checked="ruleForm.MedicalDiagnosisState > 0"
									v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2"
									title="医学诊断审查"
								></checkTag> -->
								<!-- <checkTag
									:checked="ruleForm.InjuryRelationState > 0"
									v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2"
									title="伤病关系审查"
								></checkTag> -->
								<el-checkbox v-model="ruleForm.InjuryRelationState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2" :disabled="!editMode">伤病关系审查</el-checkbox>
								<!-- <checkTag
									:checked="ruleForm.InjuryDiscernState > 0"
									v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2"
									title="新旧伤鉴别"
								></checkTag> -->
								<el-checkbox v-model="ruleForm.InjuryDiscernState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2" :disabled="!editMode">新旧伤鉴别</el-checkbox>

								<!-- <checkTag :checked="ruleForm.AppraisalOpportunityState > 0" v-if="ruleForm.CaseMode == 2" title="鉴定时机推荐"></checkTag> -->
								<el-checkbox v-model="ruleForm.AppraisalOpportunityState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 2" :disabled="!editMode">鉴定时机推荐</el-checkbox>
								<!-- <checkTag
									:checked="ruleForm.DisabilityAssessState > 0"
									v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2"
									title="伤残评估"
								></checkTag> -->
								<el-checkbox v-model="ruleForm.DisabilityAssessState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2" :disabled="!editMode">伤残评估</el-checkbox>

								<el-checkbox v-model="ruleForm.ThirdPhaseState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2" 
								@change="disableChange('ThirdPhaseState')" :disabled="!editMode">*三期评估</el-checkbox>

								<!-- <checkTag :checked="ruleForm.ThirdPhaseState > 0" v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2" title="三期评估"></checkTag> -->

								<el-checkbox v-model="ruleForm.NurseRelyState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 2" :disabled="!editMode">护理依赖评估</el-checkbox>
								<!-- <checkTag :checked="ruleForm.NurseRelyState > 0" v-if="ruleForm.CaseMode == 2" title="护理依赖评估"></checkTag> -->
								<el-checkbox v-model="ruleForm.MedicalSourceState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 2" :disabled="!editMode">医源性介入因素审查</el-checkbox>
								<!-- <checkTag :checked="ruleForm.MedicalSourceState > 0" v-if="ruleForm.CaseMode == 2" title="医源性介入因素审查"></checkTag> -->

								<el-checkbox v-model="ruleForm.RealExamState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 10" :disabled="!editMode">真实性审查</el-checkbox>
								<!-- <checkTag :checked="ruleForm.RealExamState > 0" v-if="ruleForm.CaseMode == 10" title="真实性审查"></checkTag> -->

								<el-checkbox v-model="ruleForm.LegalExamState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 10" :disabled="!editMode">合法性审查</el-checkbox>
								<!-- <checkTag :checked="ruleForm.LegalExamState > 0" v-if="ruleForm.CaseMode == 10" title="合法性审查"></checkTag> -->
								<el-checkbox v-model="ruleForm.CorrelationExamState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 10" :disabled="!editMode">关联性审查</el-checkbox>
								<!-- <checkTag :checked="ruleForm.CorrelationExamState > 0" v-if="ruleForm.CaseMode == 10" title="关联性审查"></checkTag> -->
								<!-- <checkTag :checked="ruleForm.CompleteExamState > 0" v-if="ruleForm.CaseMode == 10" title="完整性审查"></checkTag> -->
								<el-checkbox v-model="ruleForm.CompleteExamState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 10" :disabled="!editMode">充分性审查</el-checkbox>
								<!-- <checkTag :checked="ruleForm.SufficiencyExamState > 0" v-if="ruleForm.CaseMode == 10" title="充分性审查"></checkTag> -->
								<!-- <checkTag :checked="ruleForm.TechniqueExamState > 0" v-if="ruleForm.CaseMode == 10" title="技术规范性审查"></checkTag> -->
								<el-checkbox v-model="ruleForm.TechniqueExamState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 10" :disabled="!editMode">技术规范性审查</el-checkbox>
								<el-checkbox v-model="ruleForm.StandardExamState" :true-label="1" :false-label="0" 
								v-if="ruleForm.CaseMode == 10" :disabled="!editMode">标准适用性审查</el-checkbox>

								<!-- <checkTag :checked="ruleForm.StandardExamState > 0" v-if="ruleForm.CaseMode == 10" title="标准适用性审查"></checkTag> -->
								<el-checkbox v-model="ruleForm.OtherState" :true-label="1" :false-label="0" 
								v-if="ruleForm.OtherState > 0" :disabled="!editMode">其他({{ruleForm.OtherTitle}}</el-checkbox>
								<!-- <checkTag :checked="ruleForm.OtherState > 0" v-if="ruleForm.OtherState > 0" :title="`其他(${ruleForm.OtherTitle})`"></checkTag> -->
							</td>
						</tr>
						<tr>
							<td colspan="1" class="bg-gray text-right">简要案情</td>
							<td colspan="9">{{ ruleForm.CaseContent }}</td>
						</tr>
						<tr v-if="ruleForm.Pics">
							<td colspan="1" class="bg-gray text-right">案情照片</td>
							<td colspan="9"><imgList :ids="ruleForm.Pics"></imgList></td>
						</tr>

						<tr v-if="ruleForm.MedicalDiagnosisPics">
							<td class="bg-gray text-right">诊断证明书</td>
							<td colspan="9">
								<imgList :ids="ruleForm.MedicalDiagnosisPics"></imgList>
							</td>
						</tr>
						<tr v-if="ruleForm.CaseType == 1 && ruleForm.MedicalRecordPics">
							<td class="bg-gray text-right">门急诊病历</td>
							<td colspan="9">
								<imgList :ids="ruleForm.MedicalRecordPics"></imgList>
							</td>
						</tr>
						<tr v-if="(ruleForm.CaseType == 2 || ruleForm.CaseType == 3 || ruleForm.CaseType == 10) && ruleForm.InHospitalPics">
							<td class="bg-gray text-right">住院记录（或首程病志）</td>
							<td colspan="9">
								<imgList :ids="ruleForm.InHospitalPics"></imgList>
							</td>
						</tr>
						<tr v-if="(ruleForm.CaseType == 2 || ruleForm.CaseType == 3) && ruleForm.LeaveHospitalPics">
							<td class="bg-gray text-right">出院记录</td>
							<td colspan="9">
								<imgList :ids="ruleForm.LeaveHospitalPics"></imgList>
							</td>
						</tr>
						<tr v-if="ruleForm.CaseType == 10 && ruleForm.DeathRecordPics">
							<td class="bg-gray text-right">死亡记录</td>
							<td colspan="9">
								<imgList :ids="ruleForm.DeathRecordPics"></imgList>
							</td>
						</tr>
						<tr v-if="ruleForm.CaseType == 10 && ruleForm.SurgeryPics">
							<td class="bg-gray text-right">行手术治疗的需提供手术记录</td>
							<td colspan="9">
								<imgList :ids="ruleForm.SurgeryPics"></imgList>
							</td>
						</tr>
						<tr v-if="ruleForm.IconographyPics">
							<td class="bg-gray text-right">影像学资料</td>
							<td colspan="9">
								<imgList :ids="ruleForm.IconographyPics"></imgList>
							</td>
						</tr>
						<tr v-if="ruleForm.InspectionReportPics">
							<td class="bg-gray text-right">检查报告单</td>
							<td colspan="9">
								<imgList :ids="ruleForm.InspectionReportPics"></imgList>
							</td>
						</tr>

						<tr v-if="ruleForm.OtherPics">
							<td class="bg-gray text-right">补充材料</td>
							<td colspan="9">
								<imgList :ids="ruleForm.OtherPics"></imgList>
							</td>
						</tr>
						<tr v-if="0">
							<td class="bg-gray text-right">基本案情</td>
							<td colspan="9" v-if="allowEdit()">
								<el-input v-model="ruleForm.ExpertAuditTitle" type="textarea" />
							</td>
							<td colspan="9" v-if="!allowEdit()">
								{{ ruleForm.ExpertAuditTitle }}
							</td>
						</tr>
						<tr v-if="ruleForm.CaseMode==1 || ruleForm.CaseMode==2">
							<td class="bg-gray text-right">委托材料</td>
							<td colspan="9" v-if="allowEdit()">
								<el-input v-model="ruleForm.ExpertAuditMaterial" type="textarea" />
							</td>
							<td colspan="9" v-else>
								{{ ruleForm.ExpertAuditMaterial }}
							</td>
						</tr>
						<tr v-if="ruleForm.CaseMode==1 || ruleForm.CaseMode==2">
							<td class="bg-gray text-right">医学诊断</td>
							<td colspan="9" v-if="allowEdit()">
								<el-input v-model="ruleForm.ExpertAuditDiagnosis" type="textarea" />
							</td>
							<td colspan="9" v-else>
								{{ ruleForm.ExpertAuditDiagnosis }}
							</td>
						</tr>
						
						<tr v-if="0">
							<td class="bg-gray text-right" rowspan="2">鉴定标准</td>
							<td colspan="9" v-if="allowEdit()">
								<div v-for="(item, key) in caseKind" :key="key">
									<el-checkbox v-model="item.Value" :label="item.Name" :true-label="1" :false-label="0" size="small" />
								</div>
								<!-- <el-input v-model="ruleForm.ExpertAuditStandard" type="textarea" /> -->
							</td>
							<td colspan="9" v-else>
								<div v-for="(item, key) in caseKind" :key="key">
									<checkTag :checked="item.Value == 1" :title="item.Name"></checkTag>
								</div>
							</td>
						</tr>
						<tr v-if="ruleForm.CaseMode==1 || ruleForm.CaseMode==2">
							<td class="bg-gray text-right" colspan="1">具体条款</td>
							<td v-if="allowEdit()" colspan="8">
								<el-input v-model="ruleForm.ExpertAuditTerm" type="textarea" />
							</td>
							<td v-else colspan="8">
								{{ ruleForm.ExpertAuditTerm }}
							</td>
						</tr>
						<tr v-if="0">
							<td class="bg-gray text-right">法律法规</td>
							<td colspan="9" v-if="allowEdit()">
								<el-input v-model="ruleForm.ExpertAuditLaw" type="textarea" />
							</td>
							<td colspan="9" v-else>
								{{ ruleForm.ExpertAuditLaw }}
							</td>
						</tr>
						<tr v-if="step == 10">
							<td class="bg-gray text-right">审查内容</td>
							<td colspan="9">
								<el-form-item label="鉴定时机">
									<el-radio-group v-model="ruleForm.ExpertReviewOpportunityState" :disabled="!editMode">
										<el-radio :label="1">符合</el-radio>
										<el-radio :label="2">不符合</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="鉴定程序">
									<el-radio-group v-model="ruleForm.ExpertReviewProgramState" :disabled="!editMode">
										<el-radio :label="1">符合</el-radio>
										<el-radio :label="2">不符合</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="标准适用">
									<el-radio-group v-model="ruleForm.ExpertReviewStandardState" :disabled="!editMode">
										<el-radio :label="1">符合</el-radio>
										<el-radio :label="2">不符合</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="鉴定资质">
									<el-radio-group v-model="ruleForm.ExpertReviewQualificationState" :disabled="!editMode">
										<el-radio :label="1">符合</el-radio>
										<el-radio :label="2">不符合</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="鉴定意见">
									<el-radio-group v-model="ruleForm.ExpertReviewResultState" :disabled="!editMode">
										<el-radio :label="1">符合</el-radio>
										<el-radio :label="2">不符合</el-radio>
										<el-radio :label="3">有缺陷</el-radio>
									</el-radio-group>
								</el-form-item>
							</td>
						</tr>
						<tr>
							<td class="bg-gray text-right">
								<span v-if="ruleForm.CaseMode != 10">评估意见</span>
								<span v-else>审查意见</span>
							</td>
							<td colspan="9" v-if="allowEdit()">
								<vue-ueditor-wrap :editor-id="`editor-content`"  
									:editor-dependencies="['ueditor.config.js','ueditor.all.min.js','xiumi/xiumi-ue-dialog-v5.js','xiumi/xiumi-ue-v5.css']"
									v-model="ruleForm.ExpertAuditEval" 
									:config="{UEDITOR_HOME_URL:'/ueditor/',serverUrl:`${baseUrl}/v1/common/editor/${getUserInfos.appid}`,headers:{'Authorization':token,Appid:getUserInfos.appid}}" 
									>
								</vue-ueditor-wrap>
							</td>
							<td colspan="9" v-else>
								<div v-html="ruleForm.ExpertAuditEval"></div>
							</td>
						</tr>
						<tr v-if="ruleForm.Remark">
							<td class="bg-gray text-right">驳回原因</td>
							<td colspan="9">
								{{ ruleForm.Remark }}
							</td>
						</tr>
						<tr>
							<td class="bg-gray text-right" rowspan="2">审核</td>
							<td colspan="9" v-if="editMode">
								<el-radio-group v-model="ruleForm.ExpertAuditState" v-if="step == 7">
									<el-radio :label="10">通过</el-radio>
									<el-radio :label="5">驳回</el-radio>
								</el-radio-group>
								<el-radio-group v-model="ruleForm.ExpertReviewState" v-else-if="step == 10">
									<el-radio :label="10">通过</el-radio>
									<el-radio :label="5">驳回</el-radio>
								</el-radio-group>
							</td>
							<td colspan="9" v-else-if="step == 7">
								<el-tag type="success" effect="plain" v-if="ruleForm.ExpertAuditState == 10">通过</el-tag>
								<el-tag type="danger" effect="plain" v-else-if="ruleForm.ExpertAuditState == 5">驳回</el-tag>
								<el-tag type="primary" effect="plain" v-else>待审</el-tag>
							</td>
							<td colspan="9" v-else-if="step == 10">
								<el-tag type="success" effect="plain" v-if="ruleForm.ExpertReviewState == 10">通过</el-tag>
								<el-tag type="danger" effect="plain" v-else-if="ruleForm.ExpertReviewState == 5">驳回</el-tag>
								<el-tag type="primary" effect="plain" v-else>待审</el-tag>
							</td>
						</tr>
						<tr v-if="(step == 7 && ruleForm.ExpertAuditState==5)|| (step == 10 && ruleForm.ExpertReviewState==5)">
							<td colspan="9" v-if="editMode">
								<template v-if="step == 7 && ruleForm.ExpertAuditState==5">
									<div v-for="val in disapprovalReasons" :key="val.Name">
										<el-radio :label="val.Name" v-model="ruleForm.ExpertAuditContent">{{val.Name}}</el-radio>
									</div>
									<div>
										<el-radio label="其他" v-model="ruleForm.ExpertAuditContent">其他&#8197;&#8197;<el-input v-model="ruleForm.ExpertAuditRemark" placeholder="请输入" :input-style="{width:'600px'}" 
										v-if="ruleForm.ExpertAuditContent=='其他'" /></el-radio>
									</div>
								</template>
								<template v-else-if="step == 10 && ruleForm.ExpertAuditState==5">
									<div v-for="val in disapprovalReasons" :key="val.Name">
										<el-radio :label="val.Name" v-model="ruleForm.ExpertAuditContent" v-for="val in disapprovalReasons" :key="val.Name">{{val.Name}}</el-radio>
									</div>
									<div>
										<el-radio label="其他" v-model="ruleForm.ExpertReviewContent">其他&#8197;&#8197;<el-input v-model="ruleForm.ExpertReviewRemark" placeholder="请输入" :input-style="{width:'600px'}" 
										v-if="ruleForm.ExpertReviewContent=='其他'" /></el-radio>
									</div>
								</template>
								<!-- <el-input v-model="ruleForm.ExpertAuditRemark" placeholder="如驳回，请输入理由" type="textarea" v-if="step == 7" />
								<el-input v-model="ruleForm.ExpertReviewRemark" placeholder="如驳回，请输入理由" type="textarea" v-else-if="step == 10" /> -->
							</td>
							<td colspan="9" v-else-if="step == 7">
								{{ ruleForm.ExpertAuditContent }}&#8197;&#8197;{{ ruleForm.ExpertAuditRemark }}
							</td>
							<td colspan="9" v-else-if="step == 10">
								{{ ruleForm.ExpertReviewContent }}&#8197;&#8197;{{ ruleForm.ExpertAuditRemark }}
							</td>
						</tr>
					</tbody>
				</table>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" >{{ $t('message.action.cancel') }}</el-button>
					<el-button v-if="editMode" type="primary" @click="onSubmit(true)" v-auths:[$parent.moduleKey]="['btn.AuditEdit']">{{
						$t('message.action.submit')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { reactive, toRefs, onMounted, computed,getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox } from 'element-plus';
import imgList from '/@/components/image/index.vue';
import checkTag from '/@/components/checkTag/index.vue';
import { useStore } from '/@/store/index';

export default {
	name: 'expertAuditEdit',
	props: {
		step: Number,
	},
	components: { imgList, checkTag },
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			ruleForm: {},
			editMode: false,
			caseKind: [],
			disapprovalReasons:[]
		});

		// 打开弹窗
		const openDialog = (editMode: Boolean, row: Object) => {
			const model = JSON.parse(JSON.stringify(row));
			state.editMode = JSON.parse(editMode);
			state.ruleForm = model;
			if (state.editMode) {
				if (props.step == 7) {
					//专家制作意见书
					state.ruleForm.ExpertAuditState = 2;
					state.ruleForm.ExpertAuditContent = '';
					state.ruleForm.ExpertAuditRemark = '';
				} else if (props.step == 10) {
					//专家审核意见书
					state.ruleForm.ExpertReviewState = 2;
					state.ruleForm.ExpertReviewContent = '';
					state.ruleForm.ExpertReviewRemark = '';
				}
			}
			onGetCaseKind();
			onGetDisapprovalReason();
			state.title = t('message.action.audit');
			state.isShowDialog = true;
		};
		const onGetCaseKind = async () => {
			state.caseKind = [];
			let type = '';
			switch (state.ruleForm.CaseMode) {
				case 1:
					type = 'case_mode_gs';
					break;
				case 2:
					type = 'case_mode_hs';
					break;
				case 10:
					type = 'case_mode_jd';
					break;
			}
			const res=await proxy.$api.common.commondata.getConcreteDataList({
				type: type,
				pageNum: 1,
				pageSize: 10000,
			})
			if (res.errcode != 0) {
				return;
			}
			for (let i = 0; i < res.data.length; i++) {
				state.caseKind.push({ Name: res.data[i].Name, Value: 0, Code: res.data[i].Code });
			}
			if (props.step != 7 || !state.editMode) {
				//回显
				if (state.ruleForm.ExpertAuditStandard != '') {
					let list = state.ruleForm.ExpertAuditStandard.split(',');
					for (let i = 0; i < state.caseKind.length; i++) {
						for (let j = 0; j < list.length; j++) {
							if (state.caseKind[i].Code == list[j]) {
								state.caseKind[i].Value = 1;
								break;
							}
						}
					}
				}
			}
		};
		const onGetDisapprovalReason = async () => {
			if (!state.editMode){
				return
			}
			state.disapprovalReasons = [];
			let type = '';
			if(props.step==7){
				type="expert_audit_disapproval_reason"
			} else if(props.step==10){
				type="insurer_review_disapproval_reason"
			}
			
			const res=await proxy.$api.common.commondata.getConcreteDataList({
				type: type,
				pageNum: 1,
				pageSize: 10000,
			})
			if (res.errcode != 0) {
				return;
			}
			for (let i = 0; i < res.data.length; i++) {
				state.disapprovalReasons.push({ Name: res.data[i].Name, Value: 0, Code: res.data[i].Code });
			}
		};
		const allowEdit = () => {
			if (state.editMode && props.step == 7) {
				return true;
			} else {
				return false;
			}
		};
		const disableChange=(field:string)=>{
			state.ruleForm[field]=1
		}
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = async(isCloseDlg: boolean) => {
			if (props.step == 7) {
				state.ruleForm.ExpertAuditState = Number(state.ruleForm.ExpertAuditState);
				if (state.ruleForm.ExpertAuditState != 5 && state.ruleForm.ExpertAuditState != 10) {
					ElMessageBox.alert('请选择审核结果', '温馨提示', {});
					return;
				}
				if (state.ruleForm.ExpertAuditState == 5 && (state.ruleForm.ExpertAuditContent == '' || (state.ruleForm.ExpertAuditContent == '其他' && state.ruleForm.ExpertAuditRemark==""))) {
					ElMessageBox.alert('请输入审核驳回理由', '温馨提示', {});
					return;
				}
				if(state.ruleForm.CaseMode==10 && (!state.ruleForm.RealExamState && !state.ruleForm.LegalExamState && !state.ruleForm.CorrelationExamState
				&& !state.ruleForm.CompleteExamState && !state.ruleForm.TechniqueExamState && !state.ruleForm.StandardExamState && !state.ruleForm.OtherState)){
					ElMessageBox.alert('请选择委托内容', '温馨提示', {});
					return;
				}
			} else if (props.step == 10) {
				state.ruleForm.ExpertReviewState = Number(state.ruleForm.ExpertReviewState);
				if (state.ruleForm.ExpertReviewState != 5 && state.ruleForm.ExpertReviewState != 10) {
					ElMessageBox.alert('请选择审核结果', '温馨提示', {});
					return;
				}
				if (state.ruleForm.ExpertReviewState == 5 && (state.ruleForm.ExpertReviewContent == '' || (state.ruleForm.ExpertReviewContent == '其他' && state.ruleForm.ExpertReviewRemark==""))) {
					ElMessageBox.alert('请输入审核驳回理由', '温馨提示', {});
					return;
				}
				
				
			}
			if (props.step == 7) {
				let ExpertAuditStandardList = [];
				for (let i = 0; i < state.caseKind.length; i++) {
					if (state.caseKind[i].Value == 1) {
						ExpertAuditStandardList.push(state.caseKind[i].Code);
					}
				}
				state.ruleForm.ExpertAuditStandard = ExpertAuditStandardList.toString();
			}
			state.loading = true;
			try{
				const res=await proxy.$api.ims.casepersonline.updateStep(props.step,state.ruleForm)
				if (res.errcode == 0) {
					closeDialog();
					proxy.$parent.onGetTableData();
				}
			} finally{
				state.loading = false;
			}
			
			return false;
		};

		return {
			t,
			proxy,
			getUserInfos,
			openDialog,
			closeDialog,
			onCancel,
			disableChange,
			onSubmit,
			allowEdit,
			onGetCaseKind,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
:root {
--el-checkbox-disabled-checked-input-fill: var(--el-checkbox-checked-bg-color);
--el-checkbox-disabled-checked-input-border-color: var(--el-checkbox-checked-input-border-color);
}
@import '../../../../theme/mixins/mixins.scss';
.check-box {
	
	.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
		 
		background-color: #79bbff !important;
		border-color: #79bbff !important;
	}
	span.checked {
		color: var(--el-checkbox-checked-text-color) !important;
	}
}


// .el-checkbox__input.is-disabled+.el-checkbox__label {
//     color: var(--el-checkbox-checked-text-color) !important;
// }
// .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label {
// 	color: var(--el-checkbox-checked-text-color) !important;
// }
// .el-checkbox__input.is-disabled span.el-checkbox__label {
//     color: var(--el-checkbox-checked-text-color) !important;
//     cursor: not-allowed;
// }

table,
table tr th,
table tr td {
	border: 1px solid gray;
	padding: 8px;
}
table {
	border-collapse: collapse;
	padding: 0px;
}
.text-lg {
	font-size: 16px;
}
.text-sm {
	font-size: 12px;
}
.bg-gray {
	background: var(--el-color-info-light-8);
}
.text-center {
	text-align: center;
}
.text-right {
	text-align: right;
}
.base-info {
	display: flex;
	align-items: center;
	font-size: 13px;
}
.base-info-label {
	width: 70px;
	text-align: right;
	color: var(--el-text-color-secondary);
	@include text-ellipsis(1);
}
.base-info-value {
	text-align: left;
}
.base-info-text {
	color: var(--el-text-color-secondary);
}

.personal {
	.personal-user {
		height: 130px;
		display: flex;
		align-items: center;
		.personal-user-left {
			width: 100px;
			height: 130px;
			border-radius: 3px;
			::v-deep(.el-upload) {
				height: 100%;
			}
			.personal-user-left-upload {
				img {
					width: 100%;
					height: 100%;
					border-radius: 3px;
				}
				&:hover {
					img {
						animation: logoAnimation 0.3s ease-in-out;
					}
				}
			}
		}
		.personal-user-right {
			flex: 1;
			padding: 0 15px;
			.personal-title {
				font-size: 18px;
				@include text-ellipsis(1);
			}
		}
	}
	.personal-info {
		.personal-info-more {
			float: right;
			color: var(--el-text-color-secondary);
			font-size: 13px;
			&:hover {
				color: var(--color-primary);
				cursor: pointer;
			}
		}
		.personal-info-box {
			height: 130px;
			overflow: hidden;
			.personal-info-ul {
				list-style: none;
				.personal-info-li {
					font-size: 13px;
					padding-bottom: 10px;
					.personal-info-li-title {
						display: inline-block;
						@include text-ellipsis(1);
						color: var(--el-text-color-secondary);
						text-decoration: none;
					}
					& a:hover {
						color: var(--color-primary);
						cursor: pointer;
					}
				}
			}
		}
	}
	.personal-recommend-row {
		.personal-recommend-col {
			.personal-recommend {
				position: relative;
				height: 100px;
				color: var(--color-whites);
				border-radius: 3px;
				overflow: hidden;
				cursor: pointer;
				&:hover {
					i {
						right: 0px !important;
						bottom: 0px !important;
						transition: all ease 0.3s;
					}
				}
				i {
					position: absolute;
					right: -10px;
					bottom: -10px;
					font-size: 70px;
					transform: rotate(-30deg);
					transition: all ease 0.3s;
				}
				.personal-recommend-auto {
					padding: 15px;
					position: absolute;
					left: 0;
					top: 5%;
					.personal-recommend-msg {
						font-size: 12px;
						margin-top: 10px;
					}
				}
			}
		}
	}
	.personal-edit {
		.personal-edit-title {
			position: relative;
			padding-left: 10px;
			color: var(--el-text-color-regular);
			&::after {
				content: '';
				width: 2px;
				height: 10px;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				background: var(--color-primary);
			}
		}
		.personal-edit-safe-box {
			border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
			padding: 15px 0;
			.personal-edit-safe-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.personal-edit-safe-item-left {
					flex: 1;
					overflow: hidden;
					.personal-edit-safe-item-left-label {
						color: var(--el-text-color-regular);
						margin-bottom: 5px;
					}
					.personal-edit-safe-item-left-value {
						color: var(--el-text-color-secondary);
						@include text-ellipsis(1);
						margin-right: 15px;
					}
				}
			}
			&:last-of-type {
				padding-bottom: 0;
				border-bottom: none;
			}
		}
	}
}
</style>
