<template>
	<div>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<div style="float: left; padding-bottom: 15px;">
					<el-button type="primary" @click="openDialog">添加人员</el-button>
					<!-- <el-button text bg type="info" @click="state.isShowDialog = true">批量发送秘钥</el-button> -->
				</div>
			</el-col>
		</el-row>
		<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-180)" border stripe highlight-current-row>
			<el-table-column type="index" label="序号" align="right" width="60" show-overflow-tooltip fixed />
			<el-table-column prop="Name" label="专家姓名" width="150" show-overflow-tooltip fixed/>
			<el-table-column prop="Mobile" label="联系电话" width="150" align="right" show-overflow-tooltip/>
			<el-table-column prop="Roles" label="角色名称" width="150" show-overflow-tooltip>
				<template #default="scope">
					<span v-if="scope.row.Roles==0">评审</span>
					<span v-else-if="scope.row.Roles==1">监审</span>
				</template>
			</el-table-column>
			<el-table-column prop="Position" label="部门职位" width="150" show-overflow-tooltip/>
			<el-table-column prop="Remark" label="评标范围" show-overflow-tooltip/>
			<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(70)" fixed="right">
				<template #default="scope">
					<el-button type="danger" @click="onModelDel(scope.row.Id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="25%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" label-suffix="：" size="small" label-width="130px" v-loading="state.loading">
				<el-form-item label="角色名称" prop="Roles">
					<el-radio-group v-model="state.ruleForm.Roles">
						<el-radio :label="0">评审</el-radio>
						<el-radio :label="1">监审</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="专家姓名" prop="ExpertUid">
					<el-select v-model="state.ruleForm.ExpertUid" class="m-2" placeholder="请选择专家姓名" clearable>
						<el-option v-for="(item, index) in state.expertTableData.data" :key="index" :label="item.Name" :value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="info" @click="closeDialog">取消</el-button>
					<el-button type="primary" @click="onSubmit">保存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
// import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	isShowPage: false,
	title: '添加人员',
	expertTableData: {
		data: [],
		loading: false,
		param: {
			isExternal: 1, 
			pageIndex: 0, 
			pageSize: 10000
		},
	},
	tableData: {
		data: [],
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
			projectId: '0',
		},
	},
	isShowDialog: false,
	loading: false,
	ruleForm: {
		ProjectId: '',
		ExpertUid: '',
		Roles: null,
		Kind: 'bid'
	},
});

const rules = reactive({
	isShowDialog: false,
	Roles: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	ExpertUid: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//	打开页面
const openPage = async (row: {}) => {
	state.isShowPage = true
	state.projectForm = row
};

//	关闭页面
const closePage = async () => {
	state.projectForm = {}
	state.tableData.data = []
	state.isShowPage = false
}

//	获取该项目专家列表
const getProjectExpertList = async () => {
	state.tableData.loading = true
	try {
		state.tableData.param.projectId = state.project.Id
		const res = await proxy.$api.erp.projectexpert.getListByScope("bid", 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return
		}
		state.tableData.data = res.data;
		state.tableData.total = res.total
	} finally {
		state.tableData.loading = false
	}
};

//	获取专家列表
const getExpertList = async () => {
	state.expertTableData.loading = true;
	try {
		const res = await proxy.$api.base.user.getList(state.expertTableData.param);
		if (res.errcode != 0) {
			return
		}
		state.expertTableData.data = res.data;
	} finally {
		state.expertTableData.loading = false;
	}
};

//	打开编辑窗口
const openDialog = async () => {
	state.isShowDialog = true;
	getExpertList()
};

const closeDialog = () => {
	state.loading = false;
	state.isShowDialog = false;
	state.ruleForm.ProjectId = '';
	state.ruleForm.ExpertUid = '',
	state.ruleForm.Roles = null,
	state.ruleForm.Kind = 'bid'
	getProjectExpertList()
};

const onSubmit = async () => {
	proxy.$refs.ruleFormRef.validate(async (valid: any) => {
		if (valid) {
			try {
				state.ruleForm.ProjectId = state.project.Id
				const res = await proxy.$api.erp.projectexpert.save(state.ruleForm);
				if (res.errcode != 0) {
					closeDialog();
					return;
				}
				closeDialog();
				getProjectExpertList();
			} finally {
			}
		} else {
			return false;
		}
	});
};

const onModelDel = (id: string) => {
	ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectexpert.delete(id);
			if (res.errcode != 0) {
				return;
			}
			getProjectExpertList();
		} finally {
		}
		return false;
	});
}

const { dateFormat } = commonFunction();

// 页面加载时
onMounted(() => {
	getProjectExpertList()
});

defineExpose({openPage, closePage})

</script>

<style scoped lang="scss">
</style>
