const files = import.meta.globEager('./**/*.ts')
 
const api = Object.keys(files).reduce(
  (api: { [key: string]: any }, path: string) => {
    const moduleNames = path.replace(/(\.\/|\.ts)/g, '').split("/");
    let curModule=api;
    moduleNames.forEach((val,index,array)=>{
        if(index==moduleNames.length-1){
            return;
        }
        if(!curModule[val]){
          curModule[val]={}
        }
        
        curModule=curModule[val]
    })
    
    const func=files[path]?.default;
    const rootKey=moduleNames[moduleNames.length-1]
    curModule[rootKey]=Object.assign({},func)
    
    return api
  },
  {}
)

export default api