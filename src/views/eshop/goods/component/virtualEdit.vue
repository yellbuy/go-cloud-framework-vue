<template>
	<div class="cms-edit-article-container">
		<el-dialog :title="title" v-model="isShowDialog" width="60%">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading">
				<el-tabs type="border-card" ref="tabsRef">
					<el-tab-pane :key="0" label="基本">
						<el-row :gutter="10">
							<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
								<el-form-item label="名称" prop="GoodsName">
									<el-input v-model="ruleForm.GoodsName" autofocus placeholder="请输入名称" maxlength="100" clearable></el-input>
								</el-form-item>
								<el-form-item label="所属类别" prop="CategoryId">
									<el-tree-select
										v-model="ruleForm.CategoryId"
										placeholder="请选择父级"
										default-expand-all
										node-key="Id"
										:value-key="Id"
										:current-node-key="ruleForm.CategoryId"
										:data="cateList"
										:props="{ label: 'Name', value: 'Id', children: 'Children' }"
										check-strictly
									/>
								</el-form-item>
								<el-form-item label="货号/编码" prop="GoodsSn">
									<el-input v-model="ruleForm.GoodsSn" autofocus placeholder="请输入货号代码" maxlength="50" clearable></el-input>
								</el-form-item>
								<el-form-item label="在售" prop="IsOnSale">
									<el-col :span="2">
										<el-switch
											v-model="ruleForm.IsOnSale"
											inline-prompt
											:active-text="$t('message.action.yes')"
											:inactive-text="$t('message.action.no')"
											:active-value="1"
											:inactive-value="0"
										/>
									</el-col>
									<el-col :span="6" class="text-right"> 推荐： </el-col>
									<el-col :span="2">
										<el-switch
											v-model="ruleForm.IsTop"
											inline-prompt
											:active-text="$t('message.action.yes')"
											:inactive-text="$t('message.action.no')"
											:active-value="1"
											:inactive-value="0"
										/>
									</el-col>
									<el-col :span="6" class="text-right"> 排序： </el-col>
									<el-col :span="8">
										<el-input-number v-model="ruleForm.Order" :precision="0" :step="10" :min="0" />
									</el-col>
								</el-form-item>
								<el-form-item label="兑换商品" prop="IsExchange">
									<el-col :span="8">
										<el-switch
											v-model="ruleForm.IsExchange"
											inline-prompt
											:active-text="$t('message.action.yes')"
											:inactive-text="$t('message.action.no')"
											:active-value="1"
											:inactive-value="0"
										/>
									</el-col>
									<el-col :span="8" class="text-right"> 消耗积分/金币： </el-col>
									<el-col :span="8">
										<el-input-number v-model="ruleForm.ExchangeIntegral" :precision="0" :step="1" :min="0" />
									</el-col>
								</el-form-item>
								<el-form-item label="原价" prop="MarketPrice">
									<el-col :span="8">
										<el-input-number v-model="ruleForm.MarketPrice" :precision="2" :step="1" :min="0" />
									</el-col>
									<el-col :span="8" class="text-right"> 现价： </el-col>
									<el-col :span="8">
										<el-input-number v-model="ruleForm.ShopPrice" :precision="2" :step="1" :min="0" />
									</el-col>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
								<el-form-item label="视频源" prop="GoodsVideo">
									<el-input v-model="ruleForm.GoodsVideo" autofocus placeholder="请填写视频源地址" maxlength="255" clearable></el-input>
								</el-form-item>
								<el-form-item label="封面图" prop="GoodsImg">
									<el-input v-model="ruleForm.GoodsImg" placeholder="上传或输入" maxlength="255" clearable></el-input>
									<div class="mt10" style="border: 1px gray dashed">
										<el-upload
											class="avatar-uploader"
											:action="`${baseUrl}/v1/file/upload`"
											name="file"
											:headers="{ Appid: getUserInfos.appid, Authorization: token }"
											:show-file-list="false"
											:on-success="onImageUploadSuccess"
											:before-upload="onBeforeImageUpload"
										>
											<img v-if="ruleForm.GoodsImg" :src="proxy.$utils.staticUrlParse(ruleForm.GoodsImg)" width="150" height="150" class="avatar" />
											<SvgIcon v-else name="fa fa-plus" class="avatar-uploader-icon" />
										</el-upload>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane :key="1" label="详情">
						<vue-ueditor-wrap
							:editor-id="`editor-goods-desc`"
							:editor-dependencies="['ueditor.config.js', 'ueditor.all.min.js', 'xiumi/xiumi-ue-dialog-v5.js', 'xiumi/xiumi-ue-v5.css']"
							v-model="ruleForm.GoodsDesc"
							:config="{
								UEDITOR_HOME_URL: '/ueditor/',
								serverUrl: `${baseUrl}/v1/common/editor/${getUserInfos.appid}`,
								headers: { Authorization: token, Appid: getUserInfos.appid },
							}"
						></vue-ueditor-wrap>
					</el-tab-pane>
					<el-tab-pane :key="2" label="扩展">
						<el-form-item label="精品" prop="IsBest">
							<el-col :span="3">
								<el-switch
									v-model="ruleForm.IsBest"
									inline-prompt
									:active-text="$t('message.action.yes')"
									:inactive-text="$t('message.action.no')"
									:active-value="1"
									:inactive-value="0"
								/>
							</el-col>
							<el-col :span="3" class="text-right"> 新品： </el-col>
							<el-col :span="3">
								<el-switch
									v-model="ruleForm.IsNew"
									inline-prompt
									:active-text="$t('message.action.yes')"
									:inactive-text="$t('message.action.no')"
									:active-value="1"
									:inactive-value="0"
								/>
							</el-col>
						</el-form-item>
						<el-form-item label="热门" prop="IsHot">
							<el-col :span="3">
								<el-switch
									v-model="ruleForm.IsHot"
									inline-prompt
									:active-text="$t('message.action.yes')"
									:inactive-text="$t('message.action.no')"
									:active-value="1"
									:inactive-value="0"
								/>
							</el-col>
							<el-col :span="3" class="text-right"> 促销： </el-col>
							<el-col :span="3">
								<el-switch
									v-model="ruleForm.IsPromote"
									inline-prompt
									:active-text="$t('message.action.yes')"
									:inactive-text="$t('message.action.no')"
									:active-value="1"
									:inactive-value="0"
								/>
							</el-col>
						</el-form-item>
						<el-form-item label="虚拟销量" prop="GhostCount">
							<el-col :span="3">
								<el-input-number v-model="ruleForm.GhostCount" :precision="0" :step="10" :min="0" />
							</el-col>
							<el-col :span="3" class="text-right"> 点击量： </el-col>
							<el-col :span="3">
								<el-input-number v-model="ruleForm.ClickCount" :precision="0" :step="10" :min="0" />
							</el-col>
						</el-form-item>
						<el-form-item label="关键字" prop="Keywords">
							<el-input v-model="ruleForm.Keywords" autofocus placeholder="请输入关键字" maxlength="100" clearable></el-input>
						</el-form-item>
						<el-form-item label="简要描述" prop="GoodsBrief">
							<el-input
								v-model="ruleForm.GoodsBrief"
								placeholder="简要描述"
								maxlength="255"
								clearable
								type="textarea"
								:autosize="{ minRows: 3, maxRows: 6 }"
							></el-input>
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">{{ $t('message.action.cancel') }}</el-button>
					<el-button type="primary" @click="onSubmit(false)" v-if="!ruleForm.Id" :loading="loading" v-auth:[$parent.moduleKey]="'btn.GoodsAdd'">{{
						$t('message.action.saveAndAdd')
					}}</el-button>
					<el-button type="primary" @click="onSubmit(true)" :loading="loading" v-auths:[$parent.moduleKey]="['btn.GoodsEdit', 'btn.GoodsAdd']">{{
						$t('message.action.save')
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance, computed } from 'vue';
import { ElMessageBox, ElMessage, UploadProps } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { Session } from '/@/utils/storage';
import { useStore } from '/@/store/index';
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
			isShowDialog: false,
			title: t('message.action.add'),
			loading: false,
			token: token,
			baseUrl: import.meta.env.VITE_API_URL,
			cateList: [],
			ruleForm: {},
		});

		const rules = reactive({
			GoodsName: [
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
			CategoryId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});

		// 打开弹窗
		const openDialog = (row: Object, cateList: any) => {
			state.loading = false;
			const model = JSON.parse(JSON.stringify(row));
			state.ruleForm = model;
			state.cateList = cateList;
			if (row && row.Id > 0) {
				state.title = t('message.action.edit');
			} else {
				state.title = t('message.action.add');
				state.ruleForm.Id = '0';
				state.ruleForm.IsOnSale = 1;
				state.ruleForm.IsTop = 0;
				state.ruleForm.Order = 100;
				state.ruleForm.IsExchange = 1;
				state.ruleForm.ExchangeIntegral = 0;

				state.ruleForm.MarketPrice = 0;
				state.ruleForm.ShopPrice = 0;
				state.ruleForm.GhostCount = 0;
				state.ruleForm.ClickCount = 0;
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
					state.loading = true;
					try {
						const res = await proxy.$api.eshop.goods.save(state.ruleForm);
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
			state.ruleForm.GoodsImg = res.data.src;
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