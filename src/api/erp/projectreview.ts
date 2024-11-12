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
        const url = `/v1/admin/erp/projectreview/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
     * 获取专家汇总表
     * @param kind 分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getGatherListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/projectreview/gather/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
     * 获取信息
     * @returns 返回接口数据
     */
    getById: async (id: number | string) => {
        const url = `/v1/admin/erp/project/${id}`;
        return await http.get(url);
    },

    /**
   * 禁用
   * @param ids 标识，字符串或数组
   * @returns 返回接口数据
   */
    disable: async (data: object) => {
        const url = `/v1/admin/erp/project/disable`;
        return await http.post(url, data);
    },
    /**
    * 专家推荐组长
    * @returns 返回接口数据
    */
    expertLeader: async (id: number | string,data: object) => {
        const url = `v1/admin/erp/projectreview/leader/${id}`;
        return await http.post(url, data);
    },
        /**
    * 专家推荐列表
    * @returns 返回接口数据
    */
    expertList: async (id: number | string,params: object = {}) => {
        const url = `v1/admin/erp/projectreview/expert/${id}`;
        return await http.get(url, params);
    },
    
    /**
    * 专家评审
    * @returns 返回接口数据
    */
    reviewSave: async (kind: string, id: string, data: object) => {
        const url = `v1/admin/erp/projectreview/review/${kind}/${id}`;
        return await http.post(url, data);
    },

    /**
    * 专家个人汇总
    * @returns 返回接口数据
    */
    selfGatherSave: async (kind: string, id: string, data: object) => {
        const url = `v1/admin/erp/projectreview/selfgather/${kind}/${id}`;
        return await http.post(url, data);
    },

    /**
    * 专家汇总全部
    * @returns 返回接口数据
    */
    gatherSave: async (kind: string, id: string, data: object) => {
        const url = `v1/admin/erp/projectreview/gather/${kind}/${id}`;
        return await http.post(url, data);
    },
    
    /**
    * 专家退回从新评审
    * @returns 返回接口数据
    */
    gatherReturnSave: async (id: string, data: object) => {
        const url = `v1/admin/erp/projectreview/return/${id}/`;
        return await http.post(url, data);
    },
    
    /**
    * 组长签章
    * @returns 返回接口数据
    */
    signatureSave: async (id: string, data: object) => {
        const url = `v1/admin/erp/projectreview/signature/${id}/`;
        return await http.post(url, data);
    },

    /**
    * 监审报告签章
    * @returns 返回接口数据
    */
    reportSignatureSave: async (id: string) => {
        const url = `v1/admin/erp/projectreview/reportsignature/${id}/`;
        return await http.post(url);
    },
}