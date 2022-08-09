export function 驼峰转换(str){
    let temp1 = '';
    let temparr = str.split('');
    let newArr = temparr.map((ite,idx)=>{
        ite= ite.toUpperCase()===ite&&idx!==0?ite='-'+ite.toLowerCase():ite
        idx==0?ite=ite.toLowerCase():null
        return ite
    })
    temp1 = newArr.join('');
    return temp1;
}