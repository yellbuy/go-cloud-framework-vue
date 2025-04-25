<template>
		<el-row v-if="state.isShowPage">
			<el-col class="tenderee-project-projectselection" :span="3" style="padding-top: 20px; padding-bottom: 20px;">
				<el-aside width="200px" class="pt2">
					<el-menu class="el-menu-vertical-demo" default-active="bidFileSee" @select="select">
						<el-sub-menu index="before">
							<template #title>评选准备</template>
							<el-menu-item index="bidFileSee">招标文件</el-menu-item>
							<el-menu-item index="expertEdit">选择评选专家</el-menu-item>
							<el-menu-item index="settingLineList">复核评选参数</el-menu-item>
						</el-sub-menu>
						<el-sub-menu index="2">
							<template #title>项目开标</template>
							<el-menu-item index="packageList">选择项目包号</el-menu-item>
							<el-menu-item index="companyList">投标人名单</el-menu-item>
							<el-menu-item index="bidOpenList">开标一览表</el-menu-item>
						</el-sub-menu>
						<el-sub-menu index="3">
							<template #title>项目评标</template>
							<el-menu-item index="zgpsGatherList">资格评分汇总</el-menu-item>
							<el-menu-item index="jspsGatherList">技术评分汇总</el-menu-item>
							<el-menu-item index="jjpsGatherList">价格评分汇总</el-menu-item>
						</el-sub-menu>
						<el-sub-menu index="4">
							<template #title>评标结果</template>
							<el-menu-item index="gatherList">评分汇总</el-menu-item>
							<el-menu-item index="reviewReportSee">评标报告</el-menu-item>
							<el-menu-item index="bidNoticeEdit">发布中选公告</el-menu-item>
						</el-sub-menu>
					</el-menu>
				</el-aside>
			</el-col>
			<el-col :span="21" style="padding-top: 20px; padding-bottom: 20px;">
				<el-card>
					<template #header>
						<el-row>
							<el-col :span="8">
								<div style="float: left">
									<el-button type="primary" @click="openProjectNoticeSee">查看公告</el-button>
									<el-button type="primary" @click="refreshPage">刷新</el-button>
									<!-- <el-button type="primary" @click="handleClick">全屏</el-button> -->
								</div>
							</el-col>
							<el-col :span="8">
								<div style="float: center">
									<h3>当前选择项目：{{ state.projectForm.Name }}</h3>
								</div>
							</el-col>
							<el-col :span="8">
								<el-dropdown style="float: right">
									<el-button type="primary">
										其他操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
									</el-button>
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item @click="closePage">返回其他项目</el-dropdown-item>
											<el-dropdown-item @click="onDialog">修改开标时间</el-dropdown-item>
											<el-dropdown-item @click="onModelDel">项目报废</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</el-col>
						</el-row>
					</template>
					<bidFileSee ref="bidFileSeeRef" v-if="state.indexLine === 'bidFileSee'"/>
					<expertEdit ref="expertEditRef" v-else-if="state.indexLine === 'expertEdit'"/>
					<settingLineList ref="settingLineListRef" v-else-if="state.indexLine === 'settingLineList'"/>
					<packageList ref="packageListRef" v-else-if="state.indexLine === 'packageList'"/>
					<companyList ref="companyListRef" v-else-if="state.indexLine === 'companyList'"/>
					<bidOpenList ref="bidOpenListRef" v-else-if="state.indexLine === 'bidOpenList'"/>
					<zgpsGatherList ref="zgpsGatherListRef" v-else-if="state.indexLine === 'zgpsGatherList'"/>
					<jspsGatherList ref="jspsGatherListRef" v-else-if="state.indexLine === 'jspsGatherList'"/>
					<jjpsGatherList ref="jjpsGatherListRef" v-else-if="state.indexLine === 'jjpsGatherList'"/>
					<gatherList ref="gatherListRef" v-else-if="state.indexLine === 'gatherList'"/>
					<reviewReportSee ref="reviewReportSeeRef" v-else-if="state.indexLine === 'reviewReportSee'"/>
					<bidNoticeEdit ref="bidNoticeEditRef" v-else-if="state.indexLine === 'bidNoticeEdit'"/>
					<projectNoticeSee ref="projectNoticeSeeRef"/>
				</el-card>
			</el-col>
			<el-dialog :title="state.title" v-model="state.isShowDialog" width="25%" :before-close="closeDialog">
				<el-form ref="ruleFormRef" :model="state.projectForm" :rules="rules" size="small" label-suffix="：" label-width="130px" v-loading="state.loading">
					<el-form-item label="开标时间" prop="BidOpenTime">
						<el-date-picker v-model="state.projectForm.BidOpenTime" type="datetime" placeholder="请选择时间" style="width: 100%"/>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button text bg type="primary" @click="closeDialog">取消</el-button>
						<el-button type="primary" @click="onSubmit" >确定</el-button>
					</span>
				</template>
			</el-dialog>
		</el-row>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import bidFileSee from './bidFileSee.vue';
import bidNoticeEdit from './bidNoticeEdit.vue';
import bidOpenList from './bidOpenList.vue';
import companyList from './companyList.vue';
import expertEdit from './expertEdit.vue';
import gatherList from './gatherList.vue';
import jjpsGatherList from './jjpsGatherList.vue';
import jspsGatherList from './jspsGatherList.vue';
import packageList from './packageList.vue';
import projectNoticeSee from './projectNoticeSee.vue';
import reviewReportSee from './reviewReportSee.vue';
import settingLineList from './settingLineList.vue';
import zgpsGatherList from './zgpsGatherList.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore()
const bidFileSeeRef = ref();
const expertEditRef = ref();
const settingLineListRef = ref();
const packageListRef = ref();
const companyListRef = ref();
const bidOpenListRef = ref();
const zgpsGatherListRef = ref();
const jspsGatherListRef = ref();
const jjpsGatherListRef = ref();
const gatherListRef = ref();
const reviewReportSeeRef = ref();
const projectNoticeSeeRef = ref();
const bidNoticeEditRef = ref();

const state = reactive({
	isShowPage: false,
	isShowDialog: false,
	loading: false,
	indexLine: 'bidFileSee',
	title: t('message.action.Edit'),
	httpsText: import.meta.env.VITE_URL as any,
	projectId: '',
	projectForm: {},
	ruleForm: {},
});

//	打开页面
const openPage = async (id: string) => {
	state.projectId = id
	state.isShowPage = true
	state.indexLine = 'bidFileSee'
	GetByIdRow()
	select(state.indexLine)

};

//	关闭页面
const closePage = async () => {
	state.isShowPage = false
	state.indexLine = 'bidFileSee';
	state.projectId = ''
	state.projectForm = {}
	proxy.$parent.isShowPage = true;
	proxy.$parent.onGetTableData()
}

//	刷新页面
const refreshPage = async () => {
	GetByIdRow()
	select(state.indexLine)
}

//	查看公告
const openProjectNoticeSee = () => {
	projectNoticeSeeRef.value.openDialog(state.projectForm)
};

const select = (val: string) => {
	state.indexLine = val
	nextTick(() => {
		switch (val) {
			case 'bidFileSee':
				bidFileSeeRef.value.openPage(state.projectForm)
				break
			case 'expertEdit':
				expertEditRef.value.openPage(state.projectForm)
				break
			case 'settingLineList':
				settingLineListRef.value.openPage(state.projectForm)
				break
			case'packageList':
				packageListRef.value.openPage(state.projectForm)
				break
			case 'companyList':
				companyListRef.value.openPage(state.projectForm)
				break
			case 'bidOpenList':
				bidOpenListRef.value.openPage(state.projectForm)
				break
			case 'zgpsGatherList':
				zgpsGatherListRef.value.openPage(state.projectForm)
				break
			case 'jspsGatherList':
				jspsGatherListRef.value.openPage(state.projectForm)
				break
			case 'jjpsGatherList':
				jjpsGatherListRef.value.openPage(state.projectForm)
				break
			case 'gatherList':
				gatherListRef.value.openPage(state.projectForm)
				break
			case 'reviewReportSee':
				reviewReportSeeRef.value.openPage(state.projectForm)
				break
			case 'bidNoticeEdit':
				bidNoticeEditRef.value.openPage(state.projectForm)
				break
			case 'projectNoticeSee':
				projectNoticeSeeRef.value.openPage(state.projectForm)
				break
		}
	});
};

//	打开修改开标时间编辑弹窗
const onDialog = async () => {
	state.isShowDialog = true;
	state.title = t('message.action.edit');
};

//	关闭修改开标时间编辑窗口
const closeDialog = async () => {
	state.isShowDialog = false
	state.ruleForm = {};
};

// 项目作废
const onModelDel = () => {
	ElMessageBox.confirm(`确定要作废该项目吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.erp.projectBid.delete(state.projectId);
			if (res.errcode != 0) {
				return;
			}
		} finally {
		}
		
		closePage()
		return false;
	});
};

//	获取项目信息
const GetByIdRow = async () => {
	try {
		const res = await proxy.$api.erp.projectBid.getById(state.projectId);
		if (res.errcode != 0) {
			return;
		}
		state.projectForm = res.data
	} finally {
	}
};

//	确定提交创建项
const onSubmit = () => {
	ElMessageBox.confirm(`确定要修改该项目开标时间吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			state.ruleForm.Id = state.projectForm.Id
			state.ruleForm.BidOpenTime = state.projectForm.BidOpenTime
			const res = proxy.$api.erp.projectBid.saveBid(state.ruleForm);
			if (res.errcode != 0) {
				return
			}
		} finally {
		}
		closeDialog()
	});
};

const handleClick = () => {
	alert('button click');
}

const { dateFormat } = commonFunction();

//	页面加载时
onMounted(() => {

});

//	公开方法属性
defineExpose({openPage, closePage, GetByIdRow, ...toRefs(state)})

</script>
<style  lang="scss">
.tenderee-project-projectselection {
	.el-menu-item, .el-sub-menu__title{
		color: var(--el-menu-active-color) !important;
	}
	.el-sub-menu.is-active .el-sub-menu__title {
		color: var(--el-menu-active-color) !important;
	}
	.el-menu-item:not(.is-active), .el-sub-menu__title {
		color: var(--el-text-color-regular) !important;
	}
	// 默认 hover 时
	.el-menu-item:hover, .el-sub-menu__title:hover {
		color: var(--el-menu-active-color) !important;
		background-color: transparent !important;
		i {
			color: var(--el-menu-active-color);
		}
	}
}

</style>