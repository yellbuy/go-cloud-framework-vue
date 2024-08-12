<template>
	<div>
		<el-button type="primary" @click="">PDF预览</el-button>
        <div>
			<!-- <iframe style="width: 100%; height: 900px" src=""></iframe> -->
            <!-- <pdf src="" :page="1" :rotate="0" style="height: 400px;" ></pdf> -->
        </div>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
// import pdf from 'vue-pdf';
// import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'expertEdit',
    components: {  },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
            pdfSrc: '',
			tableData: {
				data: [],
				total: 0,
				loading: false,
			},
			isShowDialog: false,
			ruleForm: {
				Roles: 0,
				NameId: '',
			},
			state: true,
		});
		const rules = reactive({
			isShowDialog: false,
			title: t('message.action.add'),
			Roles: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
			NameId: [
				{
					required: true,
					message: t('message.validRule.required'),
					trigger: 'blur',
				},
			],
		});
		const getVipList = async () => {
			try {
				const res = await proxy.$api.base.user.getVipList(1, 0, 1, 2, { pageNum: 1, size: 10000 });
				// const res = await proxy.$api.base.user.getList(state.tableData.param);
				if (res.errcode == 0) {
					state.vipList = res.data;
				}
			} finally {
			}
		};
		const getExpertList = async (isState: boolean) => {
			state.state = false;
		};
		const closeDialog = () => {
			proxy.$refs.ruleFormRef.resetFields();
			state.loading = false;
			state.isShowDialog = false;
			state.ruleForm = {
				Roles: 0,
				NameId: '',
			};
		};
		const getAjaxData = () => {
			let model = {
				list: [],
				SupervisionId: '',
			};
			for (let item of state.tableData.data) {
				if (item.State == 0) {
					model.list.push(item.User.Id);
				} else {
					model.SupervisionId = item.User.Id;
				}
			}
			return model;
		};
		const onSubmit = async () => {
			proxy.$refs.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					let newModel = getAjaxData();
					//判断当前角色是什么
					if (state.ruleForm.Roles == 0) {
						//添加为评审
						if (state.ruleForm.NameId == newModel.SupervisionId) {
							//当前专家是监审
							newModel.SupervisionId = '';
							newModel.list.push(state.ruleForm.NameId);
						} else {
							newModel.list.push(state.ruleForm.NameId);
						}
					} else {
						//添加为监审
						for (let i = 0; i <= newModel.list.length; i++) {
							if (newModel.list[i] == state.ruleForm.NameId) {
								newModel.list.splice(i, 1);
							}
						}
						newModel.SupervisionId = state.ruleForm.NameId;
					}
					let model = {
						projectId: store.state.project.projectId,
						SupervisionId: newModel.SupervisionId,
						ExpertIds: newModel.list.toString(),
					};
					try {
						const res = await proxy.$api.erp.project.expertSave(model);
						if (res.errcode != 0) {
							return;
						}
						closeDialog();
						getExpertList(true);
					} finally {
					}
				} else {
					return false;
				}
			});
		};
		const onModelDel = (index: number) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.data.splice(index, 1);
				let newModel = getAjaxData();
				let model = {
					projectId: store.state.project.projectId,
					SupervisionId: newModel.SupervisionId,
					ExpertIds: newModel.list.toString(),
				};
				try {
					const res = await proxy.$api.erp.project.expertSave(model);
					if (res.errcode != 0) {
						return;
					}
					getExpertList(true);
				} finally {
				}
				return false;
			});
		};
		const { dateFormat } = commonFunction();
		// 页面加载时
		onMounted(() => {
			// getVipList();
		});

		return {
			proxy,
			rules,
			onSubmit,
			closeDialog,
			getAjaxData,
			getVipList,
			dateFormat,
			getExpertList,
			onModelDel,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
