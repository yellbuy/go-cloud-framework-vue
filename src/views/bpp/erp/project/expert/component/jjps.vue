<template>
	<div class="base-role-container">
		<el-form-item>
			<el-button style="margin-left: 10px" type="primary" @click="onSubmit(false)">{{ $t('message.action.save') }}</el-button>
			<el-button type="primary" @click="onSubmit(true)">{{ $t('message.action.submit') }}</el-button>
		</el-form-item>
		<el-table
			:data="tableData.data"
			v-loading="tableData.loading"
			style="width: 100%"
			:height="proxy.$calcMainHeight(-175)"
			border
			stripe
			highlight-current-row
		>
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="CompanyName" label="投标方" show-overflow-tooltip fixed />
			<el-table-column prop="TechnicalScore" label="总报价" show-overflow-tooltip align="right" />
			<el-table-column prop="ReviewPrice" label="最终评审报价" show-overflow-tooltip>
				<template #default="scope">
					<el-input-number
						v-model="scope.row.ReviewPrice"
						controls-position="right"
						:min="0"
						:max="scope.row.TechnicalScore"
						size="small"
						style="width: 90px"
					>
					</el-input-number>
				</template>
			</el-table-column>
			<el-table-column prop="PriceScore" label="价格得分" show-overflow-tooltip>
				<template #default="scope">
					<el-input-number v-model="scope.row.PriceScore" controls-position="right" :min="0" size="small" style="width: 90px"> </el-input-number>
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
import { Item } from 'ant-design-vue/lib/menu';
export default {
	name: 'jjps',
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
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
			kind: 'jjps',
		});

		const GetSignUpList = async (isState: boolean) => {
			if (isState) {
				state.tableData.loading = true;
				try {
					const res = await proxy.$api.erp.projectreview.expertList(store.state.project.projectId, { kind: state.kind });
					if (res.errcode == 0) {
						console.log('获取的数据', res.data);
						state.tableData.data = res.data;
					}
				} finally {
					state.tableData.loading = false;
				}
			}
		};
		const onSubmit = async (isSubmit: boolean) => {
			try {
				if (isSubmit) {
					state.tableData.data.forEach((item) => {
						item.State = 1;
					});
					ElMessageBox.confirm(`确定要提交吗?`, '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}).then(async () => {
						let data = JSON.stringify(state.tableData.data);
						const res = await proxy.$api.erp.projectreview.expertSave(state.kind, data);
						if (res.errcode == 0) {
							ElMessage.success('操作成功');
							GetSignUpList(true);
						}
					});
				} else {
					let data = JSON.stringify(state.tableData.data);
					const res = await proxy.$api.erp.projectreview.expertSave(state.kind, data);
					if (res.errcode == 0) {
						ElMessage.success('操作成功');
						GetSignUpList(true);
					}
				}
			} finally {
			}
		};

		// 页面加载时
		onMounted(() => {
			GetSignUpList(false);
		});

		return {
			proxy,
			onSubmit,
			project,
			GetSignUpList,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss"></style>
