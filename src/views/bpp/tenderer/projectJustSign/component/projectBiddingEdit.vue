<template>
	<div>
		<div>
			<el-steps style="max-width: 720px;margin-left: auto;margin-right:auto;" :active="state.stepIndex" finish-status="finish" align-center>
				<el-step title="上传商务文件" />
				<el-step title="上传技术文件" />
				<el-step title="上传其他文件" />
				<el-step title="填写开标一览表" />
				<el-step title="完成投标" />
			</el-steps>
		</div>
		<el-divider border-style="dashed" />			
		<el-row>
			<el-col :span="24" >
				<div v-if="state.stepIndex==0">
					<el-table :data="state.tableData.swFileList" v-loading="state.tableData.loading" style="width: 600px;margin-left:auto;margin-right: auto;" stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="60" />
						<el-table-column prop="Name" label="文件名">
							<template #default="scope">
								<el-input v-model="scope.row.Name" placeholder="请输入"/> 
							</template>
						</el-table-column>
						<el-table-column :label="$t('message.action.operate')" width="180" align="left">
							<template #header >
								<el-upload
									:action="state.uploadURL"
									:accept="'.jpg,.jpeg,.pdf'"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="(file) => onSuccessFile(file)"
									:show-file-list="false"
									v-if="state.projectCompanyForm.State == 0">
									<template #default>
										<el-button type="primary" align="right">上传</el-button>
									</template>
								</el-upload>
							</template>
							<template #default="scope">
								<el-row>
									<el-col :span="8">
										<el-button text bg type="primary" @click="onDownloadFile(scope.row.Files)">
											下载
										</el-button>
									</el-col>
									<el-col :span="8" v-if="state.projectCompanyForm.State == 0">
										<el-button text bg type="danger" @click="onDelProjectCompanyLineTableData(scope.$index)">
											删除
										</el-button>
									</el-col>
								</el-row>
							</template>
						</el-table-column>
					</el-table>
					<p class="text-center">
						<el-text class="mx-1" type="info">支持的文件格式:jpg|jpeg|pdf</el-text>
					</p>						
				</div>
				<div v-else-if="state.stepIndex == 1">
					<el-table :data="state.tableData.jsFileList" v-loading="state.tableData.loading" style="width: 600px;margin-left:auto;margin-right: auto;" stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="60" />
						<el-table-column prop="Name" label="文件名">
							<template #default="scope" v-if="state.projectCompanyForm.State == 0">
								<el-input
									v-model="scope.row.Name"
									placeholder="请输入"/> 
							</template>
						</el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="180" align="left">
							<template #header>
								<el-upload
									:action="state.uploadURL"
									:accept="'.jpg,.jpeg,.pdf'"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="(file) => onSuccessFile(file)"
									:show-file-list="false"
									v-if="state.projectCompanyForm.State == 0">
									<template #default>
										<el-button type="primary" align="right">上传</el-button>
									</template>
								</el-upload>
							</template>
							<template #default="scope">
								<el-row>
									<el-col :span="8">
										<el-button text bg type="primary"  @click="onDownloadFile(scope.row.filters)">
											下载
										</el-button>
									</el-col>
									<el-col :span="8" v-if="state.projectCompanyForm.State == 0">
										<el-button text bg type="danger" @click="onDelProjectCompanyLineTableData(scope.$index)">
											删除
										</el-button>
									</el-col>
								</el-row>
							</template>
						</el-table-column>
					</el-table>
					<p class="text-center">
						<el-text class="mx-1" type="info">支持的文件格式:jpg|jpeg|pdf</el-text>
					</p>						
				</div>		
				<div v-else-if="state.stepIndex==2">
					<el-table :data="state.tableData.qtFileList" v-loading="state.tableData.loading" style="width: 600px;margin-left:auto;margin-right: auto;" stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="60" />
						<el-table-column prop="Name" label="文件名">
							<template #default="scope" v-if="state.projectCompanyForm.State == 0">
								<el-input
									v-model="scope.row.Name"
									placeholder="请输入"/> 
							</template>
						</el-table-column>
						<el-table-column :label="$t('message.action.operate')" :width="180" align="left">
							<template #header>
								<el-upload
									:action="state.uploadURL"
									:accept="'.jpg,.jpeg,.pdf'"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="(file) => onSuccessFile(file)"
									:show-file-list="false"
									v-if="state.projectCompanyForm.State == 0">
									<template #default>
										<el-button type="primary" align="right">上传</el-button>
									</template>
								</el-upload>
							</template>
							<template #default="scope">
								<el-row>
									<el-col :span="8">
										<el-button text bg type="primary"  @click="onDownloadFile(scope.row.Files)">
											下载
										</el-button>
									</el-col>
									<el-col :span="8" v-if="state.projectCompanyForm.State == 0">
										<el-button text bg type="danger" @click="onDelProjectCompanyLineTableData(scope.$index)">
											删除
										</el-button>
									</el-col>
								</el-row>
							</template>
						</el-table-column>
					</el-table>
					<p class="text-center">
						<el-text class="mx-1" type="info">支持的文件格式:jpg|jpeg|pdf</el-text>
					</p>					
				</div>	
				<div v-else-if="state.stepIndex==3">
					<el-table :data="state.projectLineTableData.data" v-loading="state.projectLineTableData.loading" show-summary style="width: 900px;margin-left:auto;margin-right: auto;" border stripe highlight-current-row>
						<el-table-column type="index" label="序号" align="right" width="60" show-overflow-tooltip fixed />
						<el-table-column prop="No" label="物资编码"  width="100" show-overflow-tooltip fixed/>
						<el-table-column prop="Name" label="名称" show-overflow-tooltip/>
						<el-table-column prop="Content" label="明细项" width="150"/>
						<el-table-column prop="Unit" label="明细项单位" width="80"/>
						<el-table-column prop="Qty" label="采购数量" align="right" width="70"/>
						<el-table-column prop="Amount" label="单价" align="right" width="80" >
							<template #default="scope" v-if="state.projectCompanyForm.State == 0">
								<el-input-number v-model="scope.row.Price" :min="0" :max="1000000000000" style="width:90px" :step="10" :value-on-clear="0" :precision="2" :controls="false" controls-position="right" /> 
							</template>	
						</el-table-column>
						<el-table-column prop="Amount" label="总价" width="80" align="right"/>								
					</el-table>
					<el-row>
						<el-col :span="24" >
							<div style="width:900px;margin-left:auto;margin-right:auto;margin-top: 10px;" >
								<el-upload
									:action="state.uploadURL"
									:accept="'.xls,.xlsx,.doc,.docx,.png,.jpg,.jpeg,.pdf'"
									:headers="{ Appid: getUserInfos.appid, Authorization: token }"
									:on-success="(file) => onSuccessFile(file)"
									:limit="1"
									:show-file-list="false"
									v-if="state.projectCompanyForm.State == 0">
									<template #default>
										<el-button type="primary">上传附件</el-button>
									</template>
								</el-upload>
							</div>
						</el-col>
						<el-col :span="24">
							<div style="width:900px;margin-left:auto;margin-right:auto;margin-top: 10px;">
								<el-text class="mx-1" type="info">支持的文件格式:xls|xlsx|doc|docx|png|jpeg|pdf</el-text>
							</div>	
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-descriptions border style="width:900px;margin-left:auto;margin-right:auto;margin-top: 10px;" v-for="(item, index) in state.tableData.bidFileList" :key="index" >
								<el-descriptions-item label-align="left" width="85%" align="left" :label="item.Name">
									<el-button text bg type="primary"  @click="onDownloadFile(item.FilesList)">
										下载
									</el-button>
									<el-button text bg type="danger" v-if="state.projectCompanyForm.State == 0" @click="onDelProjectCompanyLineTableData(index)">
										删除
									</el-button>
								</el-descriptions-item>
							</el-descriptions>
						</el-col>
					</el-row>		
				</div>	
				<div v-else-if="state.stepIndex==4">
					<div class="text-center" v-if="state.projectCompanyForm.State == 0">
						<div>
							<SvgIcon name="fa fa-check-circle" color="green" :size="60" ></SvgIcon>
						</div>
						<div class="mt30 mb30" >
							<el-text type="info" size="default">投标文件已上传成功，确认无误后请点击确认提交，成功投标后数据将无法修改</el-text>	
						</div>
					</div>
					<div class="text-center" v-else>
						<div>
							<SvgIcon name="fa fa-check-circle" color="green" :size="60" ></SvgIcon>
						</div>
						<div class="mt30 mb30" >
							<el-text type="info" size="default">您已成功投标，当前投标资料只可查看，无法修改！</el-text>	
						</div>
					</div>
				</div>					
			</el-col>
		</el-row>
		<el-divider border-style="dashed" />
		<el-row>
			<el-col :span="24" class="text-center mt20">
				<el-button @click="closePage"  size="large">
					<SvgIcon name="fa fa-rotate-left" class="mr3"/>返回
				</el-button>
				<el-button @click="onStepChange(-1)" v-if="state.stepIndex > 0" type="primary" size="large">
					<SvgIcon name="fa fa-arrow-left" class="mr3"/>上一步
				</el-button>
				<el-button @click="onStepChange(1)" type="primary" v-if="state.stepIndex < 4" size="large">
					<SvgIcon name="fa fa-arrow-right" class="mr3"/>下一步
				</el-button>
				<el-button @click="submit" type="primary" v-if="state.stepIndex == 4 && state.projectCompanyForm.state == 0" size="large">
					<SvgIcon name="fa fa-rotate-right" class="mr3"/>确认投递
				</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, reactive, toRefs } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';


const moduleKey = 'api_sys_home_alias';
const route = useRoute();
const kind = route.params.kind||'bid';
const router = useRouter();
const { proxy } = getCurrentInstance() as any;
const store = useStore();
const token = Session.get('token');
// 获取用户信息 vuex
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});
const state = reactive({
	stepIndex: 0,
	stepName: '',
	moduleKey: moduleKey,
	isShowMore:false,
	baseUrl: import.meta.env.VITE_URL as any,
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	projectId: "",
	projectCompanyId: "",
	projectForm: {},
	projectCompanyForm:{},
	projectLineTableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	tableData:{
		data: [],
		swFileList:[],
		jsFileList:[],
		qtFileList:[],
		bidList:[],
		bidFileList:[],
		total: 0,
		loading: false,
		param: {
			current: 1,
			pageSize: 20,
		},
	},
	ruleForm: {
		fileList:[],
	},
});

state.tableData.param.pageIndex = computed(() => {
	return state.tableData.param.current - 1;
});
state.projectLineTableData.param.pageIndex = computed(() => {
	return state.projectLineTableData.param.current - 1;
});

state.stepName = computed(() => {
	switch (state.stepIndex) {
		case 0:
			return "swFile"
		case 1:
			return "jsFile"
		case 2:
			return "qtFile"
		case 3:
			return "bidFile"
	}
});

//	打开页面
const openPage = async (data: object) => {
	state.projectCompanyId = data.projectCompanyId
	state.projectId = data.projectId
	console.log("测试", state.projectId )
	onGetProjectCompanyData()
	onGetProjectLineTableData()
	onGetTableData()
};

//	关闭页面
const closePage = async () => {
	nextTick(() => {
		proxy.$parent.$parent.isShowIndex = 'info';
		proxy.$parent.$parent.onGetTableData()
    });
}

//	获取公司已报名详细信息
const onGetProjectCompanyData = async () => {
	try {
		const res = await proxy.$api.erp.projectcompany.getById(state.projectCompanyId);
		if (res.errcode != 0) {
			return;
		}
		state.projectCompanyForm = res.data;
	} finally {
	}
};

//	获取标的物项目信息
const onGetProjectLineTableData = async () => {
	//	获取标的物项目信息
	state.projectLineTableData.loading = true;
	try {
		state.projectLineTableData.param.projectId = state.projectId
		const res = await proxy.$api.erp.projectline.getListByScope(state.projectLineTableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.projectLineTableData.data = res.data;
		state.projectLineTableData.total = res.total;
	} finally {
		state.projectLineTableData.loading = false;
	}
};

const onGetTableData = async () => {
	try {
		// 获取已报名信息详细信息文件表
		state.tableData.param.projectCompanyId = state.projectCompanyId
		const res = await proxy.$api.erp.projectcompanyline.getListByScope(0, 0, state.tableData.param);
		if (res.errcode != 0) {
			return;
		}
		state.tableData.swFileList = []
		state.tableData.jsFileList = []
		state.tableData.qtFileList = []
		state.tableData.bidFileList = []
		for (let item of res.data) {
			switch (item.Kind) {
				case "swFile":
					state.tableData.swFileList.push(item)
					break
				case "jsFile":
					state.tableData.jsFileList.push(item)
					break
				case "qtFile":
					state.tableData.qtFileList.push(item)
					break
				case "bidFile":
					state.tableData.bidFileList.push(item)
					break
			}
		}
	} finally {
	}
};

//	删除公司报名信息文件表数据
const onDelProjectCompanyLineTableData = async (index: Number) => {
	ElMessageBox.confirm(`确定删除文件吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		switch (state.stepName) {
		case 'swFile':
			state.tableData.swFileList.splice(index, 1)
			break;
		case 'jsFile':
			state.tableData.jsFileList.splice(index, 1)
			break;
		case 'qtFile':
			state.tableData.qtFileList.splice(index, 1)
			break;
		case 'bidFile':
			state.tableData.bidFileList.splice(index, 1)
			break;
		}
		return false;
	});
};

const onStepChange = (val: number) => {
	if (val == 0) {
		state.stepIndex = 0
	} else if (val == 1) {
		if(state.stepIndex < 4){
			state.stepIndex += 1
		}
	} else if ( val == -1) {
		if(state.stepIndex > 0){
			state.stepIndex -= 1
		}
	}
};

//	更新公司报名信息文件表上传的文件
const onSuccessFile = (file: UploadFile) => {
	let model = {}
	model.Kind = state.stepName
	model.Files = file.data.src
	switch (state.stepName) {
		case 'swFile':
			model.Name = "《商务文件》"+formatTimestamp(Date.now())
			state.tableData.swFileList.push(model)
			break;
		case 'jsFile':
			model.Name = "《技术文件》"+formatTimestamp(Date.now())
			state.tableData.jsFileList.push(model)
			break;
		case 'qtFile':
			model.Name = "《其他文件》"+formatTimestamp(Date.now())
			state.tableData.qtFileList.push(model)
			break;
		case 'bidFile':
			model.Name = "《开标一览表附件》"+formatTimestamp(Date.now())
			if (state.tableData.bidFileList.length >= 1) {
				ElMessage('上传失败，只允许上传一份附件！')
			} else {
				state.tableData.bidFileList.push(model)
			}
			break;
		}
};

// 下载文件
const onDownloadFile = async (path: string) => {
	var a = document.createElement('a');
	a.href = import.meta.env.VITE_URL + path;
	switch (state.stepName) {
		case 'swFile':
			a.download = "《商务文件》";
			break;
		case 'jsFile':
			a.download = "《技术文件》";
			break;
		case 'qtFile':
			a.download = "《其他文件》";
			break;
		case 'bidFile':
			a.download = "《开标一览表附件》";
			break;
		}
	a.click();
};

//	确认提交并更新公司报名项目状态
const submit = () => {
	ElMessageBox.confirm(`确认已检查文件上传无误，立刻提交吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			state.ruleForm.fileList = [...state.tableData.swFileList, ...state.tableData.jsFileList, ...state.tableData.qtFileList, ...state.tableData.bidFileList]
			const res = await proxy.$api.erp.projectcompanyline.saveBiding(state.projectCompanyId, state.ruleForm.fileList)
			if (res.errcode != 0) {
				return;
			}
			closePage()
			ElMessage('提交成功')
		} finally {
		}
		return false;
	}).catch(async () => {
		ElMessage('取消提交')
	});
};

const formatTimestamp = (timestamp) => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
	return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

// 页面加载时
onMounted(() => {
});

defineExpose({openPage, closePage, ...toRefs(state)})
</script>

<style scoped lang="scss">

</style>
