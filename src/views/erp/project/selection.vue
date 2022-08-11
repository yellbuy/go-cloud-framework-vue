<template>
	<div class="system-edit-user-container">
		<el-menu
			active-text-color="#ffd04b"
			class="el-menu-demo"
			background-color="#545c64"
			mode="horizontal"
			default-active="1-1"
			text-color="#fff"
			@select="select"
		>
			<el-sub-menu index="1">
				<template #title>评选准备</template>
				<el-menu-item index="1-1">比选文件</el-menu-item>
				<el-menu-item index="1-2">选择评选专家</el-menu-item>
				<el-menu-item index="1-3">复核评选参数</el-menu-item>
			</el-sub-menu>
			<el-sub-menu index="2">
				<template #title>项目评选</template>
				<el-menu-item index="2-1">选择项目包号</el-menu-item>
				<el-menu-item index="2-2">比选人名单</el-menu-item>
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
		<div class="flex-center layout-backtop">
			<el-card shadow="hover">
				<div style="float: left">
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
				<before ref="beforeRef" :indexLine="indexLine" v-show="menuIndex == 1" />
			</el-card>
		</div>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import { ElMessageBox, ElMessage } from 'element-plus';
import before from './component/selectionBefor/reviewEdit.vue';

export default {
	name: 'api_sys_project_selection',
	components: { before },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const route = useRoute();
		const beforeRef = ref();
		const store = useStore();
		const state = reactive({
			isShowDialog: false,
			title: t('message.action.see'),
			ruleForm: {},
			httpsText: import.meta.env.VITE_URL as any,
			FilesList: [],
			menuIndex: 1,
			indexLine: '1-1',
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					name: '',
					no: '',
					pageNum: 1,
					pageSize: 20,
				},
			},
		});

		const { dateFormat } = commonFunction();
		const GetByIdRow = async () => {
			console.log('route', route);
			let Id = route.query.id;
			try {
				const res = await proxy.$api.erp.project.getById(Id);
				if (res.errcode != 0) {
					return;
				}
				store.commit('project/getProject', res.data);
				beforeRef.value.getProject();
				state.ruleForm = res.data;
				res.data.ProjectType = res.data.ProjectType.toString();
				if (res.data.ProjectLineList) {
					state.tableData.data = res.data.ProjectLineList;
				}
				if (state.ruleForm.Files != '') {
					let Files = res.data.Files.split(',');
					state.FilesList = [];
					for (let i = 0; i < Files.length; i++) {
						let image = { url: '' };
						image.url = state.httpsText + Files[i];
						state.FilesList.push(image);
					}
				}
			} finally {
				state.isShowDialog = true;
			}
		};

		const onSubmit = async () => {
			state.signUp.LineIds = '';
			let idArry = [];
			if (state.getList && state.getList.length > 0) {
				for (let item of state.getList) {
					idArry.push(item.Id);
				}
				state.signUp.LineIds = idArry.toString();
			}
			try {
				const res = await proxy.$api.erp.projectcompany.signup(state.signUp);
				if (res.errcode != 0) {
					return;
				}
			} finally {
				closeDialog();
			}
		};
		const select = (key: string, keyPath: string[]) => {
			state.indexLine = key;
			state.menuIndex = keyPath[0];
			console.log(state.indexLine);
			if (state.indexLine == '1-3') {
				console.log('执行');
				beforeRef.value.getProject();
			}
		};
		// 页面加载时
		onMounted(() => {
			GetByIdRow();
		});
		return {
			proxy,
			beforeRef,
			dateFormat,
			onSubmit,
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