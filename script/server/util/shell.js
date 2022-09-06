const spawn =require("cross-spawn")
function npmCmd(cmd, path) {
    return new Promise((resolve, reject) => {
        let args = cmd.split(/\s+/)
        const npm = spawn("npm", args, {
            cwd: path,
        });
        let output = "";
        npm.stdout
            .on("data", (data) => {
                output += data; // 获取输出日志
            })
            .pipe(process.stdout);

        npm.stderr
            .on("data", (data) => {
                output += data; // 获取报错日志
            })
            .pipe(process.stderr);

        npm.on("close", (code) => {
            if (!code) {
                resolve({ code: 0, data: output }); // 如果没有报错就输出正常日志
            } else {
                reject({ code: code, data: output }); // 如果报错就输出报错日志
            }
        });
    });
}

module.exports={ 
    npmCmd:npmCmd
}

