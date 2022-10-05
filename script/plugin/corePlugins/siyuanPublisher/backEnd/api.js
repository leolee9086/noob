const { middlewares } = naive
const { syProxy } = middlewares
const { apiProxy } = syProxy
const { 判定id权限 } = require('./middlewares/jsonReq.js')

module.exports = (plugin) => {
    //这里是插件自己的api
    plugin.describeApi(
        //这表示这些api采用了完全一样的配置
        ['/', '/block/:blockid', '/block/'],
        {
            名称: '首页',
            功能: '渲染首页',
            方法: {
                get: [async (req, res, next) => {
                    if (req.session) {
                        let access = await 判定id权限(
                            req.params.blockid || req.query.blockid || req.query.id
                            ,
                            "",
                            true
                        );
                        console.error(access);
                        //未登录状况以默认权限鉴权
                        if (req.session.status !== "Authed") {
                            //已经设置了access的路径,根据access鉴权
                            if (access == "protected") {

                                res.end(naive.unAuthedPageTemplate.protected);
                                console.log(res);

                            } else if (access == "private") {

                                res.end(naive.unAuthedPageTemplate.private);
                                console.log(res);
                            } else if (access == "public") {
                                next()
                            }
                            //没有设置或者为其他值的,根据默认设置鉴权
                            else {
                                if (!naive.设置.默认发布设置 || naive.设置.默认发布设置 == "private") {
                                    console.error('test')
                                    res.end(naive.unAuthedPageTemplate.private);

                                } else if (naive.设置.默认发布设置 == "protected") {
                                    res.end(naive.unAuthedPageTemplate.protected);
                                    console.log(res);
                                } else if (naive.设置.默认发布设置 == "public" && !access) {
                                    next()
                                }
                                else if (naive.设置.默认发布设置 == "public" && access) {

                                    res.end(naive.unAuthedPageTemplate.protected);
                                }
                                else {
                                    res.end(naive.unAuthedPageTemplate.protected);

                                }

                            }
                        }
                        //已经登录的状况,则以userGroup鉴权
                        else if ((access + "").startsWith("userGroup:")) {
                            let userGroup = access.slice("userGroup:".length, access.length);
                            console.error(userGroup);
                            let array = userGroup.split(",");
                            //如果块的userGroup包含了当前请求会话所在的userGroup,返回块内容
                            if (req.session.user_group == 'admin') {
                                next();
                            }
                            if (array.indexOf(req.session.user_group) >= 0) {
                                next();
                            } else {
                                res.end(naive.unAuthedPageTemplate.private);
                                next()
                            }
                        }
                        //如果没有设置userGroup直接返回渲染结果,也就是所有登录用户都可以访问
                        else {
                            next()
                        }
                    }
                    //如果请求路径有问题,直接重定向到login
                    else if (!req.session) {
                        res.redirect("/user/login");

                    }
                },
                async (req, res) => {
                    let id = req.params.blockid || req.query.blockid || req.query.id || naive.设置.首页.id || naive.设置.首页.思源文档id || naive.设置.首页;
                    const fs = require("fs-extra");
                    let cachePath = `${naive.workspaceDir}/temp/naiveCache/${id}.html`
                    let { updated } = await naive.核心api.getBlockAttrs(
                        { id: id }, ""
                    )
                    console.log(updated)
                    if (fs.existsSync(cachePath)) {
                        let state=fs.statSync(cachePath)
                        if(state)
                        res.sendFile(cachePath)
                        return
                    }
                    else {
                        console.log(req)

                        let content = await plugin.管线渲染(req, res)
                        console.log(content)
                        naive.pathConstructor.initFilep(
                            cachePath,
                            content,
                            function (err) {
                                if (err) {
                                    throw err;
                                }
                                console.log("uncached");
                            }
                        );

                    }
                }]
            },
            //权限为public的api固定所有用户都可以访问并获取正确的结果,不过可以在方法中加上别的过滤选项
            权限: 'public',
            请求值: 'todo',
            返回值: 'todo',
            一级分组: 'siyuanPublisher',
            二级分组: 'block'
        }
    )
    plugin.describeApi(
        '/editor',
        {
            名称: '思源编辑器页面',
            功能: '通过naive代理打开思源编辑器页面',
            方法: {
                use:
                    //这个东西是转发到思源的proxy,之后需要把它从naive核心里面分离出来
                    naive.middlewares.syProxy.proxy

            },
            //这里只有对siyuanPublisher->editor分组的api有write权限的用户才能打开编辑器界面
            //配置项目长这样;
            //<user_group>:{
            //    siyuanPublisher:{
            //        access:write  
            // }
            //}
            //或者
            //<user_group>:{
            //    siyuanPublisher:{
            //        editor:write
            //  
            // }
            //}
            权限: 'public',
            请求值: 'todo',
            返回值: 'todo',
            一级分组: 'siyuanPublisher',
            二级分组: 'editor',
            详情: `这里打开的编辑界面行为跟思源默认的基本一致,但是多了一些权限过滤,例如无法编辑没有编辑权限的文档之类`
        }
    )
    plugin.describeApi(
        '/getPrivateBlock',
        {
            名称: '获取私有块内容',
            功能: '获取发布页面下被token保护的私有块的实际内容',
            方法: {
                post: (req, res) => {
                    let data = req.body
                    if (data && data.id) {
                        if (naive.私有块字典[data.id]) {
                            if (data.token == naive.私有块字典[data.id]['token']) {
                                res.end(JSON.stringify(
                                    {
                                        msg: 0,
                                        data: {
                                            content: naive.私有块字典[data.id]['content']
                                        }
                                    })
                                )
                            }
                            else {
                                res.end(JSON.stringify(
                                    {
                                        msg: 0,
                                        data: {
                                            content: `<div>鉴权码错误</div>`
                                        }
                                    }
                                ))
                            }
                        }
                    } else {
                        res.end(JSON.stringify(
                            {
                                msg: 0,
                                data: {
                                    content: `<div>鉴权码错误</div>`
                                }
                            }
                        ))
                    }
                }
            },

            权限: 'public',
            请求值: 'todo',
            返回值: 'todo',
            一级分组: 'siyuanPublisher',
            二级分组: 'editor'
        },
    )
    plugin.describeApi(
        '/publishApi/*',
        {
            名称: '发布界面思源api',
            功能: '用于发布页面的思源api转发,会对返回的块内容进行过滤,大部分api无法访问',
            方法: {
                post: require('./middlewares/jsonReq.js').转发JSON请求
            },

            权限: 'public',
            请求值: 'todo',
            返回值: 'todo',
            一级分组: 'siyuanPublisher',
            二级分组: 'publishApi'
        },
    )

    //这里之后全部都是对思源api的转发,但是只有核心插件能够调用describeCoreApi方法
    //describeCoreApi方法能够忽略前缀定义api
    plugin.describeCoreApi('/appearance/',
        {
            名称: "外观文件夹",
            功能: "访问思源的外观文件夹获取主题等",
            权限: "public",
            一级分组: "siyuanApi",
            二级分组: 'appearance',
            //staticPath模式表示这是一个静态文件访问接口
            mode: "staticPath",
            dirPath: `${naive.workspaceDir}\\conf\\appearance`,
            //表示不允许通过post接口遍历该文件夹
            allowList: false,

        }
    )
    plugin.describeCoreApi('/api/system/bootProgress', {
        名称: '获取启动进度',
        功能: '获取启动进度',
        方法: {
            get: [apiProxy],
            post: [apiProxy]
        },
        权限: 'admin',
        //这里可以提供api的请求值描述
        //对于post请求,描述的是req.body
        //对于get请求,描述的是url的query
        请求值: {
            schema: {
                type: 'object'
            }
        },
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/version', {
        名称: '获取思源版本',
        功能: '获取思源版本',
        方法: {
            get: [apiProxy],
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })
    plugin.describeCoreApi('/api/system/currentTime', {
        名称: '获取系统时间',
        功能: '获取系统时间',
        方法: {
            post: [apiProxy]
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })
    plugin.describeCoreApi('/api/system/uiproc', {
        名称: 'uiproc',
        功能: 'uiproc',
        方法: {
            post: [apiProxy]
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })
    plugin.describeCoreApi('/api/system/loginAuth', {
        名称: '登入校验',
        功能: '登入校验',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })
    plugin.describeCoreApi('/api/system/logoutAuth', {
        名称: '登出校验',
        功能: '登出校验',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/getCaptcha', {
        名称: '获取验证码',
        功能: '获取验证码',
        方法: {
            get: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })
    // 需要鉴权
    plugin.describeCoreApi('/api/system/getEmojiConf', {
        名称: '获取emoji设置',
        功能: '获取验证码',
        方法: {
            post: [apiProxy],
            get: [apiProxy]
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/setAccessAuthCode', {
        名称: '设置访问授权码',
        功能: '获取验证码',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })
    plugin.describeCoreApi('/api/system/setNetworkServe', {
        名称: '设置访问授权码',
        功能: '获取验证码',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/setUploadErrLog', {
        名称: '设置访问授权码',
        功能: '获取验证码',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/setNetworkProxy', {
        名称: '设置访问授权码',
        功能: '获取验证码',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/setWorkspaceDir', {
        名称: '设置工作空间',
        功能: '设置工作空间',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/listWorkspaceDirs', {
        名称: '获取工作空间列表',
        功能: '获取工作空间列表',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/setAppearanceMode', {
        名称: '设置显示模式',
        功能: '设置显示模式',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/getSysFonts', {
        名称: '获取系统字体',
        功能: '获取系统字体',
        方法: {
            post: [apiProxy]
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/exit', {
        名称: '退出思源',
        功能: '退出思源',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/setUILayout', {
        名称: '设置ui布局',
        功能: '设置ui布局',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })
    plugin.describeCoreApi('/api/system/getConf', {
        名称: '获取设置',
        功能: '获取设置',
        方法: {
            get: [apiProxy],
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/checkUpdate', {
        名称: '检查思源更新',
        功能: '检查思源更新',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })

    plugin.describeCoreApi('/api/system/exportLog', {
        名称: '导出日志',
        功能: '导出日志',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'system'
    })
    plugin.describeCoreApi('/api/account/login', {
        名称: '登录思源账号',
        功能: '用于登录思源账号',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'account'
    })
    plugin.describeCoreApi('/api/account/checkActivationcode', {
        名称: '校验激活码',
        功能: '用于校验思源激活码',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'account'
    })
    plugin.describeCoreApi('/api/account/useActivationcode', {
        名称: '使用激活码',
        功能: '使用思源激活码',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'account'
    })
    plugin.describeCoreApi('/api/account/deactivate', {
        名称: '反激活',
        功能: '反激活思源账号',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'account'
    })
    plugin.describeCoreApi('/api/account/startFreeTrial', {
        名称: '开始试用思源',
        功能: '开始试用思源会员功能,试用时长参考思源的文档',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'account'
    })
    plugin.describeCoreApi('/api/template/render', {
        名称: '渲染标签',
        功能: '渲染标签',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'template'
    })

    plugin.describeCoreApi('/api/template/docSaveAsTemplate', {
        名称: '另存文档为模板',
        功能: '另存文档为模板',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'template'
    })
    plugin.describeCoreApi('/api/transactions/pushMsg', {
        名称: '推送消息',
        功能: '推送错误消息',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'template'
    })

    plugin.describeCoreApi('/api/transactions/pushErrMsg', {
        名称: '推送消息',
        功能: '推送错误消息',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'pushMsg'
    })
    plugin.describeCoreApi('/api/transactions', {
        名称: '事务',
        功能: '事务',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'transactions'
    })
    plugin.describeCoreApi('/api/tag/getTag', {
        名称: '获取标签',
        功能: '获取标签',
        方法: {
            post: [apiProxy]
        },

        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'tag'
    })

    plugin.describeCoreApi('/api/tag/renameTag', {
        名称: '重命名标签',
        功能: '重命名标签',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: {
            schema: {
                type: 'object',
                properties: {
                    newLabel: { type: 'string' },
                    oldLabel: { type: 'string' }
                },
                required: ['newLabel', 'oldLabel']
            },
            strictCheck: true
        },
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'tag'
    })
    plugin.describeCoreApi('/api/tag/removeTag', {
        名称: '移除标签',
        功能: '移除标签',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'tag'
    })
    plugin.describeCoreApi('/api/sync/setSyncEnable', {
        名称: '搜索大小写设置',
        功能: '搜索大小写设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'sync'
    })

    plugin.describeCoreApi('/api/sync/setSyncMode', {
        名称: '搜索大小写设置',
        功能: '搜索大小写设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'sync'
    })

    plugin.describeCoreApi('/api/sync/setCloudSyncDir', {
        名称: '搜索大小写设置',
        功能: '搜索大小写设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'sync'
    })

    plugin.describeCoreApi('/api/sync/createCloudSyncDir', {
        名称: '搜索大小写设置',
        功能: '搜索大小写设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'sync'
    })

    plugin.describeCoreApi('/api/sync/removeCloudSyncDir', {
        名称: '搜索大小写设置',
        功能: '搜索大小写设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'sync'
    })

    plugin.describeCoreApi('/api/sync/listCloudSyncDir', {
        名称: '搜索大小写设置',
        功能: '搜索大小写设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'sync'
    })

    plugin.describeCoreApi('/api/sync/performSync', {
        名称: '搜索大小写设置',
        功能: '搜索大小写设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'sync'
    })

    plugin.describeCoreApi('/api/sync/performBootSync', {
        名称: '搜索大小写设置',
        功能: '搜索大小写设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'sync'
    })

    plugin.describeCoreApi('/api/sync/getBootSync', {
        名称: '搜索大小写设置',
        功能: '搜索大小写设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'sync'
    })
    plugin.describeCoreApi('/api/setting/setAccount', {
        名称: '设置账户',
        功能: '设置账户',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/setEditor', {
        名称: '设置编辑器',
        功能: '设置编辑器',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/setExport', {
        名称: '设置导出',
        功能: '设置导出',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/setFiletree', {
        名称: '设置导出',
        功能: '设置导出',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/setSearch', {
        名称: '设置导出',
        功能: '设置导出',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/setKeymap', {
        名称: '设置导出',
        功能: '设置导出',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/setAppearance', {
        名称: '设置导出',
        功能: '设置导出',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/getCloudUser', {
        名称: '设置导出',
        功能: '设置导出',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/logoutCloudUser', {
        名称: '登出云端账户',
        功能: '设置导出',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/login2faCloudUser', {
        名称: '登入云端账户',
        功能: '登入云端账户',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/getCustomCSS', {
        名称: '获取自定义css',
        功能: '获取自定义css',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/setCustomCSS', {
        名称: '设置自定义css',
        功能: '设置自定义css',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/setEmoji', {
        名称: '设置emoji',
        功能: '设置emoji',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/setting/setSearchCaseSensitive', {
        名称: '搜索大小写设置',
        功能: '搜索大小写设置',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'setting'
    })
    plugin.describeCoreApi('/api/search/searchTag', {
        名称: '搜索标签',
        功能: '搜索标签',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/search/searchTemplate', {
        名称: '搜索模板',
        功能: '搜索模板',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'search'
    })
    plugin.describeCoreApi('/api/search/searchWidget', {
        名称: '搜索挂件',
        功能: '搜索挂件',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'search'
    })
    plugin.describeCoreApi('/api/search/searchRefBlock', {
        名称: '搜索引用块',
        功能: '搜索引用块',
        方法: {
            post: [apiProxy]
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'search'
    })
    plugin.describeCoreApi('/api/search/searchEmbedBlock', {
        名称: '搜索引用块',
        功能: '搜索引用块',
        方法: {
            post: [apiProxy]
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'search'
    })
    plugin.describeCoreApi('/api/search/fullTextSearchBlock', {
        名称: '全文搜索块',
        功能: '全文搜索块',
        方法: {
            post: [apiProxy]
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'search'
    })
    plugin.describeCoreApi('/api/search/searchAsset', {
        名称: '搜索附件',
        功能: '搜索附件',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'search'
    })
    plugin.describeCoreApi('/api/search/findReplace', {
        名称: '搜索并替换内容',
        功能: '搜索并替换内容',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'search'
    })
    plugin.describeCoreApi('/api/repo/InitRepoKeyFromPassphrase', {
        名称: '以passphrase创建repoKey',
        功能: '以passphrase创建repoKey',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/initRepoKey', {
        名称: '初始化repoKey',
        功能: '初始化repoKey',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/resetRepo', {
        名称: '重设repo',
        功能: '重设repo',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/importRepoKey', {
        名称: '导入repoKey',
        功能: '导入repoKey',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })

    plugin.describeCoreApi('/api/repo/createSnapshot', {
        名称: '创建数据快照',
        功能: '创建当前数据快照',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/tagSnapshot', {
        名称: '标记数据快照',
        功能: '标记数据快照',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/checkoutRepo', {
        名称: 'checkoutRepo',
        功能: 'checkoutRepo',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/getRepoSnapshots', {
        名称: '获取所有快照',
        功能: '获取所有快照',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/getRepoTagSnapshots', {
        名称: '获取所有标记快照',
        功能: '获取所有标记快照',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/removeRepoTagSnapshot', {
        名称: '移除标记快照',
        功能: '移除标记快照',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/getCloudRepoTagSnapshots', {
        名称: '获取云端数据快照',
        功能: '获取思源云端数据快照',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/removeCloudRepoTagSnapshot', {
        名称: '移除云端数据快照',
        功能: '移除云端数据快照',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })

    plugin.describeCoreApi('/api/repo/uploadCloudSnapshot', {
        名称: '上传数据快照到云端',
        功能: '上传数据快照到云端',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/repo/downloadCloudSnapshot', {
        名称: '下载云端数据快照',
        功能: '下载云端数据快照',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'repo'
    })
    plugin.describeCoreApi('/api/ref/refreshBacklink', {
        名称: '刷新反向链接',
        功能: '刷新反向链接',
        方法: {
            post: [apiProxy]
        },

        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'ref'
    })

    plugin.describeCoreApi('/api/ref/getBacklink', {
        名称: '获取反向链接',
        功能: '获取反向链接',
        方法: {
            post: [apiProxy],
            get: function (req, res) {
                res.end("测试一下")
            }
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'ref'
    })
    plugin.describeCoreApi('/api/ref/getBacklink2', {
        名称: '获取反向链接',
        功能: '获取反向链接',
        方法: {
            post: [apiProxy],

        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'ref'
    })
    plugin.describeCoreApi('/api/ref/getBacklinkDoc', {
        名称: '获取反向链接',
        功能: '获取反向链接',
        方法: {
            post: [apiProxy],

        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'ref'
    })

    plugin.describeCoreApi('/api/ref/createBacklink', {
        名称: '创建反向链接',
        功能: '创建反向链接',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'ref'
    })
    plugin.describeCoreApi('/api/query/sql', {
        名称: 'sql查询',
        功能: '以sql查询结果',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'query'
    })
    plugin.describeCoreApi('/api/outline/getDocOutline', {
        名称: '获取文档大纲',
        功能: '获取文档大纲',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'ouline'
    })
    plugin.describeCoreApi('/api/notification/pushMsg', {
        名称: '推送消息',
        功能: '推送消息到各个编辑器',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notification'
    })
    plugin.describeCoreApi('/api/notification/pushErrMsg', {
        名称: '推送错误信息',
        功能: '推送错误信息到各个编辑器',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notification'
    })
    plugin.describeCoreApi('/api/notebook/lsNotebooks', {
        名称: '列出所有笔记本',
        功能: '列出当前工作空间下所有笔记本',
        方法: { post: [apiProxy] },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notebook'
    })
    plugin.describeCoreApi('/api/notebook/openNotebook', {
        名称: '打开笔记本',
        功能: '打开制定笔记本',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notebook'
    })
    plugin.describeCoreApi('/api/notebook/closeNotebook', {
        名称: '关闭指定笔记本',
        功能: '关闭指定笔记本',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notebook'
    })
    plugin.describeCoreApi('/api/notebook/getNotebookConf', {
        名称: '获取指定笔记本设置',
        功能: '获取指定笔记本设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notebook'
    })
    plugin.describeCoreApi('/api/notebook/setNotebookConf', {
        名称: '修改笔记本设置',
        功能: '修改制定笔记本的设置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notebook'
    })
    plugin.describeCoreApi('/api/notebook/createNotebook', {
        名称: '创建笔记本',
        功能: '创建新的笔记本',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notebook'
    })
    plugin.describeCoreApi('/api/notebook/removeNotebook', {
        名称: '移除笔记本',
        功能: '移除指定的笔记本',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notebook'
    })
    plugin.describeCoreApi('/api/notebook/renameNotebook', {
        名称: '重命名笔记本',
        功能: '重命名指定的笔记本',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notebook'
    })
    plugin.describeCoreApi('/api/notebook/changeSortNotebook', {
        名称: '更改指定笔记本的排序方式',
        功能: '更改指定笔记本的排序方式',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notebook'
    })
    plugin.describeCoreApi('/api/notebook/setNotebookIcon', {
        名称: '设置笔记本图标',
        功能: '设置指定笔记本的图标',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'notebook'
    })
    plugin.describeCoreApi('/api/lute/spinBlockDOM', {
        名称: '自旋blockDOM',
        功能: '对blockDOM进行一次自旋',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'lute'
    })

    plugin.describeCoreApi('/api/lute/html2BlockDOM', {
        名称: '转换html为blockDOM',
        功能: '将输入的blockDOM转换为blockDOM',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'lute'
    })
    plugin.describeCoreApi('/api/lute/copyStdMarkdown', {
        名称: '复制标准markdown',
        功能: '复制标准markdown内容',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'lute'
    })
    plugin.describeCoreApi('/api/attr/resetBlockAttrs', {
        名称: '重设块属性',
        功能: '重新设置思源块属性,与setBlockAttrs不同的是,未指定的快属性将被删除',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'attr'
    })
    plugin.describeCoreApi('/api/attr/setBlockAttrs', {
        名称: '设置块属性',
        功能: '设置指定id块的属性值',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'attr'
    })

    plugin.describeCoreApi('/api/attr/getBlockAttrs', {
        名称: '设置块属性',
        功能: '设置指定id块的属性值',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'attr'
    })
    plugin.describeCoreApi('/api/inbox/getShorthands', {
        名称: '获取收集箱内容',
        功能: '获取云端收集箱的内容',
        方法: {
            post: [apiProxy]
        },

        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'inbox'
    })

    plugin.describeCoreApi('/api/inbox/removeShorthands', {
        名称: '移除收集箱内容',
        功能: '移除云端收集箱的内容',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'inbox'
    })

    plugin.describeCoreApi('/api/import/importStdMd', {
        名称: '导入标准markdown',
        功能: '导入markdown内容到指定位置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'import'
    })

    plugin.describeCoreApi('/api/import/importData', {
        名称: '导入数据',
        功能: '导入data文件夹',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'import'
    })
    plugin.describeCoreApi('/api/import/importSY', {
        名称: '导入.sy压缩包',
        功能: '导入思源导出的压缩包文件',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'import'
    })
    plugin.describeCoreApi('/api/history/getNotebookHistory', {
        名称: '获取笔记本历史',
        功能: '获取笔记本的编辑历史',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'history'
    })

    plugin.describeCoreApi('/api/history/rollbackNotebookHistory', {
        名称: '回滚笔记本历史',
        功能: '回滚笔记本历史到指定版本',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'history'
    })

    plugin.describeCoreApi('/api/history/rollbackAssetsHistory', {
        名称: '回滚附件历史',
        功能: '会滚附件历史到指定版本',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'history'
    })

    plugin.describeCoreApi('/api/history/getDocHistoryContent', {
        名称: '获取文档历史内容',
        功能: '获取指定文档历史内容',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'history'
    })

    plugin.describeCoreApi('/api/history/rollbackDocHistory', {
        名称: '回滚文档历史',
        功能: '回滚文档的编辑历史',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'history'
    })

    plugin.describeCoreApi('/api/history/clearWorkspaceHistory', {
        名称: '清除工作空间历史版本',
        功能: '获取笔记本的编辑历史',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'history'
    })

    plugin.describeCoreApi('/api/history/reindexHistory', {
        名称: '重新索引历史',
        功能: '重建历史索引',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'history'
    })

    plugin.describeCoreApi('/api/history/searchHistory', {
        名称: '搜索历史',
        功能: '在历史版本中搜索',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'history'
    })

    plugin.describeCoreApi('/api/graph/resetGraph', {
        名称: '重置全局图谱设定',
        功能: '重置全局图谱设定',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'format'
    })

    plugin.describeCoreApi('/api/graph/resetLocalGraph', {
        名称: '重置局部图谱设定',
        功能: '重置局部图谱设定',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'format'
    })


    plugin.describeCoreApi('/api/graph/getGraph', {
        名称: '获取全局图谱',
        功能: '获取全局图谱',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'format'
    })
    plugin.describeCoreApi('/api/graph/getLocalGraph', {
        名称: '获取局部图谱',
        功能: '获取局部图谱',
        方法: {
            post: [apiProxy]
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'format'
    })
    plugin.describeCoreApi('/api/format/autoSpace', {
        名称: '自动空格',
        功能: '自动在中外文之间插入空格',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'format'
    })
    plugin.describeCoreApi('/api/format/netImg2LocalAssets', {
        名称: '网络图片转本地图片',
        功能: '将网络图片转为本地图片',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'format'
    })
    plugin.describeCoreApi('/api/filetree/searchDocs', {
        名称: '搜索文档',
        功能: '搜索文档',
        方法: {
            post: [apiProxy]
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'file'
    })
    plugin.describeCoreApi('/api/filetree/listDocsByPath', {
        名称: '列出路径下文文档',
        功能: '搜索文档',
        方法: {
            post: [apiProxy]
        },
        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/getDoc', {
        名称: '获取文档内容',
        功能: '获取指定文档的内容',
        方法: {
            post: [apiProxy]
        },
        权限: 'public',
        请求值: {
            schema: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    k: { type: "string" },
                    mode: { type: 'integer' },
                    size: { type: 'integer' }
                },
                required: ["id", 'mode'],
                additionalProperties: false
            },
            strictCheck: true
        },
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/getDocNameTemplate', {
        名称: '获取文档名模板',
        功能: '获取指定笔记本的文档名模板',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/changeSort', {
        名称: '改变排序方式',
        功能: '改变笔记排序方式',
        方法: {
            post: [apiProxy]
        }, 权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/lockFile', {
        名称: '锁定文件',
        功能: '锁定指定文件',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/createDocWithMd', {
        名称: '以md创建文档',
        功能: '传入md字符串,在指定位置创建文档',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/createDailyNote', {
        名称: '创建每日笔记',
        功能: '创建指定笔记本的每日笔记',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/createDoc', {
        名称: '创建文档',
        功能: '在指定位置创建文档',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/renameDoc', {
        名称: '重命名文档',
        功能: '重命名指定文档',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/removeDoc', {
        名称: '移除文档',
        功能: '移除指定文档',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/moveDoc', {
        名称: '移动文档',
        功能: '移动指定文档到指定位置',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/duplicateDoc', {
        名称: '复制文档',
        功能: '复制文档的拷贝',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/getHPathByPath', {
        名称: '根据路径获取人类可读路径',
        功能: '根据id形式的思源路径获取文档名形式的可读路径',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })

    plugin.describeCoreApi('/api/filetree/getHPathByID', {
        名称: '根据ID获取人类可读路径',
        功能: '根据id获取文档名形式的可读路径',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })

    plugin.describeCoreApi('/api/filetree/getFullHPathByID', {
        名称: '根据ID获取完整可读路径',
        功能: '根据id获取文档名形式的完整可读路径(包括笔记本名称)',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })

    plugin.describeCoreApi('/api/filetree/doc2Heading', {
        名称: '转换文档为标题',
        功能: '将指定文档转化为标题',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/heading2Doc', {
        名称: '转换标题为文档',
        功能: '将指定标题转换为文档',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/li2Doc', {
        名称: '转换列表为文档',
        功能: '将指定列表块转换为文档',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/refreshFiletree', {
        名称: '刷新文档树',
        功能: '刷新文档树',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/filetree/reindexTree', {
        名称: '重建索引',
        功能: '重建索引',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'filetree'
    })
    plugin.describeCoreApi('/api/file/getFile', {
        名称: '获取指定文件',
        功能: '指定工作空间路径,获取指定文件',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'file'
    })
    plugin.describeCoreApi('/api/file/putFile', {
        名称: '上传文件',
        功能: '指定工作空间路径,上传文件到此位置',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'file'
    })
    plugin.describeCoreApi('/api/file/copyFile', {
        名称: '复制文件',
        功能: '指定工作空间路径,复制文件',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'file'
    })
    plugin.describeCoreApi('/api/extension/copy', {
        名称: '浏览器插件复制',
        功能: '供浏览器插件调用,复制文件到思源的剪贴板',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })

    plugin.describeCoreApi('/api/export/batchExportMd', {
        名称: '批量导出markdown',
        功能: '批量导出指定文档的markdown内容',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })
    plugin.describeCoreApi('/api/export/exportMd', {
        名称: '导出markdown',
        功能: '导出指定文档的markdown内容',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })
    plugin.describeCoreApi('/api/export/exportSY', {
        名称: '导出sy压缩包',
        功能: '导出指定文档的sy压缩包',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })
    plugin.describeCoreApi('/api/export/exportNotebookSY', {
        名称: '导出笔记本压缩包',
        功能: '导出笔记本的压缩包',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })

    plugin.describeCoreApi('/api/export/exportMdContent', {
        名称: '导出maekdown内容',
        功能: '导出指定文档的markdown内容',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })

    plugin.describeCoreApi('/api/export/exportHTML', {
        名称: '导出HTML',
        功能: '导出指定文档的HTML',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })

    plugin.describeCoreApi('/api/export/exportMdHTML', {
        名称: '导出以markdown生成的HTML',
        功能: '导出指定文档的HTML',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })

    plugin.describeCoreApi('/api/export/exportDocx', {
        名称: '导出Docx',
        功能: '导出Docx文件',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })
    plugin.describeCoreApi('/api/export/addPDFOutline', {
        名称: '导出PDF大纲',
        功能: '导出PDF时的大纲',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })

    plugin.describeCoreApi('/api/export/preview', {
        名称: '导出预览',
        功能: '导出预览',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })
    plugin.describeCoreApi('/api/export/exportData', {
        名称: '导出data文件',
        功能: '导出data文件',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })
    plugin.describeCoreApi('/api/export/exportDataInFolder', {
        名称: '导出data文件到压缩包',
        功能: '导出data文件到压缩包',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'export'
    })
    plugin.describeCoreApi('/api/cloud/getCloudSpace', {
        名称: '获取云端空间情况',
        功能: '获取云端空间详情',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'cloud'
    })
    plugin.describeCoreApi('/api/clipboard/readFilePaths', {
        名称: '读取系统剪贴板内容',
        功能: '删除某个书签',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'clipboard'
    })
    plugin.describeCoreApi('/api/bookmark/getBookmark', {
        名称: '获取书签',
        功能: '获取书签列表',
        方法: {
            post: [apiProxy]
        },

        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bookmark'
    })

    plugin.describeCoreApi('/api/bookmark/renameBookmark', {
        名称: '重命名书签',
        功能: '重命名某个书签',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bookmark'
    })
    plugin.describeCoreApi('/api/bookmark/removeBookmark', {
        名称: '删除书签',
        功能: '删除某个书签',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bookmark'
    })
    plugin.describeCoreApi('/api/block/getBlockInfo', {
        名称: '获取块信息',
        功能: '获取指定块的信息',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })

    plugin.describeCoreApi('/api/block/getBlockDOM', {
        名称: '获取块DOM',
        功能: '获取指定块的DOM',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })

    plugin.describeCoreApi('/api/block/getBlockKramdown', {
        名称: '获取块Kramdown',
        功能: '获取指定块的DOM',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/getBlockBreadcrumb', {
        名称: '获取块面包屑',
        功能: '获取指定块的面包屑',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/getRefIDs', {
        名称: '获取指定块的refIDs',
        功能: '获取指定块refID',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/getRefIDsByFileAnnotationID', {
        名称: '根据FileAnnotationID获取所有refID',
        功能: '获取指定附件文件的引用id',
        方法: {
            post: [apiProxy]
        },

        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/getBlockDefIDsByRefText', {
        名称: '根据块引文字获取定义块id',
        功能: '指定一段文字,获取所有符合这段文字的可引用块ID',
        方法: {
            post: [apiProxy]
        },

        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/getRefText', {
        名称: '获取块引用文字',
        功能: '指定一段文字,获取所有符合这段文字的可引用块ID',
        方法: {
            post: [apiProxy]
        },

        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })

    plugin.describeCoreApi('/api/block/getBlockWordCount', {
        名称: '获取块字数统计',
        功能: '指定块id,获取其字数统计',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/getBlocksWordCount', {
        名称: '批量获取块字数统计',
        功能: '指定一组块id,获取其字数统计',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/getContentWordCount', {
        名称: '获取指定块的内容字数',
        功能: '指定块id,获取其字数统计',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })

    plugin.describeCoreApi('/api/block/getRecentUpdatedBlocks', {
        名称: '获取最近更新块',
        功能: '获取最近更新的块',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })

    plugin.describeCoreApi('/api/block/getDocInfo', {
        名称: '获取文档信息',
        功能: '获取文档的信息',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })

    plugin.describeCoreApi('/api/block/checkBlockExist', {
        名称: '校验块是否存在',
        功能: '校验指定的块是否存在',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })

    plugin.describeCoreApi('/api/block/checkBlockFold', {
        名称: '校验块是否折叠',
        功能: '校验指定的块是否折叠',
        方法: {
            post: [apiProxy]
        },

        权限: 'public',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })

    plugin.describeCoreApi('/api/block/insertBlock', {
        名称: '插入块',
        功能: '在指定位置插入块',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/prependBlock', {
        名称: '插入前置块',
        功能: '在指定文档开头插入块',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/appendBlock', {
        名称: '插入后置块',
        功能: '在指定文档结尾插入块',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/updateBlock', {
        名称: '更新块',
        功能: '更新指定块',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/block/deleteBlock', {
        名称: '删除块',
        功能: '删除指定块',
        方法: {
            post: [apiProxy]
        },

        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })

    plugin.describeCoreApi('/api/block/setBlockReminder', {
        名称: '设置块提醒',
        功能: '设置指定块的提醒',
        方法: {
            post: [apiProxy]
        },

        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'block'
    })
    plugin.describeCoreApi('/api/bazaar/getBazaarWidget', {
        名称: '获取挂件',
        功能: '获取指定的挂件列表',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })

    plugin.describeCoreApi('/api/bazaar/getInstalledWidget', {
        名称: '获取挂件',
        功能: '获取已安装挂件列表',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })

    plugin.describeCoreApi('/api/bazaar/installBazaarWidget', {
        名称: '安装集市挂件',
        功能: '安装指定的集市挂件',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })

    plugin.describeCoreApi('/api/bazaar/uninstallBazaarWidget', {
        名称: '卸载集市挂件',
        功能: '卸载指定的集市挂件',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })

    plugin.describeCoreApi('/api/bazaar/getBazaarIcon', {
        名称: '获取集市图标列表',
        功能: '获取集市上图标集的列表等',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })
    plugin.describeCoreApi('/api/bazaar/getInstalledIcon', {
        名称: '获取已安装的图标列表',
        功能: '获取已经安装的图标',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })
    plugin.describeCoreApi('/api/bazaar/installBazaarIcon', {
        名称: '安装集市图标',
        功能: '获取已经安装的集市图标',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })

    plugin.describeCoreApi('/api/bazaar/uninstallBazaarIcon', {
        名称: '卸载集市图标',
        功能: '卸载已经安装的图标',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })
    plugin.describeCoreApi('/api/bazaar/getBazaarTemplate', {
        名称: '获取集市模板列表',
        功能: '获取集市上的所有模板',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })

    plugin.describeCoreApi('/api/bazaar/getInstalledTemplate', {
        名称: '获取已安装的模板列表',
        功能: '获取本地已安装的所有模板',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })
    plugin.describeCoreApi('/api/bazaar/installBazaarTemplate', {
        名称: '安装集市模板',
        功能: '安装指定的集市模板到本地',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })
    plugin.describeCoreApi('/api/bazaar/uninstallBazaarTemplate', {
        名称: '卸载集市模板',
        功能: '卸载指定的集市模板',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })

    plugin.describeCoreApi('/api/bazaar/getBazaarTheme', {
        名称: '获取集市主题列表',
        功能: '获取所有集市主题的列表',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })
    plugin.describeCoreApi('/api/bazaar/getInstalledTheme', {
        名称: '获取已安装主题列表',
        功能: '获取所有本地已经安装的主题',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })
    plugin.describeCoreApi('/api/bazaar/installBazaarTheme', {
        名称: '安装集市主题',
        功能: '安装指定的集市主题到本地',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })
    plugin.describeCoreApi('/api/bazaar/uninstallBazaarTheme', {
        名称: '卸载集市主题',
        功能: '卸载已经安装的主题',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })
    plugin.describeCoreApi('/api/bazaar/getBazaarPackageREAME', {
        名称: '获取集市包说明文件',
        功能: '获取集市包的说明文件',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'bazaar'
    })
    plugin.describeCoreApi('/api/attr/getBookmarkLabels', {
        名称: '获取书签',
        功能: '获取书签标记',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'attr'
    })

    plugin.describeCoreApi('/api/asset/uploadCloud', {
        名称: '上传附件文件到云端',
        功能: '将指定的附件文件上传到云端',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })
    plugin.describeCoreApi('/api/asset/insertLocalAssets', {
        名称: '插入本地文件',
        功能: '插入本地附件文件链接到笔记中',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })

    plugin.describeCoreApi('/api/asset/resolveAssetPath', {
        名称: '解析附件路径',
        功能: 'todo',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })
    plugin.describeCoreApi('/api/asset/upload', {
        名称: '上传附件到assets中',
        功能: 'todo',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })

    plugin.describeCoreApi('/api/asset/setFileAnnotation', {
        名称: '设置文件说明',
        功能: 'todo',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })

    plugin.describeCoreApi('/api/asset/getFileAnnotation', {
        名称: '获取文件标记',
        功能: 'todo',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })

    plugin.describeCoreApi('/api/asset/getUnusedAssets', {
        名称: '获取未使用附件列表',
        功能: 'todo',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })

    plugin.describeCoreApi('/api/asset/removeUnusedAsset', {
        名称: '删除未使用附件',
        功能: 'todo',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })

    plugin.describeCoreApi('/api/asset/removeUnusedAssets', {
        名称: '批量删除未使用附件',
        功能: 'todo',
        方法: {
            post: [apiProxy]
        },
        权限: 'admin',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })

    plugin.describeCoreApi('/api/asset/getDocImageAssets', {
        名称: '获取文档图片附件',
        功能: '获取文档中所有图片附件属性',
        方法: {
            post: [apiProxy]
        },
        权限: 'read',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })

    plugin.describeCoreApi('/api/asset/renameAsset', {
        名称: '重命名附件',
        功能: '重命名指定的附件文件',
        方法: {
            post: [apiProxy]
        },
        权限: 'write',
        请求值: "todo",
        返回值: 'todo',
        一级分组: 'siyuanApi',
        二级分组: 'asset'
    })

}