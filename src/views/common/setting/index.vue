<template>
	<el-tabs type="border-card">
		<el-tab-pane :label="group.Name" v-for="(group,index) in list" :key="index">
			<el-form :model="form" ref="formSettingRef" label-width="160px">
				<el-row :gutter="35">
					<el-col
						:xs="24"
						:sm="item.Type === 0 || item.Type === 1 || item.Type ===2 || item.Type ===4 || item.Type ===5?12:24"
						:md="item.Type === 0 || item.Type === 1 || item.Type ===2 || item.Type ===4 || item.Type ===5?8:24"
						:lg="item.Type === 0 || item.Type === 1 || item.Type ===2 || item.Type ===4 || item.Type ===5?8:24"
						:xl="item.Type === 0 || item.Type === 1 || item.Type ===2 || item.Type ===4 || item.Type ===5?8:24"
						class="mb20"
						v-for="(item,itemIndex) in group.Items" :key="itemIndex">
						<el-form-item 
							:label="item.Name"
							:prop="item.Key"
							:rules="[{ required: !item.Readonly && item.Required, message: `${item.Name}不能为空`, trigger: item.Type === 0 || item.Type === 1 || item.Type ===2 || item.Type === 5? 'blur' : 'change' }]"
						>
							<el-input
								v-model="item.Value"
								:placeholder="item.Remark"
								v-if="item.Type === 0"
								:disabled="item.Readonly"
							></el-input>
							<el-input
								v-model="item.Value"
								type="number"
								:placeholder="item.Remark"
								v-else-if="item.Type === 1"
								:disabled="item.Readonly"
							></el-input>
							<el-input
								v-model="item.Value"
								type="textarea"
								:placeholder="item.Remark"
								v-else-if="item.Type === 2"
								:disabled="item.Readonly"
							></el-input>
							<el-select
								v-model="item.Value"
								:placeholder="item.Remark"
								v-else-if="item.Type === 4"
								style="width:100%"
								:disabled="item.Readonly">
								<el-option v-for="(opt,optIndex) in item.Options" :key="optIndex" :label="opt.Name" :value="opt.Value"></el-option>
							</el-select>
							<el-input
								v-model="item.Value"
								type="password"
								:placeholder="item.Remark"
								v-else-if="item.Type === 5"
								:disabled="item.Readonly">
							</el-input>
							<p :title="item.Remark" class="color-info-light font10" v-if="item.Remark"><SvgIcon name="fa fa-info-circle" /><span v-html="item.Remark"></span></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-divider />
				<div style="text-align:center">
					<el-button @click="onReset" >{{ $t('message.action.reset') }}</el-button>
					<el-button type="primary" @click="onSubmit(true)"  :loading="loading" v-auths:[$parent.moduleKey]="['btn.UserEdit','btn.UserAdd']">{{ $t('message.action.save') }}</el-button>
				</div>
			</el-form>
		</el-tab-pane>
	</el-tabs>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import request from '/@/utils/request';
export default {
	name: 'commonSetting',
	components: {  },
	setup() {
		const moduleKey = 'api_common_setting';
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			loading:false,
			groupKey:'',
			moduleKey: moduleKey,
			list:[],
		});
		// 页面加载时
		onMounted(() => {
			onLoadData();
		});
		//表格数据
		const onLoadData = () => {
			state.loading = true;
			request({
				url:'/v2/common/setting/group',
				method:'get',
				params:state.groupKey
			}).then((res) => {
				state.loading = false;
				if(res.errcode==0){
					console.log(res.data);
					state.list=res.data
				}

			}).catch((err) => {
				ElMessage.error(err)
				state.loading = false;
			});
		};
		return {
			proxy,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
	padding: 32px;
	background-color: #f4f5f7;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
</style>
