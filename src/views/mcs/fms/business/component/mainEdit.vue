<template>
	<div class="system-edit-main-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">铁运收入*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="客户名称" prop="CustomerId" >
							<el-select v-model="ruleForm.CustomerId" filterable placeholder="请选择" @change="onCustomerSelected">
								<el-option v-for="item in customerList" :key="item.Id" :label="item.CompanyName" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="日期" prop="SenderPlanTime">
							<el-date-picker
								v-model="ruleForm.SenderPlanTime"
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
							<el-tree-select
								v-model="ruleForm.GoodsCategoryId"
								placeholder="产品类型"
								default-expand-all
								node-key="Id"
								:value-key="Id"
								:current-node-key="ruleForm.GoodsCategoryId"
								:data="goodsTypeList"
								:props="{ label: 'Name', value: 'Id', children: 'Children' }"
								check-strictly
								highlight-current
								@change="onCategorySelect"
							/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="产品名称" prop="GoodsId">
							<el-select v-model="ruleForm.GoodsId" placeholder="请选择">
								<el-option v-for="item in goodsList" :key="item.Id" :label="item.GoodsName" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="吨位" prop="PlanWeight">
							<el-input-number v-model.number="ruleForm.PlanWeight" min="0" max="1000000000"></el-input-number> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="列数" prop="VehicleCount">
							<el-input-number v-model.number="ruleForm.VehicleCount" min="0" max="1000000000"></el-input-number> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">收发货信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="发货站" prop="SenderAddress">
							<el-select
								v-model="ruleForm.SenderAddress"
								filterable
								allow-create
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入或选择">
								<el-option v-for="item in waybillList" :key="item.Id" :label="item.SenderAddress" :value="item.SenderAddress"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12"  class="mb20">
						<el-form-item label="到达地" prop="ReceiverAddress">
							<el-select
								v-model="ruleForm.ReceiverAddress" 
								filterable
								allow-create
								default-first-option
								:reserve-keyword="false"
								placeholder="请输入或选择">
								<el-option v-for="item in waybillList" :key="item.Id" :label="item.ReceiverAddress" :value="item.ReceiverAddress"> </el-option>
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
				Kind: 'main_business',
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
			waybillList:[],

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
				const resTruckTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('vehicle_type', 0, 2);
				if (resTruckTypes.errcode == 0) {
					state.truckTypeList = resTruckTypes.data;
				}else{
					console.log("error:",resTruckTypes.errmsg)
				}
				const resPlateColors = await proxy.$api.common.commondata.getConcreteDataListByScope('plate_color', 0, 2);
				if (resPlateColors.errcode == 0) {
					state.plateColorList = resPlateColors.data;
				}else{
					console.log("error:",resPlateColors.errmsg)
				}
				const resEnergyTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('energy_type', 0, 2);
				if (resEnergyTypes.errcode == 0) {
					state.energyTypeList = resEnergyTypes.data;
				}else{
					console.log("error:",resEnergyTypes.errmsg)
				}
				const resPlateColorTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('plate_color', 0, 2);
				if (resPlateColorTypes.errcode == 0) {
					state.plateColorList = resPlateColorTypes.data;
				} else{
					console.log("error:",resPlateColorTypes.errmsg);
				}
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
				await loadWaybillList(state.ruleForm.CustomerId);
			} finally {
				state.isShowDialog = true;
			}
		}

		// 选中客户后，加载最近的运单信息
		const loadWaybillList = async (customerId:number|string) => {
			
			if(!customerId||customerId=="0"){
				state.waybillList=[];
				return;
			}
			console.log(customerId)
			const res = await proxy.$api.erp.waybill.getListByScope(state.ruleForm.Kind, 0, 0,{customerId:customerId});
			if (res.errcode != 0) {
				return;
			}
			state.waybillList=res.data;
		};

		// 选中客户后，加载最近的运单信息
		const onCustomerSelected = async (customerId:number|string) => {
			//清空地址，防止选择了不同的客户忘了修改地址，导致地址录入错误
			state.ruleForm.SenderAddress="" 
			state.ruleForm.ReceiverAddress=""
			await loadWaybillList(customerId)
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};

		const onLoadTable = () => {
			//proxy.$parent.onMainGetTableData();
		};
		const onCategorySelect=async (id:string)=>{
			loadGoodsList(id);
		}
		const loadGoodsCategory = async () => {
			const goodsTypeRes = await proxy.$api.common.category.getHierarchyDataList("product", 0, 2, {pageSize:10000});
			if (goodsTypeRes.errcode == 0) {
				state.goodsTypeList = [...[{"Id":"0","Name":"所有"}],...goodsTypeRes.data];
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
		const onBeforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
			if (
				rawFile.type !== 'image/jpeg' &&
				rawFile.type !== 'image/jpg' &&
				rawFile.type !== 'image/png' &&
				rawFile.type !== 'image/ico' &&
				rawFile.type !== 'image/bmp' &&
				rawFile.type !== 'image/gif' &&
				rawFile.type !== 'image/svg'
			) {
				ElMessage.error('图片格式错误，支持的图片格式：jpg，png，gif，bmp，ico，svg');
				return false;
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('图片大小不能超过10MB!');
				return false;
			}
			return true;
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
			onCustomerSelected,
			GetByIdRow,
			onBeforeImageUpload,
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
<style scoped lang="scss">
.el-select {
	width: 100%;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	text-align: center;
	padding: 40px;
}
</style>