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
			<el-col :span="8">
				<div>
					<el-button text bg type="primary" @click="onCompile">组长确认</el-button>
					<el-button text bg type="primary" @click="">退回重评</el-button>
				</div>
			</el-col>
			<el-col :span="8">
				<el-form-item label="评委编号：">
					<el-select v-model="projectLineIndex" placeholder="请选择" @change="">
						<el-option v-for="(item, index) in project.ProjectLineList" :key="index" :label="item.Name" :value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
			</el-col>
		</el-row>
		<el-col :span="24">
			<div style="text-align: center;font-size: 20px; padding-bottom: 15px;">
				<h>报价得分表</h>
			</div>
		</el-col>
		<el-row>
			<el-col :span="24">
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Id" label="投标方名称" width="120" show-overflow-tooltip/>
					<el-table-column prop="Name" label="总报价（元）" show-overflow-tooltip/>
					<el-table-column prop="Name" label="最终评审报价（元）" show-overflow-tooltip/>
					<el-table-column prop="Name" label="价格得分" show-overflow-tooltip/>
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30]"
					v-model:current-page="tableData.param.current"
					background
					v-model:page-size="tableData.param.size"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="tableData.total"/>
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
			projectLineIndex:'',
			project: {},
			tableData: {
				data: [{Id:"AXDF123",Name: "张三", CheckState: 1,VoteState: 1, VoteCount: 5, LeaderState: 1}],
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
		const getCompanyList = async (isState: boolean) => {
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

		const onCompile = async (Id: Number) => {
			if (!Id) {
				ElMessage.error('当前页面没有数据，不能汇总！');
				return;
			}
			ElMessageBox.confirm(`确定汇总吗?`, '提示', {
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
			getCompanyList,
			onCompile,
			onHandleSizeChange,
			onHandleCurrentChange,
			t,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
