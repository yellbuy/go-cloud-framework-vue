<template>
	<el-tabs type="border-card" ref="tabsRef">
		<el-tab-pane :key="0" :label="scopeKind==2?'应用':'实体'" v-if="scopeKind==2|| scopeKind==3">
			<el-form :model="ruleForm" ref="formRef" label-width="70px">
				<el-row :gutter="35">
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20">
						<el-form-item 
							label="名称"
							prop="Name"
							:rules="[{ required: true, message: `名称不能为空`, trigger: 'blur' }]">
							<el-input
								v-model="ruleForm.Name"
								placeholder="请输入名称"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20">
						<el-form-item 
							label="全名"
							prop="FullName">
							<el-input
								v-model="ruleForm.FullName"
								placeholder="请输入全名"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20">
						<el-form-item 
							label="代码"
							prop="Code">
							<el-input
								v-model="ruleForm.Code"
								placeholder="请输入代码"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20" v-if="scopeKind==2">
						<el-form-item 
							label="绑定域名"
							prop="Domain">
							<el-input
								v-model="ruleForm.Domain"
								placeholder="请输入绑定域名"
							></el-input>
							<p title="绑定域名" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>可同时绑定多个域名，多个域名以英文“,”号分割</span></p>
						</el-form-item>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20" v-if="scopeKind==2">
						<el-form-item 
							label="Appid"
							prop="Appid">
							<el-input
								v-model="ruleForm.Appid"
								disabled
							></el-input>
							<p title="应用标识" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>应用标识，不可修改</span></p>
						</el-form-item>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20" v-else>
						<el-form-item 
							label="Tid"
							prop="Tid">
							<el-input
								v-model="ruleForm.Tid"
								disabled
							></el-input>
							<p title="实体标识" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>实体标识，不可修改</span></p>
						</el-form-item>
					</el-col>
					<el-col v-auth:[moduleKey]="'btn.Model'"
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20" v-if="scopeKind==2">
						<el-form-item 
							label="AppKey"
							prop="AppKey">
							<el-input
								type="password"
								show-password
								v-model="ruleForm.AppKey"
								placeholder="AppKey"
							></el-input>
							<p title="AppKey" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>修改后，API调用参数也需同步修改，否则会导致调用失败</span></p>
						</el-form-item>
					</el-col>
					<el-col v-auth:[moduleKey]="'btn.Model'"
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20" v-else>
						<el-form-item 
							label="TenantKey"
							prop="TenantKey">
							<el-input
								type="password"
								show-password
								v-model="ruleForm.TenantKey"
								placeholder="TenantKey"
							></el-input>
							<p title="TenantKey" class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>修改后，API调用参数也需同步修改，否则会导致调用失败</span></p>
						</el-form-item>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20" v-if="scopeKind==2">
						<el-form-item 
							label="主页"
							prop="Homepage">
							<el-input
								v-model="ruleForm.Homepage"
								placeholder="请输入主页"
							></el-input>
						</el-form-item>
					</el-col>
					
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20">
						<el-form-item 
							label="联系人"
							prop="Linkman">
							<el-input
								v-model="ruleForm.Linkman"
								placeholder="请输入联系人"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20">
						<el-form-item 
							label="电话"
							prop="Phone">
							<el-input
								v-model="ruleForm.Phone"
								placeholder="请输入电话"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20">
						<el-form-item 
							label="地址"
							prop="Addr">
							<el-input
								v-model="ruleForm.Addr"
								placeholder="请输入地址"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20">
						<el-form-item 
							label="版权信息"
							prop="Copyright">
							<el-input
								v-model="ruleForm.Copyright"
								placeholder="请输入版权信息"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="8"
						:xl="8"
						class="mb20">
						<el-form-item 
							label="描述"
							prop="Desc">
							<el-input
								v-model="ruleForm.Desc"
								placeholder="请输入描述"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col v-auth:[moduleKey]="'btn.Model'"
						:xs="24"
						:sm="24"
						:md="24"
						:lg="24"
						:xl="24"
						class="mb20">
						<el-form-item 
							label="Logo"
							prop="Logo">
							<el-upload
								class="avatar-uploader"
								:action="`${baseUrl}/v1/file/upload`"
								name="file"
								:headers="{Appid:appid,Authorization:token}"
								:show-file-list="false"
								:on-success="onLogoUploadSuccess"
								:before-upload="onBeforeImageUpload"
							>
								<img v-if="ruleForm.Logo" :src="baseStaticUrl+ruleForm.Logo" class="avatar" />
								<SvgIcon v-else name="fa fa-plus" class="avatar-uploader-icon"/>
							</el-upload>
						</el-form-item>
					</el-col>
					
					<el-col
						:xs="24"
						:sm="24"
						:md="24"
						:lg="24"
						:xl="24"
						class="mb20">
						<el-form-item 
							label="备注"
							prop="Remark">
							<el-input
								v-model="ruleForm.Remark"
								placeholder="请输入备注"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider />
				<div style="text-align:right">
					<!-- <el-button native-type="reset" >{{ $t('message.action.reset') }}</el-button> -->
					<el-button type="primary" @click="onSubmitModel" :loading="loading" v-auth:[moduleKey]="'btn.Model'">{{ $t('message.action.save') }}</el-button>
				</div>
			</el-form>
		</el-tab-pane>
		
		<el-tab-pane :label="group.Name" v-for="(group,index) in list"  :key="index+1">
			<el-form :model="groupItems[group.Key].items" :ref="'form_'+group.Key" label-width="160px">
				<el-row :gutter="35">
					<el-col
						:xs="24"
						:sm="24"
						:md="item.Type === 0 || item.Type === 1 || item.Type ===2 || item.Type ===4 || item.Type ===5?12:24"
						:lg="item.Type === 0 || item.Type === 1 || item.Type ===2 || item.Type ===4 || item.Type ===5?8:24"
						:xl="item.Type === 0 || item.Type === 1 || item.Type ===2 || item.Type ===4 || item.Type ===5?8:24"
						class="mb20"
						v-for="(item,itemIndex) in group.Items" :key="itemIndex">
						<el-form-item 
							:label="item.Type === 10?'':item.Name"
							:label-width="item.Type === 10?1:160"
							:prop="item.Key"
							:rules="[{ required: !item.Readonly && item.Required, message: `${item.Name}不能为空`, trigger: item.Type === 0 || item.Type === 1 || item.Type ===2 || item.Type === 5? 'blur' : 'change' }]"
						>
							<el-input
								v-model="groupItems[group.Key].items[item.Key]"
								:placeholder="item.Remark"
								v-if="item.Type === 0"
								:disabled="item.Readonly"
							></el-input>
							<el-input
								v-model="groupItems[group.Key].items[item.Key]"
								type="number"
								:placeholder="item.Remark"
								v-else-if="item.Type === 1"
								:disabled="item.Readonly"
							></el-input>
							<el-input
								v-model="groupItems[group.Key].items[item.Key]"
								type="textarea"
								:autosize="{minRows: 3, maxRows:6}"
								:placeholder="item.Remark"
								v-else-if="item.Type === 2"
								:disabled="item.Readonly"
							></el-input>
							<el-select
								v-model="groupItems[group.Key].items[item.Key]"
								:placeholder="item.Remark"
								v-else-if="item.Type === 4"
								style="width:100%"
								:disabled="item.Readonly">
								<el-option v-for="(opt,optIndex) in item.Options" :key="optIndex" :label="opt.Name" :value="opt.Value"></el-option>
							</el-select>
							<el-input
								v-model="groupItems[group.Key].items[item.Key]"
								type="password"
								show-password
								:placeholder="item.Remark"
								v-else-if="item.Type === 5"
								:disabled="item.Readonly">
							</el-input>
							<el-upload
								class="avatar-uploader"
								:action="`${baseUrl}/v1/file/upload?groupKey=${group.Key}&itemKey=${item.Key}`"
								v-else-if="item.Type === 6"
								name="file"
								:headers="{Appid:appid,Authorization:token}"
								:show-file-list="false"
								:on-success="onImageUploadSuccess"
								:before-upload="onBeforeImageUpload"
							>
								<img v-if="groupItems[group.Key].items[item.Key]" :src="baseStaticUrl+groupItems[group.Key].items[item.Key]" class="avatar" />
								<SvgIcon v-else name="fa fa-plus" class="avatar-uploader-icon"/>
							</el-upload>
							<el-input
									v-model="groupItems[group.Key].items[item.Key]"
									type="textarea"
									:autosize="{minRows: 3, maxRows:6}"
									v-else-if="item.Type === 7"
									:placeholder="item.Remark"
									:disabled="item.Readonly">
								</el-input>
							<el-input
								v-model="groupItems[group.Key].items[item.Key]"
								type="textarea"
								:autosize="{minRows: 3, maxRows:6}"
								v-else-if="item.Type === 8"
								:placeholder="item.Remark"
								:disabled="item.Readonly">
							</el-input>
							<el-input
								v-model="groupItems[group.Key].items[item.Key]"
								type="textarea"
								:autosize="{minRows: 3, maxRows:6}"
								v-else-if="item.Type === 9"
								:placeholder="item.Remark"
								:disabled="item.Readonly">
							</el-input>
							<template v-else-if="item.Type === 10">
								<p>{{item.Name}}：</p>
								<vue-ueditor-wrap :editor-id="`editor-${group.Key}-${item.Key}`"  
								:editor-dependencies="['ueditor.config.js','ueditor.all.min.js','xiumi/xiumi-ue-dialog-v5.js','xiumi/xiumi-ue-v5.css']"
								v-model="groupItems[group.Key].items[item.Key]" 
								:config="{UEDITOR_HOME_URL:'/ueditor/',serverUrl:`${baseUrl}/v1/common/editor/${appid}`,headers:{'Authorization':token,Appid:appid},readonly:item.Readonly}" 
								></vue-ueditor-wrap>
							</template>
							
							<p :title="item.Remark" class="color-info-light font10 text-help-info" v-if="item.Remark"><SvgIcon name="fa fa-info-circle" /><span v-html="item.Remark"></span></p>
							<template v-else-if="item.Type === 7">	
								<p class="color-info-light font10 text-help-info" v-if="item.Type === 7"><SvgIcon name="fa fa-info-circle" /><span>数组：每行一条记录（或者以“;”或“,”号分割）</span></p>
							</template>
							<template v-else-if="item.Type === 8">
								<p class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>枚举（Value:Name:Tag:Extattr）：每行一条记录（也可以“;”、“,”或“|”号分割）</span></p>
								<p class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>每条记录键值对使用英文‘:’分割，最多4个参数值，如‘0:正常:绿色:备注’等。注：编码在前，名称在后</span></p>						
							</template>
							<template v-else-if="item.Type === 9">
								<p class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>枚举（Name:Value:Tag:Extattr）：每行一条记录（也可以“;”或“,”号分割）</span></p>	
								<p class="color-info-light font10 text-help-info"><SvgIcon name="fa fa-info-circle" /><span>每条记录键值对使用英文‘:’分割，最多4个参数值，如‘正常:0:绿色:备注’。注：名称在前，编码在后</span></p>						
							</template>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider />
				<div style="text-align:right">
					<!-- <el-button native-type="reset" >{{ $t('message.action.reset') }}</el-button> -->
					<el-button type="primary" @click="onSubmit(group.Key)" :groupKey="group.Key"  :loading="loading" v-auth:[moduleKey]="'btn.Save'">{{ $t('message.action.save') }}</el-button>
				</div>
			</el-form>
		</el-tab-pane>
	</el-tabs>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance,computed } from 'vue';
import { ElMessageBox, ElMessage, UploadProps } from 'element-plus';
import { Session } from '/@/utils/storage';
import {request,appid} from '/@/utils/request';
import { emitKeypressEvents } from 'readline';
import { useStore } from '/@/store/index';
export default {
	name: 'commonSetting',
	components: {  },
	setup(props,context) {
		const moduleKey = 'api_common_setting';
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const token = Session.get('token');
		const state = reactive({
			baseUrl:import.meta.env.VITE_API_URL,
			baseStaticUrl:import.meta.env.VITE_URL,
			scopeKind:0,
			token:token,
			appid:appid,
			loading:false,
			groupKey:'',
			moduleKey: moduleKey,
			list:[],
			groupItems:{},
			ruleForm:{},
		});
		
		// 页面加载时
		onMounted(() => {
			//proxy.$refs.tabsRef.$children['model'].$el.style.display = 'none';
			onLoadData();
		});
		//设置数据
		const onLoadData = () => {
			state.loading = true;
			request({
				url:'/v1/admin/common/setting/group',
				method:'get',
				params:state.groupKey
			}).then((res) => {
				state.loading = false;
				if(res.errcode==0){
					console.log(res.data);
					state.scopeKind=res.data.scopeKind;
					state.ruleForm=res.data.model;
					state.list=res.data.groups;
					for(const val of res.data.groups){
						state.groupItems[val.Key]=val;
						var items={}
						for(const item of val.Items){
							if(item.Type==7){
								//数组
								if(!item.Value){
									for(const opt of item.Options){
										if(item.Value){
											item.Value+="\n";
										}
										item.Value+=opt.Name
									}
								}
							}
							else if(item.Type==8){
								//枚举（Value:Name:Tag:Extattr
								if(!item.Value){
									for(const opt of item.Options){
										if(item.Value){
											item.Value+="\n";
										}
										item.Value+=opt.Value+":"+opt.Name;
										if(opt.Tag||opt.Extattr){
											item.Value+=":"+opt.Tag||"";
										}
										if(opt.Extattr){
											item.Value+=":"+opt.Extattr;
										}
									}
								}
							}
							else if(item.Type==9){
								//枚举（Name:Value:Tag:Extattr
								if(!item.Value){
									for(const opt of item.Options){
										if(item.Value){
											item.Value+="\n";
										}
										item.Value+=opt.Name+":"+opt.Value;
										if(opt.Tag||opt.Extattr){
											item.Value+=":"+opt.Tag||"";
										}
										if(opt.Extattr){
											item.Value+=":"+opt.Extattr;
										}
									}
								}
							}
							items[item.Key]=item.Value;
						}
						state.groupItems[val.Key].items=items
					}
				}

			}).catch((err) => {
				ElMessage.error(err)
				state.loading = false;
			});
		};
		const onSubmitModel=()=>{
			if(state.scopeKind!=2 && state.scopeKind !=3){
				return;
			}
			const url=state.scopeKind==2?`/v1/admin/base/app/${state.ruleForm.Id}`:`v1/admin/base/tenant/${state.ruleForm.Id}`
			
			proxy.$refs.formRef.validate((valid) => {
				if (valid) {
					state.loading=true;
					request({
						url: url,
						method: 'post',
						data: state.ruleForm,
					}).then((res)=>{
						state.loading=false;
						if(res.errcode==0){
							const userInfos=Session.get('userInfo')
							let key=""
							if(state.scopeKind==2){
								key=state.ruleForm.AppKey;
								userInfos.app=state.ruleForm;
								userInfos.app.AppKey="";
							} else {
								userInfos.tenant=state.ruleForm;
								key=state.ruleForm.TenantKey;
								userInfos.tenant.TenantKey="";
							}
							store.dispatch('userInfos/setUserInfos', userInfos);
							if(state.scopeKind==2){
								state.ruleForm.AppKey=key;
							} else {
								state.ruleForm.TenantKey=key;
							}
							ElMessage.success("数据保存成功")
						}
					}).catch((err)=>{
						state.loading=false;
					});
					return false;
				}
			})
		};
		const onSubmit=(groupKey:String)=>{
			if(groupKey==""){
				//此处为基本信息管理
			}
			const form=proxy.$refs["form_"+groupKey][0];
			form.validate((valid) => {
				if (!valid) {
					return false;
				}
				state.loading=true;
				const url=`/v1/admin/common/setting/group?groupKey=${groupKey}`
				request({
					url: url,
					method: 'post',
					data: state.groupItems[groupKey].items,
				}).then((res)=>{
					state.loading=false;
					if(res.errcode==0){
						ElMessage.success("数据保存成功")
					}
				}).catch((err)=>{
					state.loading=false;
				});
				return false;
			})
		};

		const onLogoUploadSuccess: UploadProps['onSuccess'] = (
			res, uploadFile
			) => {
				console.log("onSuccess:",res);
				if(res.errcode!=0){
					ElMessage.error(res.errmsg)
					return;
				}
				state.ruleForm.Logo=res.data.src;
			}

		const onImageUploadSuccess: UploadProps['onSuccess'] = (
			res, uploadFile
			) => {
				console.log("onSuccess:",res);
				if(res.errcode!=0){
					ElMessage.error(res.errmsg)
					return;
				}
				const data=res.data;
				const groupKey=data.groupKey;
				const itemKey=data.itemKey;
				const src=data.src;
				if(groupKey && itemKey && src){
					state.groupItems[groupKey].items[itemKey]=src;
				}
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

		return {
			proxy,
			onSubmitModel,
			onSubmit,
			onBeforeImageUpload,
			onLogoUploadSuccess,
			onImageUploadSuccess,
			...toRefs(state),
		};
	},
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
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
  width: 178px;
  height: 178px;
  text-align: center;
  padding:64px;
}
</style>
