<template>
	<div v-if="state.isShowPage">
		<!-- <el-row class="mt10">
			<el-col :span="24">
				<el-link :state.href="state.baseUrl+state.projectForm.file" style="color: blue; text-decoration: underline;" v-if="state.projectForm.Files" target="_blank">下载评标报告</el-link>	
				<h v-else>该项目没有上传评标报告</h>
			</el-col>
		</el-row> -->
		<el-row class="mt10">
			<el-divider border-style="dashed" />
			<el-col :span="24">
				<el-descriptions border>
					<el-descriptions-item label-align="left" align="left" label="《评标报告》" v-if="state.projectForm.Files != ''">
						<el-link type="primary" @click="onDownloadFile('评标报告', state.projectForm.Files)">下载</el-link>
					</el-descriptions-item>
					<el-descriptions-item label-align="left" align="left" label="★该项目没有上传评标报告,无法下载" v-else/>
				</el-descriptions>
			</el-col>
		</el-row>
        <!-- <div>
            <pdf :src="pdfSrc"></pdf>
        </div> -->
	</div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useStore } from '/@/store/index';
// import pdf from 'vue-pdf';
// import project from '/@/api/erp/project';

const store = useStore();
const state: any = reactive({
	isShowPage: false,
	baseUrl: import.meta.env.VITE_API_URL,
	projectForm: {},
});

//	打开页面
const openPage = async (data: {}) => {
	state.projectForm = data
	state.isShowPage = true
};

//	关闭页面
const closePage = async () => {
	state.projectForm = {}
	state.isShowPage = false
};

// 下载文件
const onDownloadFile = async (fileName: string, path: string) => {
	var a = document.createElement('a');
	a.href = import.meta.env.VITE_URL + path;
	a.download = fileName; // 下载后的文件名称
	a.click();
};

// 页面加载时
onMounted(() => {
});

defineExpose({openPage, closePage})

</script>

<style scoped lang="scss">
</style>
