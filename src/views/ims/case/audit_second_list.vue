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
							<el-button :type="tableData.param.searchMode==3?'primary':'info'" @click="onChangeSearchMode(3)" plain>我审核的</el-button>
							<el-button :type="tableData.param.searchMode==0?'primary':'info'" @click="onChangeSearchMode(0)" plain>所有审核</el-button>
						</el-button-group>
					</el-form-item>
					<el-form-item>
						<el-button  @click="onResetSearch">
							<el-icon>
								<elementRefreshLeft />
							</el-icon>
							{{ $t('message.action.reset') }}
						</el-button>
						<el-button  @click="onGetTableData(true)">
							<el-icon>
								<elementSearch />
							</el-icon>
							{{ $t('message.action.search') }}
						</el-button>
					</el-form-item>
					<el-form-item>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData.data"  :span-method="objectSpanMethod"
				v-loading="tableData.loading" style="width: 100%"  :height="proxy.$calcMainHeight(-90)"
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
				<el-table-column prop="State" label="状态" width="60" align="center" fixed="right">
					<template #default="scope">
						<el-tag type="success" effect="plain"  v-if="scope.row.InsurerReviewState==10">通过</el-tag>
						<el-tag type="danger" effect="plain"  v-else-if="scope.row.InsurerReviewState==5">驳回</el-tag>
						<el-tag type="primary" effect="plain"  v-else-if="scope.row.InsurerReviewState>0">待审</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150" fixed="right">
					<template #default="scope">
						<el-button  plain  type="info" v-if="scope.row.InsurerReviewState > 0" @click="onOpenEditDlg(false,scope.row)">
							<el-icon>
								<elementEdit />
							</el-icon>
							查看
						</el-button>
						<el-button  plain  type="primary" v-if="scope.row.InsurerReviewState == 2" @click="onOpenEditDlg(true,scope.row)" v-auth:[moduleKey]="'btn.AuditEdit'">
							<el-icon>
								<elementEdit />
							</el-icon>
							审核
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<dlgEdit ref="dlgEditRef"  :step="3"/>
	</div>
</template>


<script lang="ts">
import request from '/@/utils/request';
import commonFunction from '/@/utils/commonFunction';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { toRefs, reactive, effect,onMounted, ref, computed,getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import dlgEdit from './component/auditEdit.vue';
import other from '/@/utils/other';
import { getUserList } from '/@/api/base/user';
export default {
	name: 'baseUsers',
	components: { dlgEdit },
	setup() {
		const moduleKey='api_ims_first_audit';
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
					searchPage:2, // 1：保司二级审核，2：保司三级审核，5：制作专家，6：审核专家，10：平台
					searchMode:1, //0：所有，1：待审，2：已审，3：我审核的
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
		const onGetTableData = (gotoFirstPage:boolean=false) => {
			if(gotoFirstPage){
				state.tableData.param.pageNum=1;
			}
			state.tableData.loading=true;
			state.tableData.data =[
			];
			state.tableData.loading=false;
			request({
				url: '/v1/ims/casepersonlines',
				method: 'get',
				params: state.tableData.param,
			}).then((res)=>{
				state.tableData.loading=false;
				if(res.errcode!=0){
					return;
				}
				state.tableData.total=res.total;
				let caseId="0";
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
				
			}).catch(() => {
				state.tableData.loading=false;
			});
			
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
		
		// 打开修改用户弹窗
		const onOpenEditDlg = (editMode:Boolean,row: Object) => {
			request({
					url: `/v1/ims/casepersonline/${row.Id}`,
					method: 'get',
				}).then((res)=>{
					if(res.errcode == 0){
						if(res.data.Id>0){
							if(res.data.InsurerReviewState>0){
								if(!editMode || (editMode && res.data.InsurerReviewState)){
									dlgEditRef.value.openDialog(editMode,res.data);
									return;
								}
							}
							ElMessageBox.alert('当前记录状态不能查看或编辑，请刷新后重试', '温馨提示', {}) 
							
						} else{
							ElMessageBox.alert('记录不存在或已被删除', '温馨提示', {})
						}
					}
					
				}).catch((err)=>{
					console.error(err)
					ElMessageBox.alert('网络故障', '温馨提示', {})
				});
			
		};
		// 删除记录
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除记录“${row.Sn}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				state.tableData.loading=true;
				const url=`/v1/ims/casepersonline/delete/${row.Id}`;
				request({
					url: url,
					method: 'post',
				}).then((res)=>{
					state.tableData.loading=false;
					if(res.errcode==0){
						onGetTableData();
					}
				}).catch((err)=>{
					state.tableData.loading=false;
				});
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