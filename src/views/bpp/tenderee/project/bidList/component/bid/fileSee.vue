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

const onSubmit = async () => {
	proxy.$refs.ruleFormRef.validate(async (valid: any) => {
		if (valid) {
			let newModel = getAjaxData();
			//判断当前角色是什么
			if (state.ruleForm.Roles == 0) {
				//添加为评审
				if (state.ruleForm.NameId == newModel.SupervisionId) {
					//当前专家是监审
					newModel.SupervisionId = '';
					newModel.list.push(state.ruleForm.NameId);
				} else {
					newModel.list.push(state.ruleForm.NameId);
				}
			} else {
				//添加为监审
				for (let i = 0; i <= newModel.list.length; i++) {
					if (newModel.list[i] == state.ruleForm.NameId) {
						newModel.list.splice(i, 1);
					}
				}
				newModel.SupervisionId = state.ruleForm.NameId;
			}
			let model = {
				projectId: store.state.project.projectId,
				SupervisionId: newModel.SupervisionId,
				ExpertIds: newModel.list.toString(),
			};
			try {
				const res = await proxy.$api.erp.project.expertSave(model);
				if (res.errcode != 0) {
					return;
				}
				closeDialog();
				getExpertList(true);
			} finally {
			}
		} else {
			return false;
		}
	});
};

const { dateFormat } = commonFunction();

// 页面加载时
onMounted(() => {});

defineExpose({openPage, closePage})
</script>

<style scoped lang="scss">
</style>
