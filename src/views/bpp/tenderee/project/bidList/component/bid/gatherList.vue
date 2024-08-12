<template>
	<div>
		<el-row>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="请选择当前项目包号：">
					<el-select v-model="projectLineIndex" placeholder="请选择" @change="changeLine">
						<el-option
							v-if="project.ProjectLineList && project.ProjectLineList.length > 0"
							v-for="item in project.ProjectLineList"
							:key="item.Id"
							:label="item.Name"
							:value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">test</el-descriptions-item>
					<el-descriptions-item label="项目编号：">test</el-descriptions-item>
					<el-descriptions-item label="评选时间：">test</el-descriptions-item>
					<el-descriptions-item label="评选地点：">test</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-175)" border stripe highlight-current-row>
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="CompanyName" label="投标方名称" show-overflow-tooltip fixed />
			<el-table-column prop="ReviewPrice" label="投标评审价（元）" show-overflow-tooltip align="right" />
			<el-table-column prop="PriceScore" label="报价得分" show-overflow-tooltip align="right" />
			<el-table-column prop="TechnicalScore" label="技术得分" show-overflow-tooltip align="right" />
			<el-table-column prop="GatherScore" label="最终得分" show-overflow-tooltip align="right" />
		</el-table>
		<el-pagination
			small
			@size-change="onHandleSizeChange"
			@current-change="onHandleCurrentChange"
			class="mt15"
			:page-sizes="[10, 20, 30]"
			v-model:current-page="tableData.param.current"
			background
			v-model:page-size="tableData.param.pageSize"
			layout="->, total, sizes, prev, pager, next, jumper"
			:total="tableData.total"/>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
// import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import { Item } from 'ant-design-vue/lib/menu';
export default {
	name: 'gather',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			project: store.state.project.project,
			project: {},
			projectLineIndex: '',
			tableData: {
				data: [{CompanyName: "攀枝花XX有限责任公司", ReviewPrice: 196000, PriceScore: 65, TechnicalScore: 85, GatherScore: 75}],
				total: 0,
				loading: false,
				param: {
					mode: 2,
					current: 1,
					pageSize: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
			kind: 'gather',
			nextKind: 'recommend',
			nextKind2: 'signature',
			state: false,
		});

		const GetSignUpList = async (isState: boolean, isShow: boolean) => {
			state.state = isShow;
			if (isState) {
				state.tableData.loading = true;
				try {
					const res = await proxy.$api.erp.projectreview.expertList(store.state.project.projectId, { kind: state.kind });
					if (res.errcode == 0) {
						state.tableData.data = res.data;
					}
				} finally {
					state.tableData.loading = false;
				}
			}
		};
		const onSubmit = async () => {
			try {
				ElMessageBox.confirm(`确定要汇总吗?`, '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					const res = await proxy.$api.erp.projectreview.expertGatherSave(store.state.project.projectId, {
						Kind: state.kind,
						NextKind: state.nextKind,
					});
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						GetSignUpList(true, state.state);
					}
				});
			} finally {
			}
		};
		const onLeader = async (row) => {
			try {
				ElMessageBox.confirm(`确定要推荐吗?`, '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					let data = JSON.parse(JSON.stringify(row));
					data.IsLeader = 1;
					const res = await proxy.$api.erp.projectreview.expertGatherSave(store.state.project.projectId, {
						Kind: state.nextKind,
						NextKind: state.nextKind2,
						ProjectReview: data,
					});
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						GetSignUpList(true, state.state);
					}
				});
			} finally {
			}
		};
		const onReturn = async () => {
			try {
				ElMessageBox.confirm(`确定要退回重评吗?`, '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					const res = await proxy.$api.erp.projectreview.expertGatherReturn(store.state.project.projectId);
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						GetSignUpList(true, state.state);
					}
				});
			} finally {
			}
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
		onMounted(() => {
			// GetSignUpList(false, false);
		});

		return {
			proxy,
			onHandleSizeChange,
			onHandleCurrentChange,
			onSubmit,
			onLeader,
			onReturn,
			GetSignUpList,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss"></style>
