<template>
	<div>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.project.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.project.Location }}</el-descriptions-item>
					<el-descriptions-item label="当前项目包号：">
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
		<el-row>
			<el-col :span="24">
				<div style="text-align: center;font-size: 20px; padding-bottom: 15px;">
					<h>报价得分表</h>
				</div>
			</el-col>
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-260)" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" show-overflow-tooltip fixed />
					<el-table-column prop="Name" label="供应商名称" show-overflow-tooltip/>
					<el-table-column prop="Name" label="总报价" width="150" show-overflow-tooltip/>
					<el-table-column prop="Name" label="最终评审报价" width="150" show-overflow-tooltip/>
					<el-table-column prop="Name" label="价格得分" width="150" show-overflow-tooltip/>
				</el-table>
			</el-col>
		</el-row>
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
import StatAge from '/@/views/hcis/healthRecord/statAge.vue';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	isShowPage: false,
	projectForm: {},
	tableData: {
		data: [],
		total: 0,
		loading: false,
	},
	expertList: [],
	uid: 0,
	kind: 'jjps',
	gatherKind: 'jjpsGather',
	isGather: 0,
	nextKind: 'gather',
	state: false,
});

//	打开页面
const openPage = async (row: {}) => {
	state.projectForm = row
	state.isShowPage = true
};

//	关闭页面
const closePage = async () => {
	state.projectForm = {}
	state.tableData.data = []
	state.expertList = []
	state.isShowPage = false
};

const getExpertList = async () => {
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
			uid: state.uid,
			isGather: state.isGather,
			settingKind: state.kind,
		});
		if (res.errcode == 0) {
			state.tableData.data = res.data;
		}
	} finally {
		state.tableData.loading = false;
	}
};

const GetSignUpList = async (isState: boolean, isShow: boolean) => {
	state.state = isShow;
	state.tableData.loading = true;
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
				ElMessage.success('操作成功');
				getExpertList();
			}
		});
	} finally {
	}
};

// 页面加载时
onMounted(() => {
	getExpertList()
});

defineExpose({openPage, closePage})
</script>

<style scoped lang="scss"></style>
