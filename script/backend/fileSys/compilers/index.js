//import jsCompiler from './js.js'
import sfcCompiler from './vue1.js'
import tsComplier from './ts.js'
import scssCompiler from './scss.js'

export default class compilers{
    constructor(naive){
       // this.js = new jsCompiler()
        this.ts = new tsComplier()
        this.sass = new scssCompiler()
    }
}