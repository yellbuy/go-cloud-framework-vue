<template>
	<div class="base-role-container"></div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
export default {
	name: 'leader',
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
			uid: 0,
		});
		const getExpertList = async () => {
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.erp.projectreview.expertList(store.state.project.projectId, { kind: state.kind });
				if (res.errcode == 0) {
					state.tableData.data = res.data;
				}
			} finally {
				state.tableData.loading = false;
			}
		};
		const onLeader = async () => {
			if (state.Uid == 0) {
				ElMessage.warning('请选择授权专家');
				return;
			}
			ElMessageBox.confirm(`确定要授权吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.projectreview.empowerSave({
						Id: store.state.project.projectId,
						Uid: state.uid,
					});
					if (res.errcode == 0) {
						getExpertList();
					}
				} finally {
				}
			});
		};

		// 页面加载时
		onMounted(() => {
			getExpertList();
		});

		return {
			proxy,
			onLeader,
			project,
			getExpertList,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss"></style>
