<template>
	<slot v-if="getUserAuthBtnList" />
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from '/@/store/index';
export default {
	name: 'auth',
	props: {
		moduleKey: {
			type: String,
			default: () => '',
		},
		value: {
			type: String,
			default: () => '',
		},
	},
	setup(props) {
		const store = useStore();
		// 获取 vuex 中的用户权限
		const authBtnList=store.state.userInfos.userInfos.authBtnList[moduleKey]||[];
		const getUserAuthBtnList = computed(() => {
			return authBtnList.some((v: any) => v === props.value);
		});
		return {
			getUserAuthBtnList,
		};
	},
};
</script>
