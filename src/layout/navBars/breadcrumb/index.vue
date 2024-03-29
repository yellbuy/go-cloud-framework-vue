<template>
	<div class="layout-navbars-breadcrumb-index">
		<Logo v-if="setIsShowLogo" />
		<Breadcrumb />
		<Horizontal :menuList="menuList" v-if="isLayoutTransverse" />
		<User />
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, onUnmounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import Logo from '/@/layout/logo/index.vue';
import Breadcrumb from '/@/layout/navBars/breadcrumb/breadcrumb.vue';
import User from '/@/layout/navBars/breadcrumb/user.vue';
import Horizontal from '/@/layout/navMenu/horizontal.vue';
import { useStore } from '/@/store/index';
export default {
	name: 'layoutBreadcrumbIndex',
	components: { Breadcrumb, User, Logo, Horizontal },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const route = useRoute();
		const state: any = reactive({
			menuList: [],
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 设置 logo 显示/隐藏
		const setIsShowLogo = computed(() => {
			let { isShowLogo, layout } = store.state.themeConfig.themeConfig;
			return (isShowLogo && layout === 'classic') || (isShowLogo && layout === 'transverse');
		});
		// 设置是否显示横向导航菜单
		const isLayoutTransverse = computed(() => {
			let { layout, isClassicSplitMenu } = store.state.themeConfig.themeConfig;
			return layout === 'transverse' || (isClassicSplitMenu && layout === 'classic');
		});
		// 设置/过滤路由（非静态路由/是否显示在菜单中）
		const setFilterRoutes = () => {
			let { layout, isClassicSplitMenu } = store.state.themeConfig.themeConfig;
			//console.log("setFilterRoutes:",layout, isClassicSplitMenu,route.path)
			if (layout === 'classic' && isClassicSplitMenu) {
				state.menuList = delClassicChildren(filterRoutesFun(store.state.routesList.routesList));
				const resData = setSendClassicChildren(route.meta.keyPath);
				proxy.mittBus.emit('setSendClassicChildren', resData);
			} else {
				state.menuList = filterRoutesFun(store.state.routesList.routesList);
			}
		};
		// 设置了分割菜单时，删除底下 children
		const delClassicChildren = (arr: Array<object>) => {
			arr.map((v: any) => {
				if (v.children) delete v.children;
			});
			//console.log("delClassicChildren:",arr)
			return arr;
		};
		// 路由过滤递归函数
		const filterRoutesFun = (arr: Array<object>) => {
			return arr
				.filter((item: any) => !item.meta.isHide)
				.map((item: any) => {
					item = Object.assign({}, item);
					if (item.children) item.children = filterRoutesFun(item.children);
					return item;
				});
		};
		// 传送当前子级数据到菜单中
		const setSendClassicChildren = (keyPath: string) => {
			const currentPathSplit = keyPath.split('//');
			let currentData: any = {};
			//console.log("store.state.routesList.routesList:",path,store.state.routesList.routesList)
			filterRoutesFun(store.state.routesList.routesList).map((v, k) => {
				if (v.meta.keyPath === `${currentPathSplit[0]}`) {
					v['k'] = k;
					currentData['item'] = [{ ...v }];
					currentData['children'] = [{ ...v }];
					if (v.children) currentData['children'] = v.children;
				}
			});
			return currentData;
		};
		// 页面加载时
		onMounted(() => {
			setFilterRoutes();
			proxy.mittBus.on('getBreadcrumbIndexSetFilterRoutes', () => {
				setFilterRoutes();
			});
		});
		// 页面卸载时
		onUnmounted(() => {
			proxy.mittBus.off('getBreadcrumbIndexSetFilterRoutes');
		});
		return {
			getThemeConfig,
			setIsShowLogo,
			isLayoutTransverse,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-index {
	height: 50px;
	display: flex;
	align-items: center;
	padding-right: 15px;
	background: var(--bg-topBar);
	border-bottom: 1px solid #f1f2f3;
}
</style>
