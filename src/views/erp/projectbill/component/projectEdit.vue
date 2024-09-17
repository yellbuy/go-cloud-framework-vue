<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="项目名称" prop="Name" >
							<el-input
								v-model="ruleForm.Name"
								placeholder="请输入">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="状态" prop="State">
							<div mb-2 flex items-center>
								<el-radio-group
									v-model="ruleForm.State">
									<el-radio :label="0">未开始</el-radio>
									<el-radio :label="1">进行中</el-radio>
									<el-radio :label="2">已结束</el-radio>
								</el-radio-group>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="开始时间" prop="StartTime">
							<el-date-picker
								v-model="ruleForm.StartTime"
								type="date"
								placeholder="开始时间"
								format="YYYY-MM-DD">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="结束时间" prop="EndTime">
							<el-date-picker
								v-model="ruleForm.EndTime"
								type="date"
								placeholder="结束时间"
								format="YYYY-MM-DD">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="金额" prop="Amount">
							<el-input-number
								v-model="ruleForm.Amount"
								:min="0"
								controls-position="right"
								:precision="2"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="" prop="IsIncludeRate">
							<el-checkbox v-model="ruleForm.IsIncludeRate" :true-label="1" :false-label="0">金额含税</el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="税率" prop="TaxRate">
							<el-input-number
								v-model="ruleForm.TaxRate"
								:min="0"
								controls-position="right"
								:precision="2"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="税费" prop="Tax" >
							{{getTax}}
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="含税合计" prop="Total">
							{{getTotal}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="对接人姓名" prop="ProjectManagerName">
							<el-input
								v-model="ruleForm.ProjectManagerName"
								placeholder="请输入">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" class="mb20">
						<el-form-item label="对接人电话" prop="ProjectManagerMobile">
							<el-input
								v-model="ruleForm.ProjectManagerMobile"
								placeholder="请输入">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="合同内容" prop="Content">
							<el-input v-model="ruleForm.Content" :autosize="{ minRows: 3, maxRows: 6 }"
							type="textarea"/> 
						</el-form-item>
					</el-col>
				</el-row>	
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="项目备注" prop="Remark">
							<el-input v-model="ruleForm.Remark" :autosize="{ minRows: 3, maxRows: 6 }"
							type="textarea"/> 
						</el-form-item>
					</el-col>
				</el-row>	
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-if="!disable" v-auths:[$parent.moduleKey]="['btn.ProjectEdit', 'btn.ProjectAdd']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'freightEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
		const store = useStore();
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		//显示表格图片
		const showImage = (Files: string) => {
			let fileUrl = '';
			let filList = Files.split(',');
			fileUrl = state.httpsText + filList[0];
			return fileUrl;
		};
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			//表单
			ruleForm: {
				Id: 0,
				Name: '',
				Kind: 'info',
				Amount:0,
				IsIncludeTax:0,
				TaxRate:0,
				Tax:0,
				RealAmount:0,
			},
			
			dialogVisible: false,
			truckTypeList: [],
			plateColorList:[],
			energyTypeList:[],
			goodsTypeList:[],
			goodsList:[],
			customerList:[],
			senderAddressList:[],
			receiverAddressList:[],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
		});
		const token = Session.get('token');
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			Name: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
		});
		//	税费计算
		const getTax = computed(() => {
			if(state.ruleForm.IsIncludeRate){
				state.ruleForm.Tax=0
				return 0;
			}
			const tax= Number.parseFloat((state.ruleForm.Amount*state.ruleForm.TaxRate).toFixed(4));
			state.ruleForm.Tax=tax
			return tax;
		});
		//	含税合计计算
		const getTotal = computed(() => {
			if(state.ruleForm.IsIncludeRate){
				state.ruleForm.RealAmount=state.ruleForm.Amount
				return state.ruleForm.RealAmount;
			}
			const amount= Number.parseFloat((state.ruleForm.Amount*(1+state.ruleForm.TaxRate)).toFixed(2));
			state.ruleForm.RealAmount=amount
			return amount;
		});
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.disable=disable;
			state.ruleForm.Kind = kind;
			try {				
				if (id && id != '0') {
					await getRowById(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.State=1;
					state.ruleForm.StartTime=new Date()
					state.ruleForm.EndTime=dayjs(new Date()).add(1, 'month')
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		const getRowById = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.project.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		}

		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};

		const onLoadTable = () => {
			proxy.$parent.onMainGetTableData();
		};
		//修改按钮
		const onModelEdit = (item: object) => {
			
			state.saveState = false;
			state.dialogVisible = true;
		};		
		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						const res = await proxy.$api.erp.project.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onMainGetTableData();
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
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			getRowById,
			onModelEdit,
			showImage,
			dateFormatYMD,
			getTax,
			getTotal,
			getUserInfos,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
.el-select .el-date-picker .el-input .el-input-number{
	width: 100%;
}
</style>