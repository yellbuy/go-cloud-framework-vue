<template>
	<div class="layout-logo" v-if="setShowLogo" @click="onThemeConfigChange">
		<img :src="logoUrl" class="layout-logo-medium-img" />
		<span>{{ globalTitle }}</span>
	</div>
	<div class="layout-logo-size" v-else @click="onThemeConfigChange">
		<img :src="logoUrl" class="layout-logo-size-img" />
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance } from 'vue';
import { useStore } from '/@/store/index';
export default {
	name: 'layoutLogo',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return store.state.themeConfig.themeConfig;
		});
		// 获取用户信息 vuex
		const logoUrl = computed(() => {
			let imgUrl='/public/logo.ico';
			if(store.state.userInfos.userInfos.tenant.Logo){
				imgUrl=import.meta.env.VITE_URL+store.state.userInfos.userInfos.tenant.Logo;
			} else if(store.state.userInfos.userInfos.app.Logo){
				imgUrl=import.meta.env.VITE_URL+store.state.userInfos.userInfos.app.Logo;
			}
			
			//console.log('store.state.userInfos.userInfos:', store.state.userInfos.userInfos);
			return imgUrl
		});
		// 获取用户信息 vuex
		const globalTitle = computed(() => {
			return store.state.userInfos.userInfos.tenant.Name || store.state.userInfos.userInfos.app.Name || store.state.themeConfig.themeConfig.globalTitle;
		});
		// 设置 logo 的显示。classic 经典布局默认显示 logo
		const setShowLogo = computed(() => {
			let { isCollapse, layout } = store.state.themeConfig.themeConfig;
			return !isCollapse || layout === 'classic' || document.body.clientWidth < 1000;
		});
		// logo 点击实现菜单展开/收起
		const onThemeConfigChange = () => {
			if (store.state.themeConfig.themeConfig.layout === 'transverse') return false;
			proxy.mittBus.emit('onMenuClick');
			store.state.themeConfig.themeConfig.isCollapse = !store.state.themeConfig.themeConfig.isCollapse;
		};
		return {
			logoUrl,
			globalTitle,
			setShowLogo,
			getThemeConfig,
			onThemeConfigChange,
		};
	},
};
</script>

<style scoped lang="scss">
.layout-logo {
	width: 220px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
	color: var(--color-primary);
	font-size: 16px;
	cursor: pointer;
	animation: logoAnimation 0.3s ease-in-out;
	&:hover {
		span {
			color: var(--color-primary-light-2);
		}
	}
	&-medium-img {
		width: 20px;
		margin-right: 5px;
	}
}
.layout-logo-size {
	width: 100%;
	height: 50px;
	display: flex;
	cursor: pointer;
	animation: logoAnimation 0.3s ease-in-out;
	&-img {
		width: 20px;
		margin: auto;
	}
	&:hover {
		img {
			animation: logoAnimation 0.3s ease-in-out;
		}
	}
}
</style>
