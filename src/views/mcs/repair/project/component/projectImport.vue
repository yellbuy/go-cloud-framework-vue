<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading">
				<el-row :gutter="20">
					<el-col :xs="1" :sm="1" class="mb20">
						<el-upload ref="uploadRef" class="upload-demo" :before-upload="
								() => {return false;}" :auto-upload="false" :on-change="onImportXlsx" :show-file-list="false">
							<template #trigger>
								<el-button bg type="primary">
									{{ $t('message.action.import') }}
								</el-button>
							</template>
						</el-upload>
					</el-col>
					<el-col :xs="1" :sm="1" class="mb20 ml10">
						<el-button bg type="danger" @click="onClearRow()">
							{{ $t('message.action.clear') }}
						</el-button>
					</el-col>
					<el-col :xs="1" :sm="1" class="mb20 ml10">
						<el-button bg type="info" @click="onDownloadTpl()">
							{{ $t('message.action.download_tpl') }}
						</el-button>
					</el-col>
				</el-row>	
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" class="mb20">
						<el-table
							ref="mainTableRef"
							:data="ruleForm.ProjectList"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row>
							<el-table-column prop="Name" label="项目名称" width="200" align="left" fixed="left">
								<template #default="scope">
									<el-input
										v-model="scope.row.Name"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="No" label="项目编号" width="200" align="center">
								<template #default="scope">
									<el-input
										v-model="scope.row.No"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Qty" label="预估工时" width="180" align="center">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.Qty"
										style="width: 100%"
										placeholder="请输入"
										:controls="true"
										precision="0"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column prop="Price" label="工时单价" width="180" align="left">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.Price"
										style="width: 100%"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column prop="Content" label="服务内容" width="300" align="left">
								<template #default="scope">
									<el-input
										v-model="scope.row.Content"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Remark" label="备注" align="center">
								<template #default="scope">
									<el-input
										v-model="scope.row.Remark"
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
import * as XLSX from "xlsx"; //	引入
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'projectImport',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
		const store = useStore();

		//	获取用户信息
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});

		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			//	表单
			ruleForm: {
				Kind: 'repair',
				ProjectList:[],
			},
			
			dialogVisible: false,

			tableData: [],
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
		const openDialog = async (kind: string) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			try {				
				
				state.ruleForm.ProjectList=[];
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		//	导入地址
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
				let num = 0
				if(!list.length||list.length<2){
					num = 0
				}else if (list.length>100){
					num = 100;
				}else{
					num = list.length;
				}
				state.ruleForm.ProjectList=[];
				const rows=[]
				for(let i=1;i<num;i++){
					const row=list[i];
					const Name=row["__EMPTY"]||"";
					
					if(!Name){
						continue;
					}
					const model={};

					model.Name=Name;
					model.No=String(row["__EMPTY_1"]||"");
					model.Qty=row["__EMPTY_2"]||"";
					model.Price=row["__EMPTY_3"]||"";
					model.Content=row["__EMPTY_4"]||"";
					model.Remark=row["__EMPTY_5"]||"";
					model.State=1;
					rows.push(model);
				}
				state.ruleForm.ProjectList=rows;
			}
		}

		//	导入列表新增记录
		const onAddRow = () => {
		 	state.ruleForm.ProjectList=[{},...state.ruleForm.ProjectList]
		};

		//	导入列表清空记录
		const onClearRow = () => {
		 	state.ruleForm.ProjectList=[]
		};

		//	下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/project.xlsx";
			a.download = '项目管理模板_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		};

		//	导入列表删除单条记录
		const onDelRow = (index:number) => {
			state.ruleForm.ProjectList.splice(index,1)
		};

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
						const res = await proxy.$api.erp.project.saveMulti(state.ruleForm.Kind, state.ruleForm.ProjectList);
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

		//	窗口页面加载时
		onMounted(() => {});

		return {
			proxy,
			t,
			openDialog,
			closeDialog,
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