import { Module } from 'vuex';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { ProjectState, RootStateTypes } from '/@/store/interface/index';

const projectModule: Module<ProjectState, RootStateTypes> = {
    namespaced: true,
    state: {
        project: {},
    },
    mutations: {
        // 设置用户信息
        getProject(state: any, data: object) {
            state.project = data;
        },
    },
    actions: {
        // 设置项目信息
        async setProject({ commit }, data: object) {
            if (data) {
                commit('getProject', data);
            } else {
                commit('getProject', {})
            }
        },

    },
};

export default projectModule;
