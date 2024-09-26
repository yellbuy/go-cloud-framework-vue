<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.project.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.project.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
			<el-col :span="24">
				<div>
					<el-button text bg type="primary" @click="onDownloadFile">下载评标报告</el-button>
					<el-button text bg type="primary" @click="">刷新</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div style="text-align: center; font-size: 40px;">
					<h>PDF预览</h>
				</div>
			</el-col>
		</el-row>
	</el-card>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, computed, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {},
	},
});

// 下载文件
const onDownloadFile = async () => {
	var a = document.createElement('a');
	a.href = import.meta.env.VITE_URL + state.project.Files;
	a.download = state.project.Name + '《评标报告》'; // 下载后的文件名称
	a.click();
};

// 页面加载时
onMounted(() => {});

</script>
<style scoped lang="scss">
</style>
