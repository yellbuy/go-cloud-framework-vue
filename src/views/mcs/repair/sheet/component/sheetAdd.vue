<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
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
									placeholder="系统自动生成"
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
									clearable >
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="车辆品牌" prop="Brand">
								<el-input
									v-model="ruleForm.Brand"
									placeholder="请输入"
									clearable>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="车型" prop="VehicleType">
								<el-input
									v-model="ruleForm.VehicleType"
									autofocus
									placeholder="请输入"
									maxlength="100"
									clearable>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="客户名称" prop="CompanyName">
								<el-input
									v-model="ruleForm.CompanyName"
									placeholder="请输入"
									clearable>
								</el-input>
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
									step="1">
								</el-input-number>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="到厂次数" prop="VehicleTag">
								<el-input
									v-model="ruleForm.VehicleTag"
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
									clearable>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="联系电话" prop="Phone">
								<el-input
									v-model="ruleForm.Phone"
									placeholder="请输入"
									clearable>
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
								:inactive-value="10"/>				
						</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="进厂时间" prop="StartTime" required>
								<el-date-picker
									v-model="ruleForm.StartTime"
									type="datetime"
									placeholder="请选择时间"
									format="YYYY-MM-DD HH:mm" >
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
							<el-form-item label="状态" prop="State">
								<el-select v-model="ruleForm.State" class="m-2" placeholder="请选择">
									<el-option :label="'未开单'" :value="0" />
									<el-option :label="'已进厂'" :value="1" />
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
    						controls-position="right"
    						@change="handleChange"/>
					</template>
				</el-table-column>
				<el-table-column prop="Price" label="单价" width="120">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Price"
							size="small"
    						controls-position="right"
    						@change="handleChange"/>
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
				<el-table-column prop="GoodsName" label="配件名称" width="200" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Qty" label="预估工时" width="120">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Qty"
							size="small"
    						controls-position="right"
    						@change="handleChange"/>
					</template>
				</el-table-column>
				<el-table-column prop="Price" label="单价" width="120">
					<template #default="scope">
						<el-input-number
    						v-model="scope.row.Price"
							size="small"
    						controls-position="right"
    						@change="handleChange"/>
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
import addDlg from './sheetGoods.vue';
import editDlg from './sheetProject.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'sheetAdd',
	components: { editDlg, addDlg},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const editDlgRef = ref();
		const addDlgRef = ref();
		const kind = "repair";
		console.log("message.action.add:", t('message.action.add'))
		//文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			// state.FilesList.push(image);
			console.log(state.FilesList);
		};
		const onRemove = (file: UploadFile) => {
			console.log(file);
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/image/'), file.url.length);
			for (let i = 0; i < state.Files.length; i++) {
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
			}
		};
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
		// 总价
		const totalPrice = (row)=>{
			if (row.Price && row.Qty) {
        		return row.Price * row.Qty;
      		} else {
        		return 0; // 如果没有提供单价或数量则不进行计算并将总价格设置为0
      		}
		};
		const handleChange = (value: number) => {
  		console.log(value)
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
		const onOpenDlg = (id: string, ishow: boolean) => {
			console.log("弹框", editDlgRef)
			addDlgRef.value.openDialog(state.kind, id, ishow);
		};
		const onAddOpenDlg = (id: string, ishow: boolean) => {
			editDlgRef.value.openDialog(state.kind, id, ishow);
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
				//ProjectType: '',
				VehicleTag: '',
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
				ExamState: 1,
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
		const saveProject = (list: never[]) => {
			const items=list.map(val=>{return {Id:"0",ProjectId:val.Id,Name:val.Name,Content:val.Content,Qty:val.Qty,Price:val.Price,Remark:val.Remark,Amount:val.Amount}});
			state.ruleForm.VehicleProjectList=[...state.ruleForm.VehicleProjectList,...items]
		}
		const saveGoods = (list: never[]) => {
			const items=list.map(val=>{return {Id:"0",GoodsId:val.Id,GoodsSn:val.GoodsSn,GoodsName:val.GoodsName,SellerNote:val.SellerNote,Qty:1,Price:val.ShopPrice,Amount:val.Amount}});
			state.ruleForm.VehicleGoodsList=[...state.ruleForm.VehicleGoodsList,...items]
		}
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: kind, StartTime: '' };
			try {
				// const resTruckTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('vehicle_id', 0, 2);
				// if (resTruckTypes.errcode == 0) {
				// 	state.truckTypeList = resTruckTypes.data;
				// } else {
				// 	console.log("error:", resTruckTypes.errmsg)
				// }
				// const resEnergyTypes = await proxy.$api.common.commondata.getConcreteDataListByScope('energy_type', 0, 2);
				// if (resEnergyTypes.errcode == 0) {
				// 	state.energyTypeList = resEnergyTypes.data;
				// } else {
				// 	console.log("error:", resEnergyTypes.errmsg)
				// }
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
				const res = await proxy.$api.erp.vehicle.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				//state.ruleForm.VehicleProjectList=[];
				//state.ruleForm.VehicleGoodsList=[];
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
								item.Amount = totalPrice(item)
							});
						};
						if(state.ruleForm.VehicleGoodsList.length>0){
							state.ruleForm.VehicleGoodsList.forEach(item => {
								item.Amount = totalPrice(item)
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
		onMounted(() => {

		});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			onLoadTable,
			GetByIdRow,
			onSuccessFile,
			onRemove,
			onBeforeImageUpload,
			onModelEdit,
			showImage,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			onOpenDlg,
			onAddOpenDlg,
			editDlgRef,
			addDlgRef,
			saveProject,
			saveGoods,
			onProjectDel,
			onGoodsDel,
			handleChange,
			totalPrice,
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