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
			<infoEdit ref="infoEditRef"/>
			<extEdit ref="extEditRef"/>
			<settingLine ref="settingLineRef"/>
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
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import infoEdit from './create/infoEdit.vue';
import extEdit from './create/extEdit.vue';
import settingLine from './create/settingLine.vue';
import { nextTick } from 'vue';

const store = useStore();
const route = useRoute();
const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const moduleKey = proxy.$parent.moduleKey;
const token = Session.get('token');
const getUserInfos = computed(() => {return store.state.userInfos.userInfos;});
const infoEditRef = ref()
const extEditRef = ref()
const settingLineRef = ref()
const state = reactive({
	isShowPage: false,
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	moduleKey,
	token: token,
	activeName: "zgps",
	activeIndex: 1,
	FilesList: [],
	ruleForm: {},
});

//	打开页面
const openPage = async () => {
	state.isShowPage = true
};

//	关闭页面
const closePage = async () => {
	state.isShowPage = false
	infoEditRef.value.isShowPage = false
	extEditRef.value.isShowPage = false
	settingLineRef.value.isShowPage = false
	proxy.$parent.isShowPage = true
	proxy.$parent.isShowCreateEdit = false
	state.activeIndex = 1
	state.FilesList = []
	state.ruleForm = {}
}

//	上一步下一步切换
//	0：恢复到第一步  1：下一步   -1：上一步
const onStepChange = (val: number) => {
	switch (val) {
		case 0:
			state.activeIndex = 1
			break
		case 1:
			if(state.activeIndex < 3){
				state.activeIndex += 1
			}else{
				state.activeIndex = 1
			}
			break
		case -1:
			if(state.activeIndex > 1){
				state.activeIndex -= 1
			}else{
				state.activeIndex = 1
			}
			break
	}
	infoEditRef.value.isShowPage = false
	extEditRef.value.isShowPage = false
	settingLineRef.value.isShowPage = false
	switch (state.activeIndex) {
		case 1:
			infoEditRef.value.openPage()
			break
		case 2:
			extEditRef.value.openPage()
			break
		case 3:
			settingLineRef.value.openPage()
			break
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
            infoEditRef.value.outData(),
            extEditRef.value.outData(),
            settingLineRef.value.outData()
        ];
		const results = await Promise.all(promises);
		results.forEach(result => {
            state.ruleForm = Object.assign(state.ruleForm, result);
        });
		try {
			state.ruleForm.Id = "0"
			state.ruleForm.Kind = "bid"
			const res = proxy.$api.erp.projectbid.saveBid(state.ruleForm);
			res.then(result => {
				if (result.errcode != 0) {
				return
				}
			})
			infoEditRef.value.closePage()
			extEditRef.value.closePage()
			settingLineRef.value.closePage()
			ElMessage('项目创建成功')
			closePage()
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