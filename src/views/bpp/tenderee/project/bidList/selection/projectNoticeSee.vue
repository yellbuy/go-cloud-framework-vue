<template>
	<el-dialog :title="state.title" v-model="state.isShowDialog" width="40%" :before-close="closeDialog">
		<p>{{ state.projectForm.Content }}</p>
	</el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive} from 'vue';
import { useStore } from '/@/store/index';

const store = useStore();
const state = reactive({
	isShowDialog: false,
	title: "查看公告",
	projectForm: {},
});

// 打开弹窗
const openDialog = (data: {}) => {
	state.projectForm = data
	state.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	state.projectForm = {}
	state.isShowDialog = false;
};

// 页面加载时
onMounted(() => {
});

defineExpose({openDialog, closeDialog})

</script>
