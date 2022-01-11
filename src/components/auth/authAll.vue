<template>
	<slot v-if="getUserAuthBtnList" />
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from '/@/store/index';
import { judementSameArr } from '/@/utils/arrayOperation';
export default {
	name: 'authAll',
	props: {
		moduleKey: {
			type: String,
			default: () => '',
		},
		value: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const store = useStore();
		// 获取 vuex 中的用户权限
		const authBtnList=store.state.userInfos.userInfos.authBtnList[moduleKey]||[];
		const getUserAuthBtnList = computed(() => {
			return judementSameArr(props.value, authBtnList);
		});
		return {
			getUserAuthBtnList,
		};
	},
};
</script>
