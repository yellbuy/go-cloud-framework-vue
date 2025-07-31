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
				:height="proxy.$calcMainHeight(-275)"
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
						<el-date-picker v-model="scope.row.StartTime" type="date" placeholder="颁发日期" format="YYYY-MM-DD" style="width: 100%"></el-date-picker>
					</template>
				</el-table-column>
				<el-table-column prop="Name" label="有效日期" show-overflow-tooltip>
					<template #default="scope">
						<el-date-picker v-model="scope.row.EndTime" type="date" placeholder="有效日期" format="YYYY-MM-DD" style="width: 100%"></el-date-picker>
					</template>
				</el-table-column>
				<el-table-column prop="ImgUrl" label="影印件" show-overflow-tooltip align="center">
					<template #default="scope">
						<el-button text type="primary" @click="showImage(scope.row.ImgUrl)">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="Remark" label="备注" show-overflow-tooltip>
					<template #default="scope">
						<el-input v-model="scope.row.Remark" />
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(200)" fixed="right">
					<template #default="scope">
						<el-upload
							:action="`${baseUrl}/v1/file/upload`"
							name="file"
							:headers="httpHeaders"
							:with-credentials="true"
							:show-file-list="false"
							:on-success="onLogoUploadSuccess"
							:before-upload="onBeforeImageUpload"
						>
							<!-- @click="Upload(scope.row.Id, scope.$index)" -->
							<template #trigger>
								<el-button text bg type="primary" @click="Upload(scope.$index)">
									<el-icon>
										<Upload />
									</el-icon>
									&#8197;{{ $t('message.action.uploadPhotocopy') }}
								</el-button>
							</template>
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
						</el-upload>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				small
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:page-sizes="[10, 20, 30, 50, 100]"
				v-model:current-page="tableData.param.current"
				background
				v-model:page-size="tableData.param.size"
				layout="->, total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<el-image-viewer v-if="imgViewerVisible" @close="closeImgViewer" hide-on-click-modal :url-list="imgList" />
	</div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox, UploadProps } from 'element-plus';
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
export default {
	name: 'certificateList',
	setup() {
		const moduleKey = `api_common_certificate_supplier`;
		const token = Session.get('token');
		const { proxy } = getCurrentInstance() as any;
		const store = useStore();
		const getUserInfos = computed(() => {
			return store.state.userInfos.userInfos;
		});
		const state: any = reactive({
			token: token,
			httpHeaders:proxy.$getRequestHeaders(),
			baseUrl: import.meta.env.VITE_API_URL,
			imgUrl: import.meta.env.VITE_URL,
			moduleKey: moduleKey,
			tableDataIndex: 0,
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
					order: 'id',
					current: 1,
					size: 20,
				},
			},
			imgList: [],
			imgViewerVisible: false,
		});
		const onGetMainTableData = async (gotoFirstPage: boolean) => {
			if (gotoFirstPage) {
				state.tableData.param.current = 1;
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
			for (let i = 0; i < state.tableData.data.length; i++) {
				let item = state.tableData.data[i];
				if (item.ImgUrl == '') {
					ElMessage.error('第' + (i + 1) + '行没有上传影印件，请上传影印件！');
					return;
				} else if (item.IssuingAgency == '') {
					ElMessage.error('第' + (i + 1) + '行没有填写颁发机构，请输入颁发机构！');
					return;
				} else if (item.StartTime == '') {
					ElMessage.error('第' + (i + 1) + '行没有选择颁发日期，请填写颁发日期！');
					return;
				} else if (item.EndTime == '') {
					ElMessage.error('第' + (i + 1) + '行没有选择有效日期，请填写有效日期！');
					return;
				} else if (item.EndTime <= item.StartTime) {
					ElMessage.error('第' + (i + 1) + '行颁发日期应该小于有效日期！');
					return;
				}
			}
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
			ElMessageBox.confirm(`确定要删除这条数据吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
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
				return false;
			});
		};
		const onLogoUploadSuccess: UploadProps['onSuccess'] = (res) => {
			if (res.errcode != 0) {
				state.tableData.loading = false;
				ElMessage.error(res.errmsg);
				return;
			}
			state.tableData.data[state.tableDataIndex].ImgUrl = res.data.src;
			state.tableData.loading = false;
		};
		const onBeforeImageUpload: UploadProps['beforeUpload'] = () => {
			state.tableData.loading = true;
			state.httpHeaders=proxy.$getRequestHeaders();
			return true;
		};
		const Upload = (index: number) => {
			state.tableDataIndex = index;
		};
		const showImage = (imgUrl: string) => {
			state.imgList = [];
			if (imgUrl != '' && imgUrl) {
				state.imgViewerVisible = true;
				state.imgList.push(state.imgUrl + imgUrl);
			} else {
				ElMessage.error('暂无影印件');
			}
		};
		const closeImgViewer = () => {
			state.imgViewerVisible = false;
		};
		// 页面加载时
		onMounted(() => {
			onGetMainTableData(true);
		});

		return {
			proxy,
			Upload,
			getUserInfos,
			onBeforeImageUpload,
			tableDataAdd,
			onModelDel,
			onModelSave,
			showImage,
			closeImgViewer,
			onLogoUploadSuccess,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
</style>
