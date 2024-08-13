<template>
	<el-card v-if="isShowPage">
		<el-row>
			<el-col :span="22">
				<el-steps :active="activeIndex" align-center>
					<el-step title="发布招标项目"/>
					<el-step title="设置招标信息"/>
					<el-step title="评标参数复核"/>
				</el-steps>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="mt20">
					<infoEdit v-if="activeIndex == 0" />
					<extEdit v-else-if="activeIndex == 1" />
					<parameterEdit v-else-if="activeIndex == 2" />
					<span style="float: right; padding: 30px;">
						<el-button v-if="activeIndex > 0" type="primary" @click="stepChange(-1)">上一步</el-button>
						<el-button v-if="activeIndex < 2" type="primary" @click="stepChange(1)">下一步</el-button>
						<el-button text bg type="info" @click="changeSelection">取消</el-button>
						<el-button v-if="activeIndex == 2" text bg type="info" @click="onSubmit()">完成</el-button>
					</span>
				</div>
			</el-col>
		</el-row>
	</el-card>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import extEdit from './create/extEdit.vue';
import infoEdit from './create/infoEdit.vue';
import parameterEdit from './create/parameterEdit.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'api_sys_project_stepLoadion',
	components: { infoEdit,extEdit, parameterEdit },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state = reactive({
			httpsText: import.meta.env.VITE_URL as any,
			activeIndex: 0,
			isShowPage: false,
		});
		const { dateFormat } = commonFunction();

		// 打开页面
		const openPage = async () => {
			state.isShowPage = true
			state.activeIndex = 0;
		};
		const changeSelection = () => {
			state.isShowPage = false
			proxy.$parent.isShowPage = true;
		};
		const stepChange = (val: number) => {
			let activeIndex=state.activeIndex+val
			if(activeIndex<0){
				activeIndex=0
			} else if(activeIndex>2){
				activeIndex=2
			}
			console.log("activeIndex：",activeIndex)
			state.activeIndex=activeIndex
		}
		const onSubmit = () => {
		};
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			openPage,
			changeSelection,
			stepChange,
			onSubmit,
			dateFormat,
			t,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
</style>