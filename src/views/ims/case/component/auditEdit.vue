<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="90px" v-loading="loading">
				<table class="yb-table" style="width:100%">
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
							<td>{{ruleForm.CaseNo}}</td>
							<td class="bg-gray text-right" >委托单位</td>
							<td colspan="3">{{ruleForm.TName}}</td>
							<td class="bg-gray text-right">委托人</td>
							<td>{{ruleForm.UName}}</td>
							<td class="bg-gray text-right">委托时间</td>
							<td>{{ruleForm.CaseCreateTime=='0001-01-01 00:00:00'?'-':ruleForm.CaseCreateTime}}</td>
						</tr>
						<tr>
							<td class="bg-gray text-right">伤者姓名</td>
							<td>{{ruleForm.PersonName}}</td>
							<td class="bg-gray text-right">联系电话</td>
							<td>{{ruleForm.PersonTel}}</td>
							<td class="bg-gray text-right">性别</td>
							<td>{{ruleForm.PersonGender==1?'男':ruleForm.PersonGender==2?'女':'-'}}</td>
							<td class="bg-gray text-right">年龄</td>
							<td>{{ruleForm.PersonAge}}</td>
							<td class="bg-gray text-right">民族</td>
							<td>{{ruleForm.PersonNation}}</td>
						</tr>
						<tr>
							<td class="bg-gray text-right">委托类别</td>
							<td v-if="ruleForm.CaseType==1">门诊就医</td>
							<td v-else-if="ruleForm.CaseType==2">住院非手术</td>
							<td v-else-if="ruleForm.CaseType==3">住院手术</td>
							<td v-else-if="ruleForm.CaseType==10">死亡</td>
							<td class="bg-gray text-right">委托事项</td>
							<td v-if="ruleForm.CaseMode==1">估损</td>
							<td v-else-if="ruleForm.CaseMode==2">核损</td>
							<td v-else-if="ruleForm.CaseMode==10">鉴定</td>
							<td colspan="6"></td>
						</tr>
						<tr>
							<td class="bg-gray text-right">委托事项</td>
							<td colspan="9">
								<el-checkbox :checked="ruleForm.MedicalDiagnosisState>0">医学诊断审查</el-checkbox>
								<el-checkbox :checked="ruleForm.InjuryRelationState>0">伤病关系审查</el-checkbox>
								<el-checkbox :checked="ruleForm.InjuryDiscernState>0">新旧伤鉴别</el-checkbox>
								<el-checkbox :checked="ruleForm.DisabilityAssessState>0">伤残评估</el-checkbox>
								<el-checkbox :checked="ruleForm.ThirdPhaseState>0">三期评估</el-checkbox>
								<el-checkbox v-if="ruleForm.OtherState>0" :checked="ruleForm.OtherState>0">其他({{ruleForm.OtherTitle}})</el-checkbox>
							</td>
						</tr>
						<tr>
							<td colspan="1" class="bg-gray text-right">简要案情</td>
							<td colspan="9">{{ruleForm.CaseContent}}</td>
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
						<tr v-if="ruleForm.MedicalRecordPics">
							<td class="bg-gray text-right">门急诊病历</td>
							<td colspan="9">
								<imgList :ids="ruleForm.MedicalRecordPics"></imgList>
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
						<tr  v-if="ruleForm.OtherPics">
							<td class="bg-gray text-right">补充材料</td>
							<td colspan="9">
								<imgList :ids="ruleForm.OtherPics"></imgList>
							</td>
						</tr>
						<tr v-if="editMode">
							<td class="bg-gray text-right" rowspan="2">审核</td>
							<td colspan="9">
								<el-radio-group v-model="ruleForm.InsurerAuditState" v-if="step==2">
									<el-radio label="10">通过</el-radio>
									<el-radio label="5">驳回</el-radio>
								</el-radio-group>
								<el-radio-group v-model="ruleForm.InsurerReviewState" v-else-if="step==3">
									<el-radio label="10">通过</el-radio>
									<el-radio label="5">驳回</el-radio>
								</el-radio-group>
							</td>
						</tr>
						<tr v-if="editMode">
							<td colspan="9">
								<el-input v-model="ruleForm.InsurerAuditContent" placeholder="如驳回，请输入理由" type="textarea" v-if="step==2"/>
								<el-input v-model="ruleForm.InsurerReviewContent" placeholder="如驳回，请输入理由" type="textarea" v-else-if="step==3"/>
							</td>
						</tr>
					</tbody>
				</table> 
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="small">{{ $t('message.action.cancel') }}</el-button>
					<el-button v-if="editMode" type="primary" @click="onSubmit(true)" size="small" v-auths:[$parent.moduleKey]="['btn.AuditEdit']">{{ $t('message.action.submit') }}</el-button>
					
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox } from 'element-plus';
import imgList from '/@/components/image/index.vue';
export default {
	name: 'auditEdit',
	props:{
		step:Number,
	},
	components: { imgList },
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const state = reactive({
			isShowDialog: false,
			title:t('message.action.audit'),
			loading:false,
			editMode:false,
			ruleForm: {
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
					message: t('message.validRule.lengthRange',{'min':1,'max':50}),
					trigger: 'change',
				},
			]
		});

		// 打开弹窗
		const openDialog = (editMode:Boolean,row: Object) => {
			state.editMode = editMode;
			state.ruleForm = row;
			if(props.step==2){
				state.ruleForm.InsurerAuditState=0;
				state.ruleForm.InsurerAuditContent="";
			} else if(props.step==3){
				state.ruleForm.InsurerReviewState=0;
				state.ruleForm.InsurerReviewContent="";
			}
			
			state.isShowDialog = true;
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
		const onSubmit = (isCloseDlg:boolean) => {
			if(props.step==2){
				state.ruleForm.InsurerAuditState=Number(state.ruleForm.InsurerAuditState)
				if(state.ruleForm.InsurerAuditState!=5 && state.ruleForm.InsurerAuditState!=10){
					ElMessageBox.alert('请选择审核结果', '温馨提示', {})
					return;
				}
				if(state.ruleForm.InsurerAuditState==5 && state.ruleForm.InsurerAuditContent==""){
					ElMessageBox.alert('请输入审核驳回理由', '温馨提示', {})
					return;
				}
			} else if(props.step==3){
				state.ruleForm.InsurerReviewState=Number(state.ruleForm.InsurerReviewState)
				if(state.ruleForm.InsurerReviewState!=5 && state.ruleForm.InsurerReviewState!=10){
					ElMessageBox.alert('请选择审核结果', '温馨提示', {})
					return;
				}
				if(state.ruleForm.InsurerReviewState==5 && state.ruleForm.InsurerReviewContent==""){
					ElMessageBox.alert('请输入审核驳回理由', '温馨提示', {})
					return;
				}
			}

			
			state.loading=true;
			proxy.$refs.ruleFormRef.validate((valid) => {
				if (valid) {
					const url=`/v1/ims/casepersonline/${props.step}/${state.ruleForm.Id}`;
					request({
						url: url,
						method: 'post',
						data: state.ruleForm,
					}).then((res)=>{
						state.loading=false;
						if(res.errcode==0){
							closeDialog();
							proxy.$parent.onGetTableData();
						}
					}).catch((err)=>{
						state.loading=false;
					});
					return false;
				} else {
					return false;
				}
			});
		};
		// 页面加载时
		onMounted(() => {
		});
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
table,table tr th, table tr td { 
	border:1px solid gray;
	padding:8px 
}
table {
	border-collapse: collapse; padding:0px;
}
.text-lg{
	font-size: 16px;
}
.text-sm{
	font-size: 12px;
}
.bg-gray{
	background: var(--el-color-info-light-8);
}
.text-center{
	text-align: center;
}
.text-right{
	text-align: right;
}
.base-info {
	display: flex;
	align-items: center;
	font-size: 13px;
	
}
.base-info-label {
	width:70px;
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
