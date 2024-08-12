<template>
	<div>
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
		<el-row>
			<el-col :span="24">
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="60" fixed />
					<el-table-column prop="Sn" label="项目包号" width="200" show-overflow-tooltip></el-table-column>
					<el-table-column prop="No" label="招标控制价" align="right" width="120" show-overflow-tooltip></el-table-column>
					<el-table-column prop="State" label="状态" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.State == 0">未开标</span>
							<span v-else-if="scope.row.State == 1">已开标</span>
							<span v-else-if="scope.row.State == 2">已结束</span>
							<span v-else-if="scope.row.State == 3">废包</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" fixed="right">
						<template #default="scope">
							<el-button type="primary" @click="">设定为开标包</el-button>
							<el-button text bg type="primary" @click="">废包</el-button>
						</template>
					</el-table-column>
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
					:total="tableData.total">
				</el-pagination>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';
export default {
	name: 'bidEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			project: {},
			tableData: {
				data: [{Sn: "XMDEC15828", No: 178000, State: 1}],
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
		});
		//获取项目品目信息
		const getBidList = async () => {
			//重新请求数据
			await proxy.$parent.$parent.$parent.$parent.GetByIdRow(false);
			//获取存储的项目数据
			state.project = store.state.project.project;
			if (state.project.ProjectLineList) {
				state.tableData.data = state.project.ProjectLineList;
			}
		};
		const onModelChange = async (id: string, state: number) => {
			let params = {};
			try {
				params.Id = id;
				params.ProjectId = store.state.project.projectId;
				params.State = state;
				const res = await proxy.$api.erp.projectline.changeBid(params);
				if (res.errcode != 0) {
					return;
				}
				getBidList();
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
		onMounted(() => {});

		return {
			onHandleSizeChange,
			onHandleCurrentChange,
			proxy,
			getBidList,
			onModelChange,
			t,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
