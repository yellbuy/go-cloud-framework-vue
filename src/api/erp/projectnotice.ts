import { http } from '/@/utils/request';

export default {
    /**
     * 获取列表
     * @param kind 分类
     * @param scopeMode：模式，1.获取报名项目列表   2.获取开始投标项目列表 3.获取开标列表
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/projectnotice/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
     * 新增
     * @param data 信息
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/erp/projectnotice`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/erp/projectnotice/${data.Id}`;
        return await http.post(url, data);
    },
}