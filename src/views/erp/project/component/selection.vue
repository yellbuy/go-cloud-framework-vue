<template>
	<div class="system-edit-user-container">
		<el-dialog :title="title" v-model="isShowDialog" width="80%" :before-close="closeDialog">
			<el-tabs v-model="activeName" class="demo-tabs">
				<el-tab-pane label="评选准备" name="first">
					<before ref="beforeRef" :ProjectLineList="ruleForm.ProjectLineList" />
				</el-tab-pane>
				<el-tab-pane label="项目评选" name="second"> </el-tab-pane>
				<el-tab-pane label="评标汇总" name="third"> </el-tab-pane>
				<el-tab-pane label="评选结果" name="fourth">
					<div v-for="(val, index) in FilesList" :key="index">
						<a :href="val.url" target="_blank">点击下载标书</a>
					</div>
				</el-tab-pane>
			</el-tabs>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg type="primary" @click="onSubmit" v-auth:[$parent.moduleKey]="'btn.Selection'">{{ $t('message.action.save') }}</el-button>
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { TabsPaneContext } from 'element-plus';
import commonFunction from '/@/utils/commonFunction';
import { useStore } from '/@/store/index';
import { ElMessageBox, ElMessage } from 'element-plus';
import before from './selectionBefor/reviewEdit.vue';
export default {
	name: 'categoryEdit',
	components: { before },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const beforeRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.see'),
			ruleForm: {},
			FilesList: [],
			httpsText: import.meta.env.VITE_URL as any,
		});
		const { dateFormat, dateFormatYMDHM } = commonFunction();
		const activeName = ref('first');
		// 打开弹窗
		const openDialog = (id: string) => {
			GetByIdRow(id);
			state.isShowDialog = true;
		};
		const store = useStore();
		const GetByIdRow = async (Id: string) => {
			try {
				const res = await proxy.$api.erp.project.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				store.commit('project/getProject', res.data);
				beforeRef.value.getProject();
				console.log('获取的数据', res.data.ProjectLineList);
				state.ruleForm = res.data;
				console.log('获取数据', state.ruleForm);
				if (!res.data.ProjectLineList) {
					state.ruleForm.ProjectLineList = [];
				}
				res.data.ProjectType = res.data.ProjectType.toString();
				if (state.ruleForm.Files != '') {
					let Files = res.data.Files.split(',');
					state.FilesList = [];
					for (let i = 0; i < Files.length; i++) {
						let image = { url: '' };
						image.url = state.httpsText + Files[i];
						state.FilesList.push(image);
					}
				}
			} finally {
				state.isShowDialog = true;
			}
		};
		const closeDialog = () => {
			//清空数据
			cleanState();
			state.isShowDialog = false;
		};
		const cleanState = () => {
			state.FilesList = [];
			state.ruleForm = {};
		};
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			activeName,
			beforeRef,
			dateFormat,
			closeDialog,
			t,
			openDialog,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>
