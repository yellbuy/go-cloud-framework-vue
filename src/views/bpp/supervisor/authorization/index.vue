<template>
	<div>
		<el-card>
			<el-row style="padding: 15px;">
				<el-col :span="24">
					<el-descriptions :column="2">
						<el-descriptions-item label="项目名称：">test</el-descriptions-item>
						<el-descriptions-item label="项目编号：">test</el-descriptions-item>
						<el-descriptions-item label="开标时间：">test</el-descriptions-item>
						<el-descriptions-item label="开标地点：">test</el-descriptions-item>
					</el-descriptions>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-card>
						<div style="font-size: 30px; text-align: center;">
							<h >监审授权书</h>
						</div>
						<div>
							<a>院方比选监审部门：</a>
						</div>
						<div>
							<a>本授权书声明，因为（胡xx）于项目（test）的评选时间（2024-08-08 10:59）无法到达现场进行评选监审，现授权（</a>
							<span>
								<el-form-item>
									<el-select v-model="projectLineIndex" placeholder="请选择专家" @change="">
										<el-option v-for="(item, index) in project.ProjectLineList" :key="index" :label="item.Name" :value="item.Id"/>
									</el-select>
								</el-form-item>
							</span>
							<a>代我于项目（test）评选时间（2024-08-08 10:59）完成现场评选监审事宜，并对该项目的评审报告检验合格后进行签章。</a>
						</div>
						<div>
							<a>特此委托</a>
						</div>
						<div>
							<a>授权人签名:胡xx</a>
						</div>
						<div>
							<a>授权日期：（系统生成）</a>
						</div>
						<div style="text-align: center;">
							<el-button style="width: 300px; height: 80px; font-size: 50px;" type="primary" @click="onOpenEdit">确认授权</el-button>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</el-card>
		<authorizationEdit ref="authorizationEditRef"/>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';
import authorizationEdit from './component/authorizationEdit.vue'
export default {
	name: 'authorizationSee',
	components: { authorizationEdit },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const authorizationEditRef = ref()
		const state: any = reactive({
			project: {},
			tableData: {
				data: [{Id:123 ,Name: "张三", CheckState: 1,VoteState: 1, VoteCount: 5, LeaderState: 1}],
				total: 0,
				loading: false,
				param: {
					mode: 2,
					current: 1,
					size: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
		});
		//获取项目品目信息
		const onGetTableData = async (isState: boolean) => {
			if (isState) {
				let params = {};
				state.project = store.state.project.project;
				state.tableData.data = [];
				try {
					params.projectId = store.state.project.projectId;
					params.state = 1;
					//重新请求数据

					const res = await proxy.$api.erp.projectcompany.comparisonList(params);
					//获取存储的项目数据
					if (res.errcode != 0) {
						return;
					}
					state.tableData.data = res.data;
				} finally {
				}
			}
		};

		const onModelSave = async (Id: Number) => {
			if (!Id) {
				ElMessage.error('请选择人员进行推荐！');
				return;
			}
			ElMessageBox.confirm(`确定要推荐他为组长吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				// try {
				// 	const res = await proxy.$api.common.enterprise.audit(state.ruleForm);
				// 	if (res.errcode != 0) {
				// 		return;
				// 	}
				// 	state.ruleForm.AuditState = 0;
				// } finally {
				// 	onGetTableData(true);
				// }
				return false;
			});
		};

		// 打开弹窗
		const onOpenEdit = () => {
			authorizationEditRef.value.openDialog();
		};

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.size = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
		};

		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			authorizationEditRef,
			onOpenEdit,
			onGetTableData,
			onHandleSizeChange,
			onHandleCurrentChange,
			onModelSave,
			t,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
