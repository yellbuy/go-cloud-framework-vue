<template>
	<div class="login-container">
		<div class="login-logo">
			<img :src="app.LogoUrl" v-if="app.Id && app.LogoUrl" width="100" height="100" />
			<span v-else-if="!app.FullName" class="ml10">{{ app.Name || getThemeConfig.globalViceTitle }}</span>
			<span v-if="app.FullName" class="ml10">{{ app.FullName }}</span>
		</div>
		<div>
		</div>
		<div class="login-content">
			<div class="login-content-main">
				<h4 class="login-content-title" v-if="app.Id > 0">{{ app.Name || getThemeConfig.globalTitle }}</h4>
				<div v-if="!isScan">
					<el-tabs v-model="tabsActiveName">
						<el-tab-pane :label="$t('pages.login.label.one1')" name="account">
							<Account />
							<Register :app="app" />
							<!-- <el-row class="mt5" v-if="app.PermissionKey=='bpp'">
								<el-col :span="12" class="text-center font10">
									<el-link type="primary" :href="'/register/tenant?appid='+app.Id+'&appPermissionKindKey='+app.PermissionKey">{{ $t('pages.bpp.router.registerTenant') }}</el-link>
								</el-col>
								<el-col :span="12" class="text-center font10">
									<el-link type="primary" :href="'/register/user?appid='+app.Id+'&appPermissionKindKey='+app.PermissionKey">{{ $t('pages.bpp.router.registerUser') }}</el-link>
								</el-col>
							</el-row> -->
						</el-tab-pane>
						<!-- <el-tab-pane :label="$t('pages.login.label.two2')" name="mobile">
							<Mobile />
						</el-tab-pane> -->
					</el-tabs>
				</div>
				<!-- <Scan v-if="isScan" />
				<div class="login-content-main-sacn" @click="isScan = !isScan">
					<i class="iconfont" :class="isScan ? 'icon-diannao1' : 'icon-barcode-qr'"></i>
					<div class="login-content-main-sacn-delta"></div>
				</div> -->
			</div>
		</div>

		<div class="login-copyright" v-if="app.Copyright">
			<a href="https://beian.miit.gov.cn/" target="_blank" class="mb5 login-copyright-company" v-html="app.Copyright"></a>
		</div>
		<div class="login-copyright" v-else>
			<!-- <div class="mb5 login-copyright-company" >{{ $t('pages.login.copyright.one5') }}</div>
			<div class="login-copyright-msg">{{ $t('pages.login.copyright.two6') }}</div> -->
		</div>
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import { appid } from '/@/utils/request';
import Account from '/@/views/login/component/account.vue';
import Mobile from '/@/views/login/component/mobile.vue';
import Register from '/@/views/login/component/register.vue';
import Scan from '/@/views/login/component/scan.vue';
export default {
	name: 'loginIndex',
	components: { Account, Mobile, Scan, Register },
	setup() {
		const route = useRoute();
		const store = useStore();
		const { t } = useI18n();
		const { proxy } = getCurrentInstance() as any;

		const state = reactive({
			tabsActiveName: 'account',
			isTabPaneShow: true,
			isScan: false,
			app: {},
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 页面加载时
		onMounted(async () => {
			const res = await proxy.$api.base.app.getCacheById(appid);
			if (res.errcode == 0) {
				state.app = res.data || {};
				state.app.LogoUrl = import.meta.env.VITE_API_URL + '/v1/avatar/app/' + state.app.Id + '.png';
			}
		});
		return {
			getThemeConfig,
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
		width: 500px;
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
		font-size: 18px;
		opacity: 0.8;
		.login-copyright-company {
			font-size: 18px;
			white-space: nowrap;
		}
		.login-copyright-msg {
			@extend .login-copyright-company;
		}
	}
}
</style>
