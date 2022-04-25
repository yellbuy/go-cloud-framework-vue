<template>
	<div class="cms-edit-article-container">
		<el-dialog :title="title" v-model="isShowDialog" width="90%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading">
				<el-row :gutter="10">
					<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
						<el-form-item label="标题" prop="Title">
							<el-input v-model="ruleForm.Title" autofocus placeholder="请输入标题" maxlength="100" clearable></el-input>
						</el-form-item>
						<el-form-item label="所属栏目" prop="CategoryId" v-if="allowEditCategory">
							<el-input v-model="ruleForm.CategoryId" placeholder="请输入账户名" maxlength="50" clearable></el-input>
						</el-form-item>
						<el-form-item label="所属专题" prop="SpecialId" v-if="allowEditSpecial">
							<el-input v-model="ruleForm.SpecialId" placeholder="请输入账户名" maxlength="50" clearable></el-input>
						</el-form-item>
						<el-form-item label="封面图" prop="ImgUrl">
							<el-input v-model="ruleForm.ImgUrl" placeholder="上传或输入" maxlength="255" clearable ></el-input>
							<div class="mt10">
								<el-upload
									class="avatar-uploader"
									:action="`${baseUrl}/v1/file/upload`"
									name="file"
									:headers="{Appid:getUserInfos.appid,Authorization:token}"
									:show-file-list="false"
									:on-success="onImageUploadSuccess"
									:before-upload="onBeforeImageUpload">
									<img v-if="ruleForm.ImgUrl" :src="baseStaticUrl+ruleForm.ImgUrl" width="150" height="150" class="avatar" />
									<SvgIcon v-else name="fa fa-plus" class="avatar-uploader-icon"/>
								</el-upload>
							</div>
							
						</el-form-item>
						<el-form-item label="发布时间" prop="PublishTime">
							<el-date-picker
								v-model="ruleForm.PublishTime"
								type="datetime"
								format="YYYY-MM-DD HH:mm:ss"
								placeholder="选择发布时间"
							/>
						</el-form-item>
						<el-form-item prop="IsShowCover" label="正文显示封面" v-if="ruleForm.ImgUrl">
							<el-radio v-model="ruleForm.IsShowCover" :label="0">否</el-radio>
    						<el-radio v-model="ruleForm.IsShowCover" :label="ruleForm.ImgUrl?1:0">是</el-radio>
						</el-form-item>
						<el-form-item label="文章来源" prop="Source">
							<el-input v-model="ruleForm.Source" placeholder="文章来源" maxlength="50" clearable></el-input>
						</el-form-item>
						<el-form-item label="外链地址" prop="LinkUrl">
							<el-input v-model="ruleForm.LinkUrl" placeholder="外链地址" maxlength="255" clearable></el-input>
						</el-form-item>
						
						<el-form-item label="文章摘要" prop="Description">
							<el-input v-model="ruleForm.Description" placeholder="文章摘要" maxlength="255" clearable 
							type="textarea" :autosize="{minRows: 3, maxRows:6}" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
						<vue-ueditor-wrap :editor-id="`editor-content`"  
						:editor-dependencies="['ueditor.config.js','ueditor.all.min.js','xiumi/xiumi-ue-dialog-v5.js','xiumi/xiumi-ue-v5.css']"
						v-model="ruleForm.Content" 
						:config="{UEDITOR_HOME_URL:'/ueditor/',serverUrl:`${baseUrl}/v1/common/editor/${getUserInfos.appid}`,headers:{'Authorization':token,Appid:getUserInfos.appid}}" 
						></vue-ueditor-wrap>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
						<el-card class="box-card">
							<template #header>
							<div class="card-header">
								<span>发布</span>
							</div>
							</template>
							<div>
								<el-form-item prop="State" label="状态">
									<el-radio v-model="ruleForm.State" :label="0">草稿</el-radio>
									<el-radio v-model="ruleForm.State" :label="1">发布</el-radio>
								</el-form-item>
								<el-form-item prop="AuditState" label="审核" v-if="ruleForm.State" v-auth:[$parent.moduleKey]="'btn.ArticleAudit'">
									<el-radio v-model="ruleForm.AuditState" :label="1">通过</el-radio>
									<el-radio v-model="ruleForm.AuditState" :label="0">待审</el-radio>
									<el-radio v-model="ruleForm.AuditState" :label="-1">驳回</el-radio>
								</el-form-item>
								<el-form-item prop="IsTop" label="置顶">
									<el-radio v-model="ruleForm.IsTop" :label="0">否</el-radio>
									<el-radio v-model="ruleForm.IsTop" :label="1">是</el-radio>
								</el-form-item>
								<el-form-item prop="IsSwiper" label="轮播" v-if="ruleForm.ImgUrl">
									<el-radio v-model="ruleForm.IsSwiper" :label="0">否</el-radio>
									<el-radio v-model="ruleForm.IsSwiper" :label="ruleForm.ImgUrl?1:0">是</el-radio>
								</el-form-item>
								<el-form-item prop="IsPromote" label="推荐">
									<el-radio v-model="ruleForm.IsPromote" :label="0">否</el-radio>
									<el-radio v-model="ruleForm.IsPromote" :label="1">是</el-radio>
								</el-form-item>
								<el-form-item prop="ViewNum" label="虚拟阅读量">
									<el-input type="number" v-model="ruleForm.ViewNum" placeholder="虚拟阅读量" 
									maxlength="10" :min="0" :max="1000000000" :step="100">
									<template #prepend>
										<i name="" class="fa fa-eye font14"></i>
									</template>
									</el-input>
								</el-form-item>
							</div>
						</el-card>
					</el-col>
					
				</el-row>
				
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" >{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id"  :loading="loading" v-auth:[$parent.moduleKey]="'btn.ArticleAdd'">{{ $t('message.action.saveAndAdd') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)"  :loading="loading" v-auths:[$parent.moduleKey]="['btn.ArticleEdit','btn.ArticleAdd']">{{ $t('message.action.save') }}</el-button>
					
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance,computed } from 'vue';
import { ElMessageBox, ElMessage, UploadProps } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
export default {
	name: 'baseUserEdit',
	props:{
		allowEditCategory:{type:Boolean,default:true},
		allowEditSpecial:{type:Boolean,default:true},
	},
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		const state = reactive({
			isShowDialog: false,
			baseStaticUrl:import.meta.env.VITE_URL,
			title:t('message.action.add'),
			loading:false,
			ruleForm: {
				Id:0,
				Title: '', // 账户名称
				ImgUrl: '',
				Name: '', // 用户昵称
				Code:'',
				Enable:1,
				Order: 100, // 排序
				Password:'',
				PasswordConfirm:'',
				Mobile:'',
				Tel:'',
				Email:'',
				Addrcode:'',
				RoleIds:'',
				CheckedRoleList:[],
				RoleList:[],
				AllowBackendLogin:1,
				AllowFrontendLogin:1,
				IsExternal:0,
				department: [], // 部门
				Gender: 0 // 性别
			},
			deptData: [], // 部门数据
		});

		const rules = reactive({
			Title: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 100,
					message: t('message.validRule.lengthRange',{'min':1,'max':50}),
					trigger: 'change',
				},
			]
		});

		// 打开弹窗
		const openDialog = (row: Object) => {
			state.loading=false
			const model = JSON.parse(JSON.stringify(row))
			state.ruleForm = model;
			state.ruleForm.AuditState=0; //打开窗口，重新设置为待审状态
			if(row && row.Id>0){
				state.title=t('message.action.edit');
			}else{
				state.title=t('message.action.add');
				state.ruleForm.Id=0;
				state.ruleForm.PublishTime=new Date();
				state.ruleForm.State=0;
				state.ruleForm.IsTop=0;
				state.ruleForm.IsShowCover=0;
				state.ruleForm.IsSwiper=0;
				state.ruleForm.IsPromote=0;
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
					if(state.ruleForm.State==0){
						//草稿重置为设置未待审状态
						state.ruleForm.AuditState=0;
					}
					if(!state.ruleForm.Description){
						//未填入主题，截取正文纯文本
						var ue = window.UE.getEditor('editor-content');
						state.ruleForm.Description=ue.getContentTxt().substr(0,255);
					}
					state.loading=true;
					try{
						const res = await proxy.$api.cms.article.save(state.ruleForm)
						if(res.errcode==0){
							if(isCloseDlg){
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id=0;
								state.ruleForm.PasswordConfirm='';
							}
							proxy.$parent.onGetTableData();
						}
					} finally {
						state.loading=false;
					}
				} else {
					return false;
				}
			});
		};
		//加载角色数据
		const onInitRoleData=(async (roleIds:string)=>{
			
			state.ruleForm.RoleList=[];
			state.ruleForm.CheckedRoleList=[];
			const res= await proxy.$api.base.role.getList({pageSize:1000000});
			if(res.errcode!=0){
				return;
			}
			
			const roleIdArr=roleIds.split(",");
			for (const val of res.data) {
				val.Checked=false;
				for(const id of roleIdArr){
					if(val.Id==id){
						state.ruleForm.CheckedRoleList.push(val.Id)
						val.Checked=true
						break;
					}
				}
			}
			state.ruleForm.RoleList=res.data;
		})

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
			return true
		}
		// 页面加载时
		onMounted(() => {
			//initTableData();
		});
		return {
			t,
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