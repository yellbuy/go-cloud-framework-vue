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
        const url = `/v1/admin/erp/projectcompanyline/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
     * 公司提交投标文件
     * @param id 项目id
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    saveBiding: async (id: number | string, data: object) => {
        const url = `/v1/admin/erp/projectcompanyline/bidding/${id}`;
        return await http.post(url, data);
    },
}