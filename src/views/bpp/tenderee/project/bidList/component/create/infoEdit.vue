<template>
	<div>
		<el-form ref="ruleFormRef" :model="state.ruleForm" :rules="rules" size="small" label-width="120px" label-suffix="：" v-loading="state.loading">
			<el-row>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="项目编号" prop="No">
						<el-input v-model="state.ruleForm.No"/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="项目名称" prop="Name">
						<el-input v-model="state.ruleForm.Name"/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="项目方式" prop="ProjectType">
						<el-select v-model="state.ruleForm.ProjectType" placeholder="请选择">
							<el-option label="公开招标" :value="1" />
							<el-option label="邀请招标" :value="2" />
							<el-option label="竞争性谈判" :value="3" />
							<el-option label="单一来源采购" :value="4" />
							<el-option label="询价采购" :value="5" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="资格要求" prop="Qualification">
							<el-input v-model="state.ruleForm.Qualification"/>
						</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="标书费用(元)" prop="BidFee">
						<el-input-number v-model="state.ruleForm.BidFee" :min="0" controls-position="right" :precision="2"/>
					</el-form-item>
				</el-col>
				<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="项目管理员" prop="ProjectManagerUid">
						<el-select v-model="state.ruleForm.ProjectManagerUid" filterable placeholder="请选择">
							<el-option v-for="(item, index) in state.ProjectManagerData.data" :key="index" :label="item.Name" :value="item.Id" />
						</el-select>
					</el-form-item>
				</el-col> -->
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb16">
					<el-form-item label="评选地点" prop="Location">
						<el-input v-model="state.ruleForm.Location"/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb16">
					<el-form-item label="项目内容" prop="Content">
						<vue-ueditor-wrap
							:editor-id="`editor-content`"
							:editor-dependencies="['ueditor.config.js', 'ueditor.all.min.js', 'xiumi/xiumi-ue-dialog-v5.js', 'xiumi/xiumi-ue-v5.css']"
							v-model="state.ruleForm.Content"
							style=" z-index: 1"
							:config="{
								UEDITOR_HOME_URL: '/ueditor/',
								serverUrl: `${state.baseUrl}/v1/common/editor/${getUserInfos.appid}`,
								headers: { Authorization: token, Appid: getUserInfos.appid },
							}" >
						</vue-ueditor-wrap>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const token = Session.get('token');
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});

const state = reactive({
	isShowPage: false,
	loading: false,
	ruleForm: {
		Id: '0',
		Kind: '',
		Name: '',
		No: '',
		Sn: '',
		ProjectType: 1,
		RemoteState: 0,
		BidFee: 0,
		EnsureFee: 0,
		Location: '',
		Content: '',
		ProjectManagerUid: '',
	},
	ProjectManagerData: {
		data: [],
		param: {
			fetchChild: false,
			pageIndex: 0,
			pageSize: 10000,
		},
	},
});

const rules = reactive({
	No: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Name: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	ProjectType: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
	Content: [{required: true, message: t('message.validRule.required'), trigger: 'blur',},],
});


// 打开页面
const openPage = async () => {
};

//  传出数据
const outData = async () => {
	return state.ruleForm
};

//	关闭页面
const closePage = async () => {
	state.ruleForm = {Id: 0, Kind: '', Name: '', No: '', Sn: '', ProjectType: 1, RemoteState: 0, BidFee: 0, EnsureFee: 0, Location: '', Content: '',}
};

// 获取项目管理员列表
const onGetProjectManagerList = async () => {
	try {
		const res = await proxy.$api.base.user.getList(state.ProjectManagerData.param);
		if (res.errcode != 0) {
			return;
		}
		state.ProjectManagerData.data = res.data;
	} finally {
	}
};

// 页面加载时
onMounted(() => {
	onGetProjectManagerList()
});

defineExpose({openPage, closePage, outData, ...toRefs(state)})
</script>
