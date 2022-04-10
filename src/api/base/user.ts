import { http } from '/@/utils/request';

export default{
	/**
	 * 用户登录
	 * @param data 要传的数据
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	 signIn:async (data: object,params:object={})=>{
		const url='/v2/admin/base/user/login';
		return await http.post(url, data,{params});
	},
	/**
	 * 获取用户列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList:async (params: object={})=>{
		const url=`/v1/admin/base/users`;
		console.log("params:",params)
		return await http.get(url, params);
	}
}