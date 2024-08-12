<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">test</el-descriptions-item>
					<el-descriptions-item label="项目编号：">test</el-descriptions-item>
					<el-descriptions-item label="开标时间：">test</el-descriptions-item>
					<el-descriptions-item label="开标地点：">test</el-descriptions-item>
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

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';
export default {
	name: 'companyEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			project: {},
			tableData: {
				data: [{Id:123 ,Name: "张三", CheckState: 1,VoteState: 1, VoteCount: 5, LeaderState: 1}],
				total: 0,
				loading: false,
				param: {
					mode: 2,
					current: 1,
					size: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
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
			state.tableData.param.size = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
		};

		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			onGetTableData,
			onHandleSizeChange,
			onHandleCurrentChange,
			onModelSave,
			t,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
