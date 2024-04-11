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
							:data="paginatedData"
							style="width: 100%"
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row>
							<el-table-column prop="GoodsName" label="名称" width="200" fixed="left">
								<template #default="scope">
									<el-input
										v-model="scope.row.GoodsName"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="BrandName" label="规格型号">
								<template #default="scope">
									<el-input
										v-model="scope.row.BrandName"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="GoodsUnit" label="计量单位" width="120">
								<template #default="scope">
									<el-input
										v-model="scope.row.GoodsUnit"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Birthdate" label="部位" width="120">
								<template #default="scope">
									<el-input
										v-model="scope.row.Birthdate"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="GoodsAlisa" label="类别" width="200">
								<template #default="scope">
									<el-input
										v-model="scope.row.GoodsAlisa"
										style="width: 100%"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="ShopPrice" label="基准价格" width="180">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.ShopPrice"
										style="width: 100%"
										placeholder="请输入"
										:controls="true"
										precision="2"
										min="0"
										max="1000000000"
										step="1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '')">
									</el-input-number>
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
							@size-change="onHandleSizeChange"
							@current-change="onHandleCurrentChange"
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
	name: 'goodsImport',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))
		
		const store = useStore();

		//	获取用户信息
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});

		//	显示表格图片
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
			disable: true, //	是否禁用
			//	表单
			ruleForm: {
				Kind: 'repair',
				PartsList:[],
			},
			tableData: {
				data: [],
				total: 0,
				loading: false,
				currentPageFirst: 0,
				currentPageFinally: 0,
				param: {
					keyword: '',
					pageNum: 1,
					pageSize: 15,
					state: -1,
				},
			},
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			GoodsAlisaList: [],
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
				state.ruleForm.PartsList=[];
				state.tableData.data = [];
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
				let data = ev.target.result
				const workbook = XLSX.read(data, { type: 'binary', cellDates: true })
				if(workbook.SheetNames.length==0){
					return;
				}
				const wsname = workbook.SheetNames[0]
				const list = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
				state.tableData.total=list.length
				const rows=[]
				for(let i = 1; i < state.tableData.total; i++){
					const row=list[i];
					const GoodsName=row["__EMPTY"]||"";
					
					if(!GoodsName){
						continue;
					}
					const model={};
					model.IsOnSale=1;
					model.GoodsName=GoodsName;
					model.BrandName=row["__EMPTY_1"]||"";
					model.GoodsUnit=row["__EMPTY_2"]||"";
					model.GoodsAlisa=row["__EMPTY_3"]||""
					model.Birthdate=row["__EMPTY_4"]||"";
					model.ShopPrice=row["__EMPTY_5"]||"";
					rows.push(model);
				}
				state.ruleForm.PartsList=rows;
				//pageChange();
			}
		}

		//	导入列表新增记录
		const onAddRow = () => {
		 	state.ruleForm.PartsList=[{},...state.ruleForm.PartsList]
		};

		//	导入列表清空记录
		const onClearRow = () => {
		 	state.ruleForm.PartsList=[]
		};

		// 下载导入模板
		const onDownloadTpl = async () => {
			var a = document.createElement('a');
			a.href = import.meta.env.VITE_URL+"/static/download/erp/parts.xlsx";
			a.download = '配件管理模板_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		};

		//	导入列表删除单条记录
		const onDelRow = (index:number) => {
			state.ruleForm.PartsList.splice(index,1)
		};

		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
		};

		//	单页条数修改
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			//pageChange();
		}

		//	页码修改
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
			//pageChange();
		}

		//	分页改变
		const pageChange = () => {
			state.tableData.data = []
			state.tableData.currentPageFinally = state.tableData.param.pageSize * state.tableData.param.pageNum
			state.tableData.currentPageFirst = state.tableData.currentPageFinally - state.tableData.param.pageSize
			if (state.tableData.currentPageFinally > state.tableData.total){
				state.tableData.currentPageFinally = state.tableData.total
			}
			state.tableData.data = state.ruleForm.PartsList.slice(state.tableData.currentPageFirst, state.tableData.currentPageFinally)
		}

		const paginatedData = computed(() => {
			const start = (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize;
			const end = start + state.tableData.param.pageSize;
			const list= state.ruleForm.PartsList.slice(start, end);
			return list;
		});

		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					try {
						const res = await proxy.$api.wms.goods.saveMulti(state.ruleForm.Kind, state.ruleForm.PartsList);
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

		//	页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			pageChange,
			onHandleSizeChange,
			onHandleCurrentChange,
			onAddRow,
			onDelRow,
			onClearRow,
			paginatedData,
			onDownloadTpl,
			onImportXlsx,
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