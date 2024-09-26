<template>
	<div v-if="state.isShowPage">
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.project.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.project.Location }}</el-descriptions-item>
					<el-descriptions-item label="请选择当前项目包号：">
						<el-select v-model="state.projectLineIndex" placeholder="请选择" @change="changeLine">
							<el-option
								v-for="item in state.project.ProjectLineList"
								:key="item.Id"
								:label="item.Name"
								:value="item.Id"/>
						</el-select>
					</el-descriptions-item>
					<el-descriptions-item label="评委编号：">
						<el-select v-model="state.projectLineIndex" placeholder="请选择" @change="changeLine">
							<el-option
								v-for="item in state.project.ProjectLineList"
								:key="item.Id"
								:label="item.Name"
								:value="item.Id"/>
						</el-select>
					</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-240)" border stripe highlight-current-row>
			<el-table-column type="index" label="序号" align="right" width="70" show-overflow-tooltip fixed />
			<el-table-column prop="SetLineContent" label="评分点" width="300" align="right" show-overflow-tooltip/>
			<el-table-column prop="SetLineStandard" label="评分标准" show-overflow-tooltip/>
			<el-table-column prop="MaxPoints" label="最高分" width="300" align="right" show-overflow-tooltip/>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
// import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import { Item } from 'ant-design-vue/lib/menu';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	isShowPage: false,
	tableData: {
		data: [],
		total: 0,
		loading: false,
	},
	signUpList: [],
	expertList: [],
	uid: 0,
	companyId: 0,
	ruleForm: {
		Roles: 0,
		NameId: '',
	},
	kind: 'jsps',
	gatherKind: 'jspsGather',
	isGather: 0,
	nextKind: 'jjps',
	state: false,
});

//	打开页面
const openPage = async () => {
	state.isShowPage = true
	getExpertList()
};

//	关闭页面
const closePage = async () => {
	state.isShowPage = false
};

const getNumber = async (numState: boolean) => {
	if (state.tableData.data.length > 0) {
		let TechnicalScore = 0;
		let SetLineTechnicalMaxScore = 0;
		state.tableData.data.forEach((item) => {
			if (item.IsGather < 1) {
				TechnicalScore += item.TechnicalScore;
				if (numState) {
					SetLineTechnicalMaxScore += item.SetLineTechnicalMaxScore;
				}
			} else {
				item.TechnicalScore = TechnicalScore;
				if (numState) {
					item.SetLineTechnicalMaxScore = SetLineTechnicalMaxScore;
				}
			}
		});
	}
};
const getExpertList = async () => {
	console.log('获取的数据', state.companyId);
	state.tableData.loading = true;
	try {
		let kind = state.kind;
		if (state.uid == 'gather') {
			state.isGather = 1;
			kind = state.gatherKind;
		} else {
			state.isGather = 0;
		}
		const res = await proxy.$api.erp.projectreview.expertGather(state.project.Id, {
			kind: kind,
			companyId: state.companyId,
			uid: state.uid,
			isGather: state.isGather,
			settingKind: state.kind,
		});
		if (res.errcode == 0) {
			state.tableData.data = res.data;
			getNumber(true);
		}
	} finally {
		state.tableData.loading = false;
	}
};

const GetSignUpList = async (isState: boolean, isShow: boolean) => {
	console.log('是否显示按钮', isShow);
	state.state = isShow;
	try {
		const res = await proxy.$api.erp.projectcompany.signUpList({ projectId: state.project.Id, state: 1, auditState: 1 });
		if (res.errcode != 0) {
			return;
		}
		state.signUpList = res.data;
		state.companyId = res.data[0].CompanyId;
		try {
			const expertRes = await proxy.$api.erp.project.expertList(state.project.Id);
			if (expertRes.errcode == 0) {
				state.expertList = [];
				expertRes.data.forEach((item) => {
					if (item.State <= 0) {
						state.expertList.push(item.User);
					}
				});
				state.expertList.push({
					Id: 'gather',
					Name: '汇总',
				});
				state.uid = state.expertList[0].Id;
			}
			if (isState) {
				getExpertList();
			}
		} finally {
			state.tableData.loading = false;
		}
		state.signUpData = res.data;
	} finally {
	}
};
const onSubmit = async () => {
	try {
		ElMessageBox.confirm(`确定要汇总吗?`, '提示', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		}).then(async () => {
			const res = await proxy.$api.erp.projectreview.expertGatherSave(state.project.Id, {
				Kind: state.kind,
				NextKind: state.nextKind,
				GatherKind: state.gatherKind,
			});
			if (res.errcode == 0) {
				ElMessage.success('操作成功');
				getExpertList();
			}
		});
	} finally {
	}
};
const onReturn = async () => {
	try {
		ElMessageBox.confirm(`确定要退回重评吗?`, '提示', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		}).then(async () => {
			const res = await proxy.$api.erp.projectreview.expertGatherReturn(state.project.Id);
			if (res.errcode == 0) {
				getExpertList();
			}
		});
	} finally {
	}
};

// 页面加载时
onMounted(() => {});

defineExpose({openPage, closePage})

</script>

<style scoped lang="scss"></style>
