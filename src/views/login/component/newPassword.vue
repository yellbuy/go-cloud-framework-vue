<template>
	<el-alert title="出于安全的原因，您需要修改密码后才允许登录使用" type="warning" />
	<el-form class="login-content-form" size="large" @keyup.enter="onSubmit" label-width="auto" label-suffix=":">
		<el-form-item class="login-animation-one" label="用户名" label-position="right">
			<el-input type="text" :placeholder="$t('pages.login.changePassword.title')" disabled v-model="ruleForm.Username" 
			clearable autocomplete="new-Password">
				<template #prefix>
					<el-icon class="el-input__icon"><User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation-two" label="当前密码" label-position="right">
			<el-input
				:type="isShowPassword ? 'text' : 'password'"
				:placeholder="$t('pages.login.changePassword.oldPassword')"
				v-model="ruleForm.Password"
				autocomplete="new-Password"
			>
				<template #prefix>
					<el-icon class="el-input__icon"><Unlock /></el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="isShowPassword = !isShowPassword"
					>
					</i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation-two"  label="新密码" label-position="right">
			<el-input
				:type="isShowPassword ? 'text' : 'password'"
				:placeholder="$t('pages.login.changePassword.newPassword')"
				v-model="ruleForm.PasswordNew"
				autocomplete="new-Password"
			>
				<template #prefix>
					<el-icon class="el-input__icon"><Unlock /></el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="isShowPassword = !isShowPassword"
					>
					</i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation-two"  label="确认密码" label-position="right">
			<el-input
				:type="isShowPassword ? 'text' : 'password'"
				:placeholder="$t('pages.login.changePassword.confirmPassword')"
				v-model="ruleForm.PasswordConfirm"
				autocomplete="new-Password"
			>
				<template #prefix>
					<el-icon class="el-input__icon"><Unlock /></el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="isShowPassword = !isShowPassword"
					>
					</i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation-three"  label="验证码" label-position="right">
			<el-row :gutter="15">
				<el-col :span="16">
					<el-input
						type="text"
						maxlength="6"
						:placeholder="$t('pages.login.account.accountPlaceholder3')"
						v-model="ruleForm.CaptchaCode"
						clearable
						autocomplete="new-Password"
					>
						<template #prefix>
							<el-icon class="el-input__icon"><Position /></el-icon>
						</template>
					</el-input>
				</el-col>
				<el-col :span="8">
					<div class="login-content-code" @click="onRefreshCaptcha">
						<img class="login-content-code-img" :src="captchaImg"/>
					</div>
				</el-col>
			</el-row>
		</el-form-item>
		<!-- <el-form-item class="login-animation-four pb10">
			<el-button type="primary" class="login-content-submit" round @click="onSubmit" :loading="loading.signIn">
				<span>{{ $t('pages.login.changePassword.title') }}</span>
			</el-button>
		</el-form-item> -->
		<div class="login-animation-four pb10">
			<el-button type="primary" class="login-content-submit" round @click="onSubmit" :loading="loading.signIn">
				<span>{{ $t('message.action.submit') }}</span>
			</el-button>
		</div>
		<el-row class="mt5">
			<el-col :span="24" class="text-right font10">
				<el-link type="primary" :href="`/#/login?appid=${appid}`">{{ $t('pages.login.account.returnLoginBtnText') }}</el-link>
			</el-col>
		</el-row>
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
import { useStore } from '/@/store/index';
import { formatAxis } from '/@/utils/formatTime';


export default defineComponent({
	name: 'changePassword',
	props: {
		appid:{ type: String, default: '0' },
		userId: { type: String, default: '' },
		username: { type: String, default: '' },
	},
	setup(props) {
		const { t } = useI18n();
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		
		const state = reactive({
			isShowPassword: false,
			captchaImg:"", //验证码
			appid:props.appid||"0",
			ruleForm: {
				Id:props.userId||"0",
				Username: props.username||"",
				Password: '',
				PasswordNew: '', //验证码ID
				PasswordConfirm: '',
				CaptchaId: '', //验证码ID
				CaptchaCode:'',
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
		const onSubmit = async () => {
			if(!state.ruleForm.Id && state.ruleForm.Id=='0'||!state.ruleForm.Username){
				ElMessage.warning({
					showClose: true,
					duration: 2400,
					message: `非法操作`
				});
				return;
			}
			if(!state.ruleForm.Password){
				ElMessage.warning({
					showClose: true,
					duration: 2400,
					message: `请输入当前密码`
				});
				return;
			}
			if(!state.ruleForm.PasswordNew){
				ElMessage.warning({
					showClose: true,
					duration: 2400,
					message: `请输入新密码`
				});
				return;
			}
			if(!state.ruleForm.PasswordConfirm){
				ElMessage.warning({
					showClose: true,
					duration: 2400,
					message: `请输入确认密码`
				});
				return;
			}
			if(state.ruleForm.PasswordConfirm!=state.ruleForm.PasswordNew){
				ElMessage.warning({
					showClose: true,
					duration: 2400,
					message: `新密码和确认密码不一致`
				});
				return;
			}
			if(state.loading.signIn){
				return;
			}
			// 模拟数据
			state.loading.signIn = true;
			
			try {
				const res = await proxy.$api.base.user.changePassword(state.ruleForm);
				state.loading.signIn = false;
				if (res.errcode != 0) {
					state.ruleForm.CaptchaCode="";
					onRefreshCaptcha();
					if(res.errcode!=100014){
						state.ruleForm.Password="";
					}
					return;
				}
				ElMessage.success({
					showClose: true,
					duration: 2400,
					message: `密码修改成功，请重新登录！`,
					onClose: async function () {
						window.location.href = `/#login?appid=${res.data}`; // 去登录页面
					},
				});
			} 
			finally{
				state.loading.signIn = false;
			}
		};
		
		const onRefreshCaptcha = async () => {
			const res = await proxy.$api.base.user.getCaptcha();
			if(res.errcode==0){
				if(res.data.captchaId && res.data.captchaImg){
					state.ruleForm.CaptchaId=res.data.captchaId;
					state.captchaImg=res.data.captchaImg;
					console.log("captchaImg:")
				} else {
					state.ruleForm.CaptchaId='';
					state.captchaImg='';
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
			onSubmit,
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
