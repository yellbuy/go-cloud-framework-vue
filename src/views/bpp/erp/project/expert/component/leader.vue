<template>
    <div class="base-role-container">
        <el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" :height="proxy.$calcMainHeight(-75)" border stripe highlight-current-row>
            <el-table-column type="index" label="序号" align="right" width="70" fixed />
            <el-table-column prop="No" label="角色" show-overflow-tooltip fixed>
                <template #default="scope">
                    <span v-if="scope.row.State == 0">评审</span>
                    <span v-else>监审</span>
                </template>
            </el-table-column>
        </el-table>
        
    </div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, effect, onMounted, ref, computed, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import project from '/@/api/erp/project';
import { useI18n } from 'vue-i18n';
export default {
    name: 'expertEdit',
    setup() {
        const { proxy } = getCurrentInstance() as any;
        const { t } = useI18n();
        const store = useStore();
        const state: any = reactive({
            tableData: {
                data: [],
                total: 0,
                loading: false,
            },
            ruleForm: {
                Roles: 0,
                NameId: '',
            },
        });
        const getExpertList = async () => {
            state.tableData.loading = true;
            try {
                const res = await proxy.$api.erp.projectreview.expertLeaderList(store.state.project.projectId);
                if (res.errcode == 0) {
                    state.tableData.data = res.data;
                }
            } finally {
                state.tableData.loading = false;
            }
        };
        // 页面加载时
        onMounted(() => {
            getExpertList();
        });

        return {
            proxy,
            project,
            getExpertList,
            ...toRefs(state),
        };
    },
};
</script>

<style scoped lang="scss"></style>
