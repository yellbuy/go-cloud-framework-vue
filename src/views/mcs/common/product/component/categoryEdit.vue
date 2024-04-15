<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="40%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="20"> 
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="类别名称" prop="Name">
							<el-input
								v-model="ruleForm.Name"
								style="width: 100%"
								placeholder="请输入"/>
						</el-form-item>
						<el-form-item label="排序号" prop="Order">
							<el-input-number
								v-model.number="ruleForm.Order"
								size="small"
								style="width: 100%"
								controls-position="right"
								placeholder="请输入"
								@change="handleChange"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" class="mb20">
						<el-form-item label="图标" prop="GoodsImg">
							<el-input
								v-model="ruleForm.GoodsImg"
								style="width: 100%"
								placeholder="请输入"/>
						</el-form-item>
						<el-form-item label="状态" prop="SupplierState">
							<el-switch
								v-model.number="ruleForm.SupplierState"
								active-text="启用"
								inactive-text="禁用"
								:active-value="1"
								:inactive-value="0"/>				
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="24" class="mb12">
						<el-form-item label="封面图" prop="GoodsPics">
							<div style="width: 100%">
								<el-upload
									class="upload-demo"
									:action="uploadURL"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="onSuccessFile"
									:on-preview="onPreview"
									:on-remove="onRemove"
									:file-list="FilesList"
									:accept:="`image/png, image/jpeg,image/bmp,image/jpg,application/pdf,application/docx,application/doc,application/xls,application/xlsx`"
									multiple
									show-file-list>
									<template #default>
										<el-button
											><el-icon class="el-icon--right"><Upload /></el-icon>上传</el-button>
									</template>
								</el-upload>
							</div>
							<div>
								<el-image-viewer v-if="dialogVisible" @close="imgOnClose()" :url-list="dialogImageUrl" />
							</div>
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
import { Plus } from '@element-plus/icons-vue';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

export default {
	name: 'categoryEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;

		const { t } = useI18n();
		console.log("message.action.add:",t('message.action.add'))

		//	文件列表更新
		const onSuccessFile = (file: UploadFile) => {
			console.log('触发图片上传');
			state.Files.push(file.data.src);
			let image = { url: '' };
			image.url = state.httpsText + file.data.src;
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
		
		const handleChange = (value: number) => {
		}

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
			disable: true, //	是否禁用
			baseUrl: import.meta.env.VITE_API_URL,
			//	表单
			ruleForm: {
				Id: '0',
				Parentid:"0",				
				Kind: 'product',
				Name: '',
				GoodsUnit:'',
				GoodsSn:'',
				Order:0,
				SupplierState:1,
				GoodsImg:'',
				SellerNote:'',
			},
			tableItem: {
				Id: '0',				
				Kind: 'repair',
				Name: '',
				No: '',
				Qty: 0,
				Content:"",
				Remark: '',
			},
			dialogVisible: false,
			goodsUnitList: [],
			brandList: [],
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
			GoodsName: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			GoodsUnit: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			]
		});
		
		//	打开弹窗
		const openDialog = async (kind: string, id: string,parentid:string, disable: boolean) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			state.tableItem = { Id: '0', No: '', Name: '', Files: '', Kind: kind, Content: '' };
			try {
				const goodsUnits = await proxy.$api.common.commondata.getConcreteDataListByScope('goods_unit', 0, 2);
				if (goodsUnits.errcode == 0) {
					state.goodsUnitList = goodsUnits.data;
				}else{
					console.log("error:",goodsUnits.errmsg)
				}
				const resBrands = await proxy.$api.common.commondata.getConcreteDataListByScope('vehicle_brand', 0, 2);
				if (resBrands.errcode == 0) {
					state.brandList = resBrands.data;
				}else{
					console.log("error:",resBrands.errmsg)
				}
				state.disable = disable;
				if (id && id != '0') {
					getByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.Parentid = parentid;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};

		const getByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.common.category.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				if(res.data.EndTime < '2000-01-01'){
					res.data.EndTime='';
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
				//	openWindow(fileurl, { target: "_self" });
				window.open(fileurl, '_self');
			}
		};

		//	关闭弹窗
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			console.log('关闭页面表单', state.ruleForm);
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetMainTableData();
		};

		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						if (state.ruleForm.Id==0){
							let res = await proxy.$api.common.category.insert(state.ruleForm);
								if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetMainTableData();
						}
						}else{
							let res = await proxy.$api.common.category.update(state.ruleForm);
							if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetMainTableData();
						}
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
			onRemove,
			showImage,
			dateFormatYMD,
			getUserInfos,
			tableData,
			rules,
			token,
			onSubmit,
            handleChange,
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