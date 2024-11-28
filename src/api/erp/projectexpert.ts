import { http } from '/@/utils/request';

export default {
    /**
     * 获取列表
     * @param kind 分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/projectexpert/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
     * 新增或更新
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/erp/projectexpert`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/erp/projectexpert/${data.Id}`;
        return await http.post(url, data);
    },

    /**
     * 删除
     * @param id 项目id
     * @returns 返回接口数据
     */
    delete: async (id: number | string) => {
        const url = `/v1/admin/erp/projectexpert/delete/${id}`;
        return await http.post(url);
    },
    
    /**
     * 获取专家参与的项目列表
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    expertParticipateList: async (params: object = {}) => {
        const url = `/v1/admin/erp/projectexpert/participate`;
        return await http.get(url, params);
    },

    /**
     * 专家签到
     * @param id 项目id
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    projectExpertIsSignIn: async (id: number | string, data: object) => {
        const url = `/v1/admin/erp/projectexpert/signin/${id}`;
        return await http.post(url, data);
    },

    /**
     * 专家推荐组长
     * @param id 项目id
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    projectExpertLeader: async (id: number | string, data: object) => {
        const url = `v1/admin/erp/projectexpert/recommendleader/${id}`;
        return await http.post(url, data);
    },
    
}