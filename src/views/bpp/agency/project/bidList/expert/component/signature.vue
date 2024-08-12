<template>
	<div class="base-role-container">
		<h3 style="text-align: center">个人签章部分</h3>
		<el-button type="primary" @click="multipleSignature(1)">{{ $t('message.action.batchSignature') }}</el-button>
		<el-table
			:data="tableData.data"
			v-loading="tableData.loading"
			style="width: 100%"
			:height="200"
			border
			stripe
			highlight-current-row
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="55" fixed />
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="Content" label="材料名称" show-overflow-tooltip fixed />
			<el-table-column prop="ReviewState" label="状态" show-overflow-tooltip fixed>
				<template #default="scope">
					<span v-if="scope.row.ReviewState == 0" style="color: #f56c6c">未签章</span>
					<span v-else style="color: #67c23a">已签章</span>
				</template>
			</el-table-column>
			<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" fixed="right">
				<template #default="scope">
					<el-button text bg type="primary" @click="onSignatureRow(scope.row)"> 签章 </el-button>
				</template>
			</el-table-column>
		</el-table>
		<h3 style="text-align: center">集体签章部分</h3>
		<el-button type="primary" @click="multipleSignature(2)">{{ $t('message.action.batchSignature') }}</el-button>
		<el-table
			:data="allTableData.data"
			v-loading="allTableData.loading"
			style="width: 100%"
			:height="200"
			border
			stripe
			highlight-current-row
			@selection-change="AllhandleSelectionChange"
		>
			<el-table-column type="selection" width="55" fixed />
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="Content" label="材料名称" show-overflow-tooltip fixed />
			<el-table-column prop="ReviewState" label="状态" show-overflow-tooltip fixed>
				<template #default="scope">
					<span v-if="scope.row.ReviewState == 0" style="color: #f56c6c">未签章</span>
					<span v-else style="color: #67c23a">已签章</span>
				</template>
			</el-table-column>
			<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(220)" fixed="right">
				<template #default="scope">
					<el-button text bg type="primary" @click="onSignatureRow(scope.row)"> 签章 </el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance, toRaw } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import { Item } from 'ant-design-vue/lib/menu';
export default {
	name: 'signature',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			project: store.state.project.project,
			tableData: {
				data: [],
				total: 0,
				loading: false,
			},
			allTableData: {
				data: [],
				total: 0,
				loading: false,
			},
			tableDataSelect: [],
			allTableDataSelect: [],
			signUpList: [],
			kind: 'signature',
		});

		const GetSignUpList = async (isState: boolean) => {
			if (isState) {
				state.tableData.loading = true;
				state.allTableData.loading = true;
				try {
					const res = await proxy.$api.erp.projectreview.expertList(store.state.project.projectId, { kind: state.kind });
					if (res.errcode == 0) {
						state.tableData.data = [];
						state.allTableData.data = [];
						for (let item of res.data) {
							if (item.IsGather == 1) {
								state.allTableData.data.push(item);
							} else {
								state.tableData.data.push(item);
							}
						}
					}
				} finally {
					state.tableData.loading = false;
					state.allTableData.loading = false;
				}
			}
		};
		const onSignature = async (list) => {
			state.tableData.loading = true;
			state.allTableData.loading = true;
			console.log(list);
			try {
				let newList = JSON.parse(JSON.stringify(list));
				for (let item of newList) {
					item.ReviewState = 1;
				}
				const res = await proxy.$api.erp.projectreview.expertSave(state.kind, newList);
				if (res.errcode == 0) {
					ElMessage.success('操作成功');
					GetSignUpList(true);
				}
			} finally {
				state.tableData.loading = false;
				state.allTableData.loading = false;
			}
		};
		const handleSelectionChange = (val) => {
			state.tableDataSelect = val;
		};
		const AllhandleSelectionChange = (val) => {
			state.allTableDataSelect = val;
		};
		const multipleSignature = (num: int) => {
			let list = [];
			if (num == 1) {
				list = state.tableDataSelect;
			} else {
				list = state.allTableDataSelect;
			}
			if (list.length == 0) {
				ElMessage.error('操作失败！请勾选要批量操作的数据！');
				return;
			}
			ElMessageBox.confirm(`确定要批量签章吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				onSignature(list);
			});
		};
		const onSignatureRow = (row) => {
			ElMessageBox.confirm(`确定要签章吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				let list = [];
				list.push(row);
				onSignature(list);
			});
		};
		// 页面加载时
		onMounted(() => {
			GetSignUpList(false);
		});

		return {
			proxy,
			project,
			GetSignUpList,
			onSignature,
			onSignatureRow,
			multipleSignature,
			handleSelectionChange,
			AllhandleSelectionChange,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss"></style>
