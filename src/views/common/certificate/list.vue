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
						<el-select v-model="scope.row.CertificateType" placeholder="Select" size="large">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="IssuingAgency " label="颁发机构" show-overflow-tooltip>
					<template #default="scope">
						<el-input v-model="scope.row.IssuingAgency" placeholder="Please input" />
					</template>
				</el-table-column>
				<el-table-column prop="Name" label="颁发日期" show-overflow-tooltip></el-table-column>
				<el-table-column prop="Name" label="有效日期" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(300)" fixed="right">
					<template #default="scope">
						<el-button text bg type="info" @click="onModelSee(scope.row.Id, methodList[scope.row.ProjectType], false)">
							<el-icon>
								<Search />
							</el-icon>
							&#8197;{{ $t('message.action.see') }}
						</el-button>
						<el-button
							text
							bg
							type="primary"
							@click="onModelSee(scope.row.Id, methodList[scope.row.ProjectType], true)"
							v-auth:[moduleKey]="'btn.signup'"
							>{{ $t('message.action.signUp') }}</el-button
						>
						<el-button text bg type="primary" @click="onModelEdit(scope.row.Id)" v-auth:[moduleKey]="'btn.Edit'">
							<el-icon>
								<Edit />
							</el-icon>
							&#8197;{{ $t('message.action.edit') }}
						</el-button>
						<el-button text bg type="danger" @click="onModelDel(scope.row.Id)" v-auth:[moduleKey]="'btn.Del'">
							<el-icon>
								<CloseBold />
							</el-icon>
							&#8197;{{ $t('message.action.delete') }}
						</el-button>
						<el-button text bg type="primary" @click="onToRouter(scope.row.Id)" v-auth:[moduleKey]="'btn.Selection'">
							{{ $t('message.action.selection') }}
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
import commonFunction from '/@/utils/commonFunction';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessageBox, ElMessage, UploadProps, ElNotification } from 'element-plus';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
import other from '/@/utils/other';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
export default {
	name: 'certificateList',
	setup() {
		const moduleKey = `api_common_certificate_supplier`;
		const { proxy } = getCurrentInstance() as any;
		const state: any = reactive({
			baseUrl: import.meta.env.VITE_API_URL,
			moduleKey: moduleKey,
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
		const options = [
			{
				value: '1',
				label: '营业执照（三证合一）',
			},
			{
				value: '2',
				label: '法定代表人（负责人）身份证明',
			},
			{
				value: '3',
				label: '资信承诺',
			},
			{
				value: '100',
				label: '其他类相关资质',
			},
		];
		// 页面加载时
		onMounted(() => {});

		return {
			proxy,
			options,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
