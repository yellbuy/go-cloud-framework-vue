<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="月份" prop="BillTime" >
							<el-date-picker
								v-model="ruleForm.BillTime"
								type="month"
								placeholder="请选择"
								/>
						</el-form-item>
					</el-col>
					
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="备注" prop="Remark">
							<el-input v-model="ruleForm.Remark" ></el-input> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">加油信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" class="mb20">
						<el-table
							ref="mainTableRef"
							:data="ruleForm.EnergyBillLines"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-175)"
							border
							stripe
							highlight-current-row
						>
							<el-table-column prop="VehicleNumber" label="车牌号" width="100" fixed>
								<template #default="scope">
									<el-input v-model="scope.row.VehicleNumber" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume21" label="21号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume21" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume22" label="22号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume22" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume23" label="23号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume23" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume24" label="24号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume24" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume25" label="25号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume25" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume26" label="26号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume26" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume27" label="27号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume27" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume28" label="28号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume28" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume29" label="29号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume29" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume30" label="30号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume30" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume31" label="31号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume31" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume01" label="1号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume01" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume02" label="2号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume02" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume03" label="3号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume03" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume04" label="4号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume04" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume05" label="5号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume05" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume06" label="6号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume06" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume07" label="7号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume07" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume08" label="8号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume08" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume09" label="9号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume09" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume10" label="10号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume10" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume11" label="11号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume11" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume12" label="12号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume12" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume13" label="13号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume13" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume14" label="14号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume14" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume15" label="15号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume15" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume16" label="16号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume16" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume17" label="17号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume17" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume18" label="18号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume18" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume19" label="19号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume19" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Volume20" label="20号" width="70" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Volume20" :value-on-clear="0" style="width: 60px" min="0" max="1000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column :width="proxy.$calcWidth(130)" fixed="right">
								<template #header>
									<el-button bg type="primary" @click="onAddRow()">
										{{ $t('message.action.add') }}
									</el-button>
									<el-button bg type="primary" @click="onImport(scope.row.Id)">
										{{ $t('message.action.import') }}
									</el-button>
								</template>
								<template #default="scope">
									<el-button text bg type="danger" @click="onDelRow(scope.$index)">
										{{ $t('message.action.delete') }}
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-if="!disable" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">
						{{ $t('message.action.save')}}
					</el-button>
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
				Kind: 'oil',
				CustomerId:"",
				GoodsId:"",
				BillTime: '',
				EnergyBillLines:[{}],
			},
			
			dialogVisible: false,

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

		const onAddRow = () => {
		 	state.ruleForm.EnergyBillLines=[{},...state.ruleForm.EnergyBillLines]
		};
		const onDelRow = (index:number) => {
			state.ruleForm.EnergyBillLines.splice(index,1)
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
			onAddRow,
			onDelRow,
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