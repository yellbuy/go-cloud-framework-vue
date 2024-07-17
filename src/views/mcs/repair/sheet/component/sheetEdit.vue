<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="1000px" :before-close="closeDialog">
			<el-divider content-position="left">基本信息*</el-divider>
			<el-card shadow="hover">
				<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="："
					v-loading="loading">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="维修单号" prop="BillNo">
								<el-input
									v-model="ruleForm.BillNo"
									autofocus
									placeholder="请输入"
									maxlength="100"
									disabled
									clearable>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="车牌号" prop="VehicleNumber">
								<el-input
									v-model="ruleForm.VehicleNumber"
									placeholder="请输入" 
									clearable disabled>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="车辆品牌" prop="Brand">
								<el-input
									v-model="ruleForm.Brand"
									placeholder="请输入" 
									clearable
									disabled>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="车型" prop="VehicleType">
								<el-select
									v-model="ruleForm.VehicleType"
									placeholder="请选择"
									disabled>
									<el-option v-for="(item, index) in truckTypeList" :key="index" :label="item.Name" :value="item.Id"> </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="客户名称" prop="CompanyName">
								<el-input
									v-model="ruleForm.CompanyName"
									placeholder="请输入" 
									clearable
									disabled>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="公里数" prop="Mileage">
								<el-input
									v-model.number="ruleForm.Mileage"
									placeholder="请输入" 
									clearable
									disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="到厂次数" prop="SiteId">
								<el-input
									v-model="ruleForm.SiteId"
									autofocus
									placeholder="请输入"
									maxlength="100"
									disabled
									clearable>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="联系人" prop="Linkman">
								<el-input
									v-model="ruleForm.Linkman"
									placeholder="请输入"
									clearable
									disabled>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="联系电话" prop="Phone">
								<el-input
									v-model="ruleForm.Phone"
									placeholder="请输入"
									clearable
									disabled>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="维修类型" prop="ExamState">
							<el-switch
								v-model="ruleForm.ExamState"
    							active-text="维修中"
    							inactive-text="保养"
								:active-value="1"
								:inactive-value="10"
								disabled/>				
						</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="进厂时间" prop="StartTime" required>
								<el-date-picker
									v-model="ruleForm.StartTime"
									type="datetime"
									placeholder="请选择时间"
									disabled
									format="YYYY-MM-DD HH:mm" >
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="是否完工" prop="State">
								<el-select v-model="ruleForm.State" class="m-2" placeholder="请选择">
									<el-option :label="'未开单'" :value="0" />
									<el-option :label="'已开单'" :value="1" />
									<el-option :label="'已完工'" :value="2" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="完工时间" prop="EndTime" required>
								<el-date-picker
									v-model="ruleForm.EndTime"
									type="datetime"
									placeholder="请选择时间"
									format="YYYY-MM-DD HH:mm">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="备注" prop="Remark">
								<el-input
									v-model="ruleForm.Remark"
									autofocus
									placeholder="请输入"
									maxlength="100"
									clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-card>
			<el-divider content-position="left">项目列表*</el-divider>
			<div class="mb10">
				<el-form>
					<el-form-item>
						<el-button type="primary" @click="onOpenProjectDlg('', false)" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="ruleForm.VehicleProjectList" v-loading="projectTableData.loading"
				:height="200" show-summary :summary-method="getProjectAmountSummaries" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="Name" label="项目名称" width="200" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Amount" label="应付金额" width="110" align="right" show-overflow-tooltip fixed>
					<template #default="scope">
						{{ calcRowAmount(scope.row) }}
					</template>
				</el-table-column>
				<el-table-column prop="Qty" label="工时" width="80" align="right">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Qty"
							size="small"
							style="width: 80px;"
    						controls-position="right"
    						@change="handleChange"/>
					</template>
				</el-table-column>
				<el-table-column prop="Price" label="单价" width="90" align="right">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Price"
							size="small"
							style="width: 80px;"
    						controls-position="right"
    						@change="handleChange"/>
					</template>
				</el-table-column>
				
				<el-table-column prop="Content" label="服务内容" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Remark" label="备注" show-overflow-tooltip>
					<template #default="scope">
						<el-input v-model="scope.row.Remark" autofocus placeholder="" maxlength="100"
							clearable>
						</el-input>
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(80)" fixed="right">
					<template #default="scope">
						<el-button text bg type="danger" @click="onProjectDel(scope.$index)" v-auth:[moduleKey]="'btn.Del'">
							{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-divider content-position="left">配件列表*</el-divider>
			<div class="mb10">
				<el-form>
					<el-form-item>
						<el-button type="primary" @click="onOpenGoodsDlg('', false)" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="ruleForm.VehicleGoodsList" v-loading="goodsTableData.loading"
				:height="200" show-summary :summary-method="getGoodsAmountSummaries" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="GoodsName" label="配件名称" width="200" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Amount" label="应付金额" width="110" align="right" show-overflow-tooltip fixed>
					<template #default="scope">
						{{ calcRowAmount(scope.row) }}
					</template>
				</el-table-column>
				<el-table-column prop="Qty" label="数量" width="80" align="right">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Qty"
							size="small"
    						controls-position="right"
    						@change="handleChange"/>
					</template>
				</el-table-column>
				<el-table-column prop="Price" label="单价" width="90" align="right">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Price"
							size="small"
    						controls-position="right"
    						@change="handleChange"/>
					</template>
				</el-table-column>
				
				<el-table-column prop="Remark" label="备注" show-overflow-tooltip>
					<template #default="scope">
						<el-input
							v-model="scope.row.Remark"
							autofocus
							placeholder="请输入"
							maxlength="100"
							clearable>
						</el-input>
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(80)" fixed="right">
					<template #default="scope">
						<el-button text bg type="danger" @click="onGoodsDel(scope.$index)" v-auth:[moduleKey]="'btn.Del'">
							{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class ="m10">
				<el-text type="primary" size="large">共：¥ {{ getTotalCost }}</el-text>
			</div>
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
	<editProjectDlg ref="editProjectDlgRef" />
	<sheetGoodsDlg ref="editGoodsDlgRef" />
	<addWorkerDlg ref="addWorkerDlgRef" />
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import type { VNode } from 'vue';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import addWorkerDlg from './sheetAdd.vue';
import sheetGoodsDlg from './sheetGoods.vue';
import editProjectDlg from './sheetProject.vue';
import commonFunction from '/@/utils/commonFunction';

export default {
	name: 'sheetEdit',
	components: { editProjectDlg, sheetGoodsDlg, addWorkerDlg},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const editProjectDlgRef = ref();
		const editGoodsDlgRef = ref();
		const addWorkerDlgRef = ref();
		const kind = "repair";
		console.log("message.action.add:", t('message.action.add'))			
		const moduleKey = `api_repair_sheet`;

		const state = reactive({
			moduleKey: moduleKey,
			isShowDialog: false,
			kind,
			title: t('message.action.add'),
			loading: false,
			disable: true, //是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
			//表单
			ruleForm: {
				Id: 0,
				Name: '',
				Kind: 'info',
				SiteId: '',
				No: '',
				Qty: 0,
				Remark: '',
				BillNo: '',
				VehicleNumber: '',
				Brand: '',
				VehicleType: '',
				CompanyName: '',
				Mileage: 0,
				Linkman: '',
				Phone: '',
				ExamState: '',
				StartTime: '',
				EndTime: '',
				Content:'',
				SellerNote:'',
				VehicleProjectList:[], // 项目列表
				VehicleGoodsList:[], //配件列表
			},
			tableItem: {
				Id: '0',
				CategoryId: '',
				Name: '',
				Files: '',
				StartTime: '',
				EndTime: '',
				Kind: 'info',
			},
			dialogVisible: false,
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
			truckTypeList: [],
			examStateList:[],
			projectTotalCost:0,
			goodsTotalCost:0,
			projectTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
			goodsTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
		});
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			VehicleNumber: [
				{
					required: true,
					message: computed(() => t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			State: [
				{
					required: true,
					message: computed(() => t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			Brand: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			VehicleType: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			CompanyName: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Mileage: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Linkman: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Phone: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			ExamState: [
				{
					message: t('message.validRule.required'),				
					required: true,
					trigger: 'blur',
				},
			],
			StartTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			EndTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		
		const calcTotalCost = () => {
			const projectTotalCost=state.ruleForm.VehicleProjectList.reduce((prev, curr) => {
				const value = Number(curr.Price)*Number(curr.Qty)
				if (!Number.isNaN(value)) {
					return prev + value
				} else {
					return prev
				}
			}, 0)
			console.log ("projectTotalCost:",projectTotalCost)
			const goodsTotalCost=state.ruleForm.VehicleGoodsList.reduce((prev, curr) => {
				const value = Number(curr.Price)*Number(curr.Qty)
				if (!Number.isNaN(value)) {
					return prev + value
				} else {
					return prev
				}
			}, 0)
			state.projectTotalCost=projectTotalCost;
			state.goodsTotalCost=goodsTotalCost;
		}

		const getTotalCost = computed(() => {
			console.log('state.projectTotalCost:', state.projectTotalCost,state.goodsTotalCost);
			const total = state.projectTotalCost+state.goodsTotalCost;
			return total.toFixed(2);
		});

		const handleChange = (value: number) => {
  		//console.log(value)
		  calcTotalCost();
		}

		const tableData = reactive({
			data: [],
			loading: false,
			param: {
				pageNum: 1,
				pageSize: 10000,
			},
		});
		// 打开弹窗
		const onOpenGoodsDlg = (id: string, ishow: boolean) => {
			console.log("弹框", editProjectDlgRef)
			editGoodsDlgRef.value.openDialog(state.kind, id, ishow);
		};
		const onOpenProjectDlg = (id: string, ishow: boolean) => {
			editProjectDlgRef.value.openDialog(state.kind, id, ishow);
		};
		const onAddWorkerOpenDlg = (id: string, ishow: boolean) => {
			console.log("派单")
			addWorkerDlgRef.value.openDialog(state.kind, id, ishow);
		};
		// 删除项目
		const onProjectDel = (index:number) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.ruleForm.VehicleProjectList.splice(index,1)
				calcTotalCost();
				return true;
			});
		}; 
		// 删除配件
		const onGoodsDel = (index:number) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.ruleForm.VehicleGoodsList.splice(index,1)
				calcTotalCost();
				return true;
			});
		};
		const saveProject = (list: never[]) => {
			const items=list.map(val=>{return reactive({Id:"0",ProjectId:val.Id,Name:val.Name,Content:val.Content,Qty:val.Qty,Price:val.Price,Remark:val.Remark,Amount:val.Amount})});
			state.ruleForm.VehicleProjectList=[...state.ruleForm.VehicleProjectList,...items]
			calcTotalCost();
		}
		const saveGoods = (list: never[]) => {
			const items=list.map(val=>{return reactive({Id:"0",GoodsId:val.Id,GoodsSn:val.GoodsSn,GoodsName:val.GoodsName,Qty:1,Price:val.ShopPrice,SellerNote:val.SellerNote,Amount:val.Amount})});
			state.ruleForm.VehicleGoodsList=[...state.ruleForm.VehicleGoodsList,...items]
			calcTotalCost();
		}
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: kind, StartTime: '' };
			try {
				const resTruckTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('vehicle_id', 0, 2);
				if (resTruckTypes.errcode == 0) {
					state.truckTypeList = resTruckTypes.data;
				} else {
					console.log("error:", resTruckTypes.errmsg)
				}
				const resEnergyTypes = await proxy.$api.common.commondata.getConcreteDataListByScope("exam_state", 1, 2);
				if (resEnergyTypes.errcode == 0) {
				 	state.examStateList = resEnergyTypes.data;
				} else {
				 	console.log("error:", resEnergyTypes.errmsg)
				}
				state.disable = disable;
				if (id && id != '0') {
					getByIdRow(id);
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
		};
		const getByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.vehicle.getById(Id,true);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				calcTotalCost();
			} finally {
				state.isShowDialog = true;
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
		};

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
		};
		//修改按钮
		const onModelEdit = (item: object) => {
			state.tableItem = item;
			console.log(state.tableItem.Files);
			if (state.tableItem.Files != '') {
				state.Files = item.Files.split(',');
				state.FilesList = [];
				for (let i = 0; i < state.Files.length; i++) {
					let image = { url: '' };
					image.url = state.httpsText + state.Files[i];
					state.FilesList.push(image);
				}
			}
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
						if(state.ruleForm.VehicleProjectList.length>0){
							state.ruleForm.VehicleProjectList.forEach(item => {
								item.Amount = calcRowAmount(item)
							});
						};
						if(state.ruleForm.VehicleGoodsList.length>0){
							state.ruleForm.VehicleGoodsList.forEach(item => {
								item.Amount = calcRowAmount(item)
							});
						};
						const vehicle = await proxy.$api.erp.vehicle.save(state.ruleForm,
						[state.ruleForm.VehicleProjectList],[state.ruleForm.VehicleGoodsList]);
						if (vehicle.errcode == 0) {
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
 		// 计算行金额
		const calcRowAmount = (row)=>{
			let amount=0;
			if (row.Price && row.Qty) {
        		amount= row.Price * row.Qty;
      		}
			return amount;
		};
		const getProjectAmountSummaries = (param: any) => {
			const { columns, data } = param
			const sums: (string | VNode)[] = []
			columns.forEach((column, index) => {
				if (index === 0) {
				sums[index] ='合计：'
				return
				}
				if(index!=2){
					sums[index] ='';
					return;
				}
				sums[index] = `¥ ${state.projectTotalCost}`;
				// const values = data.map((item) => Number(item[column.property]))
				// if (!values.every((value) => Number.isNaN(value))) {
				// sums[index] = `¥ ${values.reduce((prev, curr) => {
				// 	const value = Number(curr)
				// 	if (!Number.isNaN(value)) {
				// 	return prev + curr
				// 	} else {
				// 	return prev
				// 	}
				// }, 0)}`
				// } else {
				// sums[index] = 'N/A'
				// }
			})

			return sums
		};
		const getGoodsAmountSummaries = (param: any) => {
			const { columns, data } = param
			const sums: (string | VNode)[] = []
			columns.forEach((column, index) => {
				if (index === 0) {
				sums[index] ='合计：'
				return
				}
				if(index!=2){
					sums[index] ='';
					return;
				}
				sums[index] = `¥ ${state.goodsTotalCost}`;
				// const values = data.map((item) => Number(item[column.property]))
				// if (!values.every((value) => Number.isNaN(value))) {
				// sums[index] = `¥ ${values.reduce((prev, curr) => {
				// 	const value = Number(curr)
				// 	if (!Number.isNaN(value)) {
				// 	return prev + curr
				// 	} else {
				// 	return prev
				// 	}
				// }, 0)}`
				// } else {
				// sums[index] = 'N/A'
				// }
			})

			return sums
		};
		// 页面加载时
		onMounted(() => {

		});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			getByIdRow,
			onModelEdit,
			dateFormatYMD,
			getTotalCost,
			rules,
			onSubmit,
			onOpenGoodsDlg,
			onOpenProjectDlg,
			editProjectDlgRef,
			editGoodsDlgRef,
			addWorkerDlgRef,
			saveProject,
			saveGoods,
			onProjectDel,
			onGoodsDel,
			onAddWorkerOpenDlg,
			handleChange,
			calcRowAmount,
			getProjectAmountSummaries,
			getGoodsAmountSummaries,
			...toRefs(state),
		};
	},
	data() {
		return {};
	},
	methods: {},
};
</script>
<style scoped lang="scss">
.el-select .el-date-picker .el-input .el-input-number {
	width: 100%;
}
</style>