<template>
	<div class="system-edit-main-container">
		<el-dialog :title="title" v-model="isShowDialog" width="40%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">铁运收入*</el-divider>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12"  class="mb20">
						<el-form-item label="客户名称" prop="CustomerId">
							<el-select
								v-model="ruleForm.CustomerId"
								filterable
								placeholder="请选择"
								@change = "loadAddressList">
								<el-option v-for="(item, index) in companyNameList" :key="index" :label="item.CompanyName" :value="item.Id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12"  class="mb20">
						<el-form-item label="月份" prop="BillTime">
							<el-date-picker
								v-model="ruleForm.BillTime"
								type="month"
								placeholder="月份"
								format="YYYY年MM月" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12"  class="mb20">
						<el-form-item label="产品类型" prop="GoodsCategoryId">
							<el-select
								v-model="ruleForm.GoodsCategoryId"
								@change="onCategorySelect"
								filterable
								placeholder="请选择">
								<el-option v-for="(item, index) in goodsCategoryList" :key="index" :label="item.Name" :value="item.Id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12"  class="mb20">
						<el-form-item label="产品名称" prop="GoodsId">
							<el-select
								v-model="ruleForm.GoodsId"
								filterable
								placeholder="请选择"
								@change = "loadAddressList">
								<el-option v-for="(item,index) in goodsNameList" :key="index" :label="item.GoodsName" :value="item.Id" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="12" :lg="12"  class="mb20">
						<el-form-item label="计划吨位" prop="PlanQty">
							<el-input-number
								v-model="ruleForm.PlanQty"
								:controls="true"
								precision="2"
								placeholder="请输入"
								min="0"
								max="1000000000"
								step="1" />
						</el-form-item>
					</el-col>
					
				</el-row>
				
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">
						<el-form-item label="备注" prop="Remark">
							<el-input
								v-model="ruleForm.Remark"
								type="textarea"
								:rows="3"
								placeholder="请输入" />
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
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {

	name: 'mainEdit',

	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();
		
		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //	是否禁用
			//	表单
			ruleForm: {
				Id:0,
				Kind:'main_business',
				CustomerId:"",
				CompanyName:"",
				GoodsCategoryId:"",
				GoodsCategoryName:"",
				GoodsId:"",
				GoodsName:"",
				BillTime:new Date(),
				VehicleCount:0,
				PlanWeight:0,
				Weight:0,
				SenderAddress:'',
				ReceiverAddress:'',
				IsExternal:0,
				State:1,
				SenderPlanTime:new Date(),
				ReceiverPlanTime:new Date(),
			},
			
			dialogVisible: false,
			goodsCategoryList:[],
			goodsNameList:[],
			companyNameList:[],
			tableList:[],
			saveState: false,
			Files: [],
		});

		const token = Session.get('token');

		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			CustomerId: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			BillTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			GoodsId: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
			PlanQty: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
			
		});
		
		//	打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			try {
				state.disable = disable;
				await loadCustomerName()
				await loadGoodsCategory()
				await loadGoodsList()
				await loadAddressList()
				if (id && id != '0' && disable == true) {
					await getByIdRow(id);
					state.title = t('message.action.edit');
				} else if (id && id != '0' && disable == false){
					await getByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = '0';
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

		const getByIdRow = async (id: string) => {
			try {
				const res = await proxy.$api.erp.businessBill.getById(id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		}

		//	加载客户名称列表
		const loadCustomerName = async () => {
			const CustomerNameRes = await proxy.$api.erp.company.getListByScope("customer", 0, 2, {pageSize:1000000});
			if (CustomerNameRes.errcode == 0) {
				state.companyNameList = CustomerNameRes.data;
			}else{
				console.log("error:",CustomerNameRes.errmsg)
			}
		}

		//	加载产品类型
		const loadGoodsCategory = async () => {
			const GoodsCategoryRes = await proxy.$api.common.category.getHierarchyDataList("product", 0, 2, {pageSize:10000});
			if (GoodsCategoryRes.errcode == 0) {
				state.goodsCategoryList = GoodsCategoryRes.data;
			}else{
				console.log("error:",GoodsCategoryRes.errmsg);
			}
		}

		//	加载产品名称
		const loadGoodsList = async (categoryId:string="0") => {
			state.goodsNameList=[];
			state.ruleForm.GoodsId=""
			const goodsNameRes = await proxy.$api.wms.goods.getListByScope('product', 0, 2, {pageSize:10000, categoryId:categoryId});
			if (goodsNameRes.errcode == 0) {
				state.goodsNameList = goodsNameRes.data;
			}else{
				console.log("error:",goodsNameRes.errmsg)
			}
		}

		const onCategorySelect=async (id:string)=>{			
			//loadGoodsList(id);
		}

		//	加载地址列表
		const loadAddressList = async () => {
			state.senderAddressList=[];
			state.receiverAddressList=[];
			const res = await proxy.$api.erp.businessBill.getListByScope("main_business", 0, 2, {pageSize:1000000});
			if (res.errcode == 0) {
				for (let i = 0; i < res.data.length; i++){
					state.senderAddressList.push(res.data[i].SenderAddress);
					state.receiverAddressList.push(res.data[i].ReceiverAddress);
				}
				state.senderAddressList = state.senderAddressList.filter((value, index, self) => self.indexOf(value) === index);
				state.receiverAddressList = state.receiverAddressList.filter((value, index, self) => self.indexOf(value) === index);
			} else {
				console.log("error:",senderAddressRes.errmsg)
			}
		}


		//	关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
		};

		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.BusinessBillType=1; //1：计划，2：生产
					try {
						const res = await proxy.$api.erp.businessBill.save(state.ruleForm);
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
		

		//	时间格式
		const { dateFormatYMD } = commonFunction();


		//	页面加载时
		onMounted(() => {});

		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			getByIdRow,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			loadCustomerName,
			loadGoodsCategory,
			onCategorySelect,
			loadAddressList,
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