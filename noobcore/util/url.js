import { workspaceDir } from "./file.js";
export function 工作空间文件转url(工作空间内文件地址){
    let 去工作空间前缀地址 = 工作空间内文件地址.replace(/\\/g,'/').replace(workspaceDir,'')
    if(去工作空间前缀地址.startsWith('/data')){
        去工作空间前缀地址 = 去工作空间前缀地址.replace('/data','')
    }
    return 去工作空间前缀地址
}