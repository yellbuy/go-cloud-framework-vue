<template>
	<div class="psi-edit-product-container">
		<el-dialog :title="title" v-model="isShowDialog" width="95%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="130px" label-suffix="：" v-loading="loading" :disabled="disable">
				<el-row :gutter="0">
					<el-col :xs="24" :sm="18" :md="18" :lg="18" class="mb20">
						<el-row :gutter="0">
							<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb20">
								<el-form-item label="产品名称" prop="Name">
									<el-input
										v-model="ruleForm.Name"
										placeholder="请输入" /> 
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb20">
								<el-form-item label="产品编码" prop="Code">
									<el-input
										v-model="ruleForm.Code"
										placeholder="请输入">
									</el-input> 
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb20">
								<el-form-item label="助记符" prop="Pinyin">
									<el-input
										v-model="ruleForm.Pinyin"
										placeholder="请输入">
									</el-input> 
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="0">
							<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb20">
								<el-form-item label="别名" prop="Alias">
									<el-input
										v-model="ruleForm.Alias"
										placeholder="请输入">
									</el-input> 
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb20">
								<el-form-item label="产品类别" prop="CategoryId">
									<el-tree-select
										v-model="ruleForm.CategoryId"
										placeholder="请选择产品类别"
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
							<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb20">
								<el-form-item label="状态" prop="State">
									<el-switch
										v-model.number="ruleForm.State"
										inline-prompt
										width="50"
										active-text="启用"
										inactive-text="禁用"
										:active-value="1"
										:inactive-value="0"/>				
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="0">
							<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb20">
								<el-form-item label="产地" prop="ProductOrigin">
									<el-input
										v-model="ruleForm.ProductOrigin"
										placeholder="请输入">
									</el-input> 
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb20">
								<el-form-item label="规格" prop="ProductSpec">
									<el-input
										v-model="ruleForm.ProductSpec"
										placeholder="请输入">
									</el-input> 
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="8" :md="8" :lg="8" class="mb20">
								<el-form-item label="型号" prop="ProductModel">
									<el-input
										v-model="ruleForm.ProductModel"
										placeholder="请输入">
									</el-input> 
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="0">
							<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">
								<el-form-item label="备注" prop="Remark">
									<el-input
										v-model="ruleForm.Remark"
										placeholder="请输入">
									</el-input> 
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="6" :md="6" :lg="6" class="mb20">
						<el-row :gutter="0">
							<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">
								<el-form-item label="商品图片" prop="Files">
									<div style="width: 50%">
										<el-upload :action="`${baseUrl}/v1/file/upload`" list-type="picture-card"
											:headers="httpHeaders"
											:with-credentials="true"
											:on-success="onSuccessFile" :file-list="FilesList" :limit="10" :on-remove="onRemove"
											:on-preview="showImage" :before-upload="onBeforeImageUpload">
											<template #default>
												<el-icon>
													<plus />
												</el-icon>
											</template>
										</el-upload>
									</div>
									<div>
										<el-image-viewer v-if="dialogVisible" @close="imgOnClose()" :url-list="dialogImageUrl" />
									</div> 
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
				
				
				<el-row :gutter="0">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">	
						<el-tabs type="border-card">
							<el-tab-pane label="单位价格">
								<el-row :gutter="0">
									<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">	
										<el-table :data="ruleForm.ProductPriceList" style="width: 100%">
											<el-table-column prop="Name" label="#" width="80" show-overflow-tooltip  fixed>
											</el-table-column>
											<el-table-column label="*单位" width="90">
												<template #default="scope">
													<el-select
														v-model="scope.row.UnitId"
														filterable
														default-first-option
														placeholder="请选择">
														<el-option label=" " value="0" ></el-option>
														<el-option :label="val.Name" :value="val.Id" v-for="(val,index) in productUnitList" :key="index"></el-option>
													</el-select>
												</template>
											</el-table-column>
											<el-table-column label="*换算率" width="80" align="center">
												<template #default="scope">
													<el-input-number :min="0" :controls="false" :readonly="scope.row.UnitType==0"
														v-model="scope.row.UnitRate" style="width:70px"></el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="零售价" width="90" align="center">
												<template #default="scope">
													<el-input-number v-model="scope.row.Price" 
														:min="0"  :precision="2" :controls="false"
														placeholder="请输入" style="width:80px">
													</el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="价格1" width="90" align="center">
												<template #default="scope">
													<el-input-number v-model="scope.row.Price1" 
														:min="0" :precision="2" :controls="false"
														placeholder="请输入" style="width:80px">
													</el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="价格2" width="90" align="center">
												<template #default="scope">
													<el-input-number v-model="scope.row.Price2" 
														:min="0" :precision="2" :controls="false"
														placeholder="请输入" style="width:80px">
													</el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="价格3" width="90" align="center">
												<template #default="scope">
													<el-input-number v-model="scope.row.Price3" 
														:min="0" :precision="2" :controls="false"
														placeholder="请输入" style="width:80px">
													</el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="价格4" width="90" align="center">
												<template #default="scope">
													<el-input-number v-model="scope.row.Price4" 
														:min="0" :precision="2" :controls="false"
														placeholder="请输入" style="width:80px">
													</el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="价格5" width="90" align="center">
												<template #default="scope">
													<el-input-number v-model="scope.row.Price5" 
														:min="0" :precision="2" :controls="false"
														placeholder="请输入" style="width:80px">
													</el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="最近进价" width="90" align="center">
												<template #default="scope">
													<el-input-number v-model="scope.row.RecentPurchasePrice" 
														:min="0" :precision="2" :controls="false"
														placeholder="请输入" style="width:80px">
													</el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="最近售价" width="90" align="center">
												<template #default="scope">
													<el-input-number v-model="scope.row.RecentSalePrice" 
														:min="0" :precision="2" :controls="false"
														placeholder="请输入" style="width:80px">
													</el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="最低售价" width="90" align="center">
												<template #default="scope">
													<el-input-number v-model="scope.row.LowestPrice" 
														:min="0" :precision="2" :controls="false"
														placeholder="请输入" style="width:80px">
													</el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="会员价" width="90" align="center">
												<template #default="scope">
													<el-input-number v-model="scope.row.VipPrice" 
														:min="0" :precision="2" :controls="false"
														placeholder="请输入" style="width:80px">
													</el-input-number> 
												</template>
											</el-table-column>
											<el-table-column label="条码" width="100" align="center">
												<template #default="scope">
													<el-input v-model="scope.row.Barcode" ></el-input> 
												</template>
											</el-table-column>
											<el-table-column :width="proxy.$calcWidth(70)" fixed="right">
												<!-- <template #header>
													<el-button bg type="primary" @click="onAddRow()">
														{{ $t('message.action.add') }}
													</el-button>
												</template> -->
												<template #default="scope">
													<el-button text bg type="danger" @click="onDelUnitRow(scope.$index)">
														{{ $t('message.action.delete') }}
													</el-button>
												</template>
											</el-table-column>
										</el-table>
									</el-col>
								</el-row> 
								<el-row :gutter="0" v-if="rateMessage">
									<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">
										换算率：{{ rateMessage }}	
									</el-col>
								</el-row> 
							</el-tab-pane>
							<el-tab-pane label="条码">
								<el-row :gutter="0">
									<el-col :xs="24" :sm="24" :md="24" :lg="24" class="mb20">	
										<el-table :data="ruleForm.ProductBarcodeList" style="width: 100%">
											<el-table-column prop="UnitName" label="单位" width="100" show-overflow-tooltip  fixed :readonly="true">
											</el-table-column>
											
											<el-table-column label="条码" width="300">
												<template #default="scope">
													<el-input v-model="scope.row.Barcode" 
														placeholder="请输入" >
													</el-input> 
												</template>
											</el-table-column>
										</el-table>
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
import { computed, getCurrentInstance, onMounted, reactive, toRefs, watch } from 'vue';
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

		const store = useStore();

		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});

		//	显示表格图片
		const showImage: UploadProps['onPreview'] = (uploadFile) => {
			state.dialogImageUrl = uploadFile.url!
			state.ImageVisible = true
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
			httpHeaders:proxy.$getRequestHeaders(),
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
				GoodsName: '',
				UnitId:'0',
				GoodsSn:'',
				SupplierState:1,
				GoodsImg:'',
				SellerNote:'',
                Pinyin:'',
				CategoryId:'',
				Name:'',
				GoodsPics:'',
				ProductBarcodeList:[{Id:"0",Name:"",UnitId:"0",UnitName:""},{Id:"0",Name:"",UnitId:"0",UnitName:""},{Id:"0",Name:"",UnitId:"0",UnitName:""}],
				ProductPriceList:[{Id:"0",UnitRate:1,UnitType:0,Name:"基本单位"},{Id:"0",UnitType:1,Name:"辅助单位1"},{Id:"0",UnitType:1,Name:"辅助单位2"}]
			},
			dialogVisible: false,
			categoryList:[],
			productUnitList: [],
			brandList: [],
			uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
			saveState: false,
			rateMessage:'',
			Files: [],
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
		});

		watch(
			() => state.ruleForm.ProductPriceList,
			(newArray, oldArray) => {
				console.log("newArray:",newArray)
				const list=newArray.filter((val)=>val.UnitId && val.UnitId != "0")
				const barcodeList=[]
				for(let index=0;index<list.length;index++){
					const priceObj=list[index]
					let barcodeObj={Id:"0",Name:"",UnitId:"0",UnitName:""}
					if(state.ruleForm.ProductBarcodeList.length>index){
						barcodeObj=state.ruleForm.ProductBarcodeList[index]
					}
					barcodeObj.UnitId=priceObj.UnitId
					const unit=state.productUnitList.find(val=>val.Id==barcodeObj.UnitId)
					if(unit){
						barcodeObj.UnitName=unit.Name
						barcodeList.push(barcodeObj)
					}
				}
				//设置换算率公示的内容
				state.rateMessage=""
				if(state.ruleForm.ProductPriceList.length>0){
					//更新基本单位名称
					const baseUnit=state.ruleForm.ProductPriceList[0]
					const unit = state.productUnitList.find(val=>val.Id == baseUnit.UnitId)
					if(unit){
						baseUnit.UnitName=unit.Name
					}
				}
				if(state.ruleForm.ProductPriceList.length>1){
					//更新辅助单位名称
					const assestUnit=state.ruleForm.ProductPriceList[1]
					const unit=state.productUnitList.find(val=>val.Id==assestUnit.UnitId)
					if(unit){
						assestUnit.UnitName=unit.Name
					}
					//设置换算率公式
					const baseUnit=state.ruleForm.ProductPriceList[0]
					if(assestUnit.UnitName && baseUnit.UnitName){
						state.rateMessage=`1 ${assestUnit.UnitName} = ${assestUnit.UnitRate??0} ${baseUnit.UnitName}`
					}
				}
				if(state.ruleForm.ProductPriceList.length>2){
					//更新辅助单位名称
					const assestUnit=state.ruleForm.ProductPriceList[2]
					const unit=state.productUnitList.find(val=>val.Id==assestUnit.UnitId)
					if(unit){
						assestUnit.UnitName=unit.Name
					}
					//设置换算率公式
					const baseUnit=state.ruleForm.ProductPriceList[0]
					if(assestUnit.UnitName && baseUnit.UnitName){
						if(state.rateMessage){
							state.rateMessage=state.rateMessage+", "
						}
						state.rateMessage=`${state.rateMessage}1 ${assestUnit.UnitName} = ${assestUnit.UnitRate??0} ${baseUnit.UnitName}`
					}
				}
				state.ruleForm.ProductBarcodeList=barcodeList
			},{ deep: true }
		);

		//获取换算率汇总数据
		const getRateSummaries = (param: SummaryMethodProps) => {
			const { columns, data } = param
			const sums: (string | VNode)[] = []
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = '换算公式'
					return
				}
				const values = data.map((item) => Number(item[column.property]))
				if (!values.every((value) => Number.isNaN(value))) {
				sums[index] = `$ ${values.reduce((prev, curr) => {
					const value = Number(curr)
					if (!Number.isNaN(value)) {
					return prev + curr
					} else {
					return prev
					}
				}, 0)}`
				} else {
				sums[index] = 'N/A'
				}
			})

			return sums
			}

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
			CategoryId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		
		//	打开弹窗
		const openDialog = async (kind: string, id: string, categoryList:any, categoryId:string, disable: boolean) => {
			state.Files = [];
			state.ruleForm.Kind = kind;
			state.ruleForm.CategoryId = categoryId;
			state.categoryList = categoryList;
			try {
				
				const res = await proxy.$api.psi.unit.getListByScope(kind, 0, 0);
				if (res.errcode != 0) {
					return
				}
				state.productUnitList=res.data
				
				state.disable = disable;
				if (disable) {
					state.title = t('message.action.see');
					getByIdRow(id);
				} else if (id && id != '0') {
					getByIdRow(id);
					if(state.ruleForm.ProductPriceList.length==0){
						state.ruleForm.ProductPriceList=[{Id:"0",UnitRate:1,UnitType:0,Name:"基本单位"},{Id:"0",UnitType:1,Name:"辅助单位1"},{Id:"0",UnitType:1,Name:"辅助单位2"}]
					}else if(state.ruleForm.ProductPriceList.length==1){
						state.ruleForm.ProductPriceList.push({Id:"0",UnitType:1,Name:"辅助单位1"})
						state.ruleForm.ProductPriceList.push({Id:"0",UnitType:1,Name:"辅助单位2"})
					}else if(state.ruleForm.ProductPriceList.length==2){
						state.ruleForm.ProductPriceList.push({Id:"0",UnitType:1,Name:"辅助单位2"})
					}
					state.title = t('message.action.edit');
				} else {
					state.ruleForm.Id = 0;
					state.ruleForm.State = 1;
					state.ruleForm.ProductPriceList=[{Id:"0",UnitRate:1,UnitType:0,Name:"基本单位"},{Id:"0",UnitType:1,Name:"辅助单位1"},{Id:"0",UnitType:1,Name:"辅助单位2"}]
					state.title = t('message.action.add');
				}
				state.isShowDialog = true;
			} finally {
				state.isShowDialog = true;
			}
		};

		const getByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.psi.product.getById(Id,true);
				if (res.errcode != 0) {
					return;
				}
				state.ruleForm = res.data;
				state.Files = state.ruleForm.GoodsPics.split(",");
				state.FilesList = [];
				if (state.ruleForm.GoodsPics != "") {
					for (let i = 0; i < state.Files.length; i++) {
						let image = { url: '', name: '' };
						image.url = state.httpsText + state.Files[i];
						image.name = state.httpsText + state.Files[i];
						state.FilesList.push(image);
					}
				}
				if(res.data.EndTime < '2000-01-01'){
					res.data.EndTime='';
				}
				state.ruleForm = res.data;
			} finally {
				state.isShowDialog = true;
			}
		};
		//删除单位价格
		const onDelUnitRow = (index:number) => {
			const productPrice=state.ruleForm.ProductPriceList[index]
			if(productPrice.UnitId && productPrice.UnitId!="0"){
				ElMessageBox.confirm('确定删除当前记录吗？', '温馨提示', {
					type: 'error',
					closeOnClickModal: false,
					//center: true,
				}).then(() => {
					productPrice.UnitId="0"
					if(index>1){
						productPrice.UnitRate="0"
					}
					productPrice.Barcode=""
					productPrice.Qrcode=""
					productPrice.Price=0
					productPrice.Price1=0
					productPrice.Price2=0
					productPrice.Price3=0
					productPrice.Price4=0
					productPrice.Price5=0
					productPrice.Price6=0
					productPrice.RecentPurchasePrice=0
					productPrice.RecentSalePrice=0
					productPrice.LowestPrice=0
					productPrice.VipPrice=0
				}).catch(() => { })
			}else{
				productPrice.UnitId="0"
				if(index>1){
					productPrice.UnitRate="0"
				}
				productPrice.Barcode=""
				productPrice.Qrcode=""
				productPrice.Price=0
				productPrice.Price1=0
				productPrice.Price2=0
				productPrice.Price3=0
				productPrice.Price4=0
				productPrice.Price5=0
				productPrice.Price6=0
				productPrice.RecentPurchasePrice=0
				productPrice.RecentSalePrice=0
				productPrice.LowestPrice=0
				productPrice.VipPrice=0
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
			state.tableItem = { Id: '0', CategoryId: '', Name: '', Files: '', Kind: 'supplier', StartTime: '' };
			tableData.data = [];
			state.loading = false;
			state.isShowDialog = false;
			proxy.$parent.onGetTableData();
		};

		//	提交
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.loading = true;
					state.ruleForm.Id = state.ruleForm.Id.toString();
					if (state.Files) {
						state.ruleForm.Pics = state.Files.join(',');
					}
					for(const val of state.ruleForm.ProductPriceList){
						if(val.UnitId && val.UnitId!="0" && val.UnitRate<=0){
							ElMessage.warning("单位换算率必须大于0")
							return;
						}
					}
					try {
						const res = await proxy.$api.psi.product.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
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
			state.httpHeaders=proxy.$getRequestHeaders()
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
			getRateSummaries,
			onPreview,
			onRemove,
			onBeforeImageUpload,
			showImage,
			dateFormatYMD,
			getUserInfos,
			tableData,
			rules,
			token,
			onDelUnitRow,
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