const express = require('express');
const router = express.Router();
const { middlewares } = naive
const { auth, syProxy } = middlewares
const { apiProxy } = syProxy
naive.serverUtil.describeJSONApi('/api/filetree/searchDocs', {
    名称: '搜索文档',
    功能: '搜索文档',
    方法: {
        post: [auth(), apiProxy]
    },
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'file'
})
naive.serverUtil.describeJSONApi('/api/filetree/listDocsByPath', {
    名称: '列出路径下文文档',
    功能: '搜索文档',
    方法: {
        post: [auth(), apiProxy]
    },
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/getDoc', {
    名称: '获取文档内容',
    功能: '获取指定文档的内容',
    方法: {
        post: [auth(), apiProxy]
    },
    权限: 'read',
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
naive.serverUtil.describeJSONApi('/api/filetree/getDocNameTemplate', {
    名称: '获取文档名模板',
    功能: '获取指定笔记本的文档名模板',
    方法: {
        post: [auth(), apiProxy]
    },
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/changeSort', {
    名称: '改变排序方式',
    功能: '改变笔记排序方式',
    方法: {
        post: [auth(), apiProxy]
    }, 权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/lockFile', {
    名称: '锁定文件',
    功能: '锁定指定文件',
    方法: {
        post: [auth(), apiProxy]
    },
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/createDocWithMd', {
    名称: '以md创建文档',
    功能: '传入md字符串,在指定位置创建文档',
    方法: {
        post: [auth(), apiProxy]
    },
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/createDailyNote', {
    名称: '创建每日笔记',
    功能: '创建指定笔记本的每日笔记',
    方法: {
        post: [auth(), apiProxy]
    },
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/createDoc', {
    名称: '创建文档',
    功能: '在指定位置创建文档',
    方法: {
        post: [auth(), apiProxy]
    },
        权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/renameDoc', {
    名称: '重命名文档',
    功能: '重命名指定文档',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/removeDoc', {
    名称: '移除文档',
    功能: '移除指定文档',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/moveDoc', {
    名称: '移动文档',
    功能: '移动指定文档到指定位置',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/duplicateDoc', {
    名称: '复制文档',
    功能: '复制文档的拷贝',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/getHPathByPath', {
    名称: '根据路径获取人类可读路径',
    功能: '根据id形式的思源路径获取文档名形式的可读路径',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})

naive.serverUtil.describeJSONApi('/api/filetree/getHPathByID', {
    名称: '根据ID获取人类可读路径',
    功能: '根据id获取文档名形式的可读路径',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})

naive.serverUtil.describeJSONApi('/api/filetree/getFullHPathByID', {
    名称: '根据ID获取完整可读路径',
    功能: '根据id获取文档名形式的完整可读路径(包括笔记本名称)',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})

naive.serverUtil.describeJSONApi('/api/filetree/doc2Heading', {
    名称: '转换文档为标题',
    功能: '将指定文档转化为标题',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/heading2Doc', {
    名称: '转换标题为文档',
    功能: '将指定标题转换为文档',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/li2Doc', {
    名称: '转换列表为文档',
    功能: '将指定列表块转换为文档',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/refreshFiletree', {
    名称: '刷新文档树',
    功能: '刷新文档树',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
naive.serverUtil.describeJSONApi('/api/filetree/reindexTree', {
    名称: '重建索引',
    功能: '重建索引',
   方法: {
        post: [auth(), apiProxy]
    },
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
module.exports = router