<template>
	<div class="el-card is-hover-shadow" v-if="isSelection">
		<el-row :gutter="20">
			<el-col :span="4">
				<el-menu
					active-text-color="#ffd04b"
					class="el-menu-vertical-demo"
					background-color="#545c64"
					default-active="leader"
					text-color="#fff"
					@select="select"
				>
					<el-sub-menu index="before">
						<template #title>评选管理</template>
						<el-menu-item index="leader">评选组长管理</el-menu-item>
						<el-menu-item index="seeSetting">查看评审参数</el-menu-item>
						<el-menu-item index="zgps">资格评审</el-menu-item>
					</el-sub-menu>
					<el-sub-menu index="2">
						<template #title>评选汇总</template>
						<!-- <el-menu-item index="bid">选择项目包号</el-menu-item> -->
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
							<el-button type="info" @click="GetByIdRow(true)">
								<el-icon>
									<Refresh />
								</el-icon>
								&#8197;{{ $t('message.action.refresh') }}
							</el-button>
						</div>
						<h3 style="text-align: center">当前选择项目：{{ ruleForm.Name }}</h3>
						<el-descriptions style="margin-top: 20px" :column="2">
							<el-descriptions-item label="项目名称：">{{ ruleForm.Name }}</el-descriptions-item>
							<el-descriptions-item label="项目编号：">{{ ruleForm.No }}</el-descriptions-item>
							<el-descriptions-item label="评选时间：">{{ ruleForm.ReviewTime }}</el-descriptions-item>
							<el-descriptions-item label="评选地点：">{{ ruleForm.Location }} </el-descriptions-item>
						</el-descriptions>
					</el-card>
					<el-card>
						<expertLeader ref="expertLeaderRef" v-show="indexLine == 'leader'" />
						<expertSeeSetting ref="expertSeeSettingRef" v-show="indexLine == 'seeSetting'" />
						<expertZgps ref="expertZgpsRef" v-show="indexLine == 'zgps'" />
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
// import reviewEdit from './selection/reviewEdit.vue';
// import expertEdit from './selection/expertEdit.vue';
// import bidEdit from './selection/projectBid.vue';
// import companyBid from './selection/companyBid.vue';
import expertLeader from './leader.vue';
import expertSeeSetting from './seeSetting.vue';
import expertZgps from './zgps.vue';
export default {
	name: 'api_sys_project_selection',
	components: { expertLeader, expertSeeSetting, expertZgps },
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
			indexLine: 'leader',
		});
		const expertLeaderRef = ref();
		const expertSeeSettingRef = ref();
		const expertZgpsRef = ref();
		const { dateFormat } = commonFunction();
		const GetByIdRow = async (isState: boolean) => {
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
				if (isState) {
					select(state.indexLine);
				}
			} finally {
				state.isShowDialog = true;
			}
		};

		const select = (key: string) => {
			state.indexLine = key;
			switch (state.indexLine) {
				case 'leader':
					expertLeaderRef.value.getExpertList();
					break;
				case 'seeSetting':
					expertSeeSettingRef.value.onLoadTable();
					break;
				case 'zgps':
					expertZgpsRef.value.GetSignUpList(true);
					break;
			}
		};
		const changeSelection = () => {
			state.isSelection = false;
			state.indexLine = 'leader';
			proxy.$parent.isSelection = true;
		};
		// 页面加载时
		onMounted(() => {});
		return {
			proxy,
			expertLeaderRef,
			expertSeeSettingRef,
			expertZgpsRef,
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