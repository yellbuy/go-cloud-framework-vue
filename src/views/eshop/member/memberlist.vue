<template>
	<div class="ims-case-firstaudit-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="80px" :inline="true">
					<el-form-item :label="'类型：'">
						<el-select v-model="tableData.param.state" placeholder="请选择" style="width: 90px">
							<el-option v-for="item in kindData" :key="item.Id" :label="item.Name" :value="item.Id" />
						</el-select>
					</el-form-item>
					<el-form-item :label="'真实姓名：'">
						<el-input placeholder="真实姓名" v-model="tableData.param.name"> </el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<RefreshLeft />
							</el-icon>
							&#8197;{{ $t('message.action.reset') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
					</el-form-item>
					<el-form-item> </el-form-item>
				</el-form>
			</div>
			<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				style="width: 100%"
				size="small"
				:height="proxy.$calcMainHeight(-125)"
				border
				stripe
				highlight-current-row
			>
				<el-table-column type="index" label="序号" width="50" fixed />
				<el-table-column prop="Avatar" label="头像" align="center" width="70" fixed>
					<template #default="scope">
						<imageUrl :ids="scope.row.Id" :baseUrl="baseUrl"></imageUrl>
						<!-- <el-image style="width: 50px; height: 50px" :src="'/static/img/avatar/user/' + scope.row.Uid + '.png'" fit="cover" /> -->
					</template>
				</el-table-column>
				<el-table-column prop="Nickname" label="昵称" width="110" fixed></el-table-column>
				<el-table-column prop="Id" label="会员ID" width="200" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Point" label="H币" width="100" align="right" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="State" label="状态" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="warning" effect="plain" v-if="scope.row.State == 0">未认证</el-tag>
						<el-tag type="success" effect="plain" v-else-if="scope.row.State == 1">认证通过</el-tag>
						<el-tag type="danger" effect="plain" v-else-if="scope.row.State == 2">未通过</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Name" label="姓名" width="115" align="left" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="LoginTime" label="最后登录" width="115" align="left" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="CreateTime" label="创建时间" width="115" align="left" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="Username" label="登录名" width="200" align="left" show-overflow-tooltip> </el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
					<template #default="scope">
						<el-button bg type="primary" v-auth:[moduleKey]="'btn.Notify'" @click="onOpenEditDlg('notify', scope.row)">
							&#8197;{{ $t('message.action.notice') }}
						</el-button>
						<el-button bg type="primary" v-auth:[moduleKey]="'btn.Integral'" @click="onOpenEditDlg('currency', scope.row)">
							&#8197;{{ $t('message.action.currency') }}
						</el-button>
						<el-button text bg type="primary" v-auth:[moduleKey]="'btn.Edit'" @click="onOpenEditDlg('edit', scope.row)">
							<el-icon><Edit /></el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button bg type="danger" v-auth:[moduleKey]="'btn.Delete'" @click="deleteRow(scope.row)">
							<el-icon><Delete /></el-icon>
							&#8197;{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<dlgEdit ref="dlgEditRef" />
		<dlgCurrency ref="dlgCurrencyRef" />
		<dlgNotify ref="dlgNotifyRef" />
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';

import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import dlgEdit from './component/edit.vue';
import dlgCurrency from './component/currency.vue';
import dlgNotify from './component/notify.vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import imageUrl from '/@/components/image/url.vue';
export default {
	name: 'memberlist',
	components: { imageUrl, dlgEdit, dlgCurrency, dlgNotify },
	setup() {
		const route = useRoute();
		const kind = route.params.kind;
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = 'api_eshop_member_list';
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const dlgEditRef = ref();
		const dlgCurrencyRef = ref();
		const dlgNotifyRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			kind,
			scopeMode,
			scopeValue,
			baseUrl: '/static/img/avatar/user/',
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					state: -1,
					name: '',
				},
			},
			expertAuditUids: [],
			kindData: [
				{ Id: -2, Name: '所有状态' },
				{
					Id: 0,
					Name: '未认证',
				},
				{
					Id: 1,
					Name: '认证通过',
				},
				{
					Id: -1,
					Name: '认证未通过',
				},
			],
		});
		state.tableData.param.pageIndex = computed(() => {
			return state.tableData.param.pageNum - 1;
		});

		//重置查询条件
		const onResetSearch = () => {
			state.tableData.param.state = -2;
			state.tableData.param.name = '';
			onGetTableData(true);
		};
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.pageNum+1;
		// })
		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			state.tableData.data = [];
			try {
				const res = await proxy.$api.eshop.member.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.tableData.param);
				if (res.errcode !== 0) {
					return;
				}
				state.tableData.total = res.total;
				state.tableData.data = res.data;
			} finally {
				state.tableData.loading = false;
			}
		};

		// 打开修改弹窗
		const onOpenEditDlg = async (kind: string, row: Object) => {
			console.log(row);
			const res = await proxy.$api.eshop.member.getById(row.Id);
			if (res.errcode == 0) {
				switch (kind) {
					case 'edit':
						dlgEditRef.value.openDialog(res.data);
						break;
					case 'notify':
						dlgNotifyRef.value.openDialog(res.data);
						break;
					case 'currency':
						dlgCurrencyRef.value.openDialog(res.data);
						break;
					default:
						break;
				}
			}
		};
		const deleteRow = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.Nickname}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading = true;
				try {
					const res = await proxy.$api.eshop.member.delete(row.Id);
					if (res.errcode == 0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			onGetTableData();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
			onGetTableData();
		};
		// 页面加载时
		onMounted(() => {
			onGetTableData();
		});

		const { dateFormatYMDHM, scale2Format } = commonFunction();

		return {
			proxy,
			dlgEditRef,
			dlgNotifyRef,
			dlgCurrencyRef,
			onGetTableData,
			onResetSearch,
			deleteRow,
			onHandleSizeChange,
			onHandleCurrentChange,
			onOpenEditDlg,
			scale2Format,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
