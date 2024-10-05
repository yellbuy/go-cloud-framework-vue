<template>
	<div>
		<el-row>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-form-item label="请选择当前项目包号：">
					<el-select v-model="state.projectLineIndex" placeholder="请选择" @change="changeLine">
						<el-option
							v-if="state.project.ProjectLineList && state.project.ProjectLineList.length > 0"
							v-for="item in state.project.ProjectLineList"
							:key="item.Id"
							:label="item.Name"
							:value="item.Id"/>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.project.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.project.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-240)" border stripe highlight-current-row>
			<el-table-column type="index" label="序号" align="right" width="70" fixed />
			<el-table-column prop="CompanyName" label="投标方名称" show-overflow-tooltip fixed />
			<el-table-column prop="ReviewPrice" label="投标评审价（元）" show-overflow-tooltip align="right" />
			<el-table-column prop="PriceScore" label="报价得分" show-overflow-tooltip align="right" />
			<el-table-column prop="TechnicalScore" label="技术得分" show-overflow-tooltip align="right" />
			<el-table-column prop="GatherScore" label="最终得分" show-overflow-tooltip align="right" />
		</el-table>
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
			:total="state.tableData.total"/>
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
	projectLineIndex: '',
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
	nextKind: 'recommend',
	nextKind2: 'signature',
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
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
	state.isShowPage = false
};

const GetSignUpList = async () => {
	state.tableData.loading = true;
	try {
		const res = await proxy.$api.erp.projectreview.expertList(state.project.Id, { kind: state.nextKind2 });
		if (res.errcode == 0) {
			state.tableData.data = res.data;
			state.tableData.total = res.total;
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
			});
			if (res.errcode == 0) {
				ElMessage.success('操作成功');
				GetSignUpList();
			}
		});
	} finally {
	}
};

const onLeader = async (row) => {
	try {
		ElMessageBox.confirm(`确定要推荐吗?`, '提示', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		}).then(async () => {
			let data = JSON.parse(JSON.stringify(row));
			data.IsLeader = 1;
			const res = await proxy.$api.erp.projectreview.expertGatherSave(state.project.Id, {
				Kind: state.nextKind,
				NextKind: state.nextKind2,
				ProjectReview: data,
			});
			if (res.errcode == 0) {
				ElMessage.success('操作成功');
				GetSignUpList();
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
				GetSignUpList();
			}
		});
	} finally {
	}
};

// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
};

// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.current = val;
};

// 页面加载时
onMounted(() => {
	GetSignUpList()
});

defineExpose({openPage, closePage})
</script>

<style scoped lang="scss"></style>
