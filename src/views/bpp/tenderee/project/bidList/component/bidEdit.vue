<template>
		<el-row v-if="state.isShowPage">
			<el-col class="tenderee-project-bidedit" :span="3" style="padding-top: 20px; padding-bottom: 20px;">
				<el-aside width="200px" class="pt2">
					<el-menu class="el-menu-vertical-demo" default-active="fileSee" @select="select">
						<el-sub-menu index="before">
							<template #title>评选准备</template>
							<el-menu-item index="fileSee">招标文件</el-menu-item>
							<el-menu-item index="expert">选择评选专家</el-menu-item>
							<el-menu-item index="settingLine">复核评选参数</el-menu-item>
						</el-sub-menu>
						<el-sub-menu index="2">
							<template #title>项目开标</template>
							<el-menu-item index="packageEdit">选择项目包号</el-menu-item>
							<el-menu-item index="companyList">投标人名单</el-menu-item>
							<el-menu-item index="bidList">开标一览表</el-menu-item>
						</el-sub-menu>
						<el-sub-menu index="3">
							<template #title>项目评标</template>
							<el-menu-item index="zgpsGather">资格评分汇总</el-menu-item>
							<el-menu-item index="jspsGather">技术评分汇总</el-menu-item>
							<el-menu-item index="jjpsGather">价格评分汇总</el-menu-item>
						</el-sub-menu>
						<el-sub-menu index="4">
							<template #title>评标结果</template>
							<el-menu-item index="gatherList">评分汇总</el-menu-item>
							<el-menu-item index="rfeportSee">评标报告</el-menu-item>
							<el-menu-item index="noticeEdit">发布中选公告</el-menu-item>
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
									<el-button type="primary" @click="openNoticeSee">查看公告</el-button>
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
					<fileSee ref="fileSeeRef"/>
					<expertEdit ref="expertEditRef"/>
					<settingLineList ref="settingLineListRef"/>
					<packageEdit ref="packageEditRef"/>
					<companyList ref="companyListRef"/>
					<bidList ref="bidListRef"/>
					<zgpsGather ref="zgpsGatherRef"/>
					<jspsGather ref="jspsGatherRef"/>
					<jjpsGather ref="jjpsGatherRef"/>
					<gatherList ref="gatherListRef"/>
					<rfeportSee ref="rfeportSeeRef"/>
					<noticeEdit ref="noticeEditRef"/>
					<noticeSee ref="noticeSeeRef"/>
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
import { getCurrentInstance, onMounted, nextTick, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import bidList from './bid/bidList.vue';
import companyList from './bid/companyList.vue';
import expertEdit from './bid/expertEdit.vue';
import fileSee from './bid/fileSee.vue';
import gatherList from './bid/gatherList.vue';
import jjpsGather from './bid/jjpsGather.vue';
import jspsGather from './bid/jspsGather.vue';
import noticeEdit from './bid/noticeEdit.vue';
import noticeSee from './bid/noticeSee.vue';
import packageEdit from './bid/packageEdit.vue';
import rfeportSee from './bid/rfeportSee.vue';
import zgpsGather from './bid/zgpsGather.vue';
import settingLineList from './bid/settingLineList.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore()
const fileSeeRef = ref();
const expertEditRef = ref();
const settingLineListRef = ref();
const packageEditRef = ref();
const companyListRef = ref();
const bidListRef = ref();
const zgpsGatherRef = ref();
const jspsGatherRef = ref();
const jjpsGatherRef = ref();
const gatherListRef = ref();
const rfeportSeeRef = ref();
const noticeEditRef = ref();
const noticeSeeRef = ref();
const state = reactive({
	isShowPage: false,
	isShowDialog: false,
	loading: false,
	indexLine: 'fileSee',
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
	state.indexLine = 'fileSee'
	GetByIdRow()
	nextTick(() => {
		select(state.indexLine)
    });
};

//	关闭页面
const closePage = async () => {
	state.isShowPage = false
	state.indexLine = 'fileSee';
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
const openNoticeSee = async () => {
	noticeSeeRef.value.openDialog(state.projectForm)
};

const select = (val: string) => {
	switch (state.indexLine) {
		case 'fileSee':
			fileSeeRef.value.closePage()
			break
		case 'expert':
			expertEditRef.value.closePage()
			break
		case 'settingLine':
			settingLineListRef.value.closePage()
			break
		case'packageEdit':
			packageEditRef.value.closePage()
			break
		case 'companyList':
			companyListRef.value.closePage()
			break
		case 'bidList':
			bidListRef.value.closePage()
			break
		case 'zgpsGather':
			zgpsGatherRef.value.closePage()
			break
		case 'jspsGather':
			jspsGatherRef.value.closePage()
			break
		case 'jjpsGather':
			jjpsGatherRef.value.closePage()
			break
		case 'gatherList':
			gatherListRef.value.closePage()
			break
		case 'rfeportSee':
			rfeportSeeRef.value.closePage()
			break
		case 'noticeEdit':
			noticeEditRef.value.closePage()
			break
		case 'noticeSee':
			noticeSeeRef.value.closePage()
			break
	}
	state.indexLine = val
	switch (val) {
		case 'fileSee':
			fileSeeRef.value.openPage(state.projectForm)
			break
		case 'expert':
			expertEditRef.value.openPage(state.projectForm)
			break
		case 'settingLine':
			settingLineListRef.value.openPage(state.projectForm)
			break
		case'packageEdit':
			packageEditRef.value.openPage(state.projectForm)
			break
		case 'companyList':
			companyListRef.value.openPage(state.projectForm)
			break
		case 'bidList':
			bidListRef.value.openPage(state.projectForm)
			break
		case 'zgpsGather':
			zgpsGatherRef.value.openPage(state.projectForm)
			break
		case 'jspsGather':
			jspsGatherRef.value.openPage(state.projectForm)
			break
		case 'jjpsGather':
			jjpsGatherRef.value.openPage(state.projectForm)
			break
		case 'gatherList':
			gatherListRef.value.openPage(state.projectForm)
			break
		case 'rfeportSee':
			rfeportSeeRef.value.openPage(state.projectForm)
			break
		case 'noticeEdit':
			noticeEditRef.value.openPage(state.projectForm)
			break
		case 'noticeSee':
			noticeSeeRef.value.openPage(state.projectForm)
			break
	}
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
			const res = await proxy.$api.erp.projectbid.delete(state.projectId);
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
		const res = await proxy.$api.erp.projectbid.getById(state.projectId);
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
			const res = proxy.$api.erp.projectbid.save(state.ruleForm);
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
.tenderee-project-bidedit {
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