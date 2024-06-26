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
        const url = `/v1/admin/erp/vehicle/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
     * 获取列表
     * @param kind 分类
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getValidListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/vehicle/valid/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
     * 获取运单统计和定位信息
     * @param vehicleNumber 获取运单统计和定位信息
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getWaybillLineStat: async (vehicleNumber: string) => {
        const url = `/v1/admin/erp/vehicle/waybilllines/${vehicleNumber}`;
        return await http.get(url);
    },
    /**
         * 获取内部自有车统计
         * @param kind 类型
         * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
         * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
         * @param params 要传的参数值
         * @returns 返回接口数据
         */
    getCountStat: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/vehicle/stat/count/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
         * 获取内部车型数量统计
         * @param kind 类型
         * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
         * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
         * @param params 要传的参数值
         * @returns 返回接口数据
         */
    getVehicleTypeStat: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/vehicle/stat/type/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
     * 获取信息
     * @returns 返回接口数据
     */
    getById: async (id: number | string,loadRelated:boolean=false) => {
		const url = `/v1/admin/erp/vehicle/${id}?loadRelated=${loadRelated}`;
		return await http.get(url);
	},

    /**
     * 新增或更新
     * @param data 信息
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/erp/vehicle`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/erp/vehicle/${data.Id}`;
        return await http.post(url, data);
    },
    /**
     * 新增或更新
     * @param data 信息
     * @returns 返回接口数据
     */
    saveMulti: async (kind:string, data: any) => {
        const url = `/v1/admin/erp/vehicles/${kind}`;
        return await http.post(url, data);
    },
    

    /**
     * 删除
     * @param ids 标识，字符串或数组
     * @returns 返回接口数据
     */
    delete: async (id: number | string) => {
        const url = `/v1/admin/erp/vehicle/delete/${id}`;
        return await http.post(url);
    },
    /**
	 * 删除记录
	 * @param id 记录标识
	 * @returns 返回接口数据
	 */
	exportXlsByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
		const url = `/v1/admin/erp/vehicle/excel/${kind}/${scopeMode}/${scopeValue}`;
		return await http.get(url, params, { responseType: "blob" });
	},
    /**
     * 获取车辆证件到期预警统计
     * @param kind 类型
     * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
     * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getVehicleWarningCount: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/vehicle/warning/count/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    
}