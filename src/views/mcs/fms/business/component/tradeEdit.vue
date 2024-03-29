<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="450px" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">货物名称*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="供应商" prop="CustomerId" >
							<el-select
								v-model="ruleForm.CustomerId"
								style="width: 100%"
								filterable placeholder="请选择">
								<el-option v-for="item in customerList" :key="item.Id" :label="item.CompanyName" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="产品类型" prop="GoodsCategoryId">
							<el-select
								v-model="ruleForm.GoodsCategoryId"
								style="width: 100%"
								filterable
								placeholder="请选择">
								<el-option v-for="(item, index) in goodsTypeList" :key="index" :label="item.Name" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="产品名称" prop="GoodsId">
							<el-select
								v-model="ruleForm.GoodsId"
								style="width: 100%"
								placeholder="请选择"
								@change="onFormSelected">
								<el-option v-for="item in goodsList" :key="item.Id" :label="item.GoodsName" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="计划量" prop="PlanWeight">
							<el-input-number
								v-model.number="ruleForm.PlanWeight"
								style="width: 100%"
								placeholder="请输入"
								type="number"
								min="0"
								max="1000000000"
								step="1">
							</el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="开始日期" prop="SenderPlanTime">
							<el-date-picker
								v-model="ruleForm.SenderPlanTime"
								style="width: 100%"
								type="date"
								placeholder="日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb20">
						<el-form-item label="结束日期" prop="ReceiverPlanTime">
							<el-date-picker
								v-model="ruleForm.ReceiverPlanTime"
								style="width: 100%"
								type="date"
								placeholder="日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-if="!disable" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'tradeEdit',
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
				Kind: 'trade',
				CustomerId:"",
				
				GoodsCategoryId: '',
				GoodsId:"",
			},
			
			dialogVisible: false,
			truckTypeList: [],
			plateColorList:[],
			energyTypeList:[],
			goodsTypeList:[],
			goodsList:[],
			customerList:[],
			senderAddressList:[],
			receiverAddressList:[],
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
			GoodsId: [
				{
					required: true,
					message: computed(()=>t('message.validRule.required')),
					trigger: 'blur',
				},
			],
			CustomerId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			PlanWeight: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				}
			],
		});
		
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			try {
				loadGoodsCategory();
				loadGoodsList();
				
				const resCustomers = await proxy.$api.erp.company.getListByScope("customer", 0, 2, {pageSize:1000000});
				if (resCustomers.errcode == 0) {
					state.customerList = resCustomers.data;
				}else{
					console.log("error:",resCustomers.errmsg)
				}
				state.disable = disable;
				if (id && id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.IsExternal=0;
					state.ruleForm.SenderPlanTime=new Date()
					state.ruleForm.ReceiverPlanTime=new Date()
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.businessBill.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		}

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
		const onCategorySelect=async (id:string)=>{
			loadGoodsList(id);
		}
		const loadGoodsCategory = async () => {
			const goodsTypeRes = await proxy.$api.common.category.getHierarchyDataList("product", 0, 2, {pageSize:10000});
			if (goodsTypeRes.errcode == 0) {
				state.goodsTypeList = goodsTypeRes.data;
			}else{
				console.log("error:",goodsTypeRes.errmsg)
			}
		};
		const loadGoodsList=async(categoryId:string="0")=>{
			const goodsRes = await proxy.$api.wms.goods.getListByScope('product', 0, 2, {pageSize:10000,categoryId:categoryId});
			if (goodsRes.errcode == 0) {
				state.goodsList = goodsRes.data;
			}else{
				console.log("error:",goodsRes.errmsg)
			}
		}
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
					state.ruleForm.BillTime=state.ruleForm.SenderPlanTime;
					try {
						const res = await proxy.$api.erp.businessBill.save(state.ruleForm);
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
			onModelEdit,
			onCategorySelect,
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