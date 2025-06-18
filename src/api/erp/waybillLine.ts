import { ElMessage } from 'element-plus';
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
        const url = `/v1/admin/erp/waybillline/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
         * 获取运量统计列表数据
         * @param kind 分类
         * @param scopeMode：模式，0按scopeLevel，多少级有多少个Filter参数；1按scopeKind，始终3个参数，按所在层级不足时填充0
         * @param scopeValue：层级值，0：当前用户所在层级，1：系统，2：应用，3：租户，4：用户
         * @param params 要传的参数值
         * @returns 返回接口数据
         */
    getStatListByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/waybillline/stat/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params);
    },
    /**
     * 获取信息
     * @returns 返回接口数据
     */
    getById: async (id: number | string) => {
		const url = `/v1/admin/erp/waybillline/${id}`;
		return await http.get(url);
	},
    /**
     * 导出记录
     * @param id 记录标识
     * @returns 返回接口数据
     */
    exportXlsByScope: async (kind: string, scopeMode: number = 0, scopeValue: number = 0, params: object = {}) => {
        const url = `/v1/admin/erp/waybillline/excel/${kind}/${scopeMode}/${scopeValue}`;
        return await http.get(url, params, { responseType: "blob" });
    },
    /**
     * 更新表字段
     * @param tableName 表名
     * @param fieldName 字段名
     * @param id 标识
     * @param val 值
     * @returns 返回接口数据
     */
    updateById:async(id:string|number,fieldName:string,fieldValue:number|number,extId:string|number,savedTimeFieldName:string="",savedUserFieldName:string="")=>{
        //对象转换为数组
        const data={Id:id,Value:fieldValue,ExtId:extId,SavedTimeFieldName:savedTimeFieldName,SavedUserFieldName:savedUserFieldName}
        const url=`/v1/admin/erp/waybillline/update/${fieldName}/${fieldValue}`;
        const res= await http.post(url, data,{notifyError:false});
        if(res.errcode==0){
            ElMessage({
                message: '操作成功',
                grouping: true,
                type: 'success',
            })
        } else {
            ElMessage({
                message: `操作失败，请刷新后重试。错误消息：${res.errmsg}`,
                grouping: true,
                type: 'error',
            })
        }
    },
    /**
	 * 更新表字段
	 * @param tableName 表名
	 * @param fieldName 字段名
	 * @param ids 标识数组
	 * @param val 值
	 * @returns 返回接口数据
	 */
	updateExtByIds:async(waybillId:string,fieldName:string,ids:[],fieldValue:any,savedTimeFieldName:string="",savedUserFieldName:string="")=>{
        if(!ids || ids.length==0){
			ElMessage({
				message: '选择的记录不能为空',
				grouping: true,
				type: 'warning',
			})
			return false;
		}
		//对象转换为数组
		const idValArr=ids.map((id)=>{return {Id:id,Value:fieldValue}})
        const data={Id:waybillId,ExtValues:idValArr,SavedTimeFieldName:savedTimeFieldName,SavedUserFieldName:savedUserFieldName}
		const url=`/v1/admin/erp/waybillline/update/${fieldName}`;
		const res= await http.post(url, data,{notifyError:false});
		if(res.errcode==0){
			ElMessage({
				message: '操作成功',
				grouping: true,
				type: 'success',
			})
		} else {
			ElMessage({
				message: `操作失败，请刷新后重试。错误消息：${res.errmsg}`,
				grouping: true,
				type: 'error',
			})
		}
		return res.errcode==0
	},
    /**
     * 批量插入
     * @param data 信息
     * @returns 返回接口数据
     */
    insertMulti: async (data: object) => {
        const url = `/v1/admin/erp/Waybilllines`;
        return await http.post(url, data);
    },
    /**
     * 批量导入
     * @param data 信息
     * @returns 返回接口数据
     */
    importMulti: async (kind:string,waybillId:number|string,data: object) => {
        const url = `/v1/admin/erp/Waybilllines/${kind}/${waybillId}`;
        return await http.post(url, data);
    },

    /**
     * 新增或更新
     * @param data 信息
     * @returns 返回接口数据
     */
    save: async (data: object) => {
        if (!data.Id || data.Id == "0") {
            const url = `/v1/admin/erp/waybillline`;
            return await http.post(url, data);
        }
        const url = `/v1/admin/erp/waybillline/${data.Id}`;
        return await http.post(url, data);
    },

    /**
     * 删除
     * @param ids 标识，字符串或数组
     * @returns 返回接口数据
     */
    delete: async (id: number | string,waybillId: number | string) => {
        const url = `/v1/admin/erp/waybillline/delete/${id}?waybillId=${waybillId}`;
        return await http.post(url);
    },
}