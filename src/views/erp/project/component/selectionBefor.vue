<template>
	<div class="base-role-container">
		<h1 v-if="indexLine == '1-1'">1-1</h1>
		<h1 v-if="indexLine == '1-2'">1-2</h1>
		<h1 v-if="indexLine == '1-3'">1-3</h1>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

import { useRoute, useRouter } from 'vue-router';
export default {
	name: 'baseRoles',
	props: ['indexLine'],
	setup(props) {
		const { proxy } = getCurrentInstance() as any;
		const router = useRouter();
		const state: any = reactive({});
		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
