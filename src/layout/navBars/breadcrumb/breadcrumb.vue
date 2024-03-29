<template>
	<div class="layout-navbars">
		<SvgIcon
			class="layout-navbars-breadcrumb-icon"
			:name="getThemeConfig.isCollapse ? 'ele-Expand' : 'ele-Fold'"
			@click="onThemeConfigChange"
		/>
		<div v-if="isShowBreadcrumb" class="layout-navbars-breadcrumb">
			<el-breadcrumb  class="layout-navbars-breadcrumb-hide">
				<transition-group name="breadcrumb" mode="out-in">
					<el-breadcrumb-item v-for="(v, k) in breadcrumbList" :key="v.meta.title">
						<span v-if="k === breadcrumbList.length - 1" class="layout-navbars-breadcrumb-span">
							<SvgIcon :name="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon" />{{ $t(v.meta.title) }}
						</span>
						<a v-else @click.prevent="onBreadcrumbClick(v)">
							<SvgIcon :name="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon" />{{ $t(v.meta.title) }}
						</a>
					</el-breadcrumb-item>
				</transition-group>
			</el-breadcrumb>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
export default {
	name: 'layoutBreadcrumb',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state: any = reactive({
			breadcrumbList: [],
			routeSplit: [],
			routeSplitFirst: '',
			routeSplitIndex: 1,
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 动态设置经典、横向布局不显示
		const isShowBreadcrumb = computed(() => {
			initRouteSplit(route.meta.keyPath);
			const { layout, isBreadcrumb } = store.state.themeConfig.themeConfig;
			if (layout === 'classic' || layout === 'transverse') {
				return false;
			}
			return isBreadcrumb ? true : false;	
		});
		// 面包屑点击时
		const onBreadcrumbClick = (v: any) => {
			const { redirect, path } = v;
			if (redirect) router.push(redirect);
			else router.push(path);
		};
		// 展开/收起左侧菜单点击
		const onThemeConfigChange = () => {
			proxy.mittBus.emit('onMenuClick');
			store.state.themeConfig.themeConfig.isCollapse = !store.state.themeConfig.themeConfig.isCollapse;
		};
		// 处理面包屑数据
		const getBreadcrumbList = (arr: Array<object>) => {
			arr.map((item: any) => {
				//console.log("state.routeSplit：",state.routeSplit)
				state.routeSplit.map((v: any, k: number, arrs: any) => {
					
					if (state.routeSplitFirst === item.meta.keyPath) {
						state.routeSplitFirst += `//${arrs[state.routeSplitIndex]}`;
						state.breadcrumbList.push(item);
						state.routeSplitIndex++;
						if (item.children) getBreadcrumbList(item.children);
						
					}
				});
			});
			
		};
		// 当前路由字符串切割成数组，并删除第一项空内容
		const initRouteSplit = (keyPath: string) => {
			if (!store.state.themeConfig.themeConfig.isBreadcrumb) return false;
			state.breadcrumbList = [store.state.routesList.routesList[0]];
			state.routeSplit = keyPath.split('//');
			//state.routeSplit.shift();
			state.routeSplitFirst = `${state.routeSplit[0]}`;
			state.routeSplitIndex = 1;
			getBreadcrumbList(store.state.routesList.routesList);
			//移除第1个重复项
			state.breadcrumbList.shift()
		};
		// 页面加载时
		onMounted(() => {
			initRouteSplit(route.meta.keyPath);
		});
		// 路由更新时
		onBeforeRouteUpdate((to) => {
			initRouteSplit(to.meta.keyPath);
		});
		return {
			onThemeConfigChange,
			isShowBreadcrumb,
			getThemeConfig,
			onBreadcrumbClick,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.layout-navbars{
	.layout-navbars-breadcrumb-icon {
		cursor: pointer;
		font-size: 18px;
		color: var(--bg-topBarColor);
		height: 100%;
		width: 40px;
		opacity: 0.8;
		&:hover {
			opacity: 1;
		}
	}

	.layout-navbars-breadcrumb {
		flex: 1;
		height: inherit;
		display: flex;
		align-items: center;
		
		.layout-navbars-breadcrumb-span {
			display: flex;
			opacity: 0.7;
			color: var(--next-bg-topBarColor);
		}
		.layout-navbars-breadcrumb-iconfont {
			font-size: 14px;
			margin-right: 5px;
		}
		:deep(.el-breadcrumb__separator) {
			opacity: 0.7;
			color: var(--next-bg-topBarColor);
		}
		:deep(.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link) {
			font-weight: unset !important;
			color: var(--next-bg-topBarColor);
			&:hover {
				color: var(--el-color-primary) !important;
			}
		}
	}
}
</style>
