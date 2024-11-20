<template>
	<div>
		<el-card>
			<el-row style="padding: 15px;">
				<el-col :span="24">
					<el-form-item label="选择参与项目：" prop="Id">
						<el-select v-model="state.projectId" filterable placeholder="请选择" @change="selectProject">
							<el-option v-for="(item, index) in state.projectList" :key="index" :label="item.Name" :value="item.Id" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="padding: 15px;" v-if="state.projectId > 0">
				<el-col :span="24">
					<el-descriptions :column="2">
						<el-descriptions-item label="项目名称：">{{ state.projectForm.Name }}</el-descriptions-item>
						<el-descriptions-item label="项目编号：">{{ state.projectForm.No }}</el-descriptions-item>
						<el-descriptions-item label="评选时间：">{{ state.projectForm.ReviewTime }}</el-descriptions-item>
						<el-descriptions-item label="评选地点：">{{ state.projectForm.Location }}</el-descriptions-item>
					</el-descriptions>
				</el-col>
			</el-row>
			<el-row v-if="state.projectId > 0">
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
							<span >
								<el-select v-model="state.expertUid" placeholder="请选择" @change="" style="width: 300px;">
									<el-option v-for="(item, index) in state.projectExpertList" :key="index" :label="item.Name" :value="item.Uid"/>
								</el-select>
							</span>
							<a>）代我于项目（test）评选时间（2024-08-08 10:59）完成现场评选监审事宜，并对该项目的评审报告检验合格后进行签章。</a>
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

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';
import authorizationEdit from './component/authorizationEdit.vue'

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const authorizationEditRef = ref()
const state: any = reactive({
	projectId: '',
	projectList: [],
	projectForm: {},
	projectExpertList: [],
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
});

const selectProject = async (event) => {
    state.projectForm = state.projectList.find(item => item.Id === event);
	state.expertUid = null
	state.tableData.data = []
	getProjectExpertList()
};

//	获取专家参与的项目列表
const onGetProjectTableData = async () => {
	try {
		const res = await proxy.$api.erp.projectbid.expertParticipateList("bid", 0, 4);
		if (res.errcode != 0) {
			return;
		}
		state.projectList = res.data;
	} finally {
	}
};

//	获取该项目参与的所有专家列表
const getProjectExpertList = async () => {
	try {
		const res = await proxy.$api.erp.projectexpert.getListByScope("bid", 0, 0, {projectId: state.projectId, current: 1, pageSize: 20,});
		if (res.errcode != 0) {
			return
		}
		state.projectExpertList = res.data;
	} finally {
	}
};

const onModelSave = async (id: Number) => {
	if (!id) {
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

// 页面加载时
onMounted(() => {
	onGetProjectTableData()
});

</script>

<style scoped lang="scss">
</style>
