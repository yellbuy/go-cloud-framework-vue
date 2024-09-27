<template>
	<div v-if="state.isShowPage">
		<el-button type="primary" @click="">PDF预览</el-button>
        <div>
			<div ref="pdfContainer"></div>
			<!-- <iframe style="width: 100%; height: 900px" src=""></iframe> -->
            <!-- <pdf src="" :page="1" :rotate="0" style="height: 400px;" ></pdf> -->
        </div>
	</div>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import pdf from 'vue-pdf';
// import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	isShowPage: false,
	pdfSrc: '',
	tableData: {
		data: [],
		total: 0,
		loading: false,
	},
});

//	打开页面
const openPage = async () => {
	state.isShowPage = true
	loadPdf('path/to/your/pdf.pdf')
};

//	关闭页面
const closePage = async () => {
	state.isShowPage = false
}

const loadPdf = async (pdfPath: string) => {
	// 设置 PDF.js 的路径
	pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

	// 加载 PDF
	pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
		// 获取第一页
		return pdf.getPage(1);
	}).then(page => {
		const viewport = page.getViewport({ scale: 1.5 });
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		canvas.width = viewport.width;
		canvas.height = viewport.height;

		const renderContext = {
			canvasContext: context,
			viewport: viewport
		};

		// 渲染页面到画布
		page.render(renderContext);

		// 将画布添加到页面
		proxy.$refs.pdfContainer.appendChild(canvas);
	});
}


const { dateFormat } = commonFunction();

// 页面加载时
onMounted(() => {});

defineExpose({openPage, closePage})
</script>

<style scoped lang="scss">
</style>
