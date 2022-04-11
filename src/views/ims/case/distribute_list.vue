<template>
	<div class="ims-case-firstaudit-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item :label="'关键字：'">
						<el-input placeholder="请输入关键字查询" v-model="tableData.param.username"> </el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<elementRefreshLeft />
							</el-icon>
							&#8197;{{ $t('message.action.reset') }}
						</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<elementSearch />
							</el-icon>
							&#8197;{{ $t('message.action.search') }}
						</el-button>
					</el-form-item>
					<el-form-item>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData.data"  :span-method="objectSpanMethod"
				v-loading="tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-75)"
				border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed/>
				<el-table-column prop="No" label="报案号" width="100"  fixed></el-table-column>
				<el-table-column prop="Tenant" label="委托单位" width="110" ></el-table-column>
				<el-table-column prop="CreateBy" label="委托人" width="70" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Tel" label="委托人电话" width="110" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Content" label="简要案情" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Sn" label="编号" width="130" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Name" label="伤者姓名" width="80" align="center"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="CaseMode" label="委托类型" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain" v-if="scope.row.CaseMode==1">估损</el-tag>
						<el-tag type="success" effect="plain" v-else-if="scope.row.CaseMode==2">核损</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.CaseMode==10">鉴定</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="CaseType" label="分类" width="100" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain" v-if="scope.row.CaseMode==1">门诊就医</el-tag>
						<el-tag type="success" effect="plain" v-else-if="scope.row.CaseMode==2">住院非手续</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.CaseMode==3">住院手续</el-tag>
						<el-tag type="error" effect="plain" v-else-if="scope.row.CaseMode==10">死亡</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="ExpertAuditBy" label="专家姓名" width="80" align="center" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="ExpertAuditTime" label="完成时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="ExpertReviewBy" label="审核专家" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template #default="scope">
						<el-button plain  type="primary" v-if="scope.row.ExpertAuditState==1" @click="onOpenuserEdit(scope.row)" v-auth:[moduleKey]="'btn.UserEdit'">
							<el-icon>
								<elementEdit />
							</el-icon>
							&#8197;{{ $t('message.action.distribute') }}
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
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<dlgEdit ref="dlgEditRef" />
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { toRefs, reactive, effect,onMounted, ref, computed,getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import dlgEdit from './component/distributeEdit.vue';
import other from '/@/utils/other';
export default {
	name: 'baseUsers',
	components: { dlgEdit },
	setup() {
		const moduleKey='api_sys_org';
		const { proxy } = getCurrentInstance() as any;
		const userEditRef = ref();
		const state: any = reactive({
			moduleKey:moduleKey,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					username:"",
					name:"",
					pageNum: 1,
					pageSize: 20,
				},
			},
		});
		state.tableData.param.pageIndex=computed(()=>{
			return state.tableData.param.pageNum-1;
		})
		//重置查询条件
		const onResetSearch=()=>{
			state.tableData.param.username="";
			state.tableData.param.name="";
			onGetTableData(true)
		}
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.pageNum+1;
		// })
		

		// 初始化表格数据
		const onGetTableData = (gotoFirstPage:boolean=false) => {
			if(gotoFirstPage){
				state.tableData.param.pageNum=1;
			}
			state.tableData.loading=true;
			state.tableData.data =[
				{Id:'1',No:'9083603362020000248',CaseId:'1',Tenant:'平安保险北京海淀支公司',CreateBy:'王建国',Tel:'010-56521252',Name:'王江',
				Content:'机动车撞电瓶车，电瓶车主腿骨折',Sn:'ZR202201240001',CaseMode:1,ExpertAuditState:1},
				{Id:'2',No:'9083603362020000248',CaseId:'1',Tenant:'平安保险北京海淀支公司',Tel:'010-56921212',Name:'林峰',
				Content:'机动车撞电瓶车，电瓶车主腿骨折',Sn:'ZR202201240002',CaseMode:2,ExpertAuditState:0}
			];
			state.tableData.total=2;
			state.tableData.loading=false;
			// getUserList(state.tableData.param).then((res)=>{
			// 	state.tableData.loading=false;
			// 	if(res.errcode!=0){
			// 		return;
			// 	}
			// 	state.tableData.data = res.data;
			// 	state.tableData.total = res.total;
			// }).catch(() => {
			// 	state.tableData.loading=false;
			// });
			
		};
		interface SpanMethodProps {
			row: any
			column: TableColumnCtx<any>
			rowIndex: number
			columnIndex: number
		}
		const objectSpanMethod = ({
			row,
			column,
			rowIndex,
			columnIndex,
		}: SpanMethodProps) => {
			console.log("columnIndex:",columnIndex)
			if(columnIndex>=0 && columnIndex<6){
				if(rowIndex==0){
					return [2,1]
				} else{
					return [0,0]
				}
			}
		}
		// 打开新增用户弹窗
		const onOpenAddUser = () => {
			userEditRef.value.openDialog({});
		};
		// 打开修改用户弹窗
		const onOpenuserEdit = (row: Object) => {
			userEditRef.value.openDialog(row);
		};
		// 删除记录
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.Sn}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading=true;
				try{
					const res = await proxy.$api.ims.casepersonline.delete(row.Id);
					if(res.errcode == 0){
						onGetTableData();
					}
				} finally{
					state.tableData.loading=false;
				}
				return false;
			}).catch((err) => {
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

		const { dateFormatYMDHM } = commonFunction();
	
		return {
			proxy,
			userEditRef,
			objectSpanMethod,
			onGetTableData,
			onResetSearch,
			onOpenAddUser,
			onOpenuserEdit,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			dateFormatYMDHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
