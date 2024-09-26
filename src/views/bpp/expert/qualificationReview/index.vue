<template>
	<el-card>
		<el-row style="padding: 15px;">
			<el-col :span="24">
				<el-descriptions :column="2">
					<el-descriptions-item label="项目名称：">{{ state.project.Name }}</el-descriptions-item>
					<el-descriptions-item label="项目编号：">{{ state.project.No }}</el-descriptions-item>
					<el-descriptions-item label="评选时间：">{{ state.project.ReviewTime }}</el-descriptions-item>
					<el-descriptions-item label="评选地点：">{{ state.project.Location }}</el-descriptions-item>
				</el-descriptions>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<el-row>
					<el-col :span="18">
						<el-form-item label="投标方名称：">
							<el-select v-model="state.projectLineIndex" placeholder="请选择" @change="">
								<el-option v-for="(item, index) in state.project.ProjectLineList" :key="index" :label="item.Name" :value="item.Id"/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<div style="float: right;">
							<el-button type="primary" @click="onModelSave(state.projectLineIndex.Id)">确认提交</el-button>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" size="small" border stripe highlight-current-row>
							<el-table-column type="index" label="序号" align="right" width="70" fixed />
							<el-table-column prop="Content" label="评审内容" width="200" show-overflow-tooltip/>
							<el-table-column prop="QualificationScore" label="评分点" width="80" show-overflow-tooltip/>
							<el-table-column prop="Standard" label="评审标准" show-overflow-tooltip/>
							<el-table-column label="评审" width="70" show-overflow-tooltip>
								<template #default="scope">
									<el-switch
										v-model="scope.row.State"
										inline-prompt
										:width="55"
										@change=""
										:active-text="'通过'"
										:inactive-text="'不通过'"
										:active-value="1"
										:inactive-value="0"/>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
				<el-row style="padding: 15px;">
					<el-col :span="24">
						<el-card>
							<el-descriptions :column="1">
								<el-descriptions-item label="商务文件：">test</el-descriptions-item>
								<el-descriptions-item label="技术文件：">test</el-descriptions-item>
								<el-descriptions-item label="其他文件：">test</el-descriptions-item>
							</el-descriptions>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="12" >
				<div style=" float: center; font-size: 50px;">
					<h>PDF预览</h>
				</div>
			</el-col>
		</el-row>
	</el-card>
</template>

<script setup lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { t } = useI18n();
const store = useStore();
const state: any = reactive({
	project: store.state.project.project,
	projectLineIndex:'',
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			kind: 'zgps',
			current: 1,
			pageSize: 20,
		},
	},
});

//获取项目参数信息
const getSettingLineTableData = async () => {
	try {
		state.tableData.param.projectId = state.project.Id
		const res = await proxy.$api.erp.projectsettingline.getListByScope(state.tableData.param);
		//获取存储的项目数据
		if (res.errcode != 0) {
			return;
		}
		state.tableData.data = res.data;
	} finally {
	}
};

const onModelSave = async (id: Number) => {
	if (!id) {
		ElMessage.error('请选择供应商！');
		return;
	}
	ElMessageBox.confirm(`确定要提交吗?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		try {
			const res = await proxy.$api.common.enterprise.audit(state.ruleForm);
			if (res.errcode != 0) {
				return;
			}
			state.ruleForm.AuditState = 0;
		} finally {
			getSettingLineTableData();
		}
		return false;
	});
};

// 页面加载时
onMounted(() => {
	getSettingLineTableData()
});

</script>

<style scoped lang="scss">
</style>
