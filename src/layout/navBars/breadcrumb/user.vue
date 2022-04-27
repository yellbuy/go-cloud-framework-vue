<template>
	<div class="layout-navbars-breadcrumb-user" :style="{ flex: layoutUserFlexNum }">
		<el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onComponentSizeChange">
			<div class="layout-navbars-breadcrumb-user-icon">
				<i class="iconfont icon-ziti" :title="$t('message.user.title0')"></i>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="large" :disabled="disabledSize === 'large'">{{ $t('message.user.dropdownLarge') }}</el-dropdown-item>
					<el-dropdown-item command="medium" :disabled="disabledSize === 'medium'">{{ $t('message.user.dropdownDefault') }}</el-dropdown-item>
					<el-dropdown-item command="small" :disabled="disabledSize === 'small'">{{ $t('message.user.dropdownSmall') }}</el-dropdown-item>
					<!-- <el-dropdown-item command="mini" :disabled="disabledSize === 'mini'">{{ $t('message.user.dropdownMini') }}</el-dropdown-item> -->
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onLanguageChange">
			<div class="layout-navbars-breadcrumb-user-icon">
				<i class="iconfont" :class="disabledI18n === 'en' ? 'icon-fuhao-yingwen' : 'icon-fuhao-zhongwen'" :title="$t('message.user.title1')"></i>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="zh-cn" :disabled="disabledI18n === 'zh-cn'">简体中文</el-dropdown-item>
					<el-dropdown-item command="en" :disabled="disabledI18n === 'en'">English</el-dropdown-item>
					<el-dropdown-item command="zh-tw" :disabled="disabledI18n === 'zh-tw'">繁體中文</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<div class="layout-navbars-breadcrumb-user-icon" @click="onSearchClick">
			<el-icon :title="$t('message.user.title2')">
				<elementSearch />
			</el-icon>
		</div>
		<div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
			<i class="icon-skin iconfont" :title="$t('message.user.title3')"></i>
		</div>
		<div class="layout-navbars-breadcrumb-user-icon">
			<el-popover placement="bottom" trigger="click" v-model:visible="isShowUserNewsPopover" :width="300" popper-class="el-popover-pupop-user-news">
				<template #reference>
					<el-badge :is-dot="newsCount" @click="isShowUserNewsPopover = !isShowUserNewsPopover">
						<el-icon :title="$t('message.user.title4')">
							<elementBell />
						</el-icon>
					</el-badge>
				</template>
				<transition name="el-zoom-in-top" @onUpdateNews="onUpdateNewsCount">
					<UserNews v-show="isShowUserNewsPopover" ref="userNewsRef"/>
				</transition>
			</el-popover>
		</div>
		<div class="layout-navbars-breadcrumb-user-icon mr10" @click="onScreenfullClick">
			<i
				class="iconfont"
				:title="isScreenfull ? $t('message.user.title6') : $t('message.user.title5')"
				:class="!isScreenfull ? 'icon-fullscreen' : 'icon-tuichuquanping'"
			></i>
		</div>
		<el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
			<span class="layout-navbars-breadcrumb-user-link">
				<img :src="getUserInfos.avatar" class="layout-navbars-breadcrumb-user-link-photo mr5" />
				{{ getUserInfos.username === '' ? 'test' : getUserInfos.realname || getUserInfos.username }}
				<el-icon class="el-icon--right">
					<elementArrowDown />
				</el-icon>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="/">{{ $t('message.user.dropdown1') }}</el-dropdown-item>
					<!-- <el-dropdown-item command="wareHouse">{{ $t('message.user.dropdown6') }}</el-dropdown-item> -->
					<el-dropdown-item command="/admin/profile">{{ $t('message.user.dropdown2') }}</el-dropdown-item>
					<el-dropdown-item divided command="returnProxyParent" v-if="getUserInfos.isProxy > 0">{{
						$t('pages.base.action.proxyParent')
					}}</el-dropdown-item>
					<el-dropdown-item command="returnProxyTop" v-if="getUserInfos.isProxy > 0">{{ $t('pages.base.action.proxyTop') }}</el-dropdown-item>
					<!-- <el-dropdown-item command="/404">{{ $t('message.user.dropdown3') }}</el-dropdown-item>
					<el-dropdown-item command="/401">{{ $t('message.user.dropdown4') }}</el-dropdown-item> -->
					<el-dropdown-item divided command="logOut">{{ $t('message.user.dropdown5') }}</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<Search ref="searchRef" />
	</div>
</template>

<script lang="ts">
import { ref, getCurrentInstance, computed, reactive, toRefs, onMounted,nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import screenfull from 'screenfull';
import { useI18n } from 'vue-i18n';
import { resetRoute } from '/@/router/index';
import { useStore } from '/@/store/index';
import other from '/@/utils/other';
import { Session, Local } from '/@/utils/storage';
import UserNews from '/@/layout/navBars/breadcrumb/userNews.vue';
import Search from '/@/layout/navBars/breadcrumb/search.vue';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { initBackEndControlRoutes } from '/@/router/backEnd';

export default {
	name: 'layoutBreadcrumbUser',
	components: { UserNews, Search },
	setup() {
		const { t } = useI18n();
		const { proxy } = getCurrentInstance() as any;
		const router = useRouter();
		const store = useStore();
		const searchRef = ref();
		const userNewsRef = ref();
		const state = reactive({
			newsCount:0,
			isScreenfull: false,
			isShowUserNewsPopover: false,
			disabledI18n: 'zh-cn',
			disabledSize: 'small',
		});

		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return store.state.userInfos.userInfos;
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 设置分割样式
		const layoutUserFlexNum = computed(() => {
			let { layout, isClassicSplitMenu } = getThemeConfig.value;
			let num = '';
			if (layout === 'defaults' || (layout === 'classic' && !isClassicSplitMenu) || layout === 'columns') num = 1;
			else num = null;
			return num;
		});
		// 全屏点击时
		const onScreenfullClick = () => {
			if (!screenfull.isEnabled) {
				ElMessage.warning('暂不不支持全屏');
				return false;
			}
			screenfull.toggle();
			screenfull.on('change', () => {
				if (screenfull.isFullscreen) state.isScreenfull = true;
				else state.isScreenfull = false;
			});
		};
		//更新新闻数
		const onUpdateNewsCount = (newsList:[])=>{
			state.newsCount=newsList.filter((val:any)=>!val.IsClick).length;;
		};
		// 布局配置 icon 点击时
		const onLayoutSetingClick = () => {
			proxy.mittBus.emit('openSetingsDrawer');
		};
		// 下拉菜单点击时
		const onHandleCommandClick = async (path: string) => {
			if (path == 'returnProxyParent' || path == 'returnProxyTop') {
				const isTop = path == 'returnProxyTop';
				const res=await proxy.$api.base.proxy.return(isTop);
				if (res.errcode == 0) {
					ElMessage.success({
						showClose: true,
						duration: 2400,
						message: t('pages.base.action.proxySuccess'),
						onClose: async function () {
							try {
								let defaultRoles: Array<string> = [];
								let defaultAuthBtnList: Array<string> = [];
								Session.clear();
								const avatar = import.meta.env.VITE_API_URL + '/v1/avatar/user/' + res.data.user.Id + '.jpg';
								//console.debug(avatar)
								// 用户信息模拟数据
								const userInfos = {
									uid: res.data.user.Id,
									appid:res.data.user.Appid,
									tid:res.data.user.Tid,
									username: res.data.user.Username,
									realname: res.data.user.Name || res.data.user.NickName || res.data.user.Username,
									mobile:res.data.user.Mobile,
									avatar: avatar,
									time: new Date().getTime(),
									isAdmin:res.data.user.IsAdmin,
									roles: ['api'],
									authBtnList: defaultAuthBtnList,
									isProxy: res.data.user.IsProxy,
									app:res.data.user.App||{},
									tenant:res.data.user.Tenant||{},
								};
								// 存储 token 到浏览器缓存
								Session.set('token', res.data.token);
								// 存储用户信息到浏览器缓存
								Session.set('userInfo', userInfos);
								Session.set('expiresToken', res.data.expiresAt);
								Session.set('refreshTokenAt', res.data.refreshTokenAt);
								// 1、请注意执行顺序(存储用户信息到vuex)
								store.dispatch('userInfos/setUserInfos', userInfos);
								resetRoute(); // 删除/重置路由
								window.location.href = '/';
							} catch (err) {
								console.error(err);
							}
						},
					});
				}
			} else if (path === 'logOut') {
				ElMessageBox({
					closeOnClickModal: false,
					closeOnPressEscape: false,
					title: t('message.user.logOutTitle'),
					message: t('message.user.logOutMessage'),
					showCancelButton: true,
					confirmButtonText: t('message.user.logOutConfirm'),
					cancelButtonText: t('message.user.logOutCancel'),
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = t('message.user.logOutExit');
							setTimeout(() => {
								done();
								setTimeout(() => {
									instance.confirmButtonLoading = false;
								}, 300);
							}, 700);
						} else {
							done();
						}
					},
				})
					.then(() => {
						Session.clear(); // 清除缓存/token等
						resetRoute(); // 删除/重置路由
						router.push('/login');
						setTimeout(() => {
							ElMessage.success(t('message.user.logOutSuccess'));
						}, 360);
					})
					.catch(() => {});
			} else if (path === 'wareHouse') {
				window.open('https://www.ybxxjs.com');
			} else {
				console.log('跳转的页面', path);
				router.push(path);
			}
		};
		// 菜单搜索点击
		const onSearchClick = () => {
			searchRef.value.openSearch();
		};
		// 组件大小改变
		const onComponentSizeChange = (size: string) => {
			Local.remove('themeConfig');
			//console.log("size:",size)
			getThemeConfig.value.globalComponentSize = size;
			Local.set('themeConfig', getThemeConfig.value);
			//proxy.$ELEMENT.size = size;
			initComponentSize();
			//window.location.reload();
		};
		// 语言切换
		const onLanguageChange = (lang: string) => {
			Local.remove('themeConfig');
			getThemeConfig.value.globalI18n = lang;
			Local.set('themeConfig', getThemeConfig.value);
			proxy.$i18n.locale = lang;
			initI18n();
			other.useTitle();
		};
		// 设置 element plus 组件的国际化
		const setI18nConfig = (locale: string) => {
			proxy.mittBus.emit('getI18nConfig', proxy.$i18n.messages[locale]);
		};
		// 初始化言语国际化
		const initI18n = () => {
			switch (Local.get('themeConfig').globalI18n) {
				case 'zh-cn':
					state.disabledI18n = 'zh-cn';
					setI18nConfig('zh-cn');
					break;
				case 'en':
					state.disabledI18n = 'en';
					setI18nConfig('en');
					break;
				case 'zh-tw':
					state.disabledI18n = 'zh-tw';
					setI18nConfig('zh-tw');
					break;
			}
		};
		// 初始化全局组件大小
		const initComponentSize = () => {
			//console.log("Local.get('themeConfig').globalComponentSize:",Local.get('themeConfig').globalComponentSize)
			switch (Local.get('themeConfig').globalComponentSize) {
				case '':
					state.disabledSize = '';
					break;
				case 'large':
					state.disabledSize = 'large';
					break;
				case 'default':
					state.disabledSize = 'default';
					break;
				case 'medium':
					state.disabledSize = 'medium';
					break;
				case 'small':
					state.disabledSize = 'small';
					break;
				case 'mini':
					state.disabledSize = 'mini';
					break;
			}
		};
		// 页面加载时
		onMounted(() => {
			if (Local.get('themeConfig')) {
				initI18n();
				initComponentSize();
			}
		});

		return {
			getUserInfos,
			onUpdateNewsCount,
			onLayoutSetingClick,
			onHandleCommandClick,
			onScreenfullClick,
			onSearchClick,
			onComponentSizeChange,
			onLanguageChange,
			searchRef,
			userNewsRef,
			layoutUserFlexNum,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	&-link {
		height: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;
		&-photo {
			width: 25px;
			height: 25px;
			border-radius: 100%;
		}
	}
	&-icon {
		padding: 0 10px;
		cursor: pointer;
		color: var(--bg-topBarColor);
		height: 50px;
		line-height: 50px;
		display: flex;
		align-items: center;
		&:hover {
			background: rgba(0, 0, 0, 0.04);
			i {
				display: inline-block;
				animation: logoAnimation 0.3s ease-in-out;
			}
		}
	}
	::v-deep(.el-dropdown) {
		color: var(--bg-topBarColor);
	}
	::v-deep(.el-badge) {
		height: 40px;
		line-height: 40px;
		display: flex;
		align-items: center;
	}
	::v-deep(.el-badge__content.is-fixed) {
		top: 12px;
	}
}
</style>
