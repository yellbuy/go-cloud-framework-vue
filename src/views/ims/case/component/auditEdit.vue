<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" destroy-on-close :key="ruleForm.Id" v-if="ruleForm.CaseNo" width="80%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="90px" v-loading="loading">
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
						<!-- <tr>
							<td colspan="10" class="bg-gray text-lg"><b>基本信息</b></td>
						</tr> -->
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
							<td colspan="6"></td>
						</tr>
						<tr>
							<td class="bg-gray text-right">委托事项</td>
							<td colspan="9">
								<checkTag
									:checked="ruleForm.MedicalDiagnosisState > 0"
									v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2"
									title="医学诊断审查"
								></checkTag>
								<checkTag
									:checked="ruleForm.InjuryRelationState > 0"
									v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2"
									title="伤病关系审查"
								></checkTag>
								<checkTag
									:checked="ruleForm.InjuryDiscernState > 0"
									v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2"
									title="新旧伤鉴别"
								></checkTag>

								<checkTag :checked="ruleForm.AppraisalOpportunityState > 0" v-if="ruleForm.CaseMode == 2" title="鉴定时机推荐"></checkTag>

								<checkTag
									:checked="ruleForm.DisabilityAssessState > 0"
									v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2"
									title="伤残评估"
								></checkTag>
								<checkTag :checked="ruleForm.ThirdPhaseState > 0" v-if="ruleForm.CaseMode == 1 || ruleForm.CaseMode == 2" title="三期评估"></checkTag>

								<checkTag :checked="ruleForm.NurseRelyState > 0" v-if="ruleForm.CaseMode == 2" title="护理依赖评估"></checkTag>
								<checkTag :checked="ruleForm.MedicalSourceState > 0" v-if="ruleForm.CaseMode == 2" title="医源性介入因素审查"></checkTag>

								<checkTag :checked="ruleForm.RealExamState > 0" v-if="ruleForm.CaseMode == 10" title="真实性审查"></checkTag>
								<checkTag :checked="ruleForm.LegalExamState > 0" v-if="ruleForm.CaseMode == 10" title="合法性审查"></checkTag>
								<checkTag :checked="ruleForm.CorrelationExamState > 0" v-if="ruleForm.CaseMode == 10" title="关联性审查"></checkTag>
								<checkTag :checked="ruleForm.CompleteExamState > 0" v-if="ruleForm.CaseMode == 10" title="完整性审查"></checkTag>
								<checkTag :checked="ruleForm.SufficiencyExamState > 0" v-if="ruleForm.CaseMode == 10" title="充分性审查"></checkTag>
								<checkTag :checked="ruleForm.TechniqueExamState > 0" v-if="ruleForm.CaseMode == 10" title="技术规范性审查"></checkTag>
								<checkTag :checked="ruleForm.StandardExamState > 0" v-if="ruleForm.CaseMode == 10" title="标准适用性审查"></checkTag>

								<checkTag :checked="ruleForm.OtherState > 0" v-if="ruleForm.OtherState > 0" :title="`其他(${ruleForm.OtherTitle})`"></checkTag>
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
						<tr v-if="ruleForm.IconographyRecordPics">
							<td class="bg-gray text-right">影像学资料</td>
							<td colspan="9">
								<imgList :ids="ruleForm.IconographyRecordPics"></imgList>
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
						<tr>
							<td class="bg-gray text-right" rowspan="2">审核</td>
							<td colspan="9" v-if="editMode">
								<el-radio-group v-model="ruleForm.InsurerAuditState" v-if="step == 2">
									<el-radio :label="10">通过</el-radio>
									<el-radio :label="5">驳回</el-radio>
								</el-radio-group>
								<el-radio-group v-model="ruleForm.InsurerReviewState" v-else-if="step == 3">
									<el-radio :label="10">通过</el-radio>
									<el-radio :label="5">驳回</el-radio>
								</el-radio-group>
							</td>
							<td colspan="9" v-else-if="step == 2">
								<el-tag type="success" effect="plain" v-if="ruleForm.InsurerAuditState == 10">通过</el-tag>
								<el-tag type="danger" effect="plain" v-else-if="ruleForm.InsurerAuditState == 5">驳回</el-tag>
								<el-tag type="primary" effect="plain" v-else>待审</el-tag>
							</td>
							<td colspan="9" v-else-if="step == 3">
								<el-tag type="success" effect="plain" v-if="ruleForm.InsurerReviewState == 10">通过</el-tag>
								<el-tag type="danger" effect="plain" v-else-if="ruleForm.InsurerReviewState == 5">驳回</el-tag>
								<el-tag type="primary" effect="plain" v-else>待审</el-tag>
							</td>
						</tr>
						<tr>
							<td colspan="9" v-if="editMode">
								<el-input v-model="ruleForm.InsurerAuditContent" placeholder="如驳回，请输入理由" type="textarea" v-if="step == 2" />
								<el-input v-model="ruleForm.InsurerReviewContent" placeholder="如驳回，请输入理由" type="textarea" v-else-if="step == 3" />
							</td>
							<td colspan="9" v-else-if="step == 2">
								{{ ruleForm.InsurerAuditContent }}
							</td>
							<td colspan="9" v-else-if="step == 3">
								{{ ruleForm.InsurerReviewContent }}
							</td>
						</tr>
					</tbody>
				</table>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button v-if="editMode" :loading="loading" type="primary" @click="onSubmit(true)" v-auths:[$parent.moduleKey]="['btn.AuditEdit']">{{
						$t('message.action.submit')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage, ElMessageBox } from 'element-plus';
import imgList from '/@/components/image/index.vue';
import checkTag from '/@/components/checkTag/index.vue';
export default {
	name: 'auditEdit',
	props: {
		step: Number,
	},
	components: { imgList, checkTag },
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: true,
			title: t('message.action.audit'),
			loading: false,
			editMode: false,
			ruleForm: {
				Id: 0,
				InsurerAuditState: 0,
				InsurerReviewState: 0,
			},
			deptData: [], // 部门数据
		});

		const rules = reactive({
			Username: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 50,
					message: t('message.validRule.lengthRange', { min: 1, max: 50 }),
					trigger: 'change',
				},
			],
		});

		// 打开弹窗
		const openDialog = (editMode: Boolean, row: Object) => {
			console.log('打开');
			state.loading = false;
			state.editMode = editMode;
			state.isShowDialog = true;
			if (editMode) {
				if (props.step == 2) {
					row.InsurerAuditState = 2;
					row.InsurerAuditContent = '';
				} else if (props.step == 3) {
					row.InsurerReviewState = 2;
					row.InsurerReviewContent = '';
				}
			}
			state.ruleForm = row;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			if (props.step == 2) {
				state.ruleForm.InsurerAuditState = Number(state.ruleForm.InsurerAuditState);
				if (state.ruleForm.InsurerAuditState != 5 && state.ruleForm.InsurerAuditState != 10) {
					ElMessageBox.alert('请选择审核结果', '温馨提示', {});
					return;
				}
				if (state.ruleForm.InsurerAuditState == 5 && state.ruleForm.InsurerAuditContent == '') {
					ElMessageBox.alert('请输入审核驳回理由', '温馨提示', {});
					return false;
				}
			} else if (props.step == 3) {
				state.ruleForm.InsurerReviewState = Number(state.ruleForm.InsurerReviewState);
				if (state.ruleForm.InsurerReviewState != 5 && state.ruleForm.InsurerReviewState != 10) {
					ElMessageBox.alert('请选择审核结果', '温馨提示', {});
					return;
				}
				if (state.ruleForm.InsurerReviewState == 5 && state.ruleForm.InsurerReviewContent == '') {
					ElMessageBox.alert('请输入审核驳回理由', '温馨提示', {});

					return false;
				}
			}
			
			proxy.$refs.ruleFormRef.validate(async (valid:any) => {
				if (valid) {
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
				}
			});
			return false;
		};
		// 页面加载时
		onMounted(() => {});
		return {
			t,
			openDialog,
			closeDialog,
			onCancel,
			rules,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
@import '../../../../theme/mixins/mixins.scss';
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

.el-checkbox span.el-checkbox__label,
.el-checkbox span input {
	color: var(--el-color-primary) !important;
}
</style>
