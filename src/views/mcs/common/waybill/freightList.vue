<template>
	<div class="base-freight-container">
			<splitpanes class="default-theme" @resize="paneSize = $event[0].size" style="height: 100%">
				<pane :size="58">
					<el-card shadow="hover">
						<div style="margin-bottom:-16px">
							<el-form ref="searchFormRef" :model="mainTableData.param" label-suffix="："  label-width="60px" :inline="true">
								<el-form-item label="关键字" style="width:130px">
									<el-input
										placeholder="输入关键字查询"
										v-model="mainTableData.param.keyword"/>
								</el-form-item>
								<el-form-item label="发货时间" style="width:250px; white-space: nowrap;" >
									<el-date-picker
										v-model="timeRange"
										type="daterange"
										unlink-panels
										range-separator="至"
										start-placeholder="开始时间"
										end-placeholder="结束时间"
										format="YYYY-MM-DD"
										date-format="YYYY/MM/DD"/>
								</el-form-item>
								<el-form-item>
									<el-button type="info" @click="onMainResetSearch">
										<el-icon>
											<RefreshLeft />
										</el-icon>
										{{ $t('message.action.reset') }}
									</el-button>
									<el-button type="info" @click="onMainGetTableData(true)">
										<el-icon>
											<Search />
										</el-icon>
										&#8197;{{ $t('message.action.search') }}
									</el-button>
									<el-button type="primary" @click="onMainOpenEditDlg(0, false)" v-auth:[moduleKey]="'btn.Add'">
										<el-icon>
											<CirclePlusFilled />
										</el-icon>
										&#8197;{{ $t('message.action.add') }}
									</el-button>
								</el-form-item>
								<el-form-item></el-form-item>
							</el-form>
						</div>
					<el-table
						ref="mainTableRef"
						:data="mainTableData.data"
						@current-change="onMainCurrentChange"
						v-loading="mainTableData.loading"
						style="width: 100%"
						:height="proxy.$calcMainHeight(-55)"
						border
						stripe
						highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="60" fixed />
						<el-table-column prop="BillNo" label="单号" width="110" fixed></el-table-column>
						<el-table-column prop="GoodsName" label="货物" width="100"></el-table-column>
						<el-table-column prop="CustomerName" label="客户" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column label="发布" width="70" align="center" show-overflow-tooltip>
							<template #default="scope">
								<el-switch
									v-model="scope.row.State"
									inline-prompt
									:width="46"
									v-auth:[moduleKey]="'btn.Edit'"
									@change="proxy.$api.common.table.updateExtById('erp_waybill', 'state', scope.row.Id, scope.row.State,'update_time')"
									:active-text="$t('message.action.yes')"
									:inactive-text="$t('message.action.no')"
									:active-value="1"
									:inactive-value="0"/> 
								<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.yes') }}</el-tag>
								<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.Edit'">{{ $t('message.action.no') }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="PlanTruckCount" label="是否完成" width="70" align="center">
							<template #default="scope">
								<el-tag type="success" class="mr4" effect="dark" v-if="scope.row.PlanTruckCount <= scope.row.FinishTruckCount">已完成</el-tag>
								<el-tag type="danger" class="mr4" effect="dark" v-else>执行中</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="WaybillMode" label="业务类型" width="70" align="center">
							<template #default="scope">
								<el-tag type="success" class="mr4" effect="dark" v-if="scope.row.WaybillMode==1">固定</el-tag>
								<el-tag type="danger" class="mr4" effect="dark" v-else-if="scope.row.WaybillMode==2">临配</el-tag>
								<el-tag type="warning" class="mr4" effect="dark" v-else-if="scope.row.WaybillMode==10">其他</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="TruckCount" label="接单|出勤|完成|所有" width="130" align="center">
							<template #default="scope">
								<el-text type="success" effect="plain">{{ scope.row.TruckCount}}</el-text> | <el-text type="success" effect="plain">{{ scope.row.BeginTruckCount}}</el-text>  | <el-text type="success" effect="plain">{{ scope.row.FinishTruckCount}}</el-text> |  <el-text type="danger" effect="plain">{{scope.row.PlanTruckCount }}</el-text>
							</template>
						</el-table-column>
						<el-table-column prop="PlanWeight" label="执行进度" width="100" align="center">
							<template #default="scope">
								<el-text type="success" effect="plain">{{ scope.row.Weight}}</el-text> / <el-text type="danger" effect="plain">{{scope.row.PlanWeight }}</el-text>
							</template>
						</el-table-column>
						<el-table-column prop="SenderAddress" label="发货地址" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column prop="ReceiverAddress" label="收货地址" width="120" show-overflow-tooltip></el-table-column>
						<el-table-column prop="CompanyName" label="所属公司" show-overflow-tooltip></el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(100)" fixed="right">
							<template #default="scope">
								<el-dropdown split-button >
									{{ $t('message.action.operate') }}
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item @click="onMainCopy(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Copy'">
												<el-text type="primary" >{{ $t('message.action.copy') }}</el-text>
											</el-dropdown-item>
											<el-dropdown-item @click="onMainOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.Edit'">
												<el-text type="primary" >{{ $t('message.action.edit') }}</el-text>
											</el-dropdown-item>
											<el-dropdown-item @click="onMainOpenEditDlg(scope.row.Id, true)">
												<el-text >{{ $t('message.action.see') }}</el-text>
											</el-dropdown-item>
											<el-dropdown-item divided @click="onMainDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
												<el-text type="danger" >{{ $t('message.action.delete') }}</el-text>
											</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						small
						@size-change="onMainHandleSizeChange"
						@current-change="onMainHandleCurrentChange"
						class="mt15"
						:page-sizes="[10, 20, 30, 50, 100]"
						v-model:current-page="mainTableData.param.pageNum"
						background
						v-model:page-size="mainTableData.param.pageSize"
						layout="->, total, sizes, prev, pager, next, jumper"
						:total="mainTableData.total">
					</el-pagination>
				</el-card>
				</pane>
				<pane :size="42">
					<splitpanes class="default-theme" :horizontal="true">
						<pane :size="50"> 
							<el-card shadow="hover">
								<div style="margin-bottom:-16px">
									<el-form ref="searchFormRef" :model="planTableData.param" label-suffix="：" label-width="60px" :inline="true">
										<el-form-item label="关键字">
											<el-input placeholder="输入关键字查询" style="width:80px" v-model="planTableData.param.keyword"> </el-input>
										</el-form-item>
										<el-form-item>
											<el-checkbox v-model="planTableData.isTodayAll" :true-label="1" :false-label="0">今日{{ $t('message.action.all') }}</el-checkbox>
											<el-button-group>
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.reset')"
													placement="top-start">
													<el-button type="info" style="margin-left: 10px;" @click="onPlanResetSearch">
														<el-icon>
															<RefreshLeft />
														</el-icon>
													</el-button>
												</el-tooltip>
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.search')"
													placement="top-start">	
													<el-button type="info" @click="onPlanQuery()">
														<el-icon>
															<Search />
														</el-icon>
													</el-button>
												</el-tooltip>
												
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.begin')"
													placement="top-start">	
													<el-button type="warning" @click="onPlanBatchBegin" v-auth:[moduleKey]="'btn.PlanEdit'">
														<el-icon>
															<RefreshRight />
														</el-icon>
													</el-button>
												</el-tooltip>
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.finish')"
													placement="top-start">	
													<el-button type="success" @click="onPlanBatchFinish" v-auth:[moduleKey]="'btn.PlanEdit'">
														<el-icon>
															<Finished />
														</el-icon>
													</el-button>
												</el-tooltip>
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.export')"
													placement="top-start">	
													<el-button type="primary" @click="onPlanExcelExport">
														<el-icon>
															<Link />
														</el-icon>
													</el-button>
												</el-tooltip>
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.add')"
													placement="top-start">	
													<el-button type="primary" @click="onOpenBatchAddDlg(0, planKind, false)" v-auth:[moduleKey]="'btn.PlanAdd'">
														<el-icon>
															<CirclePlusFilled />
														</el-icon>
													</el-button>
												</el-tooltip>
											</el-button-group>
										</el-form-item>
										<el-form-item></el-form-item>
									</el-form>
								</div>
								<el-table
									ref="planTableRef"
									:data="planTableData.data"
									v-loading="planTableData.loading"
									style="width: 100%"
									:height="220"
									border
									stripe
									selectable
									highlight-current-row>
									<el-table-column type="selection" width="55" align="center" fixed />
									<el-table-column type="expand" fixed>
										<template #default="props">
											<el-card shadow="hover" :body-style="{ padding: '6px' }">
											<h2><el-text class="mx-1" type="info">任务单号: </el-text><el-text class="mx-1" type="primary">{{ props.row.WaybillBillNo }}</el-text></h2>
											<h3><el-text class="mx-1" type="info">客户名称: </el-text><el-text class="mx-1" >{{ props.row.WaybillCustomerName }}</el-text></h3>
											<h3><el-text class="mx-1" type="info">品名规格: </el-text><el-text class="mx-1" >{{ props.row.WaybillGoodsName }}</el-text></h3>
											<h3><el-text class="mx-1" type="info">发货地址: </el-text><el-text class="mx-1" >{{ props.row.WaybillSenderAddress }}</el-text></h3>
											<h3><el-text class="mx-1" type="info">收货地址: </el-text><el-text class="mx-1" >{{ props.row.WaybillReceiverAddress }}</el-text></h3>
											</el-card>
										</template>
									</el-table-column>
									
									<el-table-column prop="VehicleNumber" label="车牌号" width="85" fixed>
									</el-table-column>
									<el-table-column prop="VehicleBillNo" label="车辆编号" width="75">
									</el-table-column>	
									<el-table-column label="接单" width="70" align="center" show-overflow-tooltip>
										<template #default="scope">
											<el-switch
												v-model="scope.row.State"
												inline-prompt
												:width="46"
												v-auth:[moduleKey]="'btn.PlanEdit'"
												@change="proxy.$api.erp.waybillLine.updateById(scope.row.Id,'state', scope.row.State, scope.row.WaybillId,  'update_time')"
												:active-text="$t('message.action.yes')"
												:inactive-text="$t('message.action.no')"
												:active-value="1"
												:inactive-value="0"/> 
											<el-tag type="success" effect="plain" v-if="scope.row.State" v-no-auth:[moduleKey]="'btn.PlanEdit'">{{ $t('message.action.yes') }}</el-tag>
											<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.PlanEdit'">{{ $t('message.action.no') }}</el-tag>
										</template>
									</el-table-column>
									<el-table-column label="出勤" width="70" align="center" show-overflow-tooltip>
										<template #default="scope">
											<el-switch
												v-model="scope.row.BeginState"
												inline-prompt
												:width="46"
												v-auth:[moduleKey]="'btn.PlanEdit'"
												@change="proxy.$api.erp.waybillLine.updateById(scope.row.Id, 'begin_state', scope.row.BeginState, scope.row.WaybillId, 'update_time')"
												:active-text="$t('message.action.yes')"
												:inactive-text="$t('message.action.no')"
												:active-value="1"
												:inactive-value="0"/> 
											<el-tag type="success" effect="plain" v-if="scope.row.BeginState" v-no-auth:[moduleKey]="'btn.PlanEdit'">{{ $t('message.action.yes') }}</el-tag>
											<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.PlanEdit'">{{ $t('message.action.no') }}</el-tag>
										</template>
									</el-table-column>
									<el-table-column label="结束" width="70" align="center" show-overflow-tooltip>
										<!-- <template #default="scope">
											<el-tag type="success" effect="plain" v-if="scope.row.FinishState">{{ $t('message.action.yes') }}</el-tag>
											<el-tag type="danger" effect="plain" v-else>{{ $t('message.action.no') }}</el-tag>
										</template> -->
										<template #default="scope">
											<el-switch
												v-model="scope.row.FinishState"
												inline-prompt
												:width="46"
												v-auth:[moduleKey]="'btn.PlanEdit'"
												@change="proxy.$api.erp.waybillLine.updateById(scope.row.Id,'finish_state', scope.row.FinishState, scope.row.WaybillId, 'update_time')"
												:active-text="$t('message.action.yes')"
												:inactive-text="$t('message.action.no')"
												:active-value="1"
												:inactive-value="0"/> 
											<el-tag type="success" effect="plain" v-if="scope.row.FinishState" v-no-auth:[moduleKey]="'btn.PlanEdit'">{{ $t('message.action.yes') }}</el-tag>
											<el-tag type="danger" effect="plain" v-else v-no-auth:[moduleKey]="'btn.PlanEdit'">{{ $t('message.action.no') }}</el-tag>
										</template>
									</el-table-column>
									<el-table-column prop="PlanTruckCount" label="车数" width="100" align="center">
										<template #header>
											<el-button
												type="text"
												v-if="planTableData.data"
												@click="proxy.$api.common.table.update('erp_waybill_line', 'PlanTruckCount', planTableData.data || [], 0)"
												v-auth:[moduleKey]="'btn.PlanEdit'"
											>
												<el-icon>
													<Edit />
												</el-icon>
												&#8197;车数{{ $t('message.action.update') }}
											</el-button>
											<span v-no-auth:[moduleKey]="'btn.PlanEdit'">车数</span>
										</template>
										<template #default="scope">
											<el-input type="number" placeholder="车数" v-model="scope.row.PlanTruckCount" input-style="text-align:right" v-auth:[moduleKey]="'btn.PlanEdit'">
											</el-input>
											<span v-no-auth:[moduleKey]="'btn.PlanEdit'">{{ scope.row.PlanTruckCount }}</span>
										</template>
									</el-table-column>
									<el-table-column prop="VehicleTypeName" label="车型" width="80"></el-table-column>
									<el-table-column prop="WaybillCompanyName" label="公司" width="120" show-overflow-tooltip></el-table-column>
									<el-table-column prop="WaybillSenderAddress" label="发货地址" width="120" show-overflow-tooltip></el-table-column>
									<el-table-column prop="WaybillReceiverAddress" label="收货地址" width="120" show-overflow-tooltip></el-table-column>
									<el-table-column prop="WaybillBillNo" label="单号" width="110"></el-table-column>
									<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(100)" fixed="right">
										<template #default="scope">
											<el-dropdown split-button>
												{{ $t('message.action.operate') }}
												<template #dropdown>
													<el-dropdown-menu>
														<el-dropdown-item @click="onPlanOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.PlanEdit'">
															<el-text type="primary" >{{ $t('message.action.edit') }}</el-text>
														</el-dropdown-item>
														<el-dropdown-item @click="onPlanOpenEditDlg(scope.row.Id, true)">
															<el-text  >{{ $t('message.action.see') }}</el-text>
														</el-dropdown-item>
														<el-dropdown-item @click="onOpenMapDlg(scope.row.VehicleNumber, true)" divided v-auth:[moduleKey]="'btn.PlanMap'">
															<el-text  >{{ $t('message.action.location') }}</el-text>
														</el-dropdown-item>
														<el-dropdown-item @click="onPlanDel(scope.row.Id,scope.row.WaybillId)" divided v-auth:[moduleKey]="'btn.PlanDel'">
															<el-text type="danger">{{ $t('message.action.delete') }}</el-text>
														</el-dropdown-item>
													</el-dropdown-menu>
												</template>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<el-pagination
									small
									@size-change="onPlanHandleSizeChange"
									@current-change="onPlanHandleCurrentChange"
									class="mt15"
									:page-sizes="[10, 20, 30, 50, 100]"
									v-model:current-page="planTableData.param.pageNum"
									background
									v-model:page-size="planTableData.param.pageSize"
									layout="->, total, sizes, prev, pager, next, jumper"
									:total="planTableData.total">
								</el-pagination>
							</el-card>	
						</pane>
						<pane :size="50"> 
							<el-card shadow="hover">
								<div style="margin-bottom:-16px">
									<el-form ref="searchFormRef" :model="childTableData.param" label-suffix="：" label-width="60px" :inline="true">
										<el-form-item label="关键字">
											<el-input placeholder="输入关键字查询" style="width:80px" v-model="childTableData.param.keyword"> </el-input>
										</el-form-item>
										<el-form-item>
											<el-checkbox v-model="childTableData.isTodayAll" :true-label="1" :false-label="0">今日{{ $t('message.action.all') }}</el-checkbox>
											<el-button-group>
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.reset')"
													placement="top-start">
													<el-button type="info" style="margin-left: 10px;" @click="onChildResetSearch">
														<el-icon>
															<RefreshLeft />
														</el-icon>
													</el-button>
												</el-tooltip>
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.search')"
													placement="top-start">	
													<el-button type="info" @click="onChildQuery()">
														<el-icon>
															<Search />
														</el-icon>
													</el-button>
												</el-tooltip>
												
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.begin')"
													placement="top-start">	
													<el-button type="warning" @click="onChildBatchBegin" v-auth:[moduleKey]="'btn.ChildEdit'">
														<el-icon>
															<RefreshRight />
														</el-icon>
													</el-button>
												</el-tooltip>
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.finish')"
													placement="top-start">	
													<el-button type="success" @click="onChildBatchFinish" v-auth:[moduleKey]="'btn.ChildEdit'">
														<el-icon>
															<Finished />
														</el-icon>
													</el-button>
												</el-tooltip>
												<el-tooltip
													class="box-item"
													effect="dark"
													:content="$t('message.action.add')"
													placement="top-start">	
													<el-button type="primary" @click="onOpenBatchAddDlg(0, 'freight', false)" v-auth:[moduleKey]="'btn.ChildAdd'">
														<el-icon>
															<CirclePlusFilled />
														</el-icon>
													</el-button>
												</el-tooltip>
											</el-button-group>
										</el-form-item>
										<el-form-item></el-form-item>
									</el-form>
								</div>
								<el-table
									ref="childTableRef"
									:data="childTableData.data"
									v-loading="childTableData.loading"
									style="width: 100%"
									:height="proxy.$calcMainHeight(-75-320)"
									border
									stripe
									selectable
									highlight-current-row>
									<el-table-column type="selection" width="55" align="center" fixed />
									<el-table-column type="expand" fixed>
										<template #default="props">
											<el-card shadow="hover" :body-style="{ padding: '6px' }">
											<h2><el-text class="mx-1" type="info">任务单号: </el-text><el-text class="mx-1" type="primary">{{ props.row.WaybillBillNo }}</el-text></h2>
											<h3><el-text class="mx-1" type="info">客户名称: </el-text><el-text class="mx-1" >{{ props.row.WaybillCustomerName }}</el-text></h3>
											<h3><el-text class="mx-1" type="info">品名规格: </el-text><el-text class="mx-1" >{{ props.row.WaybillGoodsName }}</el-text></h3>
											<h3><el-text class="mx-1" type="info">发货地址: </el-text><el-text class="mx-1" >{{ props.row.WaybillSenderAddress }}</el-text></h3>
											<h3><el-text class="mx-1" type="info">收货地址: </el-text><el-text class="mx-1" >{{ props.row.WaybillReceiverAddress }}</el-text></h3>
											</el-card>
										</template>
									</el-table-column>
									
									<el-table-column prop="VehicleNumber" label="车牌号" width="85" fixed>
									</el-table-column>		
									<el-table-column prop="VehicleBillNo" label="车辆编号" width="75">
									</el-table-column>								
									<el-table-column prop="VehicleTypeName" label="车型" width="80"></el-table-column>
									<el-table-column prop="WaybillCompanyName" label="公司" width="120" show-overflow-tooltip></el-table-column>
									<el-table-column prop="WaybillSenderAddress" label="发货地址" width="120" show-overflow-tooltip></el-table-column>
									<el-table-column prop="WaybillReceiverAddress" label="收货地址" width="120" show-overflow-tooltip></el-table-column>
									<el-table-column prop="WaybillBillNo" label="单号" width="110"></el-table-column>
									<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(100)" fixed="right">
										<template #default="scope">
											<el-dropdown split-button>
												{{ $t('message.action.operate') }}
												<template #dropdown>
													<el-dropdown-menu>
														<el-dropdown-item @click="onChildOpenEditDlg(scope.row.Id, false)" v-auth:[moduleKey]="'btn.ChildEdit'">
															<el-text type="primary" >{{ $t('message.action.edit') }}</el-text>
														</el-dropdown-item>
														<el-dropdown-item @click="onChildOpenEditDlg(scope.row.Id, true)">
															<el-text  >{{ $t('message.action.see') }}</el-text>
														</el-dropdown-item>
														<el-dropdown-item @click="onOpenMapDlg(scope.row.VehicleNumber, true)" divided v-auth:[moduleKey]="'btn.ChildMap'">
															<el-text  >{{ $t('message.action.location') }}</el-text>
														</el-dropdown-item>
														<el-dropdown-item @click="onChildDel(scope.row.Id,scope.row.WaybillId)" divided v-auth:[moduleKey]="'btn.ChildDel'">
															<el-text type="danger">{{ $t('message.action.delete') }}</el-text>
														</el-dropdown-item>
													</el-dropdown-menu>
												</template>
											</el-dropdown>
										</template>
									</el-table-column>
								</el-table>
								<el-pagination
									small
									@size-change="onChildHandleSizeChange"
									@current-change="onChildHandleCurrentChange"
									class="mt15"
									:page-sizes="[10, 20, 30, 50, 100]"
									v-model:current-page="childTableData.param.pageNum"
									background
									v-model:page-size="childTableData.param.pageSize"
									layout="->, total, sizes, prev, pager, next, jumper"
									:total="childTableData.total">
								</el-pagination>
							</el-card>	
						</pane>
					</splitpanes>
					
				</pane>
			</splitpanes>
		<editMainDlg ref="editMainDlgRef" />
		<editChildDlg ref="editChildDlgRef" />
		<childMapDlg ref="childMapDlgRef" />
		<batchAddLineDlg ref="batchAddLineDlgRef" />
	</div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import editMainDlg from './component/freightEdit.vue';
import batchAddLineDlg from './component/freightLineBatchAdd.vue';
import editChildDlg from './component/freightLineEdit.vue';
import childMapDlg from './component/vehicleMap.vue';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'freightList',
	components: { editMainDlg, editChildDlg, batchAddLineDlg,childMapDlg, Splitpanes, Pane },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const kind = route.params.kind;
		const planKind='plan';
		const scopeMode = route.params.scopeMode || 0;
		const scopeValue = route.params.scopeValue || 0;
		const moduleKey = `api_waybill_freight`;
		const editMainDlgRef = ref();
		const editChildDlgRef = ref();
		const childMapDlgRef=ref();
		const batchAddLineDlgRef = ref();
		const mainTableRef = ref();
		const planTableRef=ref();
		const childTableRef = ref();
		const state: any = reactive({
			moduleKey: moduleKey,
			paneSize: 100,
			kind,
			planKind,
			scopeMode,
			scopeValue,
			mainCurrentRow:null,
			timeRange: [],
			mainTableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					keyword: '',
					sendPlanStartTime: "",
					sendPlanEndTime: "",
					waybillType:2,
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
			planTableData: {
				data: [],
				total: 0,
				loading: false,
				isTodayAll:1, //查询今日所有任务详情
				param: {
					kind:planKind,
					keyword: '',
					waybillId:'0',
					
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
			childTableData: {
				data: [],
				total: 0,
				loading: false,
				isTodayAll:1, //查询今日所有任务详情
				param: {
					kind:'freight',
					keyword: '',
					waybillId:'0',
					pageNum: 1,
					pageSize: 20,
					state: -1,
				},
			},
		});
		state.mainTableData.param.pageIndex = computed(() => {
			return state.mainTableData.param.pageNum - 1;
		});

		//	重置查询条件
		const onMainResetSearch = () => {
			state.mainTableData.param.keyword = '';
			onMainGetTableData(true);
		};

		const onMainCurrentChange = (row) => {
			if(!row){
				return;
			}
			state.mainCurrentRow = row
			if(row){
				state.childTableData.param.waybillId=row.Id
				state.planTableData.param.waybillId=row.Id
			} else{
				state.childTableData.param.waybillId="0"
				state.planTableData.param.waybillId="0"
			}
			state.childTableData.param.isTodayAll=0
			state.planTableData.param.isTodayAll=0
			onPlanGetTableData(true)
			onChildGetTableData(true)
		}

		//	初始化表格数据
		const onMainGetTableData = async (gotoFirstPage: boolean = false) => {
			if (state.timeRange && state.timeRange.length>1) {
				state.mainTableData.param.sendPlanStartTime = state.timeRange[0]
				state.mainTableData.param.sendPlanEndTime = state.timeRange[1]
			}
			if (gotoFirstPage) {
				state.mainTableData.param.pageNum = 1;
			}
			state.mainTableData.loading = true;
			try {
				const res = await proxy.$api.erp.waybill.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.mainTableData.param);
				if (res.errcode != 0) {
					return;
				}
				
				state.mainTableData.data = res.data;
				state.mainTableData.total = res.total;
			} finally {
				state.mainTableData.loading = false;
			}
		};

		//	打开弹窗
		const onMainCopy = async (id: string, ishow: boolean) => {
			state.mainTableData.loading = true;
			try {
				const res = await proxy.$api.erp.waybill.copy(id);
				if (res.errcode == 0) {
					onMainGetTableData(true)
				}
			} finally {
				state.mainTableData.loading = false;
			}
			return false;
		};
		//	打开弹窗
		const onMainOpenEditDlg = (id: string, ishow: boolean) => {
			editMainDlgRef.value.openDialog(state.kind, id, ishow);
		};
		//	删除用户
		const onMainDel = (Id: string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.waybill.delete(Id);
					if (res.errcode == 0) {
						onMainGetTableData();
					}
				} finally {
					state.mainTableData.loading = false;
				}
				return false;
			});
		};

		//	分页改变
		const onMainHandleSizeChange = (val: number) => {
			state.mainTableData.param.pageSize = val;
			onMainGetTableData();
		};

		//	分页改变
		const onMainHandleCurrentChange = (val: number) => {
			state.mainTableData.param.pageNum = val;
			onMainGetTableData();
		};

		state.planTableData.param.pageIndex = computed(() => {
			return state.planTableData.param.pageNum - 1;
		});

		//	重置查询条件
		const onPlanResetSearch = () => {
			state.planTableData.param.keyword = '';
			state.planTableData.param.isTodayAll=state.planTableData.isTodayAll
			onPlanGetTableData(true);
		};

		//重置查询条件
		const onPlanQuery = () => {
			state.planTableData.param.isTodayAll=state.planTableData.isTodayAll
			onPlanGetTableData(true);
		};

		// 初始化表格数据
		const onPlanGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.planTableData.param.pageNum = 1;
			}
			state.planTableData.loading = true;
			try {
				const res = await proxy.$api.erp.waybillLine.getListByScope(planKind, state.scopeMode, state.scopeValue, state.planTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.planTableData.data = res.data;
				state.planTableData.total = res.total;
			} finally {
				state.planTableData.loading = false;
			}
		};
		//	分页改变
		const onPlanHandleSizeChange = (val: number) => {
			state.planTableData.param.pageSize = val;
			onPlanGetTableData();
		};

		//	分页改变
		const onPlanHandleCurrentChange = (val: number) => {
			state.planTableData.param.pageNum = val;
			onPlanGetTableData();
		};
		//	打开弹窗
		const onPlanOpenEditDlg = (id: string, ishow: boolean) => {
			editChildDlgRef.value.openDialog(state.kind, id, ishow);
		};

		//批量开始
		const onPlanBatchBegin=async ()=>{
			const rows=planTableRef.value.getSelectionRows();
			const ids=rows.map((val)=>{return val.Id});
			const success= await proxy.$api.common.table.updateExtByIds('erp_waybill_line', 'begin_state', ids, 1,'begin_time')
			if(success){
				onPlanGetTableData();
			}
		}
		//批量结束
		const onPlanBatchFinish= async ()=>{
			const rows=planTableRef.value.getSelectionRows();
			const ids=rows.map((val)=>{return val.Id});
			const success= await proxy.$api.common.table.updateExtByIds('erp_waybill_line', 'finish_state', ids, 1,'finish_time')	
			if(success){
				onPlanGetTableData();
			}
			
		}
		//
		const onPlanExcelExport= async ()=>{
			if(!state.planTableData.param.waybillId){
				ElMessage.error('请选择待导出的任务记录')
				return;
			}
			const res = await proxy.$api.erp.waybillLine.exportXlsByScope(state.planKind, state.scopeMode, state.scopeValue, {waybillId:state.planTableData.param.waybillId});
			if (!res.data || res.data.size == 0) {
				return;
			} 
			// 返回不为空
			var url = window.URL.createObjectURL(res.data);
			var a = document.createElement('a');
			a.href = url;
			a.download = '车辆任务计划_' + new Date().getTime() + '.xlsx'; // 下载后的文件名称
			a.click();
		}
		

		//	删除记录
		const onPlanDel = (id: string,waybillId:string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.waybillLine.delete(id,waybillId);
					if (res.errcode == 0) {
						onMainGetTableData();
						onPlanGetTableData();
					}
				} finally {
					state.planTableData.loading = false;
				}
				return false;
			});
		};



		state.childTableData.param.pageIndex = computed(() => {
			return state.childTableData.param.pageNum - 1;
		});

		//	重置查询条件
		const onChildResetSearch = () => {
			state.childTableData.param.keyword = '';
			state.childTableData.param.isTodayAll=state.childTableData.isTodayAll
			onChildGetTableData(true);
		};

		//重置查询条件
		const onChildQuery = () => {
			state.childTableData.param.isTodayAll=state.childTableData.isTodayAll
			onChildGetTableData(true);
		};

		// 初始化表格数据
		const onChildGetTableData = async (gotoFirstPage: boolean = false) => {
			if (gotoFirstPage) {
				state.childTableData.param.pageNum = 1;
			}
			state.childTableData.loading = true;
			try {
				const res = await proxy.$api.erp.waybillLine.getListByScope(state.kind, state.scopeMode, state.scopeValue, state.childTableData.param);
				if (res.errcode != 0) {
					return;
				}
				state.childTableData.data = res.data;
				state.childTableData.total = res.total;
			} finally {
				state.childTableData.loading = false;
			}
		};

		//	打开弹窗
		const onOpenBatchAddDlg = (id: string, kind:string, ishow: boolean) => {
			if(!state.mainCurrentRow){
				ElMessage.warning('请选择任务单再添加车辆');
				return;
			}
			batchAddLineDlgRef.value.openDialog(kind, state.mainCurrentRow.Id, ishow);
		};

		//批量开始
		const onChildBatchBegin=async ()=>{
			const rows=childTableRef.value.getSelectionRows();
			const ids=rows.map((val)=>{return val.Id});
			const success= await proxy.$api.common.table.updateExtByIds('erp_waybill_line', 'begin_state', ids, 1,'begin_time')
			if(success){
				onChildGetTableData();
			}
		}
		//批量结束
		const onChildBatchFinish= async ()=>{
			const rows=childTableRef.value.getSelectionRows();
			const ids=rows.map((val)=>{return val.Id});
			const success= await proxy.$api.common.table.updateExtByIds('erp_waybill_line', 'finish_state', ids, 1,'finish_time')	
			if(success){
				onChildGetTableData();
			}
		}
		//	打开弹窗
		const onChildOpenEditDlg = (id: string, ishow: boolean) => {
			editChildDlgRef.value.openDialog(state.kind, id, ishow);
		};

		//	删除记录
		const onChildDel = (id: string,waybillId:string) => {
			ElMessageBox.confirm(`确定要删除这条记录吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					const res = await proxy.$api.erp.waybillLine.delete(id,waybillId);
					if (res.errcode == 0) {
						onMainGetTableData();
						onChildGetTableData();
					}
				} finally {
					state.childTableData.loading = false;
				}
				return false;
			});
		};

		//	打开地图
		const onOpenMapDlg = (vehicleNumber: string, ishow: boolean) => {
			childMapDlgRef.value.openDialog(vehicleNumber, ishow);
		};

		//	分页改变
		const onChildHandleSizeChange = (val: number) => {
			state.childTableData.param.pageSize = val;
			onChildGetTableData();
		};

		//	分页改变
		const onChildHandleCurrentChange = (val: number) => {
			state.childTableData.param.pageNum = val;
			onChildGetTableData();
		};

		//	页面加载时
		onMounted(() => {
			onMainGetTableData();
			onPlanGetTableData();
			onChildGetTableData();
		});

		const { dateFormatYMDHM,dateFormatHMS,dateFormatHM } = commonFunction();

		return {
			proxy,
			editMainDlgRef,
			editChildDlgRef,
			childMapDlgRef,
			batchAddLineDlgRef,
			mainTableRef,
			childTableRef,
			onMainCurrentChange,
			onMainGetTableData,
			onMainResetSearch,
			onMainOpenEditDlg,
			onMainCopy,
			onMainDel,
			onMainHandleSizeChange,
			onMainHandleCurrentChange,
			onPlanQuery,
			onPlanExcelExport,
			onPlanGetTableData,
			onPlanResetSearch,
			onOpenBatchAddDlg,
			onPlanOpenEditDlg,
			onPlanBatchBegin,
			onPlanBatchFinish,
			onPlanDel,
			onPlanHandleSizeChange,
			onPlanHandleCurrentChange,
			onChildQuery,
			onChildGetTableData,
			onChildResetSearch,
			onChildOpenEditDlg,
			onOpenMapDlg,
			onChildBatchBegin,
			onChildBatchFinish,
			onChildDel,
			onChildHandleSizeChange,
			onChildHandleCurrentChange,
			dateFormatYMDHM,
			dateFormatHMS,
			dateFormatHM,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.splitpanes__pane {
	justify-content: center;
	align-items: center;
	display: flex;
	position: relative;
	color: var(--color-primary-light-5);
	border: 1px solid #ebeef5;
}
</style>
