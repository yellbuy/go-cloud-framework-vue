<template>
	<el-row class="mt5" v-if="appInfo.PermissionKey=='bpp'">
		<el-col :span="12" class="text-center font10">
			<el-link type="primary" :href="'/#/register?appid='+appInfo.Id+'&appPermissionKindKey='+appInfo.PermissionKey+'&appName='+appInfo.Name+'&kind=tenant'">{{ $t('pages.bpp.router.registerTenant') }}</el-link>
		</el-col>
		<el-col :span="12" class="text-center font10">
			<el-link type="primary" :href="'/#/register?appid='+appInfo.Id+'&appPermissionKindKey='+appInfo.PermissionKey+'&appName='+appInfo.Name+'&kind=user'">{{ $t('pages.bpp.router.registerUser') }}</el-link>
		</el-col>
	</el-row>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '/@/store/index';

export default defineComponent({
	name: 'loginRegister',
	props: {
		app: {
			type: Object,
			default: () => {},
		},
	},
	
	setup(props) {
		const { t } = useI18n();
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const isDevEnv = process.env.NODE_ENV === 'development';
		const state = reactive({
		});
		const appInfo =computed(() => props.app)
		// 页面加载时
		onMounted(() => {
		});
		return {
			appInfo,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
</style>
