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
					:default-openeds="openeds"
					@select="select"
				>
					<el-sub-menu index="before">
						<template #title>评选管理</template>
						<el-menu-item index="leader">评选组长管理</el-menu-item>
						<el-menu-item index="seeSetting">查看评审参数</el-menu-item>
						<el-menu-item index="zgps">资格评审</el-menu-item>
						<el-menu-item index="jsps">技术评审</el-menu-item>
						<el-menu-item index="jjps">报价得分</el-menu-item>
					</el-sub-menu>
					<el-sub-menu index="gather">
						<template #title>评选汇总</template>
						<!-- <el-menu-item index="bid">选择项目包号</el-menu-item> -->
						<el-menu-item index="zgpsGather">资格评审汇总</el-menu-item>
						<el-menu-item index="jspsGather">技术评审汇总</el-menu-item>
						<el-menu-item index="jjpsGather">报价评审汇总</el-menu-item>
						<el-menu-item index="gather">评分汇总</el-menu-item>
						<el-menu-item index="signature">专家签章</el-menu-item>
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
						<expertJsps ref="expertJspsRef" v-show="indexLine == 'jsps'" />
						<expertJjps ref="expertJjpsRef" v-show="indexLine == 'jjps'" />
						<zgpsGather ref="zgpsGatherRef" v-show="indexLine == 'zgpsGather'" />
						<jspsGather ref="jspsGatherRef" v-show="indexLine == 'jspsGather'" />
						<jjpsGather ref="jjpsGatherRef" v-show="indexLine == 'jjpsGather'" />
						<gather ref="gatherRef" v-show="indexLine == 'gather'" />
						<signature ref="signatureRef" v-show="indexLine == 'signature'" />
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import expertJjps from './jjps.vue';
// import jjpsGather from './jjpsGather.vue';
import expertJsps from './jsps.vue';
// import jspsGather from './jspsGather.vue';
import expertLeader from './leader.vue';
import expertSeeSetting from './seeSetting.vue';
import expertZgps from './zgps.vue';
// import zgpsGather from './zgpsGather.vue';
import { useStore } from '/@/store/index';
import commonFunction from '/@/utils/commonFunction';
// import gather from '../../component/bidSelection/gather.vue';
import signature from './signature.vue';
export default {
	name: 'api_sys_project_selection',
	components: { expertLeader, expertSeeSetting, expertZgps, expertJsps, expertJjps, signature },
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
			openeds: ['before', 'gather'],
		});
		const expertLeaderRef = ref();
		const expertSeeSettingRef = ref();
		const expertZgpsRef = ref();
		const expertJjpsRef = ref();
		const expertJspsRef = ref();
		const zgpsGatherRef = ref();
		const jspsGatherRef = ref();
		const jjpsGatherRef = ref();
		const gatherRef = ref();
		const signatureRef = ref();
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
					expertLeaderRef.value.getExpertList(true);
					break;
				case 'seeSetting':
					expertSeeSettingRef.value.onLoadTable();
					break;
				case 'zgps':
					expertZgpsRef.value.GetSignUpList(true);
					break;
				case 'jsps':
					expertJspsRef.value.GetSignUpList(true);
					break;
				case 'jjps':
					expertJjpsRef.value.GetSignUpList(true);
					break;
				case 'zgpsGather':
					zgpsGatherRef.value.GetSignUpList(true, false);
					break;
				case 'jspsGather':
					jspsGatherRef.value.GetSignUpList(true, false);
					break;
				case 'jjpsGather':
					jjpsGatherRef.value.GetSignUpList(true, false);
					break;
				case 'gather':
					gatherRef.value.GetSignUpList(true, false);
					break;
				case 'signature':
					signatureRef.value.GetSignUpList(true);
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
			expertJspsRef,
			expertJjpsRef,
			zgpsGatherRef,
			jspsGatherRef,
			jjpsGatherRef,
			gatherRef,
			signatureRef,
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