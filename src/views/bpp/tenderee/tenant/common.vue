<template>
	<div class="base-tenant-container">
		<el-card shadow="hover">
			<div class="">
				<el-form ref="searchFormRef" :model="tableData.param" label-width="85px" :inline="true">
					<el-form-item label="关键字：">
						<el-input  placeholder="请输入关键字" v-model="tableData.param.keyword" style="width: 150px;"/>
					</el-form-item>
					<el-form-item>
						<el-button type="info"  @click="onResetSearch">
							<el-icon>
								<RefreshLeft />
							</el-icon>
							重置
						</el-button>
						<el-button type="info" @click="onGetTableData(true)">
							<el-icon>
								<Search />
							</el-icon>
							搜索
						</el-button>
						<el-button  type="primary" @click="onOpenDlgAdd"  v-auth:[moduleKey]="'btn.Add'">
							<el-icon>
								<CirclePlusFilled />
							</el-icon>
							新增
						</el-button>
					</el-form-item>
					<el-form-item>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData.data"
				v-loading="tableData.loading" style="width:100%" :height="proxy.$calcMainHeight(-75)"
				border stripe highlight-current-row>
				<el-table-column type="index" label="序号" align="right" width="60" fixed/>
				<el-table-column prop="Name" label="单位名称" width="200" show-overflow-tooltip fixed></el-table-column>
				<el-table-column prop="Code" label="单位代码" width="200" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Phone" label="电话" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Linkman" label="联系人" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Addr" label="单位地址"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="State" label="状态" width="80" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-switch v-model="scope.row.State" inline-prompt :width="46" v-auth:[moduleKey]="'btn.Edit'" 
						@change="proxy.$api.common.table.updateById('base_tenant','State',scope.row.Id,scope.row.State)" 
						:active-text="$t('message.action.enable')" :inactive-text="$t('message.action.disable')" :active-value="1" :inactive-value="0"/>
						<el-tag type="success" effect="plain"  v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.enable') }}</el-tag>
						<el-tag type="danger" effect="plain"  v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.disable') }}</el-tag>
					</template>
				</el-table-column>
				
				<el-table-column prop="IsTop" label="置顶" width="70" align="center" show-overflow-tooltip>
					<template #default="scope">
						<el-switch v-model="scope.row.IsTop" inline-prompt v-auth:[moduleKey]="'btn.Edit'" 
						@change="proxy.$api.common.table.updateById('base_tenant','IsTop',scope.row.Id,scope.row.IsTop)" 
						:active-text="$t('message.action.yes')" :inactive-text="$t('message.action.no')" :active-value="1" :inactive-value="0"/>
						<el-tag type="success" effect="plain"  v-if="scope.row.IsTop" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.yes') }}</el-tag>
						<el-tag type="danger" effect="plain"  v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.no') }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Order" label="排序" width="100" align="center">
					<template #header>
						<el-button  type="text" v-if="tableData.data" 
							@click="proxy.$api.common.table.update('base_tenant','Order', tableData.data||[], 0)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;排序{{ $t('message.action.update') }}
						</el-button>
						<span v-no-auth:[moduleKey]="'btn.Edit'">排序</span>
					</template>
					<template #default="scope">
						<el-input type="number" placeholder="排序" v-model="scope.row.Order" input-style="text-align:right" v-auth:[moduleKey]="'btn.Edit'"> </el-input>
						<span v-no-auth:[moduleKey]="'btn.Edit'">{{scope.row.Order}}</span>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="Order" label="排序" width="80" align="right" show-overflow-tooltip>
				</el-table-column> -->
				<el-table-column prop="CreationTime" label="创建时间" width="120" :formatter="dateFormatYMDHM" show-overflow-tooltip>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(240)" fixed="right">
					<template #default="scope">
						<el-button text bg  type="info" @click="onProxyTenant(scope.row)" v-auth:[moduleKey]="'btn.Proxy'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.backend') }}
						</el-button>
						<el-button  text bg type="primary" @click="onOpenDlgEdit(scope.row)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button  text bg type="danger" @click="onRowDel(scope.row)" v-auth:[moduleKey]="'btn.Del'">
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import tenantEdit from './component/tenantEdit.vue';
import { resetRoute } from '/@/router/index';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
import { Session } from '/@/utils/storage';

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
					keyword:"",
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
			state.tableData.param.keyword="";
			state.tableData.param.name="";
			onGetTableData(true)
		}
		
		// 初始化表格数据
		const onGetTableData =async (gotoFirstPage:boolean=false) => {
			if(gotoFirstPage){
				state.tableData.param.pageNum=1;
			}
			state.tableData.loading=true;
			try{
				const res = await proxy.$api.base.tenant.getList(state.tableData.param)
				if(res.errcode!=0){
					return;
				}
				state.tableData.data = res.data;
				state.tableData.total = res.total;
			} finally{
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
		const onRowDel = (row: Object) => {
			ElMessageBox.confirm(`确定要删除单位“${row.Name}”吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				state.tableData.loading=true;
				state.tableData.loading=true;
				try{
					const res= await proxy.$api.base.tenant.delete(row.Id);
					if(res.errcode!=0){
						return;
					}
					onGetTableData();
				} finally {
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
		// 进入租户后台
		const onProxyTenant = (row: Object)=>{
			ElMessageBox.confirm(`确定进入租户后台吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				const res=await proxy.$api.base.proxy.enterTenant(row.Id);				
				if(res.errcode==0){
					try {
						// 存储 token 到浏览器缓存
						Session.clear();
						Session.set('token', res.data.token);
						let defaultRoles: Array<string> = [];
						let defaultAuthBtnList: Array<string> = [];						
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
						
						// 存储用户信息到浏览器缓存
						Session.set('userInfo', userInfos);
						Session.set('expiresToken',res.data.expiresAt);
						Session.set("refreshTokenAt",res.data.refreshTokenAt);
						// 1、请注意执行顺序(存储用户信息到vuex)
						store.dispatch('userInfos/setUserInfos', userInfos);
						resetRoute(); // 删除/重置路由
					} catch(err){
						console.error(err)
						ElMessage.error(err.message);
						return;
					}
					//console.log("proxy.$api.base.proxy.enterTenant:",res)
					ElMessage.success({
						showClose: true,
						duration:2400,
						message: t('pages.base.action.proxySuccess'),
						onClose:async function(){
							window.location.href="/";
						}
					})
				}
			}).catch((err) => {
				console.error(err)
			});
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
