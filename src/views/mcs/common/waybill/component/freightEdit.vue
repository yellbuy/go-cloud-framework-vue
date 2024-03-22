<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="800px" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">货物名称*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="客户名称" prop="CustomerId" >
							<el-select
								v-model="ruleForm.CustomerId"
								style="width: 200px"
								filterable
								placeholder="请选择"
								@change="onFormSelected">
								<el-option v-for="(item, index) in customerList" :key="index" :label="item.CompanyName" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="业务类型" prop="WaybillMode">
							<div mb-2 flex items-center>
								<el-radio-group v-model="ruleForm.WaybillMode">
									<el-radio :label="1">货运</el-radio>
									<el-radio :label="10">临配</el-radio>
								</el-radio-group>
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="单价" prop="Price">
							<el-input
								v-model.number="ruleForm.Price"
								style="width: 200px"
								placeholder="请输入"
								type="number"
								min="0"
								max="1000000000"
								step="1"
								controls-position="right">
								<template #append>元</template>
							</el-input>
						</el-form-item>
					</el-col>
					</el-row>
					<el-row :gutter="20">
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="产品类型" prop="GoodsCategoryId">
							<el-select
								v-model="ruleForm.GoodsCategoryId"
								style="width: 200px"
								filterable
								placeholder="请选择"
								@change="onCategorySelect">
								<el-option v-for="(item, index) in goodsTypeList" :key="index" :label="item.Name" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="产品名称" prop="GoodsId">
							<el-select
								v-model="ruleForm.GoodsId"
								style="width: 200px"
								filterable
								placeholder="请选择"
								@change="onFormSelected">
								<el-option v-for="(item, index) in goodsList" :key="index" :label="item.GoodsName" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="计划量" prop="PlanWeight">
							<el-input
								v-model.number="ruleForm.PlanWeight"
								style="width: 200px"
								placeholder="请输入"
								type="number"
								min="0"
								max="1000000000"
								step="1">
								<template #append>
									<el-select
									v-model="ruleForm.Unit"
									style="width: 80px"
									filterable
									placeholder="请选择"
									@change="onFormSelected">
									<el-option label="吨" value=""> </el-option>
									<el-option label="台班" value="台班"> </el-option>
								</el-select>
								</template>
							</el-input>
						</el-form-item>
					</el-col>
					
				</el-row>
				<el-divider content-position="left">收发货信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="发货地点" prop="SenderAddress">
							<el-select
								v-model="ruleForm.SenderAddress"
								style="width: 200px"
								filterable
								allow-create
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入或选择">
								<el-option v-for="(item,index) in senderAddressList" :key="index" :label="item" :value="item"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="收货地点" prop="ReceiverAddress">
							<el-select
								v-model="ruleForm.ReceiverAddress" 
								style="width: 200px"
								filterable
								allow-create
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入或选择">
								<el-option v-for="(item,index) in receiverAddressList" :key="index" :label="item" :value="item"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="要求发货时间" prop="SenderPlanTime">
							<el-date-picker
								v-model="ruleForm.SenderPlanTime"
								style="width: 200px"
								type="datetime"
								placeholder="要求发货时间"
								format="YYYY-MM-DD HH:mm"
							></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="要求收货时间" prop="ReceiverPlanTime">
							<el-date-picker
								v-model="ruleForm.ReceiverPlanTime"
								style="width: 200px"
								type="datetime"
								placeholder="要求收货时间"
								format="YYYY-MM-DD HH:mm"
							></el-date-picker>
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
	name: 'freightEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
		const store = useStore();
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
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
				CustomerId:"",
				GoodsCategoryId: '0',
				GoodsId:"",
				VehicleNumber: '',
				IsExternal:0,
				VehicleType: '',
				EnergyType: '',
				PlateColor:'',
				Vin: '',
				EngineNumber: '',
				Linkman: '',
				BusinessScope: '',
				State: 1,
				TaxpayerKind: '',
				WebSite: '',
				Fax: '',
				Im: '',
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
			GoodsId: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			SenderPlanTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			ReceiverPlanTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			CustomerId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			WaybillMode: [
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
			Price: [
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
				loadGoodsCategory();
				loadGoodsList();
				
				const resCustomers = await proxy.$api.erp.company.getListByScope("customer", 0, 2, {pageSize:1000000});
				if (resCustomers.errcode == 0) {
					state.customerList = resCustomers.data;
				}else{
					console.log("error:",resCustomers.errmsg)
				}
				// const resTruckTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('vehicle_type', 0, 2);
				// if (resTruckTypes.errcode == 0) {
				// 	state.truckTypeList = resTruckTypes.data;
				// }else{
				// 	console.log("error:",resTruckTypes.errmsg)
				// }
				// const resPlateColors = await proxy.$api.common.commondata.getConcreteDataListByScope('plate_color', 0, 2);
				// if (resPlateColors.errcode == 0) {
				// 	state.plateColorList = resPlateColors.data;
				// }else{
				// 	console.log("error:",resPlateColors.errmsg)
				// }
				// const resEnergyTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('energy_type', 0, 2);
				// if (resEnergyTypes.errcode == 0) {
				// 	state.energyTypeList = resEnergyTypes.data;
				// } else {
				// 	console.log("error:",resEnergyTypes.errmsg)
				// }
			
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
				const res = await proxy.$api.erp.waybill.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				await loadAddressList();
			} finally {
				state.isShowDialog = true;
			}
		}

		// 选中客户后，加载最近的运单信息
		const loadAddressList = async () => {
			
			if(!state.ruleForm.CustomerId||state.ruleForm.CustomerId=="0"){
				state.senderAddressList=[];
				state.receiverAddressList=[];
				return;
			}
			const res = await proxy.$api.erp.waybill.getAddressListByScope(state.ruleForm.Kind, 0, 0,{customerId:state.ruleForm.CustomerId,goodsId:state.ruleForm.GoodsId});
			if (res.errcode != 0) {
				return;
			}
			console.log("res.data",res.data)
			state.senderAddressList=res.data.SenderAddressList||[];
			state.receiverAddressList=res.data.ReceiverAddressList||[];
		};

		// 选中客户后，加载最近的运单信息
		const onFormSelected = async () => {
			//清空地址，防止选择了不同的客户忘了修改地址，导致地址录入错误
			state.ruleForm.SenderAddress="" 
			state.ruleForm.ReceiverAddress=""
			await loadAddressList()
		};
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
		const onCategorySelect=async (id:string)=>{
			loadGoodsList(id);
		}
		const loadGoodsCategory = async () => {
			const goodsTypeRes = await proxy.$api.common.category.getHierarchyDataList("product", 0, 2, {pageSize:10000});
			if (goodsTypeRes.errcode == 0) {
				state.goodsTypeList = goodsTypeRes.data;
			}else{
				console.log("error:",goodsTypeRes.errmsg)
			}
		};
		const loadGoodsList=async(categoryId:string="0")=>{
			const goodsRes = await proxy.$api.wms.goods.getListByScope('product', 0, 2, {pageSize:10000,categoryId:categoryId});
			if (goodsRes.errcode == 0) {
				state.goodsList = goodsRes.data;
			}else{
				console.log("error:",goodsRes.errmsg)
			}
		}
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
						const res = await proxy.$api.erp.waybill.save(state.ruleForm);
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
			onFormSelected,
			GetByIdRow,
			onModelEdit,
			onCategorySelect,
			showImage,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>