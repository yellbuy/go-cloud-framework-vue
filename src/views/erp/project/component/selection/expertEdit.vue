<template>
	<div class="base-role-container">
		<button>添加专家</button>
		<el-table
			:data="tableData.data"
			v-loading="tableData.loading"
			style="width: 100%"
			:height="proxy.$calcMainHeight(-75)"
			border
			stripe
			highlight-current-row
		>
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="No" label="角色" show-overflow-tooltip fixed></el-table-column>
			<el-table-column prop="Name" label="名称" show-overflow-tooltip></el-table-column>
			<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
				<template #default="scope">
					<el-button text bg type="primary" @click="onModelEdit(scope.row.Id)" v-auth:[moduleKey]="'btn.Edit'">
						<el-icon>
							<Edit />
						</el-icon>
						&#8197;{{ $t('message.action.edit') }}
					</el-button>
					<el-button text bg type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
						<el-icon>
							<CloseBold />
						</el-icon>
						&#8197;{{ $t('message.action.delete') }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
export default {
	name: 'expertEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			vipList: [],
			expertList: [],
			tableData: {
				data: [],
				total: 0,
				loading: false,
			},
		});
		const getVipList = async () => {
			try {
				const res = await proxy.$api.base.user.getVipList(1, 0, 1, 2, { pageNum: 1, pageSize: 10000 });
				// const res = await proxy.$api.base.user.getList(state.tableData.param);
				if (res.errcode == 0) {
					state.vipList = res.data;
				}
			} finally {
			}
		};
		const getExpertList = async () => {
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.project.expertList(store.state.project.projectId);
				if (res.errcode == 0) {
					state.tableData.data = res.data;
				}
			} finally {
				state.tableData.loading = false;
			}
		};

		// 页面加载时
		onMounted(() => {
			getVipList();
			getExpertList();
		});

		return {
			proxy,
			project,
			getVipList,
			...toRefs(state),
		};
	},
	components: {},
};
</script>

<style scoped lang="scss">
</style>
