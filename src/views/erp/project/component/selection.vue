<template>
	<div class="el-card is-hover-shadow" v-if="isSelection">
		<el-row :gutter="20">
			<el-col :span="4">
				<el-menu
					active-text-color="#ffd04b"
					class="el-menu-vertical-demo"
					background-color="#545c64"
					default-active="file"
					text-color="#fff"
					@select="select"
				>
					<el-sub-menu index="before">
						<template #title>评选准备</template>
						<el-menu-item index="file">比选文件</el-menu-item>
						<el-menu-item index="expert">选择评选专家</el-menu-item>
						<el-menu-item index="review">复核评选参数</el-menu-item>
					</el-sub-menu>
					<el-sub-menu index="2">
						<template #title>项目评选</template>
						<el-menu-item index="bid">选择项目包号</el-menu-item>
						<el-menu-item index="companyBid">比选人名单</el-menu-item>
						<el-menu-item index="2-3">评选一览表</el-menu-item>
					</el-sub-menu>
					<el-sub-menu index="3">
						<template #title>评标明细</template>
						<el-menu-item index="3-1">资格评分汇总</el-menu-item>
						<el-menu-item index="3-2">技术评分汇总</el-menu-item>
						<el-menu-item index="3-3">价格评分汇总</el-menu-item>
					</el-sub-menu>
					<el-sub-menu index="4">
						<template #title>评选准备</template>
						<el-menu-item index="4-1">评分汇总</el-menu-item>
						<el-menu-item index="4-2">评选报告</el-menu-item>
						<el-menu-item index="4-3">发布中选公告</el-menu-item>
					</el-sub-menu>
				</el-menu>
			</el-col>
			<el-col :span="20">
				<div class="flex-center layout-backtop">
					<el-card shadow="hover">
						<div style="float: left">
							<el-button type="primary" @click="changeSelection">
								<el-icon>
									<Edit />
								</el-icon>
								&#8197;{{ $t('message.action.return') }}
							</el-button>
							<el-button type="info" @click="GetByIdRow">
								<el-icon>
									<Refresh />
								</el-icon>
								&#8197;{{ $t('message.action.refresh') }}
							</el-button>
						</div>
						<h3 style="text-align: center">当前选择项目：{{ ruleForm.Name }}</h3>
					</el-card>
					<el-card style="margin-top: 20px">
						<expertEdit ref="expertEditRef" v-show="indexLine == 'expert'" />
						<reviewEdit ref="reviewEditRef" v-show="indexLine == 'review'" />
						<bidEdit ref="bidEditRef" v-show="indexLine == 'bid'" />
						<companyBid ref="companyBidRef" v-show="indexLine == 'companyBid'" />
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
import { useStore } from '/@/store/index';
import { ElMessageBox, ElMessage } from 'element-plus';
import reviewEdit from './selection/reviewEdit.vue';
import expertEdit from './selection/expertEdit.vue';
import bidEdit from './selection/projectBid.vue';
import companyBid from './selection/companyBid.vue';
export default {
	name: 'api_sys_project_selection',
	components: { reviewEdit, expertEdit, bidEdit, companyBid },
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
			isSelection: false,
			indexLine: 'file',
		});
		const reviewEditRef = ref();
		const expertEditRef = ref();
		const bidEditRef = ref();
		const companyBidRef = ref();
		const { dateFormat } = commonFunction();
		const GetByIdRow = async () => {
			let Id = store.state.project.projectId;
			state.isSelection = true;
			try {
				const res = await proxy.$api.erp.project.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				store.commit('project/getProject', res.data);
				state.ruleForm = res.data;
				res.data.ProjectType = res.data.ProjectType.toString();
				if (state.ruleForm.Files != '') {
					let Files = res.data.Files.split(',');
					state.FilesList = [];
					for (let i = 0; i < Files.length; i++) {
						let image = { url: '' };
						image.url = state.httpsText + Files[i];
						state.FilesList.push(image);
					}
				}
				select(state.indexLine);
			} finally {
				state.isShowDialog = true;
			}
		};

		const select = (key: string) => {
			state.indexLine = key;
			switch (state.indexLine) {
				case 'expert':
					expertEditRef.value.getExpertList();
					break;
				case 'review':
					reviewEditRef.value.getProject();
					break;
				case 'bid':
					bidEditRef.value.getBidList();
					break;
				case 'companyBid':
					companyBidRef.value.getCompanyList();
					break;
			}
		};
		const changeSelection = () => {
			state.isSelection = false;
			state.indexLine = 'file';
			proxy.$parent.isSelection = true;
		};
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			expertEditRef,
			reviewEditRef,
			bidEditRef,
			companyBidRef,
			dateFormat,
			changeSelection,
			select,
			t,
			GetByIdRow,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
</style>