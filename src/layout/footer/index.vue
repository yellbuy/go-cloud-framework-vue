<template>
	<div class="layout-footer mt10" v-show="isDelayFooter">
		<div class="layout-footer-warp">
			<!-- <div>{{globalTitle}} ❤️</div> -->
			<div>{{globalFooter}}</div>
			<div class="mt5" v-html="globalCopyright"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteUpdate } from 'vue-router';
import { useStore } from '/@/store/index';
export default {
	name: 'layoutFooter',
	setup() {
		const state = reactive({
			isDelayFooter: true,
		});
		const { t } = useI18n();
		const store = useStore();
		// 获取用户信息 vuex
		const globalFooter = computed(() => {
			return store.state.userInfos.userInfos.tenant.FullName 
			|| store.state.userInfos.userInfos.tenant.Name 
			|| store.state.userInfos.userInfos.app.FullName 
			|| store.state.userInfos.userInfos.app.Name 
			|| store.state.themeConfig.themeConfig.globalTitle;
		});
		const globalCopyright = computed(() => {
			return store.state.userInfos.userInfos.app.Copyright || t('pages.login.copyright.one5');
		});
		// 路由改变时，等主界面动画加载完毕再显示 footer
		onBeforeRouteUpdate(() => {
			state.isDelayFooter = false;
			setTimeout(() => {
				state.isDelayFooter = true;
			}, 800);
		});
		return {
			globalFooter,
			globalCopyright,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.layout-footer {
	width: 100%;
	display: flex;
	&-warp {
		margin: auto;
		color: var(--el-text-color-secondary);
		text-align: center;
		animation: logoAnimation 0.3s ease-in-out;
	}
}
</style>
