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
							:height="proxy.$calcMainHeight(-205)"
							border
							stripe
							highlight-current-row>
							<el-table-column prop="GoodsName" label="名称" width="200" fixed="left">
								<template #default="scope">
									<el-input
										v-model="scope.row.GoodsName"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="BrandName" label="规格型号">
								<template #default="scope">
									<el-input
										v-model="scope.row.BrandName"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="GoodsUnit" label="计量单位" width="120">
								<template #default="scope">
									<el-input
										v-model="scope.row.GoodsUnit"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="Birthdate" label="部位" width="120">
								<template #default="scope">
									<el-input
										v-model="scope.row.Birthdate"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="GoodsAlisa" label="类别" width="200">
								<template #default="scope">
									<el-input
										v-model="scope.row.GoodsAlisa"
										placeholder="请输入"></el-input> 
								</template>
							</el-table-column>
							<el-table-column prop="ShopPrice" label="基准价格" width="180">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.ShopPrice"
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
				total: 0,
				param: {
					pageNum: 1,
					pageSize: 15,
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
					const goodsName=row["__EMPTY"]||"";
					if(!goodsName || unique[goodsName]){
						continue;
					}
					unique[goodsName] = true
					const model={};
					model.IsOnSale=1;
					model.GoodsName=goodsName;
					model.BrandName=row["__EMPTY_1"]||"";
					model.GoodsUnit=row["__EMPTY_2"]||"";
					model.GoodsAlisa=row["__EMPTY_3"]||""
					model.Birthdate=row["__EMPTY_4"]||"";
					model.ShopPrice=row["__EMPTY_5"]||"";
					rows.push(model);
				}
				state.tableData.total=rows.length
				state.ruleForm.PartsList=rows;
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

		//	分页改变
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
<style scoped lang="scss">
.el-select .el-date-picker .el-input .el-input-number{
	width: 100%;
}
</style>