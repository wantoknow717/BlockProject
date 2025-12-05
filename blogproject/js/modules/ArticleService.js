import { articleList } from "../data/articles.js"
export class ArticleService {
    //获取文章列表,模拟异步操作
    static async getArticles(){
        return new Promise(resolve =>{
            setTimeout(()=>resolve([...articleList]),100)
        })
    }
    // 创建新文章
    static async createAricle(articleData){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                // 假设后端模拟通过
                const result = true
                if(result){
                    const maxId = articleList.length>0
                    ?Math.max(...articleList.map(article => article.id))
                    :0;
                    const newId = maxId + 1
                    const newArticle = {
                        id: newId,
                        ...articleData
                    }
                    articleList.push(newArticle)
                    resolve(newArticle)
                } else {
                    reject(new Error('请检查内容确保合规'))
                }               

            },500)
        })
    }
    // 删除文章
    static async deleteArticle(articleId){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                const index = articleList.findIndex(article => article.id === articleId)
                if(index === -1){
                    reject(new Error('文章不存在！'))
                } else {
                    articleList.splice(index, 1)
                    resolve({message:'删除成功'})
                }
            },500)
        })
    }

}