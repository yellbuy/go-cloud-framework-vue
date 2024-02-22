<template>
	<el-menu
		router
		:default-active="defaultActive"
		background-color="transparent"
		:collapse="isCollapse"
		:default-openeds="openLists"
		:unique-opened="getThemeConfig.isUniqueOpened"
		:collapse-transition="false"
	>
		<template v-for="val in menuLists">
			<template v-if="!val.meta.isHide">
				<el-sub-menu :index="val.meta.isDynamicPath || val.path" v-if="val.children && val.children.length > 0" :key="val.key">
					<template #title>
						<SvgIcon :name="val.meta.icon" :color="val.meta.color"/>
						<span>{{ $t(val.meta.title) }}</span>
					</template>
					<SubItem :chil="val.children" />
				</el-sub-menu>
				<el-menu-item :index="val.meta.isDynamicPath || val.path" :key="val.key"  v-else>
					<SvgIcon :name="val.meta.icon" :color="val.meta.color"/>
					<template #title v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
						<span>{{ $t(val.meta.title) }}</span>
					</template>
					<template #title v-else>
						<a :href="val.meta.isLink" @click.prevent="onALinkClick(val)" rel="opener">
							{{ $t(val.meta.title) }}
						</a>
						<!-- <a :href="val.meta.isLink" target="_blank" rel="opener">{{ $t(val.meta.title) }}</a> -->
					</template>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import SubItem from '/@/layout/navMenu/subItem.vue';
import { useStore } from '/@/store/index';
import other from '/@/utils/other';
export default defineComponent({
	name: 'navMenuVertical',
	components: { SubItem },
	props: {
		menuList: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const route = useRoute();
		const state = reactive({
			// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
			defaultActive: route.meta.keyPath,
			isCollapse: false,
		});
		// 获取父级菜单数据
		const menuLists = computed(() => {
			return props.menuList;
		});
		// 获取展开的菜单列表
		const openLists = computed(() => {
			const keys=getOpenListKeys(props.menuList,[])
			console.log("keys:",keys)
			return keys
		});
		const getOpenListKeys=(menuList:any[],keys:string[])=>{
			menuList.forEach((val:any)=>{
				if(val.meta.isSpread){
					keys.push(val.meta.isDynamicPath || val.path)
				}
				if(val.children && val.children.length>0){
					keys=getOpenListKeys(val.children,keys)
				}
			});
			return keys;
		}
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 菜单高亮（详情时，父级高亮）
		const setParentHighlight = (currentRoute) => {
			const { path, meta } = currentRoute;
			return meta.isDynamicPath || currentRoute.path
		};
		// 页面加载时
		onMounted(() => {
			state.defaultActive = setParentHighlight(route);
		});
		// 路由更新时
		onBeforeRouteUpdate((to) => {
			// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
			state.defaultActive = setParentHighlight(to);
			proxy.mittBus.emit('onMenuClick');
			const clientWidth = document.body.clientWidth;
			if (clientWidth < 1000) getThemeConfig.value.isCollapse = false;
		});
		// 打开外部链接
		const onALinkClick = (val: any) => {
			other.handleOpenLink(val);
			return false;
		};
		return {
			onALinkClick,
			menuLists,
			openLists,
			getThemeConfig,
			...toRefs(state),
		};
	},
});
</script>
