module.exports = {
    transactions:{
        preFix:async function (data, rawReq, rawRes) {
            console.log(data)
            if(data.transactions){
                data.transactions.forEach(
                    transaction=>{
                        transaction.doOperations.forEach(
                            Operation=>{
                                Operation.data=Operation.data.replace(/\&lt\;span\&gt\;/g,'<span>')
                                Operation.data=Operation.data.replace(/\&lt\;\/span&gt\;/g,'</span>')

                                naive.核心api.setBlockAttrs({
                                    id:Operation.id,
                                    attrs:{
                                        'custom-lastedit-ip':rawReq.socket.remoteAddress,
                                        'custom-lastedit-user':rawReq.session.user||'visitor',
                                        'custom-lastedit-describe':`来自${rawReq.socket.remoteAddress}的${rawReq.session.user||'visitor'} 编辑于${new Date().toString()} `,                                            
                                    }
                                },'')
                            }
                        )
                    }
                )
            }
            return data
        },
        afterFix: async function (data, rawReq, rawRes) {
            console.log(data)
            return data
        }
    },
    insertBlock:{
        preFix: function (data, rawReq, rawRes) {
            console.log(syReq)
        },
        afterFix: async function (data, rawReq, rawRes) {
            console.log(data)
        }
    },
    setBlockAttrs:{
        preFix: function (syReq, rawReq, rawRes) {
            console.log(syReq)
        },
        afterFix: async function (syRes, rawReq, rawRes) {
            console.log(syRes)
            let str= await unzip(syRes)
            console.log(str)
            rawRes.end(JSON.stringify(str))
        }

    }
}