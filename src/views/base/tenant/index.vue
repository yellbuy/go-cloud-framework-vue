<template>
	<div class="base-tenant-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef"  :model="tableData.param" label-width="80px" :inline="true">
					<el-form-item label="关键字：">
						<el-input  placeholder="请输入关键字模糊查询" v-model="tableData.param.username"> </el-input>
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
						<el-button  type="primary" @click="onOpenDlgAdd"  v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<elementPlus />
							</el-icon>
							{{ $t('message.action.add') }}
						</el-button>
					</el-form-item>
					<el-form-item>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData.data" 
				v-loading="tableData.loading" style="width: 100%"  :height="proxy.$calcMainHeight(-90)"
				border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed/>
				<el-table-column prop="Name" label="单位名称" width="240" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Code" label="单位代码" width="180" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Phone" label="电话" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Linkman" label="联系人" width="70" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Addr" label="单位地址"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="State" label="状态" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" plain  v-if="scope.row.State>0">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" plain  v-else>{{ $t('message.action.disable') }}</el-tag>
						
					</template>
				</el-table-column>
				<!-- <el-table-column prop="Order" label="排序" width="80" align="right" show-overflow-tooltip>
				</el-table-column> -->
				<el-table-column prop="CreationTime" label="创建时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="240" fixed="right">
					<template #default="scope">
						<el-button plain type="info" @click="onProxyTenant(scope.row)" v-auth:[moduleKey]="'btn.Proxy'">
							<el-icon>
								<elementEdit />
							</el-icon>
							{{ $t('message.action.backend') }}
						</el-button>
						<el-button plain type="primary" @click="onOpenDlgEdit(scope.row)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<elementEdit />
							</el-icon>
							{{ $t('message.action.edit') }}
						</el-button>
						<el-button plain type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.Del'">
							<el-icon>
								<elementCloseBold />
							</el-icon>
							{{ $t('message.action.delete') }}
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
		<tenantEdit ref="dlgEditRef" />
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { useI18n } from 'vue-i18n';
import { Session, Local } from '/@/utils/storage';
import { useRouter } from 'vue-router';
import { resetRoute } from '/@/router/index';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect,onMounted, ref, computed,getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import tenantEdit from './component/tenantEdit.vue';
import other from '/@/utils/other';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { initBackEndControlRoutes } from '/@/router/backEnd';

export default {
	name: 'baseTenants',
	components: { tenantEdit },
	setup() {
		const moduleKey='api_base_tenant';
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const router = useRouter();
		const store = useStore();
		const dlgEditRef = ref();
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
			request("/v2/base/tenants",state.tableData.param).then((res)=>{
				state.tableData.loading=false;
				if(res.errcode!=0){
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			}).catch(() => {
				state.tableData.loading=false;
			});
		};

		// 进入租户后台
		const onProxyTenant = (row: Object)=>{
			ElMessageBox.confirm(`确定进入租户后台吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				request({
					url: `/v1/base/proxy/tenant/${row.Id}`,
					method: 'post',
				}).then((res)=>{
					if(res.errcode==0){
						ElMessage.success({
							showClose: true,
							duration:2400,
							message: t('message.base.action.proxySuccess'),
							onClose:async function(){
								try{
									let defaultRoles: Array<string> = [];
									let defaultAuthBtnList: Array<string> = [];
									Session.clear();
									const avatar=import.meta.env.VITE_API_URL+'/v1/avatar/user/'+res.data.user.Id+".jpg"
									//console.debug(avatar)
									// 用户信息模拟数据
									const userInfos = {
										username: res.data.user.Username,
										realname:res.data.user.Name || res.data.user.NickName || res.data.user.Username,
										photo:avatar,
										time: new Date().getTime(),
										roles: ["api"],
										authBtnList: defaultAuthBtnList,
										isProxy:res.data.user.IsProxy,
									};
									// 存储 token 到浏览器缓存
									Session.set('token', res.data.token);
									// 存储用户信息到浏览器缓存
									Session.set('userInfo', userInfos);
									Session.set('expiresToken',res.data.expiresAt);
									Session.set("refreshTokenAt",res.data.refreshTokenAt);
									// 1、请注意执行顺序(存储用户信息到vuex)
									store.dispatch('userInfos/setUserInfos', userInfos);
									// 删除动态路由
									await resetRoute();
									window.location.href="/";
								} catch(err){
									console.error(err)
								}
							}
						})
					}
				}).catch((err)=>{
					console.error(err)
				});
			}).catch((err) => {
			});
			
		};
		// 打开新增用户弹窗
		const onOpenDlgAdd = () => {
			dlgEditRef.value.openDialog({});
		};
		// 打开修改用户弹窗
		const onOpenDlgEdit = (row: Object) => {
			dlgEditRef.value.openDialog(row);
		};
		// 删除用户
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除单位“${row.Name}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				state.tableData.loading=true;
				const url=`/v1/base/tenant/delete/${row.Id}`;
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
			onGetTableData,
			onResetSearch,
			onOpenDlgAdd,
			onOpenDlgEdit,
			onProxyTenant,
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
