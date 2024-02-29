<template>
	<el-main class="layout-main">
		<el-scrollbar
			class="layout-scrollbar"
			ref="layoutScrollbarRef"
			:style="{
				minHeight: `calc(100vh - ${headerHeight})`,
				padding: currentRouteMeta.isLink && currentRouteMeta.isIframe ? 0 : '',
				transition: 'padding 0.3s ease-in-out',
			}"
		>
			<LayoutParentView />
			<Footer v-if="getThemeConfig.isFooter" />
		</el-scrollbar>
	</el-main>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onBeforeMount, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '/@/layout/footer/index.vue';
import LayoutParentView from '/@/layout/routerView/parent.vue';
import { useStore } from '/@/store/index';
import { NextLoading } from '/@/utils/loading';
export default defineComponent({
	name: 'layoutMain',
	components: { LayoutParentView, Footer },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const layoutMainScrollbarRef = ref();
		const route = useRoute();
		const store = useStore();
		const state = reactive({
			headerHeight: '',
			layoutMainScrollbarRef,
			currentRouteMeta: {},
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 设置 main 的高度
		const initHeaderHeight = () => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			if (isTagsview) return (state.headerHeight = `84px`);
			else return (state.headerHeight = `50px`);
		};
		// 初始化获取当前路由 meta，用于设置 iframes padding
		const initGetMeta = () => {
			state.currentRouteMeta = route.meta;
		};
		// 页面加载前
		onBeforeMount(() => {
			initHeaderHeight();
			initGetMeta();
		});
		// 页面加载前
		onMounted(() => {
			NextLoading.done(600);
		});

		// 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
		watch(store.state.themeConfig.themeConfig, (val) => {
			state.headerHeight = val.isTagsview ? '84px' : '50px';
			if (val.isFixedHeaderChange !== val.isFixedHeader) {
				if (!proxy.$refs.layoutScrollbarRef) return false;
				proxy.$refs.layoutScrollbarRef.update();
			}
		});
		// 监听路由变化
		watch(
			() => route.fullPath,
			() => {
				state.currentRouteMeta = route.meta;
			}
		);
		return {
			getThemeConfig,
			...toRefs(state),
		};
	},
});
</script>
