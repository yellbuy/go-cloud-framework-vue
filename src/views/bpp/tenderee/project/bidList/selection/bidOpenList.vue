<template>
	<div>
		<el-row>
			<el-col :span="24">
				<div style="text-align: center;font-size: 30px; padding-bottom: 15px;">
					<h>开标一览表</h>
				</div>
			</el-col>
			<el-col :span="24">
				<el-descriptions >
					<el-descriptions-item label="开标地点：">{{ state.projectForm.BidOpenTime }}</el-descriptions-item>
					<el-descriptions-item label="时间：">{{ state.projectForm.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
					<el-table-column type="index" label="序号" align="right" width="70" fixed />
					<el-table-column prop="Name" label="比选人名单" width="120" show-overflow-tooltip></el-table-column>
					<el-table-column prop="State" label="电子标书是否递交" width="150" show-overflow-tooltip>
						<template #default="scope">
							<span v-if="scope.row.LineState == 0">是</span>
							<span v-else-if="scope.row.LineState == 1">否</span>
						</template>
					</el-table-column>
					<el-table-column prop="TrustDeed" label="法定代表证明及授权委托书" show-overflow-tooltip></el-table-column>
					<el-table-column prop="Quotation" label="比选总报价" width="120" show-overflow-tooltip></el-table-column>
					<el-table-column prop="BidAnnouncement" label="唱标" width="120" show-overflow-tooltip></el-table-column>
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
	onGetProjectLineTableData()
};

//	关闭页面
const closePage = async () => {
	state.projectForm = {}
	state.tableData.data = []
}

//	获取标的物项目信息
const onGetProjectLineTableData = async () => {
	//	获取标的物项目信息
	state.tableData.loading = true;
	try {
		state.tableData.param.projectId = state.projectForm.Id
		const res = await proxy.$api.erp.projectline.getListByScope("bid", 0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.tableData.data = res.data;
		state.tableData.total = res.total;
	} finally {
		state.tableData.loading = false;
	}
};

//获取项目品目信息
const getCompanyList = async () => {
	state.tableData.loading = true
	try {
		//重新请求数据
		const res = await proxy.$api.erp.projectcompany.getListByScope("bid", 0, 0, state.tableData.param);
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
