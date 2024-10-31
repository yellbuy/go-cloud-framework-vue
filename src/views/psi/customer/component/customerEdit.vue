<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="150px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="0">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="单位名称" prop="Name">
							<el-input
								v-model="ruleForm.Name"
								placeholder="请输入" /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="单位编码" prop="Code">
							<el-input
								v-model="ruleForm.Code"
								placeholder="请输入">
							</el-input> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="所属类别" prop="CategoryId">
							<el-tree-select
								v-model="ruleForm.CategoryId"
								placeholder="请选择所属类别"
								default-expand-all
								node-key="Id"
								:value-key="Id"
								:current-node-key="ruleForm.CategoryId"
								:data="categoryList"
								:props="{ label: 'Name', value: 'Id', children: 'Children' }"
								check-strictly
							/>
						</el-form-item>
						
					</el-col>
					
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="状态" prop="State">
							<el-switch
								v-model="ruleForm.State"
								inline-prompt
								width="50"
								active-text="启用"
								inactive-text="禁用"
								:active-value="1"
								:inactive-value="0"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="助记符" prop="Pinyin">
							<el-input
								v-model="ruleForm.Pinyin"
								placeholder="请输入">
							</el-input> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="别名" prop="Alias">
							<el-input
								v-model="ruleForm.Alias"
								placeholder="请输入">
							</el-input> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="单位证件号" prop="Idno">
							<el-input
								v-model="ruleForm.Idno"
								placeholder="请输入">
							</el-input> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="开户行" prop="BankName">
							<el-input
								v-model="ruleForm.BankName"
								placeholder="请输入">
							</el-input> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
						<el-form-item label="银行账号" prop="BankAccount">
							<el-input
								v-model="ruleForm.BankAccount"
								placeholder="请输入">
							</el-input> 
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="8" :lg="8" class="mb20">	
						<el-form-item label="网址" prop="Website" >
							<el-input
								v-model="ruleForm.Website"
								placeholder="请输入"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="8" :lg="8" class="mb20">	
						<el-form-item label="备注" prop="Remark" >
							<el-input
								v-model="ruleForm.Remark"
								placeholder="请输入"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">	
						<el-tabs type="border-card">
							<el-tab-pane label="联系人">
								<el-row :gutter="0">
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="联系人" prop="Linkman">
											<el-input
												v-model="ruleForm.Linkman"
												placeholder="请输入">
											</el-input> 
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="联系电话" prop="Tel">
											<el-input
												v-model="ruleForm.Tel"
												placeholder="请输入">
											</el-input> 
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="传真" prop="BankAccount">
											<el-input
												v-model="ruleForm.BankAccount"
												placeholder="请输入">
											</el-input> 
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="移动电话" prop="Mobile">
											<el-input
												v-model="ruleForm.Mobile"
												placeholder="请输入">
											</el-input> 
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="邮编" prop="Zip">
											<el-input
												v-model="ruleForm.Zip"
												placeholder="请输入">
											</el-input> 
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="邮箱" prop="Email">
											<el-input
												v-model="ruleForm.Email"
												placeholder="请输入">
											</el-input> 
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="联系地址" prop="Address">
											<el-input
												v-model="ruleForm.Address"
												placeholder="请输入">
											</el-input> 
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="出生日期" prop="Birthdate">
											<el-date-picker
												v-model="ruleForm.Birthdate"
												type="date"
												placeholder="出生日期"
												:default-value="new Date()"
												format="YYYY-MM-DD">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
							</el-tab-pane>
							<el-tab-pane label="预设价">
								<el-row :gutter="0">
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="预设售价（入库）" prop="PrepriceInState">
											<el-select
												v-model="ruleForm.PrepriceInState"
												filterable
												default-first-option
												placeholder="请选择">
												<el-option label="不启用" :value="0"></el-option>
												<el-option label="预设售价一" :value="1"></el-option>
												<el-option label="预设售价二" :value="2"></el-option>
												<el-option label="预设售价三" :value="3"></el-option>
												<el-option label="预设售价四" :value="4"></el-option>
												<el-option label="预设售价五" :value="4"></el-option>
												<el-option label="零售价" :value="10"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="预设售价（出库）" prop="PrepriceOutState">
											<el-select
												v-model="ruleForm.PrepriceOutState"
												filterable
												default-first-option
												placeholder="请选择">
												<el-option label="不启用" :value="0"></el-option>
												<el-option label="预设售价一" :value="1"></el-option>
												<el-option label="预设售价二" :value="2"></el-option>
												<el-option label="预设售价三" :value="3"></el-option>
												<el-option label="预设售价四" :value="4"></el-option>
												<el-option label="预设售价五" :value="4"></el-option>
												<el-option label="零售价" :value="10"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="0">
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="预设售价（入库）比率" prop="PrepriceInRate">
											<el-input-number
												v-model="ruleForm.PrepriceInRate"
												:min="0" :max="10000"
												placeholder="请输入">
												<template #suffix>
													<span>%</span>
												</template>
											</el-input-number> 
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="预设售价（出库）比率" prop="PrepriceOutRate">
											<el-input-number
												v-model="ruleForm.PrepriceOutRate"
												:min="0" :max="10000"
												placeholder="请输入">
												<template #suffix>
													<span>%</span>
												</template>
											</el-input-number> 
										</el-form-item>
									</el-col>
								</el-row>
								
							</el-tab-pane>
							<el-tab-pane label="送货地址">
								<el-row :gutter="0">
									<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">	
										<el-table :data="ruleForm.LinkmanList" style="width: 100%">
											<el-table-column label="地址" width="180">
												<template #default="scope">
													<el-input v-model="scope.row.Address" ></el-input> 
												</template>
											</el-table-column>
											<el-table-column label="联系人" width="120">
												<template #default="scope">
													<el-input v-model="scope.row.Linkman" ></el-input> 
												</template>
											</el-table-column>
											<el-table-column label="联系电话" width="180">
												<template #default="scope">
													<el-input v-model="scope.row.Tel" ></el-input> 
												</template>
											</el-table-column>
											<el-table-column label="手机" width="180">
												<template #default="scope">
													<el-input v-model="scope.row.Mobile" ></el-input> 
												</template>
											</el-table-column>
											<el-table-column label="传真" width="180">
												<template #default="scope">
													<el-input v-model="scope.row.Fax" ></el-input> 
												</template>
											</el-table-column>
											<el-table-column label="邮编" width="120">
												<template #default="scope">
													<el-input v-model="scope.row.Zip" ></el-input> 
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
							</el-tab-pane>
							<el-tab-pane label="其他">
								<el-row :gutter="0">
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="换货期限" prop="ExchangeDays">
											<el-input-number
												v-model="ruleForm.ExchangeDays"
												:min="0" :max="10000"
												:precision="0"
												placeholder="请输入">
												<template #suffix>
													<span>天</span>
												</template>
											</el-input-number> 
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="换货比率" prop="ExchangeRate">
											<el-input-number
												v-model="ruleForm.ExchangeRate"
												:min="0" :max="10000"
												placeholder="请输入">
												<template #suffix>
													<span>%</span>
												</template>
											</el-input-number> 
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="0">
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="信用额度" prop="CreditMoney">
											<el-input-number
												v-model="ruleForm.CreditMoney"
												:min="0" :max="1000000000000"
												:step="100"
												placeholder="请输入">
												<template #prefix>
													<span>¥</span>
												</template>
											</el-input-number> 
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb20">
										<el-form-item label="保证金" prop="CautionMoney">
											<el-input-number
												v-model="ruleForm.CautionMoney"
												:min="0" :max="10000000000000"
												:step="100"
												placeholder="请输入">
												<template #prefix>
													<span>¥</span>
												</template>
											</el-input-number> 
										</el-form-item>
									</el-col>
								</el-row>
							</el-tab-pane>
						</el-tabs>
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
		<el-dialog v-model="ImageVisible">
			<img class="dialog-image" w-full :src="dialogImageUrl" alt="Preview Image" />
		</el-dialog>		
	</div>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'productEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();

		//	文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
		};

		const onRemove = (file: UploadFile) => {
			let removeUrl = file.url.substring(file.url.indexOf('/static/upload/'), file.url.length);
			for (let i = 0; i < state.Files.length; i++) {
				if (state.Files[i] == removeUrl) {
					state.Files.splice(i, 1);
				}
			}
		};

		//新增联系人
		const onAddRow = () => {
		 	state.ruleForm.LinkmanList.push({Address:"",Name:""})
		};
		//删除联系人
		const onDelRow = (index:number) => {
			if(state.ruleForm.LinkmanList[index].Address==""){
				state.ruleForm.LinkmanList.splice(index,1)
				return;
			}
			ElMessageBox.confirm('确定删除当前记录吗？', '温馨提示', {
					type: 'error',
					closeOnClickModal: false,
					//center: true,
				}).then(() => {
					state.ruleForm.LinkmanList.splice(index,1)
				}).catch(() => { })
			
		};

		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});

		//	显示表格图片
		const showImage: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl = uploadFile.url!
			state.ImageVisible = true
		}
		
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			disable: true, //	是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			dialogImageUrl: "",
			ImageVisible: false,
			//	表单
			ruleForm: {
				Id: '0',				
				Kind: 'info',
				Name: '',
				Code:'',
				Pinyin:'',
				State:1,
				Pics:'',
				CategoryId:'0',
				LinkmanList:[],
			},
			dialogVisible: false,
			categoryList:[],
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
			Code: [
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
					trigger: 'blur',
				},
			]
		});
		
		//	打开弹窗
		const openDialog = async (kind: string, id: string, categoryList:any,categoryId:string, disable: boolean) => {
			state.Files = [];
			state.ruleForm.Kind = kind;
			state.ruleForm.LinkmanList=[];
			state.ruleForm.CategoryId = categoryId;
			state.categoryList = categoryList;
			try {
				state.disable = disable;
				if (disable) {
					state.title = t('message.action.see');
					getByIdRow(id);
				} else if (id && id != '0') {
					getByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = '0';
					state.ruleForm.State=1;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};

		const getByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.psi.customer.getById(Id,true);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};

		//	预览文件
		const onPreview = (uploadFile: any) => {
			//	当格式为图片就预览图片，否则下载文件
			let filename = uploadFile.name;
			if (!uploadFile.name || uploadFile.name == '') {
				filename = uploadFile.url;
			}
			let fileurl = uploadFile.url;
			let fileExtension = '';
			//	校检文件类型
			var imageTypes = ['png', 'jpg', 'jpeg', 'gif'];
			if (filename.lastIndexOf('.') > -1) {
				fileExtension = filename.slice(filename.lastIndexOf('.') + 1);
			}
			const isTypeOk = imageTypes.some((type) => {
				if (fileExtension && fileExtension.indexOf(type) > -1) {
					return true;
				}
			});
			if (isTypeOk) {
				//	预览图片
				state.dialogImageUrl[0] = fileurl;
				state.dialogTitle = filename;
				state.dialogVisible = true;
			} else {
				//	下载文件
				state.dialogVisible = false;
				window.open(fileurl, '_self');
			}
		};

		//	关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.ruleForm.LinkmanList=[];
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetTableData();
		};

		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					for(const val of state.ruleForm.LinkmanList){
						if(val.Address==""){
							ElMessage.warning("送货地址不能为空")
							return;
						}
					}
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					if (state.Files) {
						state.ruleForm.Pics = state.Files.join(',');
					}
					try {
						const res = await proxy.$api.psi.customer.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.LinkmanList=[];
								state.ruleForm.Id = '0';
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

		//	页面加载时
		onMounted(() => {});

		return {
			proxy,
			t,
			openDialog,
			closeDialog,
			getByIdRow,
			onSuccessFile,
			onPreview,
			onAddRow,
			onDelRow,
			onRemove,
			onBeforeImageUpload,
			showImage,
			dateFormatYMD,
			getUserInfos,
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
.el-select .el-date-picker .el-input .el-input-number {
	width: 100%;
}
</style>