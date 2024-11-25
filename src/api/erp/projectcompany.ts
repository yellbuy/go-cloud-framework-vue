import { http } from '/@/utils/request';

export default {
    
    /**
   * 公司报名详细信息
   * @param data 标识，字符串或数组
   * @returns 返回接口数据
   */
    getById: async (id: number | string) => {
        const url = `/v1/admin/erp/projectcompany/${id}`;
        return await http.get(url);
    },

    /**
   * 公司报名
   * @param data 标识，字符串或数组
   * @returns 返回接口数据
   */
    signup: async (data: object) => {
        const url = `/v1/admin/erp/projectcompany/signup`;
        return await http.post(url, data);
    },
    /**
   * 公司报价
   * @param data 标识，字符串或数组
   * @returns 返回接口数据
   */
    quoted: async (data: object) => {
        const url = `/v1/admin/erp/projectcompany/quoted`;
        return await http.post(url, data);
    },

/**
 * 公司报名列表
 * @param data 标识，字符串或数组
 * @returns 返回接口数据
 */
    signUpList: async (data: object) => {
        const url = `/v1/admin/erp/projectcompany/signuplist`;
        return await http.get(url, data);
    },
/**
 * 开标包报名公司列表
 * @param data 标识，字符串或数组
 * @returns 返回接口数据
 */
    comparisonList: async (data: object) => {
        const url = `/v1/admin/erp/projectcompany/comparisonlist`;
        return await http.get(url, data);
    },

/**
 * 开标包报名公司列表
 * @param data 标识，字符串或数组
 * @returns 返回接口数据
 */
    signUpLists: async (data: object) => {
        const url = `/v1/admin/erp/projectcompany/signuplists`;
        return await http.get(url, data);
    },

/**
 * 公司报名详细信息
 * @param kind 分类
 * @param id 项目id
 * @param data 标识，字符串或数组
 * @returns 返回接口数据
 */
    projectcompany: async (kind: string, id: string|number, data: object) => {
        const url = `/v1/admin/erp/projectcompany/projectcompanysigngetbyid/${kind}/${id}`;
        return await http.get(url ,data);
    },

/**
 * 更新公司已报名表信息
 * @param id 项目id
 * @param data 标识，字符串或数组
 * @returns 返回接口数据
 */
    update: async ( id: string|number, data: object) => {
        const url = `/v1/admin/erp/projectcompany/update/${id}`;
        return await http.post(url, data);
    },

/**
 * 更新公司报名信息上传的文件及状态
 * @param id 项目id
 * @param data 标识，字符串或数组
 * @returns 返回接口数据
 */
    fileUpdate: async ( id: string|number, data: object) => {
        const url = `/v1/admin/erp/projectcompany/updatefile/${id}`;
        return await http.post(url, data);
    },
    
    /**
 * 更新公司报名信息凭证审核状态
 * @param id 项目id
 * @param data 标识，字符串或数组
 * @returns 返回接口数据
 */
    auditUpdate: async ( id: string|number, data: object) => {
        const url = `/v1/admin/erp/projectcompany/updateaudit/${id}`;
        return await http.post(url, data);
    },


/**
 * 中标公司推荐
 * @param id 公司报名信息id
 * @param data 标识，字符串或数组
 * @returns 返回接口数据
 */
    recommendationUpdate: async ( id: string|number, data: object) => {
        const url = `/v1/admin/erp/projectcompany/recommendation/${id}`;
        return await http.post(url, data);
    },

/**
 * 中标公司推荐
 * @param id 项目id
 * @param data 标识，字符串或数组
 * @returns 返回接口数据
 */
    confirmUpdate: async ( id: string|number) => {
        const url = `/v1/admin/erp/projectcompany/leaderconfirm/${id}`;
        return await http.post(url);
    },
}