import { ArticleService } from "../modules/ArticleService.js"
import { ModalService } from "../modules/ModalService.js"
import { renderArticleList } from "./articleRender.js"

export const articleListManager = {
    init(){
        // 初始化时加载列表
        this.refreshList()
        // 绑定删除事件
        this.bindDeleteEvents()
    },
    async refreshList(){
        try {
            const articles = await ArticleService.getArticles()
            renderArticleList(articles,'admin-article-list')
            this.bindDeleteEvents() //重新绑定
        }catch(error){
            console.log('刷新列表失败',error)
        }
    },
    bindDeleteEvents(){
        document.getElementById('admin-article-list').addEventListener('click',async(e)=>{
            if(e.target.classList.contains('delete-btn')){
                const articleId = parseInt(e.target.closest('article').dataset.id)
                console.log(articleId)
                this.showDeleteArticle(articleId)
            }
        })
    },
    showDeleteArticle(articleId){
        ModalService.show({
            type:'warning',
            title:'确认删除',
            message:'确定要删除该文章吗？',
            buttons:[
                {
                    text:'确定', 
                    className:'confirm-btn',
                    onclick:()=>this.handleDeleteArticle(articleId)
                },
                {
                    text:'取消',
                    className:'cancel-btn'
                }
            ]
        })
    },
    async handleDeleteArticle(articleId){
        try{
            await ArticleService.deleteArticle(articleId)
            // 更新文章列表
            this.refreshList()
            
            ModalService.autoShow({
                type:'success',
                title:'删除成功！'
            })
        } catch(error){
            ModalService.autoShow({
                type:'error',
                title:'删除失败：${error.message}'
            })
        }

    }

}