export class 硬件加速器 {
       constructor(app){
        this.app = app
        this.初始化()
       }
       初始化(){
         if(window.require){
            const { GPU } = require(this.app.workspaceDir+"/conf/appearance/themes/naive/script/public/static/gpu.js");
            this.gpu = new GPU()
         }
         else if(GPU){
            this.gpu = new GPU()
         }
       } 
     
       
}