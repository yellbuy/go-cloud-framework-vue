<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="800px" :before-close="closeDialog">
			<el-divider content-position="left">选择配件*</el-divider>
            <div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item label="关键字：">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.keyword" />
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
				:height="360"
				border
				stripe
				highlight-current-row
				ref="multipleTableRef"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"/>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="GoodsName" label="配件名称" width="120" show-overflow-tooltip fixed />
				<el-table-column prop="GoodsBrief" label="配件类别" width="120" />
				<el-table-column prop="ProviderName" label="供应商" width="120" />
				<el-table-column prop="GoodsSpec" label="规格" width="100" />
				<el-table-column prop="GoodsUnit" label="货品单位" width="80" />
				<el-table-column prop="ShopPrice" label="预估单价" width="80" />
			</el-table>
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
	<editDlg ref="addDlgRef" />
	<div>
		<index ref="page2Data" />
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
	name: 'sheetGoods',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();

		const addDlgRef = ref();

		const kind = "repair";

		const router =  useRouter();

		const page2Data = ref();

		const store = useStore();
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});

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
		
		const tableData = reactive({
			data: [],
			loading: false,
			param: {
				pageNum: 1,
				pageSize: 10000,
			},
		});

		const moduleKey = `api_repair_sheet`;

		const state = reactive({
			moduleKey: moduleKey,
			isShowDialog: false,
			kind,
			title: t('message.action.add'),
			loading: false,
			disable: true, //	是否禁用
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
			//	表单
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
		
		//	打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.isShowDialog = true;
			onGetTableData();
		};

		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.wms.goods.getById(Id);
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
			router.push('/admin/mcs/repair/goods/0/0');
		}
		// 关闭弹窗
		const closeDialog = () => {
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetTableData();
		};

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.wms.goods.getListByScope("repair", 0, 0, state.tableData.param);
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
			proxy.$parent.saveGoods(multipleSelection.value);
			closeDialog();

		};
		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.keyword = '';
			onGetTableData(true);
		};

		const { dateFormatYMD } = commonFunction();

		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			GetByIdRow,
			dateFormatYMD,
			getUserInfos,
			rules,
			token,
			onSubmit,
			addDlgRef,
			routerPath,
			handleSelectionChange,
			multipleTableRef,
			toggleSelection,
			page2Data,
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