class  test extends  naive.plugin  {
    constructor(option){
        super(option)
        console.log(this.app)
        this.router="/test"    
        this.method='get'    
    }
     func(req,res){
        res.end("test")

    }

}

