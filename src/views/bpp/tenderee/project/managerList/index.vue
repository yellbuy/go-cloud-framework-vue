<template>
	<div class="base-role-container">
		<div>
			<el-card shadow="hover">
				<div class="">
					<el-form ref="searchFormRef" :model="state.tableData.param" label-suffix="：" label-width="85px" :inline="true">
						<el-form-item label="姓名">
							<el-input placeholder="请输入关键字" v-model="state.tableData.param.no" style="width: 150px;"/>
						</el-form-item>
						<el-form-item label="部门">
							<el-input placeholder="请输入关键字" v-model="state.tableData.param.name" style="width: 150px;"/>
						</el-form-item>
						<el-form-item label="手机号码">
							<el-input placeholder="请输入关键字" v-model="state.tableData.param.phone" style="width: 150px;"/>
						</el-form-item>
						<el-form-item label="管理类别">
							<el-select multiple v-model="state.tableData.param.kind" placeholder="请选择" style="width: 150px;">
								<el-option v-for="(item, index) in state.companyOption" :key="index" :label="item.Name" :value="item.Id" />
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="info" @click="onResetSearch">
								<el-icon>
									<RefreshLeft />
								</el-icon>
								重置
							</el-button>
							<el-button type="primary" @click="onGetTableData(true)">
								<el-icon>
									<Search />
								</el-icon>
								搜索
							</el-button>
						</el-form-item>
						<el-form-item></el-form-item>
					</el-form>
				</div>
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-75)" border stripe highlight-current-row>
					<el-table-column prop="Username" label="用户名" width="150" fixed />
					<el-table-column prop="Name" label="姓名" width="150" show-overflow-tooltip fixed/>
					<el-table-column prop="department" label="所属部门" width="200" show-overflow-tooltip/>
					<el-table-column prop="type" label="管理类别" show-overflow-tooltip/>
					<el-table-column prop="Mobile" label="手机号" align="right" width="120" show-overflow-tooltip/>
					<el-table-column label="账号状态" width="70" show-overflow-tooltip>
						<template #default="scope">
							<el-switch
								v-model="scope.row.State"
								inline-prompt
								:width="46"
								@change=""
								:active-text="$t('message.action.enable')"
								:inactive-text="$t('message.action.disable')"
								:active-value="1"
								:inactive-value="0"/>
						</template>
					</el-table-column>
					<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(150)" fixed="right">
						<template #default="scope">
							<el-button text bg type="primary" @click="onModelEdit(scope.row.Id, false)">
								编辑
							</el-button>
							<el-button text bg @click="onPwdChanggeEdit(scope.row.Id, false)">
								{{ '修改密码' }}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					small
					@size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange"
					class="mt15"
					:page-sizes="[10, 20, 30, 50, 100]"
					v-model:current-page="state.tableData.param.pageNum"
					background
					v-model:page-size="state.tableData.param.size"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="state.tableData.total">
				</el-pagination>
			</el-card>
			<editDlg ref="editDlgRef" />
			<pwdChanggeEditDlg ref="pwdChanggeEditDlgRef" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import editDlg from './component/managerEdit.vue';
import pwdChanggeEditDlg from './component/pwdChange.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';

const store = useStore();
const route = useRoute();
const kind = route.params.kind;
const mode = route.params.mode;
const isBid = route.params.isBid;
const scopeMode = route.params.scopeMode || 0;
const scopeValue = route.params.scopeValue || 0;
const moduleKey = `api_pro_project_${kind}_${mode}`;
const { proxy } = getCurrentInstance() as any;
const editDlgRef = ref();
const pwdChanggeEditDlgRef= ref();
const state: any = reactive({
	moduleKey: moduleKey,
	kind,
	scopeMode,
	scopeValue,
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			fetchChild: false,
			pageIndex: 0,
			pageSize: 10000,
		},
	},
	isSelection: true,
});
state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.pageNum - 1;
});
//重置查询条件
const onResetSearch = () => {
	state.tableData.param.name = '';
	state.tableData.param.no = '';
	onGetTableData(true);
};

// 初始化表格数据
const onGetTableData = async (gotoFirstPage: boolean = false) => {
	if (gotoFirstPage) {
		state.tableData.param.pageNum = 1;
	}
	state.tableData.loading = true;
	try {
		const res = await proxy.$api.base.user.getList(state.tableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.tableData.data = res.data;
		state.tableData.total = res.total;
	} finally {
		state.tableData.loading = false;
	}
};

const onPwdChanggeEdit = (id: number) => {
	pwdChanggeEditDlgRef.value.openDialog(state.kind, id)
}
// 打开修改用户弹窗
const onModelEdit = (id: number) => {
	editDlgRef.value.openDialog(state.kind, id);
};
//打开查看数据弹窗

const onModelSee = (id: string, state: boolean) => {
	editDlgRef.value.openDialog(id, state);
};
// 删除用户
const onModelDel = (id: number) => {
	ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		state.tableData.loading = true;
		try {
			const res = await proxy.$api.erp.project.delete(id);
			if (res.errcode == 0) {
				onGetTableData();
			}
		} finally {
			state.tableData.loading = false;
		}
		return false;
	});
};
// 改变单页数量
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
};
// 改变页数
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.pageNum = val;
};
const isSeletionTime = (model) => {
	let isTime = false;
	if (
		model.BeginTime <= dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') &&
		dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') < model.FinishTime &&
		model.State == 0
	) {
		isTime = true;
	}
	return isTime;
};
const isEditTime = (model) => {
	let isTime = false;
	if (model.BeginTime > dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') && model.State == 0) {
		isTime = true;
	}
	return isTime;
};
const isSignUpTime = (model) => {
	let isTime = false;
	if (
		model.StartTime <= dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') &&
		dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') < model.EndTime &&
		model.State == 0
	) {
		isTime = true;
	}
	return isTime;
};
// 页面加载时
onMounted(() => {
	onGetTableData();
});

defineExpose({...toRefs(state)})

const { dateFormatYMDHM, dateFormat } = commonFunction();

</script>

<style scoped lang="scss">
</style>
