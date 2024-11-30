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
        const url = `/v1/admin/erp/projectbid/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
     * 根据id获取信息
     * @param id 项目id
     * @returns 返回接口数据
     */
    getById: async (id: number | string) => {
        const url = `/v1/admin/erp/projectbid/${id}`;
        return await http.get(url);
    },

    /**
     * 删除
     * @param id 项目id
     * @returns 返回接口数据
     */
    delete: async (id: number | string) => {
        const url = `/v1/admin/erp/project/delete/${id}`;
        return await http.post(url);
    },

    /**
     * 创建招标项目
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    projectBidCreate: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/erp/projectbid`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/erp/projectbid/${data.Id}`;
        return await http.post(url, data);
    },
    /**
     * 创建招标项目
     * @param id 报名表id
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    recommendationSupplier: async (id: number | string, data: object) => {
        const url = `/v1/admin/erp/projectbid/recommendationsupplier/${id}`;
        return await http.post(url, data);
    },


}