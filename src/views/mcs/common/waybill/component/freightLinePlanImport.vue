<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading">
				<el-row :gutter="0">
					<el-col :xs="2" :sm="1" class="mb20">
						<el-upload ref="uploadRef" class="upload-demo" :with-credentials="true" :before-upload="
								() => {return false;}" :auto-upload="false" :on-change="onImportXlsx" :show-file-list="false">
							<template #trigger>
								<el-button bg type="primary">
									{{ $t('message.action.import') }}
								</el-button>
							</template>
						</el-upload>
					</el-col>
					<el-col :xs="2" :sm="1" class="mb20 ml10">
						<el-button bg type="danger" @click="onClearRow()">
							{{ $t('message.action.clear') }}
						</el-button>
					</el-col>
					<el-col :xs="2" :sm="1" class="mb20 ml10">
						<el-button bg type="info" @click="onDownloadTpl()">
							{{ $t('message.action.download_tpl') }}
						</el-button>
					</el-col>
				</el-row>	
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">
						<el-table
							ref="mainTableRef"
							:data="paginatedData"
							
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row>
							<el-table-column prop="VehicleNumber" label="车牌号" width="100" fixed>
								<template #default="scope">
									<el-input
										v-model="scope.row.VehicleNumber"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="PlanTruckCount" label="车数" width="100">
								<template #default="scope">
									<el-input-number :min="0" controls-position="right" :precision="0"
										v-model="scope.row.PlanTruckCount"
										placeholder="请输入"></el-input-number> 
								</template>
							</el-table-column>
							<el-table-column prop="Driver" label="司机姓名" width="100">
								<template #default="scope">
									<el-input
										v-model="scope.row.Driver"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="DriverMobile" label="司机电话" width="110">
								<template #default="scope">
									<el-input
										v-model="scope.row.DriverMobile"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							
							<el-table-column :width="proxy.$calcWidth(70)" fixed="right">
								<template #header>
									<el-button bg type="primary" @click="onAddRow()">
										{{ $t('message.action.add') }}
									</el-button>
								</template>
								<template #default="scope">
									<el-button text bg type="danger" @click="onDelRow(scope.$index)">
										{{ $t('message.action.delete') }}
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination
							small
							class="mt15"
							:page-sizes="[15, 30]"
							v-model:current-page="tableData.param.pageNum"
							background
							v-model:page-size="tableData.param.pageSize"
							layout="->, total, sizes, prev, pager, next, jumper"
							:total="tableData.total">
						</el-pagination>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)">
						{{ $t('message.action.save')}}
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from "xlsx"; //引入
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'vehicleImport',
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
			baseUrl: import.meta.env.VITE_API_URL,
			//	表单
			ruleForm: {
				Kind: 'plan',
				WaybillId:"0",
				WaybillLineList:[],
			},
			tableData: {
				total: 0,
				param: {
					pageNum: 1,
					pageSize: 15,
				},
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
			BillTime: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			
		});
		
		//	打开弹窗
		const openDialog = async (kind: string, waybillId:number|string) => {
			state.Files = [];
			state.ruleForm.Kind = kind;
			state.ruleForm.WaybillId=waybillId;
			try {				
				
				state.ruleForm.WaybillLineList=[];
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		//	导入功能
		const onImportXlsx = (e: any) => {
			console.log("onImportXlsx")
			const unique = {}
			const rows = []
			const tip = [[], []]
			const reader = new FileReader()
			reader.readAsArrayBuffer(e.raw)
			reader.onload = (ev: any) => {
				console.log("测试")
				const workbook = XLSX.read(ev.target.result, { type: 'binary', cellDates: true })
				if(workbook.SheetNames.length < 1){
					return;
				}
				
				const list = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header: ["VehicleNumber",  "PlanTruckCount", "Driver", "DriverMobile"], range: 2})
					
				list.forEach(item => {
					item.VehicleNumber = String(item.VehicleNumber)
					item.PlanTruckCount =Number.parseInt(item.PlanTruckCount)
					item.Driver = String(item.Driver)
					item.DriverMobile = String(item.DriverMobile)
					
					
					if (item.VehicleNumber == "") {
						tip[0].push(item.VehicleNumber)
					}
					if (unique[item.VehicleNumber]) {
						tip[1].push(unique[item.VehicleNumber])
					}else {
						unique[item.VehicleNumber] = item.VehicleNumber
						rows.push(item)
					}
				});
				if (tip[0].length > 0) {
					ElMessageBox.alert('车牌号为空，请检查修改表格数据后重新导入！', '导入失败', {
						confirmButtonText: '确定',
						})
				} else if (tip[1].length > 0) {
					ElMessageBox.alert('车牌号为（' + tip[1] + '）的车辆存在重复，请检查修改表格数据后重新导入！', '导入失败', {
						confirmButtonText: '确定',
						})
				} else {
					state.ruleForm.WaybillLineList = rows
					state.tableData.total = rows.length
				}

			}
		}

		const onAddRow = () => {
		 	state.ruleForm.WaybillLineList=[{},...state.ruleForm.WaybillLineList]
		};

		const onClearRow = () => {
		 	state.ruleForm.WaybillLineList=[]
		};

		//	下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/waybillline_plan_import.xlsx";
			a.download = '任务单计划模板_' + new Date().getTime() + '.xlsx'; //	下载后的文件名称
			a.click();
		};

		const onDelRow = (index:number) => {
			state.ruleForm.WaybillLineList.splice(index,1)
		};

		//	分页改变
		const paginatedData = computed(() => {
			const start = (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize;
			const end = start + state.tableData.param.pageSize;
			const list= state.ruleForm.WaybillLineList.slice(start, end);
			return list;
		});

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
					try {
						const res = await proxy.$api.erp.waybillLine.importMulti(state.ruleForm.Kind,state.ruleForm.WaybillId,state.ruleForm.WaybillLineList);
						if (res.errcode == 0) {
							closeDialog();
							if(state.ruleForm.Kind=="plan"){
								proxy.$parent.onPlanGetTableData();
							} else{
								proxy.$parent.onChildGetTableData();
							}
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
			paginatedData,
			onAddRow,
			onDelRow,
			onClearRow,
			onDownloadTpl,
			onImportXlsx,
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
.el-select .el-date-picker .el-input .el-input-number {
	width: 100%;
}
</style>


