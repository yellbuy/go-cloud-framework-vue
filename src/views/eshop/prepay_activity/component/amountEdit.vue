<template>
	<div class="cms-edit-article-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading">
				<el-form-item label="活动名称" prop="ActName">
						<el-input v-model="ruleForm.ActName" autofocus placeholder="请输入活动名称" maxlength="100" clearable></el-input>
					</el-form-item>
					<el-form-item label="售价" prop="PayAmount">
						<el-col :span="8">
							<el-input-number v-model="ruleForm.PayAmount" :precision="2" :step="1" :min="0" />
						</el-col>
						<el-col :span="8" class="text-right">
							面值：
						</el-col>
						<el-col :span="8">
							<el-input-number v-model="ruleForm.Amount" :precision="2" :step="1" :min="0" />
						</el-col>
					</el-form-item>
					<el-form-item label="活动图片" prop="ImgUrl">
						<el-input v-model="ruleForm.ImgUrl" placeholder="上传或输入" maxlength="255" clearable ></el-input>
						<div class="mt10" style="border:1px gray dashed">
							<el-upload
								class="avatar-uploader"
								:action="`${baseUrl}/v1/file/upload`"
								name="file"
								:headers="httpHeaders"
								:show-file-list="false"
								:on-success="onImageUploadSuccess"
								:before-upload="onBeforeImageUpload">
								<img v-if="ruleForm.ImgUrl" :src="proxy.$utils.staticUrlParse(ruleForm.ImgUrl)" width="150" height="150" class="avatar" />
								<SvgIcon v-else name="fa fa-plus" class="avatar-uploader-icon"/>
							</el-upload>
						</div>
					</el-form-item>
					<el-form-item label="状态" prop="State">
						<el-col :span="8">
							<el-switch v-model="ruleForm.State" :width="50" inline-prompt :active-text="$t('message.action.enable')" :inactive-text="$t('message.action.disable')" :active-value="1" :inactive-value="0"/>
						</el-col>
						<el-col :span="8" class="text-right">
							排序：
						</el-col>
						<el-col :span="8">
							<el-input-number v-model="ruleForm.Order" :precision="0" :step="10" :min="0" />
						</el-col>
					</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" >{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id"  :loading="loading" v-auth:[$parent.moduleKey]="'btn.Add'">{{ $t('message.action.saveAndAdd') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)"  :loading="loading" v-auths:[$parent.moduleKey]="['btn.Edit','btn.Add']">{{ $t('message.action.save') }}</el-button>
					
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { ElMessage, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
export default {
	name: 'basePrepayAmountEdit',
	props:{
		allowEditCategory:{type:Boolean,default:true},
		allowEditSpecial:{type:Boolean,default:true},
	},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const token = Session.get('token');
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		const state = reactive({
			httpHeaders:proxy.$getRequestHeaders(),
			isShowDialog: false,
			title:t('message.action.add'),
			loading:false,
			token:token,
			baseUrl:import.meta.env.VITE_API_URL,
			cateList:[],
			ruleForm: {
			},
		});

		const rules = reactive({
			ActName: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 100,
					message: t('message.validRule.lengthRange',{'min':1,'max':100}),
					trigger: 'change',
				},
			]
		});

		// 打开弹窗
		const openDialog = (row: Object,cateList:any) => {
			state.loading=false
			const model = JSON.parse(JSON.stringify(row))
			state.ruleForm = model;
			state.cateList=cateList; 
			if(row && row.Id>0){
				state.title=t('message.action.edit');
			}else{
				state.title=t('message.action.add');
				state.ruleForm.Id="0";
				state.ruleForm.IsOnSale=1;
				state.ruleForm.IsTop=0;
				state.ruleForm.Order=100;
				state.ruleForm.IsExchange=1;
				state.ruleForm.ExchangeIntegral=0;
				
				state.ruleForm.MarketPrice=0;
				state.ruleForm.ShopPrice=0;
				state.ruleForm.GhostCount=0;
				state.ruleForm.ClickCount=0;
			}
			state.isShowDialog = true;

		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = (isCloseDlg:boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid:any) => {
				if (valid) {
					state.ruleForm.Id=state.ruleForm.Id.toString();
					state.ruleForm.Order=Number.parseInt(state.ruleForm.Order||0);
					state.loading=true;
					try{
						const res = await proxy.$api.eshop.prepay.save(state.ruleForm)
						if(res.errcode==0){
							if(isCloseDlg){
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id=0;
							}
							proxy.$parent.onGetChildTableData();
						}
					} finally {
						state.loading=false;
					}
				} else {
					return false;
				}
			});
		};
		
		const onImageUploadSuccess: UploadProps['onSuccess'] = (res, uploadFile) => {
			console.log("onSuccess:",res);
			if(res.errcode!=0){
				ElMessage.error(res.errmsg)
				return;
			}
			state.ruleForm.ImgUrl=res.data.src;
		}

		const onBeforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
			if (rawFile.type !== 'image/jpeg'&& rawFile.type !== 'image/jpg'
			&& rawFile.type !== 'image/png' && rawFile.type !== 'image/ico' 
			&& rawFile.type !== 'image/bmp' && rawFile.type !== 'image/gif' 
			&& rawFile.type !== 'image/svg') {
				ElMessage.error('图片格式错误，支持的图片格式：jpg，png，gif，bmp，ico，svg')
				return false
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('图片大小不能超过10MB!')
				return false
			}
			state.httpHeaders=proxy.$getRequestHeaders();
			return true
		}
		// 页面加载时
		onMounted(() => {
			//initTableData();
		});
		return {
			t,
			proxy,
			openDialog,
			closeDialog,
			onCancel,
			getUserInfos,
			rules,
			onImageUploadSuccess,
			onBeforeImageUpload,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
.el-select{
	width:100%;
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
  padding:40px;
}
</style>