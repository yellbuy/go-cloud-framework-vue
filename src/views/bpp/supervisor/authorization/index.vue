<template>
	<div>
		<el-card>
			<el-row style="padding: 15px;">
				<el-col :span="24">
					<el-descriptions :column="2">
						<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
						<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
						<el-descriptions-item label="开标时间：">{{ state.project.BidOpenTime }}</el-descriptions-item>
						<el-descriptions-item label="开标地点：">{{ state.project.Location }}</el-descriptions-item>
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
									<el-select v-model="state.ruleForm" placeholder="请选择专家" @change="" >
										<el-option v-for="(item, index) in state.expertList" :key="index" :label="item.User.Name" :value="item.User.Id"/>
									</el-select>

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
	project: store.state.project.project,
	expertList: [],
	ruleForm: {},
	tableData: {
		data: [],
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

//获取项目专家列表
const onGetExpertList = async () => {
	try {
		const res = await proxy.$api.erp.project.expertList(state.project.Id);
		if (res.errcode != 0) {
			return;
		}
		state.expertList = res.data;
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
	onGetExpertList()
});

</script>

<style scoped lang="scss">
</style>
