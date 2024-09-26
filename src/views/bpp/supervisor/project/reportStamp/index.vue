<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
					<el-descriptions-item label="开标时间：">{{ state.project.BidOpenTime }}</el-descriptions-item>
					<el-descriptions-item label="开标地点：">{{ state.project.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-card>
					<div style="text-align: center; margin-bottom: 50px; font-size: 20px;">
						<h >评审报告</h>
					</div>
					<div style="text-align: center;">
						<el-button style="width: 300px; height: 80px; font-size: 50px;" type="primary" @click="">确认签章</el-button>
					</div>
				</el-card>
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
	projectLineIndex:'',
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//获取项目品目信息
const onGetTableData = async (isState: boolean) => {
	if (isState) {
		let params = {};
		state.project = store.state.project.project;
		state.tableData.data = [];
		try {
			params.projectId = store.state.project.projectId;
			params.state = 1;
			//重新请求数据

			const res = await proxy.$api.erp.projectcompany.comparisonList(params);
			//获取存储的项目数据
			if (res.errcode != 0) {
				return;
			}
			state.tableData.data = res.data;
		} finally {
		}
	}
};

const onModelSave = async (Id: Number) => {
	if (!Id) {
		ElMessage.error('请选择人员进行推荐！');
		return;
	}
	ElMessageBox.confirm(`确定要推荐他为组长吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		// try {
		// 	const res = await proxy.$api.common.enterprise.audit(state.ruleForm);
		// 	if (res.errcode != 0) {
		// 		return;
		// 	}
		// 	state.ruleForm.AuditState = 0;
		// } finally {
		// 	onGetTableData(true);
		// }
		return false;
	});
};

// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.current = val;
};

// 页面加载时
onMounted(() => {});

</script>

<style scoped lang="scss">
</style>
