<template>
	<div class="system-edit-main-container">
		<el-dialog :title="title" v-model="isShowDialog" width="800px" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">铁运收入*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="客户名称" prop="CustomerId">
							<el-select
								v-model="ruleForm.CustomerId"
								style="width: 200px"
								filterable
								placeholder="请选择"
								@visible-change = "loadCustomerName">
								<el-option v-for="(item, index) in companyNameList" :key="index" :label="item.CompanyName" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="日期" prop="BillTime">
							<el-date-picker
								v-model="ruleForm.BillTime"
								style="width: 200px"
								type="date"
								placeholder="日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
					</el-col>	
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="产品类型" prop="GoodsCategoryId">
							<el-select
								v-model="ruleForm.GoodsCategoryId"
								style="width: 200px"
								filterable
								placeholder="请选择"
								@visible-change = "loadGoodsCategory"
								@change = "clearGoodsName">
								<el-option v-for="(item, index) in goodsCategoryList" :key="index" :label="item.Name" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="产品名称" prop="GoodsId">
							<el-select
								v-model="ruleForm.GoodsId"
								style="width: 200px"
								filterable
								placeholder="请选择"
								@visible-change = "loadgoodsName">
								<el-option v-for="(item,index) in goodsNameList" :key="index" :label="item.GoodsName" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="吨位" prop="Weight">
							<el-input
								v-model.number="ruleForm.Weight"
								style="width: 200px"
								placeholder="请输入"
								type="number"
								min="0"
								max="1000000000"
								step="1">
								<template #append>吨</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="列数" prop="PlanVehicleCount">
							<el-input
								v-model.number="ruleForm.PlanVehicleCount"
								style="width: 200px"
								placeholder="请输入"
								type="number"
								min="0"
								max="1000000000"
								step="1"
								oninput="this.value = this.value.replace(/[^0-9]/g, '')">
								<template #append>列</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">收发货信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="发货站" prop="SenderAddress">
							<el-select
								v-model="ruleForm.SenderAddress"
								style="width: 200px"
								filterable="true"
								allow-create
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入并选择"
								@visible-change = "loadSenderAddressList">
								<el-option v-for="(item,index) in senderAddressList" :key="index" :label="item" :value="item"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="到达地" prop="ReceiverAddress">
							<el-select
								v-model="ruleForm.ReceiverAddress"
								style="width: 200px"
								filterable="true"
								allow-create
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入并选择"
								@visible-change = "loadReceiverAddressList">
								<el-option v-for="(item,index) in receiverAddressList" :key="index" :label="item" :value="item"> </el-option>
							</el-select>
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
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {

	name: 'mainEdit',

	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
		const store = useStore();
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //是否禁用
			//表单
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
				PlanVehicleCount:'',
				Weight:'',
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
			senderAddressList: [],
			receiverAddressList: [],
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
			Weight: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
			PlanVehicleCount: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
			SenderAddress: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
			ReceiverAddress: [
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

			// loadSenderAddressList(),
			// loadReceiverAddressList(),
			try {
				state.disable = disable;
				if (id && id != '0' && disable == true) {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else if (id && id != '0' && disable == false){
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
			} finally {
				state.isShowDialog = true;
			}
		}

		//加载客户名称列表
		const loadCustomerName = async (visible: object) => {
			if (visible) {
				const CustomerNameRes = await proxy.$api.erp.company.getListByScope("customer", 0, 2, {pageSize:1000000});
				if (CustomerNameRes.errcode == 0) {
					state.companyNameList = CustomerNameRes.data;
				}else{
					console.log("error:",CustomerNameRes.errmsg)
				}
			}
		}

		//加载产品类型
		const loadGoodsCategory = async (visible: object) => {
			if (visible) {
				const GoodsCategoryRes = await proxy.$api.common.category.getHierarchyDataList("product", 0, 2, {pageSize:10000});
				if (GoodsCategoryRes.errcode == 0) {
					state.goodsCategoryList = GoodsCategoryRes.data;
				}else{
					console.log("error:",GoodsCategoryRes.errmsg);
				}
			}
		}

		//清空产品名
		const clearGoodsName = async() => {
			state.ruleForm.GoodsId = ""; 
		}

		//加载产品名称
		const loadgoodsName = async (visible: object) => {
			if (visible) {
				
				const goodsNameRes = await proxy.$api.wms.goods.getListByScope('product', 0, 2, {pageSize:10000, categoryId:state.ruleForm.GoodsCategoryId});
				if (goodsNameRes.errcode == 0) {
					state.goodsNameList = goodsNameRes.data;
				}else{
					console.log("error:",goodsNameRes.errmsg)
				}
			}
		}


		//加载发货地列表
		const loadSenderAddressList = async (visible: object) => {
			if (visible) {
				const SenderAddressRes = await proxy.$api.erp.businessBillLine.getListByScope("main_business", 0, 2, {pageSize:1000000, Order:"CreateTime asc"});
				if (SenderAddressRes.errcode == 0) {
					for (let i = 0; i < SenderAddressRes.data.length; i++){
						state.senderAddressList.push(SenderAddressRes.data[i].SenderAddress);
					}
				state.senderAddressList = state.senderAddressList.filter((value, index, self) => self.indexOf(value) === index);
				}else{
					console.log("error:",SenderAddressRes.errmsg)
				}
			}
		}

		//加载目的地列表
		const loadReceiverAddressList = async (visible: object) => {
			if (visible) {
				const ReceiverAddressRes = await proxy.$api.erp.businessBillLine.getListByScope("main_business", 0, 2, {pageSize:1000000});
				if (ReceiverAddressRes.errcode == 0) {
					for (let i = 0; i < ReceiverAddressRes.data.length; i++) {
						state.receiverAddressList.push(ReceiverAddressRes.data[i].ReceiverAddress);
					}
				state.receiverAddressList = state.receiverAddressList.filter((value, index, self) => self.indexOf(value) === index);
				}else{
					console.log("error:",ReceiverAddressRes.errmsg)
				}
			}
		}


		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
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
						const res = await proxy.$api.erp.businessBillLine.save(state.ruleForm);
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
		

		//时间格式
		const { dateFormatYMD } = commonFunction();


		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			GetByIdRow,
			onModelEdit,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			loadCustomerName,
			loadGoodsCategory,
			loadgoodsName,
			loadSenderAddressList,
			loadReceiverAddressList,
			clearGoodsName,
			...toRefs(state),
		};
	},
};
</script>
