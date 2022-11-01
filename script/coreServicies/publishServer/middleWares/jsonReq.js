import { kernelApiList } from "../util/kernelApi.js"
const 核心api = new kernelApiList()
async function 请求数据(url, apitoken, data) {
    let resData = null;
    let str = JSON.stringify(data);
    try {
        await fetch(url, {
            body: str,
            method: "POST",
            headers: {
                //          'Content-Type': 'text/plain;charset=UTF-8',

                Authorization: "Token " + apitoken,
            },
        }).then(function (response) {
            resData = response.json();
        });
        return resData;
    } catch (e) {
        console.log(e);
    }
}
async function 请求鉴权(req, res) {
    let id =
        req.params.blockid || req.query.blockid || req.query.id || req.body.id;
    let query = req.query;
    res.json({
        accessed: 判定id权限(id, query),
    });
}
export async function 判定id权限(块id, query, multi) {
    let flag = false;
    let 块信息数组 = await 核心api.sql(
        {
            stmt:
                `select root_id , path  from blocks where id = '${块id}' and not id in (
        select block_id from attributes where name = 'custom-publish-token'
      )`}, ''

    );
    if (块信息数组 && 块信息数组[0]) {
        let 路径 = 块信息数组[0].path;
        flag = await 判定路径权限(路径, "", multi);
    }
    return flag;
}
async function 判定路径权限(路径, accessedArray, multi) {
    if (!accessedArray) {
        accessedArray = await 生成路径权限表();
    }
    let 鉴权块 = { path: "" };
    for (let i = 0; i < accessedArray.length; i++) {
        let block = accessedArray[i];
        //如果块的路径包含了鉴权序列中的某个路径,说明这个块在这个路径下
        if (路径.replace(".sy", "").indexOf(block.path.replace(".sy", "")) >= 0) {
            if (block.path.length >= 鉴权块.path.length) {
                鉴权块 = block;
            }
        }
    }
    if (!multi) {
        if (鉴权块.value == "public") {
            return true
        }
        else if (['public', "private", 'protected'].indexOf(鉴权块.value) < 0) {
            return "protected"
        }
        else {
            return false
        }
    }
    else {
        if (['public', "private", 'protected'].indexOf(鉴权块.value) >= 0 || (鉴权块.value && 鉴权块.value.startsWith('userGroup:'))) {
            return 鉴权块.value
        }
        else {
            return "protected"
        }
    }
}
async function 生成路径权限表() {
    let stmt = `
        SELECT *
        FROM attributes AS a
        WHERE (a.name = 'custom-publish-access' ) and (a.root_id = a.block_id)
        `;
    let accessedArray = await 核心api.sql({ stmt: stmt }, "");
    return accessedArray;
}
async function checkAccessAuth(块数据, query) {
    let flag = false;
    for (属性名 in 块数据) {
        if (属性名.startsWith("custom-publish-access-")) {
            let 用户名 = query.user;
            let 密码 = query.passWord;
            if (
                "custom-publish-access-" + 用户名 + "" == 属性名 &&
                密码 == 块数据[属性名]
            ) {
                flag = true;
            }
        }
    }
    return flag;
}
async function 批处理判定路径权限(块数组) {
    let accessedArray = await 生成路径权限表();
    for (let i = 0; i < 块数组.length; i++) {
        let 块数据 = 块数组[i];
        let path = 块数据.path;
        if(!path){
            块数据.accessed = await 判定id权限(块数据.id, false,accessedArray);
        }else{
        块数据.accessed = await 判定路径权限(path, accessedArray);
        }
        if (!块数据.accessed) {
            for (let attr in 块数据) {
                if (块数据.hasOwnProperty(attr)) {
                    if (!(['path', 'type', 'subType', 'subFileCount', 'id', 'color', 'size', 'box', 'rootID', 'root_id',].indexOf(attr) >= 0)) {
                        块数据[attr] = "私有块不可访问"
                        if (attr == 'color') {
                            块数据[attr] = { background: "red" }
                        }
                    }
                    /*if(attr!=='path'&&attr!=="type"&&attr!=='subType'&&attr!=='subFileCount'&&attr!=='id'){
                    块数据[attr]="私有块不可访问"
                    }*/
                }
            }
        }
    }
    return 块数组;
}
async function 转发请求(req, res) {
    const http = require("http");
    var { connection, host, ...originHeaders } = req.headers;
    // 构造请求报文
    var options = {
        method: req.method,
        hostname: "127.0.0.1",
        port: "6806",
        path: req.url,
        headers: { originHeaders },
    };
    // 通过req的data事件和end事件接收客户端发送的数据
    // 并用Buffer.concat处理一下
    let postbody = [];
    req.on("data", (chunk) => {
        postbody.push(chunk);
    });
    req.on("end", () => {
        let postbodyBuffer = Buffer.concat(postbody);
        // 定义变量接收目标服务器返回的数据
        let responsebody = [];
        // 发送请求头
        var request1 = http.request(options, (response2) => {
            response2.on("data", (chunk) => {
                responsebody.push(chunk);
            });
            response2.on("end", () => {
                // 处理目标服务器数据,并将其返回给客户端
                let responsebodyBuffer = Buffer.concat(responsebody);
                console.log(response2, 25);
                res.setHeader("Access-Control-Allow-Private-Network", true);
                res.end(responsebodyBuffer);
            });
        });
        // 将接收到的客户端请求数据发送到目标服务器;
        request1.write(postbodyBuffer);
        request1.end();
    });

}
export default {
    转发JSON请求: async function (req, res) {
        if (req.session && req.session.user_group === "admin" && (!((req.rawHeaders.indexOf("application/json;charset=UTF-8")) >= 0))) {
            await 转发请求(req, res)
            return
        }
        if (req.url.indexOf("account") >= 0) {
            res.end("不可访问账户api");
            return;
        }
        if (req.url.indexOf("setting") >= 0) {
            res.end("不可访问设置api");
            return;
        }
        if (req.url.indexOf("system") >= 0) {
            res.end("不可访问设置api");
            return;
        }
        if (req.url.indexOf("sync") >= 0) {
            res.end("不可访问同步api");
            return;
        }
        if (req.url.indexOf("backup") >= 0) {
            res.end("不可访问备份api");
            return;
        }

        var { connection, host, ...originHeaders } = req.headers;
        // 构造请求报文
        //    console.log(req.url, req.body);
        let resData = {};
        let syres = {};
        let apitoken = "";
        let url =
            "http://" +
            "127.0.0.1" +
            ":" +
            "6806" +
            req.url.replace('/siyuanPublisher/publishApi', '/api');
        syres = await 请求数据(url, apitoken, req.body);
        if (req.session && req.session.user_group !== "admin") {
            if (req.session && !req.session.status) {
                if (syres.data && syres.data.files && syres.data.files[0]) {
                    syres.data.files = await 批处理判定路径权限(syres.data.files);
                    syres.data.files = syres.data.files.filter((file) => {
                        return file;
                    });
                }
                if (syres.data && syres.data.blocks && syres.data.blocks[0]) {
                    syres.data.blocks = await 批处理判定路径权限(syres.data.blocks);
                    syres.data.blocks = syres.data.blocks.filter((file) => {
                        return file;
                    });
                }
                if (syres.data && syres.data.backlinks && syres.data.backmentions) {
                    syres.data.backlinks = await 批处理判定路径权限(
                        syres.data.backlinks
                    );
                    syres.data.backmentions = await 批处理判定路径权限(
                        syres.data.backmentions
                    );
                }
                if (syres.data && syres.data.nodes && syres.data.links) {
                    syres.data.nodes = await 批处理判定路径权限(syres.data.nodes);
                    for (let i = 0, len = syres.data.links.length; i < len; i++) {
                        let link = syres.data.links[i];
                        let fromid = link.from;
                        let toid = link.to;
                        let labels = await 核心api.sql({
                            stmt: `select  * from blocks  where id in (select block_id from refs where def_block_id='${fromid}') and id in  (select block_id from refs where def_block_id='${toid}')`,
                        });
                        if (labels && labels[0]) {
                            syres.data.links[i]["label"] = labels[0].content;
                        }
                    }
                }
            }
            syres = JSON.parse(JSON.stringify(syres));
        }
        res.end(JSON.stringify(syres));
    },
    判定id权限: 判定id权限
}
