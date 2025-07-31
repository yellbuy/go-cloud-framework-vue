<template>
	<div class="eshop-edit-ad-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading">
				<el-row :gutter="10">
					<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
						<el-form-item label="名称" prop="AdName">
							<el-input v-model="ruleForm.AdName" autofocus placeholder="请输入名称" maxlength="100" clearable></el-input>
						</el-form-item>
						<el-form-item label="广告位" prop="PositionId">
							<el-select
								v-model="ruleForm.PositionId"
								placeholder="请选择广告位"
								:props="{ label: 'PositionName', value: 'Id' }">
								<el-option	el-option v-for="item in positionList" :key="item.Id" :label="item.PositionName+'['+item.AdWidth+'x' + item.AdHeight+']'" :value="item.Id"> </el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="Enabled">
							<el-checkbox v-model="ruleForm.Enabled" :true-label="1" :false-label="0">开启</el-checkbox>
						</el-form-item>
						<el-form-item label="排序" prop="Order">
							<el-input-number v-model="ruleForm.Order" :min="0" />
						</el-form-item>
						<el-form-item label="跳转方式" prop="AdType">
							<el-select
								v-model="ruleForm.AdType"
								placeholder="跳转方式">
								<el-option value="" label="站内跳转"></el-option>
								<el-option value="OuterURL" label="URL跳转"></el-option>
								<el-option value="OuterMP" label="小程序跳转"></el-option>
								<el-option value="OuterAPP" label="APP跳转"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="跳转参数" prop="AdLinkArgs">
							<el-input v-model="ruleForm.AdLinkArgs" autofocus placeholder="如外链小程序的AppId等" maxlength="100" clearable></el-input>
						</el-form-item>
						<el-form-item label="广告链接" prop="AdLink">
							<el-input v-model="ruleForm.AdLink" autofocus placeholder="请输入广告链接地址" maxlength="100" clearable></el-input>
						</el-form-item>
						<el-form-item label="广告描述" prop="AdDesc">
							<el-input v-model="ruleForm.AdDesc" autofocus placeholder="广告简要描述" maxlength="100" clearable></el-input>
						</el-form-item>
						
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
						
						<el-form-item label="开始时间" prop="StartTime">
							<el-date-picker
								v-model="ruleForm.StartTime"
								type="datetime"
								placeholder="开始时间"
								format="YYYY-MM-DD HH:mm"
								style="width: 100%"
							></el-date-picker> 
						</el-form-item>
						<el-form-item label="结束时间" prop="EndTime">
							<el-date-picker
								v-model="ruleForm.EndTime"
								type="datetime"
								placeholder="结束时间"
								format="YYYY-MM-DD HH:mm"
								style="width: 100%"
							></el-date-picker> 
						</el-form-item>
						<el-form-item label="广告标记" prop="AdTag">
							<el-select
								v-model="ruleForm.AdTag"
								placeholder="广告标记">
								<el-option :value="0" label="无"></el-option>
								<el-option :value="1" label="推荐"></el-option>
								<el-option :value="2" label="新品"></el-option>
								<el-option :value="3" label="热门"></el-option>
								<el-option :value="4" label="精品"></el-option>
								<el-option :value="10" label="促销"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="促销方式" prop="AdKind">
							<el-select
								v-model="ruleForm.AdKind"
								placeholder="促销方式">
								<el-option :value="0" label="无"></el-option>
								<el-option :value="1" label="限时"></el-option>
								<el-option :value="2" label="限量"></el-option>
								<el-option :value="3" label="限时限量"></el-option>
								<el-option :value="5" label="秒杀"></el-option>
								<el-option :value="10" label="拼团"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="限时时间" prop="ExpireTime">
							<el-date-picker
								v-model="ruleForm.ExpireTime"
								type="datetime"
								placeholder="限时到期时间，将显示倒计时"
								format="YYYY-MM-DD HH:mm:ss"
								style="width: 100%"
							></el-date-picker> 
						</el-form-item>
						<el-form-item label="限购数量" prop="TotalNum">
							<el-input-number v-model="ruleForm.TotalNum" :min="0" :step="10"/>
						</el-form-item>
						<el-form-item label="剩余数量" prop="RemainNum">
							<el-input-number v-model="ruleForm.RemainNum" :min="0" :step="10"/>
						</el-form-item>
						<el-form-item label="关联模型" prop="AdModel">
							<el-select
								v-model="ruleForm.AdModel"
								placeholder="关联模型">
								<el-option value="" label="无"></el-option>
								<el-option value="goods" label="商品"></el-option>
								<el-option value="article" label="文章"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="模型标识" prop="AdModelId">
							<el-input-number v-model="ruleForm.AdModelId" :min="0" :step="10" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
						<el-form-item label="视频地址" prop="VideoUrl">
							<el-input v-model="ruleForm.VideoUrl" placeholder="视频地址" maxlength="255" clearable></el-input>
						</el-form-item>
						<el-form-item label="音频地址" prop="AudioUrl">
							<el-input v-model="ruleForm.VideoUrl" placeholder="音频地址" maxlength="255" clearable></el-input>
						</el-form-item>
						<el-form-item label="图片地址" prop="ImgUrl">
							<el-input v-model="ruleForm.ImgUrl" placeholder="上传或输入" maxlength="255" clearable></el-input>
							<div class="mt10" style="border: 1px gray dashed">
								<el-upload
									class="avatar-uploader"
									:action="`${baseUrl}/v1/file/upload`"
									name="file"
									:headers="httpHeaders"
									:with-credentials="true"
									:show-file-list="false"
									:on-success="onImageUploadSuccess"
									:before-upload="onBeforeImageUpload"
								>
									<img v-if="ruleForm.ImgUrl" :src="proxy.$utils.staticUrlParse(ruleForm.ImgUrl)" width="150" height="150" class="avatar" />
									<SvgIcon v-else name="fa fa-plus" class="avatar-uploader-icon" />
								</el-upload>
							</div>
						</el-form-item>
						<el-form-item label="联系人" prop="LinkMan">
							<el-input v-model="ruleForm.LinkMan" placeholder="联系人" maxlength="50" clearable></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="LinkEmail">
							<el-input v-model="ruleForm.LinkEmail" placeholder="联系人邮箱" maxlength="50" clearable></el-input>
						</el-form-item>
						<el-form-item label="电话" prop="LinkPhone">
							<el-input v-model="ruleForm.LinkPhone" placeholder="联系人电话" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" :loading="loading" v-auth:[$parent.moduleKey]="'btn.AdAdd'">{{
						$t('message.action.saveAndAdd')
					}}</el-button>
					<el-button
						type="primary"
						@click="onSubmit(true)"
						:loading="loading"
						v-auths:[$parent.moduleKey]="['btn.AdEdit', 'btn.AdAdd']"
						>{{ $t('message.action.save') }}</el-button
					>
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
import { Session } from '/@/utils/storage';
export default {
	name: 'baseUserEdit',
	props: {
		allowEditCategory: { type: Boolean, default: true },
		allowEditSpecial: { type: Boolean, default: true },
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
			title: t('message.action.add'),
			loading: false,
			token: token,
			baseUrl: import.meta.env.VITE_API_URL,
			positionList: [],
			ruleForm: {},
		});

		const rules = reactive({
			AdName: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					min: 1,
					max: 100,
					message: t('message.validRule.lengthRange', { min: 1, max: 100 }),
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
			EndTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			ExpireTime: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			PositionId: [{ required: true, message: t('message.validRule.required'), trigger: 'blur' }],
		});

		// 打开弹窗
		const openDialog = (row: Object, positionList: any) => {
			state.loading = false;
			const model = JSON.parse(JSON.stringify(row));
			state.ruleForm = model;
			state.positionList = positionList||[];
			if (row && row.Id > 0) {
				state.title = t('message.action.edit');
			} else {
				state.title = t('message.action.add');
				state.ruleForm.Id = 0;
				state.ruleForm.Enabled = 1;
				state.ruleForm.Order = 50;
				state.ruleForm.TotalNum=0;
				state.ruleForm.RemainNum=0;
				state.ruleForm.AdModelId="0";
				state.ruleForm.StartTime=new Date();
				state.ruleForm.EndTime=dayjs(new Date()).add(1, 'month');
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
		const onSubmit = (isCloseDlg: boolean) => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					state.ruleForm.Id = state.ruleForm.Id.toString();
					state.ruleForm.Order = Number.parseInt(state.ruleForm.Order || 0);
					state.ruleForm.TotalNum = Number.parseInt(state.ruleForm.TotalNum || 0);
					state.ruleForm.RemainNum = Number.parseInt(state.ruleForm.RemainNum || 0);
					state.ruleForm.AdModelId = state.ruleForm.AdModelId+"";
					state.ruleForm.AdPosition={Id:state.ruleForm.PositionId}
					// if(!state.ruleForm.Description){
					// 	//未填入主题，截取正文纯文本
					// 	var ue = window.UE.getEditor('editor-content');
					// 	state.ruleForm.Description=ue.getContentTxt().substr(0,255);
					// }
					state.loading = true;
					try {
						const res = await proxy.$api.eshop.ad.save(state.ruleForm);
						if (res.errcode == 0) {
							if (isCloseDlg) {
								closeDialog();
							} else {
								proxy.$refs.ruleFormRef.resetFields();
								state.ruleForm.Id = 0;
							}
							proxy.$parent.onGetChildTableData();
						}
					} finally {
						state.loading = false;
					}
				} else {
					return false;
				}
			});
		};

		const onImageUploadSuccess: UploadProps['onSuccess'] = (res, uploadFile) => {
			console.log('onSuccess:', res);
			if (res.errcode != 0) {
				ElMessage.error(res.errmsg);
				return;
			}
			state.ruleForm.ImgUrl = res.data.src;
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
			state.httpHeaders=proxy.$getRequestHeaders();
			return true;
		};
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