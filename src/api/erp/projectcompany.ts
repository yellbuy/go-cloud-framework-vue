import { http } from '/@/utils/request';

export default {
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

}