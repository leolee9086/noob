import jsCompiler from './js.js'
import sfcCompiler from './vue1.js'
export default class compilers{
    constructor(naive){
        this.js = new jsCompiler()
    }
}