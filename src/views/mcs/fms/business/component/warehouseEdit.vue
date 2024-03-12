<template>
	<div class="system-edit-warehouse-container">
		<el-dialog :title="title" v-model="isShowDialog" width="500px" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">仓储收入*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24"  class="mb20">
						<el-form-item label="平台名称" prop="SiteId" >
							<el-select v-model="ruleForm.SiteId" filterable placeholder="请选择">
								<el-option v-for="(item, index) in siteNameList" :key="index" :label="item.Name" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24"  class="mb20">
						<el-form-item label="日期" prop="BillTime">
							<el-date-picker
								v-model="ruleForm.BillTime"
								type="date"
								placeholder="日期"
								format="YYYY-MM-DD"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24"  class="mb20">
						<el-form-item label="客户名称" prop="CustomerId">
							<el-select v-model="ruleForm.CustomerId" filterable placeholder="请选择">
								<el-option v-for="(item, index) in companyNameList" :key="index" :label="item.CompanyName" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24"  class="mb20">
						<el-form-item label="收入" prop="PlanWeight">
							<el-input-number v-model="ruleForm.PlanWeight" type="number" min="0" max="1000000000" step="1"></el-input-number> 
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
import dayjs from 'dayjs';
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
export default {
	name: 'warehouseEdit',
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
				Kind: 'warehouse',
				CustomerId:"",
				GoodsCategoryId: '0',
				GoodsId:"0",
				SiteId:"",
				SiteName:'',
				CustomerName:'',
				BillTime:new Date(),
				PlanWeight:'',
				VehicleNumber: '',
				IsExternal:0,
				VehicleType: '',
				EnergyType: '',
				PlateColor:'',
				Vin: '',
				EngineNumber: '',
				Linkman: '',
				BusinessScope: '',
				State: 1,
				TaxpayerKind: '',
				WebSite: '',
				Fax: '',
				Im: '',
			},
			
			dialogVisible: false,
			siteNameList:[],
			companyNameList:[],

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
			SenderPlanTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			ReceiverPlanTime: [
				{
					required: true,
					message: t('message.validRule.required'),
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
			businessBillLineMode: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
			PlanWeight: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
					trigger: 'blur',
				},
			],
			Price: [
				{
					required: true,
					message: t('message.validRule.mustOption'),
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

				loadsiteName()
				loadCustomerName()

				state.disable = disable;
				if (id && id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.IsExternal=0;
					state.ruleForm.SenderPlanTime=new Date()
					state.ruleForm.ReceiverPlanTime=dayjs(new Date()).add(1, 'day')
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		}

		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.businessBillLine.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				await loadList(state.ruleForm.CustomerId);
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
			//proxy.$parent.onMainGetTableData();
		};

		//加载平台名称
		const loadsiteName = async () =>{
			const siteNameRes = await proxy.$api.common.commondata.getConcreteDataListByScope('warehouse_platform', 0, 2);
			if (siteNameRes.errcode == 0) {
				state.siteNameList = siteNameRes.data;
			}else{
				console.log("error:",siteNameRes.errmsg)
			}
		}

		//加载客户名称列表
		const loadCustomerName = async () => {
			const CustomerNameRes = await proxy.$api.erp.company.getListByScope("customer", 0, 2, {pageSize:1000000});
			if (CustomerNameRes.errcode == 0) {
				state.companyNameList = [...CustomerNameRes.data];
			}else{
				console.log("error:",CustomerNameRes.errmsg)
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
					try {
						const res = await proxy.$api.erp.businessBillLine.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetTableData();
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
		}
	}
}
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