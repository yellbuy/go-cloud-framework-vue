<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="800px" :before-close="closeDialog">
			<el-divider content-position="left">选择项目*</el-divider>
            <div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="关键字：">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<RefreshLeft />
							</el-icon>
							{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
					</el-form-item>
                    <el-form-item></el-form-item>
				</el-form>
			</div>
			<div class="">
				<el-form>
					<el-form-item>
						<el-button type="primary" @click="routerPath()" v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table 
				:data="tableData.data"
				v-loading="tableData.loading"
				border
				stripe
				highlight-current-row
				ref="multipleTableRef"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="Name" label="项目名称" width="120" show-overflow-tooltip fixed></el-table-column>
				<!-- <el-table-column prop="No" label="编号" width="120" show-overflow-tooltip fixed></el-table-column> -->
				<el-table-column prop="ProjectType" label="项目类型" width="120" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Qty" label="预估工时" width="70"></el-table-column>
				<el-table-column prop="Price" label="工时单价" width="70"></el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
		
	</div>
	<editDlg ref="editDlgRef" />
	<div>
		<index ref="page1Data"></index>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElTable, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'sheetProject',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const editDlgRef = ref();
		const kind = "repair";
		const router =  useRouter();
		const page1Data = ref();
		console.log("message.action.add:",t('message.action.add'))
		const tableData = reactive({
			data: [],
		});
		
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
		//选择框
		interface User {
			date: string
			name: string
			address: string
		};
		const multipleSelection = ref<User[]>([])
		const handleSelectionChange = (val: User[]) => {
  			multipleSelection.value = val
		};
		const multipleTableRef = ref<InstanceType<typeof ElTable>>()
			const toggleSelection = (rows?: User[]) => {
  				if (rows) {
    				rows.forEach((row) => {
      				multipleTableRef.value!.toggleRowSelection(row, undefined)
    				})
  				} else {
    					multipleTableRef.value!.clearSelection()
  				}
			}	
		
		
		// 打开弹窗
		 const onOpenDlg = (id: string, ishow: boolean) => {
			//console.log("弹框",editDlgRef)
		 	//editDlgRef.value.openDialog(state.kind, id, ishow);
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
				ProjectType: '',
				GoodsName: '',
				No: '',
				Qty: 0,			
				Remark: '',
				BillNo:'',
				VehicleNumber:'',
				Brand:'',
				VehicleType:'',
				CompanyName:'',
				Mileage:'',
				Linkman:'',
				Phone:'',
				ExamState:'',
				StartTime:'',
				EndTime:'',
			},
			tableItem: {
				Id: '0',
				CategoryId: '',
				Name: '',
				Files: '',
				StartTime: '',
				EndTime:'',
				Kind: 'info',
			},
			dialogVisible: false,
			truckTypeList: [],
			energyTypeList:[],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});

		const token = Session.get('token');
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			VehicleNumber: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
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
		
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.isShowDialog = true;
			onGetTableData();
		};
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.project.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};
		// 页面跳转
		const routerPath= ()=>{
			//console.log(router)
			router.push('/admin/mcs/repair/project/0/0');
		}
		// 关闭弹窗
		const closeDialog = () => {
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			//onLoadTable();
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
		
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			onGetTableData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
			onGetTableData();
		};
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			onGetTableData(true);
		};
		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.project.getListByScope("repair", 0, 0, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};	
		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$parent.saveProject(multipleSelection.value);
			closeDialog();

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
			GetByIdRow,
			onHandleSizeChange,
			onHandleCurrentChange,
			onBeforeImageUpload,
			onModelEdit,
			showImage,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			onOpenDlg,
			editDlgRef,
			routerPath,
			handleSelectionChange,
			multipleTableRef,
			toggleSelection,
			page1Data,
			onGetTableData,
			onResetSearch,
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