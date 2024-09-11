<template>
	<div>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<div style="float: left; padding-bottom: 15px;">
					<el-button type="primary" @click="isShowDialog = true">添加人员</el-button>
					<el-button text bg type="info" @click="isShowDialog = true">批量发送秘钥</el-button>
				</div>
			</el-col>
		</el-row>
		<el-card style="margin-top: 20px; margin-left: 10px; margin-right: 10px; background-color: #DAEFFF;" v-for="(item, index) in tableData.data">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-suffix="：" size="small" label-width="120px" v-loading="loading">
				<el-row>
					<el-col :span="21">
						<el-row>
							<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
								<el-form-item label="角色名称" prop="Role">{{item.Role}}</el-form-item>
							</el-col>
							<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
								<el-form-item label="评标范围" prop="BidScope">{{item.BidScope}}</el-form-item>
							</el-col>
							<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
								<el-form-item label="姓名" prop="Name">{{item.Name}}</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
								<el-form-item label="部门职位" prop="Department">{{item.Department}}</el-form-item>
							</el-col>
							<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
								<el-form-item label="秘钥状态" prop="KeyStatus">
									<a v-if="item.KeyStatus===0">已发送</a>
									<a v-else-if="item.KeyStatus===1">未发送</a>
								</el-form-item>
							</el-col>
							<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
								<el-form-item label="联系电话" prop="Phone">{{item.Phone}}</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="3" style="display: flex; align-items: center; justify-content: end;">
						<span>
							<el-button type="primary">删除</el-button>
							<el-button type="primary">发送秘钥</el-button>
						</span>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-pagination
			small
			@size-change="onHandleSizeChange"
			@current-change="onHandleCurrentChange"
			class="mt15"
			:page-sizes="[10, 20, 30]"
			v-model:current-page="tableData.param.current"
			background
			v-model:page-size="tableData.param.pageSize"
			layout="->, total, sizes, prev, pager, next, jumper"
			:total="tableData.total">
		</el-pagination>
		<el-dialog :title="title" v-model="isShowDialog" width="25%" :before-close="closeDialog">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-suffix="：" size="small" label-width="130px" v-loading="loading">
				<el-form-item label="角色名称" prop="Roles">
					<el-radio-group v-model="ruleForm.Roles">
						<el-radio :label="0">评审</el-radio>
						<el-radio :label="1">监审</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="专家姓名" prop="NameId">
					<el-select v-model="ruleForm.NameId" class="m-2" placeholder="请选择专家姓名" clearable>
						<el-option v-for="(item, index) in vipList" :key="index" :label="item.Name" :value="item.Id"/>
					</el-select>
				</el-form-item>
				<el-form-item label="评标范围" prop="NameId"/>
				<el-form-item label="所属部门" prop="NameId"/>
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

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
// import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'expertEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			vipList: [],
			expertList: [],
			title: '添加人员',
			tableData: {
				data: [
					{Role: "评委", BidScope: "器械，耗材，网络",Name: "张三", Department: "设备科", KeyStatus: 1, Phone: "13344445555"},
					{Role: "专家", BidScope: "网络，耗材",Name: "李四", Department: "设备科", KeyStatus: 0, Phone: "13566667777"}
				],
				total: 0,
				loading: true,
				param: {
					mode: 1,
					current: 1,
					pageSize: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
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
				const res = await proxy.$api.base.user.getVipList(1, 0, 1, 2, { current: 1, pageSize: 10000 });
				// const res = await proxy.$api.base.user.getList(state.tableData.param);
				if (res.errcode == 0) {
					state.vipList = res.data;
				}
			} finally {
			}
		};
		const getExpertList = async (isState: boolean) => {
			state.state = false;
			if (store.state.project.project.BeginTime > dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') && store.state.project.project.State == 0) {
				state.state = true;
			}
			state.tableData.loading = true;
			try {
				if (isState) {
					const res = await proxy.$api.erp.project.expertList(store.state.project.projectId);
					if (res.errcode == 0) {
						state.tableData.data = res.data;
					}
				}
			} finally {
				state.tableData.loading = false;
			}
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
			// getVipList();
		});

		return {
			proxy,
			rules,
			onHandleSizeChange,
			onHandleCurrentChange,
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
