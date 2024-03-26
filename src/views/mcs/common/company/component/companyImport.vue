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
							<el-table-column prop="CompanyName" label="客户名称" width="120" fixed>
								<template #default="scope">
									<el-input v-model="scope.row.CompanyName" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="CompanyAlias" label="客户简称" width="80" fixed>
								<template #default="scope">
									<el-input v-model="scope.row.CompanyAlias" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Idno" label="证件号码" width="120">
								<template #default="scope">
									<el-input v-model="scope.row.Idno" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Address" label="地址" width="120">
								<template #default="scope">
									<el-input v-model="scope.row.Address" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="BusinessScope" label="经营范围" width="120">
								<template #default="scope">
									<el-input v-model="scope.row.BusinessScope" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="TaxpayerKind" label="纳税人类型" width="120">
								<template #default="scope">
									<el-input v-model="scope.row.TaxpayerKind" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="BusinessStartTime" label="营业期限" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.BusinessStartTime"
										style="width: 100%"
										type="date"
										placeholder="起始日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="BusinessEndTime" label="至" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.BusinessEndTime"
										style="width: 100%"
										type="date"
										placeholder="到期日期"
										format="YYYY-MM-DD"
									></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="Linkman" label="联系人" width="80">
								<template #default="scope">
									<el-input v-model="scope.row.Linkman" ></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Tel" label="联系电话" width="100">
								<template #default="scope">
									<el-input v-model="scope.row.Tel" ></el-input> 
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
				if(!list.length||list.length<1){
					return;
				}
				state.ruleForm.DriverList=[];
				for(let i=0;i<list.length;i++){
					const row=list[i];
					const name=row["*客户名称"]||"";
					console.log(name)
					if(!name){
						continue;
					}
					const model={};
					model.CompanyName=name+"";
					model.CompanyAlias=`${row["简称"]}`||"";
					model.Idno=`${row["*证件号码"]}`||"";
					model.Address=`${row["地址"]}`||"";
					model.BusinessScope=`${row["经营范围"]}`||"";
					model.TaxpayerKind=`${row["纳税人类型"]}`||""; 
					model.BusinessStartTime=row["*经营期限开始"]||new Date();
					model.BusinessEndTime=row["*经营期限至"]||new Date();
					model.Linkman= `${row["联系人"]}`||""; 
					model.Tel= `${row["*联系电话"]}`||"";
					model.State=1;
					model.AuditState=1;
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
			a.href = import.meta.env.VITE_URL+`/static/download/erp/company_${state.ruleForm.Kind}.xlsx`;
			a.download = '模板_'+state.ruleForm.Kind + '_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
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
						const res = await proxy.$api.erp.company.saveMulti(state.ruleForm.Kind, state.ruleForm.DriverList);
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