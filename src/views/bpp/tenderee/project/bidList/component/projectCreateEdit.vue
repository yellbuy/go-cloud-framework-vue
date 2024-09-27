<template>
	<el-card>
		<div v-if="state.isShowPage">
			<el-row>
				<el-col :span="20" style="padding-top: 20px; padding-bottom: 20px;">
					<el-steps :active="state.activeIndex" align-center>
						<el-step title="发布招标项目"/>
						<el-step title="设置招标信息"/>
						<el-step title="评标参数复核"/>
					</el-steps>
				</el-col>
				<el-col :span="4">
					<div class="mt20">
						<span style="float: right; padding-bottom: 20px; padding-right: 20px;">
							<el-button type="danger" @click="closePage">取消</el-button>
							<el-button v-if="state.activeIndex > 1" type="primary" @click="stepChange(-1)">上一步</el-button>
							<el-button v-if="state.activeIndex < 3" type="primary" @click="stepChange(1)">下一步</el-button>
							<el-button v-if="state.activeIndex == 3" type="success" @click="onSubmit()">完成</el-button>
						</span>
					</div>
				</el-col>
			</el-row>
		</div>
		<infoEdit ref="infoEditRef"/>
		<extEdit ref="extEditRef"/>
		<settingLine ref="settingLineRef"/>
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
	uploadURL: (import.meta.env.VITE_API_URL as any) + '/v1/file/upload',
	moduleKey,
	token: token,
	isShowPage: false,
	activeName: "zgps",
	activeIndex: 1,
	ruleForm: {},
});

//	打开页面
const openPage = async () => {
	state.isShowPage = true
    infoEditRef.value.openPage();
};

//	关闭页面
const closePage = async () => {
	state.isShowPage = false
	infoEditRef.value.isShowPage = false
	extEditRef.value.isShowPage = false
	settingLineRef.value.isShowPage = false
	proxy.$parent.isShowPage = true
	state.activeIndex = 1
	state.FilesList = []
	state.ruleForm = {}
}

//	上一步下一步切换
//	0：恢复到第一步  1：下一步   -1：上一步
const stepChange = (val: number) => {
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
		let form = {}
		infoEditRef.value.outData().then(result => {
			form = Object.assign(form, result);
		});
		extEditRef.value.outData().then(result => {
			form = Object.assign(form, result);
		});
		settingLineRef.value.outData().then(result => {
			form = Object.assign(form, result);
		});

		console.log("测试", form)
		try {
			// state.ruleForm.Id = "0"
			// state.ruleForm.Kind = "bid"
			// const res = proxy.$api.erp.projectbid.saveBid(state.ruleForm);
			// if (res.errcode != 0) {
			// 	return
			// }
			// infoEditRef.value.closePage()
			// extEditRef.value.closePage()
			// settingLineRef.value.closePage()
			// ElMessage('项目创建成功')
			// closePage()
		} finally {
		}
	});
};

// 页面加载时
onMounted(() => {});

defineExpose({openPage, closePage, ...toRefs(state)})
</script>
<style scoped lang="scss">
</style>