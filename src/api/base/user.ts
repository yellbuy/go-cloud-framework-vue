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
	 * 刷新Token
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	refreshToken:async ()=> {
		const url='/v1/base/user/refreshtoken';
		return await http.post(url);
	},
	/**
	 * 获取用户列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList:async (params: object={})=>{
		const url=`/v1/admin/base/users`;
		return await http.get(url, params);
	},
	/**
	 * 获取用户
	 * @param id 用户标识
	 * @returns 返回接口数据
	 */
	 getById:async (id: number|string)=>{
		const url=`/v1/admin/base/users/${id}`;
		return await http.get(url);
	},
	/**
	 * 锁屏解锁
	 * @param data 解锁认证数据
	 * @returns 返回接口数据
	 */
	 unlockScreen:async (data:object)=>{
		const url=`/v1/admin/base/unlockscreen`;
		return await http.post(url, data);
	},
	/**
	 * 获取验证码
	 * @returns 返回接口数据
	 */
	 getCaptcha:async ()=>{
		const url=`/v1/base/user/captcha`;
		return await http.get(url);
	},
	
	/**
	 * 新增用户
	 * @param data 用户信息
	 * @returns 返回接口数据
	 */
	insert:async(data:object)=>{
		const url=`/v1/admin/base/user`;
		return await http.post(url, data);
	},
	/**
	 * 更新用户
	 * @param data 用户信息
	 * @returns 返回接口数据
	 */
	update:async(data:object)=>{
		const url=`/v1/admin/base/user/${data.Id}`;
		return await http.post(url, data);
	},/**
	* 更新用户信息
	* @param data 用户信息
	* @returns 返回接口数据
	*/
   updateProfile:async(data:object)=>{
	   const url=`/v1/admin/base/user/profile/${data.Id}`;
	   return await http.post(url, data);
   },
	/**
	 * 新增或更新用户
	 * @param data 用户信息
	 * @returns 返回接口数据
	 */
	save:async(data:object)=>{
		if(!data.Id||data.Id=="0"){
			const url=`/v1/admin/base/user`;
			return await http.post(url, data);
		}
		const url=`/v1/admin/base/user/${data.Id}`;
		return await http.post(url, data);
	},
	delete:async(id:number|string)=>{
		const url=`/v1/admin/base/user/delete/${id}`;
		return await http.post(url);
	},
}