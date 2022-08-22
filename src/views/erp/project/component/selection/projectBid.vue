<template>
	<div class="base-role-container">
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
					<el-button text bg type="primary" @click="onModelEdit(scope.row)" v-if="scope.row.State != 2">
						<el-icon>
							<Edit />
						</el-icon>
						{{ $t('message.action.setBidOpeningPackage') }}
					</el-button>
					<el-button text bg type="danger" @click="onModelDel(scope.$index, scope.row.Id)">
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
			//获取存储的项目数据
			state.project = store.state.project.project;
			if (state.project.ProjectLineList) {
				state.tableData.data = state.project.ProjectLineList;
			}
			console.log('表格数据', state.tableData.data);
		};
		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			getBidList,
			t,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
