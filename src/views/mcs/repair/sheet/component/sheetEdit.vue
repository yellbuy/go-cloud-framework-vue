<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-divider content-position="left">基本信息*</el-divider>
			<el-card shadow="hover">
				<el-form ef="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading">
					<el-row :gutter="0">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="维修单号" prop="BillNo">
								<el-input
									v-model="ruleForm.BillNo"
									autofocus
									placeholder="系统自动生成"
									maxlength="100"
									disabled
									clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="车牌号" prop="VehicleNumber">
								<el-input
									v-model="ruleForm.VehicleNumber"
									placeholder="请输入"
									clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="车辆品牌" prop="Brand">
								<el-input
									v-model="ruleForm.Brand"
									placeholder="请输入"
									clearable />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="0">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="车型" prop="VehicleType">
								<el-input
									v-model="ruleForm.VehicleType"
									autofocus
									placeholder="请输入"
									maxlength="100"
									clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="客户名称" prop="CompanyName">
								<el-input
									v-model="ruleForm.CompanyName"
									placeholder="请输入"
									clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="公里数" prop="Mileage">
								<el-input-number
									v-model.number="ruleForm.Mileage"
									:controls="true"
									precision="0"
									placeholder="请输入"
									min="0"
									max="1000000000"
									step="1" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="0">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="到厂次数" prop="VehicleTag">
								<el-input
									v-model="ruleForm.VehicleTag"
									autofocus
									placeholder="请输入"
									maxlength="100"
									disabled
									clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="联系人" prop="Linkman">
								<el-input
									v-model="ruleForm.Linkman"
									placeholder="请输入"
									clearable />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="联系电话" prop="Phone">
								<el-input
									v-model="ruleForm.Phone"
									placeholder="请输入"
									clearable />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="0">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="维修类型" prop="ExamState">
								<el-switch
									v-model="ruleForm.ExamState"
									active-text="维修中"
									inactive-text="保养"
									:active-value="1"
									:inactive-value="10" />				
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="进厂时间" prop="StartTime" required>
								<el-date-picker
									v-model="ruleForm.StartTime"
									type="datetime"
									placeholder="请选择时间"
									format="YYYY-MM-DD HH:mm" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="0">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="状态" prop="State">
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
									format="YYYY-MM-DD HH:mm" />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="备注" prop="Remark">
								<el-input
									v-model="ruleForm.Remark"
									autofocus
									placeholder="请输入"
									maxlength="100"
									clearable />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-card>
			<el-divider content-position="left">项目列表*</el-divider>
			<div class="mb10">
				<el-form>
					<el-form-item>
						<el-button type="primary" @click="onAddOpenDlg('', false)" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="ruleForm.VehicleProjectList" v-loading="projectTableData.loading"
				:height="200" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="60" fixed />
				<el-table-column prop="Name" label="项目名称" width="200" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Qty" label="预估工时" width="120">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Qty"
							size="small"
    						controls-position="right" />
					</template>
				</el-table-column>
				<el-table-column prop="Price" label="单价" width="120">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Price"
							size="small"
    						controls-position="right" />
					</template>
				</el-table-column>
				<el-table-column prop="Amount" label="应付金额" width="120" show-overflow-tooltip>
					<template #default="scope">
						{{ totalPrice(scope.row) }}
					</template>
				</el-table-column>
				<el-table-column prop="Content" label="服务内容" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Remark" label="备注" show-overflow-tooltip>
					<template #default="scope">
						<el-input
							v-model="scope.row.Remark"
							autofocus
							placeholder="请输入"
							maxlength="100"
							clearable />
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
						<el-button type="primary" @click="onOpenDlg('', false)" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="ruleForm.VehicleGoodsList" v-loading="goodsTableData.loading"
				:height="200" border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="60" fixed />
				<el-table-column prop="GoodsName" label="配件名称" width="200" show-overflow-tooltip fixed />
				<el-table-column prop="Qty" label="预估工时" width="120">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Qty"
							size="small"
    						controls-position="right" />
					</template>
				</el-table-column>
				<el-table-column prop="Price" label="单价" width="120">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Price"
							size="small"
    						controls-position="right" />
					</template>
				</el-table-column>
				<el-table-column prop="Amount" label="应付金额" width="120" show-overflow-tooltip>
					<template #default="scope">
						{{ totalPrice(scope.row) }}
					</template>
				</el-table-column>
				<el-table-column prop="Remark" label="备注" show-overflow-tooltip>
					<template #default="scope">
						<el-input
							v-model="scope.row.Remark"
							autofocus
							placeholder="请输入"
							maxlength="100"
							clearable />
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
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)"
						v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
							$t('message.action.save')
						}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<editDlg ref="editDlgRef" />
	<addDlg ref="addDlgRef" />
	<addWorkerDlg ref="addWorkerDlgRef" />
</template>

<script lang="ts">
import { ElMessage, ElMessageBox, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import addWorkerDlg from './sheetAdd.vue';
import addDlg from './sheetGoods.vue';
import editDlg from './sheetProject.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'sheetEdit',
	components: { editDlg, addDlg, addWorkerDlg},
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();

		const editDlgRef = ref();

		const addDlgRef = ref();

		const addWorkerDlgRef = ref();

		const kind = "repair";

		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});

		const tableData = reactive({
			data: [],
			loading: false,
			param: {
				pageNum: 1,
				pageSize: 10000,
			},
		});

		// 打开弹窗
		const onOpenDlg = (id: string, ishow: boolean) => {
			addDlgRef.value.openDialog(state.kind, id, ishow);
		};

		const onAddOpenDlg = (id: string, ishow: boolean) => {
			editDlgRef.value.openDialog(state.kind, id, ishow);
		};

		const onAddWorkerOpenDlg = (id: string, ishow: boolean) => {
			addWorkerDlgRef.value.openDialog(state.kind, id, ishow);
		};

		// 删除用户
		const onProjectDel = (index:number) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.ruleForm.VehicleProjectList.splice(index,1)
				return true;
			});
		}; 

		// 删除用户
		const onGoodsDel = (index:number) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.ruleForm.VehicleGoodsList.splice(index,1)
				return true;
			});
		};

		const moduleKey = `api_repair_sheet`;

		const state = reactive({
			moduleKey: moduleKey,
			isShowDialog: false,
			kind,
			title: t('message.action.add'),
			loading: false,
			disable: true, //	是否禁用
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
			//	表单
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
				VehicleProjectList:[], //	项目列表
				VehicleGoodsList:[], //	配件列表
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

		const token = Session.get('token');

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
					required: true,
					message: t('message.validRule.required'),
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

		//	打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
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
		};

		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.vehicle.getById(Id,true);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};

		//	关闭弹窗
		const closeDialog = () => {
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetTableData();
		};

		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						if(state.ruleForm.VehicleProjectList.length>0){
							state.ruleForm.VehicleProjectList.forEach(item => {
								item.Amount = calcAmount(item)
							});
						};
						if(state.ruleForm.VehicleGoodsList.length>0){
							state.ruleForm.VehicleGoodsList.forEach(item => {
								item.Amount = calcAmount(item)
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

 		//	总价
		const calcAmount = (row)=>{
			if (row.Price && row.Qty) {
        		return row.Price * row.Qty;
      		} else {
        		return 0; // 如果没有提供单价或数量则不进行计算并将总价格设置为空字符串
      		}
		};

		// 页面加载时
		onMounted(() => {
		});

		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			GetByIdRow,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			onOpenDlg,
			onAddOpenDlg,
			editDlgRef,
			addDlgRef,
			addWorkerDlgRef,
			onProjectDel,
			onGoodsDel,
			onAddWorkerOpenDlg,
			calcAmount,
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