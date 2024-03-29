import { http } from '/@/utils/request';

export default {

    /**
     * 获取列表
     * @param kind 文章分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getListSelectSelectionByScope: async (params: object = {}) => {
        const url = `/v1/admin/erp/projectreview/selection`;
        return await http.get(url, params);
    },
     /**
     * 获取列表
     * @param kind 文章分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getListSelectSuperviseByScope: async (params: object = {}) => {
        const url = `/v1/admin/erp/projectreview/supervise`;
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
     * 新增或更新
     * @param data 信息
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/erp/project`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/erp/project/${data.Id}`;
        return await http.post(url, data);
    },

    /**
     * 删除
     * @param ids 标识，字符串或数组
     * @returns 返回接口数据
     */
    delete: async (id: number | string) => {
        const url = `/v1/admin/erp/project/delete/${id}`;
        return await http.post(url);
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
    * 获取项目专家组长信息
    * @returns 返回接口数据
    */
    expertLeaderList: async (id: number | string) => {
        const url = `/v1/admin/erp/projectreview/${id}`;
        return await http.get(url);
    },
    /**
    * 推荐专家接口
    * @returns 返回接口数据
    */
    expertLeader: async (id: number | string,data: object) => {
        const url = `v1/admin/erp/projectreview/leader/${id}`;
        return await http.post(url, data);
    },
        /**
    * 推荐专家接口
    * @returns 返回接口数据
    */
    expertList: async (id: number | string,params: object = {}) => {
        const url = `v1/admin/erp/projectreview/expert/${id}`;
        return await http.get(url, params);
    },
    /**
    * 获取项目专家信息
    * @returns 返回接口数据
    */
    expertSave: async (kind: string,data: object) => {
        const url = `v1/admin/erp/projectreview/review/${kind}`;
        return await http.post(url, data);
    },
    /**
    * 获取专家汇总信息
    * @returns 返回接口数据
    */
    expertGather: async (id: number | string,params: object = {}) => {
        const url = `v1/admin/erp/projectreview/gather/${id}`;
        return await http.get(url, params);
    },
    /**
    * 专家提交汇总信息
    * @returns 返回接口数据
    */
    expertGatherSave: async (id: number | string,data: object) => {
        const url = `v1/admin/erp/projectreview/gather/${id}`;
        return await http.post(url, data);
    },
    /**
    * 专家退回
    * @returns 返回接口数据
    */
    expertGatherReturn: async (id: number | string,data: object) => {
        const url = `v1/admin/erp/projectreview/return/${id}`;
        return await http.post(url, data);
    },
}