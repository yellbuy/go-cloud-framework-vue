<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="mini" label-width="130px" v-loading="loading" :disabled="disable">
				<el-divider content-position="left">工商信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="供应商全名：" prop="CompanyName">
							<el-input v-model="ruleForm.CompanyName" placeholder="全名"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="供应商别名：" prop="CompanyAlias">
							<el-input v-model="ruleForm.CompanyAlias" placeholder="别名"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="供应商商号：" prop="EsNo"> <el-input v-model="ruleForm.EsNo" placeholder="供应商商号"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="货币类型：" prop="CurrencyType">
							<el-input v-model="ruleForm.CurrencyType" placeholder="货币类型"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="开户人：" prop="BankAccountName">
							<el-input v-model="ruleForm.BankAccountName" placeholder="开户人"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="注册地址：" prop="Address"> <el-input v-model="ruleForm.Address" placeholder="注册地址"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="经营范围：" prop="BusinessScope">
							<el-input v-model="ruleForm.BusinessScope" placeholder="经营范围"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="纳税人类型：" prop="TaxpayerKind">
							<el-input v-model="ruleForm.TaxpayerKind" placeholder="纳税人类型"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="经营期限：" required>
							<el-col :span="11">
								<el-form-item prop="BusinessStartTime">
									<el-date-picker
										v-model="ruleForm.BusinessStartTime"
										type="date"
										placeholder="开始日期"
										format="YYYY-MM-DD"
										style="width: 100%"
									></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col class="text-center" :span="2">
								<span class="text-gray-500">-</span>
							</el-col>
							<el-col :span="11">
								<el-form-item prop="BusinessEndTime">
									<el-date-picker
										v-model="ruleForm.BusinessEndTime"
										type="date"
										placeholder="结束日期"
										format="YYYY-MM-DD"
										style="width: 100%"
									></el-date-picker>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider content-position="left">资质信息*</el-divider>
				<el-button type="primary" @click="onModelAdd" v-if="!disable">
					<el-icon>
						<CirclePlusFilled />
					</el-icon>
					&#8197;{{ $t('message.action.add') }}
				</el-button>
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column label="供应商类别" width="120" show-overflow-tooltip>
						<template #default="scope">
							<div v-for="(item, key) in supKindData" :key="key">
								<span v-if="item.Id == scope.row.CategoryId">{{ item.Name }}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="Name" label="证书名称" width="120" show-overflow-tooltip></el-table-column>
					<el-table-column prop="StartTime" label="有效期" :formatter="dateFormatYMD" show-overflow-tooltip></el-table-column>
					<el-table-column prop="Remark" label="证件附件" show-overflow-tooltip>
						<template #default="scope">
							<el-image style="width: 70px; height: 70px" :src="showImage(scope.row.Files)" alt=""></el-image>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
						<template #default="scope">
							<el-button text bg type="primary" @click="onModelEdit(scope.row)" v-auth:[$parent.moduleKey]="'btn.CompanyLineEdit'">
								<!-- <el-icon>
									<Edit />
								</el-icon> -->
								{{ $t('message.action.edit') }}
							</el-button>
							<el-button text bg type="danger" @click="onModelDel(scope.row, scope.$index)" v-auth:[$parent.moduleKey]="'btn.CompanyLineDel'">
								<!-- <el-icon>
									<CloseBold />
								</el-icon> -->
								{{ $t('message.action.delete') }}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-divider content-position="left">基本信息*</el-divider>
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="网站：" prop="WebSite"> <el-input v-model="ruleForm.WebSite" placeholder="网站"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="企业邮箱：" prop="Im"> <el-input v-model="ruleForm.Im" placeholder="企业邮箱"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="Email：" prop="Email"> <el-input v-model="ruleForm.Email" placeholder="Email"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="传真：" prop="Fax"> <el-input v-model="ruleForm.Fax" placeholder="传真"></el-input> </el-form-item
					></el-col>
				</el-row>
				<el-divider content-position="left">联系人信息*</el-divider>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="联系人：" prop="Linkman"> <el-input v-model="ruleForm.Linkman" placeholder="联系人"></el-input> </el-form-item
				></el-col>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit(true)" v-auths:[$parent.moduleKey]="['btn.Edit', 'btn.Add']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="dialogVisible" title="证件信息" width="50%">
			<el-form ref="categoryFormRef" :model="tableItem" :rules="categoryRules" size="mini" label-width="130px" v-loading="loading">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="供应商类别：" prop="CategoryId">
							<el-select v-model="tableItem.CategoryId" class="m-2" placeholder="请选择公司类别" clearable>
								<el-option v-for="item in supKindData" :key="item.Id" :label="item.Name" :value="item.Id"> </el-option>
							</el-select> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="证件名称：" prop="Name"> <el-input v-model="tableItem.Name" placeholder="证件名称"></el-input> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						><el-form-item label="有效期限：" prop="StartTime">
							<el-date-picker
								v-model="tableItem.StartTime"
								type="date"
								placeholder="有限期限"
								format="YYYY-MM-DD"
								style="width: 100%"
							></el-date-picker> </el-form-item
					></el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20"
						><el-form-item label="上传附件：" prop="Files">
							<div class="mt10" style="border: 1px gray dashed">
								<el-upload
									:action="`${baseUrl}/v1/file/upload`"
									list-type="picture-card"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onSuccessFile"
									:file-list="FilesList"
									:on-remove="onRemove"
									:before-upload="onBeforeImageUpload"
								>
									<template #default>
										<el-icon><plus /></el-icon>
									</template>
								</el-upload>
							</div> </el-form-item
					></el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="CompanyLineClose">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="CompanyLineSave">{{ $t('message.action.save') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { reactive, toRefs, onMounted, getCurrentInstance, computed, ref, toRaw, markRaw } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox, ElMessage, UploadProps } from 'element-plus';
import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue';
import { getPageCategoryList } from '../../../../api/common/category';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';
import { useStore } from '/@/store/index';
export default {
	name: 'companyEdit',
	setup() {
		//文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
			// state.FilesList.push(image);
			console.log(state.FilesList);
		};
		const onRemove = (file: UploadFile) => {
			console.log(file);
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/image/'), file.url.length);
			for (let i = 0; i < state.Files.length; i++) {
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
			}
		};
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
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		//资质表格
		const tableData = reactive({
			data: [],
			loading: false,
			param: {
				pageNum: 1,
				pageSize: 10000,
			},
		});

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
				Kind: 'erp_company_supplier',
				CompanyName: '',
				CompanyAlias: '',
				CurrencyType: '人民币',
				BankAccountName: '',
				EsNo: '',
				Address: '',
				BusinessEndTime: new Date(),
				BusinessStartTime: new Date(),
				Linkman: '',
				BusinessScope: '',
				State: 1,
				AuditState: 1,
				TaxpayerKind: '',
				WebSite: '',
				Fax: '',
				Im: '',
				CompanyCategoryList: [],
			},
			tableItem: {
				Id: '0',
				CategoryId: '',
				Name: '',
				Files: '',
				StartTime: '',
				Kind: 'supplier',
			},
			dialogVisible: false,
			//供应商类型
			supKindData: [],
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
			Name: [
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
			CompanyAlias: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			CurrencyType: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			BankAccountName: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			EsNo: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Address: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			BusinessStartTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			BusinessEndTime: [
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
		});
		const categoryRules = reactive({
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			CategoryId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'change',
				},
			],
			StartTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: kind, StartTime: '' };
			try {
				const res = await proxy.$api.common.category.getConcreteDataList(kind, 0, 2, { pageNum: 1, pageSize: 10000 });
				if (res.errcode != 0) {
					return;
				}
				state.supKindData = res.data;
				state.disable = disable;
				if (id != '0') {
					GetByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.company.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				tableData.data = res.data.CompanyCategoryList;
			} finally {
				state.isShowDialog = true;
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			console.log('关闭页面表单', state.ruleForm);
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			onLoadTable();
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
		//表格新增按钮
		const onModelAdd = () => {
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			state.Files = [];
			state.FilesList = [];
			state.saveState = true;
			state.dialogVisible = true;
		};
		//弹窗保存按钮
		const CompanyLineSave = () => {
			if (state.Files) {
				state.tableItem.Files = state.Files.join(',');
			}
			proxy.$refs.categoryFormRef.validate((valid: any) => {
				console.log('是否符合规则', valid);
				if (valid) {
					if (state.saveState) {
						//确定按钮
						if (!Array.isArray(tableData.data)) {
							tableData.data = [];
						}
						tableData.data.push(state.tableItem);
					}
					state.dialogVisible = false;
				}
			});
		};
		//弹窗取消
		const CompanyLineClose = () => {
			proxy.$refs.categoryFormRef.clearValidate();
			state.Files = [];
			state.FilesList = [];
			state.dialogVisible = false;
		};
		//表格删除按钮
		const onModelDel = (item: Object, index: number) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					if (item.Id != '0') {
						tableData.loading = true;
						const url = `v1/erp/companycategory/delete/${item.Id}`;
						request({
							url: url,
							method: 'post',
						})
							.then((res) => {
								tableData.loading = false;
								if (res.errcode == 0) {
									ElMessage.success('操作成功！');
									tableData.data.splice(index, 1);
								} else {
									ElMessage.warning(res.errmsg);
								}
							})
							.catch((err) => {
								tableData.loading = false;
							});
						return false;
					} else {
						ElMessage.success('操作成功！');
						tableData.data.splice(index, 1);
					}
				})
				.catch((err) => {});
		};
		// 新增
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.CompanyCategoryList = tableData.data;
					try {
						const res = await proxy.$api.erp.company.save(state.ruleForm);
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
					// state.ruleForm.CompanyCategoryList = tableData.data;
					// request({
					// 	url: url,
					// 	method: 'post',
					// 	data: state.ruleForm,
					// })
					// 	.then((res) => {
					// 		state.loading = false;
					// 		if (res.errcode == 0) {
					// 			if (isCloseDlg) {
					// 				closeDialog();
					// 			} else {
					// 				tableData.data = [];
					// 				proxy.$refs.ruleFormRef.resetFields();
					// 				(state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' }), (tableData.data = []);
					// 				state.ruleForm.Id = 0;
					// 			}
					// 		}
					// 	})
					// 	.catch(() => {
					// 		state.loading = false;
					// 	});
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
			onModelAdd,
			onSuccessFile,
			onRemove,
			onBeforeImageUpload,
			CompanyLineSave,
			onModelEdit,
			CompanyLineClose,
			onModelDel,
			showImage,
			dateFormatYMD,
			getUserInfos,
			tableData,
			categoryRules,
			rules,
			token,
			onSubmit,
			...toRefs(state),
		};
	},
	components: {
		Plus,
	},
	data() {
		return {};
	},
	methods: {},
};
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