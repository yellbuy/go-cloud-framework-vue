<template>
	<div class="base-role-container">
		<el-card shadow="hover">
			<h3>资质文件</h3>
			<el-row style="padding-top: 20px">
				<el-col :span="24" style="color: red; line-height: 25px"
					>集团外部供应商必须上传一下资质：营业执照（三证合一证件），法定代表人（负责人）身份证明、资信承诺、体系认证证书（生产商提供，不提供视为未获认证）、特种生产或经营许可证（属特种行业，国家规定需生产或经营许可证的供应商，须提供有效期内的生产或经营许可证等），请对照注册资料对照表上传资质文件。<a
						href=""
						>下载注册资料对照表</a
					></el-col
				>
			</el-row>
			<el-row>
				<el-col :span="24" style="color: red; line-height: 25px"
					>请下载资信承诺模板文件并签字盖章上传到资信承诺栏目。<a href="">下载资信承诺模板</a></el-col
				>
			</el-row>
			<el-row>
				<el-col :span="24" style="line-height: 25px">如果一下资质类型中没有你想上传的资质，请选择“其他证书”，并在备注中进行说明。</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" style="line-height: 25px">请将资质文件图片限制在5M之内。</el-col>
			</el-row>
			<view style="float: right">
				<el-button bg type="primary" @click="onModelSave">{{ $t('message.action.save') }} </el-button>
				<el-button text bg type="primary" @click="tableDataAdd">{{ $t('message.action.certificatAdd') }} </el-button>
			</view>

			<el-table
				:data="tableData.data"
				v-loading="tableData.loading"
				style="width: 100%"
				:height="proxy.$calcMainHeight(-75)"
				border
				stripe
				highlight-current-row
			>
				<el-table-column type="index" label="序号" align="right" width="70" fixed />
				<el-table-column prop="CertificateType" label="资质类型" show-overflow-tooltip fixed>
					<template #default="scope">
						<span v-if="scope.row.CertificateType == 1">营业执照（三证合一证件）</span>
						<span v-else-if="scope.row.CertificateType == 2">法定代表人（负责人）身份证明</span>
						<span v-else-if="scope.row.CertificateType == 4">资信承诺</span>
						<span v-else-if="scope.row.CertificateType == 100">其他类相关资质</span>
					</template>
				</el-table-column>
				<el-table-column prop="IssuingAgency" label="颁发机构" show-overflow-tooltip>
					<template #default="scope">
						<el-input v-model="scope.row.IssuingAgency" placeholder="请输入颁发机构" />
					</template>
				</el-table-column>
				<el-table-column prop="Name" label="颁发日期" show-overflow-tooltip>
					<template #default="scope">
						<el-date-picker
							v-model="scope.row.BusinessStartTime"
							type="date"
							placeholder="有效期限"
							format="YYYY-MM-DD"
							style="width: 100%"
						></el-date-picker>
					</template>
				</el-table-column>
				<el-table-column prop="Name" label="有效日期" show-overflow-tooltip>
					<template #default="scope">
						<el-date-picker
							v-model="scope.row.BusinessEndTime"
							type="date"
							placeholder="有效期限"
							format="YYYY-MM-DD"
							style="width: 100%"
						></el-date-picker>
					</template>
				</el-table-column>
				<el-table-column prop="IssuingAgency" label="影印件" show-overflow-tooltip>
					<template>
						<span>查看</span>
					</template>
				</el-table-column>
				<el-table-column prop="Remark" label="备注" show-overflow-tooltip>
					<template #default="scope">
						<el-input v-model="scope.row.Remark" />
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="right">
					<template #default="scope">
						<el-button text bg type="primary" @click="onModelDel(scope.row.Id, scope.$index)">
							<el-icon>
								<Upload />
							</el-icon>
							&#8197;{{ $t('message.action.uploadPhotocopy') }}
						</el-button>
						<el-button
							text
							bg
							type="danger"
							@click="onModelDel(scope.row.Id, scope.$index)"
							v-if="scope.row.CertificateType != 1 && scope.row.CertificateType != 2 && scope.row.CertificateType != 4"
							v-auth:[moduleKey]="'btn.Del'"
						>
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
	</div>
</template>

<script lang="ts">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
export default {
	name: 'certificateList',
	setup() {
		const moduleKey = `api_common_certificate_supplier`;
		const { proxy } = getCurrentInstance() as any;
		const state: any = reactive({
			baseUrl: import.meta.env.VITE_API_URL,
			moduleKey: moduleKey,
			modelData: [
				{
					Id: '0',
					CertificateType: 1, //三证合一
				},
				{
					Id: '0',
					CertificateType: 2, //法人身份证明
				},
				{
					Id: '0',
					CertificateType: 4, //承诺书
				},
			], //如果没有添加过，显示3个必要数据 1：统一信用代码证，2：法人身份证明，3：联系人身份证明，4：承诺书，100：其他
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 20,
				},
			},
		});
		state.tableData.data = state.modelData;
		const onGetMainTableData = async (gotoFirstPage: boolean) => {
			if (gotoFirstPage) {
				state.tableData.param.pageNum = 1;
			}
			state.tableData.loading = true;
			state.tableData.data = [];
			try {
				const res = await proxy.$api.common.certificate.getList(state.tableData.param);
				if (res.errcode != 0) {
					return;
				}
				if (res.data.length > 0) {
					state.tableData.total = res.total;
					state.tableData.data = res.data;
				} else {
					state.tableData.total = 3;
					state.tableData.data = state.modelData;
				}
			} finally {
				state.tableData.loading = false;
			}
		};
		const tableDataAdd = () => {
			state.tableData.data.push({
				Id: '0',
				CertificateType: 100,
			});
		};
		const onModelSave = async () => {
			state.tableData.loading = true;
			try {
				const res = await proxy.$api.common.certificate.save(JSON.parse(JSON.stringify(state.tableData.data)));
				if (res.errcode != 0) {
					return;
				}
				onGetMainTableData(true);
			} finally {
				state.tableData.loading = false;
			}
		};
		const onModelDel = async (id: number, index: number) => {
			if (id != 0) {
				try {
					const res = await proxy.$api.common.certificate.delete(id);
					if (res.errcode != 0) {
						return;
					}
				} finally {
				}
			}
			state.tableData.data.splice(index, 1);
		};
		// 页面加载时
		onMounted(() => {
			onGetMainTableData(true);
		});

		return {
			proxy,
			// options,
			tableDataAdd,
			onModelDel,
			onModelSave,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
