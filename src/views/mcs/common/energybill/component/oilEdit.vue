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
				<el-divider content-position="left" v-if="!ruleForm.Id || ruleForm.Id == '0'">加油信息*</el-divider>
				<el-row :gutter="20" v-if="!ruleForm.Id || ruleForm.Id == '0'">
					<el-col :xs="2" :sm="1" class="mb20">
						<el-upload ref="uploadRef" class="upload-demo" :before-upload="
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
				<el-row :gutter="20" v-if="!ruleForm.Id || ruleForm.Id == '0'">
					<el-col :xs="24" :sm="24" class="mb20">
						<el-table
							ref="mainTableRef"
							:data="ruleForm.EnergyBillLines"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row
						>
							<el-table-column prop="VehicleNumber" label="车牌号" width="100" fixed>
								<template #default="scope">
									<el-input v-model="scope.row.VehicleNumber" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Amount" label="合计金额" width="90" align="center">
								<template #default="scope">
									<el-input-number v-model="scope.row.Amount" :value-on-clear="0" style="width: 80px" min="0" max="100000" :controls="false" :precision="2" :step="1"  ></el-input-number> 
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
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from "xlsx"; //引入
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
				BillTime: '',
				EnergyBillLines:[],
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
		
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			try {				
				
				state.disable = disable;
				if (id && id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.BillTime=new Date()
					state.title = t('message.action.add');
				}
				state.ruleForm.EnergyBillLines=[];
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.energybill.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		}

		//导入地址
		const onImportXlsx = (e: any) => {
			const file = e.raw
			const reader = new FileReader()
			reader.readAsArrayBuffer(file)
			reader.onload = (ev: any) => {
				let data = ev.target.result
				const workbook = XLSX.read(data, { type: 'binary', cellDates: true })
				if(workbook.SheetNames.length==0){
					return;
				}
				const wsname = workbook.SheetNames[0]
				const list = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
				console.log("get xlsx data：",list)
				if(!list.length||list.length<5){
					return;
				}
				state.ruleForm.EnergyBillLines=[];
				for(var i=3;i<list.length;i++){
					const row=list[i];
					const name=row["加油明细台账"]||"";
					if(name=="合计"){
						break;
					}
					const vehicleNumber=row["__EMPTY"]||"";
					if(!vehicleNumber){
						continue;
					}
					const model={};
					model.VehicleNumber=vehicleNumber;
					model.Volume21=row["__EMPTY_3"]||0;
					model.Volume22=row["__EMPTY_4"]||0;
					model.Volume23=row["__EMPTY_5"]||0;
					model.Volume24=row["__EMPTY_6"]||0;
					model.Volume25=row["__EMPTY_7"]||0;
					model.Volume26=row["__EMPTY_8"]||0;
					model.Volume27=row["__EMPTY_9"]||0;
					model.Volume28=row["__EMPTY_10"]||0;
					model.Volume29=row["__EMPTY_11"]||0;
					model.Volume30=row["__EMPTY_12"]||0;
					model.Volume31=row["__EMPTY_13"]||0;
					model.Volume01=row["__EMPTY_17"]||0;
					model.Volume02=row["__EMPTY_18"]||0;
					model.Volume03=row["__EMPTY_19"]||0;
					model.Volume04=row["__EMPTY_20"]||0;
					model.Volume05=row["__EMPTY_21"]||0;
					model.Volume06=row["__EMPTY_22"]||0;
					model.Volume07=row["__EMPTY_23"]||0;
					model.Volume08=row["__EMPTY_24"]||0;
					model.Volume09=row["__EMPTY_25"]||0;
					model.Volume10=row["__EMPTY_26"]||0;
					model.Volume11=row["__EMPTY_27"]||0;
					model.Volume12=row["__EMPTY_28"]||0;
					model.Volume13=row["__EMPTY_29"]||0;
					model.Volume14=row["__EMPTY_30"]||0;
					model.Volume15=row["__EMPTY_31"]||0;
					model.Volume16=row["__EMPTY_32"]||0;
					model.Volume17=row["__EMPTY_33"]||0;
					model.Volume18=row["__EMPTY_34"]||0;
					model.Volume19=row["__EMPTY_35"]||0;
					model.Volume20=row["__EMPTY_36"]||0;
					model.Volume=row["__EMPTY_40"]||0;
					model.Amount=row["__EMPTY_41"]||0;
					state.ruleForm.EnergyBillLines.push(model);
				}
			}
		}

		const onAddRow = () => {
		 	state.ruleForm.EnergyBillLines=[{},...state.ruleForm.EnergyBillLines]
		};
		const onClearRow = () => {
		 	state.ruleForm.EnergyBillLines=[]
		};
		// 下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/energy_oil.xlsx";
			a.download = '加油台账模板_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
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
						const res = await proxy.$api.erp.energybill.save(state.ruleForm);
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
			onClearRow,
			onDownloadTpl,
			onImportXlsx,
			GetByIdRow,
			onBeforeImageUpload,
			onModelEdit,
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