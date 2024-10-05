<template>
	<div>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<div style="float: left; padding-bottom: 15px;">
					<el-button type="primary" @click="openDialog">添加人员</el-button>
					<el-button text bg type="info" @click="state.isShowDialog = true">批量发送秘钥</el-button>
				</div>
			</el-col>
		</el-row>
		<el-card style="margin-top: 20px; margin-left: 10px; margin-right: 10px; background-color: #DAEFFF;" v-for="(item, index) in state.tableData.data" :key="index" :value="item">
			<el-row>
				<el-col :span="21">
					<el-row>
						<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
							<el-form-item label="角色名称：" prop="Role">{{item.User.Role}}</el-form-item>
						</el-col>
						<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
							<el-form-item label="评标范围：" prop="BidScope">{{item.User.Remark}}</el-form-item>
						</el-col>
						<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
							<el-form-item label="姓名：" prop="Name">{{item.User.Name}}</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
							<el-form-item label="部门职位：" prop="Department">{{item.User.Position}}</el-form-item>
						</el-col>
						<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
							<el-form-item label="秘钥状态：" prop="KeyStatus">
								<a v-if="item.KeyStatus===0">已发送</a>
								<a v-else-if="item.KeyStatus===1">未发送</a>
							</el-form-item>
						</el-col>
						<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
							<el-form-item label="联系电话：" prop="Phone">{{item.User.Mobile}}</el-form-item>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="3" style="display: flex; align-items: center; justify-content: end;">
					<span>
						<el-button type="primary" @click="onModelDel(index)">删除</el-button>
						<el-button type="primary">发送秘钥</el-button>
					</span>
				</el-col>
			</el-row>
		</el-card>
		<el-pagination
			small
			@size-change="onHandleSizeChange"
			@current-change="onHandleCurrentChange"
			class="mt15"
			:page-sizes="[10, 20, 30]"
			v-model:current-page="state.tableData.param.current"
			background
			v-model:page-size="state.tableData.param.pageSize"
			layout="->, total, sizes, prev, pager, next, jumper"
			:total="state.tableData.total">
		</el-pagination>
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="25%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" label-suffix="：" size="small" label-width="130px" v-loading="state.loading">
				<el-form-item label="角色名称" prop="Roles">
					<el-radio-group v-model="state.ruleForm.Roles">
						<el-radio :label="0">评审</el-radio>
						<el-radio :label="1">监审</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="专家姓名" prop="NameId">
					<el-select v-model="state.ruleForm.NameId" class="m-2" placeholder="请选择专家姓名" clearable>
						<el-option v-for="(item, index) in state.expertList" :key="index" :label="item.Name" :value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button text bg @click="closeDialog">{{ $t('message.action.cancel') }}</el-button>
					<el-button text bg type="primary" @click="onSubmit()">{{ $t('message.action.save') }}</el-button>
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
	vipList: [],
	expertList: [],
	title: '添加人员',
	projectForm: {},
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
			projectId: "0",
			categoryId: null,
		},
	},
	isShowDialog: false,
	ruleForm: {
		Roles: null,
		NameId: '',
	},
	state: true,
});

const rules = reactive({
	isShowDialog: false,
	Roles: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	NameId: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
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
const getExpertVipList = async () => {
	state.tableData.loading = true
	try {
		const res = await proxy.$api.erp.project.expertList(state.project.Id);
		if (res.errcode == 0) {
			state.tableData.data = res.data;
		}
	} finally {
		state.tableData.loading = false
	}
};

//	获取专家列表
const getExpertList = async () => {
	state.state = false;
	if (state.project.BeginTime > dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') && state.project.State == 0) {
		state.state = true;
	}
	state.tableData.loading = true;
	try {
		const res = await proxy.$api.base.user.getList({isExternal: 1, pageIndex: 0, pageSize: 10000});
		if (res.errcode == 0) {
			state.expertList = res.data;
		}
	} finally {
	}
};

//	打开编辑窗口
const openDialog = async () => {
	state.isShowDialog = true;
	getExpertList()
};

const closeDialog = () => {
	state.ruleForm = {Roles: null, NameId: '',},
	proxy.$refs.ruleFormRef.resetFields();
	state.loading = false;
	state.isShowDialog = false;

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
				projectId: state.project.Id,
				SupervisionId: newModel.SupervisionId,
				ExpertIds: newModel.list.toString(),
			};
			try {
				const res = await proxy.$api.erp.project.expertSave(model);
				if (res.errcode != 0) {
					return;
				}
				closeDialog();
				getExpertVipList();
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
			projectId: state.project.Id,
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

// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
};

// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.current = val;
};

const { dateFormat } = commonFunction();

// 页面加载时
onMounted(() => {
	getExpertVipList()
});

defineExpose({openPage, closePage})

</script>

<style scoped lang="scss">
</style>
