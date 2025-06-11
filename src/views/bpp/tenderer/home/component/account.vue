<template>
	<el-form class="login-content-form" size="large" @keyup.enter="onSignIn">
		<el-form-item class="login-animation-one">
			<el-input type="text" :placeholder="$t('pages.login.account.accountPlaceholder1')" v-model="ruleForm.account" clearable autocomplete="new-Password">
				<template #prefix>
					<el-icon class="el-input__icon">
						<User />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation-two">
			<el-input :type="isShowPassword ? 'text' : 'password'" :placeholder="$t('pages.login.account.accountPlaceholder2')" v-model="ruleForm.password" autocomplete="new-Password">
				<template #prefix>
					<el-icon class="el-input__icon"><Unlock /></el-icon>
				</template>
				<template #suffix>
					<i class="iconfont el-input__icon login-content-password" :class="isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'" @click="isShowPassword = !isShowPassword"/>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation-three" v-if="ruleForm.captchaId && isShowCaptcha">
			<el-row :gutter="15">
				<el-col :span="16">
					<el-input type="text" maxlength="6" :placeholder="$t('pages.login.account.accountPlaceholder3')" v-model="ruleForm.code" clearable autocomplete="new-Password">
						<template #prefix>
							<el-icon class="el-input__icon">
								<Position />
							</el-icon>
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
		<el-form-item class="login-animation-four pb10">
			<el-button type="primary" class="login-content-submit" round @click="onSignIn" :loading="loading.signIn">
				<span>{{ $t('pages.login.account.accountBtnText') }}</span>
			</el-button>
		</el-form-item>
		<!-- <el-form-item class="login-animation-five">
			<el-button type="text" size="small">{{ $t('pages.login.link.one3') }}</el-button>
			<el-button type="text" size="small">{{ $t('pages.login.link.two4') }}</el-button>
		</el-form-item> -->
	</el-form>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { initBackEndControlRoutes } from '/@/router/backEnd';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { useStore } from '/@/store/index';
import { formatAxis } from '/@/utils/formatTime';

import { Local, Session } from '/@/utils/storage';

export default defineComponent({
	name: 'loginAccount',
	setup() {
		const { t } = useI18n();
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const isDevEnv = process.env.NODE_ENV === 'development';
		const state = reactive({
			isShowPassword: false,
			isShowCaptcha:false,
			captcha:"", //验证码
			ruleForm: {
				account: isDevEnv ? 'admin' : '',
				password: isDevEnv ? '123456' : '',
				captchaId: '', //验证码ID
				code: isDevEnv ? '' : '',
			},
			loading: {
				signIn: false,
			},
		});
		// 时间获取
		const currentTime = computed(() => {
			return formatAxis(new Date());
		});
		// 登录
		const onSignIn = async () => {
			if(state.loading.signIn){
				return;
			}
			// 模拟数据
			state.loading.signIn = true;
			let defaultRoles: Array<string> = [];
			let defaultAuthBtnList: Array<string> = [];
			// admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
			let adminRoles: Array<string> = ['admin'];
			// admin 按钮权限标识
			let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
			// test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
			let testRoles: Array<string> = ['common']; 
			// test 按钮权限标识
			let testAuthBtnList: Array<string> = ['btn.add', 'btn.link']; 
			// 不同用户模拟不同的用户权限
			if (state.ruleForm.account === 'admin') {
				defaultRoles = adminRoles;
				defaultAuthBtnList = adminAuthBtnList;
			} else {
				defaultRoles = testRoles;
				defaultAuthBtnList = testAuthBtnList;
			}
			const localAppid=Local.get('appid');
			const params={appid:route.query.appid||localAppid||""};
			console.log("params:",params)
			try {
				const res = await proxy.$api.base.user.signIn(state.ruleForm, params);
				state.loading.signIn = false;
				if (res.errcode != 0) {
					state.ruleForm.code="";
					onRefreshCaptcha();
					state.isShowCaptcha=true;
					if(res.errcode!=100014){
						state.ruleForm.password="";
					}
					return;
				}
				const avatar = import.meta.env.VITE_API_URL + '/v1/avatar/user/' + res.data.user.Id + '.jpg';
				//console.debug(avatar)
				// 用户信息模拟数据
				const userInfos = {
					uid: res.data.user.Id,
					appid: res.data.user.Appid,
					tid: res.data.user.Tid,
					account: res.data.user.Account,
					realname: res.data.user.Name || res.data.user.NickName || res.data.user.Account,
					mobile: res.data.user.Mobile,
					avatar: avatar,
					time: new Date().getTime(),
					isAdmin: res.data.user.IsAdmin,
					roles: ['api'],
					authBtnList: defaultAuthBtnList,
					isProxy: res.data.user.IsProxy,
					app: res.data.user.App || {},
					tenant: res.data.user.Tenant || {},
				};
				// 存储 token 到浏览器缓存
				Local.set('appid', userInfos.appid);
				Session.set('token', res.data.token);
				Session.set('xsrftoken', res.data.xsrftoken||"");
				
				// 存储用户信息到浏览器缓存
				Session.set('userInfo', userInfos);
				Session.set('expiresToken', res.data.expiresAt);
				Session.set('refreshTokenAt', res.data.refreshTokenAt);
				// 1、请注意执行顺序(存储用户信息到vuex)
				store.dispatch('userInfos/setUserInfos', userInfos);
				if (!store.state.themeConfig.themeConfig.isRequestRoutes) {
					// 前端控制路由，2、请注意执行顺序
					await initFrontEndControlRoutes();
				} else {
					// 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
					// 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
					await initBackEndControlRoutes();
					const routers = router.getRoutes()
					console.log("routers1:", routers)
					// 执行完 initBackEndControlRoutes，再执行 signInSuccess
				}

				signInSuccess();
				//需要定时执行的代码
				// const routers = router.getRoutes()
				// console.log("routers2:",routers)
				// if(routers.length > 4){
				// 	signInSuccess();
				// } else {
				// 	//解决特定情况下可能未获取到路由的BUG
				// 	let count=0; //执行次数
				// 	const timer = setInterval(() => {
				// 		//需要定时执行的代码
				// 		const routers = router.getRoutes()
				// 		console.log("routers2:",routers)
				// 		if(routers.length > 4 || count > 10){
				// 			//有路由，进行登录处理
				// 			clearInterval(timer);
				// 			signInSuccess();
				// 		}
				// 		count++;
				// 	},360)
				// }
				
			} 
			finally{
				state.loading.signIn = false;
			}
		};
		// 登录成功后的跳转
		const signInSuccess = () => {
			// 初始化登录成功时间问候语
			let currentTimeInfo = currentTime.value;
			// 登录成功，跳到转首页
			// 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
			// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
			if (route.query?.redirect) {
				router.push({
					path: route.query?.redirect,
					query: Object.keys(route.query?.params).length > 0 ? JSON.parse(route.query?.params) : '',
				});
			} else {
				//window.location.href="/#/"
				router.push('/');
			}
			// 登录成功提示
			setTimeout(() => {
				// 关闭 loading
				state.loading.signIn = true;
				const signInText = t('pages.login.signInText');
				ElMessage.success(`${currentTimeInfo}，${signInText}`);
				// 修复防止退出登录再进入界面时，需要刷新样式才生效的问题，初始化布局样式等(登录的时候触发，目前方案)
				proxy.mittBus.emit('onSignInClick');
			}, 300);
		};
		const onRefreshCaptcha = async () => {
			const res = await proxy.$api.base.user.getCaptcha();
			if(res.errcode==0){
				if(res.data.captchaId && res.data.captchaImg){
					state.ruleForm.captchaId=res.data.captchaId;
					state.captcha=res.data.captchaImg;
				} else {
					state.ruleForm.captchaId='';
					state.captcha='';
				}
				
			}
			
		}
		// 页面加载时
		onMounted(() => {			
			onRefreshCaptcha();
		});
		return {
			currentTime,
			onRefreshCaptcha,
			onSignIn,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
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
	.login-content-password {
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
