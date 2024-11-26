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
    getListByScope: async (kind:string,scopeMode: number = 0, scopeValue: number = 0,params: object = {}) => {
        const url = `/v1/admin/erp/projectcompanylog/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
     * 新增
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    addMuit: async (data: object, projectTid:number = 0, scopeMode: number = 0, scopeValue: number = 0) => {
        const url = `/v1/admin/erp/projectcompanylog/${projectTid}/${scopeMode}/${scopeValue}`;
        return await http.post(url, data);
    },

    /**
     * 删除
     * @param id 项目id
     * @returns 返回接口数据
     */
        delete: async (id: number | string) => {
        const url = `/v1/admin/erp/projectcompanylog/delete/${id}`;
        return await http.post(url);
    },

    /**
     * 审核状态
     * @param data 标识，字符串或数组
     * @returns 返回接口数据
     */
    AuditState: async (data: object) => {
        const url = `/v1/admin/erp/projectcompanylog`;
        return await http.post(url,data)
    },


}
