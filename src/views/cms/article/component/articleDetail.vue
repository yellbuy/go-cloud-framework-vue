<template>
	<div class="cms-detail-article-container">
		<el-dialog v-model="isShowDialog" width="60%">
			<div class="text-center font24 mb10">{{ruleForm.Title}}</div>
			
			<div class="text-center sub-title">
				<el-space spacer=" | ">
					<div>发布时间：{{ruleForm.PublishTime}}</div>
					<div>来源：{{ruleForm.Source}}</div>
					<div>阅读：{{ruleForm.ClickNum}}</div>
				</el-space>
			</div>
			<!-- <div class="divider"/> -->
			<div class="text-center" v-if="ruleForm.IsShowCover && ruleForm.ImgUrl">
				<img :src="baseStaticUrl+ruleForm.ImgUrl">
			</div>
			<div class="mt10" v-html="ruleForm.Content"></div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" >{{ $t('message.action.close') }}</el-button>
					
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
			title:t('message.action.detail'),
			baseStaticUrl:import.meta.env.VITE_URL,
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
			if(!row||!row.Id){
				return;
			}
			state.title=row.Title;
			state.ruleForm=row;
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
.sub-title{
	padding:10px;
	background-color: var(--el-color-info-light-9);
	margin-bottom: 5px;
	
}
.divider{
	margin:10px 0;
	border-bottom: 1px dashed var(--el-color-info-light-5);
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