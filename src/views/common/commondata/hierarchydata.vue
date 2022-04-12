<template>
	<div class="common-hierarchydata-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" @tab-click="tabsName">
				<el-tab-pane v-for="(item, index) in concreteDataList.data" :key="index+1" :label="item.Name" :name="item.Code"> </el-tab-pane>
				<el-tab-pane label="基础代码" :key="0" :name="commonTypeCode"> </el-tab-pane>
			</el-tabs>
			<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				:height="proxy.$calcMainHeight(-50)"
				border
				stripe
				row-key="Id"
				default-expand-all
				:tree-props="{ children: 'Children', hasChildren: 'HasChildren' }"
				highlight-current-row
			>
				<el-table-column type="index" width="50" align="right" label="序号" fixed show-overflow-tooltip />
				<el-table-column prop="Name" label="名称" show-overflow-tooltip />
				<el-table-column prop="Code" label="编码" show-overflow-tooltip />
				<el-table-column prop="Status" label="状态" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" effect="plain"  v-if="scope.row.Status">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain"  v-else>{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Order" label="排序" width="80" align="right" show-overflow-tooltip />
				<el-table-column fixed="right" label="操作" width="180" show-overflow-tooltip>
					<template #header>
						<el-button  type="primary" @click="onOpenCommonDataDlg(0,0)">
							<el-icon>
								<elementCirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<elementRefresh />
							</el-icon>
							&#8197;{{ $t('message.action.refresh') }}
						</el-button>
					</template>
					<template #default="scope">
						<el-button  type="primary" plain @click="onOpenCommonDataDlg(scope.row.Id,scope.row.Parentid)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<elementEdit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button  type="danger" plain @click="onRowDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
							<el-icon>
								<elementCloseBold />
							</el-icon>
							&#8197;{{ $t('message.action.delete') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<hierarchyDataEdit ref="commondataEditRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import hierarchyDataEdit from './component/hierarchyDataEdit.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
export default {
	name: 'commonHierarchyData',
	components: { hierarchyDataEdit },
	setup() {
		const commonTypeCode='hierarchycommondata'
		const commondataEditRef = ref();
		const moduleKey = 'api_common_hierarchydata';
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			moduleKey: moduleKey,
			commonTypeCode,
			activeName: commonTypeCode,
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					type: commonTypeCode,
					name: '',
				},
			},
			concreteDataList: {
				data: [],
				loading: false,
				param: {
					type: commonTypeCode,
					name: '',
				},
			},
		});
		// 页面加载时
		onMounted(() => {
			onGetHierarchyData(true);
		});
		//切换页面
		const tabsName = () => {
			state.tableData.param.type = state.activeName;
			state.tableData.param.name = '';
			onLoadTable(true);
		};
		//刷新表格
		const onLoadTable = (gotoFirstPage: boolean) => {
			onGetTableData(gotoFirstPage);
		};
		// 打开弹窗
		const onOpenCommonDataDlg = (id: string,parentId:string) => {
			commondataEditRef.value.openDialog(state.activeName, id, parentId, state.tableData.data);
		};
		const onGetHierarchyData = async (isInit:boolean=false) => {
			try{
				const res=await proxy.$api.common.commondata.getConcreteDataList({type:commonTypeCode,pageSize:100000})
				if (res.errcode == 0) {
					state.concreteDataList.data = res.data;
					if(isInit && res.data && res.data.length>0){
						state.activeName=res.data[0].Code;
						tabsName();
					}
				}
			} finally {

			}
		};
		//查询表格数据
		const onGetTableData = async (gotoFirstPage: boolean = false) => {
			state.tableData.loading = true;
			try{
				const res=await proxy.$api.common.commondata.getHierarchyDataList({type:state.tableData.param.type})
				if (res.errcode != 0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading = false;
			}
			
		};
		
		const onRowDel = (Id: number) => {
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading = true;
				try{
					const res=await proxy.$api.common.commondata.delete(Id)
					if (res.errcode != 0) {
						return;
					}
					if (state.activeName == commonTypeCode) {
						await onGetHierarchyData();
					} else {
						await onGetTableData();
					}
				} finally {
					state.tableData.loading = false;
				}
				return false;
			})
		};
		return {
			commondataEditRef,
			onOpenCommonDataDlg,
			onGetTableData,
			onRowDel,
			tabsName,
			onLoadTable,
			proxy,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
	.el-cascader {
		width:100% !important;
	}
</style>
