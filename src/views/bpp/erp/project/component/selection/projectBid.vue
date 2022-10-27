<template>
	<div class="base-role-container">
		<el-descriptions class="margin-top" :column="2">
			<el-descriptions-item label="项目名称：">{{ project.Name }}</el-descriptions-item>
			<el-descriptions-item label="项目编号：">{{ project.No }}</el-descriptions-item>
			<el-descriptions-item label="评选时间：">{{ project.ReviewTime }}</el-descriptions-item>
			<el-descriptions-item label="评选地点：">{{ project.Location }} </el-descriptions-item>
		</el-descriptions>
		<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="Sn" label="包号" width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="No" label="品目号" show-overflow-tooltip></el-table-column>
			<el-table-column prop="Name" label="名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="State" label="状态" show-overflow-tooltip>
				<template #default="scope">
					<span v-if="scope.row.State == 0">未开标</span>
					<span v-else-if="scope.row.State == 1">已开标</span>
					<span v-else-if="scope.row.State == 2">已结束</span>
					<span v-else-if="scope.row.State == 3">废包</span>
				</template>
			</el-table-column>
			<el-table-column prop="Qty" label="数量" show-overflow-tooltip></el-table-column>
			<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" fixed="right">
				<template #default="scope">
					<el-button text bg type="primary" @click="onModelChange(scope.row.Id, 1)" v-if="scope.row.State != 2">
						<el-icon>
							<Edit />
						</el-icon>
						{{ $t('message.action.setBidOpeningPackage') }}
					</el-button>
					<el-button text bg type="danger" @click="onModelChange(scope.row.Id, 3)">
						<el-icon>
							<CloseBold />
						</el-icon>
						{{ $t('message.action.wastePackage') }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
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
				data: [],
				total: 0,
				loading: false,
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

		// 页面加载时
		onMounted(() => {});

		return {
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
