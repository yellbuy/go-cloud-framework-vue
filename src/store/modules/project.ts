import { Module } from 'vuex';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { ProjectState, RootStateTypes } from '/@/store/interface/index';

const projectModule: Module<ProjectState, RootStateTypes> = {
    namespaced: true,
    state: {
        project: {},
        projectId: "0",
        projectCompanyId:"0",
        projectLineId: "0"
    },
    mutations: {
        // 设置用户信息
        getProject(state: any, data: object) {
            state.project = data;
        },
        getProjectId(state: any, Id: string) {
            state.projectId = Id;
        },
          getProjectCompanyId(state: any, Id: string) {
            state.projectCompanyId = Id;
        },
        getProjectLineId(state: any, Id: string) {
            state.projectLineId = Id;
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
        async setProjectId({ commit }, Id: object) {
            if (Id) {
                commit('getProjectId', Id);
            } else {
                commit('getProjectId', "0")
            }
        },
          async setProjectCompanyId({ commit }, Id: object) {
            if (Id) {
                commit('getProjectCompanyId', Id);
            } else {
                commit('getProjectCompanyId', "0")
            }
        },
        async setProjectLineId({ commit }, Id: object) {
            if (Id) {
                commit('getProjectLineId', Id);
            } else {
                commit('getProjectLineId', "0")
            }
        },

    },
};

export default projectModule;
