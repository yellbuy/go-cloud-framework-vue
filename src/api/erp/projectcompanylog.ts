import { http } from '/@/utils/request';

export default {
    /**
   * 新增
   * @param data 标识，字符串或数组
   * @returns 返回接口数据
   */
    addMuit: async (data: object,projectTid:number = 0 , scopeMode: number = 0, scopeValue: number = 0) => {
        const url = `/v1/admin/erp/projectcompanylog/${projectTid}/${scopeMode}/${scopeValue}`;
        return await http.post(url, data);
    },
     /**
   * 列表
   * @param data 标识，字符串或数组
   * @returns 返回接口数据
   */
    getListByScope: async ( scopeMode: number = 0, scopeValue: number = 0,params: object = {}) => {
        const url = `/v1/admin/erp/projectcompanylog/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    AuditState: async (data: object) => {
        const url = `/v1/admin/erp/projectcompanylog`;
        return await http.post(url,data)
    },
      /**
     * 删除
     * @param ids 标识，字符串或数组
     * @returns 返回接口数据
     */
    delete: async (id: number | string) => {
        const url = `/v1/admin/erp/projectcompanylog/delete/${id}`;
        return await http.post(url);
    },
}
