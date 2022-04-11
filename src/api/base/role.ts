import { http } from '/@/utils/request';

export default {
	
	/**
	 * 获取角色列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList:async (params: object={})=>{
		const url=`/v1/admin/base/v1/roles`;
		return await http.get(url, params);
	},
	/**
	 * 获取角色权限
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	 getPermissionsById:async (id:number|string)=>{
		//`,
		const url=`v1/admin/base/role/permissions/${id}`;
		return await http.get(url);
	},
	
	/**
	 * 新增角色
	 * @param data 角色信息
	 * @returns 返回接口数据
	 */
	insert:async(data:object)=>{
		const url=`/v1/admin/base/role`;
		return await http.post(url, data);
	},
	/**
	 * 更新角色
	 * @param data 角色信息
	 * @returns 返回接口数据
	 */
	update:async(data:object)=>{
		const url=`/v1/admin/base/role/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 新增或更新角色
	 * @param data 角色信息
	 * @returns 返回接口数据
	 */
	save:async(data:object)=>{
		if(!data.Id||data.Id=="0"){
			const url=`/v1/admin/base/role`;
			return await http.post(url, data);
		}
		const url=`/v1/admin/base/role/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 删除角色
	 * @param id 角色标识
	 * @returns 返回接口数据
	 */
	delete:async(id:number|string)=>{
		const url=`/v1/admin/base/role/delete/${id}`;
		return await http.post(url);
	},
}