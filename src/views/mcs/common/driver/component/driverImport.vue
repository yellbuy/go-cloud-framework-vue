<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading">
				<el-row :gutter="20">
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
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" class="mb20">
						<el-table
							ref="mainTableRef"
							:data="ruleForm.DriverList"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row
						>
							<el-table-column prop="Name" label="姓名" width="100" fixed>
								<template #default="scope">
									<el-input v-model="scope.row.Name" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Gender" label="性别" width="100">
								<template #default="scope">
									<el-select
										v-model="scope.row.Gender"
										style="width: 100%"
										filterable="true"
										default-first-option="true"
										:reserve-keyword="false"
										placeholder="请选择">
										<el-option v-for="(item,index) in GenderList" :key="index" :label="item" :value="index+1"></el-option>
									</el-select> 
								</template>
							</el-table-column>
							<el-table-column prop="Mobile" label="手机号" width="120">
								<template #default="scope">
									<el-input v-model="scope.row.Mobile" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Birthdate " label="出生日期" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.Birthdate"
										style="width: 100%"
										type="date"
										placeholder="选择日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="Idno" label="身份证号码" width="180">
								<template #default="scope">
									<el-input v-model="scope.row.Idno" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="IdnoEndDate" label="身份证截止日期" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.IdnoEndDate"
										style="width: 100%"
										type="date"
										placeholder="选择日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="Nation" label="民族" width="120">
								<template #default="scope">
									<el-select
										v-model="scope.row.Nation"
										style="width: 100%"
										filterable="true"
										default-first-option="true"
										:reserve-keyword="false"
										placeholder="请选择">
										<el-option v-for="(item,index) in NationList" :key="index" :label="item" :value="index"></el-option>
									</el-select> 
								</template>
							</el-table-column>
							<el-table-column prop="NativePlace" label="籍贯" width="200">
								<template #default="scope">
									<el-input v-model="scope.row.NativePlace" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Address" label="家庭地址" width="400">
								<template #default="scope">
									<el-input v-model="scope.row.Address" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="DriverLicenseType" label="驾照类型" width="100">
								<template #default="scope">
									<el-select
										v-model="scope.row.DriverLicenseType"
										style="width: 100%"
										filterable="true"
										default-first-option="true"
										:reserve-keyword="false"
										placeholder="请选择">
										<el-option v-for="(item,index) in DriverLicenseTypeList" :key="index" :label="item" :value="index"></el-option>
									</el-select> 
								</template>
							</el-table-column>
							<el-table-column prop="RegistrationDate" label="驾照登记日期" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.RegistrationDate"
										style="width: 100%"
										type="date"
										placeholder="选择日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="DriverLicenseStartDate" label="驾照生效日期" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.DriverLicenseStartDate"
										style="width: 100%"
										type="date"
										placeholder="选择日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="DriverLicenseEndDate" label="驾照截止日期" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.DriverLicenseEndDate"
										style="width: 100%"
										type="date"
										placeholder="选择日期"
										format="YYYY-MM-DD"
									></el-date-picker>
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
					<el-button text bg type="primary" @click="onSubmit(true)">
						{{ $t('message.action.save')}}
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
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
				Kind: 'info',
				DriverList:[],
			},
			
			dialogVisible: false,

			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
			GenderList: ["男", "女"],
			NationList: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","布依族","白族","朝鲜族","侗族","哈尼族","哈萨克族","满族","土家族","瑶族","达斡尔族",
			"东乡族","高山族","景颇族","柯尔克孜族","拉祜族","纳西族","畲族","傣族","黎族","傈僳族","仫佬族","阿昌族","布朗族","毛南族","普米族","撒拉族","塔吉克族",
			"锡伯族","保安族","德昂族","俄罗斯族","鄂温克族","京族","怒族","乌孜别克族","裕固族","独龙族","鄂伦春族","赫哲族","基诺族","珞巴族","门巴族"],
			DriverLicenseTypeList: ["A1","A2","A3","B1","B2","C1","C2","C3","C4","D","E","F","M","N","P"],
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
		const openDialog = async (kind: string, ) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			try {				
				
				state.ruleForm.DriverList=[];
				state.isShowDialog = true;
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
				if(!list.length||list.length<2){
					return;
				}
				state.ruleForm.DriverList=[];
				for(let i=2;i<list.length;i++){
					const row=list[i];
					const Name=row["__EMPTY"]||"";
					console.log(Name)
					if(!Name){
						continue;
					}
					const model={};
					model.Name=Name;
					model.Gender=row["__EMPTY_1"]||"";
					if (model.Gender = "男") {
						model.Gender = 1
					}else if(model.Gender = "女") {
						model.Gender = 2
					}else{
						model.Gender = 0
					}

					model.Mobile=`${row["__EMPTY_2"]}`||"";

					model.Birthdate=row["__EMPTY_3"]||new Data();
					model.Idno=`${row["__EMPTY_4"]}`||"";

					model.IdnoEndDate=row["__EMPTY_5"]||new Data();
					model.Nation=`${row["__EMPTY_6"]}`||"";
					model.NativePlace=`${row["__EMPTY_7"]}`||"";
					model.Address=`${row["__EMPTY_8"]}`||"";
					model.DriverLicenseType=row["__EMPTY_9"]||"";
					model.RegistrationDate=row["__EMPTY_10"]||new Data();
					model.DriverLicenseStartDate=row["__EMPTY_11"]||new Data();
					model.DriverLicenseEndDate=row["__EMPTY_12"]||new Data();
					state.ruleForm.DriverList.push(model);
				}
			}
		}

		const onAddRow = () => {
		 	state.ruleForm.DriverList=[{},...state.ruleForm.DriverList]
		};
		const onClearRow = () => {
		 	state.ruleForm.DriverList=[]
		};
		// 下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/driver.xlsx";
			a.download = '司机台账模板_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		};
		const onDelRow = (index:number) => {
			state.ruleForm.DriverList.splice(index,1)
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
		};

		const onLoadTable = () => {
			proxy.$parent.onGetTableData();
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
					try {
						const res = await proxy.$api.erp.driver.saveMulti(state.ruleForm.Kind, state.ruleForm.DriverList);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
							}
							proxy.$parent.onGetTableData(true);
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
			onAddRow,
			onDelRow,
			onClearRow,
			onDownloadTpl,
			onImportXlsx,
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
.el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}
</style>