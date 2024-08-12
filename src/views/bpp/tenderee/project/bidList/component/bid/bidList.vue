<template>
	<div>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<div style="text-align: center;font-size: 30px; padding-bottom: 15px;">
					<h>开标一览表</h>
				</div>
			</el-col>
			<el-col :span="24">
				<el-descriptions >
					<el-descriptions-item label="开标地点：">test</el-descriptions-item>
					<el-descriptions-item label="时间：">test</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
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
					v-model:current-page="tableData.param.current"
					background
					v-model:page-size="tableData.param.pageSize"
					layout="->, total, sizes, prev, pager, next, jumper"
					:total="tableData.total"/>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';
export default {
	name: 'companyEdit',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			project: {},
			tableData: {
				data: [{Name: "张三", State: 1, TrustDeed: "TestTest", Quotation: "189000", BidAnnouncement:"Test"}],
				total: 0,
				loading: false,
				param: {
					mode: 2,
					current: 1,
					pageSize: 20,
					projectId: 0,
					categoryId: null,
					name: '',
				},
			},
		});
		//获取项目品目信息
		const getCompanyList = async (isState: boolean) => {
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

		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.current = val;
		};

		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			getCompanyList,
			onHandleSizeChange,
			onHandleCurrentChange,
			t,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
