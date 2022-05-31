<template>
	<div class="base-tenant-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="80px" :inline="true">
					<el-form-item label="关键字：">
						<el-input  placeholder="请输入关键字模糊查询" v-model="tableData.param.username"> </el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="info"  @click="onResetSearch">
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
						<el-button  type="primary" @click="onOpenDlgAdd"  v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							&#8197;{{ $t('message.action.add') }}
						</el-button>
					</el-form-item>
					<el-form-item>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData.data" 
				v-loading="tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-75)"
				border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="70" fixed/>
				<el-table-column prop="Name" label="单位名称" width="240" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Code" label="单位代码" width="180" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Phone" label="电话" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Linkman" label="联系人" width="70" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Addr" label="单位地址"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="State" label="状态" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" effect="plain"  v-if="scope.row.State>0">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain"  v-else>{{ $t('message.action.disable') }}</el-tag>
						
					</template>
				</el-table-column>
				<!-- <el-table-column prop="Order" label="排序" width="80" align="right" show-overflow-tooltip>
				</el-table-column> -->
				<el-table-column prop="CreationTime" label="创建时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(240)" fixed="right">
					<template #default="scope">
						<el-button plain  type="info" @click="onProxyTenant(scope.row)" v-auth:[moduleKey]="'btn.Proxy'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.backend') }}
						</el-button>
						<el-button  plain type="primary" @click="onOpenDlgEdit(scope.row)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button  plain type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.Del'">
							<el-icon>
								<CloseBold />
							</el-icon>
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
		<tenantEdit ref="dlgEditRef" />
	</div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { Session, Local } from '/@/utils/storage';
import { resetRoute } from '/@/router/index';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { toRefs, reactive, effect,onMounted, ref, computed,getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import tenantEdit from './component/tenantEdit.vue';
import other from '/@/utils/other';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { initBackEndControlRoutes } from '/@/router/backEnd';

export default {
	name: 'baseCommonTenants',
	components: { tenantEdit },
	setup() {
		const moduleKey='api_base_tenant';
		const { t } = useI18n();
		const { proxy } = getCurrentInstance() as any;
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
		
		// 初始化表格数据
		const onGetTableData =async (gotoFirstPage:boolean=false) => {
			if(gotoFirstPage){
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading=true;
			try {
				const res = await proxy.$api.base.tenant.getList(state.tableData.param);
				if(res.errcode!=0) {
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally {
				state.tableData.loading=false;
			}
			
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
		const onRowDel = async (row: Object) => {
			ElMessageBox.confirm(`确定要删除“${row.Name}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading=true;
				state.tableData.loading=true;
				try {
					const res= await proxy.$api.base.tenant.delete(row.Id);
					if(res.errcode==0) {
						onGetTableData();
					}
				} finally {
					state.tableData.loading=false;
				}
				return false;
			})
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
		// 进入租户后台
		const onProxyTenant = (row: Object)=>{
			ElMessageBox.confirm(`确定进入租户后台吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				const res=await proxy.$api.base.proxy.enterTenant(row.Id);
				if(res.errcode==0){
					ElMessage.success({
						showClose: true,
						duration:2400,
						message: t('pages.base.action.proxySuccess'),
						onClose:function(){
							let defaultRoles: Array<string> = [];
							let defaultAuthBtnList: Array<string> = [];
							Session.clear();
							const avatar=import.meta.env.VITE_API_URL+'/v1/avatar/user/'+res.data.user.Id+".jpg"
							//console.debug(avatar)
							// 用户信息模拟数据
							const userInfos = {
								uid: res.data.user.Id,
								appid:res.data.user.Appid,
								tid:res.data.user.Tid,
								username: res.data.user.Username,
								realname: res.data.user.Name || res.data.user.NickName || res.data.user.Username,
								mobile:res.data.user.Mobile,
								avatar: avatar,
								time: new Date().getTime(),
								isAdmin:res.data.user.IsAdmin,
								roles: ['api'],
								authBtnList: defaultAuthBtnList,
								isProxy: res.data.user.IsProxy,
								app:res.data.user.App||{},
								tenant:res.data.user.Tenant||{},
							};
							// 存储 token 到浏览器缓存
							Session.set('token', res.data.token);
							// 存储用户信息到浏览器缓存
							Session.set('userInfo', userInfos);
							Session.set('expiresToken',res.data.expiresAt);
							Session.set("refreshTokenAt",res.data.refreshTokenAt);
							// 1、请注意执行顺序(存储用户信息到vuex)
							store.dispatch('userInfos/setUserInfos', userInfos);
							resetRoute(); // 删除/重置路由
							window.location.href="/";
							return;
							// // 删除动态路由
							// await resetRoute();
							// if (!store.state.themeConfig.themeConfig.isRequestRoutes) {
							// 	// 前端控制路由，2、请注意执行顺序
							// 	await initFrontEndControlRoutes();
							// } else {
							// 	// 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
							// 	// 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
							// 	await initBackEndControlRoutes();
							// 	// 执行完 initBackEndControlRoutes，再执行 signInSuccess
							// }
							// window.location.href="/";
						}
					})
				}
			})
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
			onRowDel,
			onProxyTenant,
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
