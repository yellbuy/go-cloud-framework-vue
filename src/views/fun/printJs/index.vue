<template>
	<div id="printRef">
		<el-card shadow="hover" header="打印演示">
			<el-alert
				title="感谢优秀的 `print-js`，项目地址：https://github.com/crabbly/Print.js。请在打印弹窗 `更多设置` 中开启 `背景图形。`"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<el-button @click="onPrintJs" size="small" type="primary">
				<SvgIcon name="iconfont icon-dayin" />
				点击打印演示
			</el-button>
		</el-card>
	</div>
</template>

<script lang="ts">
import printJs from 'print-js';
import { reactive, toRefs } from 'vue';
export default {
	name: 'funPrintJs',
	setup() {
		const state = reactive({});
		// 打印点击
		const onPrintJs = () => {
			printJs({
				printable: 'printRef',
				type: 'html',
				css: ['//at.alicdn.com/t/font_2298093_o73r8wjdhlg.css', 'https://unpkg.com/element-plus/es/theme-chalk/index.css'],
				scanStyles: false,
				style: `@media print{.mb15{margin-bottom:15px;}.el-button--small i.iconfont{font-size: 12px !important;margin-right: 5px;}}`,
			});
		};
		return {
			onPrintJs,
			...toRefs(state),
		};
	},
};
</script>
