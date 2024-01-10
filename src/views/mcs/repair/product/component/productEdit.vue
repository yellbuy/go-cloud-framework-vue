<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="50%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="商品名称" prop="GoodsName">
							<el-input v-model="ruleForm.GoodsName" placeholder="请输入商品名称"></el-input> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="商品编号" prop="GoodsSn">
							<el-input v-model="ruleForm.GoodsSn" placeholder="请输入商品编号"></el-input> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="货品单位" prop="GoodsUnit">
							<el-select v-model="ruleForm.GoodsUnit" class="m-2" placeholder="请输入货品单位" size="small">
    							<el-option
      							v-for="item in goodsUnitList"
      							:key="item.Id"
      							:label="item.Name"
      							:value="item.Name"
    							/>
  							</el-select>
						</el-form-item>
					</el-col>					
				</el-row>
				<el-row>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="助记符" prop="Piny">
							<el-input v-model="ruleForm.Piny" placeholder="助记符"></el-input> 
						</el-form-item>
					</el-col>
                    <!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="商品类型" prop="GoodsType">
							<el-select v-model="ruleForm.GoodsType" class="m-2" placeholder="请输入商品类型" size="small">
    							<el-option
      							v-for="item in GoodsTypeList"
      							:key="item.Id"
      							:label="item.Name"
      							:value="item.Id"
    							/>
  							</el-select>
						</el-form-item>
					</el-col> -->
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="产品类别" prop="CategoryId">
							<!-- <el-input v-model="ruleForm.Name" placeholder="请输入产品类别"></el-input>  -->
							<el-select v-model="ruleForm.CategoryId" class="m-2" placeholder="请输入商品类型" size="small">
    							<el-option
      							v-for="item in CategoryList"
      							:key="item.Id"
      							:label="item.Name"
      							:value="item.Id"
    							/>
  							</el-select>
						</el-form-item>
					</el-col>	
				</el-row>
				<el-row>
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb20">
						<el-form-item label="是否开启" prop="SupplierState">
							<el-switch
						v-model="ruleForm.SupplierState"
    					active-text="开启"
    					inactive-text="关闭"
						:active-value="1"
						:inactive-value="0"
						/>				
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb12">
						<el-form-item label="商品图片" prop="GoodsPics">
							<div style="width: 50%">
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
									show-file-list
								>
									<template #default>
										<el-button
											><el-icon class="el-icon--right"><Upload /></el-icon>上传</el-button
										>
									</template>
								</el-upload>
							</div>
							<div>
								<el-image-viewer v-if="dialogVisible" @close="imgOnClose()" :url-list="dialogImageUrl" />
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">		
						<el-form-item label="备注" prop="SellerNote" >
							<el-input
							v-model="ruleForm.SellerNote"
							:rows="3"
							type="textarea"
							placeholder="请输入备注"
						/>
					</el-form-item>
					</el-col>
				</el-row> 
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
	</div>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, UploadProps } from 'element-plus';
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
		console.log("message.action.add:",t('message.action.add'))
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
				Id: '0',				
				Kind: 'repair',
				GoodsName: '',
				GoodsUnit:'',
				GoodsSn:'',
				NumberRate:0,
				SupplierState:1,
				GoodsImg:'',
				SellerNote:'',
                Piny:'',
				CategoryId:'',
				Name:'',
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
			GoodsTypeList: [],
			CategoryList:[],
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
			GoodsSn: [
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
		
		// 打开弹窗
		const openDialog = async (kind: string, id: string, disable: boolean,categoryId:string) => {
			state.Files = [];
			console.log('类型', kind);
			state.ruleForm.Kind = kind;
			state.ruleForm.CategoryId = categoryId;
			state.tableItem = { Id: '0', No: '', Name: '', Files: '', Kind: kind, Content: '' };
			try {
				const res = await proxy.$api.common.category.getHierarchyDataList(kind, 0, 2);
				if (res.errcode == 0) {
					state.CategoryList = res.data;
				}else{
					console.log("error:",res.errmsg)
				}
				const GoodsType = await proxy.$api.common.commondata.getConcreteDataListByScope('goods_type', 0, 2);
				if (GoodsType.errcode == 0) {
					state.GoodsTypeList = GoodsType.data;
				}else{
					console.log("error:",GoodsType.errmsg)
				}
				const goodsUnits = await proxy.$api.common.commondata.getConcreteDataListByScope('repair_unit', 0, 2);
				if (goodsUnits.errcode == 0) {
					state.goodsUnitList = goodsUnits.data;
				}else{
					console.log("error:",goodsUnits.errmsg)
				}
				state.disable = disable;
				if (id && id != '0') {
					getByIdRow(id);
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.IsExternal=0;
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};
		const getByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.wms.goods.getById(Id);
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
		//预览文件
		const onPreview = (uploadFile: any) => {
			// 当格式为图片就预览图片，否则下载文件
			let filename = uploadFile.name;
			if (!uploadFile.name || uploadFile.name == '') {
				filename = uploadFile.url;
			}
			let fileurl = uploadFile.url;
			let fileExtension = '';
			// 校检文件类型
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
				//预览图片
				state.dialogImageUrl[0] = fileurl;
				state.dialogTitle = filename;
				state.dialogVisible = true;
			} else {
				//下载文件
				state.dialogVisible = false;
				// openWindow(fileurl, { target: "_self" });
				window.open(fileurl, '_self');
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
		// 提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					try {
						const res = await proxy.$api.wms.goods.save(state.ruleForm);
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
			getByIdRow,
			onSuccessFile,
			onPreview,
			onRemove,
			onBeforeImageUpload,
			onModelEdit,
			showImage,
			dateFormatYMD,
			getUserInfos,
			tableData,
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