<template>
	<div>
		<el-row>
			<el-col :span="24">
				<div style="float: left; padding-bottom: 15px;">
					<el-button type="primary" @click="">公布投标人名单</el-button>
				</div>
			</el-col>
			<el-col :span="24">
				<el-descriptions :column="2" >
					<el-descriptions-item label="项目名称：">{{ state.projectForm.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.projectForm.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.projectForm.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.projectForm.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="CompanyName" label="单位名称" width="120" show-overflow-tooltip/>
					<el-table-column prop="State" label="投标状态" show-overflow-tooltip>
						<template #default="scope">
							<el-tag effect="info" v-if="scope.row.State == 0">未投标</el-tag>
							<el-tag effect="success" v-else-if="scope.row.State == 1">已投标</el-tag>
							<el-tag effect="success" v-else-if="scope.row.State == 2">评审完成</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="BiddingTime" label="投标文件送达时间" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.BiddingTime > '0001.01.01 00:00:00'">{{ scope.row.BiddingTime }}</span>
							<span v-else></span>
						</template>
					</el-table-column>
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
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, computed, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	projectForm: {},
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

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});

//	打开页面
const openPage = async (data: {}) => {
	state.projectForm = data
	getCompanyList()
};

//	关闭页面
const closePage = async () => {
	state.projectForm = {}
	state.tableData.data = []
}

//获取投标人名单
const getCompanyList = async () => {
	state.tableData.loading = true
	try {
		//重新请求数据
		state.tableData.param.projectId = state.projectForm.Id
		const res = await proxy.$api.erp.projectcompany.signUpList(state.tableData.param);
		//获取存储的项目数据
		if (res.errcode != 0) {
			return;
		}
		state.tableData.data = res.data;
		state.tableData.total = res.total
	} finally {
		state.tableData.loading = false
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

});

defineExpose({openPage, closePage})

</script>

<style scoped lang="scss">
</style>
