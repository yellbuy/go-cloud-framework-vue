<template>
	<div class="el-card is-hover-shadow" v-if="isSelection">
		<el-row :gutter="20">
			<el-col :span="10">
				<el-timeline>
					<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
						{{ activity.content }}
					</el-timeline-item>
				</el-timeline>
			</el-col>
			<el-col :span="14">
				<div class="flex-center layout-backtop">
					<el-card shadow="hover">
						<div style="float: left">
							<el-button type="primary" @click="changeSelection">
								<el-icon>
									<Edit />
								</el-icon>
								&#8197;{{ $t('message.action.return') }}
							</el-button>
							<el-button type="info" @click="GetByIdRow()">
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
export default {
	name: 'api_sys_project_signup',
	components: {},
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
		const { dateFormat } = commonFunction();
		const GetByIdRow = async () => {
			let Id = store.state.project.projectId;
			state.isSelection = true;
			try {
				const res = await proxy.$api.erp.project.signUpDetail(Id);
				if (res.errcode != 0) {
					return;
				}
				// store.commit('project/getProject', res.data);
				// state.ruleForm = res.data;
				// res.data.ProjectType = res.data.ProjectType.toString();
				// if (isState) {
				// 	// select(state.indexLine);
				// }
			} finally {
				state.isShowDialog = true;
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
			dateFormat,
			changeSelection,
			t,
			GetByIdRow,
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
</style>