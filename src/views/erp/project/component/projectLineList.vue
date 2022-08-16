<template>
	<div class="system-edit-user-container">
		<el-dialog v-model="isShowDialog" title="获取信息" width="80%">
			<el-table
				:data="tableData.data"
				style="width: 100%"
				v-loading="tableData.loading"
				:height="proxy.$calcMainHeight(-170)"
				border
				stripe
				highlight-current-row
				@select="select"
				@select-all="selectAll"
			>
				<el-table-column type="selection" width="55" />
				<el-table-column type="index" width="50" label="序号" fixed show-overflow-tooltip />
				<el-table-column prop="Content" label="评审内容" show-overflow-tooltip />
				<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip />
				<el-table-column v-if="kind == 'jsps'" prop="TechnicalMaxScore" label="最高评分" show-overflow-tooltip />
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit()">{{ $t('message.action.save') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
export default {
	name: 'projectLineListEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const route = useRoute();
		const store = useStore();
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const state = reactive({
			scopeMode,
			scopeValue,
			getList: [],
			kind: '',
			isShowDialog: false,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					mode: 1,
					pageNum: 1,
					pageSize: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
			isAjax: false,
		});
		// 打开弹窗
		const openDialog = (kind: string, isAjax: boolean) => {
			if (isAjax) {
				state.isAjax = isAjax;
			}
			state.kind = kind;
			getNewList();
			state.isShowDialog = true;
		};
		// 新增
		const onSubmit = async () => {
			let list = JSON.parse(JSON.stringify(state.getList));
			let ajaxList = [];
			if (list.length > 0) {
				for (let item of list) {
					console.log(item);
					let model = {};
					model.Id = '0';
					model.Content = item.Content;
					model.Standard = item.Standard;
					model.TechnicalMaxScore = item.TechnicalMaxScore;
					model.Kind = state.kind;
					if (!state.isAjax) {
						model.Parentid = store.state.project.projectLineId;
						ajaxList.push(model);
					} else {
						if (state.kind == 'jsps') {
							proxy.$parent.jsTableData.data.push(model);
							proxy.$parent.getScore();
						} else {
							proxy.$parent.zgTableData.data.push(model);
						}
					}
				}
			}
			if (!state.isAjax && ajaxList.length > 0) {
				try {
					const res = await proxy.$api.erp.projectsettingline.saveIds(ajaxList);
					if (res.errcode == 0) {
						proxy.$parent.changeLine(); //刷新
						closeDialog();
					}
				} finally {
				}
			} else {
				closeDialog();
			}
			return false;
		};
		const closeDialog = () => {
			state.tableData.loading = false;
			state.isShowDialog = false;
			state.getList = [];
		};
		const select = (selection: Array<object>) => {
			state.getList = selection;
		};
		const selectAll = (selection: Array<object>) => {
			state.getList = selection;
		};
		const getNewList = async () => {
			try {
				//mode 1、资格评审 2、技术评审
				if (state.kind == 'jsps') {
					state.tableData.param.mode = 2;
				} else {
					state.tableData.param.mode = 1;
				}
				const res = await proxy.$api.erp.projectsetting.getListByScope(state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
		};
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			t,
			getNewList,
			openDialog,
			closeDialog,
			onSubmit,
			selectAll,
			select,
			...toRefs(state),
		};
	},
};
</script>
