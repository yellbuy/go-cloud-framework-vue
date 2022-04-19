import { ElMessage } from 'element-plus';
import { http } from '/@/utils/request';
export default{
	
	
	/**
	 * 批量更新表字段
	 * @param tableName 表名
	 * @param fieldName 字段名
	 * @param data 更新的数据
	 * @param defaultValue 为空时的默认值
	 * @param childFieldName 子字段名，传入时将对树形结构进行处理
	 * @returns 返回接口数据
	 */
	update:async(tableName:string,fieldName:string,data:any,defaultValue:string|boolean|number,childFieldName:string="")=>{
		if(!data){
			return
		}
        //对象转换为数组
        if(!(data instanceof Array)){
            data=[data]
        }
		//解决树形结构的问题
		let items=data;
		if(childFieldName){
			const pushChildren=((val:any)=>{
				const children=val[childFieldName];
				if(children && children.length>0){
					items=items.concat(children)
					children.forEach((element:any) => {
						pushChildren(element);
					});
				}
			})
			data.forEach((element:any) => {
				pushChildren(element)
			});
		}
		
		const values:any[]=items.map((val:any)=>{
			
			const type=typeof defaultValue;
			let value:any=val[fieldName];
			if(type==='string'){
				value=String(value)
			} else if(type==='number'||type==='bigint'){
				value=Number(value)
			} else if(type==='boolean'){
				value=Boolean(value)
			}
			const obj:any =  {Id:val.Id,Value:value};
			return obj;
		})
		
		const url=`/v1/admin/table/${tableName}/${fieldName}`;
		const res= await http.post(url, values,{notifyError:false});
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
	 * @param id 标识
	 * @param val 值
	 * @returns 返回接口数据
	 */
     updateById:async(tableName:string,fieldName:string,id:string,val:any)=>{
        //对象转换为数组
        const data=[{Id:id,Value:val}]
		const url=`/v1/admin/table/${tableName}/${fieldName}`;
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
	
}