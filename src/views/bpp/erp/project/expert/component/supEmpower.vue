<template>
	<div class="base-role-container">
		<div style="padding-left: 5%; padding-right: 5%">
			<h2 style="text-align: center; padding-bottom: 15px">监审授权书</h2>
			<hr />
			<div style="padding-top: 20px; font-size: 18px; color: #787878; padding-left: 10%; padding-right: 10%">
				<div>招标监审部门：</div>
				<div style="padding-top: 20px">
					本授权书声明，因为本人（{{ userInfo.realname }}）于项目（{{ project.Name }}）的开标时间（{{
						dateFormat(project.ReviewTime, 'YYYY-mm-dd HH:MM:SS')
					}}）无法到达现场进行评标监审，现授权（
					<el-select v-model="Uid" placeholder="请选择专家" size="small">
						<el-option v-for="item in tableData" :key="item.Id" :label="item.Name" :value="item.Id" /> </el-select
					>）代我于项目（{{ project.Name }} {{ dateFormat(project.ReviewTime, 'YYYY-mm-dd HH:MM:SS') }}）
					完成现场评标事宜并对项目报告检验合格后进行签章
				</div>
				<div style="padding-top: 20px">特此委托</div>
				<div style="padding-top: 20px">授权人签名：{{ userInfo.realname }}</div>
				<div style="padding-top: 20px">授权日期：{{ dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS') }}</div>
				<!-- v-if="project.ReviewTime > new Date()" -->
				<div style="padding-top: 20px">
					<el-button type="primary" @click="onEmpower()">
						{{ $t('message.action.ok') }}
					</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script  lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance, defineEmits } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
import commonFunction from '/@/utils/commonFunction';
export default {
	name: 'leader',
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const { t } = useI18n();
		const store = useStore();
		const state: any = reactive({
			project: store.state.project.project,
			Uid: null,
			tableData: [],
			userInfo: store.state.userInfos.userInfos,
		});
		const getExpertList = async () => {
			state.project = store.state.project.project;
			state.tableData = [];
			try {
				const res = await proxy.$api.erp.project.expertList(store.state.project.projectId);
				if (res.errcode == 0) {
					if (res.data.length > 0) {
						for (let item of res.data) {
							if (item.User.Id != store.state.userInfos.userInfos.uid) {
								state.tableData.push(item.User);
							}
						}
					}
				}
			} finally {
			}
		};
		// const emit = defineEmits(['changeSupervise']);
		// const emit = defineEmits<{
		// 	(e: 'changeSupervise'): void;
		// }>();
		const onEmpower = async () => {
			if (state.Uid == 0 || !state.Uid) {
				ElMessage.warning('请选择授权专家');
				return;
			}
			ElMessageBox.confirm(`确定要授权吗?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					// const res = await proxy.$api.erp.project.empowerSave({
					// 	Id: store.state.project.projectId,
					// 	Uid: state.Uid,
					// });
					// if (res.errcode == 0) {
					ElMessage.success('操作成功');
					emit('changeSupervise');
					// }
				} finally {
				}
			});
		};
		// 页面加载时
		onMounted(() => {});
		const { dateFormat } = commonFunction();
		return {
			proxy,
			onEmpower,
			project,
			getExpertList,
			dateFormat,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss"></style>
