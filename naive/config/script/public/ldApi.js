//todo
export class ldApi{
    constructor(option){
        //获取最新帖子列表
        this.set("GET", "https://ld246.com/api/v2/articles/latest", "gatArticlesByLatest","获取最新帖子")
        //获取领域帖子列表
        this.set("GET", "https://ld246.com/api/v2/articles/domain", "gatArticlesByDomain","获取领域帖子")
        //获取帖子详情
        this.set("GET", `https://ld246.com/api/v2/articles/${articleId}`, "gatArticles","获取最新帖子")
        //更新帖子
    }
}