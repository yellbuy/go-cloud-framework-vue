import { http } from '/@/utils/request';

export default {
    /**
     * 获取文件列表
     * @param kind 分类
     * @param params 要传的参数值
     * @returns 返回接口数据
     */
    getListByScope: async (scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/projectcompanyline/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },

    /**
     * 批量保存
     * @param kind 分类
     * @param data 要传的参数值
     * @returns 返回接口数据
     */
    saveMulti: async (kind: string, data: any) => {
        const url = `/v1/admin/erp/projectcompanylines/${kind}`;
        return await http.post(url, data);
    },
        
    /**
     * 删除文件
     * @param id 分类
     * @param data 要传的参数值
     * @returns 返回接口数据
     */
    delete: async (id: number | string, data: any) => {
        const url = `/v1/admin/erp/projectcompanyline/delete/${id}`;
        return await http.post(url, data);
    },

   /**
   * 公司提交投标文件
   * @param data 文件列表
   * @returns 返回接口数据
   */
   saveBiding: async (id: number | string, data: object) => {
        const url = `/v1/admin/erp/projectcompanyline/bidding/${id}`;
        return await http.post(url, data);
    },

   /**
   * 查询开单一览表
   * @param data 文件列表
   * @returns 返回接口数据
   */
   getBidingList: async (params: object = {}) => {
    const url = `/v1/admin/erp/projectcompanyline/biding`;
    return await http.get(url, params);
    },
    
}