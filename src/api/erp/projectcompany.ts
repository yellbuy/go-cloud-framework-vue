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
        const url = `/v1/admin/erp/projectcompany/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url ,params);
    },

    /**
     * 公司报名详细信息
     * @param id 项目id
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    getById: async (id: string|number, data: object) => {
        const url = `/v1/admin/erp/projectcompany/signup/${id}`;
        return await http.get(url ,data);
    },

    /**
     * 新增或更新
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/erp/projectcompany`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/erp/projectcompany/${data.Id}`;
        return await http.post(url, data);
    },

    /**
     * 供应商投标报名
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    signUp: async (data: object) => {
        const url = `/v1/admin/erp/projectcompany/signup`;
        return await http.post(url, data);
    },

    /**
     * 上传投标凭证
     * @param id 项目id
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    voucherUpload: async ( id: string|number, data: object) => {
        const url = `/v1/admin/erp/projectcompany/voucherupload/${id}`;
        return await http.post(url, data);
    },
    
    /**
     * 投标凭证审核
     * @param id 公司报名信息id
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    voucherAudit: async ( id: string|number, data: object) => {
        const url = `/v1/admin/erp/projectcompany/voucheraudit/${id}`;
        return await http.post(url, data);
    },

    /**
     * 中标公司推荐
     * @param id 公司报名信息id
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    recommendation: async ( id: string|number, data: object) => {
        const url = `/v1/admin/erp/projectcompany/recommendation/${id}`;
        return await http.post(url, data);
    },

    /**
     * 组长确认中标
     * @param id 项目id
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    leaderConfirm: async ( id: string|number, data: object) => {
        const url = `/v1/admin/erp/projectcompany/leaderconfirm/${id}`;
        return await http.post(url, data);
    },
}