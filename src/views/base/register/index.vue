<template>
	<div class="login-container">
		<div class="login-content">
			<div class="login-content-main">
				<h4 class="login-content-title" v-if="appid>0">{{ appName|| getThemeConfig.globalTitle }}</h4>
				<div>
					<el-tabs v-model="tabsActiveName">
						<el-tab-pane :label="tenantTitle" name="tenant">
							<el-form class="login-content-form" :model="ruleForm"  :rules="rules" ref="ruleFormTenantRef"
								label-position="right" label-width="100px" label-suffix="：" size="large" 
								:show-message="true" :inline-message="true"
								@keyup.enter="onSubmit">
								<el-form-item class="login-animation-one" :label="$t('pages.base.label.tenantName')" prop="Name">
									<el-input type="text" :placeholder="$t('pages.base.placeholder.tenantName')" v-model="ruleForm.Name" clearable autocomplete="new-Password">
										<template #prefix>
											<el-icon class="el-input__icon"><OfficeBuilding /></el-icon>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item class="login-animation-one" :label="$t('pages.base.label.mobile')" prop="Mobile">
									<el-input type="text" :placeholder="$t('pages.base.placeholder.uniqueMobile')" v-model="ruleForm.Mobile" clearable autocomplete="new-Password">
										<template #prefix>
											<el-icon class="el-input__icon"><Phone /></el-icon>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item class="login-animation-one" :label="$t('pages.base.label.userName')" prop="Username">
									<el-input type="text" :placeholder="$t('pages.base.placeholder.userName')" v-model="ruleForm.Username" clearable autocomplete="new-Password">
										<template #prefix>
											<el-icon class="el-input__icon"><User /></el-icon>
										</template>
									</el-input>
								</el-form-item>
								
								<el-form-item class="login-animation-two" prop="Password" :label="$t('pages.base.label.password')">
									<el-input
										:type="isShowTenantPassword ? 'text' : 'Password'"
										:placeholder="$t('pages.base.placeholder.password')"
										v-model="ruleForm.Password"
										autocomplete="new-Password"
									>
										<template #prefix>
											<el-icon class="el-input__icon"><Unlock /></el-icon>
										</template>
										<template #suffix>
											<i
												class="iconfont el-input__icon login-content-Password"
												:class="isShowTenantPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
												@click="isShowTenantPassword = !isShowTenantPassword"
											>
											</i>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item class="login-animation-two" prop="PasswordConfirm" :label="$t('pages.base.label.confirmPassword')">
									<el-input
										:type="isShowTenantPasswordConfirm ? 'text' : 'Password'"
										:placeholder="$t('pages.base.placeholder.confirmPassword')"
										v-model="ruleForm.PasswordConfirm"
										autocomplete="new-Password"
									>
										<template #prefix>
											<el-icon class="el-input__icon"><Lock /></el-icon>
										</template>
										<template #suffix>
											<i
												class="iconfont el-input__icon login-content-Password"
												:class="isShowTenantPasswordConfirm ? 'icon-yincangmima' : 'icon-xianshimima'"
												@click="isShowTenantPasswordConfirm = !isShowTenantPasswordConfirm"
											>
											</i>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item class="login-animation-three" prop="CaptchaCode" :label="$t('pages.base.label.captchaCode')">
									<el-row :gutter="15">
										<el-col :span="16">
											<el-input
												type="text"
												maxlength="6"
												:placeholder="$t('pages.base.placeholder.captchaCode')"
												v-model="ruleForm.CaptchaCode"
												clearable
												autocomplete="new-Password"
											>
												<template #prefix>
													<el-icon class="el-input__icon"><Message /></el-icon>
												</template>
											</el-input>
										</el-col>
										<el-col :span="8">
											<div class="login-content-code" @click="onRefreshCaptcha">
												<img class="login-content-code-img" :src="captcha"/>
											</div>
										</el-col>
									</el-row>
								</el-form-item>
								<div class="login-animation-four pb10">
									<el-button type="primary" class="login-content-submit" round @click="onSubmit" :loading="loading.submitState">
										<span>{{ $t('message.action.submit') }}</span>
									</el-button>
								</div>
								<el-row class="mt5">
									<el-col :span="24" class="text-right font10">
										<el-link type="primary" :href="'/#/login?appid='+appid+'&appPermissionKindKey='+appPermissionKindKey">{{ $t('pages.login.account.returnLoginBtnText') }}</el-link>
									</el-col>
								</el-row>
							</el-form>
						</el-tab-pane>
						<el-tab-pane :label="userTitle" name="user">
							<el-form class="login-content-form"  ref="ruleFormUserRef"
							:show-message="true" :inline-message="true" :model="ruleForm" :rules="rules"
								slabel-position="right" label-width="100px" label-suffix="：" 
								size="large" @keyup.enter="onSubmit">
								<el-form-item class="login-animation-one" :label="$t('pages.base.label.realName')" prop="Name">
									<el-input type="text" :placeholder="$t('pages.base.placeholder.realName')" v-model="ruleForm.Name" clearable autocomplete="new-Password">
										<template #prefix>
											<el-icon class="el-input__icon"><House /></el-icon>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item class="login-animation-one" :label="$t('pages.base.label.mobile')" prop="Mobile" >
									<el-input type="text" :placeholder="$t('pages.base.placeholder.uniqueMobile')" v-model="ruleForm.Mobile" clearable autocomplete="new-Password">
										<template #prefix>
											<el-icon class="el-input__icon"><Phone /></el-icon>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item class="login-animation-one" prop="Username" :label="$t('pages.base.label.userName')">
									<el-input type="text" :placeholder="$t('pages.base.placeholder.userName')" v-model="ruleForm.Username" clearable autocomplete="new-Password">
										<template #prefix>
											<el-icon class="el-input__icon"><User /></el-icon>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item class="login-animation-two" prop="Password" :label="$t('pages.base.label.password')">
									<el-input
										:type="isShowTenantPassword ? 'text' : 'Password'"
										:placeholder="$t('pages.base.placeholder.password')"
										v-model="ruleForm.Password"
										autocomplete="new-Password"
									>
										<template #prefix>
											<el-icon class="el-input__icon"><Unlock /></el-icon>
										</template>
										<template #suffix>
											<i
												class="iconfont el-input__icon login-content-Password"
												:class="isShowTenantPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
												@click="isShowTenantPassword = !isShowTenantPassword"
											>
											</i>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item class="login-animation-two" prop="PasswordConfirm" :label="$t('pages.base.label.confirmPassword')">
									<el-input
										:type="isShowTenantPasswordConfirm ? 'text' : 'Password'"
										:placeholder="$t('pages.base.placeholder.confirmPassword')"
										v-model="ruleForm.PasswordConfirm"
										autocomplete="new-Password"
									>
										<template #prefix>
											<el-icon class="el-input__icon"><Lock /></el-icon>
										</template>
										<template #suffix>
											<i
												class="iconfont el-input__icon login-content-Password"
												:class="isShowTenantPasswordConfirm ? 'icon-yincangmima' : 'icon-xianshimima'"
												@click="isShowTenantPasswordConfirm = !isShowTenantPasswordConfirm"
											>
											</i>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item class="login-animation-three" prop="CaptchaCode" 
									:label="$t('pages.base.label.captchaCode')" >
									<el-row :gutter="15">
										<el-col :span="16">
											<el-input
												type="text"
												maxlength="6"
												:placeholder="$t('pages.base.placeholder.captchaCode')"
												v-model="ruleForm.CaptchaCode"
												clearable
												autocomplete="new-Password"
											>
												<template #prefix>
													<el-icon class="el-input__icon"><Message /></el-icon>
												</template>
											</el-input>
										</el-col>
										<el-col :span="8">
											<div class="login-content-code" @click="onRefreshCaptcha">
												<img class="login-content-code-img" :src="captcha"/>
											</div>
										</el-col>
									</el-row>
								</el-form-item>
								<div class="login-animation-four pb10">
									<el-button type="primary" class="login-content-submit" round @click="onSubmit" :loading="loading.submitState">
										<span>{{ $t('message.action.submit') }}</span>
									</el-button>
								</div>
								<el-row class="mt5">
									<el-col :span="24" class="text-right font10">
										<el-link type="primary" :href="'/#/login?appid='+appid+'&appPermissionKindKey='+appPermissionKindKey">{{ $t('pages.login.account.returnLoginBtnText') }}</el-link>
									</el-col>
								</el-row>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
// import Account from '/@/views/login/component/account.vue';
// import Register from '/@/views/login/component/register.vue';
export default {
	name: 'registerTenant',
	components: {  },
	setup() {
		const router = useRouter();
		const route = useRoute();
		const store = useStore();
		const { t } = useI18n();
		const appPermissionKindKey=route.query.appPermissionKindKey
		const appid=route.query.appid
		const appName=route.query.appName
		const kind=route.query.kind
		
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			tabsActiveName: kind||'tenant',
			isShowTenantPassword: false,
			isShowTenantPasswordConfirm: false,
			isTabPaneShow: true,
			captcha:"", //验证码base64图片
			ruleForm: {
				Name:'',
				Username: '',
				Mobile:"",
				Password: '',
				PasswordConfirm:'',
				CaptchaId: '', //验证码ID
				CaptchaCode: '',
				Appid:appid,
			},
			loading: {
				submitState: false,
			},
			appPermissionKindKey: appPermissionKindKey,
			tenantTitle: '',
			userTitle:'',
			appName: appName,
			appid: appid,
			verifyKind:'captcha', //验证码类型
		});

		const rules = reactive({
			Username: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Name: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			Mobile: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
				{
					pattern: /^(1[356784]\d{9})$/,
					message: t('message.validRule.mobile'),
					trigger: 'blur',
				},
			],
			Password: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			PasswordConfirm: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			CaptchaCode: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		const onRefreshCaptcha = async () => {
			const res = await proxy.$api.base.user.getCaptcha();
			if(res.errcode==0){
				if(res.data.captchaId && res.data.captchaImg){
					state.ruleForm.CaptchaId=res.data.captchaId;
					state.captcha=res.data.captchaImg;
				} else {
					state.ruleForm.CaptchaId='';
					state.captcha='';
				}
			}
			
		}

		// 登录
		const onSubmit = async () => {
			
			if(state.loading.submitState){
				return;
			}
			// 模拟数据
			
			const ruleFormRef=state.tabsActiveName=='tenant'?proxy.$refs.ruleFormTenantRef:proxy.$refs.ruleFormUserRef
			ruleFormRef.validate(async (valid:any) => {
				if (valid) {
					state.loading.submitState = true;
					try {
						let res;
						if(state.tabsActiveName=='tenant'){
							res = await proxy.$api.base.register.insertTenant(state.verifyKind,state.ruleForm)
						} else{
							res = await proxy.$api.base.register.insertUser(state.verifyKind,state.ruleForm)
						}
						if (res.errcode == 0) {
							ruleFormRef.resetFields();
							Session.clear(); // 清除缓存/token等
							router.push({ path: "/login", query: { appid: state.appid } });
							setTimeout(() => {
								ElMessage.success(t('pages.base.msg.registerSuccessAndContinue'));
							}, 480);
						}
					} finally{
						state.loading.submitState = false;
					}
					//signInSuccess();
					
				}
				
			});
		}
		
		// 页面加载时
		onMounted(async () => {
			if(state.appPermissionKindKey=='bpp'){
				state.tenantTitle=t('pages.bpp.router.registerTenant')
				state.userTitle=t('pages.bpp.router.registerUser')
			} else {
				state.tenantTitle=t('pages.base.router.registerTenant')
				state.userTitle=t('pages.base.router.registerUser')
			}
			onRefreshCaptcha();
		});
		return {
			getThemeConfig,
			onSubmit,
			onRefreshCaptcha,
			rules,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
	.login-container {
	width: 100%;
	height: 100%;
	background: url('../img/bg_login.png') no-repeat;
	background-size: 100% 100%;
	.login-logo {
		position: absolute;
		top: 30px;
		left: 50%;
		height: 50px;
		display: flex;
		align-items: center;
		font-size: 20px;
		color: var(--color-primary);
		letter-spacing: 2px;
		width: 90%;
		transform: translateX(-50%);
	}
	.login-content {
		width: 600px;
		padding: 20px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) translate3d(0, 0, 0);
		background-color: rgba(255, 255, 255, 0.99);
		border: 5px solid var(--color-primary-light-8);
		border-radius: 4px;
		transition: all 0.3s ease;
		overflow: hidden;
		z-index: 1;
		.login-content-main {
			margin: 0 auto;
			width: 80%;
			.login-content-title {
				color: #333;
				font-weight: 500;
				font-size: 22px;
				text-align: center;
				letter-spacing: 4px;
				margin: 15px 0 30px;
				white-space: nowrap;
				z-index: 5;
				position: relative;
				transition: all 0.3s ease;
			}
		}
		.login-content-main-sacn {
			position: absolute;
			top: 0;
			right: 0;
			width: 50px;
			height: 50px;
			overflow: hidden;
			cursor: pointer;
			transition: all ease 0.3s;
			&-delta {
				position: absolute;
				width: 35px;
				height: 70px;
				z-index: 2;
				top: 2px;
				right: 21px;
				background: var(--el-color-white);
				transform: rotate(-45deg);
			}
			&:hover {
				opacity: 1;
				transition: all ease 0.3s;
				color: var(--color-primary);
			}
			i {
				width: 47px;
				height: 50px;
				display: inline-block;
				font-size: 48px;
				position: absolute;
				right: 2px;
				top: -1px;
			}
		}
	}
	.login-copyright {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 30px;
		text-align: center;
		color: var(--color-whites);
		font-size: 12px;
		opacity: 0.8;
		.login-copyright-company {
			white-space: nowrap;
		}
		.login-copyright-msg {
			@extend .login-copyright-company;
		}
	}
}
.login-content-form {
	margin-top: 20px;
	.login-animation-one,
	.login-animation-two,
	.login-animation-three,
	.login-animation-four,
	.login-animation-five {
		opacity: 0;
		animation-name: error-num;
		animation-duration: 0.5s;
		animation-fill-mode: forwards;
	}
	.login-animation-one {
		animation-delay: 0.1s;
	}
	.login-animation-two {
		animation-delay: 0.2s;
	}
	.login-animation-three {
		animation-delay: 0.3s;
	}
	.login-animation-four {
		animation-delay: 0.4s;
		margin-bottom: 5px;
	}
	.login-animation-five {
		animation-delay: 0.5s;
	}
	.login-content-Password {
		display: inline-block;
		width: 25px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		display: flex;
		align-items: center;
		justify-content: space-around;
		.login-content-code-img {
			width: 100%;
			height: 40px;
			line-height: 40px;
			background-color: #ffffff;
			border: 1px solid rgb(220, 223, 230);
			color: #333;
			font-size: 16px;
			font-weight: 700;
			letter-spacing: 5px;
			text-indent: 5px;
			text-align: center;
			cursor: pointer;
			transition: all ease 0.2s;
			border-radius: 4px;
			user-select: none;
			&:hover {
				border-color: #c0c4cc;
				transition: all ease 0.2s;
			}
		}
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
	</style>
