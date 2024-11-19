<template>
	<el-card v-if="state.isShowPage">
		<el-row>
			<el-col :span="24" style="padding-top: 20px; padding-bottom: 20px;">
				<el-steps :active="state.activeIndex" align-center>
					<el-step title="发布招标项目"/>
					<el-step title="设置招标信息"/>
					<el-step title="评标参数复核"/>
				</el-steps>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<infoEdit ref="infoEditRef" v-if="state.activeIndex == 1"/>
				<extEdit ref="extEditRef" v-else-if="state.activeIndex == 2"/>
				<settingLine ref="settingLineRef" v-else-if="state.activeIndex == 3"/>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="mt20">
					<span style="float: right; padding-bottom: 20px; padding-right: 20px;">
						<el-button type="danger" @click="closePage">取消</el-button>
						<el-button v-if="state.activeIndex > 1" type="primary" @click="onStepChange(-1)">上一步</el-button>
						<el-button v-if="state.activeIndex < 3" type="primary" @click="onStepChange(1)">下一步</el-button>
						<el-button v-if="state.activeIndex == 3" type="success" @click="onSubmit()">完成</el-button>
					</span>
				</div>
			</el-col>
		</el-row>
	</el-card>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session } from '/@/utils/storage';
import { computed, getCurrentInstance, onMounted, nextTick, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import infoEdit from './create/infoEdit.vue';
import extEdit from './create/extEdit.vue';
import settingLine from './create/settingLine.vue';

const store = useStore();
const route = useRoute();
const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const moduleKey = proxy.$parent.moduleKey;
const token = Session.get('token');
const getUserInfos = computed(() => {return store.state.userInfos.userInfos;});
const state = reactive({
	isShowPage: false,
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	moduleKey,
	token: token,
	activeIndex: 1,
	ruleForm: {},
	infoForm: {},
	extForm: {
		ProjectLineList: [],
		FilesList: [],
	},
	settingLineForm: {
		ProjectSettingLineList: [],
	},

});
const infoEditRef = ref()
const extEditRef = ref()
const settingLineRef = ref()
//	打开页面
const openPage = async () => {
	onStepChange(0)
	state.isShowPage = true
};

//	关闭页面
const closePage = async () => {
	proxy.$parent.onGetTableData()
	state.isShowPage = false
	proxy.$parent.isShowPage = true
	proxy.$parent.isShowCreateEdit = false
	state.activeIndex = 1
	state.ruleForm = {}
	state.infoForm = {}
	state.extForm = {}
	state.settingLineForm = {}

}

//	上一步下一步切换
//	0：恢复到第一步  1：下一步   -1：上一步
const onStepChange = (val: number) => {
	if (val == 0) {
		state.activeIndex = 1
	} else if (val == 1) {
		if (state.activeIndex == 1) {
			state.infoForm = infoEditRef.value.getPageData()
		} else if (state.activeIndex == 2) {
			state.extForm = extEditRef.value.getPageData()
		} else if (state.activeIndex == 3) {
			state.settingLineForm = settingLineRef.value.getPageData()
		}
		if(state.activeIndex < 3){
			state.activeIndex += 1
		}
	} else if ( val == -1) {
		if (state.activeIndex == 2) {
			state.extForm = extEditRef.value.getPageData()
		} else if (state.activeIndex == 3) {
			state.settingLineForm = settingLineRef.value.getPageData()
		} else if (state.activeIndex == 4) {
		}
		if(state.activeIndex > 1){
			state.activeIndex -= 1
		}
	}
	if (state.activeIndex == 1) {
		nextTick(() => {
			infoEditRef.value.openPage(state.infoForm)
		});
	} else if (state.activeIndex == 2) {
		nextTick(() => {
			extEditRef.value.openPage(state.extForm)
		});
	} else if (state.activeIndex == 3) {
		nextTick(() => {
			settingLineRef.value.openPage(state.settingLineForm)
		});
	}
};

//	确定提交创建项目
const onSubmit = () => {
	ElMessageBox.confirm(`确定编辑完成，创建项目吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		state.ruleForm = {}
		const promises = [
            state.infoForm,
            state.extForm,
            state.settingLineForm,
        ];
		const results = await Promise.all(promises);
		results.forEach(result => {
            state.ruleForm = Object.assign(state.ruleForm, result);
        });
		try {
			Form.Id = "0"
			Form.Kind = "bid"
			const res = proxy.$api.erp.projectbid.saveBid(state.ruleForm);
			res.then(result => {
				if (result.errcode != 0) {
				return
				}
			})
			ElMessage('项目创建成功,等待2秒后返回项目列表！')
			setTimeout(() => {
				closePage();
			}, 2000);
		} finally {
		}
	});
};

// 页面加载时
onMounted(() => {
});

defineExpose({openPage, closePage, ...toRefs(state)})
</script>
<style scoped lang="scss">
</style>