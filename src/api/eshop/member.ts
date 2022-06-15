import { http } from '/@/utils/request';

export default {
    /**
    * 获取会员列表
    * @param kind 分类
    * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
    * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
    * @param params 要传的参数值
    * @returns 返回接口数据
    */
    getListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/eshop/memberlist/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
    * 获取会员详情
    * @param id 要传的参数值
    * @returns 返回接口数据
    */
    getById: async (id: number | string) => {
        const url = `/v1/admin/eshop/member/${id}`;
        return await http.get(url);
    },
    /**
    * 通知
    * @param kind 分类
    * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
    * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
    * @param params 要传的参数值
    * @returns 返回接口数据
    */
    postNotify: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/eshop/membernotify/${kind}/${scopeMode}/${scopeValue}`;
        return await http.post(url, params);
    },
    /**
    * 积分
    * @param kind 分类
    * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
    * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
    * @returns 返回接口数据
    */
    postIntegral: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/eshop/memberintegral/${kind}/${scopeMode}/${scopeValue}`;
        return await http.post(url, params);
    },
    /**
    * 编辑
    * @param kind 分类
    * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
    * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
    * @param params 要传的参数值
    * @returns 返回接口数据
    */
    edit: async (params: object = {}) => {
        const url = `/v1/admin/eshop/memberedit`;
        return await http.post(url, params);
    },
    /**
    * 删除
    * @param kind 分类
    * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
    * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
    * @param params 要传的参数值
    * @returns 返回接口数据
    */
    delete: async (id: number | string) => {
        const url = `/v1/admin/eshop/memberdelete/${id}`;
        return await http.post(url);
    },
}