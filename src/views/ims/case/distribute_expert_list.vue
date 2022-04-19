<template>
	<div class="ims-case-firstaudit-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef"  :model="tableData.param" label-width="90px" :inline="true">
					<el-form-item :label="'关键字：'">
						<el-input  placeholder="请输入关键字查询" v-model="tableData.param.keyword"> </el-input>
					</el-form-item>
					<el-form-item>
						<el-button-group>
							<el-button :type="tableData.param.searchMode==1?'primary':'info'" @click="onChangeSearchMode(1)" plain>待审核</el-button>
							<el-button :type="tableData.param.searchMode==2?'primary':'info'" @click="onChangeSearchMode(2)" plain>已审核</el-button>
							<el-button :type="tableData.param.searchMode==0?'primary':'info'" @click="onChangeSearchMode(0)" plain>所有审核</el-button>
						</el-button-group>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="onResetSearch">
							<el-icon>
								<elementRefreshLeft />
							</el-icon>
							&#8197;{{ $t('message.action.reset') }}
						</el-button>
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
				v-loading="tableData.loading" style="width: 100%"  :height="proxy.$calcMainHeight(-75)"
				border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed/>
				<el-table-column prop="CaseNo" label="报案号" width="100"  fixed></el-table-column>
				<el-table-column prop="TName" label="委托单位" width="110" ></el-table-column>
				<el-table-column prop="UName" label="委托人" width="70" show-overflow-tooltip></el-table-column>
				<el-table-column prop="UTel" label="委托人电话" width="110" show-overflow-tooltip></el-table-column>
				<el-table-column prop="CaseContent" label="简要案情" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Sn" label="编号" width="130" show-overflow-tooltip></el-table-column>
				<el-table-column prop="PersonName" label="伤者姓名" width="80" align="center"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="CaseMode" label="委托类型" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain"  v-if="scope.row.CaseMode==1">估损</el-tag>
						<el-tag type="success" effect="plain"  v-else-if="scope.row.CaseMode==2">核损</el-tag>
						<el-tag type="warning" effect="plain"  v-else-if="scope.row.CaseMode==10">鉴定</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="CaseType" label="分类" width="100" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="primary" effect="plain"  v-if="scope.row.CaseType==1">门诊就医</el-tag>
						<el-tag type="success" effect="plain"  v-else-if="scope.row.CaseType==2">住院非手续</el-tag>
						<el-tag type="warning" effect="plain"  v-else-if="scope.row.CaseType==3">住院手续</el-tag>
						<el-tag type="danger" effect="plain"  v-else-if="scope.row.CaseType==10">死亡</el-tag>
					</template>
				</el-table-column>
				
				<el-table-column prop="ExpertAuditBy" label="专家姓名" width="80" align="center" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="ExpertAuditTime" label="完成时间" width="115" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="ExpertReviewBy" label="审核专家" width="80" show-overflow-tooltip>
				</el-table-column>
				<!-- <el-table-column prop="State" label="状态" width="60" align="center" fixed="right">
					<template #default="scope">
						<el-tag type="success" effect="plain"  v-if="scope.row.InsurerAuditState==10">通过</el-tag>
						<el-tag type="danger" effect="plain"  v-else-if="scope.row.InsurerAuditState==5">驳回</el-tag>
						<el-tag type="primary" effect="plain"  v-else-if="scope.row.InsurerAuditState>0">待审</el-tag>
					</template>
				</el-table-column> -->
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)" fixed="right">
					<template #default="scope">
						<el-button  plain  type="info" v-if="scope.row.InsurerAuditState>0" @click="onOpenEditDlg(false,scope.row)">
							<el-icon>
								<elementEdit />
							</el-icon>
							&#8197;{{ $t('message.action.see') }}
						</el-button>
						<el-button  plain  type="primary" v-if="(scope.row.ExpertAuditState>=1 && scope.row.ExpertAuditState<=3) || (scope.row.ExpertReviewState>=1 && scope.row.ExpertReviewState<=3)" @click="onOpenEditDlg(true,scope.row)" v-auth:[moduleKey]="'btn.AuditEdit'">
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
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<dlgEdit ref="dlgEditRef" :step="25" />
	</div>
</template>

<script lang="ts">
import commonFunction from '/@/utils/commonFunction';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { toRefs, reactive, effect,onMounted, ref, computed,getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import dlgEdit from './component/distributeExpertEdit.vue';
import other from '/@/utils/other';
export default {
	name: 'imsDistributeList',
	components: { dlgEdit },
	setup() {
		const moduleKey='api_ims_distribute';
		const { proxy } = getCurrentInstance() as any;
		const dlgEditRef = ref();
		const state: any = reactive({
			moduleKey:moduleKey,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					kind:"insurance",
					searchPage:10, // 1：保司二级审核，2：保司三级审核，5：制作专家，6：审核专家，10：平台
					searchMode:2, //0：所有，1：待审，2：已审，3：我审核的
					keyword:"",
					pageNum: 1,
					pageSize: 20,
				},
			},
		});
		state.tableData.param.pageIndex=computed(()=>{
			return state.tableData.param.pageNum-1;
		})

		const onChangeSearchMode=(mode:any)=>{
			if(state.tableData.param.searchMode==mode){
				return;
			}
			state.tableData.param.searchMode=mode;
			onGetTableData(true);
		}
		//重置查询条件
		const onResetSearch=()=>{
			state.tableData.param.keyword="";
			onGetTableData(true)
		}
		// effect(()=>{
		// 	state.tableData.param.pageIndex = state.tableData.param.pageNum+1;
		// })
		

		// 初始化表格数据
		const onGetTableData = async (gotoFirstPage:boolean=false) => {
			if(gotoFirstPage){
				state.tableData.param.pageNum=1;
			}
			state.tableData.loading=true;
			state.tableData.data =[];
			try{
				const res = await proxy.$api.ims.casepersonline.getList(state.tableData.param);
				if(res.errcode!=0){
					return;
				}
				state.tableData.total=res.total;
				let caseId="0";
				//表格合并
				for(const i in res.data){
					const index = Number.parseInt(i);
					const item=res.data[index];
					item.rowSpan=1;
					if(item.CaseId!=caseId){
						let curIndex = index;
						caseId=item.CaseId;
						while(++curIndex < res.data.length){
							if(caseId==res.data[curIndex].CaseId){
								item.rowSpan+=1
							} else {
								break;
							}
						}
					} else {
						item.rowSpan=0;
					}
					//console.log("item.rowSpan:",item.rowSpan)
				}
				state.tableData.data = res.data;
			}finally{
				state.tableData.loading=false;
			}
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
			if(columnIndex>=1 && columnIndex<6){
				//console.log("row.rowSpan：",row.rowSpan)
				if(row.rowSpan>0){
					return [row.rowSpan,1]
				} else{
					return [0,0]
				}
			}
		}
		
		// 打开修改弹窗
		const onOpenEditDlg = async (editMode:Boolean,row: Object) => {
			const res = await proxy.$api.ims.casepersonline.getById(row.Id);
			if(res.errcode == 0){
				if(res.data.Id>0){
					//是否满足分配条件
					const enableDistribute=(res.data.ExpertAuditState >= 2 && res.data.ExpertAuditState <= 3) 
					|| (res.data.ExpertReviewState >= 2 && res.data.ExpertReviewState <= 3);

					if(!editMode || (editMode  && enableDistribute)) {
						dlgEditRef.value.openDialog(editMode,res.data);
						return;
					}
					ElMessageBox.alert('当前记录状态不能查看或编辑，请刷新后重试', '温馨提示', {}) 
					
				} else{
					ElMessageBox.alert('记录不存在或已被删除', '温馨提示', {})
				}
			}
			
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
			dlgEditRef,
			onChangeSearchMode,
			objectSpanMethod,
			onGetTableData,
			onResetSearch,
			onOpenEditDlg,
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
