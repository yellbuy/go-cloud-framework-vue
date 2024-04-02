<template>
	<div class="system-edit-warehouse-container">
		<el-dialog :title="title" v-model="isShowDialog" width="450px" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">仓储收入*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="平台名称" prop="BusinessBillId" >
							<el-select
								v-model="ruleForm.BusinessBillId"
								style="width: 100%"
								filterable
								placeholder="请选择">
								<el-option v-for="(item, index) in businessBillList" :key="index" :label="item.Name" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="日期" prop="BillTime">
							<el-date-picker
								v-model="ruleForm.BillTime"
								style="width: 100%"
								type="date"
								placeholder="日期"
								format="YYYY-MM-DD">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="客户名称" prop="CustomerId">
							<el-select
								v-model="ruleForm.CustomerId"
								style="width: 100%"
								filterable
								placeholder="请选择">
								<el-option v-for="(item, index) in companyNameList" :key="index" :label="item.CompanyName" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="收入" prop="PlanWeight">
							<el-input-number
								v-model="ruleForm.PlanWeight"
								:controls="true"
								style="width: 100%"
								placeholder="请输入"
								type="number"
								precision="2"
								min="0"
								max="1000000000"
								step="1">
							</el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="面积" prop="Volume">
							<el-input-number
								v-model="ruleForm.Volume"
								style="width: 100%"
								:controls="true"
								precision="2"
								placeholder="请输入"
								type="number"
								min="0"
								max="1000000000"
								step="1">
							</el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-if="!disable" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'warehouseEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //是否禁用
			//表单
			ruleForm: {
				Id: 0,
				Kind: 'warehouse',
				CustomerId:"",
				GoodsCategoryId: '0',
				GoodsId:"0",
				BusinessBillId:"",
				BillTime:new Date(),
				PlanWeight:'',
				Volume:'',
				IsExternal:0,
				State: 1,
			},
			
			businessBillList:[],
			companyNameList:[],
			tableList:[],
			Files: [],
		});

		const token = Session.get('token');

		//必填项标识
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),

			BusinessBillId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			BillTime: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
			CustomerId: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
			PlanWeight: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
			Volume: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
		});
		
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			try {

				loadsiteName()
				loadCustomerName()

				state.disable = disable;
				if (id && id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.IsExternal=0;
					state.ruleForm.SenderPlanTime=new Date()
					state.ruleForm.ReceiverPlanTime=dayjs(new Date()).add(1, 'day')
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}


		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.businessBillLine.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				await loadList(state.ruleForm.CustomerId);
			} finally {
				state.isShowDialog = true;
			}
		}

		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
		};


		//加载平台名称
		const loadsiteName = async () =>{
			const siteNameRes = await proxy.$api.erp.businessBill.getListByScope('warehouse_plateform', 0, 0);
			if (siteNameRes.errcode == 0) {
				state.businessBillList = siteNameRes.data;
			}else{
				console.log("error:",siteNameRes.errmsg)
			}
		}

		//加载客户名称列表
		const loadCustomerName = async () => {
			const CustomerNameRes = await proxy.$api.erp.company.getListByScope("customer", 0, 2, {pageSize:1000000});
			if (CustomerNameRes.errcode == 0) {
				state.companyNameList = [...CustomerNameRes.data];
			}else{
				console.log("error:",CustomerNameRes.errmsg)
			}
		}

		// 选中客户后，加载最近的运单信息
		const loadList = async (customerId:number|string) => {
			
			if(!customerId||customerId=="0"){
				state.tableList=[];
				return;
			}
			console.log(customerId)
			const res = await proxy.$api.erp.businessBillLine.getListByScope('product', 0, 0,{customerId:customerId});
			if (res.errcode != 0) {
				return;
			}
			state.tableList=res.data;
		};

	
		// 保存按钮
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						const res = await proxy.$api.erp.businessBillLine.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetTableDtoData();
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
			GetByIdRow,
			dateFormatYMD,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		}
	}
}
</script>
