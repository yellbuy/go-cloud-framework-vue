<template>
	<div class="sys-hcis-healthRecordEdit-container">
		<el-dialog :title="title" v-model="isShowDialog" width="50%" destroy-on-close :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">干预信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="8" class="mb20">
						<el-form-item label="是否干预" prop="IsIntervene">
							<div mb-2 flex items-center>
								<el-radio-group v-model="ruleForm.IsIntervene">
									<el-radio :label="0">是</el-radio>
									<el-radio :label="1">否</el-radio>
								</el-radio-group>
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="8"  class="mb20">
						<el-form-item label="干预次数" prop="InterveneQty">
							<el-input-number
								v-model.number="ruleForm.InterveneQty"
								style="width: 100%"
								:controls="true"
								placeholder="请输入"
								min="0"
								max="1000000000"
								step="1">
							</el-input-number>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="8"  class="mb20">
						<el-form-item label="干预效果" prop="InterveneResult">
							<el-select
								v-model="ruleForm.InterveneResult"
								style="width: 100%"
								filterable
								placeholder="请选择">
								<el-option v-for="(item, index) in interveneResultList" :key="index" :label="item" :value="index"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col class="mb20">
						<el-form-item label="干预备注" prop="InterveneRemark">
							<el-input
								v-model="ruleForm.InterveneRemark"
								style="width: 100%"
								placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="干预内容" prop="InterveneContent">
							<textarea
								v-model="ruleForm.InterveneContent"
								style="width: 100%"
								placeholder="请输入"></textarea>
						</el-form-item>
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



		const store = useStore();
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});


		const state = reactive({
			isShowDialog: false,
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
				IsIntervene: 0,
				InterveneQty: 0,
				InterveneContent: "",
				InterveneResult: 1,
				InterveneRemark: "",
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
			interveneResultList: ['非常好','好','一般','身体不适','没意思','无法评价'],
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
			IsIntervene: [
				{
					required: true,
					message: computed(() => t('message.validRule.required')),
					trigger: 'blur',
				},
			],

			InterveneQty: [
				{
					required: true,
					message: computed(() => t('message.validRule.required')),
					trigger: 'blur',
				},
			],

			InterveneResult: [
				{
					required: true,
					message: computed(() => t('message.validRule.required')),
					trigger: 'blur',
				},
			],

			InterveneRemark: [
				{
					required: true,
					message: computed(() => t('message.validRule.required')),
					trigger: 'blur',
				},
			],

			InterveneContent: [
				{
					required: true,
					message: computed(() => t('message.validRule.required')),
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
						const res = await proxy.$api.hcis.healthRecord.update(state.ruleForm);
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
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			Plus,
			Delete,
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
<style>
textarea {
    height: 100px;
    padding: 10px; /* 设置内边距 */
    border: 3px solid #ccc; /* 设置边框样式 */
}
</style>