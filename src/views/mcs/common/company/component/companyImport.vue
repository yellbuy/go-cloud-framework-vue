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
							:data="paginatedData"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row>
							<el-table-column prop="CompanyName" label="客户名称" width="100" fixed>
								<template #default="scope">
									<el-input
										v-model="scope.row.CompanyName"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="CompanyAlias" label="客户简称" width="80" fixed>
								<template #default="scope">
									<el-input
										v-model="scope.row.CompanyAlias"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Idno" label="证件号码" width="160">
								<template #default="scope">
									<el-input
										v-model="scope.row.Idno"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Address" label="地址">
								<template #default="scope">
									<el-input
										v-model="scope.row.Address"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="BusinessScope" label="经营范围" width="120">
								<template #default="scope">
									<el-input
										v-model="scope.row.BusinessScope"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="TaxpayerKind" label="纳税人类型" width="100">
								<template #default="scope">
									<el-input
										v-model="scope.row.TaxpayerKind"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="BusinessStartTime" label="营业开始日期" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.BusinessStartTime"
										style="width: 100%"
										type="date"
										placeholder="请选择时间"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="BusinessEndTime" label="营业结束日期" width="120">
								<template #default="scope">
									<el-date-picker
										v-model="scope.row.BusinessEndTime"
										style="width: 100%"
										type="date"
										placeholder="到期日期"
										format="YYYY-MM-DD"></el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="Linkman" label="联系人" width="100">
								<template #default="scope">
									<el-input
										v-model="scope.row.Linkman"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Tel" label="联系电话" width="120">
								<template #default="scope">
									<el-input
										v-model="scope.row.Tel"
										style="width: 100%"
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
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from "xlsx"; //引入
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'companyImport',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
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
				Kind: 'info',
				CompanyList:[],
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
		
		// 打开弹窗
		const openDialog = async (kind: string, ) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			try {				
				
				state.ruleForm.CompanyList=[];
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		//	导入功能
		const onImportXlsx = (e: any) => {
			const file = e.raw
			const reader = new FileReader()
			reader.readAsArrayBuffer(file)
			reader.onload = (ev: any) => {
				const rows=[]
				const unique = {};
				let data = ev.target.result
				const workbook = XLSX.read(data, { type: 'binary', cellDates: true })
				if(workbook.SheetNames.length==0){
					return;
				}
				const wsname = workbook.SheetNames[0]
				const list = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
				for(let i = 1; i < list.length; i++){
					const row=list[i];
					const companyName=row["__EMPTY"]||"";
					if(!companyName || unique[companyName]){
						continue;
					}
					unique[companyName] = true
					const model={};
					model.CompanyName=companyName;
					model.CompanyAlias=row["__EMPTY_1"]||"";
					model.Idno=row["__EMPTY_2"]||"";
					model.Address=row["__EMPTY_3"]||"";
					model.BusinessScope=row["__EMPTY_4"]||"";
					model.TaxpayerKind=row["__EMPTY_5"]||"";
					model.BusinessStartTime=row["__EMPTY_6"]||new Date();
					model.BusinessEndTime=row["__EMPTY_7"]||new Date();
					model.Linkman=row["__EMPTY_8"]||"";
					model.Tel=row["__EMPTY_9"]||"";
					model.State=1;
					model.AuditState=1;
					rows.push(model);
				}
				state.tableData.total=rows.length
				state.ruleForm.CompanyList=rows;
			}
		}

		//	导入列表新增记录
		const onAddRow = () => {
		 	state.ruleForm.CompanyList=[{},...state.ruleForm.CompanyList]
		};

		//	导入列表清空记录
		const onClearRow = () => {
		 	state.ruleForm.CompanyList=[]
		};
		// 下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+`/static/download/erp/company_${state.ruleForm.Kind}.xlsx`;
			a.download = '客户管理模板_'+state.ruleForm.Kind + '_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		};

		//	导入列表删除单条记录
		const onDelRow = (index:number) => {
			state.ruleForm.CompanyList.splice(index,1)
		};

		//	分页改变
		const paginatedData = computed(() => {
			const start = (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize;
			const end = start + state.tableData.param.pageSize;
			const list= state.ruleForm.CompanyList.slice(start, end);
			return list;
		});

		// 关闭弹窗
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
						const res = await proxy.$api.erp.company.saveMulti(state.ruleForm.Kind, state.ruleForm.CompanyList);
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

		//	时间格式
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