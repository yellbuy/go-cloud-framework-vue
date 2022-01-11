<template>
	<slot v-if="getUserAuthBtnList" />
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from '/@/store/index';
export default {
	name: 'auths',
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
			let flag = false;
			authBtnList.map((val: any) => {
				props.value.map((v) => {
					if (val === v) flag = true;
				});
			});
			return flag;
		});
		return {
			getUserAuthBtnList,
		};
	},
};
</script>
