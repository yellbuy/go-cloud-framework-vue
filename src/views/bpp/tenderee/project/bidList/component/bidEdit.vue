<template>
	<div class="tenderee-project-bidedit" v-if="isShowPage">
		<el-container>
			<el-aside width="200px" class="pt2">
				<el-menu class="el-menu-vertical-demo" default-active="fileSee" @select="select">
					<el-sub-menu index="before">
						<template #title>评选准备</template>
						<el-menu-item index="fileSee">招标文件</el-menu-item>
						<el-menu-item index="expert">选择评选专家</el-menu-item>
						<el-menu-item index="parameter">复核评选参数</el-menu-item>
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
		<el-main class="pt2" >
			<el-card>
				<template #header>
					<el-row>
						<el-col :span="8">
							<div style="float: left">
								<el-button type="primary" @click="changeSelection">查看公告</el-button>
								<el-button type="primary" @click="changeSelection">刷新</el-button>
								<el-button type="primary" @click="changeSelection">全屏</el-button>
								<el-button type="primary" @click="GetByIdRow(true)">刷新</el-button>
							</div>
						</el-col>
						<el-col :span="8">
							<div style="float: center">
								<h3>当前选择项目：{{ ruleForm.Name }}</h3>
							</div>
						</el-col>
						<el-col :span="8">
							<el-dropdown trigger="click" style="float: right;">
								<el-button type="primary">其他操作</el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>返回其他项目</el-dropdown-item>
									<el-dropdown-item>修改开标时间</el-dropdown-item>
									<el-dropdown-item>项目报废</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-col>
					</el-row>
				</template>
				<fileSee v-if="indexLine == 'fileSee'"/>
				<expertEdit v-else-if="indexLine == 'expert'" />
				<reviewEdit v-else-if="indexLine == 'parameter'" />
				<packageEdit v-else-if="indexLine == 'packageEdit'" />
				<companyList v-else-if="indexLine == 'companyList'" />
				<bidList v-else-if="indexLine == 'bidList'"/>
				<zgpsGather v-else-if="indexLine == 'zgpsGather'" />
				<jspsGather v-else-if="indexLine == 'jspsGather'" />
				<jjpsGather v-else-if="indexLine == 'jjpsGather'" />
				<gatherList v-else-if="indexLine == 'gatherList'" />
				<rfeportSee v-else-if="indexLine == 'rfeportSee'"/>
				<noticeEdit v-else-if="indexLine == 'noticeEdit'"/>
			</el-card>
		</el-main>
		</el-container>
	</div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import bidList from './bid/bidList.vue';
import companyList from './bid/companyList.vue';
import expertEdit from './bid/expertEdit.vue';
import fileSee from './bid/fileSee.vue';
import gatherList from './bid/gatherList.vue';
import jjpsGather from './bid/jjpsGather.vue';
import jspsGather from './bid/jspsGather.vue';
import noticeEdit from './bid/noticeEdit.vue';
import packageEdit from './bid/packageEdit.vue';
import rfeportSee from './bid/rfeportSee.vue';
import zgpsGather from './bid/zgpsGather.vue';
import reviewEdit from './create/parameterEdit.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'api_sys_project_selection',
	components: { fileSee, expertEdit, reviewEdit, packageEdit, companyList, bidList, zgpsGather, jspsGather, jjpsGather, gatherList, rfeportSee, noticeEdit },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.see'),
			ruleForm: {},
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
			menuIndex: 1,
			isShowPage: false,
			indexLine: 'fileSee',
		});
		const { dateFormat } = commonFunction();
		const GetByIdRow = async (isState: boolean) => {
			let Id = store.state.project.projectId;
			state.isShowPage = true;
			// try {
			// 	const res = await proxy.$api.erp.project.getById(Id);
			// 	if (res.errcode != 0) {
			// 		return;
			// 	}
			// 	store.commit('project/getProject', res.data);
			// 	state.ruleForm = res.data;
			// 	res.data.ProjectType = res.data.ProjectType.toString();
			// 	if (state.ruleForm.Files != '') {
			// 		let Files = res.data.Files.split(',');
			// 		state.FilesList = [];
			// 		for (let i = 0; i < Files.length; i++) {
			// 			let image = { url: '' };
			// 			image.url = state.httpsText + Files[i];
			// 			state.FilesList.push(image);
			// 		}
			// 	}
			// 	if (isState) {
			// 		select(state.indexLine);
			// 	}
			// } finally {
			// 	state.isShowPage = true;
			// }
		};

		const select = (key: string) => {
			state.indexLine = key;
			switch (state.indexLine) {
				case 'fileSee':
					// fileSeeRef.value.getExpertList(true);
					break;
				case 'expert':
					// expertEditRef.value.getExpertList(true);
					break;
				case 'parameter':
					// reviewEditRef.value.onLoadTable(true);
					break;
				case 'packageEdit':
					// packageEditRef.value.getBidList();
					break;
				case 'companyList':
					// companyListRef.value.getCompanyList(true);
					break;
				case 'bidList':
					// bidListRef.value.getCompanyList(true);
					break;
				case 'zgpsGather':
					// zgpsGatherRef.value.GetSignUpList(true, true);
					break;
				case 'jspsGather':
					// jspsGatherRef.value.GetSignUpList(true, true);
					break;
				case 'jjpsGather':
					// jjpsGatherRef.value.GetSignUpList(true, true);
					break;
				case 'gatherList':
					// gatherListRef.value.GetSignUpList(true, true);
					break;
				case 'rfeportSee':
					// rfeportSeeRef.value.getExpertList(true);
					break;
				case 'noticeEdit':
					// noticeEditRef.value.GetByIdRow(0);
					break;
			}
		};
		const changeSelection = () => {
			state.isShowPage = false
			state.indexLine = 'fileSee';
			proxy.$parent.isShowPage = true;
		};
		const handleClick = () => {
			alert('button click');
		}

		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			dateFormat,
			handleClick,
			changeSelection,
			select,
			t,
			GetByIdRow,
			...toRefs(state),
		};
	},
};
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