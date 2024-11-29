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
     * 专家评审
     * @param kind 分类
     * @param id：项目id
     * @param data：要传的数据
     * @returns 返回接口数据
     */
    reviewSave: async (kind: string, id: string, data: object) => {
        const url = `v1/admin/erp/projectreview/expertreview/${kind}/${id}`;
        return await http.post(url, data);
    },

    /**
     * 专家汇总
     * @param kind 分类
     * @param id 项目id
     * @param data：要传的数据
     * @returns 返回接口数据
     */
    gatherSave: async (kind: string, id: string, data: object) => {
        const url = `v1/admin/erp/projectreview/gather/${kind}/${id}`;
        return await http.post(url, data);
    },
    
    /**
     * 专家退回从新评审
     * @param id 项目id
     * @returns 返回接口数据
     */
    gatherReturnSave: async (id: string, data: object) => {
        const url = `v1/admin/erp/projectreview/return/${id}/`;
        return await http.post(url, data);
    },
    
    /**
     * 评审签章
     * @param id 项目id
     * @returns 返回接口数据
     */
    reviewSignatureSave: async (id: string, data: object) => {
        const url = `v1/admin/erp/projectreview/signature/${id}/`;
        return await http.post(url, data);
    },

    /**
     * 上传报告
     * @param id 项目id
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    reportUpload: async (id: number | string, params: object = {}) => {
        const url = `/v1/admin/erp/projectreview/reportupload/${id}`;
        return await http.post(url, params);
    },

    /**
     * 监审报告签章
     * @param id 项目id
     * @returns 返回接口数据
     */
    reportSignatureSave: async (id: string) => {
        const url = `v1/admin/erp/projectreview/reportsignature/${id}/`;
        return await http.post(url);
    },
}