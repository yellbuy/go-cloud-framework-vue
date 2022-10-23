<template>
	<div class="el-menu-horizontal-warp">
		<el-scrollbar @wheel.native.prevent="onElMenuHorizontalScroll" ref="elMenuHorizontalScrollRef">
			<el-menu router :default-active="defaultActive" background-color="transparent" ref="elMenuHorizontalRef" mode="horizontal" >
				<template v-for="val in menuLists">
					<template v-if="!val.meta.isHide">
						<el-sub-menu :index="val.meta.isDynamicPath || val.path" v-if="val.children && val.children.length" :key="val.key">
							<template #title>
								<SvgIcon :name="val.meta.icon" :color="val.meta.color"/>
								<span>{{ $t(val.meta.title) }}</span>
							</template>
							<SubItem :chil="val.children" />
						</el-sub-menu>
						<el-menu-item :index="val.meta.isDynamicPath || val.path" :key="val.path"  v-else>
							<template #title v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
								<SvgIcon :name="val.meta.icon" :color="val.meta.color"/>
								{{ $t(val.meta.title) }}
							</template>
							<template #title v-else>
								<a :href="val.meta.isLink" target="_blank" rel="opener">
									<SvgIcon :name="val.meta.icon" :color="val.meta.color"/>
									{{ $t(val.meta.title) }}
								</a>
							</template>
						</el-menu-item>
					</template>
				</template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, onBeforeMount, onMounted, reactive, toRefs } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import SubItem from '/@/layout/navMenu/subItem.vue';
import { useStore } from '/@/store/index';
export default defineComponent({
	name: 'navMenuHorizontal',
	components: { SubItem },
	props: {
		menuList: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const store = useStore();
		const state = reactive({
			defaultActive: null,
		});
		
		// 获取父级菜单数据
		const menuLists = computed(() => {
			console.log("props.menuList：",props.menuList)
			return props.menuList;
		});
		// 设置横向滚动条可以鼠标滚轮滚动
		const onElMenuHorizontalScroll = (e: any) => {
			const eventDelta = e.wheelDelta || -e.deltaY * 40;
			const scrollLeft=proxy.$refs.elMenuHorizontalScrollRef.$refs.wrap$.scrollLeft + eventDelta / 4;
			proxy.$refs.elMenuHorizontalScrollRef.$refs.wrap$.scrollLeft = scrollLeft;
		};
		// 初始化数据，页面刷新时，滚动条滚动到对应位置
		const initElMenuOffsetLeft = () => {
			nextTick(() => {
				let els: any = document.querySelector('.el-menu.el-menu--horizontal li.is-active');
				if (!els) return false;
				proxy.$refs.elMenuHorizontalScrollRef.$refs.wrap$.scrollLeft = els.offsetLeft;
			});
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
			//console.log("store.state.routesList.routesList:",path,store.state.routesList.routesList)
			const currentPathSplit = keyPath.split('//');
			let currentData: any = {};
			filterRoutesFun(store.state.routesList.routesList).map((v, k) => {
				if (v.meta.key === `${currentPathSplit[0]}`) {
					v['k'] = k;
					currentData['item'] = [{ ...v }];
					currentData['children'] = [{ ...v }];
					if (v.children) currentData['children'] = v.children;
				}
			});
			return currentData;
		};
		// 设置页面当前路由高亮
		const setCurrentRouterHighlight = (currentRoute) => {
			const { path, meta } = currentRoute;
			const key=meta.keyPath.split("//")[0];
			const rootRoute=store.state.routesList.routesList.find(c=>c.meta.key == key);
			if(rootRoute){
				state.defaultActive=rootRoute.meta.isDynamicPath || rootRoute.path;
			} else {
				state.defaultActive=meta.isDynamicPath || currentRoute.path;
			}
			// debugger
			// if (store.state.themeConfig.themeConfig.layout === 'classic') {
			// 	state.defaultActive = `/${path.split('/')[1]}`;
			// } else {
			// 	const pathSplit = meta.isDynamic ? meta.isDynamicPath.split('/') : path.split('/');
			// 	if (pathSplit.length >= 4 && meta.isHide) state.defaultActive = pathSplit.splice(0, 3).join('/');
			// 	else state.defaultActive = path;
			// }
		};
		// 页面加载前
		onBeforeMount(() => {
			setCurrentRouterHighlight(route);
		});
		// 页面加载时
		onMounted(() => {
			initElMenuOffsetLeft();
			//修正element menu菜单显示更多的BUG
			proxy.$refs.elMenuHorizontalRef.handleResize()
		});
		// 路由更新时
		onBeforeRouteUpdate((to) => {
			// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
			setCurrentRouterHighlight(to);
			proxy.mittBus.emit('onMenuClick');
			// 修复经典布局开启切割菜单时，点击tagsView后左侧导航菜单数据不变的问题
			let { layout, isClassicSplitMenu } = store.state.themeConfig.themeConfig;
			if (layout === 'classic' && isClassicSplitMenu) {
				proxy.mittBus.emit('setSendClassicChildren', setSendClassicChildren(to.meta.keyPath));
			}
		});
		return {
			menuLists,
			onElMenuHorizontalScroll,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.el-menu-horizontal-warp {
	flex: 1;
	overflow: hidden;
	margin-right: 30px;
	::v-deep(.el-scrollbar__bar.is-vertical) {
		display: none;
	}
	::v-deep(a) {
		width: 100%;
	}
	.el-menu.el-menu--horizontal {
		display: flex;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}
}
</style>
