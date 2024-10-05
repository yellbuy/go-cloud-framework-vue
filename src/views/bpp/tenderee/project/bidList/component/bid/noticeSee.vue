<template>
	<div class="system-edit-user-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="40%" :before-close="closeDialog">
			<p>{{ state.project.Content }}</p>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive} from 'vue';
import { useStore } from '/@/store/index';

const store = useStore();
const state = reactive({
	project: store.state.project.project,
	isShowDialog: false,
	title: "查看公告",
	projectForm: {},
});

// 打开弹窗
const openDialog = (row: {}) => {
	state.projectForm = row
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

defineExpose({openDialog})

</script>
